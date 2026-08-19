import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({super.key});

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  final List<Map<String, dynamic>> _term1Leaderboard = [
    {'rank': 1, 'name': 'Khadija Bangura', 'points': 1450, 'streak': 7, 'quizzes': 18, 'badge': '🥇 Gold'},
    {'rank': 2, 'name': 'Emmanuel Sesay', 'points': 1320, 'streak': 5, 'quizzes': 15, 'badge': '🥈 Silver'},
    {'rank': 3, 'name': 'Fatu Kamara', 'points': 1210, 'streak': 4, 'quizzes': 14, 'badge': '🥉 Bronze'},
    {'rank': 4, 'name': 'Mohamed Turay', 'points': 980, 'streak': 3, 'quizzes': 11, 'badge': '#4'},
    {'rank': 5, 'name': 'Zainab Koroma', 'points': 890, 'streak': 2, 'quizzes': 10, 'badge': '#5'},
    {'rank': 6, 'name': 'Alimamy Jalloh', 'points': 760, 'streak': 1, 'quizzes': 8, 'badge': '#6'},
  ];

  final List<Map<String, dynamic>> _annualChampions = [
    {'rank': 1, 'name': 'Khadija Bangura', 'cumulativePoints': 4280, 'title': '👑 Annual Grand Champion', 'maxStreak': 12},
    {'rank': 2, 'name': 'Emmanuel Sesay', 'cumulativePoints': 3950, 'title': '🌟 First Runner-Up', 'maxStreak': 9},
    {'rank': 3, 'name': 'Fatu Kamara', 'cumulativePoints': 3620, 'title': '⭐ Second Runner-Up', 'maxStreak': 8},
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SisColors.background,
      appBar: AppBar(
        title: const Text('3-Term Leaderboard'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: Colors.white,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white60,
          labelStyle: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.bold),
          tabs: const [
            Tab(text: 'Term 1'),
            Tab(text: 'Term 2'),
            Tab(text: 'Term 3'),
            Tab(text: 'Annual Champion'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildTermView(_term1Leaderboard),
          _buildTermView(_term1Leaderboard),
          _buildTermView(_term1Leaderboard),
          _buildAnnualView(_annualChampions),
        ],
      ),
    );
  }

  Widget _buildTermView(List<Map<String, dynamic>> list) {
    final top3 = list.take(3).toList();
    final remaining = list.skip(3).toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          // Top 3 Podium Display
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              // #2 Silver
              if (top3.length > 1) _buildPodiumTile(top3[1], 110, SisColors.royalBlue, '2'),
              const SizedBox(width: 8),
              // #1 Gold
              if (top3.isNotEmpty) _buildPodiumTile(top3[0], 140, SisColors.navy, '1'),
              const SizedBox(width: 8),
              // #3 Bronze
              if (top3.length > 2) _buildPodiumTile(top3[2], 90, SisColors.lightBlue, '3'),
            ],
          ),

          const SizedBox(height: 24),

          Text('STUDENT RANKINGS', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: SisColors.navy, letterSpacing: 1)),
          const SizedBox(height: 10),

          ...remaining.map((item) => Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: Container(
                width: 32,
                height: 32,
                decoration: const BoxDecoration(color: SisColors.softBlue, shape: BoxShape.circle),
                child: Center(child: Text(item['badge'], style: GoogleFonts.outfit(fontSize: 12, fontWeight: FontWeight.bold, color: SisColors.navy))),
              ),
              title: Text(item['name'], style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold, color: SisColors.navy)),
              subtitle: Text('${item['quizzes']} Quizzes • ${item['streak']} Day Streak 🔥', style: GoogleFonts.inter(fontSize: 12, color: SisColors.grayText)),
              trailing: Text('${item['points']} pts', style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: SisColors.royalBlue)),
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildAnnualView(List<Map<String, dynamic>> champions) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: champions.length,
      itemBuilder: (_, idx) {
        final item = champions[idx];
        return Container(
          margin: const EdgeInsets.only(bottom: 14),
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: idx == 0 ? const LinearGradient(colors: [SisColors.navy, SisColors.royalBlue]) : null,
            color: idx != 0 ? Colors.white : null,
            borderRadius: BorderRadius.circular(16),
            border: idx != 0 ? Border.all(color: SisColors.lightGray) : null,
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))],
          ),
          child: Row(
            children: [
              Text(
                idx == 0 ? '👑' : idx == 1 ? '🌟' : '⭐',
                style: const TextStyle(fontSize: 32),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item['name'],
                      style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: idx == 0 ? Colors.white : SisColors.navy),
                    ),
                    Text(
                      item['title'],
                      style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w600, color: idx == 0 ? Colors.white70 : SisColors.royalBlue),
                    ),
                  ],
                ),
              ),
              Text(
                '${item['cumulativePoints']} Pts',
                style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: idx == 0 ? Colors.white : SisColors.navy),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPodiumTile(Map<String, dynamic> item, double height, Color color, String rank) {
    return Column(
      children: [
        CircleAvatar(
          radius: 20,
          backgroundColor: color,
          child: Text(item['name'].substring(0, 1), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        ),
        const SizedBox(height: 4),
        Text(item['name'].split(' ')[0], style: GoogleFonts.outfit(fontSize: 12, fontWeight: FontWeight.bold, color: SisColors.navy)),
        Text('${item['points']} pts', style: GoogleFonts.inter(fontSize: 10, color: SisColors.grayText)),
        const SizedBox(height: 6),
        Container(
          width: 80,
          height: height,
          decoration: BoxDecoration(
            color: color,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
          ),
          child: Center(
            child: Text(
              '#$rank',
              style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
            ),
          ),
        ),
      ],
    );
  }
}
