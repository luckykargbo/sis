import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';

class AttendanceScreen extends StatefulWidget {
  final String studentName;
  final String studentId;

  const AttendanceScreen({
    super.key,
    this.studentName = 'Khadija Bangura',
    this.studentId = 'STU-001',
  });

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  final List<Map<String, dynamic>> _attendanceHistory = [
    {
      'date': 'Today, Aug 5',
      'subject': 'Integrated Science',
      'period': 'Period 1 (8:15 AM)',
      'status': 'PRESENT',
      'teacher': 'Mr. A. Kamara',
    },
    {
      'date': 'Yesterday, Aug 4',
      'subject': 'General Mathematics',
      'period': 'Period 3 (10:30 AM)',
      'status': 'PRESENT',
      'teacher': 'Mrs. F. Sesay',
    },
    {
      'date': 'Monday, Aug 3',
      'subject': 'English Literature',
      'period': 'Period 2 (9:15 AM)',
      'status': 'LATE',
      'teacher': 'Mr. J. Turay',
      'note': 'Arrived 12 minutes late due to traffic',
    },
    {
      'date': 'Friday, Aug 1',
      'subject': 'Basic Technology',
      'period': 'Period 4 (11:45 AM)',
      'status': 'ABSENT',
      'teacher': 'Mr. S. Koroma',
      'note': 'Automated FCM Alert Dispatched to Parent Phone',
    },
    {
      'date': 'Thursday, Jul 31',
      'subject': 'Social Studies',
      'period': 'Period 1 (8:15 AM)',
      'status': 'PRESENT',
      'teacher': 'Ms. R. Bangura',
    },
  ];

  void _showExcuseDialog() {
    final excuseController = TextEditingController();
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text('Submit Absence Excuse Note', style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: SisColors.navy)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Provide a reason for Khadija\'s absence on Aug 1. This note will be sent directly to the Vice Principal.', style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
            const SizedBox(height: 14),
            TextField(
              controller: excuseController,
              maxLines: 3,
              decoration: InputDecoration(
                hintText: 'e.g. Medical appointment at Grace Clinic...',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                contentPadding: const EdgeInsets.all(12),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Excuse note submitted successfully to Vice Principal!')),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: SisColors.navy),
            child: const Text('Submit Note'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SisColors.background,
      appBar: AppBar(
        title: Text('${widget.studentName} — Attendance History'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Attendance Summary Banner
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [SisColors.navy, SisColors.royalBlue],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(color: SisColors.navy.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4)),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Overall Attendance Rate', style: GoogleFonts.inter(fontSize: 12, color: Colors.white70)),
                      const SizedBox(height: 4),
                      Text('96.4%', style: GoogleFonts.outfit(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white)),
                      Text('24 Present • 1 Late • 1 Absent', style: GoogleFonts.inter(fontSize: 12, color: Colors.white.withOpacity(0.85))),
                    ],
                  ),
                  ElevatedButton.icon(
                    onPressed: _showExcuseDialog,
                    icon: const Icon(Icons.assignment_turned_in, size: 16),
                    label: const Text('Send Excuse', style: TextStyle(fontSize: 11)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: SisColors.navy,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            Text('TIMELINE & PERIOD REGISTERS', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.navy, letterSpacing: 1)),
            const SizedBox(height: 10),

            ..._attendanceHistory.map((item) {
              final status = item['status'];
              final color = status == 'PRESENT' ? SisColors.success : status == 'LATE' ? SisColors.warning : SisColors.error;
              final icon = status == 'PRESENT' ? Icons.check_circle : status == 'LATE' ? Icons.access_time_filled : Icons.cancel;

              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: SisColors.lightGray),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 38,
                      height: 38,
                      decoration: BoxDecoration(color: color.withOpacity(0.15), shape: BoxShape.circle),
                      child: Icon(icon, color: color, size: 20),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(item['subject'], style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold, color: SisColors.navy)),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
                                child: Text(status, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          Text('${item['date']} • ${item['period']}', style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
                          Text('Instructor: ${item['teacher']}', style: GoogleFonts.inter(fontSize: 11, color: SisColors.darkText)),
                          if (item['note'] != null) ...[
                            const SizedBox(height: 6),
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(color: SisColors.softBlue, borderRadius: BorderRadius.circular(8)),
                              child: Text(item['note'], style: GoogleFonts.inter(fontSize: 11, fontStyle: FontStyle.italic, color: SisColors.navy)),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }
}
