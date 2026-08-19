import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';

class VerificationScreen extends StatefulWidget {
  final String teacherName;
  final String teacherId;

  const VerificationScreen({
    super.key,
    this.teacherName = 'Mr. A. Kamara',
    this.teacherId = 'TEA-001',
  });

  @override
  State<VerificationScreen> createState() => _VerificationScreenState();
}

class _VerificationScreenState extends State<VerificationScreen> {
  String _selectedClass = 'JSS 3 — Section A';
  String _selectedSubject = 'Integrated Science';
  String _selectedPeriod = 'Period 1 (8:15 AM - 9:00 AM)';
  final _topicController = TextEditingController(text: 'Photosynthesis & Cell Organelles Practical');
  bool _registerCompleted = true;

  final List<Map<String, dynamic>> _recentLogs = [
    {
      'date': 'Today, 8:15 AM',
      'class': 'JSS 3 — Section A',
      'subject': 'Integrated Science',
      'topic': 'Photosynthesis & Cell Organelles Practical',
      'verified': true,
    },
    {
      'date': 'Yesterday, 10:30 AM',
      'class': 'SSS 2 — Science',
      'subject': 'Physics',
      'topic': 'Newton\'s Second Law & Momentum Calculations',
      'verified': true,
    },
  ];

  void _handleCheckIn() {
    if (_topicController.text.isEmpty) return;

    setState(() {
      _recentLogs.insert(0, {
        'date': 'Just Now',
        'class': _selectedClass,
        'subject': _selectedSubject,
        'topic': _topicController.text,
        'verified': true,
      });
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Lesson verified & synced to Vice Principal Timetable Audit!'),
        backgroundColor: SisColors.success,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SisColors.background,
      appBar: AppBar(
        title: const Text('Subject Teaching Verification'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Instructions Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: SisColors.softBlue,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: SisColors.royalBlue.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.verified_user, color: SisColors.navy, size: 28),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('VP Timetable Audit Check-in', style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold, color: SisColors.navy)),
                        Text('Check in for your scheduled class session to log syllabus coverage and register compliance.', style: GoogleFonts.inter(fontSize: 12, color: SisColors.darkText)),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Form Container
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: SisColors.lightGray),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 4))],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('LESSON SESSION DETAILS', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.navy, letterSpacing: 1)),
                  const SizedBox(height: 14),

                  DropdownButtonFormField<String>(
                    value: _selectedClass,
                    decoration: const InputDecoration(labelText: 'Class Assigned', border: OutlineInputBorder()),
                    items: ['JSS 1 — Section A', 'JSS 2 — Section B', 'JSS 3 — Section A', 'SSS 1 — Science', 'SSS 2 — Science']
                        .map((c) => DropdownMenuItem(value: c, child: Text(c, style: const TextStyle(fontSize: 13)))).toList(),
                    onChanged: (v) => setState(() => _selectedClass = v!),
                  ),

                  const SizedBox(height: 12),

                  DropdownButtonFormField<String>(
                    value: _selectedSubject,
                    decoration: const InputDecoration(labelText: 'Subject', border: OutlineInputBorder()),
                    items: ['Integrated Science', 'General Mathematics', 'Physics', 'Chemistry', 'English Literature']
                        .map((s) => DropdownMenuItem(value: s, child: Text(s, style: const TextStyle(fontSize: 13)))).toList(),
                    onChanged: (v) => setState(() => _selectedSubject = v!),
                  ),

                  const SizedBox(height: 12),

                  TextField(
                    controller: _topicController,
                    decoration: const InputDecoration(
                      labelText: 'Syllabus Topic Covered *',
                      hintText: 'e.g. Photosynthesis & Organic Chemistry Intro',
                      border: OutlineInputBorder(),
                    ),
                  ),

                  const SizedBox(height: 14),

                  CheckboxListTile(
                    value: _registerCompleted,
                    onChanged: (v) => setState(() => _registerCompleted = v!),
                    title: Text('Attendance Register Marked & Saved', style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600)),
                    activeColor: SisColors.royalBlue,
                    contentPadding: EdgeInsets.zero,
                  ),

                  const SizedBox(height: 14),

                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: _handleCheckIn,
                      icon: const Icon(Icons.check_circle_outline),
                      label: const Text('Verify & Complete Lesson Check-in'),
                      style: ElevatedButton.styleFrom(backgroundColor: SisColors.navy),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            Text('RECENT VERIFIED LESSONS', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.navy, letterSpacing: 1)),
            const SizedBox(height: 10),

            ..._recentLogs.map((log) => Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: const Icon(Icons.check_circle, color: SisColors.success, size: 24),
                title: Text('${log['subject']} — ${log['class']}', style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: SisColors.navy)),
                subtitle: Text('Topic: ${log['topic']}\nLogged: ${log['date']}', style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
              ),
            )),
          ],
        ),
      ),
    );
  }
}
