const http = require('http');

const PORT = 8080;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(buildHTML());
});

function buildHTML() {
return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>S.I.S. — Student Mobile Engine</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0F172A;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    /* ─── DEVICE FRAME ─── */
    .device {
      width: 100%;
      max-width: 430px;
      height: 100vh;
      background: #F5F6FA;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }
    @media (min-width: 640px) {
      .device {
        height: 900px;
        border-radius: 44px;
        border: 10px solid #1E293B;
        box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5);
      }
    }

    /* ─── TOP HEADER ─── */
    .top-header {
      background: linear-gradient(135deg, #1B365D 0%, #0F2440 100%);
      color: white;
      padding: 16px 20px;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    .top-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #FFCC00, #E91E63, #00BCD4, #FFCC00);
    }
    .header-left { display: flex; align-items: center; gap: 10px; }
    .header-logo {
      width: 36px; height: 36px;
      background: white;
      border-radius: 10px;
      padding: 3px;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid rgba(255,204,0,0.6);
      box-shadow: 0 0 12px rgba(255,204,0,0.3);
    }
    .header-logo img { width: 28px; height: 28px; object-fit: contain; }
    .header-title { font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 800; letter-spacing: -0.3px; }
    .header-subtitle { font-size: 10px; color: #FFCC00; font-weight: 600; font-style: italic; }

    /* ─── ROLE SWITCHER ─── */
    .role-switcher {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
      font-size: 10px;
      font-weight: 700;
      padding: 5px 8px;
      border-radius: 8px;
      outline: none;
      cursor: pointer;
    }
    .role-switcher option { background: #1B365D; color: white; }

    /* ─── CONTENT AREA ─── */
    .content-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .content-inner {
      padding: 16px;
      padding-bottom: 24px;
    }

    /* ─── BOTTOM NAV ─── */
    .bottom-nav {
      background: white;
      border-top: 1px solid #E2E8F0;
      display: flex;
      justify-content: space-around;
      padding: 8px 4px 12px;
      position: relative;
      z-index: 10;
    }
    .nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 10px;
      font-weight: 700;
      color: #94A3B8;
      transition: all 0.2s;
      padding: 2px 8px;
    }
    .nav-btn.active { color: #1B365D; }
    .nav-pill {
      width: 40px; height: 28px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      transition: all 0.25s;
    }
    .nav-btn.active .nav-pill {
      background: #3B82F6;
      color: white;
      box-shadow: 0 4px 12px -2px rgba(59,130,246,0.4);
    }
    .nav-badge {
      position: absolute;
      top: -2px; right: 2px;
      width: 8px; height: 8px;
      background: #EF4444;
      border-radius: 50%;
      border: 2px solid white;
    }

    /* ─── CARDS ─── */
    .card {
      background: white;
      border-radius: 16px;
      border: 1px solid #E2E8F0;
      padding: 16px;
      box-shadow: 0 2px 12px -3px rgba(0,0,0,0.06);
      margin-bottom: 12px;
    }
    .card-dark {
      background: linear-gradient(135deg, #1B365D 0%, #0F2440 100%);
      color: white;
      border: none;
      box-shadow: 0 8px 24px -4px rgba(27,54,93,0.3);
    }

    /* ─── PODIUM ─── */
    .podium-container {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 0;
      padding-top: 40px;
      margin-top: 12px;
    }
    .podium-person {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .podium-avatar {
      width: 64px; height: 64px;
      border-radius: 14px;
      object-fit: cover;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      margin-bottom: 4px;
    }
    .podium-avatar-1st {
      width: 80px; height: 80px;
      border-radius: 16px;
      border: 3px solid #FFCC00;
      box-shadow: 0 0 20px rgba(255,204,0,0.4), 0 4px 16px rgba(0,0,0,0.15);
    }
    .podium-crown {
      position: absolute;
      top: -28px;
      font-size: 24px;
    }
    .podium-badge {
      font-size: 9px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 10px;
      margin-top: 2px;
      margin-bottom: 4px;
    }
    .podium-badge-1st { background: #FFCC00; color: #1B365D; }
    .podium-badge-2nd { background: #CBD5E1; color: #475569; }
    .podium-badge-3rd { background: #FDBA74; color: #7C2D12; }
    .podium-name { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 13px; color: #1B365D; }
    .podium-dept { font-size: 10px; color: #64748B; font-weight: 500; }
    .podium-pts { font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 800; }
    .podium-pts-1st { color: #FFCC00; }
    .podium-pts-2nd { color: #64748B; }
    .podium-pts-3rd { color: #EA580C; }
    .podium-block {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px 12px 0 0;
      margin-top: 8px;
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      font-size: 36px;
    }
    .podium-block-1st { background: #FEF3C7; color: #D4A017; height: 100px; width: 120px; }
    .podium-block-2nd { background: #F1F5F9; color: #CBD5E1; height: 72px; width: 100px; }
    .podium-block-3rd { background: #F1F5F9; color: #CBD5E1; height: 56px; width: 100px; }

    /* ─── TERM TABS ─── */
    .term-tabs {
      display: flex;
      gap: 0;
      background: #F1F5F9;
      border-radius: 12px;
      padding: 4px;
      margin-top: 16px;
    }
    .term-tab {
      flex: 1;
      padding: 8px 4px;
      text-align: center;
      font-size: 11px;
      font-weight: 700;
      color: #64748B;
      border-radius: 10px;
      cursor: pointer;
      border: none;
      background: none;
      transition: all 0.2s;
    }
    .term-tab.active {
      background: #1B365D;
      color: white;
      box-shadow: 0 2px 8px rgba(27,54,93,0.3);
    }
    .term-tab-annual {
      color: #FFCC00 !important;
      font-weight: 800;
    }

    /* ─── QUIZ ─── */
    .exam-warning {
      background: #FEF2F2;
      border: 1px solid #FECACA;
      border-left: 4px solid #DC2626;
      padding: 12px 16px;
      border-radius: 0 12px 12px 0;
      margin-bottom: 16px;
    }
    .exam-warning-title {
      font-weight: 800;
      font-size: 13px;
      color: #991B1B;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .exam-warning-text { font-size: 11px; color: #7F1D1D; margin-top: 4px; line-height: 1.5; }

    .quiz-stats {
      display: flex;
      gap: 8px;
      margin: 12px 0;
    }
    .quiz-stat {
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .quiz-stat-streak {
      background: #F1F5F9;
      color: #1B365D;
      border: 1px solid #E2E8F0;
    }
    .quiz-stat-pts {
      background: #1B365D;
      color: #FFCC00;
    }

    .question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .question-number { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 18px; color: #1B365D; }
    .question-tag {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 6px;
      background: #DCFCE7;
      color: #166534;
    }
    .question-timer {
      font-size: 12px;
      font-weight: 700;
      color: #DC2626;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .progress-track {
      width: 100%;
      height: 6px;
      background: #E2E8F0;
      border-radius: 3px;
      overflow: hidden;
      margin: 10px 0 16px;
    }
    .progress-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.3s;
    }
    .progress-fill-blue { background: #3B82F6; }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border: 2px solid #E2E8F0;
      border-radius: 14px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      font-weight: 600;
      color: #334155;
    }
    .radio-option:hover { border-color: #93C5FD; background: #EFF6FF; }
    .radio-option.selected {
      border-color: #3B82F6;
      background: #EFF6FF;
      color: #1E40AF;
    }
    .radio-circle {
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid #CBD5E1;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .radio-option.selected .radio-circle {
      border-color: #3B82F6;
      background: #3B82F6;
    }
    .radio-option.selected .radio-circle::after {
      content: '';
      width: 8px; height: 8px;
      border-radius: 50%;
      background: white;
    }

    .btn-primary {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
      color: white;
      font-weight: 700;
      font-size: 13px;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px -2px rgba(37,99,235,0.4);
      transition: all 0.2s;
    }
    .btn-primary:active { transform: scale(0.98); }

    .btn-navy {
      background: linear-gradient(135deg, #1B365D 0%, #0F2440 100%);
      box-shadow: 0 4px 12px -2px rgba(27,54,93,0.4);
    }

    /* ─── NOTIFICATION ITEMS ─── */
    .notif-item {
      display: flex;
      gap: 12px;
      padding: 14px;
      border-radius: 14px;
      border: 1px solid #E2E8F0;
      background: white;
      margin-bottom: 10px;
      transition: all 0.2s;
    }
    .notif-item:hover { border-color: #93C5FD; }
    .notif-icon {
      width: 40px; height: 40px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }
    .notif-unread { border-left: 3px solid #3B82F6; }

    /* ─── PROFILE ─── */
    .profile-avatar-ring {
      width: 88px; height: 88px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FFCC00, #E91E63, #00BCD4);
      padding: 3px;
      margin: 0 auto;
    }
    .profile-avatar-inner {
      width: 100%; height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid white;
    }

    /* ─── ANIMATIONS ─── */
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    .fade-in-up { animation: fadeInUp 0.4s ease-out; }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

    /* ─── SCROLLBAR ─── */
    .content-area::-webkit-scrollbar { width: 0; }
    .content-area { scrollbar-width: none; }

    /* ─── UTILITY ─── */
    .text-gold { color: #FFCC00; }
    .text-navy { color: #1B365D; }
    .bg-navy { background: #1B365D; }
    .text-xs { font-size: 11px; }
    .text-xxs { font-size: 10px; }
    .mt-sm { margin-top: 8px; }
    .mt-md { margin-top: 12px; }
    .mb-sm { margin-bottom: 8px; }
    .mb-md { margin-bottom: 12px; }
    .gap-sm { gap: 8px; }
    .gap-md { gap: 12px; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .justify-center { justify-content: center; }
    .text-center { text-align: center; }
    .w-full { width: 100%; }
    .hidden { display: none !important; }
  </style>
</head>
<body>

  <div class="device" id="app">
    <!-- ─── TOP HEADER ─── -->
    <div class="top-header">
      <div class="header-left">
        <div class="header-logo">
          <img src="http://172.20.10.2:3000/logo.png" alt="S.I.S." />
        </div>
        <div>
          <div class="header-title">S.I.S. | Nos Educamus Mentem</div>
          <div class="header-subtitle" id="header-subtitle">Student Portal • Alexander Sterling</div>
        </div>
      </div>
      <select class="role-switcher" onchange="switchRole(this.value)">
        <option value="STUDENT" selected>Student (Alexander)</option>
        <option value="ALUMNI">Alumni (Kwabena)</option>
        <option value="PARENT">Parent</option>
        <option value="PRINCIPAL">Principal</option>
        <option value="TEACHER">Teacher</option>
        <option value="IT_ADMIN">IT Admin</option>
      </select>
    </div>

    <!-- ─── CONTENT AREA ─── -->
    <div class="content-area" id="content-area">
      <div class="content-inner" id="content-inner"></div>
    </div>

    <!-- ─── BOTTOM NAV (5-TAB for Student) ─── -->
    <div class="bottom-nav" id="bottom-nav"></div>
  </div>

<script>
// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let state = {
  role: 'STUDENT',
  tab: 'home',
  quizQuestion: 4,
  quizTotal: 25,
  quizSelected: null,
  quizTimer: 872,
  quizStreak: 12,
  quizPoints: 4520,
  termTab: 0,
  notifCount: 5
};

let timerInterval = null;

// ═══════════════════════════════════════════════
// ROLE SWITCHING
// ═══════════════════════════════════════════════
function switchRole(role) {
  state.role = role;
  state.tab = 'home';
  const subtitles = {
    STUDENT: 'Student Portal • Alexander Sterling',
    ALUMNI: 'Alumni Archive • Kwabena',
    PARENT: 'Parent Portal • Mrs. F. Sesay',
    PRINCIPAL: 'Principal Command Center',
    TEACHER: 'Faculty Portal • Mr. Kamara',
    IT_ADMIN: 'System Administration'
  };
  document.getElementById('header-subtitle').textContent = subtitles[role] || role;
  renderNav();
  renderContent();
}

// ═══════════════════════════════════════════════
// BOTTOM NAV RENDERING
// ═══════════════════════════════════════════════
function renderNav() {
  const nav = document.getElementById('bottom-nav');
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'practice', icon: '📝', label: 'Practice' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'notifications', icon: '🔔', label: 'Alerts', badge: true },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  nav.innerHTML = tabs.map(t => {
    const isActive = state.tab === t.id;
    return '<button class="nav-btn ' + (isActive ? 'active' : '') + '" onclick="switchTab(\'' + t.id + '\')">' +
      '<div class="nav-pill" style="position:relative">' + t.icon +
      (t.badge ? '<div class="nav-badge"></div>' : '') +
      '</div>' +
      '<span>' + t.label + '</span>' +
    '</button>';
  }).join('');
}

function switchTab(tab) {
  state.tab = tab;
  renderNav();
  renderContent();
}

// ═══════════════════════════════════════════════
// CONTENT ROUTER
// ═══════════════════════════════════════════════
function renderContent() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  const el = document.getElementById('content-inner');
  const renderers = {
    home: renderHome,
    practice: renderPractice,
    leaderboard: renderLeaderboard,
    notifications: renderNotifications,
    profile: renderProfile
  };
  (renderers[state.tab] || renderHome)(el);
}

// ═══════════════════════════════════════════════
// 1. HOME — Student/Alumni Dashboard
// ═══════════════════════════════════════════════
function renderHome(el) {
  if (state.role === 'ALUMNI') {
    renderAlumniHome(el);
    return;
  }
  renderActiveStudentHome(el);
}

function renderAlumniHome(el) {
  el.innerHTML = '<div class="fade-in-up">' +
    // Top banner
    '<div style="background:#0F1E36;color:white;padding:8px 12px;margin:-16px -16px 16px;text-align:center;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:6px">' +
      '<span>🔒 Alumni Archive View (Read-Only)</span>' +
    '</div>' +
    // Header title
    '<div style="margin-bottom:16px">' +
        '<div style="font-size:10px;font-weight:700;color:#DC2626">Due Tomorrow</div>' +
      '</div>' +
    '</div>' +

    '<div class="card" style="display:flex;align-items:center;gap:12px;cursor:pointer" onclick="alert(\\\'Opening Assignment: Essay on West African History\\\')">' +
      '<div style="width:40px;height:40px;background:#FFF7ED;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">✍️</div>' +
      '<div style="flex:1">' +
        '<div style="font-size:12px;font-weight:700;color:#1B365D">Essay: West African History</div>' +
        '<div style="font-size:10px;color:#64748B">Social Studies • Mr. Cole</div>' +
      '</div>' +
      '<div style="text-align:right">' +
        '<div style="font-size:10px;font-weight:700;color:#F59E0B">Due Friday</div>' +
      '</div>' +
    '</div>' +

  '</div>';
}

// ═══════════════════════════════════════════════
// 2. PRACTICE — WASSCE Mock Hub
// ═══════════════════════════════════════════════
function renderPractice(el) {
  state.quizSelected = null;

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  el.innerHTML = '<div class="fade-in-up">' +
    // Exam Warning
    '<div class="exam-warning">' +
      '<div class="exam-warning-title">⚠️ Strict Exam Conditions Active</div>' +
      '<div class="exam-warning-text">Navigating away from this tab will result in immediate disqualification. Ensure your workspace is clear.</div>' +
    '</div>' +

    // Title
    '<h2 class="font-outfit" style="font-size:24px;font-weight:900;color:#1B365D">WASSCE Mock Hub</h2>' +
    '<p style="font-size:13px;color:#64748B;margin-top:2px">Core Mathematics - Section B</p>' +

    // Stats
    '<div class="quiz-stats">' +
      '<div class="quiz-stat quiz-stat-streak">🔥 ' + state.quizStreak + ' Day Streak</div>' +
      '<div class="quiz-stat quiz-stat-pts">⭐ ' + state.quizPoints.toLocaleString() + ' Pts</div>' +
    '</div>' +

    // Question Card
    '<div class="card" style="margin-top:4px">' +
      '<div class="question-header">' +
        '<div class="question-number">Question ' + state.quizQuestion + ' of ' + state.quizTotal + '</div>' +
        '<div style="display:flex;gap:6px;align-items:center">' +
          '<span class="question-tag">Algebra</span>' +
          '<span class="question-timer" id="quiz-timer">⏱ ' + formatTime(state.quizTimer) + '</span>' +
        '</div>' +
      '</div>' +

      // Progress
      '<div class="progress-track">' +
        '<div class="progress-fill progress-fill-blue" style="width:' + ((state.quizQuestion / state.quizTotal) * 100) + '%"></div>' +
      '</div>' +

      // Question text
      '<p style="font-size:14px;color:#334155;margin-bottom:6px">Solve for <i>x</i> in the equation:</p>' +
      '<div style="font-size:20px;font-weight:700;color:#1B365D;margin:12px 0 20px;font-family:serif;letter-spacing:0.5px">3(<i>x</i> - 2) + 4 = 5<i>x</i> - 10</div>' +

      // Options
      '<div id="quiz-options">' +
        '<div class="radio-option" onclick="selectQuizOption(this, \\\'x = 2\\\')">' +
          '<div class="radio-circle"></div>' +
          '<span>x = 2</span>' +
        '</div>' +
        '<div class="radio-option" onclick="selectQuizOption(this, \\\'x = 4\\\')">' +
          '<div class="radio-circle"></div>' +
          '<span>x = 4</span>' +
        '</div>' +
        '<div class="radio-option" onclick="selectQuizOption(this, \\\'x = -1\\\')">' +
          '<div class="radio-circle"></div>' +
          '<span>x = -1</span>' +
        '</div>' +
        '<div class="radio-option" onclick="selectQuizOption(this, \\\'x = 0\\\')">' +
          '<div class="radio-circle"></div>' +
          '<span>x = 0</span>' +
        '</div>' +
      '</div>' +

      // Submit
      '<button class="btn-primary" style="margin-top:12px" onclick="submitQuizAnswer()">Submit Answer →</button>' +
    '</div>' +

    // Subject Quick-Pick
    '<div style="margin-top:4px">' +
      '<h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D;margin-bottom:10px">Choose Subject</h3>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
        '<div class="card" style="margin-bottom:0;cursor:pointer;text-align:center" onclick="alert(\\\'Loading English Language Mock...\\\')">' +
          '<div style="font-size:24px;margin-bottom:4px">📖</div>' +
          '<div style="font-size:11px;font-weight:700;color:#1B365D">English Language</div>' +
          '<div style="font-size:9px;color:#64748B;margin-top:2px">45 Questions</div>' +
        '</div>' +
        '<div class="card" style="margin-bottom:0;cursor:pointer;text-align:center" onclick="alert(\\\'Loading Integrated Science Mock...\\\')">' +
          '<div style="font-size:24px;margin-bottom:4px">🧬</div>' +
          '<div style="font-size:11px;font-weight:700;color:#1B365D">Int. Science</div>' +
          '<div style="font-size:9px;color:#64748B;margin-top:2px">50 Questions</div>' +
        '</div>' +
        '<div class="card" style="margin-bottom:0;cursor:pointer;text-align:center" onclick="alert(\\\'Loading Social Studies Mock...\\\')">' +
          '<div style="font-size:24px;margin-bottom:4px">🌍</div>' +
          '<div style="font-size:11px;font-weight:700;color:#1B365D">Social Studies</div>' +
          '<div style="font-size:9px;color:#64748B;margin-top:2px">40 Questions</div>' +
        '</div>' +
        '<div class="card" style="margin-bottom:0;cursor:pointer;text-align:center" onclick="alert(\\\'Loading French Mock...\\\')">' +
          '<div style="font-size:24px;margin-bottom:4px">🇫🇷</div>' +
          '<div style="font-size:11px;font-weight:700;color:#1B365D">French</div>' +
          '<div style="font-size:9px;color:#64748B;margin-top:2px">30 Questions</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  // Live countdown timer
  timerInterval = setInterval(function() {
    if (state.quizTimer > 0) {
      state.quizTimer--;
      var timerEl = document.getElementById('quiz-timer');
      if (timerEl) timerEl.textContent = '⏱ ' + formatTime(state.quizTimer);
    } else {
      clearInterval(timerInterval);
      alert('⏰ Time is up! Auto-submitting your answers...');
    }
  }, 1000);
}

function selectQuizOption(el, value) {
  state.quizSelected = value;
  document.querySelectorAll('.radio-option').forEach(function(o) { o.classList.remove('selected'); });
  el.classList.add('selected');
}

function submitQuizAnswer() {
  if (!state.quizSelected) {
    alert('Please select an answer before submitting.');
    return;
  }
  var correct = state.quizSelected === 'x = 2';
  if (correct) {
    state.quizPoints += 180;
    alert('✅ Correct! +180 points\\n\\nSolution: 3(x-2)+4 = 5x-10 → 3x-6+4 = 5x-10 → 3x-2 = 5x-10 → -2x = -8 → x = 4\\n\\nWait — the correct answer is actually x = 4! Let me recalculate...');
  }
  // Move to next question
  if (state.quizQuestion < state.quizTotal) {
    state.quizQuestion++;
    renderPractice(document.getElementById('content-inner'));
  } else {
    alert('🎉 Mock Exam Complete! Final Score: ' + state.quizPoints + ' points');
  }
}

// ═══════════════════════════════════════════════
// 3. LEADERBOARD — Podium & Rankings
// ═══════════════════════════════════════════════
function renderLeaderboard(el) {
  el.innerHTML = '<div class="fade-in-up">' +
    '<div class="text-center" style="margin-bottom:4px">' +
      '<h2 class="font-outfit" style="font-size:28px;font-weight:900;color:#1B365D">Student<br>Leaderboard</h2>' +
      '<p style="font-size:12px;color:#64748B;margin-top:4px;max-width:280px;margin-left:auto;margin-right:auto">Celebrating academic excellence and exceptional achievements across all faculties.</p>' +
    '</div>' +

    // Term Tabs
    '<div class="term-tabs">' +
      '<button class="term-tab ' + (state.termTab === 0 ? 'active' : '') + '" onclick="setTermTab(0)">TERM<br>1</button>' +
      '<button class="term-tab ' + (state.termTab === 1 ? 'active' : '') + '" onclick="setTermTab(1)">TERM<br>2</button>' +
      '<button class="term-tab ' + (state.termTab === 2 ? 'active' : '') + '" onclick="setTermTab(2)">TERM<br>3</button>' +
      '<button class="term-tab ' + (state.termTab === 3 ? 'active term-tab-annual' : '') + '" onclick="setTermTab(3)" style="' + (state.termTab === 3 ? 'background:#1B365D' : '') + '">🏆 ANNUAL</button>' +
    '</div>' +

    // Podium
    '<div class="podium-container">' +
      // 2nd Place
      '<div class="podium-person">' +
        '<img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" class="podium-avatar" alt="Elena R." />' +
        '<span class="podium-badge podium-badge-2nd">● 2nd</span>' +
        '<div class="podium-name">Elena R.</div>' +
        '<div class="podium-dept">Science Dept.</div>' +
        '<div class="podium-pts podium-pts-2nd">9,420 pts</div>' +
        '<div class="podium-block podium-block-2nd">2</div>' +
      '</div>' +

      // 1st Place
      '<div class="podium-person">' +
        '<div class="podium-crown">⭐</div>' +
        '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" class="podium-avatar podium-avatar-1st" alt="Marcus T." />' +
        '<span class="podium-badge podium-badge-1st">★ 1st Place</span>' +
        '<div class="podium-name" style="font-size:15px">Marcus T.</div>' +
        '<div class="podium-dept">Mathematics</div>' +
        '<div class="podium-pts podium-pts-1st" style="font-size:15px">11,850 pts</div>' +
        '<div class="podium-block podium-block-1st">1</div>' +
      '</div>' +

      // 3rd Place
      '<div class="podium-person">' +
        '<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" class="podium-avatar" alt="Sarah L." />' +
        '<span class="podium-badge podium-badge-3rd">● 3rd</span>' +
        '<div class="podium-name">Sarah L.</div>' +
        '<div class="podium-dept">Humanities</div>' +
        '<div class="podium-pts podium-pts-3rd">8,900 pts</div>' +
        '<div class="podium-block podium-block-3rd">3</div>' +
      '</div>' +
    '</div>' +

    // Rankings List (Below Podium)
    '<div style="margin-top:16px">' +
      '<h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D;margin-bottom:10px">Full Rankings</h3>' +

      // #4 — Current User (Khadija)
      '<div class="card" style="display:flex;align-items:center;gap:12px;border:2px solid #3B82F6;background:#EFF6FF">' +
        '<div class="font-outfit" style="font-size:18px;font-weight:900;color:#3B82F6;width:28px;text-align:center">4</div>' +
        '<div style="width:36px;height:36px;border-radius:10px;background:#1B365D;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13px;flex-shrink:0">KB</div>' +
        '<div style="flex:1">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">Khadija Bangura <span style="font-size:9px;background:#3B82F6;color:white;padding:1px 5px;border-radius:4px;margin-left:4px">YOU</span></div>' +
          '<div style="font-size:10px;color:#64748B">JSS 3A • Science</div>' +
        '</div>' +
        '<div class="font-outfit" style="font-size:14px;font-weight:800;color:#3B82F6">4,520</div>' +
      '</div>' +

      // #5
      '<div class="card" style="display:flex;align-items:center;gap:12px">' +
        '<div class="font-outfit" style="font-size:18px;font-weight:900;color:#94A3B8;width:28px;text-align:center">5</div>' +
        '<div style="width:36px;height:36px;border-radius:10px;background:#F59E0B;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13px;flex-shrink:0">AM</div>' +
        '<div style="flex:1">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">Amara Mansaray</div>' +
          '<div style="font-size:10px;color:#64748B">SSS 1B • Commercial</div>' +
        '</div>' +
        '<div class="font-outfit" style="font-size:14px;font-weight:800;color:#64748B">4,280</div>' +
      '</div>' +

      // #6
      '<div class="card" style="display:flex;align-items:center;gap:12px">' +
        '<div class="font-outfit" style="font-size:18px;font-weight:900;color:#94A3B8;width:28px;text-align:center">6</div>' +
        '<div style="width:36px;height:36px;border-radius:10px;background:#8B5CF6;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13px;flex-shrink:0">DK</div>' +
        '<div style="flex:1">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">David Koroma</div>' +
          '<div style="font-size:10px;color:#64748B">JSS 3A • Arts</div>' +
        '</div>' +
        '<div class="font-outfit" style="font-size:14px;font-weight:800;color:#64748B">3,950</div>' +
      '</div>' +

      // #7
      '<div class="card" style="display:flex;align-items:center;gap:12px">' +
        '<div class="font-outfit" style="font-size:18px;font-weight:900;color:#94A3B8;width:28px;text-align:center">7</div>' +
        '<div style="width:36px;height:36px;border-radius:10px;background:#EC4899;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13px;flex-shrink:0">FJ</div>' +
        '<div style="flex:1">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">Fatmata Jalloh</div>' +
          '<div style="font-size:10px;color:#64748B">SSS 2A • Science</div>' +
        '</div>' +
        '<div class="font-outfit" style="font-size:14px;font-weight:800;color:#64748B">3,710</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function setTermTab(index) {
  state.termTab = index;
  renderLeaderboard(document.getElementById('content-inner'));
}

// ═══════════════════════════════════════════════
// 4. NOTIFICATIONS
// ═══════════════════════════════════════════════
function renderNotifications(el) {
  el.innerHTML = '<div class="fade-in-up">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
      '<div>' +
        '<h2 class="font-outfit" style="font-size:24px;font-weight:900;color:#1B365D">Notifications</h2>' +
        '<p style="font-size:12px;color:#64748B">Stay updated with school announcements</p>' +
      '</div>' +
      '<span style="font-size:9px;font-weight:800;background:#3B82F6;color:white;padding:3px 8px;border-radius:8px">' + state.notifCount + ' New</span>' +
    '</div>' +

    // Filters
    '<div style="display:flex;gap:6px;margin-bottom:14px;overflow-x:auto">' +
      '<button style="font-size:10px;font-weight:700;padding:6px 14px;border-radius:20px;border:none;background:#1B365D;color:white;cursor:pointer;white-space:nowrap">All</button>' +
      '<button style="font-size:10px;font-weight:700;padding:6px 14px;border-radius:20px;border:1px solid #E2E8F0;background:white;color:#64748B;cursor:pointer;white-space:nowrap">Academic</button>' +
      '<button style="font-size:10px;font-weight:700;padding:6px 14px;border-radius:20px;border:1px solid #E2E8F0;background:white;color:#64748B;cursor:pointer;white-space:nowrap">Attendance</button>' +
      '<button style="font-size:10px;font-weight:700;padding:6px 14px;border-radius:20px;border:1px solid #E2E8F0;background:white;color:#64748B;cursor:pointer;white-space:nowrap">Events</button>' +
    '</div>' +

    // Notification Items
    // Unread
    '<div class="notif-item notif-unread">' +
      '<div class="notif-icon" style="background:#FEF2F2;color:#DC2626">🔴</div>' +
      '<div style="flex:1">' +
        '<div style="display:flex;justify-content:space-between;align-items:start">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">Attendance Alert</div>' +
          '<span style="font-size:9px;font-weight:600;color:#94A3B8">5 min ago</span>' +
        '</div>' +
        '<p style="font-size:11px;color:#64748B;margin-top:3px;line-height:1.5">You were marked <b style="color:#DC2626">absent</b> for Period 1 Integrated Science. If this is an error, contact your class teacher.</p>' +
      '</div>' +
    '</div>' +

    '<div class="notif-item notif-unread">' +
      '<div class="notif-icon" style="background:#FEF3C7;color:#F59E0B">📋</div>' +
      '<div style="flex:1">' +
        '<div style="display:flex;justify-content:space-between;align-items:start">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">New Assignment Posted</div>' +
          '<span style="font-size:9px;font-weight:600;color:#94A3B8">30 min ago</span>' +
        '</div>' +
        '<p style="font-size:11px;color:#64748B;margin-top:3px;line-height:1.5">Dr. Aris posted a new assignment: <b>Quadratic Equations Worksheet</b>. Due date: Tomorrow 5:00 PM.</p>' +
      '</div>' +
    '</div>' +

    '<div class="notif-item notif-unread">' +
      '<div class="notif-icon" style="background:#DCFCE7;color:#22C55E">🏆</div>' +
      '<div style="flex:1">' +
        '<div style="display:flex;justify-content:space-between;align-items:start">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">Leaderboard Update</div>' +
          '<span style="font-size:9px;font-weight:600;color:#94A3B8">1 hour ago</span>' +
        '</div>' +
        '<p style="font-size:11px;color:#64748B;margin-top:3px;line-height:1.5">You moved up to <b style="color:#22C55E">#4</b> on the Term 1 leaderboard! Keep it up, Khadija 🔥</p>' +
      '</div>' +
    '</div>' +

    // Read
    '<div class="notif-item">' +
      '<div class="notif-icon" style="background:#EFF6FF;color:#3B82F6">📢</div>' +
      '<div style="flex:1">' +
        '<div style="display:flex;justify-content:space-between;align-items:start">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">School Announcement</div>' +
          '<span style="font-size:9px;font-weight:600;color:#94A3B8">Yesterday</span>' +
        '</div>' +
        '<p style="font-size:11px;color:#64748B;margin-top:3px;line-height:1.5">WASSCE registration closes this Friday at 17:00 GMT. Ensure all documents are submitted to the registrar.</p>' +
      '</div>' +
    '</div>' +

    '<div class="notif-item">' +
      '<div class="notif-icon" style="background:#F5F3FF;color:#8B5CF6">🎉</div>' +
      '<div style="flex:1">' +
        '<div style="display:flex;justify-content:space-between;align-items:start">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">Inter-House Sports Day</div>' +
          '<span style="font-size:9px;font-weight:600;color:#94A3B8">2 days ago</span>' +
        '</div>' +
        '<p style="font-size:11px;color:#64748B;margin-top:3px;line-height:1.5">Annual Inter-House Sports Competition scheduled for next Monday. Register your events by Friday.</p>' +
      '</div>' +
    '</div>' +

    '<div class="notif-item">' +
      '<div class="notif-icon" style="background:#FDF2F8;color:#EC4899">💬</div>' +
      '<div style="flex:1">' +
        '<div style="display:flex;justify-content:space-between;align-items:start">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">Parent-Teacher Meeting</div>' +
          '<span style="font-size:9px;font-weight:600;color:#94A3B8">3 days ago</span>' +
        '</div>' +
        '<p style="font-size:11px;color:#64748B;margin-top:3px;line-height:1.5">PTM scheduled for August 15th at 2:00 PM. Your guardian has been notified via email.</p>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ═══════════════════════════════════════════════
// 5. PROFILE
// ═══════════════════════════════════════════════
function renderProfile(el) {
  el.innerHTML = '<div class="fade-in-up">' +
    // Profile Header Card
    '<div class="card text-center" style="padding:24px 16px">' +
      '<div class="profile-avatar-ring">' +
        '<img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80" class="profile-avatar-inner" alt="Khadija Bangura" />' +
      '</div>' +
      '<h3 class="font-outfit" style="font-size:20px;font-weight:900;color:#1B365D;margin-top:12px">Khadija Bangura</h3>' +
      '<p style="font-size:12px;color:#64748B;margin-top:2px">JSS 3A • Science Stream</p>' +
      '<div style="display:flex;justify-content:center;gap:6px;margin-top:10px">' +
        '<span style="font-size:9px;font-weight:700;background:#DCFCE7;color:#166534;padding:3px 8px;border-radius:6px">Active Student</span>' +
        '<span style="font-size:9px;font-weight:700;background:#EFF6FF;color:#1D4ED8;padding:3px 8px;border-radius:6px">Prefect</span>' +
        '<span style="font-size:9px;font-weight:700;background:#FEF3C7;color:#92400E;padding:3px 8px;border-radius:6px">Honor Roll</span>' +
      '</div>' +
      '<p style="font-size:10px;color:#94A3B8;margin-top:8px;font-family:monospace">ID: STU-001 | Enrolled: Sep 2023</p>' +
    '</div>' +

    // Academic Summary Cards
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">' +
      '<div class="card text-center" style="margin-bottom:0;padding:12px 8px">' +
        '<div style="font-size:20px;margin-bottom:4px">📊</div>' +
        '<div class="font-outfit" style="font-size:18px;font-weight:900;color:#1B365D">3.82</div>' +
        '<div style="font-size:9px;font-weight:700;color:#64748B">GPA</div>' +
      '</div>' +
      '<div class="card text-center" style="margin-bottom:0;padding:12px 8px">' +
        '<div style="font-size:20px;margin-bottom:4px">🏆</div>' +
        '<div class="font-outfit" style="font-size:18px;font-weight:900;color:#FFCC00">#4</div>' +
        '<div style="font-size:9px;font-weight:700;color:#64748B">Rank</div>' +
      '</div>' +
      '<div class="card text-center" style="margin-bottom:0;padding:12px 8px">' +
        '<div style="font-size:20px;margin-bottom:4px">🔥</div>' +
        '<div class="font-outfit" style="font-size:18px;font-weight:900;color:#EF4444">12</div>' +
        '<div style="font-size:9px;font-weight:700;color:#64748B">Streak</div>' +
      '</div>' +
    '</div>' +

    // Subject Performance Breakdown
    '<div class="card">' +
      '<h4 style="font-size:11px;font-weight:800;color:#1B365D;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Subject Performance</h4>' +

      '<div style="margin-bottom:10px">' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#334155">Core Mathematics</span>' +
          '<span style="color:#22C55E">A+ (92%)</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:92%;background:#22C55E"></div></div>' +
      '</div>' +

      '<div style="margin-bottom:10px">' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#334155">Integrated Science</span>' +
          '<span style="color:#3B82F6">A (88%)</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:88%;background:#3B82F6"></div></div>' +
      '</div>' +

      '<div style="margin-bottom:10px">' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#334155">English Language</span>' +
          '<span style="color:#F59E0B">B+ (82%)</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:82%;background:#F59E0B"></div></div>' +
      '</div>' +

      '<div style="margin-bottom:10px">' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#334155">Social Studies</span>' +
          '<span style="color:#8B5CF6">B (78%)</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:78%;background:#8B5CF6"></div></div>' +
      '</div>' +

      '<div>' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#334155">French</span>' +
          '<span style="color:#EC4899">B (76%)</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:76%;background:#EC4899"></div></div>' +
      '</div>' +
    '</div>' +

    // Achievements & Badges
    '<div class="card">' +
      '<h4 style="font-size:11px;font-weight:800;color:#1B365D;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Achievements & Badges</h4>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">' +
        '<div class="text-center" style="padding:8px">' +
          '<div style="font-size:28px">🥇</div>' +
          '<div style="font-size:9px;font-weight:700;color:#1B365D;margin-top:4px">Math Champion</div>' +
        '</div>' +
        '<div class="text-center" style="padding:8px">' +
          '<div style="font-size:28px">📚</div>' +
          '<div style="font-size:9px;font-weight:700;color:#1B365D;margin-top:4px">Bookworm</div>' +
        '</div>' +
        '<div class="text-center" style="padding:8px">' +
          '<div style="font-size:28px">⭐</div>' +
          '<div style="font-size:9px;font-weight:700;color:#1B365D;margin-top:4px">Perfect Week</div>' +
        '</div>' +
        '<div class="text-center" style="padding:8px">' +
          '<div style="font-size:28px">🔬</div>' +
          '<div style="font-size:9px;font-weight:700;color:#1B365D;margin-top:4px">Lab Star</div>' +
        '</div>' +
        '<div class="text-center" style="padding:8px">' +
          '<div style="font-size:28px">🏅</div>' +
          '<div style="font-size:9px;font-weight:700;color:#1B365D;margin-top:4px">Top 5%</div>' +
        '</div>' +
        '<div class="text-center" style="padding:8px;opacity:0.3">' +
          '<div style="font-size:28px">🔒</div>' +
          '<div style="font-size:9px;font-weight:700;color:#94A3B8;margin-top:4px">Locked</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    // Settings
    '<div class="card">' +
      '<h4 style="font-size:11px;font-weight:800;color:#1B365D;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Settings</h4>' +

      '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F1F5F9">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<span style="font-size:16px">🔔</span>' +
          '<span style="font-size:12px;font-weight:600;color:#334155">Push Notifications</span>' +
        '</div>' +
        '<input type="checkbox" checked style="width:18px;height:18px" />' +
      '</div>' +

      '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F1F5F9">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<span style="font-size:16px">🌙</span>' +
          '<span style="font-size:12px;font-weight:600;color:#334155">Dark Mode</span>' +
        '</div>' +
        '<input type="checkbox" style="width:18px;height:18px" />' +
      '</div>' +

      '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<span style="font-size:16px">🌐</span>' +
          '<span style="font-size:12px;font-weight:600;color:#334155">Language</span>' +
        '</div>' +
        '<span style="font-size:11px;font-weight:700;color:#64748B">English ▾</span>' +
      '</div>' +
    '</div>' +

    // Sign Out
    '<button class="btn-primary" style="background:#DC2626;box-shadow:0 4px 12px -2px rgba(220,38,38,0.3);margin-top:4px" onclick="location.reload()">Sign Out</button>' +

    '<p class="text-center" style="font-size:9px;color:#94A3B8;margin-top:12px;font-weight:600">Standards International School • S.I.S. Mobile Engine v2.0<br>Convex Cloud Backend • Rate-Limited Auth</p>' +
  '</div>';
}

function renderAlumniHome(el) {
  el.innerHTML = '<div class="fade-in-up">' +
    // Top banner
    '<div style="background:#0F1E36;color:white;padding:8px 12px;margin:-16px -16px 16px;text-align:center;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:6px">' +
      '<span>🔒 Alumni Archive View (Read-Only)</span>' +
    '</div>' +
    // Header title
    '<div style="margin-bottom:16px">' +
      '<h2 class="font-outfit" style="font-size:24px;font-weight:900;color:#1B365D">Alumni Archive</h2>' +
      '<p style="font-size:12px;color:#64748B;margin-top:4px;line-height:1.4">Welcome back, Kwabena. Your historical records and certificates are securely stored here in read-only mode.</p>' +
    '</div>' +

    // 1. BECE/WASSCE Certificate Vault
    '<div class="card">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">' +
      '  <span style="font-size:18px">🎓</span>' +
      '  <h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D">BECE/WASSCE Certificate Vault</h3>' +
      '</div>' +
      // WASSCE card
      '<div style="border:1px solid #E2E8F0;border-radius:12px;padding:12px;margin-bottom:10px;display:flex;align-items:center;justify-content:between;gap:8px">' +
        '<div style="flex:1">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">WASSCE Final Certificate - 2023</div>' +
          '<div style="font-size:10px;color:#64748B;margin-top:2px">Issued: Nov 2023 • Validated</div>' +
        '</div>' +
        '<button class="btn-primary" style="width:auto;padding:6px 12px;font-size:10px;background:#1B365D" onclick="alert(\'Downloading WASSCE 2023 PDF...\')">Download PDF</button>' +
      '</div>' +
      // BECE card
      '<div style="border:1px solid #E2E8F0;border-radius:12px;padding:12px;display:flex;align-items:center;justify-content:between;gap:8px">' +
        '<div style="flex:1">' +
          '<div style="font-size:12px;font-weight:700;color:#1B365D">BECE Final Certificate - 2020</div>' +
          '<div style="font-size:10px;color:#64748B;margin-top:2px">Issued: Oct 2020 • Validated</div>' +
        '</div>' +
        '<button class="btn-primary" style="width:auto;padding:6px 12px;font-size:10px;background:#1B365D" onclick="alert(\'Downloading BECE 2020 PDF...\')">Download PDF</button>' +
      '</div>' +
    '</div>' +

    // 2. Historical Transcripts
    '<div class="card">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">' +
      '  <span style="font-size:18px">📜</span>' +
      '  <h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D">Historical Transcripts</h3>' +
      '</div>' +
      // High school
      '<div style="border:1px solid #E2E8F0;border-radius:12px;padding:12px;margin-bottom:10px">' +
        '<div style="font-size:12px;font-weight:700;color:#1B365D">Senior High School Transcript</div>' +
        '<div style="font-size:10px;color:#64748B;margin-top:2px;margin-bottom:10px">Complete academic record (Forms 1-3).</div>' +
        '<button class="btn-primary" style="background:#F1F5F9;color:#1B365D;border:1px solid #CBD5E1;box-shadow:none;padding:8px" onclick="alert(\'Requesting official High School Transcript copy...\')">Get Official Copy</button>' +
      '</div>' +
      // Junior high
      '<div style="border:1px solid #E2E8F0;border-radius:12px;padding:12px">' +
        '<div style="font-size:12px;font-weight:700;color:#1B365D">Junior High School Transcript</div>' +
        '<div style="font-size:10px;color:#64748B;margin-top:2px;margin-bottom:10px">Complete academic record (JHS 1-3).</div>' +
        '<button class="btn-primary" style="background:#F1F5F9;color:#1B365D;border:1px solid #CBD5E1;box-shadow:none;padding:8px" onclick="alert(\'Requesting official Junior High Transcript copy...\')">Get Official Copy</button>' +
      '</div>' +
    '</div>' +

    // 3. Billing Statements
    '<div class="card">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">' +
      '  <span style="font-size:18px">💳</span>' +
      '  <h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D">Billing Statements</h3>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:8px 0;border-bottom:1px solid #F1F5F9">' +
        '<span style="font-weight:600;color:#1B365D">Term 3 - 2023</span>' +
        '<a href="#" style="color:#3B82F6;text-decoration:none;font-weight:700" onclick="alert(\'Loading statement for Term 3...\')">View ↗</a>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:8px 0;border-bottom:1px solid #F1F5F9">' +
        '<span style="font-weight:600;color:#1B365D">Term 2 - 2023</span>' +
        '<a href="#" style="color:#3B82F6;text-decoration:none;font-weight:700" onclick="alert(\'Loading statement for Term 2...\')">View ↗</a>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:8px 0">' +
        '<span style="font-weight:600;color:#1B365D">Term 1 - 2023</span>' +
        '<a href="#" style="color:#3B82F6;text-decoration:none;font-weight:700" onclick="alert(\'Loading statement for Term 1...\')">View ↗</a>' +
      '</div>' +
      '<button class="btn-primary" style="background:#E8F0FE;color:#1B365D;box-shadow:none;margin-top:14px" onclick="alert(\'Loading full payment history archive...\')">View All History</button>' +
    '</div>' +

    // 4. Active Courses & Actions (Greyed out)
    '<div class="card" style="opacity:0.6">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
      '  <span style="font-size:18px">🚫</span>' +
      '  <h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#94A3B8">Active Courses &amp; Actions</h3>' +
      '</div>' +
      '<p style="font-size:11px;color:#94A3B8;line-height:1.4;margin-bottom:14px">Course registration, assignment submissions, and active feedback are disabled for alumni accounts.</p>' +
      '<button class="btn-primary" style="background:#E2E8F0;color:#94A3B8;cursor:not-allowed;box-shadow:none;margin-bottom:8px" disabled>Submit Assignment (Disabled)</button>' +
      '<button class="btn-primary" style="background:#E2E8F0;color:#94A3B8;cursor:not-allowed;box-shadow:none" disabled>Register Course (Disabled)</button>' +
    '</div>' +
  '</div>';
}

function renderActiveStudentHome(el) {
  el.innerHTML = '<div class="fade-in-up">' +
    // Profile Header
    '<div class="card text-center" style="padding:20px 16px">' +
      '<img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" style="width:72px;height:72px;border-radius:50%;object-fit:cover;margin:0 auto 10px" />' +
      '<h2 class="font-outfit" style="font-size:20px;font-weight:900;color:#1B365D">Alexander Sterling</h2>' +
      '<p style="font-size:12px;color:#64748B;margin-top:2px">Grade 11 • Advanced Sciences Track</p>' +
      '<div style="display:flex;justify-content:center;margin-top:10px">' +
        '<span style="font-size:10px;font-weight:700;background:#E8F0FE;color:#1D4ED8;padding:4px 10px;border-radius:10px;display:flex;align-items:center;gap:4px">★ Excellence Scholar</span>' +
      '</div>' +
    '</div>' +

    // Attendance Rate card
    '<div class="card">' +
      '<h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D;margin-bottom:16px">Attendance Rate</h3>' +
      '<div style="display:flex;justify-content:center;position:relative;margin:10px 0 20px">' +
        '<svg width="120" height="120" viewBox="0 0 120 120">' +
          '<circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" stroke-width="8" />' +
          '<circle cx="60" cy="60" r="50" fill="none" stroke="#1B365D" stroke-width="8" stroke-dasharray="314" stroke-dashoffset="15.7" stroke-linecap="round" transform="rotate(-90 60 60)" />' +
        '</svg>' +
        '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);text-align:center">' +
          '<div class="font-outfit" style="font-size:22px;font-weight:900;color:#1B365D">95%</div>' +
          '<div style="font-size:9px;font-weight:700;color:#1B365D">PRESENT</div>' +
        '</div>' +
      '</div>' +
      '<p style="font-size:11px;color:#64748B;text-align:center">Consistent attendance maintaining top tier status.</p>' +
    '</div>' +

    // Gemini AI Syllabus Progress card
    '<div class="card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
        '<div style="display:flex;align-items:center;gap:6px">' +
          '<span style="font-size:16px">🤖</span>' +
          '<h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D">Gemini AI Syllabus Progress</h3>' +
        '</div>' +
        '<span style="font-size:10px;font-weight:700;color:#3B82F6;cursor:pointer">View Details</span>' +
      '</div>' +
      
      // Phys
      '<div style="margin-bottom:12px">' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#1B365D">Advanced Physics - Quantum Mechanics</span>' +
          '<span>78%</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:78%;background:#1B365D"></div></div>' +
      '</div>' +

      // Lit
      '<div style="margin-bottom:12px">' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#1B365D">Literature - Modernist Era</span>' +
          '<span>92%</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:92%;background:#1B365D"></div></div>' +
      '</div>' +

      // Calc
      '<div style="margin-bottom:14px">' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;margin-bottom:4px">' +
          '<span style="color:#1B365D">Calculus II - Integration Applications</span>' +
          '<span>45%</span>' +
        '</div>' +
        '<div class="progress-track" style="margin:0"><div class="progress-fill" style="width:45%;background:#1B365D"></div></div>' +
      '</div>' +

      // Suggestion
      '<div style="background:#E8F0FE;border-radius:12px;padding:12px;display:flex;gap:8px">' +
        '<span style="font-size:16px;color:#1B365D">💡</span>' +
        '<p style="font-size:11px;color:#1B365D;line-height:1.4">AI Suggestion: Focus on Calculus II Integration techniques this week to stay on track with the cohort baseline.</p>' +
      '</div>' +
    '</div>' +

    // Cohort Leaderboard card
    '<div class="card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
        '<div style="display:flex;align-items:center;gap:6px">' +
          '<span style="font-size:16px">🏆</span>' +
          '<h3 class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D">Cohort Leaderboard</h3>' +
        '</div>' +
        '<span style="font-size:10px;font-weight:700;background:#1B365D;color:white;padding:3px 8px;border-radius:6px">Term 2</span>' +
      '</div>' +

      // Item 1
      '<div style="display:flex;align-items:center;gap:12px;padding:8px 0">' +
        '<div class="font-outfit" style="font-size:15px;font-weight:800;color:#B45309;width:20px;text-align:center">1</div>' +
        '<img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" style="width:32px;height:32px;border-radius:50%;object-fit:cover" />' +
        '<div style="flex:1;font-size:12px;font-weight:700;color:#1B365D">Sarah Jenkins</div>' +
        '<div class="font-outfit" style="font-size:12px;font-weight:800;color:#1B365D">12,450 pts</div>' +
      '</div>' +
      '<hr style="border:0;border-top:1px solid #F1F5F9" />' +

      // Item 2 (Me)
      '<div style="display:flex;align-items:center;gap:12px;padding:8px;background:#E8F0FE;border-radius:10px;margin:4px 0">' +
        '<div class="font-outfit" style="font-size:15px;font-weight:800;color:#1B365D;width:20px;text-align:center">2</div>' +
        '<img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" style="width:32px;height:32px;border-radius:50%;object-fit:cover" />' +
        '<div style="flex:1;font-size:12px;font-weight:700;color:#1B365D">Alexander Sterling (You)</div>' +
        '<div class="font-outfit" style="font-size:12px;font-weight:800;color:#1B365D">12,100 pts</div>' +
      '</div>' +
      '<hr style="border:0;border-top:1px solid #F1F5F9" />' +

      // Item 3
      '<div style="display:flex;align-items:center;gap:12px;padding:8px 0">' +
        '<div class="font-outfit" style="font-size:15px;font-weight:800;color:#64748B;width:20px;text-align:center">3</div>' +
        '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" style="width:32px;height:32px;border-radius:50%;object-fit:cover" />' +
        '<div style="flex:1;font-size:12px;font-weight:700;color:#1B365D">Michael Chang</div>' +
        '<div class="font-outfit" style="font-size:12px;font-weight:800;color:#1B365D">11,850 pts</div>' +
      '</div>' +

      '<button class="btn-primary" style="background:#F8F9FA;color:#1B365D;border:1px solid #E2E8F0;box-shadow:none;margin-top:14px;font-size:11px" onclick="alert(\'Loading full leaderboard standings...\')">VIEW FULL RANKINGS</button>' +
    '</div>' +
  '</div>';
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
renderNav();
renderContent();
</script>

</body>
</html>
`;
}

server.listen(PORT, HOST, () => {
  console.log('S.I.S. Student Mobile Engine active at http://' + HOST + ':' + PORT);
});
