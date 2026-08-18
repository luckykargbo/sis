'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getExamQuestionsForGradeAndStream, ExamQuestion, GradeLevel, AcademicStream } from '@/lib/examQuestionBank';

// Icons
const Icons = {
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  AlertTriangle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  Flag: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
};

export default function ExamPage() {
  const [examState, setExamState] = useState<'login' | 'exam' | 'results'>('login');
  
  // Candidate & Grade & Stream State
  const [trackingId, setTrackingId] = useState('');
  const [token, setToken] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('JSS 1');
  const [selectedStream, setSelectedStream] = useState<AcademicStream>('Science');
  const [loginError, setLoginError] = useState('');

  // Loaded Exam Questions
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);

  // Exam State
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  
  // Anti-cheat State
  const [showWarning, setShowWarning] = useState(false);

  // Results State
  const [scores, setScores] = useState({ correctCount: 0, totalQuestions: 0, percentage: 0 });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (token.toUpperCase().includes('EXPIRED')) {
      setLoginError('⚠️ This Exam Token has EXPIRED. Expiration timer elapsed. Please contact the Principal, VP, or IT Manager to issue a new token.');
      return;
    }

    if (trackingId.length >= 3 && token.length >= 3) {
      // Determine stream (only applicable for SSS 2 & SSS 3)
      const activeStream = (selectedGrade === 'SSS 2' || selectedGrade === 'SSS 3') ? selectedStream : 'General';
      
      // Generate randomized, non-repeating question pool tailored specifically for grade level AND stream
      const randomizedQuestions = getExamQuestionsForGradeAndStream(selectedGrade, activeStream, 10);
      setQuestions(randomizedQuestions);
      setExamState('exam');
      enterFullscreen();
    } else {
      setLoginError('Invalid credentials. Please enter a valid Tracking ID and Exam Token.');
    }
  };

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(e => console.log(e));
    }
  };

  const calculateScore = useCallback(() => {
    if (questions.length === 0) return;
    let correct = 0;
    
    questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        correct++;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);

    setScores({
      correctCount: correct,
      totalQuestions: questions.length,
      percentage: percent
    });
    setExamState('results');
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(e => console.log(e));
    }
  }, [answers, questions]);

  // Timer
  useEffect(() => {
    if (examState !== 'exam') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          calculateScore();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, calculateScore]);

  // Anti-cheat detection
  useEffect(() => {
    if (examState !== 'exam') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowWarning(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [examState]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestion];

  const toggleFlag = () => {
    if (!currentQ) return;
    setFlagged(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const selectAnswer = (optionIdx: number) => {
    if (!currentQ) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  if (examState === 'login') {
    const isStreamRequired = selectedGrade === 'SSS 2' || selectedGrade === 'SSS 3';

    return (
      <div className="min-h-screen bg-[#FAFBFD] flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 relative mx-auto mb-3 bg-white rounded-2xl p-2 shadow-md border-2 border-[#1B365D]/20 overflow-hidden">
              <Image src="/logo.png" alt="Standards International School Logo" fill className="object-contain p-1" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#1B365D]" style={{ fontFamily: 'Outfit, sans-serif' }}>Entrance Examination</h1>
            <p className="text-gray-500 text-xs mt-1">Adaptive Grade &amp; Stream-Specific Assessment Portal</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs flex items-center gap-2 border border-red-200">
              <Icons.AlertTriangle /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Target Class Level</label>
              <select 
                value={selectedGrade} 
                onChange={(e) => setSelectedGrade(e.target.value as GradeLevel)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] outline-none text-xs bg-white font-bold text-[#1B365D]"
              >
                <option value="JSS 1">JSS 1 Entrance (NPSC P6 Standard)</option>
                <option value="JSS 2">JSS 2 Transfer (JSS 1 Foundation)</option>
                <option value="JSS 3">JSS 3 Transfer (BECE Preparatory)</option>
                <option value="SSS 1">SSS 1 Entrance (BECE Standard)</option>
                <option value="SSS 2">SSS 2 Transfer (SSS 1 Completion)</option>
                <option value="SSS 3">SSS 3 Transfer (WASSCE Standard)</option>
              </select>
            </div>

            {/* Program / Stream Selector (Only for SSS 2 & SSS 3) */}
            {isStreamRequired && (
              <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-200/60 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-cyan-900 uppercase tracking-wider block mb-1">
                  Academic Stream / Program ({selectedGrade})
                </label>
                <select 
                  value={selectedStream} 
                  onChange={(e) => setSelectedStream(e.target.value as AcademicStream)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-300 focus:border-[#0056B3] outline-none text-xs bg-white font-bold text-[#1B365D]"
                >
                  <option value="Science">🔬 Science Stream (Physics, Chemistry, Biology, Math)</option>
                  <option value="Arts">🎭 Arts Stream (Literature, Government, History, English)</option>
                  <option value="Commercial">📊 Commercial Stream (Accounting, Commerce, Economics)</option>
                </select>
                <span className="text-[10px] text-cyan-700 font-semibold block mt-1">
                  Questions are generated specifically from the {selectedStream} curriculum for {selectedGrade}.
                </span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Tracking ID</label>
              <input 
                type="text" 
                value={trackingId}
                onChange={e => setTrackingId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] outline-none text-xs"
                placeholder="e.g. SIS-TRK-8821"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Exam Access Token</label>
              <input 
                type="password" 
                value={token}
                onChange={e => setToken(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0056B3] outline-none text-xs"
                placeholder="Enter token sent to email"
                required
              />
            </div>

            <button type="submit" className="w-full py-3.5 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#0056B3] transition-colors text-xs uppercase tracking-wider shadow-lg">
              Generate Unique {selectedGrade} {isStreamRequired ? `(${selectedStream})` : ''} Exam &amp; Begin
            </button>
          </form>
          
          <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-[#0056B3] leading-relaxed border border-blue-100">
            <strong>🔒 Anti-Cheating System:</strong> Each exam session generates a fresh, randomized question set for <strong>{selectedGrade} {isStreamRequired ? `[${selectedStream}]` : ''}</strong>. Tab switching is strictly monitored.
          </div>
        </div>
      </div>
    );
  }

  if (examState === 'results') {
    return (
      <div className="min-h-screen bg-[#FFF8E1] flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100">
          <div className="text-[#4CAF50] flex justify-center mb-6">
            <Icons.CheckCircle />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1B365D] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Exam Submitted</h1>
          <p className="text-gray-500 text-xs mb-6">
            Assessment Level: <strong className="text-gray-900">{selectedGrade} {(selectedGrade === 'SSS 2' || selectedGrade === 'SSS 3') ? `[${selectedStream} Stream]` : ''}</strong>
          </p>
          
          <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 mb-6">
            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold">Overall Score</div>
            <div className="text-4xl font-extrabold text-[#1B365D]">{scores.percentage}%</div>
            <p className="text-xs text-gray-600 mt-2 font-medium">({scores.correctCount} out of {scores.totalQuestions} questions correct)</p>
          </div>
          
          <div className="bg-emerald-50 p-4 rounded-xl text-xs text-emerald-800 mb-8 text-left border border-emerald-200 leading-relaxed">
            ✓ Your results have been submitted to the Principal &amp; Vice Principal admissions board. You will receive an interview invitation link if selected.
          </div>
          
          <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#0056B3] transition-colors text-xs uppercase tracking-wider">
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Active Exam Interface
  if (!currentQ) return null;
  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  const isStreamApplied = selectedGrade === 'SSS 2' || selectedGrade === 'SSS 3';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans select-none">
      {/* Warning Overlay */}
      {showWarning && (
        <div className="fixed inset-0 bg-red-600/95 z-50 flex items-center justify-center p-8 text-center text-white backdrop-blur-sm">
          <div className="max-w-md">
            <Icons.AlertTriangle />
            <h2 className="text-3xl font-bold mb-4 mt-4">Security Warning!</h2>
            <p className="text-base mb-6">You have switched windows or left the examination tab. This violation is logged in your session telemetry.</p>
            <button onClick={() => { setShowWarning(false); enterFullscreen(); }} className="px-8 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 text-xs uppercase tracking-wider">
              Return to Exam
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#1B365D] text-white px-8 py-4 sticky top-0 z-40 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative bg-white rounded-lg p-1 border border-white/30 overflow-hidden">
            <Image src="/logo.png" alt="S.I.S. Logo" fill className="object-contain p-0.5" />
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-base font-['Outfit']">
              {selectedGrade} {isStreamApplied ? `[${selectedStream.toUpperCase()} STREAM]` : ''} EXAM
            </div>
            <div className="text-xs text-cyan-200">Candidate ID: {trackingId} • Randomized Program Questions</div>
          </div>
        </div>
        
        <div className={`flex items-center gap-3 px-6 py-2 rounded-full font-mono text-lg font-bold ${timeLeft < 300 ? 'bg-red-500 animate-pulse' : 'bg-white/10'}`}>
          <Icons.Clock /> {formatTime(timeLeft)}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-end mb-6 border-b pb-4 border-gray-200">
              <div>
                <span className="text-[#0056B3] font-bold text-xs tracking-wider uppercase mb-1 block">
                  {currentQ.subject} • {selectedGrade} {isStreamApplied ? `${selectedStream} Stream` : 'Curriculum'}
                </span>
                <h2 className="text-xl font-bold text-gray-800">Question {currentQuestion + 1} of {questions.length}</h2>
              </div>
              <button 
                onClick={toggleFlag}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors ${flagged[currentQ.id] ? 'bg-[#0056B3]/10 border-[#0056B3] text-[#0056B3]' : 'border-gray-300 text-gray-500 hover:bg-gray-100'}`}
              >
                <Icons.Flag /> {flagged[currentQ.id] ? 'Flagged for review' : 'Flag question'}
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <p className="text-lg font-medium text-gray-900 mb-8 leading-relaxed">{currentQ.text}</p>
              
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${isSelected ? 'border-[#0056B3] bg-blue-50/40 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs ${isSelected ? 'border-[#0056B3] bg-[#0056B3] text-white' : 'border-gray-300 text-gray-500'}`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-[#0056B3] font-bold' : 'text-gray-700'}`}>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button 
                onClick={() => setCurrentQuestion(p => Math.max(0, p - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 rounded-xl border border-gray-300 font-semibold text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Question
              </button>
              
              {currentQuestion < questions.length - 1 ? (
                <button 
                  onClick={() => setCurrentQuestion(p => Math.min(questions.length - 1, p + 1))}
                  className="px-8 py-3 bg-[#1B365D] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0056B3] transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button 
                  onClick={calculateScore}
                  disabled={!allAnswered}
                  className="px-8 py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Submit Final Exam
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar Question Navigator */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-gray-200 bg-gray-50 font-bold text-xs text-gray-700 uppercase tracking-wider">
            {selectedGrade} {isStreamApplied ? `[${selectedStream}]` : ''} Grid
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question, idx) => {
                const isCurrent = currentQuestion === idx;
                const isAnswered = answers[question.id] !== undefined;
                const isFlagged = flagged[question.id];
                
                let btnClass = "aspect-square rounded-xl flex items-center justify-center font-bold text-xs border-2 transition-colors relative ";
                
                if (isCurrent) {
                  btnClass += "border-[#1B365D] bg-white text-[#1B365D] shadow-sm";
                } else if (isAnswered) {
                  btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                } else {
                  btnClass += "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300";
                }

                return (
                  <button key={question.id} onClick={() => setCurrentQuestion(idx)} className={btnClass}>
                    {idx + 1}
                    {isFlagged && <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#0056B3] rounded-full border border-white"></div>}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 space-y-2.5 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-3"><div className="w-4 h-4 border-2 border-[#1B365D] rounded-md bg-white"></div> Current Question</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 border-2 border-emerald-500 rounded-md bg-emerald-50"></div> Answered</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 border-2 border-gray-200 rounded-md bg-gray-50"></div> Unanswered</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-[#0056B3] rounded-full"></div> Flagged for review</div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={calculateScore}
              className="w-full py-3 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#0056B3] transition-colors text-xs uppercase tracking-wider"
            >
              Finish &amp; Submit Exam
            </button>
            {!allAnswered && <div className="text-center text-[10px] text-red-500 mt-2 font-bold uppercase tracking-wider">Answer all questions to submit</div>}
          </div>
        </aside>
      </div>
    </div>
  );
}
