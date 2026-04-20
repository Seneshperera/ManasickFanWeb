import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, Camera, ExternalLink, Heart } from 'lucide-react';

const artistPhotos = [
  {
    url: "https://images.genius.com/8040bafbddfa532052c3258ba3ff22fc.1000x1000x1.jpg",
    title: "Official Portrait",
    desc: "The face of Westnahira Drill."
  },
  {
    url: "https://images.unsplash.com/photo-1598027725944-77e8ca37fc1e?q=80&w=1000&auto=format&fit=crop",
    title: "Live on Tour",
    desc: "Dominating the Taprobane stage."
  },
  {
    url: "https://images.unsplash.com/photo-1516280440502-8618c7d612e3?q=80&w=1000&auto=format&fit=crop",
    title: "Behind the Noise",
    desc: "Introspective moments during Kataka."
  },
  {
    url: "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?q=80&w=1000&auto=format&fit=crop",
    title: "Studio Session",
    desc: "A moment of psychological depth."
  },
  {
    url: "https://images.unsplash.com/photo-1540039155732-d674d40d12e8?q=80&w=1000&auto=format&fit=crop",
    title: "Stage Presence",
    desc: "Connecting with the Colombo underground."
  },
  {
    url: "https://images.unsplash.com/photo-1493225457124-a1a2a4f40f0c?q=80&w=1000&auto=format&fit=crop",
    title: "Vibes Only",
    desc: "The energy of the Wickramarathna brothers."
  }
];

const ArtistGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="py-40 relative bg-[#0a0a0a] overflow-hidden border-t border-zinc-900" id="media-gallery">
       {/* Vibrant Atmospheric Accents - Making it pop */}
       <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-mind-red/20 rounded-full blur-[180px] pointer-events-none" />
       <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-zinc-100/5 rounded-full blur-[150px] pointer-events-none" />

       <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
             <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-mind-red mb-4"
                >
                   <Camera size={18} />
                   <span className="text-[10px] uppercase font-black tracking-[0.5em]">The Visual Archive</span>
                </motion.div>
                <h2 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                  ARTIST <br /><span className="text-mind-red italic">SPOTLIGHT</span>
                </h2>
             </div>
             <p className="text-zinc-500 text-lg md:text-xl font-light italic max-w-sm border-l-2 border-mind-red pl-8">
               "A fan-curated collection of moments, portraits, and the raw energy of Hasanka Wickramarathna."
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {artistPhotos.map((photo, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 whileHover={{ y: -10 }}
                 onClick={() => setSelectedImg(photo)}
                 className="group relative h-[500px] bg-zinc-900 overflow-hidden cursor-pointer border border-zinc-800 hover:border-mind-red shadow-2xl transition-all"
               >
                  {/* Photo with high brightness and no dark gradient override */}
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-full object-cover brightness-105 group-hover:scale-110 group-hover:brightness-125 transition-all duration-700"
                  />
                  
                  {/* Glassmorphic Info Card */}
                  <div className="absolute inset-x-4 bottom-4 p-6 bg-black/40 backdrop-blur-md border border-white/5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-black uppercase tracking-tight text-xl">{photo.title}</h4>
                        <Heart size={16} className="text-mind-red fill-mind-red" />
                     </div>
                     <p className="text-zinc-400 text-[10px] uppercase tracking-widest">{photo.desc}</p>
                  </div>

                  {/* Top-Right Action */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="bg-mind-red text-white p-2 rounded-full shadow-xl">
                        <ZoomIn size={16} />
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 flex justify-center"
          >
             <button className="px-10 py-4 border border-zinc-800 text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-white hover:text-black transition-all flex items-center gap-4 group">
                Access Full Fan Archive
                <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </button>
          </motion.div>
       </div>

       {/* Full Screen Modal */}
       <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[700] bg-zinc-950/98 backdrop-blur-3xl flex items-center justify-center p-4"
              onClick={() => setSelectedImg(null)}
            >
               <button className="absolute top-10 right-10 text-white hover:text-mind-red transition-all transform hover:rotate-90">
                  <X size={48} strokeWidth={1} />
               </button>
               
               <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 items-center">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-1 h-[80vh]"
                  >
                     <img 
                        src={selectedImg.url} 
                        alt={selectedImg.title} 
                        className="w-full h-full object-contain shadow-[0_0_100px_rgba(255,0,0,0.2)] border border-white/10" 
                     />
                  </motion.div>

                  <div className="md:w-80 space-y-8 text-left">
                     <span className="text-mind-red text-[10px] font-black uppercase tracking-[0.5em]">Fan Archive Entry</span>
                     <h3 className="text-white text-5xl font-black uppercase tracking-tighter leading-none">{selectedImg.title}</h3>
                     <p className="text-zinc-400 font-light leading-relaxed italic">{selectedImg.desc}</p>
                     <div className="pt-8 border-t border-zinc-800">
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Captured Moment</p>
                        <p className="text-zinc-300 text-xs mt-2 font-mono">Archive_Ref: MSK_2024_01</p>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
       </AnimatePresence>
    </section>
  );
};

export default ArtistGallery;
