import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import EntryScreen from './components/EntryScreen';
import SurfaceLayer from './components/SurfaceLayer';
import PressureZone from './components/PressureZone';
import InnerMind from './components/InnerMind';
import AudioSystem from './components/AudioSystem';
import Biography from './components/Biography';
import FanZone from './components/FanZone';
import MindSpace from './components/MindSpace';
import VideoPlayer from './components/VideoPlayer';
import MindJourney from './components/MindJourney';
import ArtistAnalytics from './components/ArtistAnalytics';
import ArtistGallery from './components/ArtistGallery';

const App = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isInsideMind, setIsInsideMind] = useState(false);
  const [initialMindTrack, setInitialMindTrack] = useState(null);
  const [showSplash, setShowSplash] = useState(false);
  const [globalMood, setGlobalMood] = useState('neutral');
  const [activeVideo, setActiveVideo] = useState(null);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const blurAmount = useTransform(scrollYProgress, [0, 0.4, 0.8], ["0px", "4px", "12px"]);
  const mindSpaceOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  useEffect(() => {
    if (hasEntered) {
      setShowSplash(true);
      const timer = setTimeout(() => setShowSplash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasEntered]);

  useEffect(() => {
    if (isInsideMind) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isInsideMind]);

  return (
    <div className="relative bg-black min-h-screen text-white overflow-x-hidden selection:bg-mind-red selection:text-white">
      {/* Visual Overlays */}
      <div className="grain-overlay" />
      <div className="smoke-container">
        <div className="smoke-layer" />
      </div>

      {/* 3D Mind Space Background */}
      <motion.div style={{ opacity: mindSpaceOpacity }} className="fixed inset-0 z-0">
        <MindSpace />
      </motion.div>

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <EntryScreen key="entry" onEnter={() => setHasEntered(true)} />
        ) : showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          >
            <motion.div 
              initial={{ filter: "blur(20px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 0.4 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-[url('https://images.genius.com/8040bafbddfa532052c3258ba3ff22fc.1000x1000x1.jpg')] bg-cover bg-center grayscale"
            />
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-mind-red font-black text-6xl md:text-8xl tracking-tighter uppercase italic glitch-text" data-text="WESTNAHIRA">
                WESTNAHIRA
              </h2>
              <p className="text-zinc-500 uppercase tracking-[1em] text-xs">Sri Lankan Hip-Hop Identity</p>
            </div>
          </motion.div>
        ) : (
          !isInsideMind ? (
            <motion.main
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              ref={containerRef}
              className="relative z-10"
            >
              <AudioSystem />
              
              <div className="relative">
                <SurfaceLayer 
                  scrollYProgress={scrollYProgress} 
                  onMoodChange={setGlobalMood} 
                  onPlayTrack={setActiveVideo}
                  onViewLyrics={(track) => {
                    setInitialMindTrack(track);
                    setIsInsideMind(true);
                  }}
                />
                <ArtistAnalytics />
                <PressureZone scrollYProgress={scrollYProgress} />
                <InnerMind scrollYProgress={scrollYProgress} onEnterWorld={() => {
                  setInitialMindTrack(null);
                  setIsInsideMind(true);
                }} />
                <Biography />
                <ArtistGallery />
                <FanZone />
              </div>

              {/* Video Player Modal */}
              <AnimatePresence>
                {activeVideo && (
                  <VideoPlayer 
                    video={activeVideo} 
                    onClose={() => setActiveVideo(null)} 
                  />
                )}
              </AnimatePresence>

              <motion.div 
                style={{ backdropFilter: `blur(${blurAmount})` }}
                className="fixed inset-0 pointer-events-none z-50 transition-all duration-300"
              />
            </motion.main>
          ) : (
            <MindJourney 
              key="mind-journey"
              initialTrack={initialMindTrack}
              onClose={() => {
                setIsInsideMind(false);
                setInitialMindTrack(null);
              }} 
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
