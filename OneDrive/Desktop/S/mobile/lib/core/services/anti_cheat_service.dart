import 'package:flutter/material.dart';

class AntiCheatService with WidgetsBindingObserver {
  final Function(int violations) onViolationDetected;
  final VoidCallback onQuizTerminated;
  
  int _violationCount = 0;
  bool _isActiveQuizSession = false;

  AntiCheatService({
    required this.onViolationDetected,
    required this.onQuizTerminated,
  });

  void startLockdown() {
    _violationCount = 0;
    _isActiveQuizSession = true;
    WidgetsBinding.instance.addObserver(this);
  }

  void stopLockdown() {
    _isActiveQuizSession = false;
    WidgetsBinding.instance.removeObserver(this);
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (!_isActiveQuizSession) return;

    // Detect when student switches tabs, minimizes app, or opens another application
    if (state == AppLifecycleState.paused || state == AppLifecycleState.inactive) {
      _violationCount++;
      onViolationDetected(_violationCount);

      if (_violationCount >= 2) {
        stopLockdown();
        onQuizTerminated();
      }
    }
  }

  int get violationCount => _violationCount;
}
