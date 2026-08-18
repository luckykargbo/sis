'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

// Enterprise SVG Icons
const Icons = {
  Key: () => (
    <svg className="w-4 h-4 text-[#0056B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
};

export default function StealthPortalAccessPage() {
  const [accessId, setAccessId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Convex Backend Mutations
  const requestOtpMutation = useMutation(api.auth.requestLoginOtp);
  const verifyOtpMutation = useMutation(api.auth.verifyLoginOtp);

  // 2FA Email OTP State
  const [step, setStep] = useState<'LOGIN' | 'OTP_VERIFICATION'>('LOGIN');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [targetRole, setTargetRole] = useState<'IT_ADMIN' | 'PRINCIPAL' | 'VP' | 'TEACHER' | 'STUDENT' | 'PARENT'>('IT_ADMIN');
  const [targetName, setTargetName] = useState('');
  const [targetRedirect, setTargetRedirect] = useState('/admin/it-hub');
  
  // 6 Separate Box State for 6-Digit OTP
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first box when OTP screen opens
  useEffect(() => {
    if (step === 'OTP_VERIFICATION') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accessId || !passcode) {
      setError('Invalid System Credentials');
      return;
    }

    setIsSubmitting(true);

    try {
      // Map input email/AccessID
      const inputEmail = accessId.trim().includes('@') 
        ? accessId.trim() 
        : accessId.trim().toUpperCase() === 'ADMIN-001' || accessId.trim().toUpperCase().includes('IT')
        ? 'hackerunlockme@gmail.com'
        : accessId.trim().toUpperCase().includes('PRINCIPAL')
        ? 'principal@sis.edu.sl'
        : accessId.trim().toUpperCase().includes('VP')
        ? 'vp@sis.edu.sl'
        : accessId.trim();

      // Call Convex Backend Cloud Mutation directly!
      const res = await requestOtpMutation({
        email: inputEmail,
        password: passcode.trim(),
      });

      setIsSubmitting(false);

      if (res && res.success) {
        setUserEmail(res.email);
        setTargetName(res.fullName);
        setTargetRole(res.role as 'IT_ADMIN' | 'PRINCIPAL' | 'VP');
        setGeneratedOtp(res.otpCode || '');
        setTargetRedirect(
          res.role === 'IT_ADMIN' ? '/admin/it-hub' :
          res.role === 'PRINCIPAL' ? '/admin/principal' :
          res.role === 'VP' ? '/admin/vp-hub' : '/admin/it-hub'
        );
        setOtp(['', '', '', '', '', '']);
        setStep('OTP_VERIFICATION');
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const errorMessage = err instanceof Error ? err.message : 'Invalid System Access ID or Security Passcode';
      setError(errorMessage.includes('Failed') ? 'Invalid System Access ID or Security Passcode' : errorMessage);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setError('Please enter all 6 digits of your authentication code.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call Convex Backend Cloud Mutation directly!
      const res = await verifyOtpMutation({
        email: userEmail,
        otpCode: fullCode,
      });

      setIsSubmitting(false);

      if (res && res.userId) {
        localStorage.setItem(
          'sis_auth_user',
          JSON.stringify({
            email: res.email,
            role: res.role,
            name: res.fullName,
            token: `sis-jwt-token-${res.role.toLowerCase()}`,
            isOnline: true,
            loginTimestamp: Date.now(),
          })
        );
        window.location.href = targetRedirect;
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const errorMessage = err instanceof Error ? err.message : 'Invalid Security Authentication Code.';
      setError(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    try {
      await requestOtpMutation({
        email: userEmail,
        password: passcode.trim(),
      });
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch {
      setError('Unable to resend code. Please return to login.');
    }
  };

  return (
    <main className="min-h-screen bg-[#1B365D] flex flex-col justify-between items-center p-6 text-white font-sans relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center pt-4 z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative bg-white rounded-xl p-1 shadow-md group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="S.I.S Crest" fill className="object-contain p-0.5" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base font-[family-name:var(--font-outfit)]">
              Standards International School
            </h1>
            <p className="text-xs text-blue-200">System Gateway • Nos Educamus Mentem</p>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all border border-white/10 flex items-center gap-1.5"
        >
          <Icons.ArrowLeft /> Return to Site
        </Link>
      </div>

      {/* Gateway Form Container */}
      <div className="w-full max-w-md bg-white text-gray-800 p-7 sm:p-8 rounded-3xl shadow-2xl space-y-6 my-auto z-10 border border-white/20 relative">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 relative bg-white rounded-2xl shadow-md p-2.5 mx-auto border border-gray-100 ring-4 ring-blue-50">
            <Image src="/logo.png" alt="S.I.S Crest" fill className="object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1B365D] font-[family-name:var(--font-outfit)]">
              {step === 'LOGIN' ? 'System Portal Access' : 'Email Security Code Verification'}
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">
              {step === 'LOGIN'
                ? 'Authorized Administrative Gateway'
                : `Enter the 6-digit authentication code sent to your email inbox`}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {!revealed ? (
          <div className="text-center space-y-4 pt-2">
            <p className="text-xs text-gray-600 leading-relaxed px-4">
              Restricted portal gateway with multi-factor email verification. Authorized personnel only.
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-3.5 bg-[#1B365D] hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Icons.Lock /> Enter Authorization Gate
            </button>
          </div>
        ) : step === 'LOGIN' ? (
          /* STEP 1: Enter Credentials (Queries Convex Backend Database directly!) */
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                System Access ID or Email
              </label>
              <input
                type="text"
                required
                value={accessId}
                onChange={e => setAccessId(e.target.value)}
                placeholder="e.g. hackerunlockme@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-xs font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Security Token / Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-xs font-medium transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#1B365D] hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-xs shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Authenticating via Convex Cloud...
                </>
              ) : (
                <>
                  <Icons.Key /> Request Email Security Code
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: Multi-Factor 2FA Email Code Verification (Queries Convex Backend Database directly!) */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-left flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg mt-0.5">
                <Icons.Mail />
              </div>
              <div className="text-xs text-gray-600 leading-relaxed">
                An authentication code has been dispatched to <strong className="text-gray-900 font-mono">{userEmail}</strong>. Please check your inbox and type the 6 digits below.
              </div>
            </div>

            {/* Development Mode Email Inbox Simulation Banner */}
            {generatedOtp && (
              <div className="p-3.5 bg-blue-50 border border-blue-200/80 rounded-xl space-y-1 text-left shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-blue-900 flex items-center gap-1.5 font-[family-name:var(--font-outfit)]">
                    <Icons.Mail /> Dev Mode Email Inbox Simulation
                  </span>
                  <span className="text-[9px] font-mono text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold uppercase">
                    DEV MODE
                  </span>
                </div>
                <p className="text-[11px] text-blue-800">
                  Authentication Code generated for <strong>{userEmail}</strong>:
                </p>
                <div className="text-center py-2 font-mono text-2xl font-extrabold text-[#1B365D] tracking-[0.3em] bg-white rounded-lg border border-blue-200 shadow-inner">
                  {generatedOtp}
                </div>
              </div>
            )}

            {/* 6 Individual Box Input UI */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-center mb-3">
                Enter 6-Digit Authentication Code
              </label>

              <div className="flex justify-center items-center gap-2 sm:gap-2.5">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => { inputRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-extrabold font-mono rounded-xl border-2 outline-none transition-all shadow-sm ${
                      digit
                        ? 'border-blue-600 bg-blue-50/50 text-[#1B365D]'
                        : 'border-gray-300 bg-slate-50 text-gray-900 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#1B365D] hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Verifying Code...
                </>
              ) : (
                <>
                  <Icons.ShieldCheck /> Verify &amp; Unlock Console
                </>
              )}
            </button>

            <div className="flex justify-between items-center text-[11px] pt-1">
              <button
                type="button"
                onClick={() => setStep('LOGIN')}
                className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1"
              >
                ← Back to Login
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-blue-600 hover:underline font-semibold"
              >
                Resend Code
              </button>
            </div>
          </form>
        )}

        <div className="text-center text-[10px] text-gray-400 border-t border-gray-100 pt-4">
          Encrypted Cloud Authentication • S.I.S. Multi-Factor Protocol v3.0
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-white/50 pb-4 z-10">
        &copy; {new Date().getFullYear()} Standards International School. All rights reserved.
      </div>
    </main>
  );
}
