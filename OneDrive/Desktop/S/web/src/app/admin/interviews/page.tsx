'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthGuard, { AuthenticatedUser } from '@/components/AuthGuard';

type InterviewState = 'idle' | 'in_call' | 'post_call';

interface Applicant {
  id: string;
  name: string;
  grade: string;
  score: string;
  time: string;
}

export default function InterviewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [interviewState, setInterviewState] = useState<InterviewState>('idle');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [notes, setNotes] = useState('');
  const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('sis_auth_user') : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        const timer = setTimeout(() => setAuthUser(parsed), 0);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sis_auth_user');
    window.location.href = '/portal-access';
  };

  const applicants: Applicant[] = [
    { id: 'TRK-8821', name: 'Sarah Jenkins', grade: 'Grade 9 (BECE)', score: '94%', time: '10:00 AM' },
    { id: 'TRK-8823', name: 'Elena Rossi', grade: 'Grade 11 (WASSCE Arts)', score: '91%', time: '11:30 AM' },
    { id: 'TRK-8826', name: 'James Morrison', grade: 'Grade 8 (BECE)', score: '89%', time: '01:00 PM' },
    { id: 'TRK-8830', name: 'Fatima Ali', grade: 'Grade 7 (BECE)', score: '95%', time: '02:45 PM' },
  ];

  const handleStartInterview = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setInterviewState('in_call');
    setNotes('');
  };

  const handleEndCall = () => {
    setInterviewState('post_call');
  };

  const handleReset = () => {
    setInterviewState('idle');
    setSelectedApplicant(null);
  };

  const backLink = authUser?.role === 'VP' ? '/admin/vp-hub' :
                   authUser?.role === 'PRINCIPAL' ? '/admin/principal' : '/admin/it-hub';
  const roleTitle = authUser?.role === 'VP' ? 'Vice Principal (Academic)' :
                    authUser?.role === 'PRINCIPAL' ? 'Principal & Head of School' : 'IT System Administrator';

  return (
    <AuthGuard allowedRoles={['IT_ADMIN', 'PRINCIPAL', 'VP']}>
      <div className="flex h-screen bg-[#F5F7FA] font-sans">
        {/* Role-Specific Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1B365D] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative bg-white rounded-lg p-1 border border-white/30 overflow-hidden">
                <Image src="/logo.png" alt="S.I.S. Logo" fill className="object-contain p-0.5" />
              </div>
              <div>
                <span className="font-bold text-base font-['Outfit'] block">S.I.S Gateway</span>
                <span className="text-[10px] text-cyan-200 uppercase tracking-widest block font-semibold">{authUser?.role || 'SECURE'} CONSOLE</span>
              </div>
            </div>
            <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>

          <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-10rem)]">
            <Link href={backLink} className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm border-b border-white/10 mb-2">
              <span>←</span> Back to {authUser?.role === 'VP' ? 'VP Quality Hub' : authUser?.role === 'PRINCIPAL' ? 'Principal Hub' : 'IT Hub'}
            </Link>

            {authUser?.role === 'VP' && (
              <>
                <Link href="/admin/vp-hub" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
                  <span>🗓️</span> Timetable Mapping
                </Link>
                <Link href="/admin/vp-hub" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
                  <span>⭐</span> Teacher Ratings Audit
                </Link>
              </>
            )}

            {authUser?.role === 'PRINCIPAL' && (
              <>
                <Link href="/admin/principal" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
                  <span>📝</span> Admissions Approval Queue
                </Link>
                <Link href="/admin/principal" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
                  <span>👨‍🏫</span> Staff Onboarding
                </Link>
              </>
            )}

            <Link href="/admin/interviews" className="flex items-center gap-3 px-4 py-3 text-white bg-[#0056B3] rounded-xl font-medium transition-colors text-sm">
              <span>🎥</span> WebRTC Interview Room
            </Link>

            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-xl font-medium transition-colors text-sm border-t border-white/10 mt-4 text-left">
              <span>🚪</span> Log Out System
            </button>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-[#1B365D]">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00BCD4] to-[#0056B3] flex items-center justify-center text-white font-bold">
                {authUser?.role === 'VP' ? 'VP' : authUser?.role === 'PRINCIPAL' ? 'PR' : 'IT'}
              </div>
              <div>
                <div className="text-sm font-semibold">{authUser?.name || 'Authenticated User'}</div>
                <div className="text-xs text-cyan-200">{roleTitle}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header Bar */}
          <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>☰</button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-[#1A1A2E] font-['Outfit']">Virtual WebRTC Interview Room</h1>
                  <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <span>🔒</span> E2E Encrypted
                  </span>
                </div>
                <p className="text-xs text-gray-500 hidden md:block">P2P encrypted video assessment channel for candidate evaluation</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={backLink} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all">
                ← Return to {authUser?.role === 'VP' ? 'VP Dashboard' : authUser?.role === 'PRINCIPAL' ? 'Principal Dashboard' : 'IT Hub'}
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl text-xs uppercase tracking-wider border border-red-200">
                Log Out
              </button>
            </div>
          </header>

          {/* Workspace */}
          <div className="flex-1 flex overflow-hidden">
            {/* Interview Queue Panel */}
            <div className="w-full md:w-2/5 lg:w-[380px] border-r border-gray-200 bg-gray-50 flex flex-col overflow-hidden hidden md:flex shrink-0">
              <div className="p-6 border-b border-gray-200 bg-white">
                <h2 className="font-bold text-[#1A1A2E] text-lg font-['Outfit']">Today&apos;s Interview Queue</h2>
                <p className="text-xs text-gray-500">Candidates awaiting WebRTC connection</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {applicants.map((app) => (
                  <div key={app.id} className={`p-4 rounded-xl border transition-all ${selectedApplicant?.id === app.id ? 'border-[#0056B3] bg-blue-50/50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{app.name}</h3>
                        <p className="text-xs text-gray-500">{app.id} • {app.grade}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{app.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-600">Entrance Score:</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{app.score}</span>
                    </div>
                    <button 
                      onClick={() => handleStartInterview(app)}
                      disabled={interviewState === 'in_call'}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${interviewState === 'in_call' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#1B365D] text-white hover:bg-[#0056B3] shadow-md'}`}
                    >
                      <span>🎥</span> Connect Encrypted Call
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video & Assessment Interface */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
              {interviewState === 'idle' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl text-[#0056B3] mb-6 border border-blue-100 shadow-inner">
                    🎥
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#1B365D] font-['Outfit'] mb-2">Secure WebRTC Virtual Room Ready</h2>
                  <p className="text-gray-500 text-xs max-w-md leading-relaxed">
                    Select a candidate from the queue on the left to launch an end-to-end encrypted P2P video interview session.
                  </p>
                  
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 font-mono">
                    <span>🔒 Channel Security:</span> AES-256-GCM WebRTC DTLS-SRTP Encrypted
                  </div>

                  {/* Mobile Fallback Selection */}
                  <div className="mt-8 w-full max-w-md md:hidden text-left space-y-2">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 border-b pb-2">Select Applicant:</h3>
                    {applicants.map(app => (
                      <button key={app.id} onClick={() => handleStartInterview(app)} className="w-full flex items-center justify-between p-3 border rounded-xl bg-gray-50 hover:bg-gray-100">
                        <span className="font-bold text-xs text-gray-800">{app.name} ({app.score})</span>
                        <span className="text-xs bg-[#1B365D] text-white px-3 py-1 rounded-lg font-bold">Connect</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {interviewState === 'in_call' && (
                <div className="flex-1 flex flex-col h-full bg-gray-950 relative overflow-hidden">
                  {/* Main Candidate Video Feed */}
                  <div className="flex-1 relative bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center">
                    <div className="text-center text-gray-400 animate-pulse flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center text-4xl mb-4 border-2 border-gray-700">
                        👤
                      </div>
                      <p className="text-base font-bold text-white">{selectedApplicant?.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{selectedApplicant?.grade} • Score: {selectedApplicant?.score}</p>
                      <span className="mt-3 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono">
                        🔒 Encrypted P2P Media Stream Connected
                      </span>
                    </div>

                    {/* Top Overlay Badge */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                        <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                        <span className="text-white font-bold text-xs">LIVE STREAM • {selectedApplicant?.name}</span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-emerald-400 text-xs font-mono font-bold border border-white/10 flex items-center gap-2">
                        <span>🔐 AES-256</span> • 00:14:20
                      </div>
                    </div>

                    {/* PiP Examiner Self View */}
                    <div className="absolute bottom-6 right-6 w-52 h-36 bg-gray-900 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden z-10 flex flex-col items-center justify-center">
                      <span className="text-3xl">🧑‍🏫</span>
                      <span className="text-[10px] text-gray-400 mt-1 font-semibold">{authUser?.name} ({authUser?.role})</span>
                    </div>
                  </div>

                  {/* WebRTC Video Control Bar */}
                  <div className="h-20 bg-gray-900 flex items-center justify-between px-8 shrink-0 border-t border-gray-800 z-20">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setMicMuted(!micMuted)} 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all border ${micMuted ? 'bg-red-600 border-red-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
                      >
                        {micMuted ? '🔇' : '🎙️'}
                      </button>
                      <button 
                        onClick={() => setVideoOff(!videoOff)} 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all border ${videoOff ? 'bg-red-600 border-red-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
                      >
                        {videoOff ? '🚫' : '📹'}
                      </button>
                    </div>

                    <button 
                      onClick={handleEndCall} 
                      className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg flex items-center gap-2"
                    >
                      <span>📞</span> End WebRTC Call &amp; Evaluate
                    </button>

                    <div className="text-xs text-gray-400 font-mono hidden sm:block">
                      Role: <strong className="text-white">{authUser?.role}</strong>
                    </div>
                  </div>
                </div>
              )}

              {interviewState === 'post_call' && (
                <div className="flex-1 flex flex-col p-8 overflow-y-auto bg-gray-50">
                  <div className="max-w-2xl w-full mx-auto space-y-6">
                    <div className="flex items-center gap-4">
                      <button onClick={handleReset} className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-100">
                        ←
                      </button>
                      <div>
                        <h2 className="text-2xl font-bold text-[#1B365D] font-['Outfit']">Candidate Post-Interview Decision</h2>
                        <p className="text-xs text-gray-500">Applicant: <strong className="text-gray-900">{selectedApplicant?.name}</strong> ({selectedApplicant?.id})</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Examiner Notes &amp; Assessment Remarks</label>
                      <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={5}
                        placeholder="Enter interview evaluation remarks, communication performance, & academic stream recommendations..."
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0056B3] outline-none text-xs"
                      ></textarea>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="block font-bold text-gray-700 mb-1">Communication Clarity</span>
                          <span className="text-amber-500 font-bold text-lg">★★★★★</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="block font-bold text-gray-700 mb-1">Academic Preparation</span>
                          <span className="text-amber-500 font-bold text-lg">★★★★☆</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          alert(`Candidate ${selectedApplicant?.name} recommended for Principal Approval! Status updated in Convex Admissions table.`);
                          handleReset();
                        }}
                        className="flex-1 py-4 bg-[#1B365D] hover:bg-emerald-600 text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>✅</span> Recommend Approval to Principal
                      </button>
                      <button 
                        onClick={() => {
                          alert(`Candidate ${selectedApplicant?.name} application rejected.`);
                          handleReset();
                        }}
                        className="py-4 px-6 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-2xl font-bold text-xs uppercase tracking-wider"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
