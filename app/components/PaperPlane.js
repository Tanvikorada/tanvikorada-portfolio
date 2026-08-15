'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PaperPlane() {
  const { scrollYProgress } = useScroll();
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setDocHeight(document.body.scrollHeight);
    
    // Slight delay to ensure DOM is fully painted (images loaded, etc.)
    setTimeout(handleResize, 500);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Plane follows exact Y scroll
  const planeY = useTransform(scrollYProgress, [0, 1], [0, docHeight - (typeof window !== 'undefined' ? window.innerHeight : 0)]);
  
  // Plane follows horizontal zig-zag (matching the SVG path below)
  const planeX = useTransform(scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ['50vw', '80vw', '20vw', '70vw', '50vw']
  );

  const rotate = useTransform(scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [45, 60, -20, 60, 45]
  );

  if (docHeight === 0) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: `${docHeight}px`, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      {/* Dashed line tracking down the entire page */}
      <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* We use exact pixels for height, but since we want X to be responsive we can use percentages using a viewBox trick, 
            but SVG doesn't mix well. We can just draw it using pixel approximations or just viewBox="0 0 100 100" */}
      </svg>

      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        <motion.path 
          d="M 50,0 Q 90,12.5 80,25 T 20,50 T 70,75 T 50,100"
          fill="none" 
          stroke="var(--text-muted)" 
          strokeWidth="0.1" 
          strokeDasharray="0.5 0.5"
          style={{ pathLength: scrollYProgress, opacity: 0.2 }} 
        />
      </svg>
      
      {/* The plane follows vertical scroll with some swaying, matching the general path above */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          y: planeY,
          x: planeX,
          rotate,
          opacity: useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]),
          zIndex: 999
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-heading)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))', transform: 'translate(-50%, -50%)' }}>
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="var(--bg-surface)" />
        </svg>
      </motion.div>
    </div>
  );
}
