import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ExplodingHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  color: string;
}

export const StatsAndHeart: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isBeating, setIsBeating] = useState(false);
  const [explodedHearts, setExplodedHearts] = useState<ExplodingHeart[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const counterFired = useRef(false);

  // Intersection Observer to start counter when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !counterFired.current) {
          setIsCounting(true);
          counterFired.current = true;
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation loop
  useEffect(() => {
    if (!isCounting) return;

    let start = 0;
    const end = 1314520; // 1,314,520 (represents "I love you for a lifetime" in Chinese culture)
    const duration = 2500; // 2.5 seconds
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * (end - start) + start);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isCounting]);

  // Click heart explosion
  const handleHeartClick = () => {
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 600);

    // Create 15-20 particles
    const newHearts: ExplodingHeart[] = Array.from({ length: 18 }, (_, i) => {
      const colors = ['#f43f5e', '#ec4899', '#db2777', '#f472b6', '#fda4af', '#fbcfe8'];
      return {
        id: Date.now() + i,
        x: Math.random() * 200 - 100, // random distance left or right
        y: Math.random() * -250 - 50,  // random distance upwards
        scale: Math.random() * 1.2 + 0.6,
        rotate: Math.random() * 120 - 60,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });

    setExplodedHearts((prev) => [...prev, ...newHearts]);

    // Clean up particles
    setTimeout(() => {
      setExplodedHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1500);
  };

  return (
    <section 
      ref={sectionRef} 
      id="stats-and-heart" 
      className="relative py-24 md:py-32 w-full bg-[#120e16]/40 px-4 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center select-none">
        
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
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">Pulse of My Soul</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>
        </div>

        {/* Counter Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 w-full max-w-lg text-center relative border border-white/10 mb-16 shadow-2xl">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-radial-gradient from-rose-500/5 to-transparent pointer-events-none" />
          
          <h3 className="text-sm font-semibold tracking-[0.3em] text-rose-300/80 uppercase mb-4">
            My Heart Beats For You
          </h3>

          <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-white select-all drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4">
            {count.toLocaleString()}+
          </div>

          <p className="text-xs sm:text-sm text-love-pink/60 font-light leading-relaxed max-w-xs mx-auto">
            Times my heart has beat with gratitude since the moment you entered my universe.
          </p>
        </div>

        {/* Interactive Beating Heart Container */}
        <div className="relative flex flex-col items-center mt-6">
          <p className="text-xs tracking-[0.2em] font-semibold text-love-pink/50 mb-8 uppercase">
            TOUCH MY HEART
          </p>

          {/* Interactive Heart */}
          <motion.div
            onClick={handleHeartClick}
            animate={{
              scale: isBeating ? [1, 1.25, 0.95, 1.05, 1] : 1,
              rotate: isBeating ? [0, -3, 3, -1, 0] : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="relative cursor-pointer z-10 select-none group"
          >
            {/* Soft pulsing glow behind */}
            <div className="absolute -inset-8 bg-rose-500/25 rounded-full blur-2xl group-hover:bg-rose-500/40 transition-colors duration-300 animate-pulse-soft" />

            <div className="relative">
              <svg 
                className="w-32 h-32 text-rose-500 hover:text-rose-400 drop-shadow-[0_0_30px_rgba(244,63,94,0.65)] transition-colors duration-300"
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Sparkles / heart particle bursts */}
            <div className="absolute inset-0 pointer-events-none">
              <AnimatePresence>
                {explodedHearts.map((eh) => (
                  <motion.div
                    key={eh.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.2, rotate: 0 }}
                    animate={{
                      x: eh.x,
                      y: eh.y,
                      opacity: 0,
                      scale: eh.scale,
                      rotate: eh.rotate
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: '35%',
                      left: '35%',
                      color: eh.color
                    }}
                  >
                    <Heart fill="currentColor" stroke="none" className="w-6 h-6" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <p className="text-[10px] sm:text-xs tracking-wider text-rose-300/60 font-light mt-8 italic text-center">
            Click the glowing heart to make it beat and see what happens.
          </p>
        </div>

      </div>
    </section>
  );
};
