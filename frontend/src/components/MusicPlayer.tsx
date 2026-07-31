import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
}) => {
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const total = audio.duration || 0;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
      
      // Format current time
      const min = Math.floor(current / 60);
      const sec = Math.floor(current % 60);
      setCurrentTime(`${min}:${sec < 10 ? '0' : ''}${sec}`);
    };

    const handleLoadedMetadata = () => {
      const total = audio.duration || 0;
      const min = Math.floor(total / 60);
      const sec = Math.floor(total % 60);
      setDuration(`${min}:${sec < 10 ? '0' : ''}${sec}`);
    };

    const handleAudioEnded = () => {
      // Auto loop
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [audioRef, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Failed to play:", err);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVol;
      audio.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
    setProgress((newTime / audio.duration) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-45"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-panel rounded-2xl p-4 flex flex-col gap-3 w-full md:w-[280px] shadow-2xl border border-white/10 overflow-hidden relative group">
        {/* Decorative backdrop light */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-colors duration-500" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors duration-500" />

        {/* Info & Visualizer */}
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20 ${isPlaying ? 'animate-pulse' : ''}`}>
              <Heart className={`w-5 h-5 text-white ${isPlaying ? 'scale-110' : ''}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wider truncate max-w-[120px] md:max-w-[140px]">
                Romantic Melodies
              </p>
              <p className="text-[10px] text-rose-300/70 tracking-widest font-light">
                PLAYING FOR YOU
              </p>
            </div>
          </div>

          {/* Mini Visualizer bars */}
          <div className="flex items-end gap-0.5 h-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-gradient-to-t from-pink-400 to-rose-500 rounded-full"
                animate={{
                  height: isPlaying ? [6, 20, 8, 24, 10, 6][i - 1] * (0.5 + Math.random() * 0.5) : 4,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8 + i * 0.1,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>
        </div>

        {/* Expanded controls when hovered or always shown on mobile */}
        <motion.div
          animate={{ height: isHovered ? 'auto' : 'auto' }} // Keep fully visible for usability, or adjust height
          className="flex flex-col gap-2.5 relative z-10"
        >
          {/* Progress Bar */}
          <div className="flex flex-col gap-1 mt-1">
            <div
              onClick={handleProgressClick}
              className="h-1.5 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden relative"
            >
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[9px] text-white/50 tracking-wider">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-pink-500/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-[1px]" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-pink-500/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 flex-1 max-w-[100px]">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
