'use client';
import { useEffect, useRef } from 'react';

export default function SpaceAudio({ isActive }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.5);
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

        // 1. Deep Rumble (Pink/White noise through Lowpass)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1; // White noise
        }
        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 80; // Very low rumble
        noiseFilter.Q.value = 1;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 4.0; // Boost rumble

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noisfUrc.start();

        // 2. Eerie Space Drone (Oscillators)
        const createDrone = (freq, vol) => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.value = freq;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = freq * 1.5;

          const lfo = ctx.createOscillator();
          lfo.type = 'sine';
          lfo.frequency.value = 0.05 + Math.random() * 0.05; // Slow sweep
          const lfoGain = ctx.createGain();
          lfoGain.gain.value = freq * 0.5;
          lfo.connect(lfoGain);
          lfoGain.connect(filter.frequency);

          const gain = ctx.createGain();
          gain.gain.value = vol;

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(masterGain);

          osc.start();
          lfo.start();
        };

        createDrone(55.0, 0.4); // Low A
        createDrone(82.4, 0.3); // Low E
        createDrone(110.0, 0.2); // A
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      // Fast fade in (1.5 second)
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.7, audioCtxRef.current.currentTime + 1.5);
      }
    };

    const handleInteraction = () => {
      if (isActive) initAudio();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('mousemove', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    try {
      initAudio();
    } catch (e) {}

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isActive]);

  return null;
}
