'use client';
import { useEffect, useRef } from 'react';

export default function SpaceAudio({ isActive }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    if (!isActive) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.5);
      }
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
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

        // 1. Deep Rumble
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 80;
        noiseFilter.Q.value = 1;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 4.0;

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noisfUrc.start();

        // 2. Eerie Space Drone
        const createDrone = (freq, vol) => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.value = freq;
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = freq * 1.5;

          const lfo = ctx.createOscillator();
          lfo.type = 'sine';
          lfo.frequency.value = 0.05 + Math.random() * 0.05;
          const lfoGain = ctx.createGain();
          lfoGain.gain.value = freq * 0.5;
          lfo.connect(lfoGain);
          lfoGain.connect(filter.frequency);
          
          const gain = ctx.createGain();
          gain.gain.value = vol;

          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : ctx.createGain();
          if (panner.pan) panner.pan.value = (Math.random() - 0.5) * 0.5;

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(panner);
          panner.connect(masterGain);
          
          osc.start();
          lfo.start();
        };

        createDrone(55.0, 0.4);
        createDrone(82.4, 0.3);
        createDrone(110.0, 0.2);

        // 3. Comet Flyby
        const cometNoiseGain = ctx.createGain();
        cometNoiseGain.gain.value = 0;

        let cometPanner = masterGain;
        if (ctx.createStereoPanner) {
          cometPanner = ctx.createStereoPanner();
          cometNoiseGain.connect(cometPanner);
          cometPanner.connect(masterGain);
        } else {
          cometNoiseGain.connect(masterGain);
        }

        const cometFilter = ctx.createBiquadFilter();
        cometFilter.type = 'bandpass';
        cometFilter.Q.value = 2;

        noiseSrc.connect(cometFilter);
        cometFilter.connect(cometNoiseGain);

        const playComet = () => {
          if (masterGain.gain.value < 0.1) return;
          const t = ctx.currentTime;
          
          const startPan = Math.random() > 0.5 ? 1 : -1;
          if (cometPanner.pan) {
            cometPanner.pan.setValueAtTime(startPan, t);
            cometPanner.pan.linearRampToValueAtTime(-startPan, t + 2.5);
          }

          cometFilter.frequency.setValueAtTime(3000, t);
          cometFilter.frequency.exponentialRampToValueAtTime(150, t + 2.5);

          cometNoiseGain.gain.setValueAtTime(0, t);
          cometNoiseGain.gain.linearRampToValueAtTime(2.0, t + 0.8);
          cometNoiseGain.gain.linearRampToValueAtTime(0, t + 2.5);

          const nextTimeout = setTimeout(playComet, (Math.random() * 8000) + 5000);
          timeoutRefs.current.push(nextTimeout);
        };
        
        const initialTimeout = setTimeout(playComet, (Math.random() * 3000) + 3000);
        timeoutRefs.current.push(initialTimeout);
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
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
