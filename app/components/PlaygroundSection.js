'use client';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Basic random utils
const rnd = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Palettes
const STEM = ['#5e6955', '#6b7960', '#76876a'];
const LAV = ['#8f73b8', '#9e85c4', '#a890cc', '#b9a5d8', '#7b62a1'];
const CREAM = ['#f5efe5', '#faf4ed', '#fef9f2'];
const DISC = '#c97a22';

function Leaf({ x, y, ang, len, color }) {
  const tx = Math.sin((ang * Math.PI) / 180) * len;
  const ty = -Math.cos((ang * Math.PI) / 180) * len;
  return (
    <path
      d={`M${x} ${y} Q ${x + tx / 2 + rnd(-3, 3)} ${y + ty / 2} ${x + tx} ${y + ty}`}
      stroke={color}
      strokeWidth={rnd(2, 4)}
      fill="none"
      strokeLinecap="round"
    />
  );
}

function Petal({ w, len, color }) {
  return (
    <path
      d={`M0 0 C ${-w} ${-len * 0.42} ${-w * 0.55} ${-len} 0 ${-len} C ${w * 0.55} ${-len} ${w} ${-len * 0.42} 0 0 Z`}
      fill={color}
      stroke="rgba(0,0,0,0.05)"
    />
  );
}

function Daisy({ h }) {
  const cx = 50, top = 20, bend = rnd(-10, 10);
  const n = Math.floor(rnd(10, 15));
  
  return (
    <svg viewBox={`0 0 100 ${h}`} style={{ overflow: 'visible', width: '100%', height: '100%' }}>
      <path
        d={`M${cx} ${h} C ${cx + bend} ${h * 0.6} ${cx - bend} ${h * 0.3} ${cx} ${top + 6}`}
        stroke={pick(STEM)}
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
      />
      <g transform={`translate(${cx}, ${top})`}>
        {Array.from({ length: n }).map((_, i) => (
          <g key={i} transform={`rotate(${(360 / n) * i + rnd(-5, 5)})`}>
            <Petal w={rnd(6, 9)} len={rnd(25, 32)} color={pick(CREAM)} />
          </g>
        ))}
        <circle cx={0} cy={0} r={9} fill={DISC} />
      </g>
    </svg>
  );
}

function Lavender({ h }) {
  const cx = 50;
  const green = pick(STEM);
  const rows = Math.floor(rnd(12, 18));
  
  return (
    <svg viewBox={`0 0 100 ${h}`} style={{ overflow: 'visible', width: '100%', height: '100%' }}>
      <path
        d={`M${cx} ${h} C ${cx + rnd(-5, 5)} ${h * 0.6} ${cx + rnd(-5, 5)} ${h * 0.3} ${cx} 20`}
        stroke={green}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <Leaf x={cx} y={h} ang={rnd(-30, -15)} len={rnd(40, 60)} color={green} />
      <Leaf x={cx} y={h} ang={rnd(15, 30)} len={rnd(40, 60)} color={green} />
      
      {Array.from({ length: rows }).map((_, i) => {
        const t = i / rows;
        const yy = 20 + (h * 0.4 - 20) * t;
        const spread = (1 - t) * 6 + 2;
        return (
          <g key={i}>
            {Array.from({ length: Math.floor(rnd(2, 4)) }).map((_, k) => (
              <circle
                key={k}
                cx={cx + rnd(-spread, spread)}
                cy={yy + rnd(-4, 4)}
                r={rnd(2, 4.5)}
                fill={pick(LAV)}
                opacity={rnd(0.7, 1)}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function Plant({ type, left, defaultScale }) {
  const [scale, setScale] = useState(defaultScale);
  const h = type === 'daisy' ? rnd(150, 200) : rnd(130, 180);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${left}%`,
        bottom: 0,
        width: '60px',
        height: `${h}px`,
        transformOrigin: 'bottom center',
        zIndex: Math.floor(rnd(10, 20)),
      }}
      animate={{ scale: scale, rotate: [rnd(-3, 0), rnd(0, 3)] }}
      transition={{ 
        rotate: { repeat: Infinity, repeatType: 'reverse', duration: rnd(3, 6), ease: 'easeInOut' },
        scale: { type: 'spring', damping: 15 }
      }}
      onMouseMove={() => setScale(Math.min(1.5, scale + 0.15))}
      onMouseLeave={() => setTimeout(() => setScale(defaultScale), 1500)}
    >
      {type === 'daisy' ? <Daisy h={h} /> : <Lavender h={h} />}
    </motion.div>
  );
}

export default function PlaygroundSection() {
  const [isNight, setIsNight] = useState(false);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [winH, setWinH] = useState(800);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const obs = new MutationObserver(() => setIsNight(document.body.classList.contains('night')));
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setWinH(window.innerHeight);
    const handleResize = () => setWinH(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      obs.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const plants = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.4 ? 'daisy' : 'lavender',
      left: rnd(2, 98),
      scale: rnd(0.5, 0.9),
    }));
  }, []);

  return (
    <section 
      id="playground" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '80vh',
        overflow: 'hidden',
        background: isNight ? '#020617' : '#fafafa',
        transition: 'background 0.5s ease',
        cursor: 'none', 
        borderTop: '1px solid var(--border)'
      }}
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setMouse({ x: -100, y: -100 })}
    >
      {/* Title */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5, paddingBottom: '10vh' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: isNight ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.5)', marginBottom: '16px' }}>
          Interactive Playground
        </p>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 7vw, 6rem)', color: isNight ? 'rgba(248,250,252,0.06)' : 'rgba(15,23,42,0.04)', lineHeight: 1, margin: 0 }}>
          The Garden
        </h2>
      </div>

      {/* The Garden Bed */}
      <div style={{ position: 'absolute', bottom: '0px', left: 0, right: 0, height: '250px', zIndex: 10 }}>
        {plants.map((p) => (
          <Plant 
            key={p.id} 
            type={p.type} 
            left={p.left} 
            defaultScale={p.scale} 
          />
        ))}
        {/* Soil line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '10px', background: isNight ? '#0f172a' : '#e2e8f0', zIndex: 30 }} />
      </div>

      {/* Watering Can Cursor FX */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: mouse.x > 0 ? 1 : 0,
        }}
        animate={{ x: mouse.x - 16, y: mouse.y - 16, rotate: mouse.y > winH * 0.6 ? -20 : 0 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      >
        <span style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>🚿</span>
      </motion.div>
    </section>
  );
}
