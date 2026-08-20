'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3 seconds to feel "crazy" and give 3D assets time to load
    const duration = 3000;
    const interval = 20; 
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          // Wait at 100% before triggering the massive wipe
          setTimeout(() => setLoading(false), 800); 
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
          key="crazy-booter"
          // Exit animation: circle shrinks to 0% revealing the site underneath
          exit={{ 
            clipPath: 'circle(0% at 50% 50%)', 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-body)',
            clipPath: 'circle(100% at 50% 50%)', // Initial state
          }}
        >
          {/* Central Typography Core */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Glowing Ring */}
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '300px', height: '300px', filter: 'drop-shadow(0 0 10px var(--primary))', transform: 'rotate(-90deg)' }}>
              {/* Background Track */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              {/* Progress Bar */}
              <motion.circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="2" 
                strokeLinecap="round"
                initial={{ strokeDasharray: 283, strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Massive Number */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ 
                fontSize: '6rem', 
                fontWeight: 900, 
                fontFamily: 'var(--font-sans)', 
                color: 'white',
                textShadow: '0 0 40px rgba(255,255,255,0.2)',
                letterSpacing: '-0.05em'
              }}
            >
              {Math.round(progress)}
              <span style={{ fontSize: '3rem', opacity: 0.5 }}>%</span>
            </motion.div>
          </div>

          {/* Subtitle / System Text */}
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ 
              marginTop: '4rem', 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.4em', 
              color: 'var(--primary)',
              fontFamily: 'monospace' 
            }}
          >
            Booting System Sequence
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
