'use client';
import { useEffect, useRef } from 'react';

export default function SpaceAudio({ isActive }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    // If not active, fade out
    if (!isActive) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 1);
      }
      return;
    }

    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // 1. Deep Space Drone (Low Sine)
        const drone = ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.value = 45; // Very low sub-bass

        // 2. Mid Rumble (Triangle)
        const rumble = ctx.createOscillator();
        rumble.type = 'triangle';
        rumble.frequency.value = 65;

        // 3. Eerie Harmonics (Sine with LFO)
        const harmonic = ctx.createOscillator();
        harmonic.type = 'sine';
        harmonic.frequency.value = 150;
        
        const harmonicLfo = ctx.createOscillator();
        harmonicLfo.type = 'sine';
        harmonicLfo.frequency.value = 0.1; // Slow sweep
        const harmonicLfoGain = ctx.createGain();
        harmonicLfoGain.gain.value = 20;
        harmonicLfo.connect(harmonicLfoGain);
        harmonicLfoGain.connect(harmonic.frequency);

        // Lowpass filter for the mix to muffle it (sounds like deep space)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 300; // Muffled

        const filterLfo = ctx.createOscillator();
        filterLfo.type = 'sine';
        filterLfo.frequency.value = 0.05; // Very slow filter sweep
        const filterLfoGain = ctx.createGain();
        filterLfoGain.gain.value = 150;
        filterLfo.connect(filterLfoGain);
        filterLfoGain.connect(filter.frequency);

        drone.connect(filter);
        rumble.connect(filter);
        harmonic.connect(filter);
        filter.connect(masterGain);

        drone.start();
        rumble.start();
        harmonic.start();
        harmonicLfo.start();
        filterLfo.start();

        nodesRef.current = [drone, rumble, harmonic, harmonicLfo, filterLfo];
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      // Fade in gracefully
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.5, audioCtxRef.current.currentTime, 2);
      }
    };

    const handleInteraction = () => {
      if (isActive) initAudio();
    };

    // Browsers block autoplay until interaction.
    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('mousemove', handleInteraction, { once: true });

    // Try initializing right away (might work if user already interacted)
    try {
      initAudio();
    } catch (e) {}

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
    };
  }, [isActive]);

  return null;
}
