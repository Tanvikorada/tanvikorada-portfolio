'use client';
import { useEffect, useRef } from 'react';

export default function CursorFX() {
  const dotRef = useRef(null);
  const audioCtx = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Only on fine pointer (desktop)
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) { dot.style.display = 'none'; return; }

    // Track cursor position
    const onMove = (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Click sound + spark
    const playClick = (e) => {
      // Sound
      try {
        if (!audioCtx.current) {
          audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      } catch (err) { /* ignore */ }

      // Sparks
      spawnSparks(e.clientX, e.clientY);
    };

    window.addEventListener('click', playClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', playClick);
    };
  }, []);

  function spawnSparks(x, y) {
    const COUNT = 8;
    for (let i = 0; i < COUNT; i++) {
      const spark = document.createElement('div');
      const angle = (360 / COUNT) * i;
      const dist = 28 + Math.random() * 20;
      const rad = (angle * Math.PI) / 180;
      const dx = Math.cos(rad) * dist;
      const dy = Math.sin(rad) * dist;
      const hue = 260 + Math.random() * 60; // violet-pink range

      Object.assign(spark.style, {
        position: 'fixed',
        left: x + 'px',
        top: y + 'px',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: `hsl(${hue}, 90%, 65%)`,
        pointerEvents: 'none',
        zIndex: '99998',
        transform: 'translate(-50%, -50%)',
        transition: `transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease`,
        opacity: '1',
      });

      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 450);
    }
  }

  return <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', left: '-20px', top: '-20px' }} />;
}
