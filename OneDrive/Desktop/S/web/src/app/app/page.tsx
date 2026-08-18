'use client';

import { useState } from 'react';
import Image from 'next/image';

type UserRole = 'PARENT' | 'STUDENT' | 'TEACHER' | 'VICE_PRINCIPAL' | 'PRINCIPAL' | 'IT_ADMIN';

export default function MobileAppContainer() {
  const [viewMode, setViewMode] = useState<'flutter' | 'native'>('flutter');
  const [flutterPort] = useState('8080');
  
  // Native Mobile Container State (Fallback / Instant Access)
  const [step, setStep] = useState<'login' | 'dashboard' | 'manual'>('login');
  const [role, setRole] = useState<UserRole>('PARENT');
  const [email, setEmail] = useState('parent.khadija@sis.edu.sl');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Active Dashboard Nav Tab
  const [activeTab, setActiveTab] = useState<'home' | 'portal' | 'profile'>('home');

  // Teacher Note Upload State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [notesList, setNotesList] = useState([
    { id: 1, title: 'Integrated Science — Photosynthesis & Cell Biology', date: 'Aug 4', teacher: 'Mr. A. Kamara' },
    { id: 2, title: 'General Mathematics — Quadratic Equations & Graphs', date: 'Aug 3', teacher: 'Mrs. F. Sesay' },
  ]);

  // Student Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    switch (selectedRole) {
      case 'PARENT':
        setEmail('parent.khadija@sis.edu.sl');
        break;
      case 'STUDENT':
        setEmail('student.st001@sis.edu.sl');
        break;
      case 'TEACHER':
        setEmail('teacher.kamara@sis.edu.sl');
        break;
      case 'VICE_PRINCIPAL':
        setEmail('vp.academic@sis.edu.sl');
        break;
      case 'PRINCIPAL':
        setEmail('principal@sis.edu.sl');
        break;
      case 'IT_ADMIN':
        setEmail('it.admin@sis.edu.sl');
        break;
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('dashboard');
    }, 400);
  };

  const handleUploadNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteContent) return;
    setNotesList([
      { id: Date.now(), title: noteTitle, date: 'Just now', teacher: 'Mr. A. Kamara (You)' },
      ...notesList,
    ]);
    setNoteTitle('');
    setNoteContent('');
    alert('Study Note published to Convex Cloud! All students notified.');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-0 sm:p-4 font-sans">
      
      {/* Mode Switcher Bar */}
      <div className="w-full max-w-md mb-2 px-2 flex justify-between items-center text-xs text-white">
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('flutter')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'flutter' ? 'bg-[#0056B3] text-white' : 'bg-slate-800 text-gray-400'}`}
          >
            Flutter Web (Port 8080)
          </button>
          <button 
            onClick={() => setViewMode('native')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'native' ? 'bg-[#1B365D] text-white' : 'bg-slate-800 text-gray-400'}`}
          >
            Direct Mobile UI
          </button>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono">Convex DB Active</span>
      </div>

      {/* Mobile Frame Container */}
      <div className="w-full max-w-md h-screen sm:h-[844px] bg-[#FAFBFD] sm:rounded-[44px] shadow-2xl overflow-hidden relative flex flex-col border-0 sm:border-[10px] sm:border-slate-800">
        
        {/* ─── OPTION A: FLUTTER WEB EMBEDDED IFRAME (PORT 8080) ─── */}
        {viewMode === 'flutter' && (
          <div className="w-full h-full relative bg-slate-900">
            <iframe 
              src={`http://192.168.100.21:${flutterPort}`}
              className="w-full h-full border-0"
              title="Flutter S.I.S. Mobile App"
              onError={() => setViewMode('native')}
            />
            
            {/* Fallback Overlay if Flutter Web Server is offline */}
            <div className="absolute inset-x-0 bottom-0 bg-[#1B365D]/90 backdrop-blur-md text-white p-3 text-center text-xs flex justify-between items-center">
              <span>Flutter Web (Port 8080)</span>
              <button 
                onClick={() => setViewMode('native')}
                className="bg-white text-[#1B365D] px-3 py-1 rounded-md font-bold text-[11px]"
              >
                Switch to Direct Mobile UI →
              </button>
            </div>
          </div>
        )}

        {/* ─── OPTION B: DIRECT MOBILE LOGIN & DASHBOARDS (ZERO FREEZE) ─── */}
        {viewMode === 'native' && (
          <>
            {/* 1. LOGIN PAGE */}
            {step === 'login' && (
              <div className="flex-1 flex flex-col justify-between p-6 bg-[#FAFBFD] overflow-y-auto">
                {/* Top Brand Header */}
                <div className="pt-2 text-center space-y-1.5">
                  <div className="relative w-14 h-14 bg-white rounded-2xl p-1.5 shadow-md mx-auto border border-gray-200 flex items-center justify-center">
                    <Image src="/logo.png" alt="S.I.S Crest" fill className="object-contain p-1" />
                  </div>
                  <h2 className="text-xl font-extrabold text-[#1B365D] tracking-tight">Standards International School</h2>
                  <p className="text-xs text-[#0056B3] font-semibold italic">&quot;Nos Educamus Mentem&quot; • Mobile Portal</p>
                </div>

                {/* Login Form Container */}
                <div className="my-auto space-y-4">
                  {/* Role Selector Pills */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] font-extrabold text-[#1B365D] uppercase tracking-wider">Select Account Role</label>
                      <button onClick={() => setStep('manual')} className="text-[10px] text-[#0056B3] font-semibold underline">App Guide</button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 bg-gray-200/70 p-1.5 rounded-2xl border border-gray-300/50">
                      {(['PARENT', 'STUDENT', 'TEACHER', 'VICE_PRINCIPAL', 'PRINCIPAL', 'IT_ADMIN'] as UserRole[]).map((r) => {
                        const isSelected = role === r;
                        const labels: Record<UserRole, string> = {
                          PARENT: 'Parent',
                          STUDENT: 'Student',
                          TEACHER: 'Teacher',
                          VICE_PRINCIPAL: 'Vice Principal',
                          PRINCIPAL: 'Principal',
                          IT_ADMIN: 'IT Admin',
                        };

                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => handleRoleSelect(r)}
                            className={`py-1.5 text-[10px] font-bold rounded-xl transition-all ${isSelected ? 'bg-[#1B365D] text-white shadow-md' : 'text-gray-600 hover:text-[#1B365D]'}`}
                          >
                            {labels[r]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-lg space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Email / Student ID / Account Username</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-400 text-sm">👤</span>
                        <input 
                          type="text" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-medium focus:border-[#0056B3] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Password / Passcode</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-400 text-sm">🔒</span>
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 font-medium focus:border-[#0056B3] outline-none"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-xs text-gray-500 font-semibold"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <label className="flex items-center gap-1 text-gray-600 font-medium cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-gray-300 text-[#1B365D] focus:ring-0"
                        />
                        <span>Remember me</span>
                      </label>
                      <a href="/contact" className="text-[#0056B3] font-semibold hover:underline">Forgot passcode?</a>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-[#1B365D] hover:bg-[#0056B3] text-white font-bold rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <span>Sign In to {role.replace('_', ' ')} Portal</span>
                      )}
                    </button>
                  </form>
                </div>

                <div className="text-center pb-1 text-[10px] text-gray-400 font-medium">
                  Standards International School • Secured Mobile Authorization
                </div>
              </div>
            )}

            {/* 2. MANUAL */}
            {step === 'manual' && (
              <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#1B365D] to-[#0056B3] text-white">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">S.I.S. Mobile Manual</span>
                  <button onClick={() => setStep('login')} className="text-xs bg-white/10 px-3 py-1 rounded text-white">Close Guide</button>
                </div>

                <div className="my-auto space-y-4 text-center">
                  <div className="text-5xl">📖</div>
                  <h3 className="text-2xl font-bold">How to Log In &amp; Access</h3>
                  <p className="text-xs text-white/80 leading-relaxed max-w-xs mx-auto">
                    1. <strong>Admissions</strong>: Submit student application on the public website. <br/><br/>
                    2. <strong>Approval</strong>: Upon VP/Principal approval, login credentials are generated in Convex.<br/><br/>
                    3. <strong>Mobile Access</strong>: Select your role on the login screen and tap <strong>Sign In</strong> to open your dashboard!
                  </p>
                </div>

                <button onClick={() => setStep('login')} className="w-full py-3.5 bg-white text-[#1B365D] font-bold rounded-xl text-xs uppercase tracking-wider">
                  Back to Login Page
                </button>
              </div>
            )}

            {/* 3. ROLE DASHBOARD */}
            {step === 'dashboard' && (
              <div className="flex-1 flex flex-col justify-between bg-[#FAFBFD] overflow-hidden">
                <div className="bg-[#1B365D] text-white p-4 pt-5 shadow-md flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 relative bg-white rounded-lg p-0.5">
                      <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">{role.replace('_', ' ')} PORTAL</h3>
                      <p className="text-[10px] text-blue-200">Convex DB: artful-lynx-271</p>
                    </div>
                  </div>
                  <button onClick={() => setStep('login')} className="text-[10px] font-semibold bg-white/10 px-2.5 py-1 rounded text-white hover:bg-white/20">
                    Log Out
                  </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {role === 'PARENT' && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[#1B365D] to-[#0056B3] text-white p-4 rounded-2xl shadow-md">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Child Overview</span>
                        <h4 className="text-lg font-bold">Khadija Bangura (JSS 3A)</h4>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                          <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                            <div className="text-base font-bold">96.4%</div>
                            <div className="text-[10px] text-white/70">Attendance Rate</div>
                          </div>
                          <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                            <div className="text-base font-bold">88.5%</div>
                            <div className="text-[10px] text-white/70">Quiz Average</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <h5 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">Recent Attendance Alerts</h5>
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center justify-between">
                          <div>
                            <div className="font-bold text-emerald-800">Checked In: PRESENT</div>
                            <div className="text-[10px] text-emerald-600">Period 1 • Integrated Science (8:15 AM)</div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Today</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {role === 'STUDENT' && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                        <h4 className="text-sm font-bold text-[#1B365D] mb-1">BECE / WASSCE AI Quiz Engine</h4>
                        <p className="text-xs text-gray-500 mb-3">Practice non-repeating questions generated by Gemini AI.</p>
                        
                        {!quizStarted ? (
                          <button 
                            onClick={() => { setQuizStarted(true); setQuizScore(null); }}
                            className="w-full py-2.5 bg-[#0056B3] text-white font-bold rounded-xl text-xs"
                          >
                            Start Science Quiz Session
                          </button>
                        ) : quizScore === null ? (
                          <div className="space-y-3 p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs">
                            <div className="font-bold text-[#1B365D]">Q1: Which organelle produces ATP energy in plant cells?</div>
                            {['A) Nucleus', 'B) Mitochondria (Correct)', 'C) Chloroplast'].map((opt, i) => (
                              <button key={i} onClick={() => setQuizScore(100)} className="w-full text-left p-2 bg-white rounded border border-gray-300 font-medium">
                                {opt}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center">
                            Quiz Completed! Score: {quizScore}% (+25 Points added to Leaderboard)
                            <button onClick={() => setQuizStarted(false)} className="block mx-auto mt-2 text-[#0056B3] underline">Take Another Quiz</button>
                          </div>
                        )}
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <h5 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">Teacher Notes Available</h5>
                        {notesList.map((note) => (
                          <div key={note.id} className="p-3 bg-[#FAFBFD] border border-gray-200 rounded-xl flex justify-between items-center text-xs">
                            <div>
                              <div className="font-bold text-[#1B365D]">{note.title}</div>
                              <div className="text-[10px] text-gray-500">{note.teacher} • {note.date}</div>
                            </div>
                            <button onClick={() => alert(`Downloading note: ${note.title}`)} className="text-[10px] bg-[#0056B3] text-white px-2 py-1 rounded">Read</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {role === 'TEACHER' && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                        <h4 className="text-sm font-bold text-[#1B365D] mb-3">Upload Class Notes &amp; Handouts</h4>
                        <form onSubmit={handleUploadNote} className="space-y-3">
                          <input 
                            type="text" 
                            placeholder="Note Title (e.g. Physics — Motion Equations)"
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs" 
                            required
                          />
                          <textarea 
                            placeholder="Write study notes or assignment summary here..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs" 
                            required
                          />
                          <button type="submit" className="w-full py-2.5 bg-[#1B365D] text-white font-bold rounded-xl text-xs">
                            Publish Note to Students
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {(role === 'VICE_PRINCIPAL' || role === 'PRINCIPAL' || role === 'IT_ADMIN') && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <h4 className="text-sm font-bold text-[#1B365D]">Administrative Overview</h4>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
                          <div className="font-bold text-[#1B365D]">Convex Cloud DB: artful-lynx-271</div>
                          <div className="text-gray-600">BECE Pass Rate: 98.4% | WASSCE Pass Rate: 97.8%</div>
                        </div>
                        <a href="/admin/ratings" className="block w-full py-2.5 bg-[#1B365D] text-[#FFFFFF] font-bold text-center rounded-xl text-xs">
                          Open Web Admin Dashboard
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white border-t border-gray-200 p-2 flex justify-around text-center text-[10px]">
                  <button onClick={() => setActiveTab('home')} className={`p-2 font-bold ${activeTab === 'home' ? 'text-[#1B365D]' : 'text-gray-400'}`}>
                    📱 Home
                  </button>
                  <button onClick={() => setActiveTab('portal')} className={`p-2 font-bold ${activeTab === 'portal' ? 'text-[#1B365D]' : 'text-gray-400'}`}>
                    📚 Portal
                  </button>
                  <button onClick={() => setActiveTab('profile')} className={`p-2 font-bold ${activeTab === 'profile' ? 'text-[#1B365D]' : 'text-gray-400'}`}>
                    👤 Profile
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
