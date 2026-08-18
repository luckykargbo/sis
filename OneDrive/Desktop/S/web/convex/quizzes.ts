import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Quiz Engine for Standards International School (S.I.S.)
 */

export const submitQuizAttempt = mutation({
  args: {
    quizId: v.id("quizzes"),
    studentId: v.id("users"),
    answers: v.string(),
    score: v.number(),
    totalQuestions: v.number(),
    timeTakenSeconds: v.number(),
    pointsEarned: v.number(),
    violations: v.number(),
    term: v.union(v.literal("TERM_1"), v.literal("TERM_2"), v.literal("TERM_3")),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();

    const attemptId = await ctx.db.insert("quizAttempts", {
      quizId: args.quizId,
      studentId: args.studentId,
      answers: args.answers,
      score: args.score,
      totalQuestions: args.totalQuestions,
      timeTakenSeconds: args.timeTakenSeconds,
      pointsEarned: args.pointsEarned,
      violations: args.violations,
      completedAt: timestamp,
      term: args.term,
    });

    const existingLeaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_student_term", (q) => q.eq("studentId", args.studentId).eq("term", args.term))
      .first();

    if (existingLeaderboard) {
      await ctx.db.patch(existingLeaderboard._id, {
        totalPoints: existingLeaderboard.totalPoints + args.pointsEarned,
        quizzesCompleted: existingLeaderboard.quizzesCompleted + 1,
        streak: existingLeaderboard.streak + 1,
      });
    } else {
      await ctx.db.insert("leaderboard", {
        studentId: args.studentId,
        term: args.term,
        totalPoints: args.pointsEarned,
        quizzesCompleted: 1,
        averageScore: args.score,
        streak: 1,
        academicYear: "2025/2026",
      });
    }

    return { attemptId, success: true };
  },
});

export const listQuizzes = query({
  args: {
    term: v.optional(v.union(v.literal("TERM_1"), v.literal("TERM_2"), v.literal("TERM_3"))),
  },
  handler: async (ctx, args) => {
    if (args.term) {
      return await ctx.db
        .query("quizzes")
        .filter((q) => q.eq(q.field("term"), args.term))
        .collect();
    }
    return await ctx.db.query("quizzes").collect();
  },
});
