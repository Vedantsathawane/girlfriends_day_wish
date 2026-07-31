import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2 } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isMuted: boolean;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onComplete,
  audioRef,
  isMuted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'welcome' | 'typing' | 'fadeout'>('welcome');
  const [typedText, setTypedText] = useState('');
  const fullText = "To the Most Beautiful Girl in My World ❤️";

  // Canvas particle animation
  useEffect(() => {
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

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      decay: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -0.5 - 0.1; // move upwards slowly
        this.alpha = Math.random() * 0.5 + 0.3;
        this.decay = Math.random() * 0.002 + 0.001;
        
        // Soft pinks, lavender, gold colors
        const colors = ['#fbcfe8', '#fda4af', '#e9d5ff', '#ffedd5', '#fffdf9'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
        if (this.x < 0 || this.x > width) {
          this.x = Math.random() * width;
        }

        // Pulse alpha
        this.alpha += Math.sin(Date.now() * 0.001 * this.size) * 0.01;
        if (this.alpha < 0.1) this.alpha = 0.1;
        if (this.alpha > 0.8) this.alpha = 0.8;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.shadowBlur = 10;
        c.shadowColor = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 70 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw a subtle dark violet radial gradient background
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
      bgGrad.addColorStop(0, '#1a1223');
      bgGrad.addColorStop(1, '#08050a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Handle typing animation phase
  useEffect(() => {
    if (phase !== 'typing') return;

    let index = 0;
    const interval = setInterval(() => {
      const char = fullText[index];
      if (char !== undefined) {
        setTypedText((prev) => prev + char);
      }
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        // Wait 2.5 seconds and trigger fade out
        setTimeout(() => {
          setPhase('fadeout');
        }, 2500);
      }
    }, 90); // typing speed

    return () => clearInterval(interval);
  }, [phase]);

  // Handle fadeout completion
  useEffect(() => {
    if (phase === 'fadeout') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500); // match exit animations
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const handleStart = () => {
    // Unmute & play audio, satisfying browser interactions
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked/failed:", err);
      });
    }
    setPhase('typing');
  };

  return (
    <AnimatePresence>
      {phase !== 'fadeout' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Canvas Background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* Glowing Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#08050a]/90 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-lg">
            {phase === 'welcome' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-8">
                  <div className="absolute -inset-4 bg-pink-500/20 rounded-full blur-xl animate-pulse" />
                  <Heart className="w-16 h-16 text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.6)] animate-pulse" />
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl text-gradient-rose font-semibold mb-3 tracking-wide">
                  A Story Crafted For You
                </h2>
                <p className="text-sm md:text-base text-love-pink/70 mb-10 tracking-widest font-light leading-relaxed">
                  Turn your sound on for the best experience
                </p>

                <button
                  onClick={handleStart}
                  className="group relative px-8 py-3.5 rounded-full overflow-hidden transition-all duration-350 cursor-pointer"
                >
                  {/* Glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/80 to-purple-600/80 blur-xs group-hover:blur-md transition-all duration-350" />
                  <div className="absolute inset-0.5 bg-[#120e16] rounded-full" />
                  
                  <span className="relative z-10 flex items-center gap-3 text-sm font-semibold tracking-widest text-love-pink group-hover:text-white transition-colors">
                    ENTER OUR STORY
                    <Volume2 className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  </span>
                </button>
              </motion.div>
            )}

            {phase === 'typing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
              >
                <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-relaxed tracking-wide text-gradient-rose min-h-[120px] flex items-center justify-center">
                  {typedText}
                  <span className="inline-block w-1.5 h-10 bg-rose-400/80 ml-1.5 animate-pulse" />
                </h1>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
