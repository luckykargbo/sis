'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface ApplicationItem {
  id: string;
  trackingId: string;
  studentName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  targetGrade: string;
  targetStream?: string;
  status: 'PENDING' | 'EXAM_SCHEDULED' | 'EXAM_COMPLETED' | 'INTERVIEW_SCHEDULED' | 'ACCEPTED' | 'REJECTED';
  examToken?: string;
  examTokenExpiresAt?: number;
  examScore?: number;
  approvedByRole?: string;
  approvedByName?: string;
  submittedAt: string;
}

interface Props {
  adminRole: 'IT_ADMIN' | 'PRINCIPAL' | 'VP';
  adminName: string;
}

// Enterprise SVG Icons (Zero Emoji)
const Icons = {
  Search: () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Key: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Video: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Refresh: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-4 h-4 text-[#0056B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
};

export default function AdmissionsManagementModule({ adminRole, adminName }: Props) {
  const [applications, setApplications] = useState<ApplicationItem[]>([
    {
      id: 'ADM-101',
      trackingId: 'SIS-8GUGOE7SQ',
      studentName: 'Deborah Moiforay',
      parentName: 'Deborah J Moiforay',
      parentEmail: 'deborahjulietmoiforay@gmail.com',
      parentPhone: '+232 76 123 456',
      targetGrade: 'SSS 3',
      targetStream: 'Science',
      status: 'PENDING',
      submittedAt: 'Today at 11:30 AM',
    },
    {
      id: 'ADM-102',
      trackingId: 'SIS-2026-9482',
      studentName: 'Khadija Bangura',
      parentName: 'Mrs. F. Sesay',
      parentEmail: 'parent.khadija@sis.edu.sl',
      parentPhone: '+232 77 987 654',
      targetGrade: 'JSS 3',
      status: 'EXAM_SCHEDULED',
      examToken: 'EXAM-K94A-2026',
      examTokenExpiresAt: Date.now() + 24 * 3600 * 1000,
      approvedByRole: 'PRINCIPAL',
      approvedByName: 'Dr. S. B. Mansaray',
      submittedAt: 'Yesterday',
    },
    {
      id: 'ADM-103',
      trackingId: 'SIS-TRK-8821',
      studentName: 'Sarah Jenkins',
      parentName: 'Mr. R. Jenkins',
      parentEmail: 'parent.jenkins@gmail.com',
      parentPhone: '+232 30 555 123',
      targetGrade: 'SSS 1',
      targetStream: 'Science',
      status: 'EXAM_COMPLETED',
      examToken: 'EXAM-38A91',
      examScore: 94,
      submittedAt: '2 days ago',
    },
    {
      id: 'ADM-104',
      trackingId: 'SIS-TRK-8823',
      studentName: 'Elena Rossi',
      parentName: 'Dr. G. Rossi',
      parentEmail: 'rossi.g@medical.org',
      parentPhone: '+232 88 444 321',
      targetGrade: 'SSS 2',
      targetStream: 'Arts',
      status: 'ACCEPTED',
      examScore: 89,
      submittedAt: '3 days ago',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Issue Token Modal state
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [expirationHours, setExpirationHours] = useState<number>(24);
  const [dispatchNotice, setDispatchNotice] = useState<string>('');

  const handleOpenIssueModal = (app: ApplicationItem) => {
    setSelectedApp(app);
    setExpirationHours(24);
    setDispatchNotice('');
  };

  const handleIssueTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const generatedToken = 'EXAM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = Date.now() + expirationHours * 60 * 60 * 1000;

    setApplications(prev =>
      prev.map(item =>
        item.id === selectedApp.id
          ? {
              ...item,
              status: 'EXAM_SCHEDULED',
              examToken: generatedToken,
              examTokenExpiresAt: expiresAt,
              approvedByRole: adminRole,
              approvedByName: adminName,
            }
          : item
      )
    );

    setDispatchNotice(
      `Exam Token [${generatedToken}] successfully generated and dispatched to ${selectedApp.parentEmail}. Token valid for ${expirationHours} hours.`
    );

    setTimeout(() => {
      setSelectedApp(null);
      setDispatchNotice('');
    }, 2200);
  };

  const handleAcceptStudent = (app: ApplicationItem) => {
    setApplications(prev =>
      prev.map(item => (item.id === app.id ? { ...item, status: 'ACCEPTED' } : item))
    );
  };

  const handleRejectStudent = (app: ApplicationItem) => {
    setApplications(prev =>
      prev.map(item => (item.id === app.id ? { ...item, status: 'REJECTED' } : item))
    );
  };

  const filteredApps = applications.filter(app => {
    const matchesFilter = filterStatus === 'ALL' || app.status === filterStatus;
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.parentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatHoursLeft = (timestamp?: number) => {
    if (!timestamp) return 'No limit';
    const diff = timestamp - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m remaining`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
      {/* Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-gray-100 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Icons.Shield />
              <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                Admissions &amp; Exam Token Dispatcher
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-slate-100 text-slate-700 uppercase border border-slate-200">
                {adminRole.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Verify student applications, issue time-bounded exam tokens, and manage entrance interviews.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search student, tracking ID, email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 font-medium transition-all"
              />
            </div>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-600 bg-white font-medium text-gray-700 transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Verification</option>
              <option value="EXAM_SCHEDULED">Token Issued</option>
              <option value="EXAM_COMPLETED">Exam Completed</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Area (Fully Responsive with Touch Scroll) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-slate-50 border-b border-gray-200/80 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-5 min-w-[140px]">Tracking ID</th>
              <th className="py-3.5 px-5 min-w-[170px]">Applicant Student</th>
              <th className="py-3.5 px-5 min-w-[150px]">Target Grade</th>
              <th className="py-3.5 px-5 min-w-[190px]">Parent Contact</th>
              <th className="py-3.5 px-5 min-w-[180px]">Status &amp; Token Info</th>
              <th className="py-3.5 px-5 min-w-[100px]">Exam Score</th>
              <th className="py-3.5 px-5 min-w-[180px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs font-normal">
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400 font-medium">
                  No applicant records match your search or filter.
                </td>
              </tr>
            ) : (
              filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Tracking ID */}
                  <td className="py-4 px-5 align-top">
                    <div className="font-mono font-bold text-slate-800 text-xs">
                      {app.trackingId}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{app.submittedAt}</div>
                  </td>

                  {/* Applicant Student */}
                  <td className="py-4 px-5 align-top">
                    <div className="font-bold text-gray-900 text-xs">{app.studentName}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Parent: {app.parentName}</div>
                  </td>

                  {/* Target Grade */}
                  <td className="py-4 px-5 align-top">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold text-[11px] border border-slate-200/60">
                      {app.targetGrade} {app.targetStream ? `(${app.targetStream})` : ''}
                    </span>
                  </td>

                  {/* Parent Contact */}
                  <td className="py-4 px-5 align-top">
                    <div className="font-mono text-gray-700 text-[11px] truncate max-w-[180px]">{app.parentEmail}</div>
                    <div className="text-gray-400 text-[10px] mt-0.5">{app.parentPhone}</div>
                  </td>

                  {/* Status & Token */}
                  <td className="py-4 px-5 align-top space-y-1">
                    <div>
                      {app.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Pending Review
                        </span>
                      )}
                      {app.status === 'EXAM_SCHEDULED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Token Issued
                        </span>
                      )}
                      {app.status === 'EXAM_COMPLETED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                          Exam Completed
                        </span>
                      )}
                      {app.status === 'ACCEPTED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Accepted
                        </span>
                      )}
                      {app.status === 'REJECTED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Rejected
                        </span>
                      )}
                    </div>

                    {app.examToken && (
                      <div className="font-mono text-[11px] font-semibold text-slate-700">
                        Token: <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-900 border border-slate-200">{app.examToken}</span>
                      </div>
                    )}
                    {app.examTokenExpiresAt && (
                      <div className="text-[10px] text-amber-700 font-medium flex items-center gap-1">
                        <Icons.Clock />
                        {formatHoursLeft(app.examTokenExpiresAt)}
                      </div>
                    )}
                  </td>

                  {/* Exam Score */}
                  <td className="py-4 px-5 align-top">
                    {app.examScore !== undefined ? (
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                          app.examScore >= 85
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.examScore}%
                      </span>
                    ) : (
                      <span className="text-gray-400 italic text-[11px]">Not taken</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 align-top text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      {app.status === 'PENDING' && (
                        <button
                          onClick={() => handleOpenIssueModal(app)}
                          className="px-3 py-1.5 bg-[#1B365D] hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <Icons.Key /> Verify &amp; Issue Token
                        </button>
                      )}

                      {app.status === 'EXAM_SCHEDULED' && (
                        <button
                          onClick={() => handleOpenIssueModal(app)}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-md text-[10px] font-medium border border-amber-200 flex items-center gap-1 whitespace-nowrap"
                        >
                          <Icons.Refresh /> Extend Expiry
                        </button>
                      )}

                      {app.status === 'EXAM_COMPLETED' && (
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/admin/interviews?student=${encodeURIComponent(
                              app.studentName
                            )}&tracking=${app.trackingId}`}
                            className="px-2.5 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md text-[10px] font-medium flex items-center gap-1 shadow-sm whitespace-nowrap"
                          >
                            <Icons.Video /> Interview
                          </Link>
                          <button
                            onClick={() => handleAcceptStudent(app)}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-medium whitespace-nowrap"
                          >
                            Accept
                          </button>
                        </div>
                      )}

                      {app.status !== 'ACCEPTED' && app.status !== 'REJECTED' && (
                        <button
                          onClick={() => handleRejectStudent(app)}
                          className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-0.5 rounded text-[10px] font-medium transition-colors"
                        >
                          Reject
                        </button>
                      )}

                      {app.status === 'ACCEPTED' && (
                        <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                          <Icons.Check /> Enrolled
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Issue Exam Token Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150 border border-gray-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900 font-[family-name:var(--font-outfit)]">
                  Verify Application &amp; Issue Exam Token
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Applicant: <strong className="text-gray-800">{selectedApp.studentName}</strong> ({selectedApp.targetGrade})
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icons.X />
              </button>
            </div>

            {dispatchNotice ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium leading-relaxed flex items-start gap-2.5">
                <div className="p-1 bg-emerald-600 text-white rounded-full mt-0.5">
                  <Icons.Check />
                </div>
                <div>{dispatchNotice}</div>
              </div>
            ) : (
              <form onSubmit={handleIssueTokenSubmit} className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs text-gray-700">
                  <div className="font-semibold text-slate-900 text-xs">Application Details:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Tracking ID: <strong className="font-mono text-slate-800">{selectedApp.trackingId}</strong></div>
                    <div>Parent Email: <strong className="text-slate-800">{selectedApp.parentEmail}</strong></div>
                    <div>Program: <strong className="text-slate-800">{selectedApp.targetGrade} {selectedApp.targetStream && `(${selectedApp.targetStream})`}</strong></div>
                    <div>Submitted: <strong className="text-slate-800">{selectedApp.submittedAt}</strong></div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Select Exam Token Validity Duration
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[5, 10, 24, 48].map(hours => (
                      <button
                        key={hours}
                        type="button"
                        onClick={() => setExpirationHours(hours)}
                        className={`py-2.5 rounded-xl border font-semibold text-xs transition-all ${
                          expirationHours === hours
                            ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {hours >= 24 ? `${hours / 24} Day${hours > 24 ? 's' : ''}` : `${hours} Hours`}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    The exam access token will automatically expire in <strong>{expirationHours} hours</strong>.
                  </p>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-xl text-[11px] text-blue-900 border border-blue-200/60 leading-relaxed flex items-start gap-2">
                  <div className="mt-0.5"><Icons.Mail /></div>
                  <div>
                    An automated email containing the generated <strong>Exam Access Key</strong> and expiration timer will be dispatched to <strong>{selectedApp.parentEmail}</strong>.
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#1B365D] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Icons.Key /> Dispatch Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
