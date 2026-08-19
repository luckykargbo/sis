import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';
import '../../data/models/user_model.dart';
import '../auth/login_screen.dart';

class RoleDashboardScreen extends StatefulWidget {
  final UserModel user;

  const RoleDashboardScreen({super.key, required this.user});

  @override
  State<RoleDashboardScreen> createState() => _RoleDashboardScreenState();
}

class _RoleDashboardScreenState extends State<RoleDashboardScreen> {
  int _currentNavIndex = 0;

  // Mock attendance state for teacher register
  final List<Map<String, dynamic>> _studentList = [
    {'name': 'Khadija Bangura', 'id': 'STU-001', 'status': 'PRESENT'},
    {'name': 'Emmanuel Sesay', 'id': 'STU-002', 'status': 'PRESENT'},
    {'name': 'Fatu Kamara', 'id': 'STU-003', 'status': 'ABSENT'},
    {'name': 'Mohamed Turay', 'id': 'STU-004', 'status': 'LATE'},
    {'name': 'Zainab Koroma', 'id': 'STU-005', 'status': 'PRESENT'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SisColors.background,
      appBar: AppBar(
        title: Text(widget.user.role.displayName),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const LoginScreen()));
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // User Header Card
            Container(
              padding: const EdgeInsets.all(16),
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
                children: [
                  CircleAvatar(
                    radius: 26,
                    backgroundColor: Colors.white.withOpacity(0.2),
                    child: Text(
                      widget.user.fullName.substring(0, 1),
                      style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.user.fullName, style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                        const SizedBox(height: 2),
                        Text(widget.user.email, style: GoogleFonts.inter(fontSize: 12, color: Colors.white.withOpacity(0.8))),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      widget.user.role.displayName,
                      style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Render Role-Specific Dashboard Section
            _buildRoleContent(),
          ],
        ),
      ),
    );
  }

  Widget _buildRoleContent() {
    switch (widget.user.role) {
      case UserRole.itManager:
        return _buildItManagerView();
      case UserRole.principal:
        return _buildPrincipalView();
      case UserRole.vicePrincipal:
        return _buildVicePrincipalView();
      case UserRole.teacher:
        return _buildTeacherView();
      case UserRole.student:
        return _buildStudentView();
      case UserRole.parent:
        return _buildParentView();
    }
  }

  // 1. IT MANAGER DASHBOARD
  Widget _buildItManagerView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('System Health & Infrastructure', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 12),
        Row(
          children: [
            _buildMetricCard('Convex DB', 'ONLINE', Icons.cloud_done, SisColors.success),
            const SizedBox(width: 12),
            _buildMetricCard('Push FCM', 'ACTIVE', Icons.notifications_active, SisColors.royalBlue),
          ],
        ),
        const SizedBox(height: 20),
        Text('Administrative Actions', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 10),
        _buildActionTile('Provision User Account', 'Create new teacher/student login credentials', Icons.person_add, () {}),
        _buildActionTile('Security & Audit Logs', 'View JWT authentication & API request logs', Icons.security, () {}),
        _buildActionTile('Database Backups', 'Trigger Convex real-time data snapshot', Icons.backup, () {}),
      ],
    );
  }

  // 2. PRINCIPAL DASHBOARD (FULL OPERATIONAL SCREEN)
  Widget _buildPrincipalView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Live School Metrics Overview
        Text('School Performance Overview', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 12),
        Row(
          children: [
            _buildMetricCard('Overall Attendance', '96.4%', Icons.check_circle, SisColors.success),
            const SizedBox(width: 10),
            _buildMetricCard('Syllabus Progress', '88.5%', Icons.menu_book, SisColors.royalBlue),
            const SizedBox(width: 10),
            _buildMetricCard('Leaderboard Rank', '#1 JSS 3A', Icons.emoji_events, SisColors.navy),
          ],
        ),

        const SizedBox(height: 20),

        // Staff Provisioning Hub
        Row(
          mainAxisAlignment: MainAxisAlignment.between,
          children: [
            Text('Staff Provisioning & Onboarding', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
            ElevatedButton.icon(
              onPressed: _showOnboardTeacherModal,
              icon: const Icon(Icons.person_add, size: 16),
              label: const Text('Onboard Teacher', style: TextStyle(fontSize: 11)),
              style: ElevatedButton.styleFrom(
                backgroundColor: SisColors.navy,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              ),
            ),
          ],
        ),

        const SizedBox(height: 12),

        // Approve Student Admissions Queue
        Text('PENDING ADMISSIONS APPROVALS', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.navy, letterSpacing: 1)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: SisColors.lightGray)),
          child: Column(
            children: [
              _buildAdmissionItem('Khadija Bangura', 'JSS 1 • Science Track', '94% Exam Score'),
              const Divider(height: 16),
              _buildAdmissionItem('Mohamed Sesay', 'SSS 1 • Commercial Stream', '91% Exam Score'),
            ],
          ),
        ),

        const SizedBox(height: 20),

        // Broadcast & Prize Approvals
        Text('Executive Controls & Dispatch', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 10),
        _buildActionTile('Emergency School Announcement', 'Compose and dispatch instant alert to all parents & teachers', Icons.campaign, () {
          _showBroadcastModal();
        }),
        _buildActionTile('Term Grand Prize Approvals', 'Approve annual grand champion student awards & scholarships', Icons.military_tech, () {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Term 1 Grand Prize Awards Approved & Logged to Convex!')));
        }),
        _buildActionTile('Teacher Ratings & Evaluation Audit', 'Inspect anonymous student feedback heatmaps', Icons.star, () {}),
      ],
    );
  }

  Widget _buildAdmissionItem(String name, String details, String score) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(name, style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: SisColors.navy)),
            Text(details, style: GoogleFonts.inter(fontSize: 11, color: SisColors.grayText)),
            Text(score, style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.success)),
          ],
        ),
        Row(
          children: [
            IconButton(
              icon: const Icon(Icons.check_circle, color: SisColors.success, size: 28),
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Approved $name — Credentials sent to parent.')));
              },
            ),
            IconButton(
              icon: const Icon(Icons.cancel, color: SisColors.error, size: 28),
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Application for $name rejected.')));
              },
            ),
          ],
        ),
      ],
    );
  }

  void _showOnboardTeacherModal() {
    final nameCtrl = TextEditingController();
    final emailCtrl = TextEditingController();
    final subjectCtrl = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => Padding(
        padding: EdgeInsets.only(left: 20, right: 20, top: 20, bottom: MediaQuery.of(context).viewInsets.bottom + 20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Onboard New Teacher / Staff', style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: SisColors.navy)),
            const SizedBox(height: 12),
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Teacher Full Name', border: OutlineInputBorder())),
            const SizedBox(height: 10),
            TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: 'Email Address', border: OutlineInputBorder())),
            const SizedBox(height: 10),
            TextField(controller: subjectCtrl, decoration: const InputDecoration(labelText: 'Subject Stream (e.g. Integrated Science)', border: OutlineInputBorder())),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Teacher ${nameCtrl.text} onboarded & credentials created in Convex!')));
                },
                child: const Text('Provision Teacher Account'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showBroadcastModal() {
    final msgCtrl = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => Padding(
        padding: EdgeInsets.only(left: 20, right: 20, top: 20, bottom: MediaQuery.of(context).viewInsets.bottom + 20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Emergency School Broadcast', style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: SisColors.navy)),
            const SizedBox(height: 8),
            Text('This alert will be sent via FCM push notification to all parents and teachers.', style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
            const SizedBox(height: 12),
            TextField(controller: msgCtrl, maxLines: 3, decoration: const InputDecoration(labelText: 'Announcement Message', border: OutlineInputBorder())),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Emergency Announcement Dispatched to 500+ Devices!')));
                },
                style: ElevatedButton.styleFrom(backgroundColor: SisColors.navy),
                child: const Text('Dispatch Push Announcement'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // 3. VICE PRINCIPAL DASHBOARD
  Widget _buildVicePrincipalView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Academic & Timetable Operations', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 12),
        Row(
          children: [
            _buildMetricCard('Pending Interviews', '4 Active', Icons.video_call, SisColors.royalBlue),
            const SizedBox(width: 12),
            _buildMetricCard('Syllabus Progress', '82% Cover', Icons.book, SisColors.navy),
          ],
        ),
        const SizedBox(height: 20),
        Text('Academic Controls', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 10),
        _buildActionTile('Entrance Exam Interviews', 'Launch WebRTC virtual interview room for applicants', Icons.video_camera_front, () {}),
        _buildActionTile('Master Timetable Auditor', 'Review class schedule & teacher period allocations', Icons.calendar_today, () {}),
        _buildActionTile('Teaching Verification Audit', 'Check teacher check-ins & topic coverage notes', Icons.rule, () {}),
      ],
    );
  }

  // 4. TEACHER DASHBOARD
  Widget _buildTeacherView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Today\'s Classes & Attendance Register', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 10),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: SisColors.lightGray)),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Class: JSS 3 — Section A', style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold, color: SisColors.navy)),
                  Text('Subject: Integrated Science', style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
                ],
              ),
              ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Attendance Saved & FCM Push Sent to Parents!')));
                },
                style: ElevatedButton.styleFrom(backgroundColor: SisColors.royalBlue, padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8)),
                child: const Text('Save Register', style: TextStyle(fontSize: 12)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        Text('STUDENT ATTENDANCE LIST', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.navy, letterSpacing: 1)),
        const SizedBox(height: 8),
        ..._studentList.map((stu) => Card(
          margin: const EdgeInsets.only(bottom: 8),
          child: ListTile(
            title: Text(stu['name'], style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600)),
            subtitle: Text(stu['id'], style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
            trailing: PopupMenuButton<String>(
              initialValue: stu['status'],
              onSelected: (val) => setState(() => stu['status'] = val),
              itemBuilder: (_) => [
                const PopupMenuItem(value: 'PRESENT', child: Text('Present')),
                const PopupMenuItem(value: 'ABSENT', child: Text('Absent (Triggers FCM Notification)')),
                const PopupMenuItem(value: 'LATE', child: Text('Late')),
              ],
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: stu['status'] == 'PRESENT' ? SisColors.success.withOpacity(0.15) :
                         stu['status'] == 'ABSENT' ? SisColors.error.withOpacity(0.15) : SisColors.warning.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  stu['status'],
                  style: TextStyle(
                    fontSize: 11, 
                    fontWeight: FontWeight.bold,
                    color: stu['status'] == 'PRESENT' ? SisColors.success :
                           stu['status'] == 'ABSENT' ? SisColors.error : SisColors.warning,
                  ),
                ),
              ),
            ),
          ),
        )),
      ],
    );
  }

  // 5. STUDENT DASHBOARD
  // 5. STUDENT DASHBOARD & ALUMNI ARCHIVE VIEW
  Widget _buildStudentView() {
    if (widget.user.isAlumni) {
      return _buildAlumniView();
    }
    return _buildActiveStudentView();
  }

  Widget _buildAlumniView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Dark blue top banner
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
          decoration: const BoxDecoration(
            color: Color(0xFF0F1E36),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.lock_outline, color: Colors.white, size: 14),
              const SizedBox(width: 6),
              Text(
                'Alumni Archive View (Read-Only)',
                style: GoogleFonts.inter(fontSize: 12, color: Colors.white, fontWeight: FontWeight.w600),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        
        // Welcome Header
        Text(
          'Alumni Archive',
          style: GoogleFonts.outfit(fontSize: 24, fontWeight: FontWeight.bold, color: SisColors.navy),
        ),
        const SizedBox(height: 6),
        Text(
          'Welcome back, ${widget.user.fullName.split(' ')[0]}. Your historical records and certificates are securely stored here in read-only mode.',
          style: GoogleFonts.inter(fontSize: 13, color: SisColors.grayText, height: 1.4),
        ),
        const SizedBox(height: 20),

        // 1. BECE/WASSCE Certificate Vault
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.verified_outlined, color: SisColors.navy),
                  const SizedBox(width: 8),
                  Text(
                    'BECE/WASSCE Certificate Vault',
                    style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              _buildCertificateItem('WASSCE Final Certificate - 2023', 'Issued: Nov 2023 • Validated'),
              const SizedBox(height: 12),
              _buildCertificateItem('BECE Final Certificate - 2020', 'Issued: Oct 2020 • Validated'),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // 2. Historical Transcripts
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.history_edu, color: SisColors.navy),
                  const SizedBox(width: 8),
                  Text(
                    'Historical Transcripts',
                    style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              _buildTranscriptCard('Senior High School Transcript', 'Complete academic record (Forms 1-3).'),
              const SizedBox(height: 12),
              _buildTranscriptCard('Junior High School Transcript', 'Complete academic record (JHS 1-3).'),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // 3. Billing Statements
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.receipt_long, color: SisColors.navy),
                  const SizedBox(width: 8),
                  Text(
                    'Billing Statements',
                    style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              _buildBillingRow('Term 3 - 2023'),
              const Divider(height: 20),
              _buildBillingRow('Term 2 - 2023'),
              const Divider(height: 20),
              _buildBillingRow('Term 1 - 2023'),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFE8F0FE),
                    foregroundColor: SisColors.navy,
                    elevation: 0,
                  ),
                  onPressed: () {},
                  child: const Text('View All History', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // 4. Active Courses & Actions (Disabled)
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.edit_off_outlined, color: Colors.grey.shade400),
                  const SizedBox(width: 8),
                  Text(
                    'Active Courses & Actions',
                    style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.grey.shade400),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                'Course registration, assignment submissions, and active feedback are disabled for alumni accounts.',
                style: GoogleFonts.inter(fontSize: 12, color: Colors.grey.shade500),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: null,
                  style: OutlinedButton.styleFrom(
                    disabledBorderColor: Colors.grey.shade200,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  child: Text('Submit Assignment (Disabled)', style: TextStyle(color: Colors.grey.shade400)),
                ),
              ),
              const SizedBox(height: 10),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: null,
                  style: OutlinedButton.styleFrom(
                    disabledBorderColor: Colors.grey.shade200,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  child: Text('Register Course (Disabled)', style: TextStyle(color: Colors.grey.shade400)),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildActiveStudentView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 1. Student Header Profile Card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            children: [
              const CircleAvatar(
                radius: 36,
                backgroundImage: NetworkImage('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'),
              ),
              const SizedBox(height: 12),
              Text(
                widget.user.fullName,
                style: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.bold, color: SisColors.navy),
              ),
              const SizedBox(height: 4),
              Text(
                'Grade 11 • Advanced Sciences Track',
                style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFFE8F0FE),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.verified, color: SisColors.royalBlue, size: 14),
                    const SizedBox(width: 6),
                    Text(
                      'Excellence Scholar',
                      style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.royalBlue),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // 2. Attendance Rate Card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Attendance Rate',
                style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy),
              ),
              const SizedBox(height: 20),
              Center(
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    SizedBox(
                      width: 120,
                      height: 120,
                      child: CircularProgressIndicator(
                        value: 0.95,
                        strokeWidth: 10,
                        backgroundColor: Colors.grey.shade100,
                        color: SisColors.navy,
                      ),
                    ),
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('95%', style: GoogleFonts.outfit(fontSize: 24, fontWeight: FontWeight.bold, color: SisColors.navy)),
                        Text('PRESENT', style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.bold, color: SisColors.navy)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Center(
                child: Text(
                  'Consistent attendance maintaining top tier status.',
                  style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // 3. Gemini AI Syllabus Progress
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.smart_toy_outlined, color: SisColors.navy),
                      const SizedBox(width: 8),
                      Text(
                        'Gemini AI Syllabus Progress',
                        style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: () {},
                    child: Text('View Details', style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.bold, color: SisColors.royalBlue)),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              _buildProgressRow('Advanced Physics - Quantum Mechanics', 78),
              const SizedBox(height: 12),
              _buildProgressRow('Literature - Modernist Era', 92),
              const SizedBox(height: 12),
              _buildProgressRow('Calculus II - Integration Applications', 45),
              const SizedBox(height: 16),
              
              // AI Suggestion Box
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFFE8F0FE),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.lightbulb_outline, color: SisColors.navy, size: 18),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'AI Suggestion: Focus on Calculus II Integration techniques this week to stay on track with the cohort baseline.',
                        style: GoogleFonts.inter(fontSize: 11, color: SisColors.navy, height: 1.4),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // 4. Cohort Leaderboard Card
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: SisColors.lightGray),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.emoji_events_outlined, color: SisColors.navy),
                      const SizedBox(width: 8),
                      Text(
                        'Cohort Leaderboard',
                        style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: SisColors.navy,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text('Term 2', style: GoogleFonts.inter(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              _buildLeaderboardItem(1, 'Sarah Jenkins', '12,450 pts', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'),
              const Divider(height: 20),
              _buildLeaderboardItem(2, '${widget.user.fullName} (You)', '12,100 pts', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', isMe: true),
              const Divider(height: 20),
              _buildLeaderboardItem(3, 'Michael Chang', '11,850 pts', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFF8F9FA),
                    foregroundColor: SisColors.navy,
                    elevation: 0,
                    side: const BorderSide(color: SisColors.lightGray),
                  ),
                  onPressed: () {},
                  child: const Text('VIEW FULL RANKINGS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCertificateItem(String title, String subtitle) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: SisColors.lightGray),
      ),
      child: Row(
        children: [
          const Icon(Icons.picture_as_pdf, color: SisColors.navy, size: 28),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: GoogleFonts.outfit(fontSize: 13, fontWeight: FontWeight.bold, color: SisColors.navy)),
                const SizedBox(height: 2),
                Text(subtitle, style: GoogleFonts.inter(fontSize: 11, color: SisColors.grayText)),
              ],
            ),
          ),
          ElevatedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.download, size: 12),
            label: const Text('Download PDF', style: TextStyle(fontSize: 10)),
            style: ElevatedButton.styleFrom(
              backgroundColor: SisColors.navy,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTranscriptCard(String title, String subtitle) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: SisColors.lightGray),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: SisColors.navy)),
          const SizedBox(height: 4),
          Text(subtitle, style: GoogleFonts.inter(fontSize: 11, color: SisColors.grayText)),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.download_for_offline, size: 14),
              label: const Text('Get Official Copy', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: SisColors.lightGray),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBillingRow(String term) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(term, style: GoogleFonts.inter(fontSize: 13, color: SisColors.darkText, fontWeight: FontWeight.w600)),
        TextButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.open_in_new, size: 12),
          label: const Text('View', style: TextStyle(fontSize: 12)),
          style: TextButton.styleFrom(foregroundColor: SisColors.royalBlue),
        ),
      ],
    );
  }

  Widget _buildProgressRow(String title, int progress) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.between,
          children: [
            Expanded(child: Text(title, style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w600, color: SisColors.darkText))),
            Text('$progress%', style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.bold, color: SisColors.darkText)),
          ],
        ),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: progress / 100,
            minHeight: 8,
            backgroundColor: Colors.grey.shade100,
            color: SisColors.navy,
          ),
        ),
      ],
    );
  }

  Widget _buildLeaderboardItem(int rank, String name, String points, String imgUrl, {bool isMe = false}) {
    return Container(
      padding: isMe ? const EdgeInsets.all(8) : EdgeInsets.zero,
      decoration: BoxDecoration(
        color: isMe ? const Color(0xFFE8F0FE).withOpacity(0.5) : Colors.transparent,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 24,
            child: Text(
              rank.toString(),
              style: GoogleFonts.outfit(
                fontSize: 16, 
                fontWeight: FontWeight.bold, 
                color: rank == 1 ? Colors.amber.shade700 : rank == 2 ? SisColors.navy : Colors.grey,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          const SizedBox(width: 8),
          CircleAvatar(
            radius: 18,
            backgroundImage: NetworkImage(imgUrl),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              name,
              style: GoogleFonts.inter(
                fontSize: 13, 
                fontWeight: isMe ? FontWeight.bold : FontWeight.w600, 
                color: SisColors.darkText,
              ),
            ),
          ),
          Text(
            points,
            style: GoogleFonts.inter(
              fontSize: 13, 
              fontWeight: FontWeight.bold, 
              color: SisColors.navy,
            ),
          ),
        ],
      ),
    );
  }

  // 6. PARENT DASHBOARD
  Widget _buildParentView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Child Attendance & Progress Feed', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 12),
        Row(
          children: [
            _buildMetricCard('Attendance', '96% Present', Icons.check_circle, SisColors.success),
            const SizedBox(width: 12),
            _buildMetricCard('Average Score', '88% High', Icons.grade, SisColors.royalBlue),
          ],
        ),
        const SizedBox(height: 20),
        Text('Real-Time Updates', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
        const SizedBox(height: 10),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: SisColors.lightGray)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.notifications_active, color: SisColors.royalBlue, size: 20),
                  const SizedBox(width: 8),
                  Text('Today\'s Attendance Check-in', style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: SisColors.navy)),
                ],
              ),
              const SizedBox(height: 6),
              Text('Child marked PRESENT in JSS 3 Integrated Science at 8:15 AM.', style: GoogleFonts.inter(fontSize: 12, color: SisColors.darkText)),
            ],
          ),
        ),
        const SizedBox(height: 14),
        _buildActionTile('Direct Message Teacher', 'Communicate securely with subject instructors', Icons.chat, () {}),
        _buildActionTile('Tuition Receipts & Fees', 'View statements and payment confirmations', Icons.receipt_long, () {}),
      ],
    );
  }

  Widget _buildMetricCard(String title, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: SisColors.lightGray),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 8),
            Text(value, style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: SisColors.navy)),
            Text(title, style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
          ],
        ),
      ),
    );
  }

  Widget _buildActionTile(String title, String subtitle, IconData icon, VoidCallback onTap) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(color: SisColors.softBlue, borderRadius: BorderRadius.circular(10)),
          child: Icon(icon, color: SisColors.navy, size: 20),
        ),
        title: Text(title, style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: SisColors.navy)),
        subtitle: Text(subtitle, style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
        trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: SisColors.grayText),
      ),
    );
  }

  void _showQuizModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (_) => Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('AI Practice Quiz Session', style: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.bold, color: SisColors.navy)),
            const SizedBox(height: 6),
            Text('Question 1 of 5 • BECE Science', style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
            const SizedBox(height: 16),
            Text('Which element is essential for photosynthesis in green plants?', style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w600)),
            const SizedBox(height: 16),
            ...['A) Carbon Dioxide & Sunlight', 'B) Nitrogen Gas', 'C) Sodium Chloride', 'D) Methane'].map((opt) => Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: SisColors.softBlue,
                  foregroundColor: SisColors.navy,
                  alignment: Alignment.centerLeft,
                ),
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Correct Answer! +10 Points added to Leaderboard')));
                },
                child: Text(opt),
              ),
            )),
          ],
        ),
      ),
    );
  }
}
