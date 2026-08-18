'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TeacherAnalytics {
  id: string;
  name: string;
  subject: string;
  clarity: number;
  punctuality: number;
  helpfulness: number;
  overall: number;
  ratingsCount: number;
  syllabusCoverage: number;
}

const MOCK_TEACHERS: TeacherAnalytics[] = [
  { id: 'TEA-001', name: 'Mr. A. Kamara', subject: 'Integrated Science', clarity: 4.8, punctuality: 4.9, helpfulness: 4.7, overall: 4.8, ratingsCount: 34, syllabusCoverage: 88 },
  { id: 'TEA-002', name: 'Mrs. F. Sesay', subject: 'General Mathematics', clarity: 4.6, punctuality: 4.8, helpfulness: 4.5, overall: 4.6, ratingsCount: 29, syllabusCoverage: 92 },
  { id: 'TEA-003', name: 'Mr. J. Turay', subject: 'English Literature', clarity: 4.4, punctuality: 4.2, helpfulness: 4.6, overall: 4.4, ratingsCount: 22, syllabusCoverage: 80 },
  { id: 'TEA-004', name: 'Mr. S. Koroma', subject: 'Basic Technology', clarity: 4.7, punctuality: 4.6, helpfulness: 4.8, overall: 4.7, ratingsCount: 19, syllabusCoverage: 85 },
];

export default function AdminRatingsDashboard() {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherAnalytics>(MOCK_TEACHERS[0]);

  return (
    <main className="min-h-screen bg-[#FAFBFD]">
      {/* Header */}
      <header className="bg-[#1B365D] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative bg-white rounded-lg p-1 overflow-hidden">
              <Image src="/logo.png" alt="S.I.S Logo" fill className="object-contain p-0.5" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">Standards International School</h1>
              <p className="text-xs text-blue-200">VP &amp; Principal Evaluation Portal</p>
            </div>
          </Link>
          <div className="flex gap-3">
            <Link href="/admin/interviews" className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Interview Queue
            </Link>
            <Link href="/" className="text-xs font-semibold bg-white text-[#1B365D] px-4 py-2 rounded-lg transition-colors">
              Exit Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1B365D] to-[#0056B3] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">Executive Analytics</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2">Teacher Ratings &amp; Verification Audit</h2>
            <p className="text-white/80 text-sm mt-1">Anonymous student feedback metrics, teaching compliance, and syllabus progress.</p>
          </div>
          <button 
            onClick={() => alert('PDF Audit Report generated and downloaded for Principal review.')}
            className="bg-white text-[#1B365D] font-bold text-xs px-6 py-3 rounded-lg hover:bg-blue-50 shadow-md transition-all uppercase tracking-wider"
          >
            Export Audit Report (PDF)
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
        {/* Left Column: Teacher Roster List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">Faculty Performance Roster</h3>

          {MOCK_TEACHERS.map((t) => {
            const isSelected = selectedTeacher.id === t.id;
            return (
              <div 
                key={t.id}
                onClick={() => setSelectedTeacher(t)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-white border-[#0056B3] shadow-md ring-2 ring-[#0056B3]/20' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-[#1B365D] text-base">{t.name}</h4>
                  <span className="bg-[#0056B3]/10 text-[#0056B3] text-xs font-bold px-3 py-1 rounded-full">{t.overall} ⭐</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{t.subject} • {t.ratingsCount} Student Ratings</p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>Syllabus Coverage</span>
                    <span className="font-bold text-[#1B365D]">{t.syllabusCoverage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#0056B3] h-2 rounded-full" style={{ width: `${t.syllabusCoverage}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Teacher Deep-Dive */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-[#0056B3] uppercase tracking-wider">{selectedTeacher.id}</span>
                <h3 className="text-2xl font-bold text-[#1B365D]">{selectedTeacher.name}</h3>
                <p className="text-sm text-gray-500">{selectedTeacher.subject}</p>
              </div>
              <div className="text-center bg-[#FAFBFD] p-4 rounded-xl border border-gray-200">
                <div className="text-3xl font-extrabold text-[#1B365D]">{selectedTeacher.overall}</div>
                <div className="text-xs text-gray-500 font-medium">Overall Rating</div>
              </div>
            </div>

            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Core Metric Breakdown (1 to 5 Scale)</h4>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#FAFBFD] p-4 rounded-xl border border-gray-100 text-center">
                <div className="text-xl font-bold text-[#0056B3]">{selectedTeacher.clarity} ⭐</div>
                <div className="text-xs text-gray-500 font-medium mt-1">Clarity</div>
              </div>
              <div className="bg-[#FAFBFD] p-4 rounded-xl border border-gray-100 text-center">
                <div className="text-xl font-bold text-[#1B365D]">{selectedTeacher.punctuality} ⭐</div>
                <div className="text-xs text-gray-500 font-medium mt-1">Punctuality</div>
              </div>
              <div className="bg-[#FAFBFD] p-4 rounded-xl border border-gray-100 text-center">
                <div className="text-xl font-bold text-[#0056B3]">{selectedTeacher.helpfulness} ⭐</div>
                <div className="text-xs text-gray-500 font-medium mt-1">Helpfulness</div>
              </div>
            </div>

            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Recent Anonymous Student Feedback</h4>

            <div className="space-y-3">
              <div className="bg-[#FAFBFD] p-4 rounded-xl border border-gray-200 text-xs text-gray-700 italic">
                &quot;Mr. Kamara explains complex chemistry equations using practical lab demonstrations which makes it very easy to understand.&quot;
              </div>
              <div className="bg-[#FAFBFD] p-4 rounded-xl border border-gray-200 text-xs text-gray-700 italic">
                &quot;Always punctual for period 1 and gives extra revision questions before quizzes.&quot;
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
