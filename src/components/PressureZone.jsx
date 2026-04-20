import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const bars = [
  {
    sinhala: "මතකයි අද වැනි දවසක\nසැමරුවා උපන්දින සාදය අප\nසල්ලිම ජීවිතේ වුණේ විඳවන්නද",
    english: "I remember a day like today\nWe celebrated your birthday party\nMoney became life just to suffer?",
    track: "Deviyange Bare"
  },
  {
    sinhala: "උඹ හිත හොරා කෑවා, දෑස සැණින් සිර බාර වී\nගොදුරක් කරන් උඹේ පාරමී හිතේ හදිස්සිය!",
    english: "You stole my heart, imprisoned in a second\nMaking your paramitas a prey, the heart's urgency!",
    track: "Aruma"
  },
  {
    sinhala: "නීතියක් බිදිලා මේ පණ යන දවසක, අලුත් නීතියක් ඉතිරි වෙලා.\nහිටි හැටියෙම විදිද්දී උඹ ඒක ගනීවිද?",
    english: "A law has been broken on this life-threatening day\nWill you take it as it strikes?",
    track: "Billa"
  }
];

const PressureZone = ({ scrollYProgress }) => {
  const [currentBar, setCurrentBar] = useState(0);
  const opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.35, 0.55], [0.9, 1]);

  const nextBar = () => setCurrentBar((prev) => (prev + 1) % bars.length);
  const prevBar = () => setCurrentBar((prev) => (prev - 1 + bars.length) % bars.length);

  return (
    <motion.section 
      style={{ opacity, scale }}
      className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-black/80"
    >
      <div className="absolute inset-0 z-0 opacity-5 flex items-center justify-center pointer-events-none">
        <h2 className="text-[25vw] font-black uppercase text-white/10 select-none">PRESSURE</h2>
      </div>

      <div className="max-w-5xl w-full relative z-10 space-y-16">
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
          >
            BARS OF <span className="text-mind-red">PRESSURE</span>
          </motion.h2>
          <p className="text-zinc-600 uppercase tracking-[0.8em] text-xs">Real rhymes from the Westnahira voice</p>
        </div>

        <div className="relative group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBar}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="p-12 md:p-20 border border-zinc-900 bg-zinc-950/50 backdrop-blur-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-black italic">"{bars[currentBar].track}"</span>
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-5xl font-sinhala leading-relaxed text-white">
                    {bars[currentBar].sinhala.split('\n').map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>
                </div>
                <div className="h-[1px] w-12 bg-mind-red" />
                <p className="text-zinc-500 italic text-xl font-light">
                  "{bars[currentBar].english}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-10">
            <button onClick={prevBar} className="p-4 bg-zinc-900 border border-zinc-800 text-white hover:bg-mind-red transition-all">
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-10">
            <button onClick={nextBar} className="p-4 bg-zinc-900 border border-zinc-800 text-white hover:bg-mind-red transition-all">
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4">
            {bars.map((_, i) => (
                <div 
                    key={i} 
                    className={`w-12 h-1 ${currentBar === i ? 'bg-mind-red' : 'bg-zinc-800'} transition-colors cursor-pointer`}
                    onClick={() => setCurrentBar(i)}
                />
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PressureZone;
