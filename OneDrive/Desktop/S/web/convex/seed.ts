import { mutation } from './_generated/server';

export const seedInitialData = mutation({
  handler: async (ctx) => {
    // Delete existing demo users to ensure clean production sync
    const existingUsers = await ctx.db.query('users').collect();
    for (const u of existingUsers) {
      await ctx.db.delete(u._id);
    }

    // 1. Seed IT System Manager (Cloud Account)
    const adminId = await ctx.db.insert('users', {
      fullName: 'IT System Manager',
      email: 'hackerunlockme@gmail.com',
      passwordHash: 'PEACElu2',
      role: 'IT_ADMIN',
      isActive: true,
      tempPasscode: 'PEACElu2',
    });

    // 2. Seed Principal Executive
    const principalId = await ctx.db.insert('users', {
      fullName: 'Dr. S. B. Mansaray',
      email: 'principal@sis.edu.sl',
      passwordHash: 'sis2026principal',
      role: 'PRINCIPAL',
      isActive: true,
      tempPasscode: 'sis2026principal',
    });

    // 3. Seed Vice Principal
    const vpId = await ctx.db.insert('users', {
      fullName: 'Mr. J. O. Tucker',
      email: 'vp@sis.edu.sl',
      passwordHash: 'sis2026vp',
      role: 'VP',
      isActive: true,
      tempPasscode: 'sis2026vp',
    });

    // 4. Seed Teacher
    const teacherId = await ctx.db.insert('users', {
      fullName: 'Mr. A. Kamara',
      email: 'teacher.kamara@sis.edu.sl',
      passwordHash: 'teacher.kamara123',
      role: 'TEACHER',
      isActive: true,
      tempPasscode: 'teacher.kamara123',
    });

    // 5. Seed Parent
    const parentId = await ctx.db.insert('users', {
      fullName: 'Mrs. F. Sesay',
      email: 'parent.khadija@sis.edu.sl',
      passwordHash: 'parent.sesay2026',
      role: 'PARENT',
      isActive: true,
      tempPasscode: 'parent.sesay2026',
    });

    // 6. Seed Student
    const studentId = await ctx.db.insert('users', {
      fullName: 'Khadija Bangura',
      email: 'student.st001@sis.edu.sl',
      passwordHash: 'sis2026khadija',
      role: 'STUDENT',
      parentId: parentId,
      isActive: true,
      tempPasscode: 'sis2026khadija',
    });

    // Seed Admissions Application
    await ctx.db.insert('admissions', {
      applicationTrackingId: 'SIS-2026-9482',
      parentName: 'Mrs. F. Sesay',
      parentEmail: 'parent.khadija@sis.edu.sl',
      parentPhone: '+232 76 123456',
      studentName: 'Khadija Bangura',
      studentDob: '2011-04-12',
      currentSchool: 'Freetown Secondary School for Girls',
      targetGrade: 'BECE',
      targetStream: 'SCIENCE',
      gradeLevel: 'JSS 3',
      entranceExamScore: 94,
      status: 'ACCEPTED',
      createdAt: Date.now(),
    });

    // Seed Initial Audit Log
    await ctx.db.insert('auditLogs', {
      actorRole: 'IT_ADMIN',
      actorName: 'IT System Manager',
      action: 'SYSTEM_INIT',
      details: 'Initial cloud user credentials seeded successfully into Convex Cloud.',
      timestamp: Date.now(),
    });

    return { 
      success: true, 
      message: 'Convex Cloud Users Table populated successfully with hackerunlockme@gmail.com!',
      adminId,
      principalId,
      vpId
    };
  },
});
