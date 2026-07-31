import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface LoveQuote {
  text: string;
  author: string;
}

const loveQuotes: LoveQuote[] = [
  {
    text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
    author: "Angelita Lim"
  },
  {
    text: "If I had a flower for every time I thought of you... I could walk through my garden forever.",
    author: "Alfred Tennyson"
  },
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou"
  },
  {
    text: "I love you not only for what you are, but for what I am when I am with you.",
    author: "Elizabeth Barrett Browning"
  },
  {
    text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
    author: "Leo Christopher"
  },
  {
    text: "If I know what love is, it is because of you.",
    author: "Hermann Hesse"
  },
  {
    text: "You are my heart, my life, my entire existence.",
    author: "Julie Kagawa"
  },
  {
    text: "My soul and your soul are forever tangled.",
    author: "N.R. Hart"
  },
  {
    text: "Grow old along with me! The best is yet to be.",
    author: "Robert Browning"
  }
];

export const QuotesCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setDirection('right');
      setIndex((prev) => (prev + 1) % loveQuotes.length);
    }, 5500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNext = () => {
    setDirection('right');
    setIndex((prev) => (prev + 1) % loveQuotes.length);
    resetTimer();
  };

  const handlePrev = () => {
    setDirection('left');
    setIndex((prev) => (prev - 1 + loveQuotes.length) % loveQuotes.length);
    resetTimer();
  };

  const handleDotClick = (i: number) => {
    setDirection(i > index ? 'right' : 'left');
    setIndex(i);
    resetTimer();
  };

  // Variants for slide cross-fade transition
  const variants = {
    enter: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? 30 : -30,
      scale: 0.98,
      filter: 'blur(4px)'
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? -30 : 30,
      scale: 0.98,
      filter: 'blur(4px)'
    })
  };

  return (
    <section id="quotes" className="relative py-24 md:py-32 w-full bg-[#120e16]/50 px-4 overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-[1px] w-5 bg-rose-400/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">Whispers of Love</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>
        </div>

        {/* Carousel Card */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-16 w-full max-w-3xl border border-white/10 flex flex-col items-center shadow-2xl overflow-hidden min-h-[300px] justify-center text-center">
          
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 text-white/5 pointer-events-none">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          <div className="relative w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Quote Text */}
                <p className="font-serif text-lg sm:text-2xl italic leading-relaxed text-love-cream tracking-wide max-w-2xl">
                  "{loveQuotes[index].text}"
                </p>
                
                {/* Quote Author */}
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-love-rose mt-6 block">
                  — {loveQuotes[index].author}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full absolute bottom-4 sm:bottom-6 px-6 left-0 right-0">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-all border border-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {loveQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === index ? 'w-5 bg-rose-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-all border border-white/5"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
