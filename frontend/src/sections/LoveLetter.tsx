import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterOut, setIsLetterOut] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  
  const letterLines = [
    "My Love,",
    "Thank you for making every ordinary day feel extraordinary.",
    "You are the peace I never knew I needed, the happiness I never expected, and the love I never want to lose.",
    "Happy Girlfriend's Day.",
    "I love you today, tomorrow, and forever."
  ];

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for flap to open, then slide letter out
      setTimeout(() => {
        setIsLetterOut(true);
      }, 800);
    }
  };

  // Handle line-by-line typing once letter is out
  useEffect(() => {
    if (!isLetterOut) {
      setTypedLines([]);
      return;
    }

    let currentLine = 0;
    const timers: number[] = [];

    const typeNextLine = () => {
      if (currentLine < letterLines.length) {
        setTypedLines((prev) => [...prev, letterLines[currentLine]]);
        currentLine++;
        // Wait 2.2 seconds before showing next line (reading pace)
        const timer = window.setTimeout(typeNextLine, 2200);
        timers.push(timer);
      }
    };

    // First line appears shortly after letter expands
    const initialTimer = window.setTimeout(typeNextLine, 800);
    timers.push(initialTimer);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isLetterOut]);

  return (
    <section id="love-letter" className="relative py-24 md:py-32 w-full bg-[#120e16]/50 px-4 flex flex-col items-center">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-[1px] w-5 bg-rose-400/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">A Secret Note</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gradient-rose tracking-wide">
            Love Letter
          </h2>
          <p className="text-sm md:text-base text-love-pink/60 mt-4 max-w-lg mx-auto font-light">
            Click the wax seal on the envelope to open a message written straight from my heart.
          </p>
        </div>

        {/* Envelope Container Wrapper */}
        <div className="relative w-full max-w-[420px] h-[300px] xs:h-[340px] flex items-center justify-center mt-6">
          
          {/* Envelope Body */}
          <div 
            onClick={handleOpenEnvelope}
            className={`relative w-[280px] xs:w-[340px] sm:w-[400px] h-[200px] xs:h-[240px] sm:h-[260px] bg-rose-900/20 border border-rose-300/10 rounded-2xl cursor-pointer shadow-2xl transition-transform duration-500 ${
              isOpen ? 'scale-100 cursor-default' : 'hover:scale-[1.03]'
            }`}
            style={{ perspective: '1000px' }}
          >
            
            {/* Top Flap (opens up) */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#2d1d2b] border-t border-rose-400/20 rounded-t-2xl z-30 origin-top"
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
              }}
              animate={{
                rotateX: isOpen ? 180 : 0,
                zIndex: isOpen ? 10 : 30
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Back Flap & Sides */}
            <div 
              className="absolute inset-0 bg-[#251825]/90 rounded-2xl z-10" 
              style={{
                clipPath: 'polygon(0% 100%, 0% 0%, 50% 50%, 100% 0%, 100% 100%)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)'
              }}
            />
            
            {/* Front Bottom Pocket Flap */}
            <div 
              className="absolute bottom-0 left-0 w-full h-[60%] bg-[#221622] rounded-b-2xl border-t border-white/5 z-25"
              style={{
                clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)'
              }}
            />

            {/* Left & Right Fold Covers */}
            <div 
              className="absolute inset-0 bg-[#1e131e]/90 rounded-2xl z-20"
              style={{
                clipPath: 'polygon(0% 0%, 0% 100%, 48% 50%)'
              }}
            />
            <div 
              className="absolute inset-0 bg-[#1e131e]/90 rounded-2xl z-20"
              style={{
                clipPath: 'polygon(100% 0%, 100% 100%, 52% 50%)'
              }}
            />

            {/* Letter Paper (Slides out) */}
            <motion.div
              className="absolute left-[5%] top-[10%] w-[90%] h-[80%] bg-[#fffcf5] rounded-lg shadow-inner z-15 p-4 flex flex-col text-slate-800"
              initial={{ y: 0, scale: 0.95 }}
              animate={{
                y: isLetterOut ? -160 : 0,
                scale: isLetterOut ? 1 : 0.95,
                zIndex: isLetterOut ? 35 : 15,
                boxShadow: isLetterOut 
                  ? '0 20px 40px rgba(0,0,0,0.4), 0 0 10px rgba(251,113,133,0.1)' 
                  : '0 0 0px rgba(0,0,0,0)'
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Decorative paper lines */}
              <div className="absolute inset-0 bg-linear-gradient(rgba(0,0,0,0.03)_1px,_transparent_1px) bg-[size:100%_24px] pointer-events-none p-4 rounded-lg" />
              <div className="w-full h-full border border-orange-200/50 rounded-md p-4 flex flex-col font-serif italic text-xs sm:text-sm">
                <span className="text-right text-[10px] tracking-widest text-slate-400 font-sans not-italic mb-2">MY SOULMATE</span>
                
                {/* Small indicator when closed */}
                {!isLetterOut && (
                  <div className="h-full flex items-center justify-center text-slate-400 font-sans not-italic font-semibold text-xs tracking-wider">
                    SEALED LOVE NOTE
                  </div>
                )}
              </div>
            </motion.div>

            {/* Wax Seal Button (click to open) */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div 
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] z-40 flex flex-col items-center"
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEnvelope();
                    }}
                    className="relative w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 border border-rose-300/30 flex items-center justify-center text-white cursor-pointer shadow-lg shadow-rose-500/30 hover:scale-110 active:scale-95 transition-transform duration-200 group"
                  >
                    {/* Pulsing glow ring */}
                    <span className="absolute inset-0 rounded-full bg-rose-500/30 blur-md group-hover:scale-125 transition-transform duration-300" />
                    <Heart fill="currentColor" className="w-6 h-6 text-white relative z-10 animate-pulse" />
                  </button>
                  <span className="text-[9px] font-sans tracking-[0.2em] font-bold text-rose-300/80 mt-3 whitespace-nowrap bg-black/40 px-2.5 py-1 rounded-full border border-rose-500/10">
                    CLICK SEAL TO OPEN
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Display Expanded Typed Letter Paper for reading (once slide out is complete) */}
        <AnimatePresence>
          {isLetterOut && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="glass-card w-full max-w-2xl rounded-3xl p-8 md:p-12 border border-white/10 relative shadow-2xl overflow-hidden mt-12 bg-linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)"
            >
              {/* Backlight soft gold glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/5 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/5 rounded-full blur-[80px]" />

              <div className="flex flex-col items-center">
                <Heart fill="#fda4af" className="w-10 h-10 text-rose-300 mb-6 animate-pulse-soft" />

                {/* Hand written content text */}
                <div className="w-full flex flex-col gap-6 text-center text-love-cream font-cursive text-2xl md:text-3xl tracking-wide leading-relaxed min-h-[300px] justify-center">
                  {typedLines.map((line, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, filter: 'blur(5px)', y: 10 }}
                      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`${
                        idx === 0 
                          ? 'text-left self-start text-3xl font-semibold mb-2 text-rose-200' 
                          : idx === letterLines.length - 1 
                          ? 'text-right self-end text-3xl font-bold mt-4 text-rose-300' 
                          : idx === letterLines.length - 2 
                          ? 'font-serif tracking-widest text-lg md:text-xl font-semibold uppercase text-rose-400 not-italic my-4'
                          : ''
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                {/* Close Button back up */}
                {typedLines.length === letterLines.length && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={() => {
                      setIsLetterOut(false);
                      setIsOpen(false);
                    }}
                    className="mt-10 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 border border-white/10 hover:border-rose-400/30 text-[10px] font-sans tracking-[0.25em] font-semibold cursor-pointer transition-all duration-300"
                  >
                    FOLD LETTER BACK
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
