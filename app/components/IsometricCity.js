'use client';
import { motion, useTransform } from 'framer-motion';

export default function IsometricCity({ progress }) {
  // We use Framer Motion useTransform to map scroll progress to the number of visible pillars and their heights.
  
  // Phase 1: School (Progress 0 -> 0.3) - Just the center pillar is tall
  // Phase 2: College (Progress 0.3 -> 0.6) - A 3x3 grid emerges
  // Phase 3: University (Progress 0.6 -> 1.0) - A 5x5 grid emerges and goes wild
  
  // We'll create a 5x5 grid (25 pillars).
  const gridSize = 5;
  const pillars = [];
  
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      // Calculate distance from center (2,2 is the center of a 5x5 grid)
      const cx = 2;
      const cy = 2;
      const dist = Math.max(Math.abs(x - cx), Math.abs(y - cy)); // Chebyshev distance (0 for center, 1 for 3x3, 2 for 5x5)
      
      // We create a custom height transform for each pillar based on its distance from the center.
      // If dist == 0 (center), it's always visible and grows.
      // If dist == 1 (3x3 grid), it starts growing around progress 0.3.
      // If dist == 2 (5x5 grid), it starts growing around progress 0.6.
      
      // Randomize max heights to make it look like a cityscape rather than a flat block
      const maxHeight = 50 + Math.random() * 100 + (dist === 0 ? 150 : 0); 
      
      let heightTransform;
      
      if (dist === 0) {
        // Center pillar (School)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        heightTransform = useTransform(progress, [0, 0.3, 0.6, 1], [40, 100, 150, maxHeight]);
      } else if (dist === 1) {
        // Inner ring (College)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        heightTransform = useTransform(progress, [0.2, 0.4, 0.8, 1], [0, 80, 120, maxHeight]);
      } else {
        // Outer ring (University)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        heightTransform = useTransform(progress, [0.5, 0.8, 1], [0, 60, maxHeight]);
      }

      // Base visibility opacity to hide outer rings entirely until they are needed
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const opacityTransform = useTransform(progress, [dist * 0.25 - 0.1, dist * 0.25], [0, 1]);

      pillars.push({
        id: `${x}-${y}`,
        x,
        y,
        height: heightTransform,
        opacity: opacityTransform
      });
    }
  }

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        perspective: '1000px'
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)',
        opacity: 0.15,
        filter: 'blur(60px)',
      }} />

      {/* Isometric Container */}
      <div 
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) rotateZ(-45deg)', // Standard isometric projection
        }}
      >
        {/* Render Grid */}
        {pillars.map((pillar) => {
          const size = 50;
          const gap = 10;
          const leftPos = pillar.x * (size + gap);
          const topPos = pillar.y * (size + gap);
          
          return (
            <motion.div
              key={pillar.id}
              style={{
                position: 'absolute',
                left: leftPos,
                top: topPos,
                width: size,
                height: size,
                transformStyle: 'preserve-3d',
                opacity: pillar.opacity
              }}
            >
              {/* TOP FACE */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 255, 204, 0.3)',
                  border: '1px solid rgba(0, 255, 204, 0.8)',
                  transform: 'translateZ(0px)', // Starts flat
                  z: pillar.height // Elevates based on framer motion
                }}
              />
              
              {/* LEFT FACE */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%', // Bound to the height via motion later, but we use a trick:
                  background: 'rgba(0, 255, 204, 0.15)',
                  borderLeft: '1px solid rgba(0, 255, 204, 0.4)',
                  borderBottom: '1px solid rgba(0, 255, 204, 0.4)',
                  transformOrigin: 'top left',
                  rotateY: 90,
                  rotateX: -90,
                  scaleY: pillar.height, // Scale it to act as the wall
                  translateZ: 0
                }}
              />

              {/* RIGHT FACE */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 255, 204, 0.05)',
                  borderRight: '1px solid rgba(0, 255, 204, 0.4)',
                  borderBottom: '1px solid rgba(0, 255, 204, 0.4)',
                  transformOrigin: 'top left',
                  rotateX: -90,
                  scaleY: pillar.height,
                  x: '100%' // Move to right edge
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
