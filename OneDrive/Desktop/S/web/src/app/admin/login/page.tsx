'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@sis.edu.sl');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your admin credentials');
      return;
    }
    // Redirect to Admin Ratings & Audit Portal
    window.location.href = '/admin/ratings';
  };

  return (
    <main className="min-h-screen bg-[#1B365D] flex flex-col justify-between items-center p-6 text-white">
      <div className="w-full max-w-6xl flex justify-between items-center pt-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 relative bg-white rounded-lg p-1">
            <Image src="/logo.png" alt="S.I.S Crest" fill className="object-contain p-0.5" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base">Standards International School</h1>
            <p className="text-xs text-blue-200">Management Information System (MIS)</p>
          </div>
        </Link>
        <Link href="/" className="text-xs text-white/80 hover:text-white bg-white/10 px-4 py-2 rounded-lg">
          ← Public Website
        </Link>
      </div>

      <div className="w-full max-w-md bg-white text-gray-800 p-8 rounded-2xl shadow-2xl space-y-6 my-auto">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 relative bg-white rounded-xl shadow p-2 mx-auto border border-gray-200">
            <Image src="/logo.png" alt="S.I.S Logo" fill className="object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-[#1B365D]">Administrator Portal</h2>
          <p className="text-xs text-gray-500">Sign in to manage admissions, teachers, students &amp; reports</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Admin Email / Username</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sis.edu.sl"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] outline-none text-sm"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-[#1B365D] hover:bg-[#0056B3] text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wider shadow-md"
          >
            Log In to Admin Portal
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Authorized personnel only • S.I.S. MIS v1.0
        </div>
      </div>

      <div className="text-xs text-white/50 pb-4">
        &copy; {new Date().getFullYear()} Standards International School. All rights reserved.
      </div>
    </main>
  );
}
