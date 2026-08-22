'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingState from './ui/loading-state';

export default function Preloader({ onComplete }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Keep it loading for 3 seconds to show the animation, then fade out
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); // 1 second fade out duration
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        pointerEvents: isLoaded ? 'none' : 'auto', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)'
      }}
    >
      <LoadingState variant="Orbit" label="INITIALIZING" />
    </motion.div>
  );
}
