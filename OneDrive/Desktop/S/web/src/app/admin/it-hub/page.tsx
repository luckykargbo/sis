'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthGuard from '@/components/AuthGuard';
import AdmissionsManagementModule from '@/components/AdmissionsManagementModule';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'IT_ADMIN' | 'PRINCIPAL' | 'VP' | 'TEACHER' | 'STUDENT' | 'PARENT';
  status: 'ACTIVE' | 'SUSPENDED';
  isOnline: boolean;
  lastLogin: string;
  lastLogout?: string;
}

interface ActivityLogItem {
  id: string;
  user: string;
  role: string;
  event: 'LOGIN' | 'LOGOUT' | 'OTP_DISPATCH' | 'PASSCODE_RESET';
  details: string;
  timestamp: string;
}

// Enterprise SVG Icons (Zero Emoji)
const Icons = {
  Shield: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Key: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  Activity: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  UserPlus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  Video: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
  ),
  Search: () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export default function ITHubDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'admissions' | 'logs'>('audit');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem('sis_auth_user');
    window.location.href = '/sis_gate';
  };

  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  // Form state for provisioning
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'PRINCIPAL' | 'VP' | 'TEACHER' | 'STUDENT' | 'PARENT'>('TEACHER');

  const [users, setUsers] = useState<SystemUser[]>([
    { id: 'USR-001', name: 'IT System Manager', email: 'hackerunlockme@gmail.com', role: 'IT_ADMIN', status: 'ACTIVE', isOnline: true, lastLogin: 'Active Now' },
    { id: 'USR-002', name: 'Dr. S. B. Mansaray', email: 'principal@sis.edu.sl', role: 'PRINCIPAL', status: 'ACTIVE', isOnline: true, lastLogin: '5 mins ago' },
    { id: 'USR-003', name: 'Mr. J. O. Tucker', email: 'vp@sis.edu.sl', role: 'VP', status: 'ACTIVE', isOnline: false, lastLogin: '2 hours ago', lastLogout: '1 hour ago' },
    { id: 'USR-004', name: 'Mr. A. Kamara', email: 'teacher.kamara@sis.edu.sl', role: 'TEACHER', status: 'ACTIVE', isOnline: true, lastLogin: '18 mins ago' },
    { id: 'USR-005', name: 'Mrs. F. Sesay', email: 'parent.khadija@sis.edu.sl', role: 'PARENT', status: 'ACTIVE', isOnline: false, lastLogin: 'Yesterday', lastLogout: 'Yesterday 04:30 PM' },
    { id: 'USR-006', name: 'Khadija Bangura', email: 'student.st001@sis.edu.sl', role: 'STUDENT', status: 'ACTIVE', isOnline: false, lastLogin: '3 hours ago', lastLogout: '2 hours ago' },
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([
    { id: 'LOG-901', user: 'IT System Administrator', role: 'IT_ADMIN', event: 'LOGIN', details: 'Authenticated via 2FA Email Code. Status set to ONLINE.', timestamp: 'Just now' },
    { id: 'LOG-902', user: 'Dr. S. B. Mansaray', role: 'PRINCIPAL', event: 'LOGIN', details: 'Logged into Executive Console via 2FA OTP.', timestamp: '5 mins ago' },
    { id: 'LOG-903', user: 'Mr. J. O. Tucker', role: 'VP', event: 'LOGOUT', details: 'Session terminated cleanly. Status updated to OFFLINE.', timestamp: '1 hour ago' },
    { id: 'LOG-904', user: 'Mr. A. Kamara', role: 'TEACHER', event: 'LOGIN', details: 'Logged in to review class attendance.', timestamp: '18 mins ago' },
    { id: 'LOG-905', user: 'Khadija Bangura', role: 'STUDENT', event: 'LOGOUT', details: 'Completed entrance exam session and logged out.', timestamp: '2 hours ago' },
    { id: 'LOG-906', user: 'Deborah Moiforay', role: 'STUDENT', event: 'OTP_DISPATCH', details: 'Generated 2FA email authentication token for student applicant.', timestamp: '3 hours ago' },
  ]);

  const handleProvisionUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser: SystemUser = {
      id: `USR-00${users.length + 1}`,
      name: newName,
      email: newEmail,
      role: newRole,
      status: 'ACTIVE',
      isOnline: false,
      lastLogin: 'Never',
    };

    setUsers([newUser, ...users]);
    setNewName('');
    setNewEmail('');
    setShowProvisionModal(false);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE', isOnline: u.status === 'ACTIVE' ? false : u.isOnline } : u));
  };

  const handleForceLogout = (user: SystemUser) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, isOnline: false, lastLogout: 'Just now' } : u));
    setActivityLogs([
      {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        user: user.name,
        role: user.role,
        event: 'LOGOUT',
        details: `Session forcefully terminated by IT System Administrator.`,
        timestamp: 'Just now',
      },
      ...activityLogs,
    ]);
  };

  const filteredUsers = users.filter(u => {
    const matchesRole = selectedRoleFilter === 'ALL' || u.role === selectedRoleFilter;
    const matchesQuery = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesQuery;
  });

  const onlineCount = users.filter(u => u.isOnline).length;

  return (
    <AuthGuard allowedRoles={['IT_ADMIN']}>
      <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
        {/* Mobile backdrop */}
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
                <span className="font-bold text-sm font-[family-name:var(--font-outfit)] block leading-tight">IT Manager Command</span>
                <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider block">System Admin</span>
              </div>
            </div>
            <button className="lg:hidden text-white/70 hover:text-white p-1" onClick={() => setSidebarOpen(false)}>
              <Icons.X />
            </button>
          </div>

          <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-10rem)]">
            <button onClick={() => { setActiveTab('audit'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'audit' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Shield /> System Accounts &amp; Presence
            </button>
            <button onClick={() => { setActiveTab('admissions'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'admissions' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Key /> Admissions &amp; Exam Tokens
            </button>
            <button onClick={() => { setActiveTab('logs'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-xs ${activeTab === 'logs' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icons.Activity /> Real-Time Login / Logout Feed
            </button>
            <Link href="/admin/principal" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-xs">
              <Icons.UserPlus /> Principal Executive Hub
            </Link>
            <Link href="/admin/vp-hub" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors text-xs">
              <Icons.Shield /> Vice Principal Quality Hub
            </Link>

            <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-3 px-4 py-3 text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 rounded-xl font-medium transition-colors text-xs border-t border-white/10 mt-6 text-left">
              <Icons.LogOut /> Log Out System
            </button>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-[#1B365D]">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-blue-500 text-white font-extrabold flex items-center justify-center text-xs">
                IT
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">IT Manager Console</div>
                <div className="text-[10px] text-blue-300 truncate">Super Administrator</div>
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
                  IT Manager System Command &amp; Presence Audit
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Live user online/offline status, login &amp; logout session tracking, and 2FA authentication logs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeTab === 'audit' && (
                <button
                  onClick={() => setShowProvisionModal(true)}
                  className="px-3.5 py-2 bg-[#1B365D] hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Icons.UserPlus /> <span className="hidden sm:inline">Provision Account</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl transition-colors text-xs border border-rose-200/80 flex items-center gap-1.5"
              >
                <Icons.LogOut /> <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {activeTab === 'admissions' && (
              <AdmissionsManagementModule adminRole="IT_ADMIN" adminName="IT System Manager" />
            )}

            {/* TAB: Real-Time Login/Logout Activity Logs */}
            {activeTab === 'logs' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                      Real-Time System Login &amp; Logout Audit Feed
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Live security audit log of user logins, logouts, 2FA OTP code generation, and session events
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Live Feed Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 border-b border-gray-200/80 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5">Timestamp</th>
                        <th className="py-3.5 px-5">User &amp; Identity</th>
                        <th className="py-3.5 px-5">Role Tier</th>
                        <th className="py-3.5 px-5">Event Type</th>
                        <th className="py-3.5 px-5">Audit Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs font-normal">
                      {activityLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-5 font-mono text-gray-500 text-[11px] whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="py-4 px-5 font-bold text-gray-900">{log.user}</td>
                          <td className="py-4 px-5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 uppercase">
                              {log.role}
                            </span>
                          </td>
                          <td className="py-4 px-5">
                            {log.event === 'LOGIN' && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                LOGIN (ONLINE)
                              </span>
                            )}
                            {log.event === 'LOGOUT' && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                LOGOUT (OFFLINE)
                              </span>
                            )}
                            {log.event === 'OTP_DISPATCH' && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                2FA OTP DISPATCHED
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 text-gray-600 text-[11px] leading-relaxed">
                            {log.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <>
                {/* System & Presence Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Users Currently Online</div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-[family-name:var(--font-outfit)]">{onlineCount} Online</span>
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                    </div>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">Active Portal Sessions</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Total System Accounts</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[family-name:var(--font-outfit)]">{users.length} Accounts</div>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Across 6 User Tiers</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">2FA Email Verification</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-[family-name:var(--font-outfit)]">Enforced</div>
                    <p className="text-xs text-blue-700 mt-1 font-medium">6-Digit Instant OTP</p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200/80">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Convex Backend Cloud</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-[family-name:var(--font-outfit)]">Active</div>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">100% Operational</p>
                  </div>
                </div>

                {/* User Directory & Presence Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-base font-bold text-gray-900 font-[family-name:var(--font-outfit)]">System Account Directory &amp; Live Presence Monitor</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Track who is online/offline, view last login/logout timestamps, and manage account authorization</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative w-full sm:w-48">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icons.Search />
                        </div>
                        <input 
                          type="text"
                          placeholder="Search accounts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 font-medium"
                        />
                      </div>

                      <select 
                        value={selectedRoleFilter}
                        onChange={(e) => setSelectedRoleFilter(e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 bg-white font-medium text-gray-700"
                      >
                        <option value="ALL">All Roles</option>
                        <option value="IT_ADMIN">IT Admin</option>
                        <option value="PRINCIPAL">Principal</option>
                        <option value="VP">Vice Principal</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="STUDENT">Student</option>
                        <option value="PARENT">Parent</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[780px]">
                      <thead className="bg-slate-50 border-b border-gray-200/80 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="py-3.5 px-5">User ID</th>
                          <th className="py-3.5 px-5">Full Name</th>
                          <th className="py-3.5 px-5">Email / Identity</th>
                          <th className="py-3.5 px-5">Role Tier</th>
                          <th className="py-3.5 px-5">Online Presence</th>
                          <th className="py-3.5 px-5">Last Activity</th>
                          <th className="py-3.5 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-5 font-mono font-bold text-slate-700">{user.id}</td>
                            <td className="py-3.5 px-5 font-bold text-gray-900">{user.name}</td>
                            <td className="py-3.5 px-5 font-mono text-gray-600 text-[11px]">{user.email}</td>
                            <td className="py-3.5 px-5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                user.role === 'IT_ADMIN' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                user.role === 'PRINCIPAL' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                user.role === 'VP' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                user.role === 'TEACHER' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                user.role === 'STUDENT' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3.5 px-5">
                              {user.isOnline ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  ONLINE
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                  OFFLINE
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-5 text-gray-500 text-[11px]">
                              <div>Login: {user.lastLogin}</div>
                              {user.lastLogout && <div className="text-[10px] text-gray-400">Logout: {user.lastLogout}</div>}
                            </td>
                            <td className="py-3.5 px-5 text-right space-x-2">
                              {user.isOnline && (
                                <button 
                                  onClick={() => handleForceLogout(user)}
                                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-md text-[10px] font-medium border border-amber-200 transition-colors"
                                >
                                  Disconnect Session
                                </button>
                              )}
                              <button 
                                onClick={() => handleToggleStatus(user.id)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${user.status === 'ACTIVE' ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                              >
                                {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Provision Account Modal */}
                {showProvisionModal && (
                  <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-gray-100">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <h3 className="font-bold text-base text-gray-900 font-[family-name:var(--font-outfit)]">Provision New Account</h3>
                        <button onClick={() => setShowProvisionModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                          <Icons.X />
                        </button>
                      </div>

                      <form onSubmit={handleProvisionUser} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                          <input 
                            type="text" 
                            required 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                            placeholder="e.g. Mr. S. Koroma"
                            className="w-full px-3.5 py-2 border rounded-xl text-xs outline-none focus:border-blue-600 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                          <input 
                            type="email" 
                            required 
                            value={newEmail} 
                            onChange={(e) => setNewEmail(e.target.value)} 
                            placeholder="e.g. teacher.koroma@sis.edu.sl"
                            className="w-full px-3.5 py-2 border rounded-xl text-xs outline-none focus:border-blue-600 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Role Tier</label>
                          <select 
                            value={newRole} 
                            onChange={(e) => setNewRole(e.target.value as 'PRINCIPAL' | 'VP' | 'TEACHER' | 'STUDENT' | 'PARENT')}
                            className="w-full px-3.5 py-2 border rounded-xl text-xs outline-none focus:border-blue-600 bg-white font-medium"
                          >
                            <option value="PRINCIPAL">Principal</option>
                            <option value="VP">Vice Principal</option>
                            <option value="TEACHER">Teacher</option>
                            <option value="STUDENT">Student</option>
                            <option value="PARENT">Parent</option>
                          </select>
                        </div>

                        <div className="pt-2 flex gap-2.5">
                          <button type="button" onClick={() => setShowProvisionModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50">
                            Cancel
                          </button>
                          <button type="submit" className="flex-1 py-2.5 bg-[#1B365D] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold">
                            Create Credentials
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                {/* Logout Confirmation Modal */}
                {showLogoutModal && (
                  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 mx-auto">
                        <Icons.LogOut />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 text-center font-[family-name:var(--font-outfit)]">
                        Log Out Confirmation
                      </h3>
                      <p className="text-xs text-gray-600 text-center mt-2 leading-relaxed">
                        Are you sure you want to log out of your account? Your active session will be securely closed and you will return to the S.I.S Gateway.
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setShowLogoutModal(false)}
                          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel / Stay Logged In
                        </button>
                        <button
                          type="button"
                          onClick={confirmLogout}
                          className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                        >
                          Yes, Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
