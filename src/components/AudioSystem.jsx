import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const AudioSystem = () => {
  const heartbeat = useRef(null);
  const ambience = useRef(null);

  useEffect(() => {
    // Create heartbeat sound
    heartbeat.current = new Howl({
      src: ['https://cdn.pixabay.com/audio/2022/03/24/audio_7313a0c4f4.mp3'], // Generic heartbeat
      loop: true,
      volume: 0.2
    });

    // Ambient rain/city sounds
    ambience.current = new Howl({
      src: ['https://cdn.pixabay.com/audio/2021/08/09/audio_82c23101d2.mp3'], // Rain/nature
      loop: true,
      volume: 0.1
    });

    heartbeat.current.play();
    ambience.current.play();

    return () => {
      heartbeat.current.stop();
      ambience.current.stop();
    }
  }, []);

  return null; // This component handles audio globally
};

export default AudioSystem;
