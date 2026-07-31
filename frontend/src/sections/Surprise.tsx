import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Surprise: React.FC = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger rich confetti burst from sides and center
  const triggerConfetti = () => {
    // Left burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#db2777', '#fbcfe8', '#ffedd5']
    });

    // Right burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#db2777', '#fbcfe8', '#ffedd5']
    });

    // Center splash
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#fda4af', '#fbcfe8', '#fffdf9', '#e9d5ff']
      });
    }, 400);
  };

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    triggerConfetti();
    // Temporarily pause scroll
    document.documentElement.classList.add('lenis-stopped');
  };

  const handleClose = () => {
    setShowSurprise(false);
    // Resume scroll
    document.documentElement.classList.remove('lenis-stopped');
  };

  // Canvas fireworks animation loop when surprise is active
  useEffect(() => {
    if (!showSurprise) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle definition
    class FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: string;
      size: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.color = color;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08; // gravity
        this.vx *= 0.98; // friction
        this.vy *= 0.98;
        this.alpha -= this.decay;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.shadowBlur = 8;
        c.shadowColor = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      color: string;
      particles: FireworkParticle[];
      exploded: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.targetY = Math.random() * (height * 0.5) + height * 0.1;
        this.vy = Math.random() * -6 - 8;
        
        const colors = ['#f43f5e', '#ec4899', '#db2777', '#fda4af', '#fbcfe8', '#ffebb3'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.particles = [];
        this.exploded = false;
      }

      update() {
        if (!this.exploded) {
          this.y += this.vy;
          this.vy += 0.1; // gravity deceleration

          if (this.vy >= 0 || this.y <= this.targetY) {
            this.exploded = true;
            this.explode();
          }
        } else {
          this.particles.forEach((p) => p.update());
          this.particles = this.particles.filter((p) => p.alpha > 0);
        }
      }

      explode() {
        const count = 60;
        for (let i = 0; i < count; i++) {
          this.particles.push(new FireworkParticle(this.x, this.y, this.color));
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (!this.exploded) {
          c.save();
          c.shadowBlur = 10;
          c.shadowColor = this.color;
          c.fillStyle = this.color;
          c.beginPath();
          c.arc(this.x, this.y, 3, 0, Math.PI * 2);
          c.fill();
          c.restore();
        } else {
          this.particles.forEach((p) => p.draw(c));
        }
      }
    }

    let fireworks: Firework[] = [];
    let spawnTimer = 0;

    const animate = () => {
      // Semi-transparent redraw creates trails
      ctx.fillStyle = 'rgba(11, 8, 14, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Randomly spawn fireworks
      spawnTimer++;
      if (spawnTimer > 35) {
        fireworks.push(new Firework());
        spawnTimer = 0;
      }

      fireworks.forEach((fw) => {
        fw.update();
        fw.draw(ctx);
      });

      // Clean up dead fireworks
      fireworks = fireworks.filter((fw) => !fw.exploded || fw.particles.length > 0);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [showSurprise]);

  return (
    <section id="surprise" className="relative py-24 md:py-32 w-full bg-[#120e16]/50 px-4 flex flex-col items-center">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-[1px] w-5 bg-rose-400/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">Special Gift</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gradient-rose tracking-wide">
            A Surprise For You
          </h2>
          <p className="text-sm md:text-base text-love-pink/60 mt-4 max-w-lg mx-auto font-light">
            I prepared a little something special. Go ahead and click the gift box!
          </p>
        </div>

        {/* Surprise Button Trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Backlight pulsing glow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-rose-500/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse" />

          <button
            onClick={handleSurpriseClick}
            className="relative px-12 py-8 bg-[#1f1525] border border-rose-500/30 rounded-3xl cursor-pointer flex flex-col items-center gap-4 transition-all duration-300 hover:scale-[1.03] hover:border-rose-400 group shadow-2xl overflow-hidden min-w-[260px]"
          >
            {/* Hover flare backing */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20 group-hover:rotate-6 transition-transform">
              <Gift className="w-8 h-8 animate-bounce" />
            </div>

            <span className="text-xs tracking-[0.25em] font-semibold text-rose-300 uppercase">
              CLICK FOR A SURPRISE
            </span>
          </button>
        </motion.div>

      </div>

      {/* Full Screen Surprise Fireworks overlay */}
      <AnimatePresence>
        {showSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0b080e]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-hidden"
          >
            {/* Canvas for fireworks */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Back button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-55"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sparkle effects button triggers again */}
            <button
              onClick={triggerConfetti}
              className="absolute bottom-10 px-6 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[10px] tracking-[0.25em] font-semibold cursor-pointer transition-all duration-300 z-55 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              SPARK AGAIN
            </button>

            {/* Large Romantic Text Banner */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              transition={{ delay: 0.3, duration: 1.2, type: 'spring' }}
              className="relative z-50 max-w-3xl text-center px-4"
            >
              {/* Backglow text light */}
              <div className="absolute -inset-10 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-gradient-rose drop-shadow-[0_0_20px_rgba(251,113,133,0.5)] animate-pulse-soft">
                "I Love You More Than Words Can Ever Explain ❤️"
              </h1>
              
              <p className="text-xs sm:text-sm md:text-base text-love-pink/80 font-light max-w-lg mx-auto leading-relaxed mt-6 tracking-widest uppercase italic font-sans">
                You are my stars, my sun, and my entire sky.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
