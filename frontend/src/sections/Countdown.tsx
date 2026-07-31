import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Configure target date here (e.g., Valentine's Day, anniversary, or special holiday)
const TARGET_DATE = new Date('2026-09-27T00:00:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial run
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section id="countdown" className="relative py-24 md:py-32 w-full bg-[#120e16] px-4">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
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
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">Ticking Time</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gradient-rose tracking-wide">
            Every Second With You Is Precious ❤️
          </h2>
          <p className="text-sm md:text-base text-love-pink/60 mt-4 max-w-lg mx-auto font-light">
            Counting down the seconds until our next major milestone. Time spent loving you is never wasted.
          </p>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
          {timeBlocks.map((block) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center border border-white/10 relative shadow-2xl"
            >
              {/* Backglow light inside card */}
              <div className="absolute inset-0 bg-radial-gradient from-rose-500/5 to-transparent pointer-events-none" />

              {/* Number Value */}
              <motion.div
                key={block.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]"
              >
                {String(block.value).padStart(2, '0')}
              </motion.div>

              {/* Label */}
              <span className="text-[10px] tracking-[0.2em] font-semibold text-rose-300/80 uppercase mt-3">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        {isExpired && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 p-4 rounded-2xl bg-rose-500/10 border border-rose-400/20 text-rose-300 text-sm font-semibold tracking-wider uppercase animate-pulse"
          >
            🎉 The Special Moment Has Arrived! 🎉
          </motion.div>
        )}

      </div>
    </section>
  );
};
