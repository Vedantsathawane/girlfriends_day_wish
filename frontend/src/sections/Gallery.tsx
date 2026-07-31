import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../utils/galleryImages';

export const Gallery: React.FC = () => {
  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImgIndex(index);
    // Temporarily pause scroll
    document.documentElement.classList.add('lenis-stopped');
  };

  const closeLightbox = () => {
    setActiveImgIndex(null);
    // Resume scroll
    document.documentElement.classList.remove('lenis-stopped');
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImgIndex !== null) {
      setActiveImgIndex((activeImgIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImgIndex !== null) {
      setActiveImgIndex((activeImgIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const activeImage = activeImgIndex !== null ? galleryImages[activeImgIndex] : null;

  return (
    <section id="gallery" className="relative py-24 md:py-32 w-full bg-[#120e16] px-4">
      {/* Background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
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
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">Visual Diary</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gradient-rose tracking-wide">
            Our Memory Gallery
          </h2>
          <p className="text-sm md:text-base text-love-pink/60 mt-4 max-w-lg mx-auto font-light">
            A collection of beautiful slices of our life together. Click any image to open the lightbox.
          </p>
        </div>

        {/* Balanced Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => {
            const isLarge = index === 0;
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(index)}
                className={`relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg border border-white/5 glass-card-hover ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
              >
                {/* Image or Video element */}
                {img.type === 'video' ? (
                  <video
                    src={img.url}
                    muted
                    loop
                    playsInline
                    className="w-full h-[280px] sm:h-[350px] md:h-[400px] object-cover transform duration-700 ease-out group-hover:scale-105"
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <img
                    src={img.url}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full h-[280px] sm:h-[350px] md:h-[400px] object-cover transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                  />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end">
                    <div className="max-w-[80%]">
                      <p className="text-white text-sm font-medium tracking-wide">
                        {img.caption}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#08050a]/95 backdrop-blur-lg flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Container Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col"
            >
              <div className="relative aspect-auto max-h-[70vh] flex justify-center items-center bg-[#0e0a12]/30">
                {activeImage.type === 'video' ? (
                  <video
                    src={activeImage.url}
                    controls
                    autoPlay
                    loop
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <img
                    src={activeImage.url}
                    alt={activeImage.caption}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                )}
              </div>

              {/* Lightbox Footer */}
              <div className="p-6 md:p-8 bg-[#120e16]/80 backdrop-blur-md border-t border-white/5 text-center flex flex-col items-center">
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl"
                >
                  <p className="text-white font-serif text-lg md:text-xl font-medium tracking-wide">
                    {activeImage.caption}
                  </p>
                  <span className="text-[10px] tracking-[0.25em] text-love-rose font-bold uppercase mt-2 block">
                    Memory {activeImgIndex! + 1} of {galleryImages.length}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
