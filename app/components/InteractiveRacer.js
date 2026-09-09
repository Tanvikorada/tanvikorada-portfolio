'use client';
import { useEffect, useRef, useState } from 'react';

export default function InteractiveRacer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const carRef = useRef(null);
  const dustContainerRef = useRef(null);
  
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !carRef.current || !dustContainerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;

    const resize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      
      // Draw a painted dirt track background on the bottom
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#f7f1df'; // Cream base
      ctx.beginPath();
      ctx.moveTo(0, height);
      for(let x=0; x<=width; x+=50) {
        ctx.lineTo(x, height - 30 - Math.sin(x*0.01)*10 - Math.cos(x*0.05)*5);
      }
      ctx.lineTo(width, height);
      ctx.fill();
    };
    resize();
    window.addEventListener('resize', resize);

    // Physics state
    let mouse = { x: width / 2, y: height / 2 };
    let pos = { x: width / 2, y: height / 2 };
    let vel = { x: 0, y: 0 };
    let angle = 0;
    
    let lastPos = { x: width / 2, y: height / 2 };

    let rafId = null;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    containerRef.current.addEventListener('pointermove', handleMouseMove);

    const tick = () => {
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      
      vel.x += dx * 0.08;
      vel.y += dy * 0.08;
      
      vel.x *= 0.75;
      vel.y *= 0.75;

      pos.x += vel.x;
      pos.y += vel.y;

      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);

      if (speed > 0.5) {
        const targetAngle = Math.atan2(vel.y, vel.x);
        let diff = targetAngle - angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        angle += diff * 0.25;
      }

      if (carRef.current) {
        // Add a slight wobble bounce based on speed to simulate dirt road
        const bounce = Math.sin(Date.now() * 0.02) * (speed * 0.1);
        carRef.current.style.transform = `translate(${pos.x}px, ${pos.y + bounce}px) rotate(${angle}rad)`;
      }

      const isDrifting = speed > 4;

      if (isDrifting) {
        const perpX = -Math.sin(angle);
        const perpY = Math.cos(angle);
        const tireWidth = 14;

        ctx.beginPath();
        ctx.moveTo(lastPos.x + perpX * tireWidth, lastPos.y + perpY * tireWidth);
        ctx.lineTo(pos.x + perpX * tireWidth, pos.y + perpY * tireWidth);
        ctx.moveTo(lastPos.x - perpX * tireWidth, lastPos.y - perpY * tireWidth);
        ctx.lineTo(pos.x - perpX * tireWidth, pos.y - perpY * tireWidth);
        
        // Use a gouache/dirt color for the tracks
        ctx.strokeStyle = `rgba(176, 106, 77, ${Math.min(0.6, speed * 0.05)})`; // STEM terracotta
        ctx.lineWidth = Math.random() * 2 + 3; // Variable width for brush stroke feel
        ctx.lineCap = 'round';
        ctx.stroke();

        // Spawn painted dust clouds
        if (Math.random() > 0.4) {
          const size = Math.random() * 15 + 10;
          const dust = document.createElement('div');
          dust.className = 'painted-dust';
          dust.style.width = `${size}px`;
          dust.style.height = `${size}px`;
          
          let sx = pos.x - (vel.x * 0.8) + (Math.random() - 0.5) * 15;
          let sy = pos.y - (vel.y * 0.8) + (Math.random() - 0.5) * 15;
          dust.style.transform = `translate(${sx}px, ${sy}px) scale(0.5)`;
          
          dustContainerRef.current.appendChild(dust);
          
          dust.animate([
            { transform: `translate(${sx}px, ${sy}px) scale(0.5)`, opacity: 0.8 },
            { transform: `translate(${sx + (Math.random() - 0.5)*40}px, ${sy - 30 - Math.random()*20}px) scale(2.5)`, opacity: 0 }
          ], {
            duration: 900 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
          }).onfinish = () => dust.remove();
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
      {/* SVG Filter for the Hand-Painted Gouache Look */}
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="ft-paint" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="6" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      <div className="racer-hint" style={{ opacity: isActive ? 0 : 1 }}>
        Hover to Drive
      </div>
      
      {/* Persistent canvas with the paint filter applied */}
      <canvas ref={canvasRef} className="skid-canvas" />

      {/* Dust container with the paint filter applied to all children */}
      <div ref={dustContainerRef} className="dust-layer" />

      {/* The Hand-Drawn Toy Car SVG */}
      <div 
        ref={carRef} 
        className="racer-car"
        style={{ opacity: isActive ? 1 : 0 }}
      >
        <svg width="60" height="34" viewBox="0 0 60 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'url(#ft-paint)' }}>
          {/* Tires (Olive) */}
          <rect x="8" y="2" width="12" height="6" rx="3" fill="#2b2e14" />
          <rect x="8" y="26" width="12" height="6" rx="3" fill="#2b2e14" />
          <rect x="40" y="2" width="14" height="6" rx="3" fill="#2b2e14" />
          <rect x="40" y="26" width="14" height="6" rx="3" fill="#2b2e14" />
          
          {/* Main Body (Cream/Daisy color) */}
          <path d="M4 10 Q 30 6 54 10 Q 58 17 54 24 Q 30 28 4 24 Q 0 17 4 10 Z" fill="#fbf7ec" stroke="#e2d5b0" strokeWidth="2" />
          
          {/* Driver Cockpit (Terracotta) */}
          <ellipse cx="26" cy="17" rx="6" ry="5" fill="#a95c42" />
          
          {/* Engine/Exhaust Accents (Orange) */}
          <circle cx="48" cy="17" r="4" fill="#e89a1c" />
          <line x1="50" y1="17" x2="58" y2="17" stroke="#e89a1c" strokeWidth="2" strokeLinecap="round" />
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
        }
        .skid-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          filter: url(#ft-paint); /* Applies the watercolor stroke effect to the lines */
        }
        .dust-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          filter: url(#ft-paint); /* Applies the watercolor effect to all dust divs */
        }
        .racer-car {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 34px;
          margin-left: -30px;
          margin-top: -17px;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 20;
          will-change: transform;
        }
        .racer-hint {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--text-muted);
          opacity: 0.5;
          pointer-events: none;
          transition: opacity 0.5s ease;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        :global(.painted-dust) {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          background: #e2d5b0; /* Soft warm petal edge color */
          pointer-events: none;
          will-change: transform, opacity;
          z-index: 15;
        }
      `}</style>
    </div>
  );
}
