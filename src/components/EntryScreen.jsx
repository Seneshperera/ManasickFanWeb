import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const EntryScreen = ({ onEnter }) => {
  const [pulse, setPulse] = useState(1);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p === 1 ? 1.2 : 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ scale: 2, opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Pulse */}
      <motion.div 
        animate={{ scale: pulse, opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-mind-red rounded-full blur-[120px]"
      />

      <div className="relative z-10 text-center space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-gray-500 uppercase tracking-[0.5em] text-xs md:text-sm">
            You are about to enter a mind...
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            MANASICK
          </h1>
          <p className="text-mind-red font-light italic text-lg md:text-xl">
            "This is not just music."
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-center pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="group relative px-10 py-4 bg-mind-red text-white font-bold tracking-widest uppercase text-sm overflow-hidden"
          >
            <span className="relative z-10">Enter the Mind</span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
            />
            <div className="absolute inset-0 red-glow" />
          </motion.button>

          <button 
            onMouseEnter={() => setShowExitConfirm(true)}
            onMouseLeave={() => setShowExitConfirm(false)}
            className="px-10 py-4 border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-all uppercase text-sm tracking-widest"
          >
            {showExitConfirm ? "No Escape" : "Exit"}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
        <Heart className="text-mind-red animate-pulse" size={20} fill="currentColor" />
        <span className="text-[10px] tracking-[0.3em] uppercase">Heartbeat Sync Active</span>
      </div>
    </motion.div>
  );
};

export default EntryScreen;
