import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Attendance Engine for Standards International School (S.I.S.)
 */

export const markAttendance = mutation({
  args: {
    classId: v.string(),
    subjectId: v.string(),
    teacherId: v.id("users"),
    term: v.union(v.literal("TERM_1"), v.literal("TERM_2"), v.literal("TERM_3")),
    records: v.array(
      v.object({
        studentId: v.id("users"),
        status: v.union(v.literal("PRESENT"), v.literal("ABSENT"), v.literal("LATE")),
      })
    ),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    for (const record of args.records) {
      await ctx.db.insert("attendance", {
        classId: args.classId,
        subjectId: args.subjectId,
        teacherId: args.teacherId,
        studentId: record.studentId,
        status: record.status,
        timestamp,
        term: args.term,
      });
    }

    return {
      success: true,
      recordsMarked: args.records.length,
    };
  },
});

export const getAttendanceByStudent = query({
  args: { studentId: v.id("users") },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("attendance")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .order("desc")
      .collect();

    const total = records.length;
    const present = records.filter((r) => r.status === "PRESENT").length;
    const absent = records.filter((r) => r.status === "ABSENT").length;
    const late = records.filter((r) => r.status === "LATE").length;

    const rate = total > 0 ? ((present / total) * 100).toFixed(1) : "100.0";

    return {
      records,
      stats: {
        total,
        present,
        absent,
        late,
        attendanceRate: `${rate}%`,
      },
    };
  },
});
