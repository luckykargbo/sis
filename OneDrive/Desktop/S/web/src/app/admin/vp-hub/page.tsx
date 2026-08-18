'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthGuard from '@/components/AuthGuard';
import AdmissionsManagementModule from '@/components/AdmissionsManagementModule';

interface TeacherRatingItem {
  id: string;
  teacherName: string;
  subject: string;
  clarity: number;
  punctuality: number;
  helpfulness: number;
  overallScore: number;
  totalRatings: number;
}

// Enterprise SVG Icons (Zero Emoji)
const Icons = {
  Calendar: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Key: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Video: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

export default function VicePrincipalDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'timetable' | 'admissions' | 'ratings' | 'lessons'>('timetable');

  const handleLogout = () => {
    localStorage.removeItem('sis_auth_user');
    window.location.href = '/sis_gate';
  };

  const [ratings] = useState<TeacherRatingItem[]>([
    { id: 'RAT-1', teacherName: 'Mr. A. Kamara', subject: 'Integrated Science (BECE)', clarity: 4.8, punctuality: 4.9, helpfulness: 4.7, overallScore: 4.8, totalRatings: 42 },
    { id: 'RAT-2', teacherName: 'Mr. F. Bangura', subject: 'Core Mathematics (BECE & WASSCE)', clarity: 4.6, punctuality: 4.7, helpfulness: 4.5, overallScore: 4.6, totalRatings: 38 },
    { id: 'RAT-3', teacherName: 'Mrs. H. Sesay', subject: 'Physics & Chemistry (WASSCE Science)', clarity: 4.9, punctuality: 4.8, helpfulness: 4.9, overallScore: 4.86, totalRatings: 29 },
    { id: 'RAT-4', teacherName: 'Mr. S. Koroma', subject: 'Literature-in-English (WASSCE Arts)', clarity: 4.5, punctuality: 4.6, helpfulness: 4.4, overallScore: 4.5, totalRatings: 31 },
  ]);

  const timetableEntries = [
    { class: 'JSS 1A', stream: 'BECE Junior', subject: 'General Mathematics', teacher: 'Mr. F. Bangura', time: '08:00 - 08:45 AM', day: 'Monday' },
    { class: 'JSS 3A', stream: 'BECE Junior', subject: 'Integrated Science', teacher: 'Mr. A. Kamara', time: '08:45 - 09:30 AM', day: 'Monday' },
    { class: 'SSS 1 Science', stream: 'WASSCE Senior', subject: 'Physics Practical', teacher: 'Mrs. H. Sesay', time: '09:45 - 11:15 AM', day: 'Monday' },
    { class: 'SSS 2 Arts', stream: 'WASSCE Senior', subject: 'Literature-in-English', teacher: 'Mr. S. Koroma', time: '11:15 - 12:00 PM', day: 'Monday' },
    { class: 'SSS 3 Commercial', stream: 'WASSCE Senior', subject: 'Financial Accounting', teacher: 'Mrs. M. Turay', time: '12:45 - 01:30 PM', day: 'Monday' },
  ];

  return (
    <AuthGuard allowedRoles={['VP']}>
      <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
        {/* Mobile Backdrop */}
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
                <span className="font-bold text-sm font-[family-name:var(--font-outfit)] block leading-tight">VP Academic Quality</span>
                <span className="text-[10px] text-cyan-300 font-semibold uppercase tracking-wider block">Quality Assurance</span>
              </div>
            </div>
            <button className="lg:hidden text-white/70 hover:text-white p-1" onClick={() => setSidebarOpen(false)}>
              <Icons.X />
            </button>
          </div>

          <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-10rem)]">
            <button onClick={() => { setActiveTab('timetable'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'timetable' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Calendar /> Timetable &amp; Subject Mapping
            </button>
            <button onClick={() => { setActiveTab('admissions'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'admissions' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Key /> Admissions &amp; Exam Tokens
            </button>
            <button onClick={() => { setActiveTab('ratings'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'ratings' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Star /> Teacher Ratings Audit
            </button>
            <Link href="/admin/interviews" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-xs">
              <Icons.Video /> WebRTC Interview Room
            </Link>
            <button onClick={() => { setActiveTab('lessons'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'lessons' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.CheckCircle /> Lesson Verification Logs
            </button>

            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 rounded-xl font-medium transition-colors text-xs border-t border-white/10 mt-6 text-left">
              <Icons.LogOut /> Log Out System
            </button>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-[#1B365D]">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-cyan-500 text-white font-extrabold flex items-center justify-center text-xs">
                VP
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Mr. J. O. Tucker</div>
                <div className="text-[10px] text-cyan-300 truncate">Vice Principal (Academic)</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8 bg-white border-b border-gray-200/80 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
                <Icons.Menu />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 font-[family-name:var(--font-outfit)] leading-tight">
                  Vice Principal Academic Quality Command
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Subject mapping, teacher audit ratings, and virtual WebRTC candidate assessments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/admin/interviews" className="px-3.5 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl transition-all text-xs flex items-center gap-1.5 shadow-sm">
                <Icons.Video /> <span className="hidden sm:inline">WebRTC Interview Room</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl transition-colors text-xs border border-rose-200/80 flex items-center gap-1.5"
              >
                <Icons.LogOut /> <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Metric Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Teacher Rating Index</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1B365D] font-[family-name:var(--font-outfit)]">4.74 / 5.0</div>
                <p className="text-xs text-emerald-600 mt-1 font-medium">High clarity &amp; punctuality</p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Mapped Classes</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-[family-name:var(--font-outfit)]">18 Classes</div>
                <p className="text-xs text-gray-500 mt-1 font-medium">JSS 1-3 &amp; SSS 1-3 Streams</p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Weekly Lessons Verified</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-[family-name:var(--font-outfit)]">142 Sessions</div>
                <p className="text-xs text-emerald-600 mt-1 font-medium">Verified by Vice Principal</p>
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">WebRTC Candidates</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 font-[family-name:var(--font-outfit)]">4 Scheduled</div>
                <p className="text-xs text-cyan-700 mt-1 font-medium">Today&apos;s interview queue</p>
              </div>
            </div>

            {/* TAB: Admissions Verification Module */}
            {activeTab === 'admissions' && (
              <AdmissionsManagementModule adminRole="VP" adminName="Mr. J. O. Tucker" />
            )}

            {/* TAB 1: Timetable & Subject Stream Mapping Engine */}
            {activeTab === 'timetable' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                    Timetable &amp; Subject Stream Mapping Engine
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Mapping BECE (JSS 1-3) &amp; WASSCE (Science, Arts, Commercial) core subjects to teaching staff
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 border-b border-gray-200/80 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5">Day &amp; Period</th>
                        <th className="py-3.5 px-5">Class Level</th>
                        <th className="py-3.5 px-5">Academic Stream</th>
                        <th className="py-3.5 px-5">Subject Course</th>
                        <th className="py-3.5 px-5">Assigned Teacher</th>
                        <th className="py-3.5 px-5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      {timetableEntries.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5 font-mono text-gray-600">{item.day} ({item.time})</td>
                          <td className="py-3.5 px-5 font-bold text-slate-800">{item.class}</td>
                          <td className="py-3.5 px-5 text-gray-600">{item.stream}</td>
                          <td className="py-3.5 px-5 font-semibold text-blue-900">{item.subject}</td>
                          <td className="py-3.5 px-5 font-medium text-gray-800">{item.teacher}</td>
                          <td className="py-3.5 px-5 text-right">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ACTIVE SESSION
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Teacher Ratings Audit */}
            {activeTab === 'ratings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                    Aggregated Teacher Quality Ratings (Bi-weekly Audit)
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Anonymous student evaluation scores tracking clarity, punctuality, and helpfulness
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 border-b border-gray-200/80 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5">Teacher Name</th>
                        <th className="py-3.5 px-5">Subject &amp; Stream</th>
                        <th className="py-3.5 px-5">Clarity</th>
                        <th className="py-3.5 px-5">Punctuality</th>
                        <th className="py-3.5 px-5">Helpfulness</th>
                        <th className="py-3.5 px-5">Overall Score</th>
                        <th className="py-3.5 px-5 text-right">Evaluations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      {ratings.map((rat) => (
                        <tr key={rat.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5 font-bold text-gray-900">{rat.teacherName}</td>
                          <td className="py-3.5 px-5 font-medium text-blue-900">{rat.subject}</td>
                          <td className="py-3.5 px-5 font-medium text-gray-700">{rat.clarity} / 5.0</td>
                          <td className="py-3.5 px-5 font-medium text-gray-700">{rat.punctuality} / 5.0</td>
                          <td className="py-3.5 px-5 font-medium text-gray-700">{rat.helpfulness} / 5.0</td>
                          <td className="py-3.5 px-5 font-bold text-slate-900">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-md border border-blue-200/60 font-mono">
                              ★ {rat.overallScore}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right text-gray-500">{rat.totalRatings} reviews</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Lesson Verification Logs */}
            {activeTab === 'lessons' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 space-y-4">
                <h2 className="text-base font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                  Verified Subject Lessons Log
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="p-4 border border-emerald-200 bg-emerald-50/40 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-mono text-gray-500 text-[11px]">Today 09:00 AM</span>
                      <h4 className="font-bold text-gray-900 text-sm mt-0.5">BECE Integrated Science — Cell Biology &amp; Photosynthesis</h4>
                      <p className="text-gray-600 mt-0.5">Instructor: Mr. A. Kamara | Attendance: 34 / 35 Present</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[10px] tracking-wider uppercase">
                      VP VERIFIED
                    </span>
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
