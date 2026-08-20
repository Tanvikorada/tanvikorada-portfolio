'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  // SVG Curve path logic for the Awwwards effect
  // Starts flat, bends during transition, flattens at end
  const initialPath = `M0 0 L100 0 L100 100 Q50 100 0 100 Z`;
  const targetPath = `M0 0 L100 0 L100 0 Q50 0 0 0 Z`;

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    // Fast, sleek counting
    const duration = 2000;
    const interval = 20; 
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400); 
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
          key="curtain-booter"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          {/* Solid Black Background */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden' // Keep plane inside until it exits
            }}
          >
            {/* Flying Paper Plane */}
            <motion.div
              initial={{ x: -200, y: 200, opacity: 0, rotate: 45 }}
              animate={
                progress < 100
                  ? {
                      x: [ -dimensions.width * 0.2, dimensions.width * 0.2, -dimensions.width * 0.2 ],
                      y: [ dimensions.height * 0.2, -dimensions.height * 0.2, dimensions.height * 0.2 ],
                      rotate: [ 15, -15, 15 ],
                      opacity: 1
                    }
                  : { 
                      x: dimensions.width * 0.8, 
                      y: -dimensions.height * 0.8, 
                      rotate: 0, 
                      opacity: 1 
                    }
              }
              transition={
                progress < 100
                  ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.6, ease: "easeIn" }
              }
              style={{
                position: 'absolute',
                width: '100px', // Bigger so it's clearly visible
                height: 'auto',
                zIndex: 10
              }}
            >
              <img src="/plane.svg" alt="" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }} />
            </motion.div>

            {/* Minimal Elegant Typography */}
            <motion.div 
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
              style={{ 
                fontSize: '5rem', 
                fontWeight: 300, 
                fontFamily: 'var(--font-serif)', 
                color: 'white',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'flex-start',
                zIndex: 20
              }}
            >
              {Math.round(progress)}
              <span style={{ fontSize: '2rem', marginTop: '0.8rem', opacity: 0.6 }}>%</span>
            </motion.div>
          </motion.div>

          {/* Dynamic Curved SVG hanging off the bottom */}
          <motion.svg
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              height: '10vh', // Adjust height of the curve
              fill: '#0a0a0a',
              overflow: 'visible'
            }}
          >
            <motion.path
              d={initialPath}
              exit={{ d: targetPath }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
