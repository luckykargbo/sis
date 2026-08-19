import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'features/auth/login_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const StandardsInternationalApp());
}

class StandardsInternationalApp extends StatelessWidget {
  const StandardsInternationalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Standards International School',
      debugShowCheckedModeBanner: false,
      theme: SisTheme.lightTheme,
      home: const LoginScreen(),
    );
  }
}
