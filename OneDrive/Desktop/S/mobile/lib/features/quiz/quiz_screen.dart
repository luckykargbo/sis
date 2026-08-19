import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';
import '../../core/services/anti_cheat_service.dart';

class QuizScreen extends StatefulWidget {
  final String gradeLevel; // "BECE" or "WASSCE"
  final String subject;

  const QuizScreen({
    super.key,
    this.gradeLevel = 'BECE',
    this.subject = 'Integrated Science',
  });

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  late AntiCheatService _antiCheatService;
  int _currentQuestionIndex = 0;
  int _selectedOption = -1;
  int _score = 0;
  int _violationsCount = 0;
  bool _answered = false;
  bool _quizCompleted = false;

  // Question Timer
  Timer? _timer;
  int _timeLeftSeconds = 30;

  final List<Map<String, dynamic>> _questions = [
    {
      'id': 'q1',
      'question': 'Which organelle is responsible for cellular respiration and energy production in plants?',
      'options': ['A) Nucleus', 'B) Mitochondria', 'C) Chloroplast', 'D) Ribosome'],
      'correctOption': 1,
      'explanation': 'Mitochondria convert glucose and oxygen into ATP energy required for metabolic functions.',
    },
    {
      'id': 'q2',
      'question': 'What is the standard chemical formula for table salt?',
      'options': ['A) H2O', 'B) CO2', 'C) NaCl', 'D) CaCO3'],
      'correctOption': 2,
      'explanation': 'NaCl (Sodium Chloride) is the ionic compound formed by sodium and chlorine.',
    },
    {
      'id': 'q3',
      'question': 'If 4x - 8 = 16, what is the value of x?',
      'options': ['A) 4', 'B) 5', 'C) 6', 'D) 8'],
      'correctOption': 2,
      'explanation': 'Add 8 to both sides: 4x = 24. Divide by 4: x = 6.',
    },
    {
      'id': 'q4',
      'question': 'Which process turns a solid directly into a gas without becoming a liquid?',
      'options': ['A) Condensation', 'B) Evaporation', 'C) Sublimation', 'D) Melting'],
      'correctOption': 2,
      'explanation': 'Sublimation is the direct transition of a substance from solid to gas (e.g. dry ice).',
    },
  ];

  @override
  void initState() {
    super.initState();
    _antiCheatService = AntiCheatService(
      onViolationDetected: (count) {
        setState(() => _violationsCount = count);
        if (count == 1) {
          _showViolationWarningDialog();
        }
      },
      onQuizTerminated: () {
        _handleQuizTermination();
      },
    );
    _antiCheatService.startLockdown();
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    _timeLeftSeconds = 30;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_timeLeftSeconds > 0) {
        setState(() => _timeLeftSeconds--);
      } else {
        _handleNextQuestion();
      }
    });
  }

  void _showViolationWarningDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: [
            const Icon(Icons.warning_amber_rounded, color: SisColors.error, size: 28),
            const SizedBox(width: 8),
            Text('ANTI-CHEAT WARNING', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.error)),
          ],
        ),
        content: Text('App switch or tab minimization detected! Leaving the quiz screen again will forfeit your score.', style: GoogleFonts.inter(fontSize: 13)),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            style: ElevatedButton.styleFrom(backgroundColor: SisColors.error),
            child: const Text('I Understand'),
          ),
        ],
      ),
    );
  }

  void _handleQuizTermination() {
    _timer?.cancel();
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text('Quiz Session Terminated', style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: SisColors.error)),
        content: Text('Multiple app switches were detected. This session has been terminated and 0 points logged.', style: GoogleFonts.inter(fontSize: 13)),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(backgroundColor: SisColors.navy),
            child: const Text('Return to Dashboard'),
          ),
        ],
      ),
    );
  }

  void _handleOptionSelect(int index) {
    if (_answered) return;
    setState(() {
      _selectedOption = index;
      _answered = true;
      if (index == _questions[_currentQuestionIndex]['correctOption']) {
        _score++;
      }
    });
  }

  void _handleNextQuestion() {
    if (_currentQuestionIndex < _questions.length - 1) {
      setState(() {
        _currentQuestionIndex++;
        _selectedOption = -1;
        _answered = false;
      });
      _startTimer();
    } else {
      _timer?.cancel();
      setState(() => _quizCompleted = true);
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _antiCheatService.stopLockdown();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_quizCompleted) {
      return _buildCompletionView();
    }

    final q = _questions[_currentQuestionIndex];

    return Scaffold(
      backgroundColor: SisColors.background,
      appBar: AppBar(
        title: Text('${widget.gradeLevel} Quiz — ${widget.subject}'),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(color: SisColors.error.withOpacity(0.2), borderRadius: BorderRadius.circular(12)),
            child: Row(
              children: [
                const Icon(Icons.shield, color: Colors.white, size: 14),
                const SizedBox(width: 4),
                Text('Violations: $_violationsCount/2', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
              ],
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Progress Bar & Timer
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Question ${_currentQuestionIndex + 1} of ${_questions.length}', style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: SisColors.navy)),
                  Row(
                    children: [
                      const Icon(Icons.timer, color: SisColors.royalBlue, size: 18),
                      const SizedBox(width: 4),
                      Text('$_timeLeftSeconds s', style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: _timeLeftSeconds < 10 ? SisColors.error : SisColors.navy)),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: LinearProgressIndicator(
                  value: (_currentQuestionIndex + 1) / _questions.length,
                  backgroundColor: SisColors.lightGray,
                  valueColor: const AlwaysStoppedAnimation<Color>(SisColors.royalBlue),
                  minHeight: 8,
                ),
              ),

              const SizedBox(height: 24),

              // Question Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: SisColors.lightGray),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 4)),
                  ],
                ),
                child: Text(
                  q['question'],
                  style: GoogleFonts.outfit(fontSize: 17, fontWeight: FontWeight.bold, color: SisColors.navy),
                ),
              ),

              const SizedBox(height: 20),

              // Options List
              Expanded(
                child: ListView.builder(
                  itemCount: (q['options'] as List).length,
                  itemBuilder: (_, idx) {
                    final optionText = q['options'][idx];
                    final isCorrect = idx == q['correctOption'];
                    final isSelected = idx == _selectedOption;

                    Color btnColor = Colors.white;
                    Color borderColor = SisColors.lightGray;
                    Color textColor = SisColors.darkText;

                    if (_answered) {
                      if (isCorrect) {
                        btnColor = SisColors.success.withOpacity(0.15);
                        borderColor = SisColors.success;
                        textColor = SisColors.success;
                      } else if (isSelected) {
                        btnColor = SisColors.error.withOpacity(0.15);
                        borderColor = SisColors.error;
                        textColor = SisColors.error;
                      }
                    }

                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12.0),
                      child: InkWell(
                        onTap: () => _handleOptionSelect(idx),
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: btnColor,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: borderColor, width: 1.5),
                          ),
                          child: Text(optionText, style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600, color: textColor)),
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Explanation Box if Answered
              if (_answered) ...[
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(color: SisColors.softBlue, borderRadius: BorderRadius.circular(12)),
                  child: Row(
                    children: [
                      const Icon(Icons.info_outline, color: SisColors.royalBlue, size: 20),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(q['explanation'], style: GoogleFonts.inter(fontSize: 12, color: SisColors.navy)),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _handleNextQuestion,
                    style: ElevatedButton.styleFrom(backgroundColor: SisColors.navy),
                    child: Text(_currentQuestionIndex < _questions.length - 1 ? 'Next Question →' : 'Finish Quiz'),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCompletionView() {
    final percentage = (_score / _questions.length * 100).round();
    final pointsEarned = _score * 25;

    return Scaffold(
      backgroundColor: SisColors.background,
      appBar: AppBar(title: const Text('Quiz Complete')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: const BoxDecoration(color: SisColors.softBlue, shape: BoxShape.circle),
                child: const Icon(Icons.emoji_events, color: SisColors.royalBlue, size: 44),
              ),
              const SizedBox(height: 20),
              Text('Great Effort!', style: GoogleFonts.outfit(fontSize: 26, fontWeight: FontWeight.bold, color: SisColors.navy)),
              const SizedBox(height: 6),
              Text('You scored $_score out of ${_questions.length} ($percentage%)', style: GoogleFonts.inter(fontSize: 16, color: SisColors.grayText)),
              const SizedBox(height: 20),

              Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                decoration: BoxDecoration(color: SisColors.navy, borderRadius: BorderRadius.circular(16)),
                child: Text('+$pointsEarned Leaderboard Points Earned! 🔥', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
              ),

              const SizedBox(height: 30),

              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                style: ElevatedButton.styleFrom(backgroundColor: SisColors.royalBlue, padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 14)),
                child: const Text('Return to Dashboard'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
