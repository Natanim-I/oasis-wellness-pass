import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock QR Code Component using simple divs
const QRCodeMock = () => (
  <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm grid grid-cols-5 grid-rows-5 gap-1 relative">
    {/* Corner squares */}
    <div className="col-span-2 row-span-2 border-[3px] border-stone-800 rounded-md p-1">
      <div className="w-full h-full bg-stone-800 rounded-sm"></div>
    </div>
    <div className="col-span-2 row-span-2 border-[3px] border-stone-800 rounded-md p-1 col-start-4">
      <div className="w-full h-full bg-stone-800 rounded-sm"></div>
    </div>
    <div className="col-span-2 row-span-2 border-[3px] border-stone-800 rounded-md p-1 row-start-4">
      <div className="w-full h-full bg-stone-800 rounded-sm"></div>
    </div>
    
    {/* Random inner blocks */}
    <div className="bg-stone-800 rounded-sm col-start-3 row-start-1"></div>
    <div className="bg-stone-800 rounded-sm col-start-3 row-start-2"></div>
    <div className="bg-stone-800 rounded-sm col-start-4 row-start-3"></div>
    <div className="bg-stone-800 rounded-sm col-start-5 row-start-3"></div>
    <div className="bg-stone-800 rounded-sm col-start-3 row-start-4"></div>
    <div className="bg-stone-800 rounded-sm col-start-4 row-start-5"></div>
    <div className="bg-stone-800 rounded-sm col-start-5 row-start-5"></div>
    <div className="bg-stone-800 rounded-sm col-start-3 row-start-5"></div>
  </div>
);

const VerificationPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [step, setStep] = useState('welcome'); // 'welcome' | 'verification'
  const [inputName, setInputName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
    // 1. Check local storage for existing session
    const savedName = localStorage.getItem('oasis_customer_name');
    const savedDate = localStorage.getItem('oasis_issue_date');
    const today = new Date().toDateString();

    if (savedName && savedDate) {
      if (savedDate !== today) {
        setIsExpired(true);
      } else {
        setCustomerName(savedName);
        setStep('verification');
      }
    }

    // 2. Generate or load verification ID
    const savedId = localStorage.getItem('oasis_verification_id');
    if (savedId && savedDate === today) {
      setVerificationId(savedId);
    } else {
      const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
      const newId = `MC-OASIS-${randomId}`;
      setVerificationId(newId);
    }

    // 3. Live clock & expiration check timer
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Check if we rolled over to a new day
      if (savedDate && savedDate !== now.toDateString()) {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleActivate = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    
    setIsLoading(true);
    
    // Simulate activation processing
    setTimeout(() => {
      const name = inputName.trim();
      const today = new Date().toDateString();
      
      setCustomerName(name);
      localStorage.setItem('oasis_customer_name', name);
      localStorage.setItem('oasis_issue_date', today);
      
      // Also save the generated ID if not already saved
      if (!localStorage.getItem('oasis_verification_id') || localStorage.getItem('oasis_issue_date') !== today) {
         localStorage.setItem('oasis_verification_id', verificationId);
      }
      
      setStep('verification');
      setIsLoading(false);
    }, 1500);
  };

  // Format Date: e.g., "Friday, May 8, 2026"
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format Time: e.g., "10:34:38 AM"
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  if (isExpired) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-3xl font-light text-stone-800 mb-4">Pass Expired</h1>
        <p className="text-stone-500">This partnership discount was only valid for the original issue date.</p>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="mt-8 text-sm text-primary underline"
        >
          Start New Session
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col items-center py-12 px-4 sm:px-6 font-sans relative overflow-hidden text-stone-800 selection:bg-primary/20">
      
      {/* Dynamic Background Gradients - Proving it's live/not a screenshot */}
      <motion.div 
        className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[100px] pointer-events-none"
        animate={{ 
          x: [0, 40, 0], 
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/30 blur-[80px] pointer-events-none"
        animate={{ 
          x: [0, -30, 0], 
          y: [0, -40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[420px] w-full relative z-10 flex flex-col h-full min-h-[500px]">
        
        {/* Header Section */}
        <div className="text-center mb-8 pt-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-[26px] sm:text-[28px] font-medium tracking-tight text-stone-800 mb-1 flex items-center justify-center gap-2">
              <span>OASIS Jimma</span>
              <span className="text-stone-300 font-light text-xl">×</span>
              <span>Method Collective</span>
            </h1>
            <p className="text-xs text-stone-500 uppercase tracking-[0.2em] font-medium mt-2">
              Post-Class Wellness Partnership
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div 
              key="welcome"
              className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 relative overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-1 flex flex-col items-center justify-center py-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  {/* Clean SVG icon indicating discount/ticket */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.112-1.875s-2.112.839-2.112 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 01-1.5 1.5H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.25m-9 4.5h.008v.008H9.75v-.008zm0 3h.008v.008H9.75v-.008zm0 3h.008v.008H9.75v-.008zm3-6h.008v.008H12.75v-.008zm0 3h.008v.008H12.75v-.008zm0 3h.008v.008H12.75v-.008zm3-6h.008v.008H15.75v-.008zm0 3h.008v.008H15.75v-.008zm0 3h.008v.008H15.75v-.008z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-light text-stone-800 mb-2 text-center">
                  Claim Your Discount
                </h2>
                <p className="text-stone-500 text-center text-[15px] mb-8 leading-relaxed px-2">
                  Enter your first name to activate your exclusive 7% partnership discount.
                </p>

                <form onSubmit={handleActivate} className="w-full flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider pl-1">
                      First Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full bg-white/80 border border-stone-200 rounded-xl px-4 py-3.5 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all shadow-sm"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || !inputName.trim()}
                    className="w-full bg-primary text-white rounded-xl py-4 font-medium shadow-[0_4px_14px_0_rgba(0,100,0,0.3)] disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden flex justify-center items-center h-[54px]"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div 
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      "Activate Discount"
                    )}
                  </motion.button>
                </form>
                
                <p className="text-[11px] text-stone-400 mt-6 text-center">
                  Valid for same-day redemption only.
                </p>
              </div>
            </motion.div>
          )}

          {step === 'verification' && (
            <motion.div 
              key="verification"
              className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Pulsing Verified Live Indicator */}
              <div className="absolute top-6 right-6 flex items-center space-x-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm backdrop-blur-sm">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Verified Live</span>
              </div>

              {/* Welcome Message */}
              <div className="mt-10 mb-8">
                <h2 className="text-3xl font-light text-stone-800 mb-3">
                  Welcome, <span className="font-medium text-primary">{customerName}</span>
                </h2>
                <p className="text-stone-500 leading-relaxed text-[15px]">
                  Thanks for riding with Method Collective today. Enjoy <span className="font-semibold text-primary">7% off</span> at OASIS Jimma.
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent my-8 opacity-60"></div>

              {/* Live Date and Time Section */}
              <div className="flex flex-col items-center justify-center space-y-2 mb-10">
                <motion.div 
                  className="text-[2.5rem] font-light text-stone-800 tracking-tight tabular-nums leading-none"
                  key={formatTime(currentTime)}
                  initial={{ opacity: 0.8, filter: "blur(2px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                >
                  {formatTime(currentTime)}
                </motion.div>
                <div className="text-stone-400 font-medium text-sm tracking-wide">
                  {formatDate(currentTime)}
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center bg-stone-50/80 rounded-2xl p-6 mb-8 border border-stone-100">
                <QRCodeMock />
                <div className="mt-4 text-center">
                  <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase mb-1">Session ID</p>
                  <p className="text-xs font-semibold text-stone-700 tracking-wider">
                    {verificationId}
                  </p>
                </div>
              </div>

              {/* Validation Badge */}
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="bg-stone-800 text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  VALID TODAY ONLY
                </motion.div>
              </div>

              <p className="text-center text-sm text-stone-500 font-medium">
                Please present this screen at checkout.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <AnimatePresence>
          {step === 'verification' && (
            <motion.div 
              className="mt-8 text-center pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-[11px] text-stone-400 leading-relaxed max-w-[280px] mx-auto">
                Offer valid only on the date shown above. Cannot be combined with other offers.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default VerificationPage;
