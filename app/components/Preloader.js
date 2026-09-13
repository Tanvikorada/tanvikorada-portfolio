'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingState from './ui/loading-state';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading', 'done', 'fading'

  useEffect(() => {
    // Keep it loading for 2.5 seconds
    const t1 = setTimeout(() => {
      setPhase('done');
      
      // Wait 1 second so they can read "INITIALIZATION COMPLETE"
      const t2 = setTimeout(() => {
        setPhase('fading');
        
        // After fade out completes, call onComplete
        const t3 = setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }, 1000);
    }, 2500);

    return () => {
      clearTimeout(t1);
    };
  }, [onComplete]);

  if (phase === 'unmounted') return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        pointerEvents: phase !== 'loading' ? 'none' : 'auto', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)'
      }}
    >
      <LoadingState variant="Orbit" label={phase === 'loading' ? "INITIALIZING..." : "SYSTEM READY."} />
    </motion.div>
  );
}
