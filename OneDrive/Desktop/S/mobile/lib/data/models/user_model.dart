enum UserRole {
  itManager,
  principal,
  vicePrincipal,
  teacher,
  student,
  parent;

  String get displayName {
    switch (this) {
      case UserRole.itManager:
        return 'IT Manager';
      case UserRole.principal:
        return 'Principal';
      case UserRole.vicePrincipal:
        return 'Vice Principal';
      case UserRole.teacher:
        return 'Teacher';
      case UserRole.student:
        return 'Student';
      case UserRole.parent:
        return 'Parent / Guardian';
    }
  }

  static UserRole fromString(String role) {
    switch (role.toUpperCase().replaceAll('-', '_')) {
      case 'IT_MANAGER':
      case 'ITMANAGER':
        return UserRole.itManager;
      case 'PRINCIPAL':
        return UserRole.principal;
      case 'VICE_PRINCIPAL':
      case 'VICEPRINCIPAL':
      case 'VP':
        return UserRole.vicePrincipal;
      case 'TEACHER':
        return UserRole.teacher;
      case 'STUDENT':
        return UserRole.student;
      case 'PARENT':
        return UserRole.parent;
      default:
        return UserRole.student;
    }
  }

  String toJson() => name.toUpperCase();
}

class UserModel {
  final String id;
  final String fullName;
  final String email;
  final UserRole role;
  final String? studentId;
  final String? parentId;
  final String? classAssigned;
  final String? fcmToken;
  final String status; // 'ACTIVE' | 'WITHDRAWN' | 'SUSPENDED' | 'GRADUATED'
  final String? currentGradeLevel;

  UserModel({
    required this.id,
    required this.fullName,
    required this.email,
    required this.role,
    this.studentId,
    this.parentId,
    this.classAssigned,
    this.fcmToken,
    this.status = 'ACTIVE',
    this.currentGradeLevel,
  });

  bool get isAlumni => status == 'GRADUATED';

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? json['_id'] ?? '',
      fullName: json['fullName'] ?? json['name'] ?? 'User',
      email: json['email'] ?? '',
      role: UserRole.fromString(json['role'] ?? 'STUDENT'),
      studentId: json['studentId'],
      parentId: json['parentId'],
      classAssigned: json['classAssigned'],
      fcmToken: json['fcmToken'],
      status: json['status'] ?? 'ACTIVE',
      currentGradeLevel: json['currentGradeLevel'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'fullName': fullName,
      'email': email,
      'role': role.toJson(),
      'studentId': studentId,
      'parentId': parentId,
      'classAssigned': classAssigned,
      'fcmToken': fcmToken,
      'status': status,
      'currentGradeLevel': currentGradeLevel,
    };
  }
}
