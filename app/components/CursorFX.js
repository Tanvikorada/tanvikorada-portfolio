'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFX() {
  const audioCtx = useRef(null);
  const [isFine, setIsFine] = useState(false);

  // MagicUI Smooth Trailing Cursor logic
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only on fine pointer (desktop)
    const checkFine = window.matchMedia('(pointer: fine)').matches;
    setIsFine(checkFine);
    if (!checkFine) return;

    // Track cursor position
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Click sound + spark
    const playClick = (e) => {
      // Skip audio if clicking on the Spline canvas
      const isCanvas = e.target.tagName && e.target.tagName.toUpperCase() === 'CANVAS';
      
      // Sound: A softer, dual-tone "chime" or "glass tap"
      try {
        if (true) {
          if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
          }
          const ctx = audioCtx.current;
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
        
          // Tone 1
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(1200, ctx.currentTime);
          osc1.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
          gain1.gain.setValueAtTime(0.05, ctx.currentTime);
          gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start(ctx.currentTime);
          osc1.stop(ctx.currentTime + 0.1);

          // Tone 2
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(2400, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.08);
          gain2.gain.setValueAtTime(0.03, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(ctx.currentTime);
          osc2.stop(ctx.currentTime + 0.08);
        }
      } catch (err) { /* ignore */ }

      // Sparks
      spawnRipple(e.clientX, e.clientY);
    };

    window.addEventListener('click', playClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', playClick);
    };
  }, []);

  function spawnRipple(x, y) {
    // 1. Expanding Ring
    const ring = document.createElement('div');
    Object.assign(ring.style, {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      border: '2px solid var(--accent)',
      pointerEvents: 'none',
      zIndex: '99998',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
      opacity: '0.8',
    });
    document.body.appendChild(ring);
    
    requestAnimationFrame(() => {
      ring.style.transform = 'translate(-50%, -50%) scale(5)';
      ring.style.opacity = '0';
    });
    setTimeout(() => ring.remove(), 500);

    // 2. Diamond Sparks
    const COUNT = 4;
    for (let i = 0; i < COUNT; i++) {
      const spark = document.createElement('div');
      const angle = (360 / COUNT) * i + 45; // Cross shape
      const dist = 30 + Math.random() * 10;
      const rad = (angle * Math.PI) / 180;
      const dx = Math.cos(rad) * dist;
      const dy = Math.sin(rad) * dist;

      Object.assign(spark.style, {
        position: 'fixed',
        left: x + 'px',
        top: y + 'px',
        width: '6px',
        height: '6px',
        background: 'var(--gold)',
        pointerEvents: 'none',
        zIndex: '99998',
        transform: 'translate(-50%, -50%) rotate(45deg)', // Diamond
        transition: `transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease`,
        opacity: '1',
      });

      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(135deg) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 450);
    }
  }

  if (!isFine) return null;

  return (
    <>
      <style>{`
        .smooth-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(14, 165, 233, 0.05);
          border: 1px solid var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
          pointer-events: none;
          z-index: 99999;
          transform-origin: center;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          /* mix-blend-mode: difference; */
        }
        /* Hide default cursor to just show the trail dot */
        body {
          cursor: none;
        }
        /* Restore pointer for links, buttons */
        a, button, [role="button"], input, select, textarea {
          cursor: pointer;
        }
      `}</style>
      <motion.div 
        className="smooth-cursor"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }} 
      />
    </>
  );
}
