import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 3-Term Leaderboard System for Standards International School (S.I.S.)
 */

export const getTermLeaderboard = query({
  args: {
    term: v.optional(v.union(v.literal("TERM_1"), v.literal("TERM_2"), v.literal("TERM_3"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const targetTerm = args.term || "TERM_1";

    const entries = await ctx.db
      .query("leaderboard")
      .withIndex("by_term_points", (q) => q.eq("term", targetTerm))
      .order("desc")
      .take(args.limit || 50);

    return entries.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      badge: index === 0 ? "Gold" : index === 1 ? "Silver" : index === 2 ? "Bronze" : `#${index + 1}`,
    }));
  },
});

export const getAnnualGrandChampion = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const allEntries = await ctx.db.query("leaderboard").collect();

    const studentMap: Record<string, { studentId: string; cumulativePoints: number; totalQuizzes: number; maxStreak: number }> = {};

    for (const e of allEntries) {
      const sId = e.studentId.toString();
      if (!studentMap[sId]) {
        studentMap[sId] = {
          studentId: sId,
          cumulativePoints: 0,
          totalQuizzes: 0,
          maxStreak: 0,
        };
      }
      studentMap[sId].cumulativePoints += e.totalPoints;
      studentMap[sId].totalQuizzes += e.quizzesCompleted;
      if (e.streak > studentMap[sId].maxStreak) {
        studentMap[sId].maxStreak = e.streak;
      }
    }

    const champions = Object.values(studentMap);
    champions.sort((a, b) => b.cumulativePoints - a.cumulativePoints);

    return champions.map((c, idx) => ({
      ...c,
      rank: idx + 1,
      title: idx === 0 ? "Annual Grand Champion" : idx === 1 ? "First Runner-Up" : idx === 2 ? "Second Runner-Up" : "Honor Student",
    })).slice(0, args.limit || 20);
  },
});
