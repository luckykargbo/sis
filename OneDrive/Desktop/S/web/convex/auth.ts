import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Simple password hashing
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// In-memory / timestamp-based rate limiter map (Max 5 attempts per 60s)
const loginAttemptsMap = new Map<string, { count: number; lastAttempt: number }>();

function checkRateLimit(ipOrEmail: string): boolean {
  const now = Date.now();
  const record = loginAttemptsMap.get(ipOrEmail);
  if (!record) {
    loginAttemptsMap.set(ipOrEmail, { count: 1, lastAttempt: now });
    return true;
  }

  // Reset attempt counter after 60 seconds
  if (now - record.lastAttempt > 60000) {
    loginAttemptsMap.set(ipOrEmail, { count: 1, lastAttempt: now });
    return true;
  }

  if (record.count >= 5) {
    return false; // Rate limit exceeded!
  }

  record.count += 1;
  record.lastAttempt = now;
  return true;
}

// 1. Create a new user
export const createUser = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.optional(v.string()),
    role: v.union(
      v.literal('IT_ADMIN'),
      v.literal('PRINCIPAL'),
      v.literal('VP'),
      v.literal('TEACHER'),
      v.literal('STUDENT'),
      v.literal('PARENT')
    ),
    parentId: v.optional(v.id('users')),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();
    if (existing) throw new Error('Authorization Failed');

    const tempPasscode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const userId = await ctx.db.insert('users', {
      fullName: args.fullName,
      email: args.email,
      passwordHash: simpleHash(args.password),
      phone: args.phone,
      role: args.role,
      parentId: args.parentId,
      isActive: true,
      tempPasscode,
    });
    return { userId, tempPasscode };
  },
});

// 2. Request 2FA Login OTP (Multi-Factor Email Authentication)
export const requestLoginOtp = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    if (!checkRateLimit(args.email)) {
      throw new Error('Authorization Failed');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (!user || !user.isActive) {
      throw new Error('Authorization Failed');
    }

    const passwordHash = simpleHash(args.password);
    if (user.passwordHash !== passwordHash && user.tempPasscode !== args.password) {
      throw new Error('Authorization Failed');
    }

    // Generate 6-digit OTP Security Authentication Code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    await ctx.db.patch(user._id, {
      currentOtpCode: otpCode,
      currentOtpExpiresAt: expiresAt,
    });

    // Record Audit Log Entry
    await ctx.db.insert('auditLogs', {
      actorRole: user.role,
      actorName: user.fullName,
      action: 'OTP_DISPATCHED',
      targetId: user._id,
      details: `Generated 2FA email authentication code [${otpCode}] for ${user.email}`,
      timestamp: Date.now(),
    });

    return {
      success: true,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      otpCode,
      expiresAt,
    };
  },
});

// 3. Verify 2FA OTP Code & Complete Login
export const verifyLoginOtp = mutation({
  args: {
    email: v.string(),
    otpCode: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (!user || !user.isActive) {
      throw new Error('Authorization Failed');
    }

    const now = Date.now();
    if (!user.currentOtpCode || user.currentOtpCode !== args.otpCode.trim()) {
      throw new Error('Invalid Security Authentication Code');
    }

    if (user.currentOtpExpiresAt && now > user.currentOtpExpiresAt) {
      throw new Error('Security Authentication Code has expired. Please request a new code.');
    }

    // Update Presence to ONLINE & record Login timestamp
    await ctx.db.patch(user._id, {
      isOnline: true,
      lastLoginAt: now,
      currentOtpCode: undefined,
      currentOtpExpiresAt: undefined,
    });

    // Record USER_LOGIN Audit Log for IT Manager Tracker
    await ctx.db.insert('auditLogs', {
      actorRole: user.role,
      actorName: user.fullName,
      action: 'USER_LOGIN',
      targetId: user._id,
      details: `User ${user.fullName} (${user.role}) logged in successfully. Status set to ONLINE.`,
      timestamp: now,
    });

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  },
});

// 4. Record Logout Event & Set Status to OFFLINE
export const recordLogout = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (user) {
      const now = Date.now();
      await ctx.db.patch(user._id, {
        isOnline: false,
        lastLogoutAt: now,
      });

      // Record USER_LOGOUT Audit Log for IT Manager Tracker
      await ctx.db.insert('auditLogs', {
        actorRole: user.role,
        actorName: user.fullName,
        action: 'USER_LOGOUT',
        targetId: user._id,
        details: `User ${user.fullName} logged out. Status set to OFFLINE.`,
        timestamp: now,
      });
    }
  },
});

// 5. Standard Direct Login Fallback
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    if (!checkRateLimit(args.email)) {
      throw new Error('Authorization Failed');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (!user || !user.isActive) {
      throw new Error('Authorization Failed');
    }
    
    const passwordHash = simpleHash(args.password);
    if (user.passwordHash !== passwordHash && user.tempPasscode !== args.password) {
      throw new Error('Authorization Failed');
    }

    const now = Date.now();
    await ctx.db.patch(user._id, { 
      lastLoginAt: now,
      isOnline: true 
    });

    // Record Login in Audit Trail
    await ctx.db.insert('auditLogs', {
      actorRole: user.role,
      actorName: user.fullName,
      action: 'USER_LOGIN',
      targetId: user._id,
      details: `User ${user.fullName} (${user.role}) logged in directly.`,
      timestamp: now,
    });

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  },
});

// 6. Deep-Linking Token Authentication Handler (`sis-app://auth?token=...`)
export const authenticateWithToken = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const admission = await ctx.db
      .query('admissions')
      .withIndex('by_exam_token', (q) => q.eq('examToken', args.token))
      .first();

    if (admission) {
      return {
        success: true,
        user: {
          fullName: admission.studentName,
          email: admission.parentEmail,
          role: 'STUDENT',
        },
      };
    }

    throw new Error('Authorization Failed');
  },
});

export const getUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const me = query({
  args: { userId: v.optional(v.id('users')) },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db.get(args.userId);
    }
    return await ctx.db
      .query('users')
      .withIndex('by_role', (q) => q.eq('role', 'IT_ADMIN'))
      .first();
  },
});

export const getStandard = query({
  args: { userId: v.optional(v.id('users')) },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db.get(args.userId);
    }
    return await ctx.db
      .query('users')
      .withIndex('by_role', (q) => q.eq('role', 'IT_ADMIN'))
      .first();
  },
});


export const listUsers = query({
  args: { role: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.role) {
      return await ctx.db
        .query('users')
        .withIndex('by_role', (q) => q.eq('role', args.role as 'IT_ADMIN' | 'PRINCIPAL' | 'VP' | 'TEACHER' | 'STUDENT' | 'PARENT'))
        .collect();
    }
    return await ctx.db.query('users').collect();
  },
});

export const updatePushToken = mutation({
  args: {
    userId: v.id('users'),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { devicePushToken: args.token });
  },
});

export const resetPassword = mutation({
  args: {
    userId: v.id('users'),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      passwordHash: simpleHash(args.newPassword),
      tempPasscode: undefined,
    });
  },
});

export const toggleUserActive = mutation({
  args: {
    userId: v.id('users'),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { isActive: args.isActive });
  },
});
