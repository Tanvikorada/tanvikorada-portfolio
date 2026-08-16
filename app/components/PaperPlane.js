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
  
  // A beautiful, wide, twisting path that goes back and forth
  const planeX = useTransform(scrollYProgress, 
    [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1], 
    ['50vw', '80vw', '15vw', '85vw', '20vw', '75vw', '50vw']
  );

  const rotate = useTransform(scrollYProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
    [45, 75, -25, 70, -20, 60, 45]
  );

  const planeOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  if (docHeight === 0) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: `${docHeight}px`, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      
      {/* The beautifully curving path that draws dynamically as you scroll */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        <motion.path 
          d="M 50,0 Q 120,10 80,20 T 15,35 T 85,55 T 20,75 T 75,90 T 50,100"
          fill="none" 
          stroke="var(--accent)" 
          strokeWidth="0.15" 
          /* Framer Motion animates pathLength under the hood */
          style={{ pathLength: scrollYProgress, opacity: 0.4 }} 
        />
        
        {/* Faint background track for context (optional, makes it look like a real path) */}
        <path 
          d="M 50,0 Q 120,10 80,20 T 15,35 T 85,55 T 20,75 T 75,90 T 50,100"
          fill="none" 
          stroke="var(--text-muted)" 
          strokeWidth="0.05" 
          strokeDasharray="0.5 1"
          style={{ opacity: 0.1 }} 
        />
      </svg>
      
      {/* The plane follows vertical scroll with swaying, matching the general path above */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          y: planeY,
          x: planeX,
          rotate,
          opacity: planeOpacity,
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
