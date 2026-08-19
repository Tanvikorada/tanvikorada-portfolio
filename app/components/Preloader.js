'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g. 1.5 seconds to reach 100)
    // In a real app, this might track actual asset loading.
    const duration = 2000;
    const interval = 20; // update every 20ms
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // Wait a bit at 100%
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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }} // Slides up and fades out
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999, // Highest z-index
            background: 'var(--bg-base)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-body)'
          }}
        >
          {/* Main Counter */}
          <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'monospace', marginBottom: '2rem', letterSpacing: '-0.05em' }}>
            {Math.round(progress)}%
          </div>

          {/* Progress Bar Container */}
          <div style={{ width: '250px', height: '2px', background: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
            <motion.div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                background: 'var(--text-body)',
                width: `${progress}%`
              }}
            />
          </div>
          
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
            Initializing System
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
