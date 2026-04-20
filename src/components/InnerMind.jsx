import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Eye } from 'lucide-react';

const InnerMind = ({ scrollYProgress, onEnterWorld }) => {
  const opacity = useTransform(scrollYProgress, [0.65, 0.8, 1], [0, 1, 1]);

  return (
    <motion.section 
      style={{ opacity }}
      className="min-h-screen flex flex-col justify-center items-center py-40 relative bg-zinc-900/50 overflow-hidden"
    >
        {/* Expanded Atmospheric Light Leaks - More Vivid */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-mind-red/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-red-900/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl w-full text-center space-y-32 relative z-10 px-4">
        
        {/* Portal Entry */}
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <h2 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter">
                    DEEP <span className="text-mind-red">MIND</span>
                </h2>
                <p className="text-zinc-400 uppercase tracking-[0.8em] text-xs">The world beyond the noise</p>
            </motion.div>
            
            <div className="relative flex flex-col items-center justify-center">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative p-1 bg-gradient-to-tr from-mind-red via-red-500 to-zinc-700 rounded-full"
                >
                    <button 
                        onClick={onEnterWorld}
                        className="relative p-24 md:p-32 bg-zinc-900 border border-zinc-800 rounded-full group overflow-hidden flex flex-col items-center justify-center gap-6 shadow-[0_0_80px_rgba(255,0,0,0.2)]"
                    >
                        <div className="absolute inset-0 border border-mind-red/40 rounded-full animate-ping [animation-duration:3s]" />
                        <Eye size={48} className="text-mind-red group-hover:scale-125 transition-transform duration-700 group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)]" />
                        <div className="space-y-2">
                           <span className="block text-white font-black text-xl md:text-2xl tracking-[0.3em] uppercase italic">Enter the Void</span>
                           <span className="block text-zinc-300 text-[10px] uppercase tracking-[0.5em] animate-pulse">Access 3D Memory Nodes</span>
                        </div>
                    </button>
                </motion.div>
            </div>
        </div>
      </div>
    </motion.section>
  );
};

export default InnerMind;
