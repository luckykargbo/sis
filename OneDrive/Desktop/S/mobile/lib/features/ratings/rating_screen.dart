import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';

class RatingScreen extends StatefulWidget {
  final String teacherName;
  final String subject;

  const RatingScreen({
    super.key,
    this.teacherName = 'Mr. A. Kamara',
    this.subject = 'Integrated Science',
  });

  @override
  State<RatingScreen> createState() => _RatingScreenState();
}

class _RatingScreenState extends State<RatingScreen> {
  double _clarity = 4.0;
  double _punctuality = 5.0;
  double _helpfulness = 4.0;
  final _commentController = TextEditingController();
  bool _submitted = false;

  void _handleSubmit() {
    setState(() => _submitted = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Anonymous rating submitted securely to Vice Principal analytics!'),
        backgroundColor: SisColors.success,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SisColors.background,
      appBar: AppBar(
        title: const Text('Teacher Rating'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Anonymity Protection Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: SisColors.navy,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [BoxShadow(color: SisColors.navy.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4))],
              ),
              child: Row(
                children: [
                  const Icon(Icons.shield_outlined, color: Colors.white, size: 32),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('100% Anonymous Feedback', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                        const SizedBox(height: 2),
                        Text('Your name and student ID are stripped before saving. Ratings are aggregated for quality evaluation.', style: GoogleFonts.inter(fontSize: 12, color: Colors.white70)),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            if (_submitted) ...[
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: SisColors.lightGray)),
                child: Column(
                  children: [
                    const Icon(Icons.check_circle_outline, color: SisColors.success, size: 48),
                    const SizedBox(height: 12),
                    Text('Thank You for Your Feedback!', style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: SisColors.navy)),
                    const SizedBox(height: 6),
                    Text('Your anonymous rating for ${widget.teacherName} (${widget.subject}) has been logged.', style: GoogleFonts.inter(fontSize: 13, color: SisColors.grayText), textAlign: TextAlign.center),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      style: ElevatedButton.styleFrom(backgroundColor: SisColors.royalBlue),
                      child: const Text('Back to Dashboard'),
                    ),
                  ],
                ),
              ),
            ] else ...[
              // Form Card
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: SisColors.lightGray),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Instructor: ${widget.teacherName}', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.navy)),
                    Text('Subject: ${widget.subject}', style: GoogleFonts.inter(fontSize: 13, color: SisColors.grayText)),
                    const SizedBox(height: 20),

                    // Metric 1: Clarity
                    _buildSliderMetric('Clarity of Explanations', _clarity, (v) => setState(() => _clarity = v)),
                    const SizedBox(height: 16),

                    // Metric 2: Punctuality
                    _buildSliderMetric('Punctuality & Time Management', _punctuality, (v) => setState(() => _punctuality = v)),
                    const SizedBox(height: 16),

                    // Metric 3: Helpfulness
                    _buildSliderMetric('Helpfulness & Approachability', _helpfulness, (v) => setState(() => _helpfulness = v)),
                    const SizedBox(height: 20),

                    Text('OPTIONAL COMMENTS', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.navy, letterSpacing: 1)),
                    const SizedBox(height: 6),
                    TextField(
                      controller: _commentController,
                      maxLines: 3,
                      decoration: const InputDecoration(
                        hintText: 'Share constructive feedback about teaching methods...',
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 20),

                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: _handleSubmit,
                        style: ElevatedButton.styleFrom(backgroundColor: SisColors.navy),
                        child: const Text('Submit Anonymous Feedback'),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildSliderMetric(String title, double value, ValueChanged<double> onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.bold, color: SisColors.navy)),
            Text('${value.toInt()} / 5 Stars ⭐', style: GoogleFonts.outfit(fontSize: 13, fontWeight: FontWeight.bold, color: SisColors.royalBlue)),
          ],
        ),
        Slider(
          value: value,
          min: 1,
          max: 5,
          divisions: 4,
          activeColor: SisColors.royalBlue,
          onChanged: onChanged,
        ),
      ],
    );
  }
}
