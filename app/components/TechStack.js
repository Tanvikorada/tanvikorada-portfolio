'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Tech satellites configured around the central core
const SATELLITES = [
  {
    id: 'python',
    name: 'Python',
    label: 'AI & Data Engine',
    x: 50,
    y: 10,
    wireD: 'M 500 325 C 480 240, 520 180, 500 110',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-3.1 0-5 1.7-5 3.9v2.2h5.1c1.8 0 3.3 1.5 3.3 3.3v1.6h2.2c2.2 0 3.9-1.9 3.9-5s-1.8-6-5.5-6h-4zm-1.8 1.9c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#38bdf8"/>
        <path d="M12.1 22c3.1 0 5-1.7 5-3.9v-2.2h-5.1c-1.8 0-3.3-1.5-3.3-3.3V11H6.5c-2.2 0-3.9 1.9-3.9 5s1.8 6 5.5 6h4zm1.8-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#facc15"/>
      </svg>
    )
  },
  {
    id: 'openai',
    name: 'OpenAI / GenAI',
    label: 'LLM Pipelines & RAG',
    x: 77,
    y: 22,
    wireD: 'M 545 330 C 620 310, 680 230, 735 185',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" color="#10b981">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.22-9.765a4.488 4.488 0 0 1 2.34-1.974v5.677a.78.78 0 0 0 .392.68l5.84 3.37-2.02 1.168a.071.071 0 0 1-.07 0L4.02 14.683a4.504 4.504 0 0 1-1.64-6.144zm14.796 3.655-5.843-3.37 2.02-1.168a.071.071 0 0 1 .07 0l4.842 2.778a4.5 4.5 0 0 1-.68 8.113v-5.672a.79.79 0 0 0-.409-.681zm2.43-3.648-4.783-2.76a.771.771 0 0 0-.78 0L8.2 9.155V6.823a.08.08 0 0 1 .033-.062l4.84-2.79a4.5 4.5 0 0 1 6.147 1.645 4.488 4.488 0 0 1 .536 3.014zm-9.39-1.905 2.02-1.168a.071.071 0 0 1 .07 0l4.842 2.78a4.498 4.498 0 0 1-1.642 6.142 4.488 4.488 0 0 1-2.34 1.975V11.23a.78.78 0 0 0-.392-.68L8.2 7.18z"/>
      </svg>
    )
  },
  {
    id: 'react',
    name: 'React.js',
    label: 'Component Architecture',
    x: 85,
    y: 50,
    wireD: 'M 555 375 C 640 410, 720 340, 805 375',
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.5)',
    icon: (
      <svg width="36" height="36" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="#00f0ff">
        <circle cx="0" cy="0" r="2.05" fill="#00f0ff" stroke="none"/>
        <g strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    label: 'Relational DB & Supabase',
    x: 77,
    y: 78,
    wireD: 'M 545 420 C 620 440, 680 520, 735 565',
    color: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.5)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    )
  },
  {
    id: 'js',
    name: 'JavaScript / TS',
    label: 'ESNext & Type Safety',
    x: 50,
    y: 90,
    wireD: 'M 500 425 C 520 510, 480 570, 500 640',
    color: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.5)',
    icon: (
      <div style={{ width: '32px', height: '32px', background: '#facc15', borderRadius: '4px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '2px 4px', fontWeight: 900, color: '#000', fontSize: '15px', fontFamily: 'var(--font-mono)' }}>
        JS
      </div>
    )
  },
  {
    id: 'yolo',
    name: 'YOLO / CV',
    label: 'Object Detection & Vision',
    x: 23,
    y: 78,
    wireD: 'M 455 420 C 380 440, 320 520, 265 565',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
      </svg>
    )
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    label: 'Event-Driven Backends',
    x: 15,
    y: 50,
    wireD: 'M 445 375 C 360 340, 280 410, 195 375',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.5)',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" color="#22c55e">
        <path d="M12 2l10 5.8v11.6L12 25.2 2 19.4V7.8L12 2zm0 2.3L4 8.9v9.2l8 4.6 8-4.6V8.9l-8-4.6z"/>
      </svg>
    )
  },
  {
    id: 'docker',
    name: 'Docker / Cloud',
    label: 'Containers & Microservices',
    x: 23,
    y: 22,
    wireD: 'M 455 330 C 380 310, 320 230, 265 185',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 13a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v2a6 6 0 0 0 6 6h10a6 6 0 0 0 6-6v-2z"/>
        <rect x="5" y="6" width="3" height="3" rx="1"/>
        <rect x="10" y="6" width="3" height="3" rx="1"/>
        <rect x="15" y="6" width="3" height="3" rx="1"/>
      </svg>
    )
  }
];

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section id="tech-stack" style={{ padding: '16vh 4vw', position: 'relative', overflow: 'hidden' }}>
      
      {/* Circuit & Neon Wire Glow Styles */}
      <style>{`
        .wire-base {
          stroke: #00d2ff;
          stroke-width: 1.75;
          fill: none;
          opacity: 0.75;
          filter: drop-shadow(0 0 5px rgba(0, 210, 255, 0.8)) drop-shadow(0 0 16px rgba(0, 210, 255, 0.35));
          transition: all 0.3s ease;
        }
        .wire-base.active {
          stroke: #ffffff;
          stroke-width: 2.5;
          opacity: 1;
          filter: drop-shadow(0 0 8px #00f0ff) drop-shadow(0 0 24px rgba(0, 240, 255, 0.8));
        }
        
        /* Animated Flow Pulse */
        .wire-pulse {
          stroke: #ffffff;
          stroke-width: 3;
          stroke-linecap: round;
          fill: none;
          stroke-dasharray: 24 240;
          animation: circuit-flow 3.5s linear infinite;
          filter: drop-shadow(0 0 6px #00ffff);
          pointer-events: none;
        }
        @keyframes circuit-flow {
          from { stroke-dashoffset: 264; }
          to { stroke-dashoffset: 0; }
        }

        /* Satellite Chip Box */
        .satellite-node {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 76px;
          height: 76px;
          background: #090a0f;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15);
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
          z-index: 10;
        }
        .satellite-node:hover {
          transform: translate(-50%, -50%) scale(1.15);
          border-color: var(--node-color, #00f0ff);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--node-glow, rgba(0, 240, 255, 0.5));
        }

        /* Central Chip Hub */
        .center-hub {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: #08090d;
          border: 2px solid #00d2ff;
          border-radius: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px rgba(0, 210, 255, 0.35), 0 24px 60px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.25);
          z-index: 12;
        }
        .center-hub-inner {
          width: 86px;
          height: 86px;
          background: #2563eb;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 8px 24px rgba(37, 99, 235, 0.4);
        }

        /* Responsive Sizing */
        @media (max-width: 768px) {
          .tech-stage-container {
            height: 520px !important;
          }
          .satellite-node {
            width: 58px !important;
            height: 58px !important;
            border-radius: 14px !important;
          }
          .satellite-node svg {
            width: 24px !important;
            height: 24px !important;
          }
          .center-hub {
            width: 90px !important;
            height: 90px !important;
            border-radius: 20px !important;
          }
          .center-hub-inner {
            width: 64px !important;
            height: 64px !important;
            border-radius: 14px !important;
          }
        }
      `}</style>

      {/* Atmospheric Background Glows */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0, 210, 255, 0.08) 0%, rgba(37, 99, 235, 0.04) 40%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 20px', borderRadius: '100px', marginBottom: '20px' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d2ff', boxShadow: '0 0 10px #00d2ff' }} />
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Core Architecture
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 16px 0' }}
          >
            Connected <span style={{ color: '#00d2ff' }}>Tech Circuit.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Interactive nerve center powering full-stack architectures, vision pipelines, and production GenAI systems.
          </motion.p>
        </div>

        {/* The Circuit Stage - EXACTLY matching billodesign.webflow.io */}
        <div 
          className="tech-stage-container"
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '920px', 
            height: '650px', 
            margin: '0 auto',
            userSelect: 'none'
          }}
        >
          {/* SVG Connecting Wires */}
          <svg 
            viewBox="0 0 1000 750" 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none',
              overflow: 'visible'
            }}
          >
            <defs>
              <linearGradient id="cyan-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="1"/>
              </linearGradient>
            </defs>

            {/* Base Wires */}
            {SATELLITES.map((sat) => {
              const isActive = hoveredTech === sat.id;
              return (
                <g key={sat.id}>
                  {/* Glowing Wire Path */}
                  <path 
                    d={sat.wireD} 
                    className={`wire-base ${isActive ? 'active' : ''}`}
                  />
                  {/* Animated Electric Pulse Flowing Along Wire */}
                  <path 
                    d={sat.wireD} 
                    className="wire-pulse"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Hub Chip */}
          <motion.div 
            className="center-hub"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="center-hub-inner">
              {/* Next.js N / Core Monogram */}
              <svg width="48" height="48" viewBox="0 0 180 180" fill="none">
                <mask id="mask0_center" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                  <circle cx="90" cy="90" r="90" fill="black"/>
                </mask>
                <g mask="url(#mask0_center)">
                  <circle cx="90" cy="90" r="90" fill="#000000"/>
                  <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white"/>
                  <rect x="115" y="54" width="12" height="72" fill="white"/>
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Satellite Nodes */}
          {SATELLITES.map((sat) => (
            <motion.div
              key={sat.id}
              className="satellite-node"
              style={{
                left: `${sat.x}%`,
                top: `${sat.y}%`,
                '--node-color': sat.color,
                '--node-glow': sat.glowColor,
              }}
              onMouseEnter={() => setHoveredTech(sat.id)}
              onMouseLeave={() => setHoveredTech(null)}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {sat.icon}

              {/* Hover Tooltip Label */}
              {hoveredTech === sat.id && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    marginTop: '10px',
                    background: '#0e1017',
                    border: `1px solid ${sat.color}`,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.8), 0 0 16px ${sat.glowColor}`,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    zIndex: 30,
                    pointerEvents: 'none',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{sat.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{sat.label}</div>
                </motion.div>
              )}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
