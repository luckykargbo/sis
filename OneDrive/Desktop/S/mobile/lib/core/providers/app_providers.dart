import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/user_model.dart';
import '../services/api_service.dart';

// 1. Auth Provider
final apiServiceProvider = Provider((ref) => ApiService());

final authProvider = StateNotifierProvider<AuthNotifier, AsyncValue<UserModel?>>((ref) {
  return AuthNotifier(ref.watch(apiServiceProvider));
});

class AuthNotifier extends StateNotifier<AsyncValue<UserModel?>> {
  final ApiService _apiService;

  AuthNotifier(this._apiService) : super(const AsyncValue.data(null));

  Future<void> login(String email, String password, UserRole role) async {
    state = const AsyncValue.loading();
    try {
      final result = await _apiService.login(email, password);
      final userData = result['user'] ?? {
        'id': 'usr_${email.split('@')[0]}',
        'fullName': 'S.I.S. Member',
        'email': email,
        'role': role.toJson(),
      };
      userData['role'] = role.toJson();
      final user = UserModel.fromJson(userData);
      state = AsyncValue.data(user);
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  void logout() {
    _apiService.logout();
    state = const AsyncValue.data(null);
  }
}

// 2. Attendance Provider
final attendanceProvider = StateNotifierProvider<AttendanceNotifier, List<Map<String, dynamic>>>((ref) {
  return AttendanceNotifier(ref.watch(apiServiceProvider));
});

class AttendanceNotifier extends StateNotifier<List<Map<String, dynamic>>> {
  final ApiService _apiService;

  AttendanceNotifier(this._apiService) : super([
    {'studentId': 'STU-001', 'name': 'Khadija Bangura', 'status': 'PRESENT'},
    {'studentId': 'STU-002', 'name': 'Emmanuel Sesay', 'status': 'PRESENT'},
    {'studentId': 'STU-003', 'name': 'Fatu Kamara', 'status': 'ABSENT'},
    {'studentId': 'STU-004', 'name': 'Mohamed Turay', 'status': 'LATE'},
  ]);

  void updateStatus(String studentId, String status) {
    state = [
      for (final item in state)
        if (item['studentId'] == studentId)
          {...item, 'status': status}
        else
          item,
    ];
  }

  Future<bool> submitRegister(String className, String subject, String period) async {
    final payload = {
      'className': className,
      'subject': subject,
      'period': period,
      'records': state,
    };
    final res = await _apiService.markAttendance(payload);
    return res['success'] == true;
  }
}

// 3. Quiz & Anti-Cheat Provider
class QuizState {
  final int currentQuestionIndex;
  final int score;
  final int violationsCount;
  final bool isCompleted;

  QuizState({
    this.currentQuestionIndex = 0,
    this.score = 0,
    this.violationsCount = 0,
    this.isCompleted = false,
  });

  QuizState copyWith({
    int? currentQuestionIndex,
    int? score,
    int? violationsCount,
    bool? isCompleted,
  }) {
    return QuizState(
      currentQuestionIndex: currentQuestionIndex ?? this.currentQuestionIndex,
      score: score ?? this.score,
      violationsCount: violationsCount ?? this.violationsCount,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }
}

final quizProvider = StateNotifierProvider<QuizNotifier, QuizState>((ref) {
  return QuizNotifier(ref.watch(apiServiceProvider));
});

class QuizNotifier extends StateNotifier<QuizState> {
  final ApiService _apiService;

  QuizNotifier(this._apiService) : super(QuizState());

  void registerViolation() {
    final newCount = state.violationsCount + 1;
    if (newCount >= 2) {
      state = state.copyWith(violationsCount: newCount, isCompleted: true, score: 0);
    } else {
      state = state.copyWith(violationsCount: newCount);
    }
  }

  void answerQuestion(bool isCorrect) {
    final newScore = isCorrect ? state.score + 25 : state.score;
    state = state.copyWith(score: newScore, currentQuestionIndex: state.currentQuestionIndex + 1);
  }

  Future<void> submitFinalQuiz(String studentId, String subject) async {
    await _apiService.submitQuizAttempt({
      'studentId': studentId,
      'subject': subject,
      'score': state.score,
      'violations': state.violationsCount,
    });
    state = state.copyWith(isCompleted: true);
  }
}
