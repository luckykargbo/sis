import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Subject Teaching Verification & Syllabus Progress Engine for S.I.S.
 */

export const checkInLessonSession = mutation({
  args: {
    subjectId: v.id("subjects"),
    teacherId: v.id("users"),
    classId: v.id("classes"),
    topicsCovered: v.string(),
    attendanceCount: v.number(),
    vpVerified: v.boolean(),
    term: v.union(v.literal("TERM_1"), v.literal("TERM_2"), v.literal("TERM_3")),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();

    const sessionId = await ctx.db.insert("subjectSessions", {
      subjectId: args.subjectId,
      teacherId: args.teacherId,
      classId: args.classId,
      startTime: timestamp,
      topicsCovered: args.topicsCovered,
      attendanceCount: args.attendanceCount,
      vpVerified: args.vpVerified,
      term: args.term,
    });

    return {
      success: true,
      sessionId,
    };
  },
});

export const getSyllabusProgressReport = query({
  args: {
    term: v.optional(v.union(v.literal("TERM_1"), v.literal("TERM_2"), v.literal("TERM_3"))),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db.query("subjectSessions").collect();
    const filtered = args.term
      ? sessions.filter((s) => s.term === args.term)
      : sessions;

    const totalLessons = filtered.length;
    const verifiedCount = filtered.filter((s) => s.vpVerified).length;

    return {
      totalLessonsLogged: totalLessons,
      completedRegistersCount: verifiedCount,
      registerComplianceRate: totalLessons > 0 ? `${((verifiedCount / totalLessons) * 100).toFixed(1)}%` : '100.0%',
      recentSessions: filtered.slice(0, 30),
    };
  },
});
