'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>Loading 3D Engine...</div>
});

// Emojis for the bomb menu
const BOMB_EMOJIS = ['😸', '🚀', '🔥', '⚡', '💻', '🎉', '💖', '👀'];

// Thocky mechanical switch sound synthesizer
const playThock = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Deep, fast click profile
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch(e) {
    // Ignore audio context errors before user interaction
  }
};

export default function TechStack() {
  const containerRef = useRef(null);
  const [emojiMenuPos, setEmojiMenuPos] = useState(null); // {x, y}
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Global click to close emoji menu
    const handleClick = () => setEmojiMenuPos(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
    setEmojiMenuPos({ x: e.clientX, y: e.clientY });
  };

  const bombEmoji = (e, emoji) => {
    e.stopPropagation();
    const shape = confetti.shapeFromText({ text: emoji, scalar: 3 });
    confetti({
      particleCount: 150,
      spread: 120,
      startVelocity: 50,
      origin: { x: emojiMenuPos.x / window.innerWidth, y: emojiMenuPos.y / window.innerHeight },
      shapes: [shape],
      scalar: 3,
      disableForReducedMotion: true,
      zIndex: 10000,
    });
    setEmojiMenuPos(null);
  };

  return (
    <section
      id="stack"
      ref={containerRef}
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        background: '#0a0a0a', // Deep dark backdrop for the WebGL scene
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <motion.div
        style={{
          position: 'absolute',
          top: '12vh',
          left: '8vw',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
          Tools I build with
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-serif)' }}>
          Tech Stack
        </h2>
        <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          (Right-click anywhere for emoji bomb)
        </p>
      </motion.div>

      {/* Floating Right-Click Emoji Menu */}
      <AnimatePresence>
        {emojiMenuPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{
              position: 'fixed',
              top: emojiMenuPos.y,
              left: emojiMenuPos.x,
              background: 'rgba(20,20,22,0.8)',
              backdropFilter: 'blur(16px)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              zIndex: 99999,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px'
            }}
          >
            <div style={{ gridColumn: 'span 4', textAlign: 'center', color: '#fff', fontSize: '12px', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Select an emoji to bomb!</div>
            {BOMB_EMOJIS.map(emoji => (
              <button
                key={emoji}
                onClick={(e) => bombEmoji(e, emoji)}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', fontSize: '24px', padding: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Spline WebGL Canvas */}
      <div 
        onContextMenu={handleRightClick}
        onPointerDownCapture={playThock}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          cursor: 'grab',
        }}
      >
        <Spline 
          scene="/skills-keyboard.spline" 
          onLoad={() => setIsLoading(false)}
          style={{
            width: '100%',
            height: '100%',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 1s ease',
          }}
        />
      </div>
      
      {/* Loading State for Spline Engine */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0a0a0a',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              zIndex: 5,
            }}
          >
            Loading 3D Engine...
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
