import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { IntroScreen } from './components/IntroScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { Hero } from './sections/Hero';
import { Timeline } from './sections/Timeline';
import { Gallery } from './sections/Gallery';
import { Reasons } from './sections/Reasons';
import { LoveLetter } from './sections/LoveLetter';
import { StatsAndHeart } from './sections/StatsAndHeart';
import { QuotesCarousel } from './sections/QuotesCarousel';
import { Countdown } from './sections/Countdown';
import { Surprise } from './sections/Surprise';
import { FinalMessage } from './sections/FinalMessage';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll once the intro screen is finished
  useEffect(() => {
    if (showIntro) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [showIntro]);

  // Synchronize playing state with actual audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (audio.paused) {
        audio.play().catch((err) => {
          console.log("Audio playback failed to sync:", err);
          setIsPlaying(false);
        });
      }
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
  }, [isPlaying]);

  // Synchronize mute state with actual audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsPlaying(true);
  };

  const handleScrollToTimeline = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#timeline', {
        offset: 0,
        immediate: false,
        duration: 1.6,
      });
    } else {
      document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#120e16]">
      {/* Background Audio element */}
      <audio
        ref={audioRef}
        src="https://assets.codepen.co/4358584/Ancle+Music+-+Romantic+Piano.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen
            key="intro"
            onComplete={handleIntroComplete}
            audioRef={audioRef}
            isMuted={isMuted}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center w-full"
          >
            {/* Sections */}
            <Hero onNextSection={handleScrollToTimeline} />
            <Timeline />
            <Gallery />
            <Reasons />
            <LoveLetter />
            <StatsAndHeart />
            <QuotesCarousel />
            <Countdown />
            <Surprise />
            <FinalMessage />

            {/* Floating music player */}
            <MusicPlayer
              audioRef={audioRef}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
