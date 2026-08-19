import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/foundation.dart';
import '../../data/local/database_helper.dart';

enum SyncState { offline, syncing, upToDate, error }

class SyncService {
  static final SyncService instance = SyncService._init();
  final DatabaseHelper _dbHelper = DatabaseHelper.instance;

  final StreamController<SyncState> _syncStateController = StreamController<SyncState>.broadcast();
  Stream<SyncState> get syncStateStream => _syncStateController.stream;

  SyncState _currentState = SyncState.upToDate;
  SyncState get currentState => _currentState;

  StreamSubscription<List<ConnectivityResult>>? _connectivitySubscription;

  SyncService._init();

  void initialize() {
    _connectivitySubscription = Connectivity().onConnectivityChanged.listen((results) {
      final isConnected = results.any((r) => r != ConnectivityResult.none);
      if (isConnected) {
        syncPendingData();
      } else {
        _updateState(SyncState.offline);
      }
    });
  }

  Future<void> syncPendingData() async {
    try {
      _updateState(SyncState.syncing);

      // 1. Drain unsynced SQLite attendance logs
      final unsyncedAttendance = await _dbHelper.getUnsyncedAttendanceLogs();
      for (final log in unsyncedAttendance) {
        final id = log['id'] as int;
        // Simulate Convex API call
        await Future.delayed(const Duration(milliseconds: 300));
        await _dbHelper.markAttendanceSynced(id);
      }

      _updateState(SyncState.upToDate);
    } catch (e) {
      debugPrint('Sync error: $e');
      _updateState(SyncState.error);
    }
  }

  void _updateState(SyncState state) {
    _currentState = state;
    _syncStateController.add(state);
  }

  void dispose() {
    _connectivitySubscription?.cancel();
    _syncStateController.close();
  }
}
