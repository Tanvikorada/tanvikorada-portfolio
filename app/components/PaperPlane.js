'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PaperPlane() {
  const { scrollYProgress } = useScroll();
  const [docHeight, setDocHeight] = useState(2000);

  useEffect(() => {
    // dynamically get the document height
    const handleResize = () => setDocHeight(document.body.scrollHeight);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // We map scroll progress to the path drawing length
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
      
      {/* Dashed line tracking down the page */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        <motion.path 
          d="M 50,0 Q 65,25 35,50 T 50,100"
          fill="none" 
          stroke="var(--text-muted)" 
          strokeWidth="0.2" 
          strokeDasharray="1 1"
          style={{ pathLength, opacity: 0.2 }} 
        />
      </svg>
      
      {/* The plane follows vertical scroll with some swaying, matching the general path above */}
      <motion.div
        style={{
          position: 'fixed',
          top: '10vh',
          left: '50vw',
          y: useTransform(scrollYProgress, [0, 1], ['0vh', '80vh']),
          x: useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['0vw', '15vw', '-15vw', '15vw', '0vw']),
          rotate: useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [45, 60, -20, 60, 45]),
          opacity: useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]),
          zIndex: 999
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-heading)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="var(--bg-surface)" />
        </svg>
      </motion.div>
    </div>
  );
}
