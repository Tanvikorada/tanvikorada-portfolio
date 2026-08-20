'use client';
import { motion, useTransform } from 'framer-motion';

// Separate component for each Pillar to correctly use React Hooks (useTransform)
function Pillar({ progress, dist, maxHeight, x, y }) {
  const size = 50;
  const gap = 10;
  const leftPos = x * (size + gap);
  const topPos = y * (size + gap);

  let heightTransform;
  
  if (dist === 0) {
    // Center pillar (School)
    heightTransform = useTransform(progress, [0, 0.3, 0.6, 1], [40, 100, 150, maxHeight]);
  } else if (dist === 1) {
    // Inner ring (College)
    heightTransform = useTransform(progress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 80, 120, maxHeight]);
  } else {
    // Outer ring (University)
    heightTransform = useTransform(progress, [0, 0.5, 0.8, 1], [0, 0, 60, maxHeight]);
  }

  // Base visibility opacity to hide outer rings entirely until they are needed
  // Ensure the input array starts >= 0 to avoid offset errors
  const startOpacity = Math.max(0, dist * 0.25 - 0.1);
  const endOpacity = dist * 0.25;
  const opacityTransform = dist === 0 
    ? 1 
    : useTransform(progress, [0, startOpacity, endOpacity, 1], [0, 0, 1, 1]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: leftPos,
        top: topPos,
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        opacity: opacityTransform
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
          z: heightTransform // Elevates based on framer motion
        }}
      />
      
      {/* LEFT FACE */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%', 
          background: 'rgba(0, 255, 204, 0.15)',
          borderLeft: '1px solid rgba(0, 255, 204, 0.4)',
          borderBottom: '1px solid rgba(0, 255, 204, 0.4)',
          transformOrigin: 'top left',
          rotateY: 90,
          rotateX: -90,
          scaleY: heightTransform, 
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
          scaleY: heightTransform,
          x: '100%' 
        }}
      />
    </motion.div>
  );
}

export default function IsometricCity({ progress }) {
  // We'll create a 5x5 grid (25 pillars).
  const gridSize = 5;
  const pillars = [];
  
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      // Calculate distance from center (2,2 is the center of a 5x5 grid)
      const cx = 2;
      const cy = 2;
      const dist = Math.max(Math.abs(x - cx), Math.abs(y - cy)); // Chebyshev distance (0 for center, 1 for 3x3, 2 for 5x5)
      
      const maxHeight = 50 + Math.random() * 100 + (dist === 0 ? 150 : 0); 

      pillars.push({
        id: `${x}-${y}`,
        x,
        y,
        dist,
        maxHeight
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
        {pillars.map((pillar) => (
          <Pillar 
            key={pillar.id}
            progress={progress}
            dist={pillar.dist}
            maxHeight={pillar.maxHeight}
            x={pillar.x}
            y={pillar.y}
          />
        ))}
      </div>
    </div>
  );
}
