'use client';

import React, { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: Array<'IT_ADMIN' | 'PRINCIPAL' | 'VP' | 'TEACHER' | 'STUDENT' | 'PARENT'>;
}

export interface AuthenticatedUser {
  email: string;
  role: 'IT_ADMIN' | 'PRINCIPAL' | 'VP' | 'TEACHER' | 'STUDENT' | 'PARENT';
  token: string;
  name: string;
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sis_auth_user') : null;
    if (!stored) {
      window.location.href = '/sis_gate';
      return;
    }

    try {
      const user: AuthenticatedUser = JSON.parse(stored);
      if (!user || !user.role) {
        localStorage.removeItem('sis_auth_user');
        window.location.href = '/sis_gate';
        return;
      }

      if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        const redirectUrl = user.role === 'IT_ADMIN' ? '/admin/it-hub' :
                            user.role === 'PRINCIPAL' ? '/admin/principal' :
                            user.role === 'VP' ? '/admin/vp-hub' : '/sis_gate';
        window.location.href = redirectUrl;
        return;
      }

      const timer = setTimeout(() => setIsVerified(true), 0);
      return () => clearTimeout(timer);
    } catch {
      localStorage.removeItem('sis_auth_user');
      window.location.href = '/sis_gate';
    }
  }, [allowedRoles]);

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-[#1B365D] flex flex-col justify-center items-center text-white font-sans">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest font-semibold text-blue-200">Verifying Gateway Authorization Credentials...</p>
      </div>
    );
  }

  return <>{children}</>;
}
