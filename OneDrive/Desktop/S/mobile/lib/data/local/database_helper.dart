import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('sis_offline.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: 1,
      onCreate: _createDB,
    );
  }

  Future _createDB(Database db, int version) async {
    // Table for storing offline teacher attendance logs
    await db.execute('''
      CREATE TABLE offline_attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_name TEXT NOT NULL,
        subject TEXT NOT NULL,
        student_id TEXT NOT NULL,
        student_name TEXT NOT NULL,
        status TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        synced INTEGER NOT NULL DEFAULT 0
      )
    ''');

    // Table for offline cached subject notes
    await db.execute('''
      CREATE TABLE cached_notes (
        id TEXT PRIMARY KEY,
        subject TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        class_level TEXT NOT NULL,
        downloaded_at TEXT NOT NULL
      )
    ''');

    // Table for offline pending submissions
    await db.execute('''
      CREATE TABLE pending_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        assignment_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        submission_text TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    ''');
  }

  Future<int> insertAttendanceLog(Map<String, dynamic> row) async {
    final db = await instance.database;
    return await db.insert('offline_attendance', row);
  }

  Future<List<Map<String, dynamic>>> getUnsyncedAttendanceLogs() async {
    final db = await instance.database;
    return await db.query('offline_attendance', where: 'synced = ?', whereArgs: [0]);
  }

  Future<int> markAttendanceSynced(int id) async {
    final db = await instance.database;
    return await db.update('offline_attendance', {'synced': 1}, where: 'id = ?', whereArgs: [id]);
  }
}
