import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';
import '../../data/models/user_model.dart';
import '../../core/services/api_service.dart';
import '../dashboard/role_dashboard_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController(text: 'parent.khadija@sis.edu.sl');
  final _passwordController = TextEditingController(text: 'password123');
  bool _isLoading = false;
  bool _obscurePassword = true;
  bool _rememberMe = true;
  UserRole _selectedRole = UserRole.parent;

  final ApiService _apiService = ApiService();

  void _onRoleChanged(UserRole role) {
    setState(() {
      _selectedRole = role;
      switch (role) {
        case UserRole.parent:
          _emailController.text = 'parent.khadija@sis.edu.sl';
          break;
        case UserRole.student:
          _emailController.text = 'student.st001@sis.edu.sl';
          break;
        case UserRole.teacher:
          _emailController.text = 'teacher.kamara@sis.edu.sl';
          break;
        case UserRole.vicePrincipal:
          _emailController.text = 'vp.academic@sis.edu.sl';
          break;
        case UserRole.principal:
          _emailController.text = 'principal@sis.edu.sl';
          break;
        case UserRole.itManager:
          _emailController.text = 'it.admin@sis.edu.sl';
          break;
      }
    });
  }

  void _handleLogin() async {
    setState(() => _isLoading = true);

    final res = await _apiService.login(_emailController.text, _passwordController.text);

    setState(() => _isLoading = false);

    if (mounted) {
      final userData = res['user'] ?? {
        'id': 'user_001',
        'fullName': 'S.I.S. Member',
        'email': _emailController.text,
        'role': _selectedRole.toJson(),
      };
      
      userData['role'] = _selectedRole.toJson();
      final user = UserModel.fromJson(userData);

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => RoleDashboardScreen(user: user)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 28.0),
          child: Container(
            padding: const EdgeInsets.all(28),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.02),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // School Shield Crest
                Center(
                  child: Container(
                    width: 130,
                    height: 130,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE2E8F0).withOpacity(0.4),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    padding: const EdgeInsets.all(12),
                    child: Image.asset(
                      'assets/images/logo.png',
                      errorBuilder: (_, __, ___) => const Icon(
                        Icons.shield,
                        size: 70,
                        color: SisColors.navy,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Welcome Header
                Text(
                  'Welcome to S.I.S',
                  style: GoogleFonts.outfit(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: SisColors.navy,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 4),
                Text(
                  'Standards International School Portal',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    color: SisColors.grayText,
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),

                // Email field
                Text(
                  'Email Address',
                  style: GoogleFonts.inter(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _emailController,
                  style: GoogleFonts.inter(fontSize: 14, color: SisColors.darkText),
                  decoration: InputDecoration(
                    hintText: 'administrator@sis.edu',
                    filled: true,
                    fillColor: Colors.white,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // Password field
                Text(
                  'Password',
                  style: GoogleFonts.inter(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  style: GoogleFonts.inter(fontSize: 14, color: SisColors.darkText),
                  decoration: InputDecoration(
                    hintText: '••••••••',
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                        color: Colors.black54,
                        size: 20,
                      ),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                    filled: true,
                    fillColor: Colors.white,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
                    ),
                  ),
                ),
                const SizedBox(height: 28),

                // Action button
                SizedBox(
                  height: 52,
                  child: ElevatedButton(
                    onPressed: _isLoading ? null : _handleLogin,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF0F2644),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      elevation: 0,
                    ),
                    child: _isLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'Request Security Code',
                                style: GoogleFonts.inter(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(width: 8),
                              const Icon(Icons.arrow_forward, size: 16),
                            ],
                          ),
                  ),
                ),
                const SizedBox(height: 24),

                // Divider line
                const Divider(color: Color(0xFFE2E8F0), height: 1),
                const SizedBox(height: 20),

                // Forgot password label
                Center(
                  child: Text(
                    'Forgot your password?',
                    style: GoogleFonts.inter(
                      fontSize: 12,
                      color: const Color(0xFF1E293B),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
