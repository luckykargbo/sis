import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

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

// 1. Detect Potential Re-Enrollment Matches
export const detectPotentialReEnrollment = query({
  args: {
    fullName: v.string(),
    dob: v.string(),
  },
  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query('users')
      .filter((q) => 
        q.and(
          q.eq(q.field('fullName'), args.fullName),
          q.eq(q.field('dob'), args.dob),
          q.eq(q.field('role'), 'STUDENT')
        )
      )
      .collect();

    return matches.map(m => ({
      userId: m._id,
      fullName: m.fullName,
      email: m.email,
      status: m.status || 'ACTIVE',
      currentGradeLevel: m.currentGradeLevel || 'JSS1',
    }));
  }
});

// 2. Re-Enroll Withdrawn Student Profile
export const reEnrollStudent = mutation({
  args: {
    studentId: v.id('users'),
    targetGradeLevel: v.string(),
    academicYear: v.string(),
  },
  handler: async (ctx, args) => {
    const student = await ctx.db.get(args.studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const currentHistory = student.enrollmentHistory || [];
    
    const updatedHistory = [
      ...currentHistory,
      {
        gradeLevel: args.targetGradeLevel,
        academicYear: args.academicYear,
        startDate: Date.now(),
        statusAtExit: 'ACTIVE'
      }
    ];

    await ctx.db.patch(args.studentId, {
      status: 'ACTIVE',
      isActive: true,
      currentGradeLevel: args.targetGradeLevel,
      enrollmentHistory: updatedHistory
    });

    return { success: true, message: 'Student successfully re-enrolled' };
  }
});

// 3. Transition JSS -> SSS (e.g. after BECE)
export const transitionStudentGrade = mutation({
  args: {
    studentId: v.id('users'),
    newGradeLevel: v.string(),
    academicYear: v.string(),
  },
  handler: async (ctx, args) => {
    const student = await ctx.db.get(args.studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const currentHistory = student.enrollmentHistory || [];
    
    const updatedHistory = currentHistory.map(h => {
      if (!h.endDate) {
        return { ...h, endDate: Date.now(), statusAtExit: 'PROMOTED' };
      }
      return h;
    });

    updatedHistory.push({
      gradeLevel: args.newGradeLevel,
      academicYear: args.academicYear,
      startDate: Date.now(),
      statusAtExit: 'ACTIVE'
    });

    await ctx.db.patch(args.studentId, {
      currentGradeLevel: args.newGradeLevel,
      enrollmentHistory: updatedHistory
    });

    return { success: true, message: `Student promoted to ${args.newGradeLevel}` };
  }
});

// 4. Graduate Student (WASSCE Graduates - Alumni Mode)
export const graduateStudent = mutation({
  args: {
    studentId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const student = await ctx.db.get(args.studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const currentHistory = student.enrollmentHistory || [];
    const updatedHistory = currentHistory.map(h => {
      if (!h.endDate) {
        return { ...h, endDate: Date.now(), statusAtExit: 'GRADUATED' };
      }
      return h;
    });

    await ctx.db.patch(args.studentId, {
      status: 'GRADUATED',
      isActive: true, // Still true to allow Alumni dashboard/billing logins!
      enrollmentHistory: updatedHistory
    });

    return { success: true, message: 'Student graduated successfully (Alumni Mode Active)' };
  }
});
