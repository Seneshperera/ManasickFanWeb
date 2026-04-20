import React from 'react';
import { motion } from 'framer-motion';

const Biography = () => {
  const highlights = [
    { year: "2014", event: "Founding Drill Team Westnahira", desc: "Pioneering the raw, gritty sounds of the Colombo Western Province." },
    { year: "2018", event: "The Charitha Attalage Era", desc: "Collaborating on 'Sakura', blending soulful classical elements with aggressive rap." },
    { year: "2024", event: "Execution of Kataka", desc: "Transforming a live concert into a 360° musical documentary 'Behind the Noise'." },
  ];

  return (
    <section className="py-40 px-4 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
        {/* Abstract Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://katakaliveinconcert.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMIT02206-1-scaled.d901eb92.jpg&w=750&q=75')] bg-cover bg-fixed grayscale" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
        
        {/* Left Column: Identity */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-mind-red text-[10px] uppercase font-black tracking-[0.6em] block"
            >
              Hasanka Wickramarathna
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter"
            >
              WHO IS <br /><span className="text-mind-red">MANASICK?</span>
            </motion.h2>
          </div>

          <div className="space-y-8 text-zinc-400 text-lg md:text-xl font-light leading-relaxed select-text">
            <p>
              More than a rapper, <span className="text-white font-bold italic underline decoration-mind-red">Hasanka Wickramarathna</span>—known as Manasick—is the conscious voice of the Sri Lankan underground. Based between Dubai and Colombo, he is a pioneer of the **'Westnahira Drill'** sound.
            </p>
            <p>
              As a founding member of the **Drill Team Westnahira** collective, his lyrical architecture bridges the gap between raw street reality and deep, introspective Sinhalese poetry. Alongside his brothers <span className="text-zinc-200">Drex</span> and <span className="text-zinc-200">D Minor</span>, he has redefined the sonic identity of the island's capital.
            </p>
            <p className="text-zinc-500 italic text-sm">
              "His music isn't heard; it's felt as a psychological pressure—a reflection of the Colombo alleys and the spiritual vows we take to survive them."
            </p>
          </div>

          <div className="flex gap-4 pt-10">
             <div className="flex flex-col">
                <span className="text-white text-3xl font-black italic">60K+</span>
                <span className="text-zinc-600 text-[8px] uppercase tracking-widest">Total Audience Reach</span>
             </div>
             <div className="w-[1px] h-12 bg-zinc-900" />
             <div className="flex flex-col pl-4">
                <span className="text-white text-3xl font-black italic">1,470</span>
                <span className="text-zinc-600 text-[8px] uppercase tracking-widest">Identified Content Entities</span>
             </div>
          </div>
        </div>

        {/* Right Column: Timeline & Highlights */}
        <div className="space-y-20">
            <div className="space-y-12">
            <h3 className="text-zinc-700 text-[10px] uppercase tracking-[1em] font-black italic border-b border-zinc-900 pb-4">The Rebellion Timeline</h3>
            <div className="space-y-16">
                {highlights.map((item, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8 group"
                >
                    <div className="text-mind-red font-black text-2xl italic flex-shrink-0 tabular-nums">{item.year}</div>
                    <div className="space-y-2">
                        <h4 className="text-white text-xl font-black uppercase group-hover:text-mind-red transition-colors">{item.event}</h4>
                        <p className="text-zinc-500 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                </motion.div>
                ))}
            </div>
            </div>

            <div className="p-12 border border-zinc-900 bg-zinc-950/50 backdrop-blur-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <span className="text-8xl font-black">WEST</span>
                </div>
                <h4 className="text-mind-red text-[10px] font-black uppercase tracking-[0.5em] mb-4">Westnahira Identity</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Rooted in the Western Province of Sri Lanka, the sound is a blend of aggressive drill cadences and philosophical Sinhalese verses that address class barriers, unrequited love, and the gritty Colombo underground.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
