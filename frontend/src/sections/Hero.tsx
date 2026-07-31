import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNextSection: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const Hero: React.FC<HeroProps> = ({ onNextSection }) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate floating hearts with random values
    const generated: FloatingHeart[] = Array.from({ length: 25 }, (_, i) => {
      const colors = [
        'rgba(251, 113, 133, 0.4)', // rose-400
        'rgba(244, 63, 94, 0.3)',   // rose-500
        'rgba(236, 72, 153, 0.3)',  // pink-500
        'rgba(192, 132, 252, 0.3)', // purple-400
        'rgba(255, 237, 213, 0.4)'  // peach-100
      ];
      return {
        id: i,
        x: Math.random() * 100, // percentage from left
        size: Math.random() * 24 + 12, // px size
        duration: Math.random() * 12 + 8, // seconds to float up
        delay: Math.random() * 8, // seconds delay
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    setHearts(generated);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 select-none">
      
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120e16] via-[#1a1223] to-[#120e16] z-0" />
      
      {/* Soft Animated Bokeh Lights */}
      <div className="bokeh-container">
        <div className="bokeh-light w-[40vw] h-[40vw] bg-pink-500/10 top-[-10%] left-[-10%] animate-float-slow" />
        <div className="bokeh-light w-[50vw] h-[50vw] bg-purple-600/10 bottom-[-10%] right-[-10%] animate-float-medium" />
        <div className="bokeh-light w-[35vw] h-[35vw] bg-rose-400/5 top-[30%] left-[40%] animate-pulse-soft" />
      </div>

      {/* Floating Glowing Hearts */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', opacity: 0, x: `${heart.x}vw` }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.8, 0.8, 0],
              x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`, `${heart.x}vw`]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              width: heart.size,
              height: heart.size,
              color: heart.color
            }}
          >
            <Heart fill="currentColor" stroke="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]" />
          </motion.div>
        ))}
      </div>

      {/* Hero Content Card */}
      <div className="relative z-10 text-center max-w-4xl flex flex-col items-center">
        {/* Subtle romantic tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 flex items-center gap-2"
        >
          <div className="h-[1px] w-8 bg-love-rose/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-love-rose/80 font-semibold">
            An Interactive Love Story
          </span>
          <div className="h-[1px] w-8 bg-love-rose/40" />
        </motion.div>

        {/* Large Elegant Typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-gradient-rose mb-6 leading-none"
        >
          Happy <br className="sm:hidden" />
          Girlfriend's Day <br />
          <span className="relative inline-block mt-2">
            <Heart className="w-12 h-12 md:w-20 md:h-20 text-rose-500 inline-block drop-shadow-[0_0_20px_rgba(239,68,68,0.7)] animate-bounce" fill="currentColor" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-love-pink/80 font-light max-w-2xl px-4 leading-relaxed mb-12 tracking-wide font-sans italic"
        >
          "You are my favorite chapter, my safest place, and my greatest blessing."
        </motion.p>

        {/* Open My Heart Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative"
        >
          {/* Glowing pulse ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/30 to-purple-600/30 rounded-full blur-xl animate-pulse" />
          
          <button
            onClick={onNextSection}
            className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-500/90 to-purple-600/90 hover:from-rose-500 hover:to-purple-600 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25 active:scale-95 border border-white/20 cursor-pointer text-sm tracking-[0.2em]"
          >
            OPEN MY HEART
            <Heart fill="currentColor" className="w-4 h-4 text-white/90 animate-pulse" />
          </button>
        </motion.div>
      </div>

      {/* Floating Arrow down at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
        onClick={onNextSection}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] tracking-[0.25em] text-love-pink/50 font-semibold">SCROLL TO DISCOVER</span>
        <ChevronDown className="w-5 h-5 text-love-pink/50 animate-bounce" />
      </motion.div>

    </section>
  );
};
