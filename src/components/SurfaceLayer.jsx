import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

const songs = [
  { title: "Deviyange Bare", stats: "41% Popularity", mood: "Hype", youtube_id: "-Yj1At289rw" },
  { title: "Sakura", stats: "19.3M Total Streams", mood: "Atmospheric", youtube_id: "RdF4wUPhAcg" },
  { title: "Aruma", stats: "Live Hit", mood: "Live", youtube_id: "_2CPzbCAS4A" },
  { title: "Billa", stats: "Hard Hitting", mood: "Rage", youtube_id: "goMy1mQSsB0" },
];

const SurfaceLayer = ({ scrollYProgress, onMoodChange, onPlayTrack, onViewLyrics }) => {
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);

  return (
    <motion.section 
      style={{ y, opacity }}
      className="min-h-screen flex flex-col justify-center items-center px-4 pt-40 pb-60 relative"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="relative">
            <motion.div
               initial={{ opacity: 0, scale: 1.1 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="absolute -top-20 -left-10 w-96 h-96 bg-[url('https://images.genius.com/8040bafbddfa532052c3258ba3ff22fc.1000x1000x1.jpg')] bg-cover bg-center grayscale opacity-10 blur-sm -z-10"
            />
            <motion.h2 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter"
            >
              THE <span className="text-mind-red">PUBLIC</span><br />IDENTITY
            </motion.h2>
          </div>
          
          <p className="text-zinc-400 text-xl max-w-md leading-relaxed selection:bg-white selection:text-black font-light italic">
            Defining the "Westnahira" identity. From the first Sinhalese rap song "Zorro" to the anthems of the streets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          {songs.map((song, i) => (
            <motion.div
              key={song.title}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => onMoodChange(song.mood.toLowerCase())}
              onMouseLeave={() => onMoodChange('neutral')}
              whileHover={{ x: 10, backgroundColor: "rgba(255, 0, 0, 0.1)" }}
              className="p-8 border border-zinc-900 bg-zinc-950/80 backdrop-blur-md group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-mind-red scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onPlayTrack(song); }}
                      className="w-12 h-12 flex items-center justify-center border border-zinc-800 group-hover:border-mind-red transition-colors bg-black"
                    >
                        <Play size={20} className="text-zinc-600 group-hover:text-mind-red transition-colors" />
                    </button>
                    <div>
                        <span className="text-[10px] uppercase text-zinc-500 tracking-[0.4em] mb-1 block">{song.mood}</span>
                        <h3 className="text-3xl font-black uppercase group-hover:text-mind-red transition-colors tracking-tighter">{song.title}</h3>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-zinc-600 font-mono tracking-widest">{song.stats}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onViewLyrics(song); }}
                    className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white hover:border-white transition-all"
                  >
                    Lyrics
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Centered Scroll Indicator - Now with safe padding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 group pointer-events-none">
        <div className="relative">
           <motion.div 
             animate={{ opacity: [0.2, 0.6, 0.2] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute -inset-4 bg-mind-red/5 blur-xl rounded-full"
           />
           <span className="text-[10px] uppercase tracking-[0.8em] font-black text-mind-red animate-pulse">Enter Pressure Zone</span>
        </div>
        <div className="flex flex-col items-center gap-2">
           <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-20 bg-gradient-to-b from-mind-red via-mind-red to-transparent" 
           />
           <div className="w-1 h-1 rounded-full bg-mind-red" />
        </div>
      </div>
    </motion.section>
  );
};

export default SurfaceLayer;
