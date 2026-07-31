import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Sparkles, 
  Volume2, 
  Eye, 
  Heart, 
  HelpingHand, 
  Compass 
} from 'lucide-react';

interface Reason {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  gradient: string;
  floatDelay: number;
  floatDuration: number;
}

const reasons: Reason[] = [
  {
    id: '1',
    title: "Your Smile",
    icon: Smile,
    description: "It has the power to brighten my darkest days instantly. A simple curve of your lips changes everything, lighting up my entire world with warmth.",
    gradient: "from-pink-500/10 to-rose-500/10",
    floatDelay: 0,
    floatDuration: 6
  },
  {
    id: '2',
    title: "Your Kindness",
    icon: Sparkles,
    description: "The way you care for people, your gentle spirit, and how you spread love to everyone around you. Your heart is pure gold, and it humbles me.",
    gradient: "from-purple-500/10 to-pink-500/10",
    floatDelay: 1,
    floatDuration: 7
  },
  {
    id: '3',
    title: "Your Laugh",
    icon: Volume2,
    description: "The sweetest melody I have ever heard. It is pure music to my ears—a sound that triggers an instant wave of happiness in my own chest.",
    gradient: "from-orange-500/10 to-rose-500/10",
    floatDelay: 0.5,
    floatDuration: 5.5
  },
  {
    id: '4',
    title: "Your Eyes",
    icon: Eye,
    description: "I get lost in them every single time. They look at me with so much love, warmth, and sincerity. They are my favorite view in the universe.",
    gradient: "from-rose-500/10 to-purple-500/10",
    floatDelay: 1.5,
    floatDuration: 8
  },
  {
    id: '5',
    title: "Your Caring Heart",
    icon: Heart,
    description: "How deeply you feel and look after me. You listen to my silent thoughts, ease my worries, and hold my heart like it is the most precious gem.",
    gradient: "from-pink-500/10 to-purple-500/10",
    floatDelay: 0.2,
    floatDuration: 6.5
  },
  {
    id: '6',
    title: "Your Support",
    icon: HelpingHand,
    description: "You believe in me even when I struggle to believe in myself. You are my anchor, my cheerleader, and my safest harbor in any storm.",
    gradient: "from-purple-500/10 to-rose-500/10",
    floatDelay: 1.2,
    floatDuration: 7.2
  },
  {
    id: '7',
    title: "Everything About You",
    icon: Compass,
    description: "Your imperfections, your quirks, your voice, the way you sleep, how you get excited. There is not a single thing I would ever change about you.",
    gradient: "from-rose-500/15 to-pink-500/15",
    floatDelay: 0.7,
    floatDuration: 6.8
  }
];

export const Reasons: React.FC = () => {
  return (
    <section id="reasons" className="relative py-24 md:py-32 w-full bg-[#120e16]/40 px-4">
      {/* Decorative bokeh background elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-[1px] w-5 bg-rose-400/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">Why You</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-gradient-rose tracking-wide"
          >
            Reasons I Love You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-love-pink/60 mt-4 max-w-lg mx-auto font-light"
          >
            Though words could never contain all the details, here are a few sparks that keep my fire burning.
          </motion.p>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            
            // Adjust card span for the last item (Everything About You) to cover full width on large screens
            const isLast = index === reasons.length - 1;
            const cardClasses = `glass-card glass-card-hover rounded-3xl relative overflow-hidden border border-white/10 w-full ${
              isLast ? 'lg:col-span-3 lg:max-w-2xl lg:mx-auto' : ''
            }`;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className={cardClasses}
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: reason.floatDuration,
                    delay: reason.floatDelay,
                    ease: 'easeInOut',
                  }}
                  className="p-8 flex flex-col items-center text-center w-full h-full relative z-10"
                >
                  {/* Custom Gradient Background glow backing */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-20 pointer-events-none`} />

                  {/* Glowing light behind the icon */}
                  <div className="absolute -top-12 -left-12 w-28 h-28 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/25 transition-all duration-500 pointer-events-none" />

                  {/* Card Icon */}
                  <div className="relative mb-6 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-love-rose shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl font-bold text-white mb-3 tracking-wide">
                    {reason.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-love-pink/70 leading-relaxed font-light">
                    {reason.description}
                  </p>

                  {/* Sparkle decorative dots */}
                  <div className="absolute bottom-4 right-4 w-1 h-1 bg-white/20 rounded-full" />
                  <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-pink-400/10 rounded-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
