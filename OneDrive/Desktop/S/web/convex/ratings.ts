import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Anonymous Teacher Rating Engine for Standards International School (S.I.S.)
 */

export const submitAnonymousRating = mutation({
  args: {
    teacherId: v.id("users"),
    subjectId: v.string(),
    clarityScore: v.number(),
    punctualityScore: v.number(),
    helpfulnessScore: v.number(),
    anonymousNote: v.optional(v.string()),
    term: v.union(v.literal("TERM_1"), v.literal("TERM_2"), v.literal("TERM_3")),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();

    const ratingId = await ctx.db.insert("teacherRatings", {
      teacherId: args.teacherId,
      subjectId: args.subjectId,
      clarityScore: args.clarityScore,
      punctualityScore: args.punctualityScore,
      helpfulnessScore: args.helpfulnessScore,
      anonymousNote: args.anonymousNote,
      term: args.term,
      createdAt: timestamp,
    });

    return {
      success: true,
      ratingId,
    };
  },
});

export const getTeacherRatingAnalytics = query({
  args: {
    teacherId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let ratings = await ctx.db.query("teacherRatings").collect();

    if (args.teacherId) {
      const tId = args.teacherId;
      ratings = ratings.filter((r) => r.teacherId === tId);
    }

    if (ratings.length === 0) {
      return {
        totalRatings: 0,
        averageClarity: 0,
        averagePunctuality: 0,
        averageHelpfulness: 0,
        overallRating: 0,
        notes: [],
      };
    }

    const total = ratings.length;
    const sumClarity = ratings.reduce((sum, r) => sum + r.clarityScore, 0);
    const sumPunctuality = ratings.reduce((sum, r) => sum + r.punctualityScore, 0);
    const sumHelpfulness = ratings.reduce((sum, r) => sum + r.helpfulnessScore, 0);
    const overall = (sumClarity + sumPunctuality + sumHelpfulness) / (total * 3);

    return {
      totalRatings: total,
      averageClarity: Number((sumClarity / total).toFixed(2)),
      averagePunctuality: Number((sumPunctuality / total).toFixed(2)),
      averageHelpfulness: Number((sumHelpfulness / total).toFixed(2)),
      overallRating: Number(overall.toFixed(2)),
      notes: ratings.map((r) => r.anonymousNote).filter(Boolean),
    };
  },
});
