'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAFBFD]">
      {/* Header */}
      <header className="w-full bg-[#1B365D] text-white p-5 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative bg-white rounded-lg p-1 overflow-hidden">
              <Image src="/logo.png" alt="S.I.S. Logo" fill className="object-contain p-0.5" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">Standards International School</h1>
              <p className="text-xs text-blue-200 italic">Nos Educamus Mentem</p>
            </div>
          </Link>
          <Link href="/" className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1B365D] to-[#0056B3] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">Contact Us</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get in Touch with S.I.S.</h2>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
            We are here to answer your questions regarding admissions, academic programs, fee structures, and campus visits.
          </p>
        </div>
      </section>

      {/* Contact Form & Information */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-[#0056B3] uppercase tracking-wider mb-1">Admissions &amp; General Enquiries</div>
              <h3 className="text-xl font-bold text-[#1B365D] mb-4">Phone Numbers</h3>
              <p className="text-sm text-gray-600 mb-2">Main Office: <a href="tel:+23276000000" className="font-semibold text-[#0056B3] hover:underline">+232 76 000 000</a></p>
              <p className="text-sm text-gray-600">Admissions Desk: <a href="tel:+23230000000" className="font-semibold text-[#0056B3] hover:underline">+232 30 000 000</a></p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-[#0056B3] uppercase tracking-wider mb-1">Email Correspondence</div>
              <h3 className="text-xl font-bold text-[#1B365D] mb-4">Official Email Addresses</h3>
              <p className="text-sm text-gray-600 mb-2">Admissions: <a href="mailto:admissions@sis.edu.sl" className="font-semibold text-[#0056B3] hover:underline">admissions@sis.edu.sl</a></p>
              <p className="text-sm text-gray-600">General Enquiries: <a href="mailto:info@sis.edu.sl" className="font-semibold text-[#0056B3] hover:underline">info@sis.edu.sl</a></p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-[#0056B3] uppercase tracking-wider mb-1">School Physical Address</div>
              <h3 className="text-xl font-bold text-[#1B365D] mb-2">Location</h3>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                123 Education Boulevard,<br />
                Freetown, Sierra Leone
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                Opening Hours: Mon - Fri (8:00 AM - 4:00 PM)
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-[#1B365D] mb-2">Send Us an Direct Message</h3>
            <p className="text-sm text-gray-500 mb-8">Please fill in your details below and our team will respond within 24 hours.</p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                <h4 className="font-bold text-xl">Message Sent Successfully!</h4>
                <p className="text-sm text-emerald-700">Thank you for reaching out to Standards International School. Our administrative office will contact you via email or phone shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#1B365D] text-white font-semibold text-xs rounded-lg uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Mariama Sesay" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email} 
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="mariama@example.com" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={form.phone} 
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+232 76 000 000" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Inquiry Category</label>
                    <select 
                      value={form.subject} 
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none text-sm bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Admissions & Entrance Exam">Admissions &amp; Entrance Exam</option>
                      <option value="Fees & Scholarships">Fees &amp; Scholarships</option>
                      <option value="Academic Curriculum">Academic Curriculum</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Message *</label>
                  <textarea 
                    required 
                    rows={5} 
                    value={form.message} 
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your question or message here..." 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none text-sm"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#1B365D] hover:bg-[#0056B3] text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wider shadow-md"
                >
                  Submit Contact Form
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
