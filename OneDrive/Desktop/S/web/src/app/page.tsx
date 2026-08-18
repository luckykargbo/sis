'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ── Professional SVG Icon Components ── */
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);
const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="6" y1="8" x2="18" y2="8"/></svg>
);
const FlowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3H15"/><circle cx="12" cy="12" r="3"/><path d="M12 22v-6"/></svg>
);
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2"/></svg>
);
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
);
const WifiOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 12.86a10 10 0 0 1 5.17-2.94"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

/* ── Program Data Schema ── */
interface ProgramDetails {
  name: string;
  track: string;
  shortDesc: string;
  fullOverview: string;
  subjects: string[];
  features: string[];
  duration: string;
}

const PROGRAM_DETAILS: ProgramDetails[] = [
  {
    name: 'JSS 1',
    track: 'BECE Track',
    shortDesc: 'Foundational junior secondary education building essential skills and core knowledge base.',
    fullOverview: 'The JSS 1 curriculum introduces students to the foundational concepts across core sciences, mathematics, humanities, and practical arts. Designed to ease the transition from primary to secondary school while building study discipline.',
    subjects: ['General Mathematics', 'English Language & Literature', 'Integrated Science', 'Social Studies', 'Basic Technology', 'Information Communication Technology (ICT)', 'French / Local Language', 'Business Studies'],
    features: ['Foundation in analytical thinking & problem solving', 'Weekly ICT laboratory practicals', 'Continuous assessment & diagnostic testing', 'Structured extracurricular & leadership clubs'],
    duration: '3 Terms (1 Academic Year)'
  },
  {
    name: 'JSS 2',
    track: 'BECE Track',
    shortDesc: 'Intermediate junior secondary level focusing on academic exploration and core competencies.',
    fullOverview: 'JSS 2 expands on the core foundations by introducing intermediate problem-solving techniques, scientific experiments, critical essay writing, and early career orientation.',
    subjects: ['Core Mathematics', 'English Language', 'Basic Science & Technology', 'Social & Civic Education', 'Business Studies', 'Computer Studies / Coding Basics', 'Home Economics / Agricultural Science', 'Physical & Health Education'],
    features: ['Intermediate lab experiments in science & computing', 'BECE early format familiarity quizzes', 'Group research projects & presentation skills', 'Debating society & public speaking orientation'],
    duration: '3 Terms (1 Academic Year)'
  },
  {
    name: 'JSS 3',
    track: 'BECE Track',
    shortDesc: 'Final junior secondary year with intensive BECE preparation and mock examinations.',
    fullOverview: 'JSS 3 is the culmination of junior secondary education, focused heavily on BECE (Basic Education Certificate Examination) mastery through past-paper workshops, mock exams, and personalized academic counseling for senior track selection.',
    subjects: ['BECE Mathematics', 'BECE English Language', 'BECE Integrated Science', 'BECE Social Studies', 'BECE Basic Technology', 'BECE ICT & Computer Applications', 'BECE French / Religious Studies', 'BECE Business Studies'],
    features: ['Intensive BECE mock examination series', 'Subject-by-subject weakness remediation', 'Personalized stream selection guidance (Science, Arts, Commercial)', 'BECE registration & official exam portal management'],
    duration: '3 Terms (BECE Examination Year)'
  },
  {
    name: 'SSS 1',
    track: 'Science · Arts · Commercial',
    shortDesc: 'Introductory senior secondary covering specialised streams: Science, Arts, and Commercial.',
    fullOverview: 'SSS 1 marks the beginning of specialized senior secondary education. Students enroll into their chosen academic stream (Science, Arts, or Commercial) and start building advanced subject mastery for WASSCE.',
    subjects: ['Stream Core: Physics, Chemistry, Biology, Further Math (Science)', 'Stream Core: Literature-in-English, Government, History, Christian Studies (Arts)', 'Stream Core: Financial Accounting, Commerce, Economics, Office Practice (Commercial)', 'General Mandatory: Core Mathematics, General English, Civics, Data Processing'],
    features: ['Dedicated specialized laboratories for Physics, Chemistry & Biology', 'Business simulation workshops for Commercial students', 'Literary & dramatic arts symposiums for Arts stream', 'WASSCE syllabus mapping from Year 1'],
    duration: '3 Terms (1 Academic Year)'
  },
  {
    name: 'SSS 2',
    track: 'Science · Arts · Commercial',
    shortDesc: 'Advanced senior secondary studies with stream-focused curriculum and practical work.',
    fullOverview: 'SSS 2 deepens theoretical knowledge and practical application across all streams. Practical lab sessions, case studies, field trips, and rigorous termly assessments prepare students for final-year WASSCE preparation.',
    subjects: ['Advanced Physics & Organic Chemistry (Science)', 'Advanced Literature & West African History (Arts)', 'Cost Accounting & Financial Management (Commercial)', 'Advanced Core Mathematics & English Paper 1 & 2 Prep'],
    features: ['Practical laboratory WAEC syllabus practicals', 'Inter-school academic debates and science fairs', 'Targeted tutorial groups based on quarterly performance', 'Career counseling & university admission seminars'],
    duration: '3 Terms (1 Academic Year)'
  },
  {
    name: 'SSS 3',
    track: 'WASSCE Preparation',
    shortDesc: 'Final year rigorous WASSCE preparation with intensive revision and mock exams.',
    fullOverview: 'SSS 3 is the final stretch towards West African Senior School Certificate Examination (WASSCE) success. Features comprehensive syllabus completion, daily past-question drills, mock WASSCE exams, and practical exam bootcamps.',
    subjects: ['Full WASSCE Science Stream Curriculum', 'Full WASSCE Arts Stream Curriculum', 'Full WASSCE Commercial Stream Curriculum', 'WASSCE Practical Science & Alternative to Practical Papers'],
    features: ['Full-scale WASSCE Mock Examination series', 'One-on-one subject tutor mentoring', 'WAEC exam strategy & time management drills', 'Direct university & tertiary placement assistance'],
    duration: '3 Terms (WASSCE Examination Year)'
  }
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetails | null>(null);

  /* Contact Form State */
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'General Inquiry',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', phone: '', program: 'General Inquiry', message: '' });
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ─── 1. NAVIGATION BAR ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1B365D]/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-white rounded-lg p-1 overflow-hidden shadow-sm">
              <Image src="/logo.png" alt="S.I.S Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="text-lg font-bold text-white hidden sm:block tracking-tight">Standards International School</span>
            <span className="text-lg font-bold text-white sm:hidden">S.I.S.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-white transition-colors text-sm font-medium">Home</Link>
            <Link href="#about" className="text-white/90 hover:text-white transition-colors text-sm font-medium">About</Link>
            <Link href="#programs" className="text-white/90 hover:text-white transition-colors text-sm font-medium">Programs</Link>
            <Link href="#contact" className="text-white/90 hover:text-white transition-colors text-sm font-medium">Contact Us</Link>
            <Link href="/admissions" className="bg-white text-[#1B365D] font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-all text-sm">Apply Now</Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1B365D] pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-center">
            <Link href="/" className="text-xl text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="#about" className="text-xl text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="#programs" className="text-xl text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Programs</Link>
            <Link href="#contact" className="text-xl text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            <Link href="/admissions" className="bg-white text-[#1B365D] font-semibold py-3 px-6 rounded-lg mt-4 inline-block" onClick={() => setIsMobileMenuOpen(false)}>Apply Now</Link>
          </div>
        </div>
      )}

      {/* ─── 2. WELCOME / HERO SECTION ─── */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/building1.jpg" alt="Standards International School Building" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B365D]/90 via-[#1B365D]/60 to-black/30"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-left text-white space-y-6">
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-semibold tracking-[0.15em] uppercase">
              <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
              Admissions Open — 2026/2027 Academic Year
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Welcome to <br/>
              <span className="text-blue-200">Standards International</span> School
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
              A distinguished academic institution dedicated to shaping future leaders through rigorous BECE and WASSCE preparatory programs, grounded in faith, discipline, and intellectual excellence.
            </p>

            <p className="text-sm text-blue-200/90 italic font-medium">&quot;Nos Educamus Mentem&quot; — We Educate the Mind</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/admissions" className="bg-white text-[#1B365D] font-bold py-3.5 px-8 rounded-lg hover:bg-blue-50 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm text-center">
                Apply for Admission
              </Link>
              <Link href="#programs" className="border-2 border-white/40 text-white font-semibold py-3.5 px-8 rounded-lg hover:bg-white/15 transition-all text-sm text-center">
                View Programs
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-2xl p-5 shadow-2xl border border-white/20 hover:scale-[1.02] transition-transform duration-500">
              <Image src="/logo.png" alt="Standards International School Official Crest" fill className="object-contain p-3" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT OUR SCHOOL ─── */}
      <section id="about" className="py-20 bg-[#FAFBFD]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B365D] tracking-tight">About Our School</h2>
            <div className="h-1 w-16 bg-[#0056B3] mt-4 mb-5 rounded-full mx-auto"></div>
            <p className="text-[#6B7280] leading-relaxed">
              At Standards International School (S.I.S.), our motto <span className="font-semibold text-[#1B365D]">&quot;Nos Educamus Mentem&quot;</span> (&quot;We Educate the Mind&quot;) defines our commitment to developing the whole child — intellectually, morally, and personally.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            <div className="bg-white rounded-xl p-6 border border-[#E8E8E8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-[#0056B3]/10 flex items-center justify-center text-[#0056B3] mb-4">
                <BookIcon />
              </div>
              <h4 className="font-bold text-lg text-[#1B365D] mb-2">Academic Excellence</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">Symbolised by the Open Book in our crest, representing continuous learning and mastery in BECE and WASSCE curricula.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#E8E8E8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-[#1B365D]/10 flex items-center justify-center text-[#1B365D] mb-4">
                <CrossIcon />
              </div>
              <h4 className="font-bold text-lg text-[#1B365D] mb-2">Faith &amp; Character</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">The Cross in our crest embodies moral integrity, spiritual strength, and the ethical citizenship we instill in every student.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#E8E8E8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-[#0056B3]/10 flex items-center justify-center text-[#0056B3] mb-4">
                <FlowerIcon />
              </div>
              <h4 className="font-bold text-lg text-[#1B365D] mb-2">Personal Growth</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">The Rose represents our nurturing environment where every student develops into a confident, compassionate leader.</p>
            </div>
          </div>

          {/* School Building Gallery */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="relative h-[340px] rounded-xl overflow-hidden group border border-[#E8E8E8]">
              <Image src="/building1.jpg" alt="Standards International School Main Building" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1B365D]/90 to-transparent p-6">
                <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Main School Building</span>
                <h3 className="text-lg font-bold text-white mt-1">Standards International School</h3>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-6">
              <div className="relative h-[160px] rounded-xl overflow-hidden group border border-[#E8E8E8]">
                <Image src="/building2.jpg" alt="S.I.S. School Building Architecture" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1B365D]/90 to-transparent p-4">
                  <p className="text-xs font-bold text-white">Modern Learning Facilities</p>
                </div>
              </div>
              <div className="relative h-[160px] rounded-xl overflow-hidden group border border-[#E8E8E8]">
                <Image src="/campus.jpg" alt="S.I.S. School Environment" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1B365D]/90 to-transparent p-4">
                  <p className="text-xs font-bold text-white">School Environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. ACADEMIC PROGRAMS ─── */}
      <section id="programs" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B365D] tracking-tight">Academic Programs</h2>
            <div className="h-1 w-16 bg-[#0056B3] mt-4 mb-5 rounded-full mx-auto"></div>
            <p className="text-[#6B7280] leading-relaxed">
              Comprehensive educational pathways designed to prepare students for academic excellence in BECE and WASSCE examinations. Click <span className="font-semibold text-[#0056B3]">&quot;Learn more&quot;</span> on any program to view curriculum details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM_DETAILS.map((program, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProgram(program)}
                className="bg-white rounded-xl p-6 border border-[#E8E8E8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B365D] to-[#0056B3]"></div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold text-[#1B365D]">{program.name}</h3>
                    <span className="bg-[#0056B3]/10 text-[#0056B3] text-xs font-bold px-3 py-1 rounded-full">{program.track}</span>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">{program.shortDesc}</p>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedProgram(program); }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#FAFBFD] border border-[#0056B3]/20 text-[#0056B3] font-semibold text-sm group-hover:bg-[#0056B3] group-hover:text-white transition-all flex items-center justify-between"
                >
                  <span>Learn more about {program.name}</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROGRAM DETAILS MODAL ─── */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 md:p-8 relative">
            <button 
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#0056B3]/10 text-[#0056B3] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{selectedProgram.track}</span>
              <span className="text-xs text-gray-500 font-medium">{selectedProgram.duration}</span>
            </div>

            <h3 className="text-3xl font-extrabold text-[#1B365D] mb-4">{selectedProgram.name} Academic Program</h3>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">{selectedProgram.fullOverview}</p>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#1B365D] text-base mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#0056B3] rounded-full"></span>
                  Subjects &amp; Curriculum
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProgram.subjects.map((sub, i) => (
                    <div key={i} className="bg-[#FAFBFD] p-3 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 flex items-center gap-2">
                      <span className="text-[#0056B3]">✓</span> {sub}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#1B365D] text-base mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#0056B3] rounded-full"></span>
                  Key Features &amp; Preparation
                </h4>
                <ul className="space-y-2">
                  {selectedProgram.features.map((feat, i) => (
                    <li key={i} className="text-xs md:text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-[#0056B3] font-bold mt-0.5">•</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
              <button 
                onClick={() => setSelectedProgram(null)}
                className="py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <Link 
                href="/admissions"
                className="py-3 px-6 rounded-lg bg-[#1B365D] hover:bg-[#0056B3] text-white font-bold text-sm transition-colors text-center"
              >
                Apply for {selectedProgram.name}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. WHY CHOOSE S.I.S. ─── */}
      <section className="py-20 bg-[#1B365D] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0056B3]/30 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Why Choose Standards International School</h2>
            <div className="h-1 w-16 bg-blue-300 mt-4 mb-5 rounded-full mx-auto"></div>
            <p className="text-white/70 leading-relaxed">
              We combine modern technology with pedagogical excellence to deliver a distinguished educational experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <BrainIcon />, title: 'AI-Powered Learning Engine', desc: 'Our adaptive BECE and WASSCE practice engine analyzes student responses to deliver tailored revision questions and subject strength diagnostics.' },
              { icon: <BellIcon />, title: 'Real-Time Parent Portal', desc: 'Parents receive instant updates on attendance, quarterly grades, and behavioral development directly on their mobile application.' },
              { icon: <VideoIcon />, title: 'Virtual Classroom Integration', desc: 'High-definition WebRTC live interactive classes guarantee uninterrupted learning during revision periods or remote study sessions.' },
              { icon: <WifiOffIcon />, title: 'Offline Study Sync', desc: 'Study notes, assignment guides, and past examination papers are accessible offline on student devices for continuous offline learning.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:bg-white/10 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center text-blue-200 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. DEDICATED CONTACT US SECTION ─── */}
      <section id="contact" className="py-24 bg-[#FAFBFD] relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0056B3] text-xs font-extrabold uppercase tracking-widest bg-[#0056B3]/10 px-4 py-1.5 rounded-full">Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B365D] tracking-tight mt-3">Contact Our School</h2>
            <div className="h-1 w-16 bg-[#0056B3] mt-4 mb-5 rounded-full mx-auto"></div>
            <p className="text-[#6B7280] leading-relaxed">
              Have questions about admissions, academic programs, or school visits? Reach out to our administrative team directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#1B365D] text-white flex items-center justify-center flex-shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <h4 className="font-bold text-[#1B365D] text-base">Phone &amp; WhatsApp</h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-2">Speak directly with our Admissions Desk</p>
                  <a href="tel:+23276000000" className="text-sm font-semibold text-[#0056B3] hover:underline block">+232 76 000 000</a>
                  <a href="tel:+23230000000" className="text-sm font-semibold text-[#0056B3] hover:underline block">+232 30 000 000</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#0056B3] text-white flex items-center justify-center flex-shrink-0">
                  <MailIcon />
                </div>
                <div>
                  <h4 className="font-bold text-[#1B365D] text-base">Email Enquiries</h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-2">Send us an email anytime</p>
                  <a href="mailto:admissions@sis.edu.sl" className="text-sm font-semibold text-[#0056B3] hover:underline block">admissions@sis.edu.sl</a>
                  <a href="mailto:info@sis.edu.sl" className="text-sm font-semibold text-[#0056B3] hover:underline block">info@sis.edu.sl</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#1B365D] text-white flex items-center justify-center flex-shrink-0">
                  <MapPinIcon />
                </div>
                <div>
                  <h4 className="font-bold text-[#1B365D] text-base">School Location</h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-1">Visit our administrative office</p>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">
                    123 Education Boulevard,<br />
                    Freetown, Sierra Leone
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#0056B3] text-white flex items-center justify-center flex-shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <h4 className="font-bold text-[#1B365D] text-base">Office Hours</h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-1">Monday – Friday: 8:00 AM – 4:00 PM</p>
                  <p className="text-xs text-gray-500">Saturday: 9:00 AM – 1:00 PM (By appointment)</p>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-[#E8E8E8] shadow-lg">
              <h3 className="text-2xl font-bold text-[#1B365D] mb-2">Send Us a Message</h3>
              <p className="text-sm text-gray-500 mb-8">Fill out the form below and our administrative office will get back to you within 24 hours.</p>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-2 animate-fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                  <h4 className="font-bold text-lg">Thank You for Reaching Out!</h4>
                  <p className="text-sm text-emerald-700">Your message has been received successfully. Our admissions counselor will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. John Sesay" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+232 76 000 000" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Subject / Inquiry</label>
                      <select 
                        value={contactForm.program}
                        onChange={(e) => setContactForm({ ...contactForm, program: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none transition-all text-sm bg-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Admissions & Placement">Admissions &amp; Placement</option>
                        <option value="JSS Program (BECE)">JSS Program (BECE)</option>
                        <option value="SSS Science Stream">SSS Science Stream</option>
                        <option value="SSS Arts Stream">SSS Arts Stream</option>
                        <option value="SSS Commercial Stream">SSS Commercial Stream</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Your Message *</label>
                    <textarea 
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we assist you?" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0056B3] focus:ring-2 focus:ring-[#0056B3]/20 outline-none transition-all text-sm"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#1B365D] hover:bg-[#0056B3] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all text-sm uppercase tracking-wider"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. ADMISSIONS CTA ─── */}
      <section className="py-16 bg-gradient-to-r from-[#0056B3] to-[#1B365D] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Begin Your Child&apos;s Academic Journey
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Admissions are open for the upcoming academic year. Join a community dedicated to academic brilliance and moral integrity.
          </p>
          <Link href="/admissions" className="inline-flex items-center justify-center bg-white text-[#1B365D] font-bold text-sm py-3.5 px-10 rounded-lg hover:bg-blue-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            Start Application
          </Link>
        </div>
      </section>

      {/* ─── 8. FOOTER ─── */}
      <footer className="bg-[#111827] text-white/70 pt-16 pb-8">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-5">
            <Link href="/" className="inline-block bg-white p-2 rounded-lg">
              <div className="w-10 h-10 relative">
                <Image src="/logo.png" alt="S.I.S Logo" fill className="object-contain" />
              </div>
            </Link>
            <div>
              <h3 className="text-lg font-bold text-white">Standards International School</h3>
              <p className="text-[#0056B3] font-medium text-sm mt-1 italic">Nos Educamus Mentem</p>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation through academic excellence, moral foundation, and personal growth.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#programs" className="hover:text-white transition-colors">Academic Programs</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Page</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Programs</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setSelectedProgram(PROGRAM_DETAILS[0])} className="hover:text-white transition-colors text-left">Junior Secondary (JSS 1–3)</button></li>
              <li><button onClick={() => setSelectedProgram(PROGRAM_DETAILS[3])} className="hover:text-white transition-colors text-left">Senior Secondary Science</button></li>
              <li><button onClick={() => setSelectedProgram(PROGRAM_DETAILS[4])} className="hover:text-white transition-colors text-left">Senior Secondary Arts</button></li>
              <li><button onClick={() => setSelectedProgram(PROGRAM_DETAILS[5])} className="hover:text-white transition-colors text-left">Senior Secondary Commercial</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">School Office</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPinIcon />
                <span>123 Education Boulevard,<br/>Freetown, Sierra Leone</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon />
                <span>+232 76 000 000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon />
                <span>admissions@sis.edu.sl</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Standards International School. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
