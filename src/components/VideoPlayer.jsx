import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const VideoPlayer = ({ video, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <div className="absolute top-10 right-10">
        <button 
          onClick={onClose}
          className="p-2 border border-white/20 hover:border-mind-red transition-colors text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="w-full max-w-5xl aspect-video relative group">
        <div className="absolute -inset-1 bg-mind-red opacity-10 blur-xl group-hover:opacity-30 transition-opacity" />
        <iframe
          src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border border-zinc-800 relative z-10"
        />
        
        <div className="absolute -bottom-12 left-0 text-left">
            <h2 className="text-2xl font-black uppercase text-mind-red tracking-widest">{video.title}</h2>
            <p className="text-zinc-500 text-xs italic uppercase">Official Release</p>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
