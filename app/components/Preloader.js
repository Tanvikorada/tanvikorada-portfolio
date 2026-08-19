'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const duration = 2500;
    const interval = 20;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 600); // Hold at 100% for a moment before zooming
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 3, filter: 'blur(10px)' }} // Hyperspace zoom exit
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#050505', // Deep black for space
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-body)'
          }}
        >
          {/* Glowing Paper Plane Blueprint */}
          <div style={{ position: 'relative', width: '150px', height: '150px', marginBottom: '2rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px var(--primary))' }}>
              <motion.path
                d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={{ pathLength: progress / 100, opacity: 1 }}
                transition={{ duration: 0.1 }} // Smooth out the interval steps
              />
            </svg>
            {/* Glow Core */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '50%',
                height: '50%',
                background: 'var(--primary)',
                filter: 'blur(40px)',
                borderRadius: '50%',
                x: '-50%',
                y: '-50%',
                opacity: progress / 200 // Max 0.5 opacity at 100%
              }}
            />
          </div>

          {/* Futuristic Percentage */}
          <div style={{ fontSize: '3rem', fontWeight: 300, fontFamily: 'monospace', letterSpacing: '0.1em', color: 'var(--text-base)', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
            {Math.round(progress).toString().padStart(3, '0')}%
          </div>
          
          {/* Loading text */}
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.5 }}>
            Initializing System
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
