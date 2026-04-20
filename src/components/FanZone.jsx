import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const FanZone = () => {
  const [emotions, setEmotions] = useState([
    { id: 1, text: "Lost in the 'Sakura' vibe.", emotion: "Reflection" },
    { id: 2, text: "The Colombo streets feel real here.", emotion: "Nostalgia" },
    { id: 3, text: "Straight fire from Westnahira.", emotion: "Energy" },
  ]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("Neutral");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      text: input,
      emotion: mood,
    };
    
    setEmotions([newEntry, ...emotions]);
    setInput("");
  };

  return (
    <section className="py-40 bg-black px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">
            WHAT DID THIS <span className="text-mind-red">MIND</span> MAKE YOU FEEL?
          </h2>
          <p className="text-zinc-500 text-sm">Leave a fragment of your emotion in the void.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Interaction Form */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="p-8 border border-zinc-800 bg-zinc-900/30 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Your Reflection</label>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="..."
                  className="w-full bg-black border border-zinc-700 p-4 text-white focus:border-mind-red outline-none min-h-[150px] transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Pick a Vibe</label>
                <div className="flex flex-wrap gap-2">
                  {["Reflection", "Rage", "Sad", "Atmospheric", "Hype"].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setMood(v)}
                      className={`px-4 py-1 text-[10px] uppercase border transition-all ${mood === v ? 'bg-mind-red border-mind-red text-white' : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-mind-red hover:text-white transition-all"
              >
                Send into the Void <Send size={16} />
              </button>
            </form>
          </motion.div>

          {/* Emotion Stream */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
            <AnimatePresence>
              {emotions.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-6 border border-zinc-900 bg-zinc-900/10 backdrop-blur-sm space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-mind-red">{entry.emotion}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  </div>
                  <p className="text-zinc-300 text-sm italic font-light">"{entry.text}"</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-40 text-center text-[10px] text-zinc-800 uppercase tracking-[1em] select-none">
        MANASICK ENTER THE MIND © 2026
      </div>
    </section>
  );
};

export default FanZone;
