import React from 'react';
import { motion } from 'framer-motion';

const StatCounter = ({ value, label, suffix = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm group hover:border-mind-red transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black text-white tracking-tighter"
      >
        {value}{suffix}
      </motion.div>
      <div className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mt-2 font-bold group-hover:text-mind-red transition-colors whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};

const RadarChart = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  
  const labels = Object.keys(data);
  const angleStep = (Math.PI * 2) / labels.length;

  const points = labels.map((label, i) => {
    const val = data[label];
    const x = center + radius * val * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + radius * val * Math.sin(i * angleStep - Math.PI / 2);
    return { x, y, label };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * r}
            fill="none"
            stroke="#18181b"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis Lines */}
        {labels.map((_, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(i * angleStep - Math.PI / 2)}
            y2={center + radius * Math.sin(i * angleStep - Math.PI / 2)}
            stroke="#18181b"
            strokeWidth="1"
          />
        ))}

        {/* Data Shape */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={pathData}
          fill="rgba(255, 0, 0, 0.3)"
          stroke="#ff0000"
          strokeWidth="2"
        />

        {/* Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={center + (radius + 25) * Math.cos(i * angleStep - Math.PI / 2)}
            y={center + (radius + 25) * Math.sin(i * angleStep - Math.PI / 2)}
            fill="#52525b"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
            className="uppercase tracking-widest font-sans"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

const ArtistAnalytics = () => {
  const audioFeatures = {
    Loudness: 0.85,
    Acousticness: 0.15,
    Danceability: 0.65,
    Energy: 0.55,
    Instrumental: 0.05,
    Liveness: 0.25,
    Valence: 0.40,
    Speechiness: 0.30
  };

  const stats = [
    { value: "53.2", label: "Monthly Listeners", suffix: "K" },
    { value: "3.05", label: "YouTube Views", suffix: "M" },
    { value: "60.4", label: "Total Audience", suffix: "K" },
    { value: "1.4", label: "Track Entries", suffix: "K" }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-black border-y border-zinc-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-mind-red to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-20">
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            THE <span className="text-mind-red">ANALYTICS</span> OF MIND
          </motion.h2>
          <p className="text-zinc-600 uppercase tracking-[0.8em] text-[10px]">Real-time data driven identity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
          {/* Radar Chart Section */}
          <div className="space-y-12 flex flex-col items-center lg:items-end text-right">
             <div className="relative">
                <RadarChart data={audioFeatures} />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 w-full text-center lg:text-right">
                   <h3 className="text-white text-xl font-black uppercase tracking-widest mb-2 italic">Audio Features Profile</h3>
                   <p className="text-zinc-500 text-[10px] uppercase tracking-widest max-w-xs ml-auto">
                     A mapping of the Westnahira sonic architecture. Dominant loudness and danceability define the pressure of the streets.
                   </p>
                </div>
             </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {stats.map((stat, i) => (
              <StatCounter key={i} {...stat} />
            ))}
            <div className="col-span-2 p-6 border border-zinc-900 bg-mind-red/5 flex flex-col items-center justify-center text-center">
               <span className="text-mind-red text-[10px] font-black uppercase tracking-[0.5em] mb-2 px-2">Top Performer</span>
               <h4 className="text-white text-xl font-black uppercase tracking-tighter italic">"Deviyange Bare"</h4>
               <p className="text-zinc-500 text-[8px] uppercase tracking-widest mt-1">41% Global Popularity Rating</p>
            </div>
          </div>
        </div>

        <div className="pt-20 opacity-20 flex items-center gap-4">
           <span className="text-[8px] uppercase tracking-widest text-zinc-500">Source Verification: Songstats Artist Analytics</span>
           <div className="w-[1px] h-4 bg-zinc-800" />
           <span className="text-[8px] uppercase tracking-widest text-zinc-500 hover:text-mind-red transition-colors cursor-pointer">View Artist Stats Page</span>
        </div>
      </div>
    </section>
  );
};

export default ArtistAnalytics;
