import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SisColors {
  // Primary Brand Colors
  static const Color navy = Color(0xFF1B365D);
  static const Color royalBlue = Color(0xFF0056B3);
  
  // Accents & Highlights (Per Executive Directive)
  static const Color gold = Color(0xFFFFCC00);
  static const Color magenta = Color(0xFFE91E63);
  static const Color cyan = Color(0xFF00BCD4);
  
  // Backgrounds & Neutral Surfaces
  static const Color background = Color(0xFFF8F9FA);
  static const Color card = Colors.white;
  static const Color darkText = Color(0xFF1B365D);
  static const Color grayText = Color(0xFF6B7280);
  static const Color lightGray = Color(0xFFE5E7EB);
  
  // Status Colors
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
}

class SisTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: SisColors.background,
      primaryColor: SisColors.navy,
      colorScheme: ColorScheme.light(
        primary: SisColors.navy,
        secondary: SisColors.gold,
        tertiary: SisColors.cyan,
        surface: SisColors.card,
        background: SisColors.background,
        error: SisColors.error,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.outfit(fontSize: 32, fontWeight: FontWeight.bold, color: SisColors.navy),
        titleLarge: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: SisColors.navy),
        titleMedium: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.w600, color: SisColors.darkText),
        bodyLarge: GoogleFonts.inter(fontSize: 16, color: SisColors.darkText),
        bodyMedium: GoogleFonts.inter(fontSize: 14, color: SisColors.grayText),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: SisColors.navy,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: SisColors.navy,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.bold),
        ),
      ),
      cardTheme: CardTheme(
        color: SisColors.card,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
    );
  }
}
