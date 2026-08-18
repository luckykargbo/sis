import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Generate unique tracking ID
function generateTrackingId(): string {
  const prefix = 'SIS';
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
}

// Submit new application
export const submitApplication = mutation({
  args: {
    parentName: v.string(),
    parentEmail: v.string(),
    parentPhone: v.string(),
    studentName: v.string(),
    studentDob: v.string(),
    currentSchool: v.optional(v.string()),
    targetGrade: v.union(v.literal('BECE'), v.literal('WASSCE')),
    targetStream: v.optional(v.union(
      v.literal('SCIENCE'),
      v.literal('ARTS'),
      v.literal('COMMERCIAL')
    )),
    gradeLevel: v.string(),
    birthCertificateId: v.optional(v.id('_storage')),
    transcriptId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const trackingId = generateTrackingId();
    const examToken = Math.random().toString(36).substring(2, 14).toUpperCase();
    const now = Date.now();
    
    const applicationId = await ctx.db.insert('admissions', {
      applicationTrackingId: trackingId,
      parentName: args.parentName,
      parentEmail: args.parentEmail,
      parentPhone: args.parentPhone,
      studentName: args.studentName,
      studentDob: args.studentDob,
      currentSchool: args.currentSchool,
      targetGrade: args.targetGrade,
      targetStream: args.targetStream,
      gradeLevel: args.gradeLevel,
      birthCertificateId: args.birthCertificateId,
      transcriptId: args.transcriptId,
      status: 'PENDING',
      examToken,
      createdAt: now,
    });

    // Record Audit Log
    await ctx.db.insert('auditLogs', {
      actorRole: 'SYSTEM_APPLICANT',
      actorName: args.studentName,
      action: 'SUBMIT_APPLICATION',
      targetId: applicationId,
      details: `New admissions application submitted (Tracking ID: ${trackingId})`,
      timestamp: now,
    });

    return { applicationId, trackingId, examToken };
  },
});

// Get application by tracking ID
export const getByTrackingId = query({
  args: { trackingId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('admissions')
      .withIndex('by_tracking_id', (q) => q.eq('applicationTrackingId', args.trackingId))
      .unique();
  },
});

// Server-Side Validation for Exam Access Token & Expiration Check
export const validateAndGetExamToken = query({
  args: { 
    trackingId: v.string(),
    examToken: v.string() 
  },
  handler: async (ctx, args) => {
    const application = await ctx.db
      .query('admissions')
      .withIndex('by_tracking_id', (q) => q.eq('applicationTrackingId', args.trackingId))
      .unique();

    if (!application) {
      return { valid: false, isExpired: false, message: 'Invalid Tracking ID. Record not found.' };
    }

    if (application.examToken !== args.examToken) {
      return { valid: false, isExpired: false, message: 'Invalid Exam Access Token.' };
    }

    // Check Server-Side Expiration Timer
    const now = Date.now();
    if (application.examTokenExpiresAt && now > application.examTokenExpiresAt) {
      return { 
        valid: false, 
        isExpired: true, 
        message: `Exam token expired at ${new Date(application.examTokenExpiresAt).toLocaleString()}. Please contact administration.` 
      };
    }

    return { valid: true, isExpired: false, application, message: 'Token verified successfully.' };
  },
});

// Verify application & Issue Exam Token with expiration timer & Audit Log (Admin / Principal / VP)
export const issueExamToken = mutation({
  args: {
    applicationId: v.id('admissions'),
    expiresInHours: v.number(),
    approvedByRole: v.string(),
    approvedByName: v.string(),
  },
  handler: async (ctx, args) => {
    const examToken = 'EXAM-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const now = Date.now();
    const expiresAt = now + (args.expiresInHours * 60 * 60 * 1000);

    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error('Application not found');

    await ctx.db.patch(args.applicationId, {
      examToken,
      examTokenIssuedAt: now,
      examTokenExpiresAt: expiresAt,
      approvedByRole: args.approvedByRole,
      approvedByName: args.approvedByName,
      status: 'EXAM_SCHEDULED',
    });

    // Record Audit Log Entry
    await ctx.db.insert('auditLogs', {
      actorRole: args.approvedByRole,
      actorName: args.approvedByName,
      action: 'ISSUE_EXAM_TOKEN',
      targetId: args.applicationId,
      details: `Issued exam token [${examToken}] for student ${application.studentName}. Expiration set for ${args.expiresInHours} hours.`,
      timestamp: now,
    });

    return { examToken, expiresAt };
  },
});

// List all applications (admin)
export const listApplications = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query('admissions')
        .withIndex('by_status', (q) => q.eq('status', args.status as 'PENDING' | 'EXAM_SCHEDULED' | 'EXAM_COMPLETED' | 'INTERVIEW_SCHEDULED' | 'ACCEPTED' | 'REJECTED'))
        .order('desc')
        .collect();
    }
    return await ctx.db.query('admissions').order('desc').collect();
  },
});

// Submit entrance exam score with Server-Side Validation & Audit Log
export const submitExamScore = mutation({
  args: {
    applicationId: v.id('admissions'),
    score: v.number(),
    details: v.string(),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error('Application not found');

    const now = Date.now();

    // Check Server-Side Expiration
    if (application.examTokenExpiresAt && now > application.examTokenExpiresAt) {
      throw new Error('Exam submission failed: Exam Access Token has expired.');
    }

    await ctx.db.patch(args.applicationId, {
      entranceExamScore: args.score,
      entranceExamDetails: args.details,
      status: 'EXAM_COMPLETED',
    });

    // Record Audit Log
    await ctx.db.insert('auditLogs', {
      actorRole: 'STUDENT_EXAMINEE',
      actorName: application.studentName,
      action: 'SUBMIT_EXAM',
      targetId: args.applicationId,
      details: `Entrance exam submitted with score of ${args.score}% (${args.details})`,
      timestamp: now,
    });
  },
});

// Schedule interview with Audit Log
export const scheduleInterview = mutation({
  args: {
    applicationId: v.id('admissions'),
    roomId: v.string(),
    actorRole: v.optional(v.string()),
    actorName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.applicationId, {
      videoInterviewRoomId: args.roomId,
      status: 'INTERVIEW_SCHEDULED',
    });

    await ctx.db.insert('auditLogs', {
      actorRole: args.actorRole || 'ADMIN',
      actorName: args.actorName || 'Administrator',
      action: 'SCHEDULE_INTERVIEW',
      targetId: args.applicationId,
      details: `Scheduled WebRTC interview room: ${args.roomId}`,
      timestamp: now,
    });
  },
});

// Approve admission & Record Audit Log
export const approveAdmission = mutation({
  args: {
    applicationId: v.id('admissions'),
    interviewNotes: v.optional(v.string()),
    actorRole: v.optional(v.string()),
    actorName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error('Application not found');
    const now = Date.now();

    // Update admission status
    await ctx.db.patch(args.applicationId, {
      status: 'ACCEPTED',
      interviewNotes: args.interviewNotes,
    });

    // Generate temporary passcode for parent
    const tempPasscode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Create parent user
    const parentId = await ctx.db.insert('users', {
      fullName: application.parentName,
      email: application.parentEmail,
      passwordHash: tempPasscode,
      phone: application.parentPhone,
      role: 'PARENT',
      isActive: true,
      tempPasscode,
    });

    // Create student user linked to parent
    const studentPasscode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const studentId = await ctx.db.insert('users', {
      fullName: application.studentName,
      email: `${application.studentName.toLowerCase().replace(/\s+/g, '.')}@sis.student`,
      passwordHash: studentPasscode,
      role: 'STUDENT',
      parentId,
      isActive: true,
      tempPasscode: studentPasscode,
    });

    // Record Audit Log
    await ctx.db.insert('auditLogs', {
      actorRole: args.actorRole || 'PRINCIPAL',
      actorName: args.actorName || 'Dr. S. B. Mansaray',
      action: 'APPROVE_ADMISSION',
      targetId: args.applicationId,
      details: `Approved admission for student ${application.studentName}. Created parent and student accounts.`,
      timestamp: now,
    });

    return {
      parentId,
      studentId,
      parentTempPasscode: tempPasscode,
      studentTempPasscode: studentPasscode,
      parentEmail: application.parentEmail,
    };
  },
});

// Reject admission & Record Audit Log
export const rejectAdmission = mutation({
  args: {
    applicationId: v.id('admissions'),
    interviewNotes: v.optional(v.string()),
    actorRole: v.optional(v.string()),
    actorName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    const now = Date.now();

    await ctx.db.patch(args.applicationId, {
      status: 'REJECTED',
      interviewNotes: args.interviewNotes,
    });

    if (application) {
      await ctx.db.insert('auditLogs', {
        actorRole: args.actorRole || 'ADMIN',
        actorName: args.actorName || 'Administrator',
        action: 'REJECT_ADMISSION',
        targetId: args.applicationId,
        details: `Rejected admission application for ${application.studentName}`,
        timestamp: now,
      });
    }
  },
});

// List System Audit Logs (Admin)
export const listAuditLogs = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db.query('auditLogs').order('desc').take(limit);
  },
});

// Generate upload URL for documents
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
