import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FinalMessage: React.FC = () => {
  return (
    <section id="final-message" className="relative py-32 md:py-44 w-full bg-gradient-to-b from-[#120e16]/30 to-[#0b080e] px-4 flex flex-col items-center overflow-hidden">
      
      {/* Decorative backing lights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-pink-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 select-none">
        
        {/* Pulsating central heart */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mb-12"
        >
          <div className="absolute -inset-10 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <Heart 
            fill="#db2777" 
            className="w-24 h-24 md:w-32 md:h-32 text-rose-500 drop-shadow-[0_0_35px_rgba(244,63,94,0.7)] animate-pulse-soft" 
          />
        </motion.div>

        {/* Closing Thank You Text */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-gradient-rose max-w-2xl mb-8"
        >
          Thank You For Being My Happiness.
        </motion.h2>

        {/* Happy Girlfriend's Day Label */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-sm sm:text-lg md:text-xl text-love-pink/80 tracking-widest font-light leading-relaxed max-w-md uppercase mb-16"
        >
          HAPPY GIRLFRIEND'S DAY ❤️
        </motion.p>

        {/* Animated Handwriting Signature */}
        <div className="flex flex-col items-center">
          <svg
            className="w-[200px] h-[80px] text-rose-300 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]"
            viewBox="0 0 200 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Custom vector path simulating cursive handwriting: "Forever Yours" */}
            <motion.path
              d="M 20,40 
                 C 25,25 35,25 35,40 
                 C 35,55 45,55 45,45 
                 C 45,35 55,30 50,45
                 C 48,55 58,55 58,45
                 C 58,35 68,35 66,45
                 C 64,55 74,55 74,45
                 C 74,38 80,38 80,45
                 C 80,50 86,50 86,45
                 C 90,30 98,30 96,45
                 C 96,52 105,52 105,42
                 
                 M 115,42
                 C 118,54 126,54 126,45
                 C 126,38 132,38 132,45
                 C 132,52 138,52 138,45
                 C 142,35 148,35 146,45
                 C 146,50 152,50 152,45
                 C 156,38 162,38 162,45
                 C 162,54 172,50 176,42
                 
                 M 182,38
                 C 186,34 192,34 194,38
                 C 196,42 192,48 186,48
                 C 180,48 178,42 182,38 Z"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.6 }}
            />
          </svg>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-rose-400/70 font-semibold mt-3"
          >
            YOUR LOVING DADU ❤️
          </motion.span>
        </div>

        {/* Footer legalities or standard cute note */}
        <div className="mt-28 text-[9px] tracking-widest text-love-pink/30 uppercase font-light">
          Handcrafted with all my love © 2026
        </div>

      </div>
    </section>
  );
};
