'use client';
import { useEffect, useRef, useState } from 'react';

export default function InteractiveRacer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const carRef = useRef(null);
  
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !carRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;

    const resize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Physics state
    let mouse = { x: width / 2, y: height / 2 };
    let pos = { x: width / 2, y: height / 2 };
    let vel = { x: 0, y: 0 };
    let angle = 0;
    
    // Particles for smoke
    let particles = [];

    // Track previous positions for smooth skid marks
    let lastPos = { x: width / 2, y: height / 2 };
    let lastSkid = false;

    let rafId = null;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    containerRef.current.addEventListener('pointermove', handleMouseMove);

    const tick = () => {
      // Calculate velocity towards mouse
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      
      // Spring physics for smooth car movement
      vel.x += dx * 0.05;
      vel.y += dy * 0.05;
      
      // Friction
      vel.x *= 0.8;
      vel.y *= 0.8;

      pos.x += vel.x;
      pos.y += vel.y;

      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);

      // Determine rotation
      if (speed > 0.5) {
        const targetAngle = Math.atan2(vel.y, vel.x);
        
        // Smooth rotation interpolation
        let diff = targetAngle - angle;
        // Normalize angle difference to -PI to PI
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        
        angle += diff * 0.2;
      }

      // Update car DOM element
      if (carRef.current) {
        carRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${angle}rad)`;
      }

      // Skid mark logic (draw on persistent canvas)
      // Drift happens when velocity vector differs significantly from the car's facing angle,
      // or simply when moving very fast.
      const driftThreshold = 5;
      const isDrifting = speed > driftThreshold;

      if (isDrifting) {
        // Draw skid marks (two parallel lines for tires)
        const perpX = -Math.sin(angle);
        const perpY = Math.cos(angle);
        const tireWidth = 8;

        ctx.beginPath();
        // Left tire
        ctx.moveTo(lastPos.x + perpX * tireWidth, lastPos.y + perpY * tireWidth);
        ctx.lineTo(pos.x + perpX * tireWidth, pos.y + perpY * tireWidth);
        // Right tire
        ctx.moveTo(lastPos.x - perpX * tireWidth, lastPos.y - perpY * tireWidth);
        ctx.lineTo(pos.x - perpX * tireWidth, pos.y - perpY * tireWidth);
        
        // Dynamic opacity based on speed
        const skidOpacity = Math.min(0.8, (speed - driftThreshold) * 0.05);
        ctx.strokeStyle = `rgba(10, 10, 10, ${skidOpacity})`;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Spawn smoke particles (DOM elements)
        if (Math.random() > 0.5) {
          const size = Math.random() * 10 + 10;
          const smoke = document.createElement('div');
          smoke.className = 'smoke-particle';
          smoke.style.width = `${size}px`;
          smoke.style.height = `${size}px`;
          
          // Initial position
          let sx = pos.x - (vel.x * 0.5) + (Math.random() - 0.5) * 10;
          let sy = pos.y - (vel.y * 0.5) + (Math.random() - 0.5) * 10;
          smoke.style.transform = `translate(${sx}px, ${sy}px) scale(1)`;
          
          containerRef.current.appendChild(smoke);
          
          // Animate with Web Animations API for maximum performance
          smoke.animate([
            { transform: `translate(${sx}px, ${sy}px) scale(1)`, opacity: 0.5 },
            { transform: `translate(${sx + (Math.random() - 0.5)*30}px, ${sy - 20 - Math.random()*20}px) scale(3)`, opacity: 0 }
          ], {
            duration: 800 + Math.random() * 400,
            easing: 'ease-out'
          }).onfinish = () => smoke.remove();
        }
      }

      lastPos.x = pos.x;
      lastPos.y = pos.y;
      
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      containerRef.current?.removeEventListener('pointermove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="interactive-racer-container"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="racer-hint" style={{ opacity: isActive ? 0 : 1 }}>
        Hover & Drive
      </div>
      
      {/* Persistent canvas for skid marks */}
      <canvas ref={canvasRef} className="skid-canvas" />

      {/* The Car SVG */}
      <div 
        ref={carRef} 
        className="racer-car"
        style={{ opacity: isActive ? 1 : 0 }}
      >
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glowing Neon Cyber-Car */}
          <rect x="2" y="4" width="36" height="16" rx="4" fill="#0f172a" stroke="var(--accent)" strokeWidth="2"/>
          <rect x="8" y="6" width="12" height="12" rx="2" fill="var(--bg-surface)"/>
          <path d="M28 8L34 12L28 16" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Spoiler */}
          <rect x="2" y="2" width="4" height="20" fill="var(--accent)"/>
          <line x1="0" y1="12" x2="10" y2="12" stroke="var(--accent-pink)" strokeWidth="2" />
        </svg>
      </div>

      <style jsx>{`
        .interactive-racer-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          cursor: none;
          overflow: hidden;
          background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);
        }
        .skid-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .racer-car {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 24px;
          margin-left: -20px;
          margin-top: -12px;
          pointer-events: none;
          transition: opacity 0.3s ease;
          filter: drop-shadow(0 0 10px var(--accent));
          z-index: 20;
          will-change: transform;
        }
        .racer-hint {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--text-muted);
          opacity: 0.5;
          pointer-events: none;
          transition: opacity 0.5s ease;
          letter-spacing: 4px;
          text-transform: uppercase;
        }
        :global(.smoke-particle) {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(150,150,150,0.8) 0%, rgba(150,150,150,0) 70%);
          pointer-events: none;
          will-change: transform, opacity;
          z-index: 15;
        }
      `}</style>
    </div>
  );
}
