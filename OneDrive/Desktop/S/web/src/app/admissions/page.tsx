'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Custom SVG Icons to avoid dependency issues
const Icons = {
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Book: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>,
  GraduationCap: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
};

export default function AdmissionsPage() {
  const [step, setStep] = useState(1);
  const [trackingId, setTrackingId] = useState('');
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentName: '',
    dob: '',
    currentSchool: '',
    curriculum: '',
    gradeLevel: '',
    stream: '',
    termsAccepted: false
  });
  
  const [files, setFiles] = useState({
    birthCert: null as {name: string, size: number, progress: number} | null,
    academicResults: null as {name: string, size: number, progress: number} | null
  });

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const validateStep = (currentStep: number) => {
    switch(currentStep) {
      case 1: return formData.parentName && formData.parentEmail && formData.parentPhone;
      case 2: 
        if (!formData.studentName || !formData.dob || !formData.curriculum || !formData.gradeLevel) return false;
        if (formData.curriculum === 'WASSCE' && !formData.stream) return false;
        return true;
      case 3: return true; // Files optional for this demo
      case 4: return formData.termsAccepted;
      default: return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      // Mock submit
      const newTrackingId = 'SIS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setTrackingId(newTrackingId);
      setStep(5);
    }
  };

  const simulateUpload = (type: 'birthCert' | 'academicResults', file: File) => {
    setFiles(prev => ({
      ...prev,
      [type]: { name: file.name, size: file.size, progress: 0 }
    }));
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles(prev => ({
        ...prev,
        [type]: { ...prev[type]!, progress: Math.min(progress, 100) }
      }));
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const renderProgress = () => {
    const steps = ['Parent Info', 'Student Details', 'Documents', 'Review', 'Confirmation'];
    return (
      <div className="w-full max-w-4xl mx-auto mb-12 hidden md:block">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-[#1B365D]/20 -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-[#1B365D] to-[#0056B3] -z-10 transition-all duration-500 rounded-full"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
          {steps.map((s, i) => {
            const isCompleted = step > i + 1;
            const isActive = step === i + 1;
            return (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-semibold ${
                  isCompleted ? 'bg-[#4CAF50] border-[#4CAF50] text-white' : 
                  isActive ? 'bg-[#0056B3] border-[#0056B3] text-white' : 
                  'bg-white border-[#1B365D]/30 text-[#1B365D]/50'
                }`}>
                  {isCompleted ? <Icons.Check /> : i + 1}
                </div>
                <span className={`text-sm mt-2 font-medium ${isActive ? 'text-[#1B365D]' : 'text-gray-500'}`}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-[#1A1A2E] overflow-hidden relative">
      {/* Decorative Geometry */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00BCD4]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E91E63]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-[#0056B3]/10 rotate-45 blur-2xl" />

      {/* Header */}
      <header className="w-full p-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#1B365D]/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 relative bg-white rounded-xl shadow-md p-1 border border-[#1B365D]/20 overflow-hidden group-hover:scale-105 transition-transform">
              <Image src="/logo.png" alt="Standards International School Logo" fill className="object-contain p-1" />
            </div>
            <div>
              <h1 className="font-bold text-[#1B365D] text-lg leading-tight font-[family-name:var(--font-outfit)]">Standards International School</h1>
              <p className="text-xs text-[var(--sis-navy)] font-semibold italic">Nos Educamus Mentem</p>
            </div>
          </Link>
          <Link href="/" className="text-[#0056B3] hover:text-[#1B365D] flex items-center gap-2 text-sm font-semibold transition-colors">
            <Icons.ChevronLeft /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#1B365D] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Admissions Application
          </h2>
          <p className="text-gray-600">Join our community of excellence for the upcoming academic year.</p>
        </div>

        {renderProgress()}

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-12 transition-all duration-500 min-h-[400px]">
          {/* Step 1: Parent Information */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-[#1B365D] mb-6 border-b pb-4">Parent / Guardian Information</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.parentName}
                      onChange={(e) => updateForm('parentName', e.target.value)}
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 transition-all outline-none bg-gray-50/50" 
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.parentPhone}
                      onChange={(e) => updateForm('parentPhone', e.target.value)}
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 transition-all outline-none bg-gray-50/50" 
                      placeholder="+232 XX XXX XXX"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.parentEmail}
                    onChange={(e) => updateForm('parentEmail', e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 transition-all outline-none bg-gray-50/50" 
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Student Details */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-2xl font-bold text-[#1B365D] mb-6 border-b pb-4">Student Details</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Student Full Name</label>
                    <input type="text" value={formData.studentName} onChange={(e) => updateForm('studentName', e.target.value)} className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 transition-all outline-none bg-gray-50/50" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                    <input type="date" value={formData.dob} onChange={(e) => updateForm('dob', e.target.value)} className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 transition-all outline-none bg-gray-50/50" />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Current School (Optional)</label>
                  <input type="text" value={formData.currentSchool} onChange={(e) => updateForm('currentSchool', e.target.value)} className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 transition-all outline-none bg-gray-50/50" />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Target Curriculum</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button onClick={() => { updateForm('curriculum', 'BECE'); updateForm('stream', ''); updateForm('gradeLevel', ''); }} className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left ${formData.curriculum === 'BECE' ? 'border-[#0056B3] bg-[#0056B3]/5' : 'border-gray-200 hover:border-[#0056B3]/50'}`}>
                      <div className={`p-3 rounded-lg ${formData.curriculum === 'BECE' ? 'bg-[#0056B3] text-white' : 'bg-gray-100 text-gray-500'}`}><Icons.Book /></div>
                      <div><div className="font-bold text-[#1B365D]">BECE (JSS)</div><div className="text-xs text-gray-500">Junior Secondary School</div></div>
                    </button>
                    <button onClick={() => { updateForm('curriculum', 'WASSCE'); updateForm('gradeLevel', ''); }} className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all text-left ${formData.curriculum === 'WASSCE' ? 'border-[#0056B3] bg-[#0056B3]/5' : 'border-gray-200 hover:border-[#0056B3]/50'}`}>
                      <div className={`p-3 rounded-lg ${formData.curriculum === 'WASSCE' ? 'bg-[#0056B3] text-white' : 'bg-gray-100 text-gray-500'}`}><Icons.GraduationCap /></div>
                      <div><div className="font-bold text-[#1B365D]">WASSCE (SSS)</div><div className="text-xs text-gray-500">Senior Secondary School</div></div>
                    </button>
                  </div>
                </div>

                {formData.curriculum && (
                  <div className="animate-in fade-in duration-300">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Grade Level</label>
                    <div className="flex gap-4">
                      {['1', '2', '3'].map(lvl => (
                        <button key={lvl} onClick={() => updateForm('gradeLevel', `${formData.curriculum === 'BECE' ? 'JSS' : 'SSS'} ${lvl}`)} className={`flex-1 py-3 rounded-xl border-2 transition-all font-semibold ${formData.gradeLevel === `${formData.curriculum === 'BECE' ? 'JSS' : 'SSS'} ${lvl}` ? 'border-[#0056B3] bg-[#0056B3] text-white' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                          {formData.curriculum === 'BECE' ? 'JSS' : 'SSS'} {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {formData.curriculum === 'WASSCE' && (
                  <div className="animate-in fade-in duration-300">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Stream</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Science', 'Arts', 'Commercial'].map(stream => (
                        <button key={stream} onClick={() => updateForm('stream', stream)} className={`py-3 rounded-xl border-2 transition-all font-semibold text-sm ${formData.stream === stream ? 'border-[#0056B3] bg-[#0056B3]/5 text-[#0056B3]' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                          {stream}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-2xl font-bold text-[#1B365D] mb-6 border-b pb-4">Document Upload</h3>
              <p className="text-gray-600 mb-6">Please upload the required documents. You can also provide these later.</p>
              
              <div className="space-y-6">
                {/* Birth Cert */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#0056B3] transition-colors bg-gray-50/50">
                  <div className="mx-auto w-12 h-12 bg-[#0056B3]/10 text-[#0056B3] rounded-full flex items-center justify-center mb-4">
                    <Icons.Upload />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Birth Certificate</h4>
                  <p className="text-sm text-gray-500 mb-4">PDF, JPG or PNG (Max 5MB)</p>
                  <label className="px-6 py-2 bg-white border shadow-sm rounded-full cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium">
                    Select File
                    <input type="file" className="hidden" onChange={(e) => e.target.files && simulateUpload('birthCert', e.target.files[0])} />
                  </label>
                  
                  {files.birthCert && (
                    <div className="mt-6 text-left bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium truncate pr-4">{files.birthCert.name}</span>
                        <span className="text-gray-500">{(files.birthCert.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#4CAF50] h-2 rounded-full transition-all duration-300" style={{ width: `${files.birthCert.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Academic Results */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#0056B3] transition-colors bg-gray-50/50">
                  <div className="mx-auto w-12 h-12 bg-[#0056B3]/10 text-[#0056B3] rounded-full flex items-center justify-center mb-4">
                    <Icons.Upload />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Academic Results</h4>
                  <p className="text-sm text-gray-500 mb-4">Most recent report card or result slip</p>
                  <label className="px-6 py-2 bg-white border shadow-sm rounded-full cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium">
                    Select File
                    <input type="file" className="hidden" onChange={(e) => e.target.files && simulateUpload('academicResults', e.target.files[0])} />
                  </label>

                  {files.academicResults && (
                    <div className="mt-6 text-left bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium truncate pr-4">{files.academicResults.name}</span>
                        <span className="text-gray-500">{(files.academicResults.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#4CAF50] h-2 rounded-full transition-all duration-300" style={{ width: `${files.academicResults.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-2xl font-bold text-[#1B365D] mb-6 border-b pb-4">Review & Submit</h3>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-[#1B365D]">Parent Info</h4>
                    <button onClick={() => setStep(1)} className="text-sm text-[#0056B3] hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Name:</div><div className="font-medium">{formData.parentName}</div>
                    <div className="text-gray-500">Email:</div><div className="font-medium">{formData.parentEmail}</div>
                    <div className="text-gray-500">Phone:</div><div className="font-medium">{formData.parentPhone}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-[#1B365D]">Student Details</h4>
                    <button onClick={() => setStep(2)} className="text-sm text-[#0056B3] hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Name:</div><div className="font-medium">{formData.studentName}</div>
                    <div className="text-gray-500">DOB:</div><div className="font-medium">{formData.dob}</div>
                    <div className="text-gray-500">Program:</div><div className="font-medium">{formData.curriculum} - {formData.gradeLevel} {formData.stream && `(${formData.stream})`}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-[#1B365D]">Uploaded Documents</h4>
                    <button onClick={() => setStep(3)} className="text-sm text-[#0056B3] hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Birth Certificate:</div><div className="font-medium">{files.birthCert ? files.birthCert.name : 'Not provided'}</div>
                    <div className="text-gray-500">Academic Results:</div><div className="font-medium">{files.academicResults ? files.academicResults.name : 'Not provided'}</div>
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 bg-white border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" checked={formData.termsAccepted} onChange={(e) => updateForm('termsAccepted', e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0056B3] focus:ring-[#0056B3]" />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I confirm that all information provided is accurate and true to the best of my knowledge. I understand that any false information may lead to the cancellation of this application.
                </span>
              </label>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center animate-in zoom-in-95 duration-700 py-8">
              <div className="w-24 h-24 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center text-white">
                  <Icons.Check />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Application Submitted for Administrative Review</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                Your application for <strong>{formData.studentName || 'Student'}</strong> ({formData.curriculum} - {formData.gradeLevel}) has been submitted successfully. A confirmation receipt has been sent to <strong>{formData.parentEmail}</strong>.
              </p>
              
              <div className="bg-gradient-to-br from-[#1B365D] to-[#0056B3] rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden text-left space-y-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="text-center">
                  <p className="text-xs text-blue-200 mb-1 font-semibold uppercase tracking-wider">Official Application Tracking ID</p>
                  <div className="text-3xl font-bold tracking-widest font-mono text-[#FFCC00] mb-2">{trackingId}</div>
                </div>

                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 space-y-2 text-xs leading-relaxed">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>📋</span> Next Step: School Verification &amp; Exam Token Dispatch
                  </div>
                  <p className="text-blue-100">
                    1. The School Administration (Principal, Vice Principal, or IT Manager) will verify the submitted student details &amp; documents.
                  </p>
                  <p className="text-blue-100">
                    2. Upon verification, an official <strong>Exam Access Token</strong> with a specified time limit (e.g. 5h, 24h, or 48h) will be sent to your email (<strong>{formData.parentEmail}</strong>).
                  </p>
                  <p className="text-blue-100">
                    3. The student will use their <strong>Tracking ID</strong> and <strong>Exam Token</strong> to log into the Exam Portal before expiration.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="px-8 py-4 bg-[#1B365D] text-white font-bold rounded-xl shadow-md hover:bg-[#0056B3] transition-all transform hover:-translate-y-0.5">
                  Return to Homepage
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          {step < 5 && (
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
              {step > 1 ? (
                <button onClick={handleBack} className="px-6 py-3 text-[#1B365D] font-semibold hover:bg-gray-100 rounded-xl transition-colors">
                  Back
                </button>
              ) : <div></div>}
              
              {step < 4 ? (
                <button 
                  onClick={handleNext} 
                  disabled={!validateStep(step)}
                  className="px-8 py-3 bg-[#1B365D] text-white font-semibold rounded-xl hover:bg-[#0056B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Next Step
                </button>
              ) : (
                <button 
                  onClick={handleSubmit} 
                  disabled={!validateStep(step)}
                  className="px-8 py-3 bg-[#0056B3] text-white font-bold rounded-xl hover:bg-[#1B365D] hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
                >
                  Submit Application
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
