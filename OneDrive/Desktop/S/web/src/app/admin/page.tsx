'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('sis_auth_user');
    window.location.href = '/portal-access';
  };

  return (
    <AuthGuard allowedRoles={['IT_ADMIN', 'PRINCIPAL', 'VP']}>
      <div className="flex h-screen bg-[#F5F7FA] font-sans">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1B365D] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
                <span className="text-[#1B365D] font-bold text-xl font-['Outfit']">S.I.S</span>
              </div>
              <span className="font-semibold text-lg font-['Outfit']">Standards Int.</span>
            </div>
            <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
          </div>

          <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-10rem)]">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-white bg-[#0056B3] rounded-xl font-medium transition-colors text-sm">
              <span>📊</span> Overview Hub
            </Link>
            <Link href="/admin/it-hub" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
              <span>🛡️</span> IT Provisioning Hub
            </Link>
            <Link href="/admin/principal" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
              <span>👔</span> Principal Executive Hub
            </Link>
            <Link href="/admin/vp-hub" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
              <span>🎓</span> Vice Principal Quality Hub
            </Link>
            <Link href="/admin/interviews" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-sm">
              <span>🎥</span> WebRTC Interview Room
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-100 hover:bg-red-500/20 rounded-xl font-medium transition-colors text-sm border-t border-white/10 mt-4 text-left">
              <span>🚪</span> Log Out System
            </button>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-[#1B365D]">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0056B3] to-[#FFCC00] flex items-center justify-center text-white font-bold">
                AM
              </div>
              <div>
                <div className="text-sm font-semibold">Admin Console</div>
                <div className="text-xs text-[#FFCC00]">Authenticated User</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar */}
          <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
                ☰
              </button>
              <h1 className="text-2xl font-bold text-[#1A1A2E] font-['Outfit']">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors text-xs uppercase tracking-wider border border-red-200"
              >
                Log Out
              </button>
            </div>
          </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 text-[#0056B3] rounded-xl flex items-center justify-center text-xl">🎓</div>
                <div className="flex items-center gap-1 text-sm font-medium text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-1 rounded-lg">
                  <span>↗</span> 12%
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Students</h3>
              <div className="text-3xl font-bold text-[#1A1A2E] font-['Outfit']">523</div>
            </div>
            
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl">👨‍🏫</div>
                <div className="flex items-center gap-1 text-sm font-medium text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-1 rounded-lg">
                  <span>↗</span> 3%
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Active Teachers</h3>
              <div className="text-3xl font-bold text-[#1A1A2E] font-['Outfit']">48</div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden transition-transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFCC00]/20 to-transparent rounded-bl-full"></div>
              <div className="flex items-center justify-between mb-4 relative">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl">📝</div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1 relative">Pending Admissions</h3>
              <div className="flex items-center gap-3 relative">
                <div className="text-3xl font-bold text-[#1A1A2E] font-['Outfit']">15</div>
                <span className="bg-[#FFCC00] text-[#1A1A2E] text-xs font-bold px-2 py-1 rounded-md">ACTION NEEDED</span>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 text-[#4CAF50] rounded-xl flex items-center justify-center text-xl">✅</div>
                <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#4CAF50] border-r-[#4CAF50] flex items-center justify-center transform -rotate-45">
                  <div className="transform rotate-45 text-xs font-bold text-gray-700">96%</div>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Today&apos;s Attendance</h3>
              <div className="text-3xl font-bold text-[#1A1A2E] font-['Outfit']">96.2%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Admissions Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1A1A2E] font-['Outfit']">Recent Admissions</h2>
                <button className="text-sm font-medium text-[#0056B3] hover:text-[#1B365D] transition-colors">View All →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50/50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Tracking ID</th>
                      <th className="px-6 py-4">Student Name</th>
                      <th className="px-6 py-4">Grade</th>
                      <th className="px-6 py-4">Exam Score</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">TRK-8821</td>
                      <td className="px-6 py-4 font-medium text-[#1A1A2E]">Sarah Jenkins</td>
                      <td className="px-6 py-4">Grade 9</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4CAF50]"></span> 94%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">EXAM_COMPLETED</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#0056B3] hover:text-[#1B365D] font-medium mr-3">View</button>
                        <Link href="/admin/interviews" className="text-[#00BCD4] hover:text-cyan-700 font-medium">Interview</Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">TRK-8822</td>
                      <td className="px-6 py-4 font-medium text-[#1A1A2E]">Michael Chang</td>
                      <td className="px-6 py-4">Grade 7</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300"></span> N/A</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">PENDING</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#0056B3] hover:text-[#1B365D] font-medium">View</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">TRK-8819</td>
                      <td className="px-6 py-4 font-medium text-[#1A1A2E]">Amina Mensah</td>
                      <td className="px-6 py-4">Grade 10</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4CAF50]"></span> 88%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">ACCEPTED</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#0056B3] hover:text-[#1B365D] font-medium">View</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">TRK-8815</td>
                      <td className="px-6 py-4 font-medium text-[#1A1A2E]">David Osei</td>
                      <td className="px-6 py-4">Grade 8</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E53935]"></span> 45%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">REJECTED</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#0056B3] hover:text-[#1B365D] font-medium">View</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">TRK-8823</td>
                      <td className="px-6 py-4 font-medium text-[#1A1A2E]">Elena Rossi</td>
                      <td className="px-6 py-4">Grade 11</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4CAF50]"></span> 91%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">EXAM_COMPLETED</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#0056B3] hover:text-[#1B365D] font-medium mr-3">View</button>
                        <Link href="/admin/interviews" className="text-[#00BCD4] hover:text-cyan-700 font-medium">Interview</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-[#1A1A2E] font-['Outfit'] mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/admin/interviews" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#0056B3]/30 hover:bg-[#0056B3]/5 transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-blue-50 text-[#0056B3] rounded-lg flex items-center justify-center group-hover:bg-[#0056B3] group-hover:text-white transition-colors">🎥</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Schedule Interview</h4>
                      <p className="text-xs text-gray-500">Set up a WebRTC meeting</p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#E91E63]/30 hover:bg-[#E91E63]/5 transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-pink-50 text-[#E91E63] rounded-lg flex items-center justify-center group-hover:bg-[#E91E63] group-hover:text-white transition-colors">📢</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Broadcast Notice</h4>
                      <p className="text-xs text-gray-500">Send an alert to all staff</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#00BCD4]/30 hover:bg-[#00BCD4]/5 transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-cyan-50 text-[#00BCD4] rounded-lg flex items-center justify-center group-hover:bg-[#00BCD4] group-hover:text-white transition-colors">📊</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Generate Reports</h4>
                      <p className="text-xs text-gray-500">Export student statistics</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1B365D] to-[#0056B3] text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-[#FFCC00]/20 rounded-full blur-xl"></div>
                <h3 className="font-['Outfit'] font-bold text-lg relative z-10">Next Interview</h3>
                <p className="text-white/80 text-sm mt-1 mb-4 relative z-10">In 15 minutes</p>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl relative z-10 border border-white/20">
                  <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center font-bold">
                    SJ
                  </div>
                  <div>
                    <div className="font-medium">Sarah Jenkins</div>
                    <div className="text-xs text-white/70">Grade 9 • TRK-8821</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </AuthGuard>
);
}
