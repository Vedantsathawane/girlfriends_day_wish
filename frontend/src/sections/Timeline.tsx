import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MessageSquareHeart, 
  Smile, 
  Camera, 
  HeartHandshake, 
  CalendarDays, 
  Infinity as InfinityIcon,
  Heart
} from 'lucide-react';

interface TimelineEvent {
  title: string;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  animationDelay: number;
}

const timelineEvents: TimelineEvent[] = [
  {
    title: "How We Met",
    date: "The Spark of Destiny",
    icon: Sparkles,
    description: "It was a day that started like any other, but everything changed the moment our paths crossed. A simple glance, a quiet curiosity, and the universe shifting in our favor. It was the beautiful beginning of a connection that felt like coming home.",
    animationDelay: 0.1
  },
  {
    title: "Our First Conversation",
    date: "Hours Felt Like Minutes",
    icon: MessageSquareHeart,
    description: "What began as small talk quickly blossomed into something magical. We shared laughter, traded stories, and stayed up talking about things we never told anyone else. The words flowed effortlessly, and I remember thinking I never wanted the chat to end.",
    animationDelay: 0.2
  },
  {
    title: "Our First Smile",
    date: "The Moment Time Stood Still",
    icon: Smile,
    description: "When I saw you smile genuine, bright, and happy—my heart skipped a beat. It was the kind of smile that heals, that lights up dark rooms, and makes everything else fade into the background. I knew right then I wanted to protect that smile forever.",
    animationDelay: 0.3
  },
  {
    title: "We Started Dating",
    date: "September 27, 2026",
    icon: Heart,
    description: "The magical day our official journey began. Hand in hand, we promised to walk together, sharing all of life's seasons, laughs, and dreams. It was the beginning of our forever.",
    animationDelay: 0.35
  },
  {
    title: "Our Favorite Memories",
    date: "Our Shared Adventures",
    icon: Camera,
    description: "From cozy rainy day movie marathons and late-night food runs to deep conversations under starry skies. Each memory is a Polaroid picture in my heart. It's not about where we went, but the laughter and closeness we experienced along the way.",
    animationDelay: 0.4
  },
  {
    title: "The Day I Knew",
    date: "When You Became My Home",
    icon: HeartHandshake,
    description: "It wasn't a grand gesture, but a quiet, beautiful moment where I looked at you and realized my life was completely incomplete without you. You were the peace in my chaos, my first thought in the morning, and the person I wanted to share every sunset with.",
    animationDelay: 0.5
  },
  {
    title: "Today",
    date: "Stronger & Deeper Than Ever",
    icon: CalendarDays,
    description: "Today, I stand here loving you even more than yesterday. Every single conversation, text message, inside joke, and shared hurdle has woven our souls closer. You are my favorite habit, my best friend, and the love of my life.",
    animationDelay: 0.6
  },
  {
    title: "Future Together",
    date: "To Infinity and Beyond",
    icon: InfinityIcon,
    description: "Our story has only just begun. I look forward to building a lifetime of adventures, laughs, quiet mornings, and dreams fulfilled. No matter where the road takes us, I promise to walk hand-in-hand with you, today, tomorrow, and forever.",
    animationDelay: 0.7
  }
];

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-24 md:py-32 w-full bg-[#120e16]/50 px-4">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

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
            <span className="text-xs uppercase tracking-[0.25em] text-love-rose font-semibold">Our Journey</span>
            <span className="h-[1px] w-5 bg-rose-400/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-gradient-rose tracking-wide"
          >
            The Timeline of Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-love-pink/60 mt-4 max-w-lg mx-auto font-light"
          >
            Every step we took led me to you, and it remains the best path I have ever walked.
          </motion.p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative">
          
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-rose-500/10 via-purple-500/40 to-pink-500/10 -translate-x-[1px]" />

          {/* Timeline Cards */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              const Icon = event.icon;

              return (
                <div 
                  key={event.title} 
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Point Indicator */}
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-[#120e16] border-2 border-rose-400 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(251,113,133,0.5)]">
                    <Icon className="w-3.5 h-3.5 text-love-rose" />
                  </div>

                  {/* Left spacer for desktop, padding-left for mobile */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? 40 : -40,
                        y: 10
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        y: 0
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="glass-card glass-card-hover rounded-3xl p-6 md:p-8 text-left relative"
                    >
                      {/* Date tag */}
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-300/80 mb-2 block">
                        {event.date}
                      </span>
                      
                      {/* Event Title */}
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-3">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-love-pink/80 leading-relaxed font-light">
                        {event.description}
                      </p>

                      {/* Accent highlight strip */}
                      <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-rose-400 to-purple-500 rounded-l-3xl" />
                    </motion.div>
                  </div>

                  {/* Right spacer for desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
