import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';

class FcmService {
  static final FcmService instance = FcmService._init();
  FirebaseMessaging? _firebaseMessaging;

  FcmService._init();

  Future<void> initialize(BuildContext context) async {
    try {
      _firebaseMessaging = FirebaseMessaging.instance;

      // Request notification permissions (iOS/Android 13+)
      NotificationSettings settings = await _firebaseMessaging!.requestPermission(
        alert: true,
        badge: true,
        sound: true,
      );

      if (settings.authorizationStatus == AuthorizationStatus.authorized) {
        // Get Device FCM Token
        String? token = await _firebaseMessaging!.getToken();
        debugPrint('FCM Token: $token');

        // Handle Foreground Notifications
        FirebaseMessaging.onMessage.listen((RemoteMessage message) {
          if (message.notification != null) {
            _showForegroundSnackbar(
              context,
              message.notification!.title ?? 'S.I.S. Alert',
              message.notification!.body ?? 'New notification received',
            );
          }
        });

        // Handle Notification Taps (App Opened from Background)
        FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
          _handleNotificationDeepLink(context, message.data);
        });
      }
    } catch (e) {
      debugPrint('FCM initialization fallback: $e');
    }
  }

  void _showForegroundSnackbar(BuildContext context, String title, String body) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            Text(body, style: const TextStyle(fontSize: 12, color: Colors.white70)),
          ],
        ),
        backgroundColor: const Color(0xFF1B365D),
        duration: const Duration(seconds: 4),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _handleNotificationDeepLink(BuildContext context, Map<String, dynamic> data) {
    if (data['type'] == 'ATTENDANCE_ALERT') {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Opening Parent Attendance Detail Screen...')),
      );
    }
  }

  Future<String?> getToken() async {
    try {
      return await _firebaseMessaging?.getToken();
    } catch (_) {
      return 'mock_fcm_token_sis_2026';
    }
  }
}
