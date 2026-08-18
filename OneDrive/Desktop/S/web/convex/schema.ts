import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    fullName: v.string(),
    email: v.string(),
    passwordHash: v.string(),
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
    isActive: v.boolean(),
    devicePushToken: v.optional(v.string()),
    tempPasscode: v.optional(v.string()),
    profileImageId: v.optional(v.id('_storage')),
    lastLoginAt: v.optional(v.number()),
    lastLogoutAt: v.optional(v.number()),
    isOnline: v.optional(v.boolean()),
    currentOtpCode: v.optional(v.string()),
    currentOtpExpiresAt: v.optional(v.number()),
  })
    .index('by_email', ['email'])
    .index('by_role', ['role'])
    .index('by_parent', ['parentId']),

  admissions: defineTable({
    applicationTrackingId: v.string(),
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
    entranceExamScore: v.optional(v.number()),
    entranceExamDetails: v.optional(v.string()),
    videoInterviewRoomId: v.optional(v.string()),
    interviewNotes: v.optional(v.string()),
    status: v.union(
      v.literal('PENDING'),
      v.literal('EXAM_SCHEDULED'),
      v.literal('EXAM_COMPLETED'),
      v.literal('INTERVIEW_SCHEDULED'),
      v.literal('ACCEPTED'),
      v.literal('REJECTED')
    ),
    examToken: v.optional(v.string()),
    examTokenExpiresAt: v.optional(v.number()),
    examTokenIssuedAt: v.optional(v.number()),
    approvedByRole: v.optional(v.string()),
    approvedByName: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index('by_tracking_id', ['applicationTrackingId'])
    .index('by_status', ['status'])
    .index('by_exam_token', ['examToken']),

  attendance: defineTable({
    studentId: v.id('users'),
    teacherId: v.id('users'),
    subjectId: v.string(),
    classId: v.string(),
    status: v.union(
      v.literal('PRESENT'),
      v.literal('ABSENT'),
      v.literal('LATE')
    ),
    timestamp: v.number(),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
  })
    .index('by_student', ['studentId'])
    .index('by_teacher', ['teacherId'])
    .index('by_class_date', ['classId', 'timestamp']),

  subjects: defineTable({
    name: v.string(),
    code: v.string(),
    curriculumLevel: v.union(v.literal('BECE'), v.literal('WASSCE')),
    stream: v.optional(v.union(
      v.literal('SCIENCE'),
      v.literal('ARTS'),
      v.literal('COMMERCIAL'),
      v.literal('GENERAL')
    )),
    teacherId: v.optional(v.id('users')),
  }).index('by_code', ['code']),

  classes: defineTable({
    name: v.string(),
    gradeLevel: v.string(),
    stream: v.optional(v.string()),
    academicYear: v.string(),
    classTeacherId: v.optional(v.id('users')),
  }),

  timetable: defineTable({
    classId: v.id('classes'),
    subjectId: v.id('subjects'),
    teacherId: v.id('users'),
    dayOfWeek: v.number(),
    startTime: v.string(),
    endTime: v.string(),
    room: v.optional(v.string()),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
  })
    .index('by_class', ['classId'])
    .index('by_teacher', ['teacherId']),

  quizzes: defineTable({
    teacherId: v.id('users'),
    subjectId: v.string(),
    curriculumLevel: v.union(v.literal('BECE'), v.literal('WASSCE')),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
    title: v.string(),
    sourceDocumentId: v.optional(v.id('_storage')),
    questionsJson: v.string(),
    totalQuestions: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index('by_subject', ['subjectId'])
    .index('by_teacher', ['teacherId'])
    .index('by_level_term', ['curriculumLevel', 'term']),

  quizAttempts: defineTable({
    quizId: v.id('quizzes'),
    studentId: v.id('users'),
    answers: v.string(),
    score: v.number(),
    totalQuestions: v.number(),
    timeTakenSeconds: v.number(),
    pointsEarned: v.number(),
    violations: v.number(),
    completedAt: v.number(),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
  })
    .index('by_student', ['studentId'])
    .index('by_quiz', ['quizId'])
    .index('by_student_quiz', ['studentId', 'quizId']),

  leaderboard: defineTable({
    studentId: v.id('users'),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
    totalPoints: v.number(),
    quizzesCompleted: v.number(),
    averageScore: v.number(),
    streak: v.number(),
    academicYear: v.string(),
  })
    .index('by_term_points', ['term', 'totalPoints'])
    .index('by_student_term', ['studentId', 'term']),

  teacherRatings: defineTable({
    teacherId: v.id('users'),
    subjectId: v.string(),
    clarityScore: v.number(),
    punctualityScore: v.number(),
    helpfulnessScore: v.number(),
    anonymousNote: v.optional(v.string()),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
    createdAt: v.number(),
  }).index('by_teacher', ['teacherId']),

  subjectSessions: defineTable({
    teacherId: v.id('users'),
    subjectId: v.id('subjects'),
    classId: v.id('classes'),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    topicsCovered: v.string(),
    attendanceCount: v.number(),
    vpVerified: v.boolean(),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
  })
    .index('by_teacher', ['teacherId'])
    .index('by_subject', ['subjectId']),

  assignments: defineTable({
    teacherId: v.id('users'),
    subjectId: v.string(),
    classId: v.string(),
    title: v.string(),
    instructions: v.string(),
    attachmentId: v.optional(v.id('_storage')),
    dueDate: v.number(),
    term: v.union(v.literal('TERM_1'), v.literal('TERM_2'), v.literal('TERM_3')),
    createdAt: v.number(),
  }).index('by_class', ['classId']),

  submissions: defineTable({
    assignmentId: v.id('assignments'),
    studentId: v.id('users'),
    submissionText: v.optional(v.string()),
    attachmentId: v.optional(v.id('_storage')),
    grade: v.optional(v.number()),
    feedback: v.optional(v.string()),
    submittedAt: v.number(),
    gradedAt: v.optional(v.number()),
  })
    .index('by_assignment', ['assignmentId'])
    .index('by_student', ['studentId']),

  notifications: defineTable({
    userId: v.id('users'),
    title: v.string(),
    body: v.string(),
    type: v.union(
      v.literal('ATTENDANCE'),
      v.literal('QUIZ'),
      v.literal('ASSIGNMENT'),
      v.literal('ADMISSION'),
      v.literal('ANNOUNCEMENT'),
      v.literal('SYSTEM')
    ),
    isRead: v.boolean(),
    data: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_unread', ['userId', 'isRead']),

  offlineSyncQueue: defineTable({
    userId: v.id('users'),
    action: v.string(),
    payload: v.string(),
    status: v.union(
      v.literal('PENDING'),
      v.literal('PROCESSING'),
      v.literal('COMPLETED'),
      v.literal('FAILED')
    ),
    createdAt: v.number(),
    processedAt: v.optional(v.number()),
  }).index('by_user_status', ['userId', 'status']),

  auditLogs: defineTable({
    actorRole: v.string(),
    actorName: v.string(),
    action: v.string(),
    targetId: v.optional(v.string()),
    details: v.string(),
    timestamp: v.number(),
  })
    .index('by_timestamp', ['timestamp'])
    .index('by_action', ['action']),
});
