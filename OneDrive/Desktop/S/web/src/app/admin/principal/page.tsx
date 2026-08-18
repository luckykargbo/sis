'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthGuard from '@/components/AuthGuard';
import AdmissionsManagementModule from '@/components/AdmissionsManagementModule';

// Enterprise SVG Icons (Zero Emoji)
const Icons = {
  Key: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Radio: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

export default function PrincipalDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'admissions' | 'staff' | 'broadcast' | 'analytics'>('admissions');

  const handleLogout = () => {
    localStorage.removeItem('sis_auth_user');
    window.location.href = '/sis_gate';
  };

  // Onboard Teacher Form State
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [stream, setStream] = useState('BECE');
  const [assignedClass, setAssignedClass] = useState('JSS 1A');

  // Broadcast Message State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [targetAudience, setTargetAudience] = useState<'ALL' | 'TEACHERS' | 'PARENTS'>('ALL');
  const [broadcastStatus, setBroadcastStatus] = useState('');

  const handleOnboardTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !teacherEmail) return;
    alert(`Teacher ${teacherName} successfully onboarded and assigned to ${stream} track (${assignedClass}). Access credentials generated.`);
    setTeacherName('');
    setTeacherEmail('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;
    setBroadcastStatus('Broadcasting notification across Convex mobile network...');
    setTimeout(() => {
      setBroadcastStatus('Alert successfully dispatched to all registered parent and teacher devices.');
      setBroadcastTitle('');
      setBroadcastBody('');
    }, 1200);
  };

  return (
    <AuthGuard allowedRoles={['PRINCIPAL']}>
      <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
        {/* Backdrop overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1B365D] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white rounded-xl p-1 shadow-md">
                <Image src="/logo.png" alt="Standards International School Crest" fill className="object-contain p-0.5" />
              </div>
              <div>
                <span className="font-bold text-sm font-[family-name:var(--font-outfit)] block leading-tight">Principal Command</span>
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">Executive Dashboard</span>
              </div>
            </div>
            <button className="lg:hidden text-white/70 hover:text-white p-1" onClick={() => setSidebarOpen(false)}>
              <Icons.X />
            </button>
          </div>

          <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-10rem)]">
            <button onClick={() => { setActiveTab('admissions'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'admissions' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Key /> Admissions &amp; Exam Tokens
            </button>
            <button onClick={() => { setActiveTab('staff'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'staff' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Users /> Staff Onboarding
            </button>
            <button onClick={() => { setActiveTab('broadcast'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'broadcast' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Radio /> Emergency Dispatcher
            </button>
            <button onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'analytics' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Chart /> Executive Analytics
            </button>

            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 rounded-xl font-medium transition-colors text-xs border-t border-white/10 mt-6 text-left">
              <Icons.LogOut /> Log Out System
            </button>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-[#1B365D]">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-[#1B365D] font-extrabold flex items-center justify-center text-xs">
                PR
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Dr. S. B. Mansaray</div>
                <div className="text-[10px] text-amber-300 truncate">Principal &amp; Head of School</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8 bg-white border-b border-gray-200/80 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
                <Icons.Menu />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 font-[family-name:var(--font-outfit)] leading-tight">
                  Principal Executive Command Center
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Admissions decision approvals, staff deployment, and campus notifications
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl transition-colors text-xs border border-rose-200/80 flex items-center gap-1.5"
            >
              <Icons.LogOut /> <span className="hidden sm:inline">Log Out</span>
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Overview Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">School Attendance</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1B365D] font-[family-name:var(--font-outfit)]">96.8%</div>
                <p className="text-xs text-emerald-600 mt-1 font-medium">+2.4% vs last term</p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Admissions Queue</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-[family-name:var(--font-outfit)]">4 Active</div>
                <p className="text-xs text-amber-600 mt-1 font-medium">Verification in progress</p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Syllabus Progress</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-[family-name:var(--font-outfit)]">88.4%</div>
                <p className="text-xs text-gray-500 mt-1 font-medium">BECE &amp; WASSCE tracks</p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Academic Streams</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-[family-name:var(--font-outfit)]">JSS &amp; SSS</div>
                <p className="text-xs text-gray-500 mt-1 font-medium">Science, Arts, Commercial</p>
              </div>
            </div>

            {/* TAB 1: Admissions Verification & Exam Token Dispatcher */}
            {activeTab === 'admissions' && (
              <AdmissionsManagementModule adminRole="PRINCIPAL" adminName="Dr. S. B. Mansaray" />
            )}

            {/* TAB 2: Staff Onboarding Module */}
            {activeTab === 'staff' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8 max-w-2xl space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                    Staff Onboarding &amp; Academic Deployment
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Register new teachers and assign them to academic streams (BECE / WASSCE)
                  </p>
                </div>

                <form onSubmit={handleOnboardTeacher} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Teacher Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      placeholder="e.g. Mr. F. Bangura"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Official SIS Email
                    </label>
                    <input
                      type="email"
                      required
                      value={teacherEmail}
                      onChange={(e) => setTeacherEmail(e.target.value)}
                      placeholder="e.g. teacher.bangura@sis.edu.sl"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Academic Track
                      </label>
                      <select
                        value={stream}
                        onChange={(e) => setStream(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 bg-white font-medium text-gray-700"
                      >
                        <option value="BECE">BECE Junior Track (JSS 1-3)</option>
                        <option value="WASSCE_SCIENCE">WASSCE Senior Track (Science)</option>
                        <option value="WASSCE_ARTS">WASSCE Senior Track (Arts)</option>
                        <option value="WASSCE_COMMERCIAL">WASSCE Senior Track (Commercial)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Assigned Class
                      </label>
                      <input
                        type="text"
                        required
                        value={assignedClass}
                        onChange={(e) => setAssignedClass(e.target.value)}
                        placeholder="e.g. JSS 3A or SSS 2 Science"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1B365D] hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-xs shadow-sm"
                  >
                    Onboard &amp; Generate Credentials
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: Emergency Broadcast Dispatcher */}
            {activeTab === 'broadcast' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8 max-w-2xl space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                    Campus Notification Dispatcher
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Send official announcements directly to registered parent and teacher mobile devices
                  </p>
                </div>

                {broadcastStatus && (
                  <div className="bg-blue-50 text-blue-900 p-4 rounded-xl text-xs font-medium border border-blue-200">
                    {broadcastStatus}
                  </div>
                )}

                <form onSubmit={handleSendBroadcast} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Announcement Title
                    </label>
                    <input
                      type="text"
                      required
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      placeholder="e.g. Mid-Term Examination Schedule Announcement"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Target Audience
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value as 'ALL' | 'TEACHERS' | 'PARENTS')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 bg-white font-medium text-gray-700"
                    >
                      <option value="ALL">All Users (Parents &amp; Teachers)</option>
                      <option value="PARENTS">Parents Only</option>
                      <option value="TEACHERS">Teachers Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Notification Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={broadcastBody}
                      onChange={(e) => setBroadcastBody(e.target.value)}
                      placeholder="Enter official announcement message..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1B365D] hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-xs shadow-sm flex items-center justify-center gap-2"
                  >
                    <Icons.Radio /> Dispatch Campus Notification
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: Executive Analytics */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 space-y-4">
                  <h3 className="font-bold text-gray-900 font-[family-name:var(--font-outfit)] text-base">
                    Termly Attendance Distribution
                  </h3>
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <div className="flex justify-between font-medium mb-1 text-gray-700"><span>JSS 1 - 3 (BECE Track)</span><span>97.2%</span></div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '97.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-medium mb-1 text-gray-700"><span>SSS 1 - 3 (Science Stream)</span><span>98.1%</span></div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '98.1%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-medium mb-1 text-gray-700"><span>SSS 1 - 3 (Arts Stream)</span><span>95.4%</span></div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '95.4%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-medium mb-1 text-gray-700"><span>SSS 1 - 3 (Commercial Stream)</span><span>96.0%</span></div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: '96.0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 space-y-4">
                  <h3 className="font-bold text-gray-900 font-[family-name:var(--font-outfit)] text-base">
                    WASSCE &amp; BECE Syllabus Compliance
                  </h3>
                  <div className="space-y-3.5 text-xs">
                    <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">BECE Science &amp; Mathematics</div>
                        <div className="text-gray-500 mt-0.5">100% syllabus coverage on schedule</div>
                      </div>
                      <span className="text-emerald-700 font-bold text-[11px]">ON TARGET</span>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">WASSCE Physics &amp; Chemistry Practicals</div>
                        <div className="text-gray-500 mt-0.5">Weekly lab sessions active</div>
                      </div>
                      <span className="text-emerald-700 font-bold text-[11px]">OPTIMAL</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
