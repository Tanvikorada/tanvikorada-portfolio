'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const INNER_R = 168;
const OUTER_R = 290;
const W = 840, H = 640, CX = 420, CY = 320;

const TECH = [
  { id: 'react',    ring: 0, angle: 0,   name: 'React',      label: 'Component Architecture',   color: '#61dafb' },
  { id: 'python',   ring: 0, angle: 90,  name: 'Python',     label: 'AI & Data Engine',         color: '#ffd43b' },
  { id: 'nodejs',   ring: 0, angle: 180, name: 'Node.js',    label: 'Event-Driven Backend',     color: '#68a063' },
  { id: 'openai',   ring: 0, angle: 270, name: 'OpenAI',     label: 'LLM Pipelines & RAG',      color: '#10a37f' },
  { id: 'postgres', ring: 1, angle: 45,  name: 'PostgreSQL', label: 'Relational DB & Supabase', color: '#336791' },
  { id: 'docker',   ring: 1, angle: 135, name: 'Docker',     label: 'Containers & DevOps',      color: '#2496ed' },
  { id: 'ts',       ring: 1, angle: 225, name: 'TypeScript', label: 'Type-Safe Full Stack',     color: '#3178c6' },
  { id: 'yolo',     ring: 1, angle: 315, name: 'YOLO / CV',  label: 'Object Detection',         color: '#f97316' },
];

// ── Brand-accurate logo components ──────────────────────────────────────────
function ReactLogo() {
  return (
    <svg viewBox="-11.5 -10.23 23 20.46" width="36" height="36" stroke="#61dafb" fill="none" strokeWidth="1">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" stroke="none"/>
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </svg>
  );
}
function PythonLogo() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
      <path d="M11.9 2c-3.1 0-5 1.7-5 3.9v2.2h5.1c1.8 0 3.3 1.5 3.3 3.3v1.6h2.2c2.2 0 3.9-1.9 3.9-5s-1.8-6-5.5-6h-4zm-1.8 1.9c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#4b8bbe"/>
      <path d="M12.1 22c3.1 0 5-1.7 5-3.9v-2.2h-5.1c-1.8 0-3.3-1.5-3.3-3.3V11H6.5c-2.2 0-3.9 1.9-3.9 5s1.8 6 5.5 6h4zm1.8-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#ffd43b"/>
    </svg>
  );
}
function NodeLogo() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="#68a063">
      <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.7.47 1.38 0 2.17-.84 2.17-2.3V8.28c0-.12-.1-.22-.22-.22h-.96c-.12 0-.22.1-.22.22v8.66c0 .65-.67 1.3-1.76.75L5.26 16.6a.26.26 0 0 1-.13-.22V7.8c0-.1.04-.18.13-.22l7.44-4.3a.27.27 0 0 1 .26 0l7.44 4.3c.08.04.13.13.13.22v8.58c0 .1-.05.18-.13.22l-7.44 4.3a.27.27 0 0 1-.26 0l-1.9-1.12c-.06-.04-.14-.05-.2-.02-.55.3-.65.36-1.16.51-.13.04-.32.1.07.3l2.48 1.46c.24.14.5.2.78.2s.54-.06.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.7c0-.56-.3-1.08-.78-1.36L12.78 2.05A1.6 1.6 0 0 0 12 1.85zm1.38 5.17c-2.15 0-3.43.91-3.43 2.43 0 1.63 1.24 2.09 3.28 2.29 2.42.22 2.6.56 2.6 1.02 0 .79-.63 1.13-2.12 1.13-1.86 0-2.27-.47-2.41-1.4-.02-.12-.13-.2-.25-.2h-.98c-.14 0-.24.11-.24.25 0 1.36.74 2.98 3.88 2.98 2.32 0 3.65-.92 3.65-2.52 0-1.59-1.07-2.01-3.34-2.31-2.27-.3-2.54-.46-2.54-1 0-.44.2-1.03 1.89-1.03 1.5 0 2.06.33 2.29 1.36.02.12.12.2.25.2h.98c.07 0 .13-.03.18-.07.04-.05.07-.11.06-.17C18.43 7.94 17.24 7.02 13.38 7.02z"/>
    </svg>
  );
}
function OpenAILogo() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="#10a37f">
      <path d="M22.28 9.82a5.99 5.99 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.99 5.99 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.99 5.99 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68V11.2l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.43zM3.6 18.3a4.47 4.47 0 0 1-.54-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95A4.5 4.5 0 0 1 3.6 18.3zm-1.22-9.77a4.49 4.49 0 0 1 2.34-1.97v5.68a.78.78 0 0 0 .39.68l5.84 3.37-2.02 1.17a.07.07 0 0 1-.07 0L4.02 14.68a4.5 4.5 0 0 1-1.64-6.14zm14.8 3.66-5.84-3.37 2.02-1.17a.07.07 0 0 1 .07 0l4.84 2.78a4.5 4.5 0 0 1-.68 8.11v-5.67a.79.79 0 0 0-.41-.68zm2.43-3.65-4.78-2.76a.77.77 0 0 0-.78 0L8.2 9.16V6.83a.08.08 0 0 1 .03-.06l4.84-2.79a4.5 4.5 0 0 1 6.15 1.65 4.49 4.49 0 0 1 .53 3.01zm-9.39-1.9 2.02-1.17a.07.07 0 0 1 .07 0l4.84 2.78a4.5 4.5 0 0 1-1.64 6.14 4.49 4.49 0 0 1-2.34 1.97V11.23a.78.78 0 0 0-.39-.68L8.2 7.18z"/>
    </svg>
  );
}
function PgLogo() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#336791" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  );
}
function DockerLogo() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="#2496ed">
      <path d="M13.98 11.08h2.12v-2.1h-2.12v2.1zm-2.83 0h2.13v-2.1h-2.13v2.1zm-2.83 0h2.13v-2.1H8.32v2.1zm-2.84 0h2.13v-2.1H5.48v2.1zm2.84-2.81h2.13V6.17H8.32v2.1zm2.83 0h2.13V6.17h-2.13v2.1zm2.83 0h2.12V6.17h-2.12v2.1zM23.72 12c-.31-.17-1.05-.24-1.6-.13-.07-.54-.4-1.01-.96-1.4l-.32-.22-.23.31a2.9 2.9 0 0 0-.43 1.38c-.03.5.14.99.47 1.38-.69.38-1.8.47-2.02.48H.31a.31.31 0 0 0-.31.31 9.55 9.55 0 0 0 .59 3.38c.44 1.15 1.1 2 1.99 2.5 1 .57 2.64.89 4.5.89.84 0 1.68-.07 2.41-.22a8.9 8.9 0 0 0 3.19-1.4 8.13 8.13 0 0 0 2.19-2.94h.19c1.21 0 1.96-.48 2.37-1.44.13-.3.34-.99.27-1.01l-.32-.1-.34.38c-.19.21-.43.38-.68.5l-.03.01h-.02l.05-.13c.16-.43.25-.9.25-1.37v-.2h.2c.34 0 .64-.04.94-.12l.35-.1-.11-.35c-.12-.38-.14-.89-.04-1.22l.07-.24.22.11c.5.25.85.7.87 1.27.01.38-.11.72-.37 1.02l-.21.24.31.09c.55.17 1.12.12 1.55-.14l.07-.04.03-.08c.09-.24.04-.89-.05-1.14l-.08-.21z"/>
    </svg>
  );
}
function TSLogo() {
  return (
    <svg viewBox="0 0 28 28" width="34" height="34">
      <rect width="28" height="28" rx="3" fill="#3178c6"/>
      <path d="M16.5 13.9h-2.8V22h-2.2v-8.1H8.7V12h7.8v1.9zm.4 6.2c0-.5.1-.9.3-1.3.2-.4.5-.7.9-.9.4-.2.8-.3 1.3-.3.7 0 1.3.2 1.8.6.5.4.7 1 .7 1.7h-2c0-.3-.1-.5-.2-.7-.1-.2-.3-.3-.6-.3-.2 0-.4.1-.5.2-.1.2-.2.4-.2.6 0 .2.1.4.2.5.1.1.4.3.9.5.5.2.9.4 1.2.6.3.2.6.5.7.8.2.3.3.7.3 1.1 0 .7-.3 1.3-.8 1.7-.5.4-1.1.6-1.9.6-.5 0-.9-.1-1.3-.3-.4-.2-.8-.5-1-.9-.3-.4-.4-.8-.4-1.3h2c0 .4.1.7.3.9.2.2.4.3.7.3.3 0 .5-.1.6-.2.1-.1.2-.3.2-.5 0-.2-.1-.4-.3-.5-.2-.1-.5-.3-.9-.4-.8-.3-1.3-.6-1.7-1-.4-.4-.5-.9-.5-1.5z" fill="white"/>
    </svg>
  );
}
function YoloLogo() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
    </svg>
  );
}
function NextLogo() {
  return (
    <svg viewBox="0 0 180 180" fill="none" width="52" height="52">
      <mask id="mnext" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black"/>
      </mask>
      <g mask="url(#mnext)">
        <circle cx="90" cy="90" r="90" fill="#000"/>
        <path d="M149.508 157.52L69.142 54H54V125.97H66.11V69.38L140 164.85A90 90 0 0 0 149.508 157.52Z" fill="white"/>
        <rect x="115" y="54" width="12" height="72" fill="white"/>
      </g>
    </svg>
  );
}

const LOGO_MAP = {
  react: ReactLogo, python: PythonLogo, nodejs: NodeLogo,
  openai: OpenAILogo, postgres: PgLogo, docker: DockerLogo,
  ts: TSLogo, yolo: YoloLogo,
};

export default function TechStack() {
  const [rotAngle, setRotAngle] = useState(0);
  const [hovered, setHovered] = useState(null);

  // requestAnimationFrame-based continuous rotation
  useEffect(() => {
    let raf;
    let prev = null;
    function tick(ts) {
      if (prev !== null) {
        setRotAngle(a => (a + (ts - prev) * 0.012) % 360);
      }
      prev = ts;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="tech-stack" style={{ padding: '16vh 4vw', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .orbit-ring {
          fill: none;
          stroke: rgba(255,255,255,0.08);
          stroke-width: 1.5;
          stroke-dasharray: 6 12;
        }
        .wire-line {
          fill: none;
          stroke: rgba(0,210,255,0.42);
          stroke-width: 1.5;
          filter: drop-shadow(0 0 4px rgba(0,210,255,0.55));
          transition: all 0.3s;
        }
        .wire-line.act {
          stroke: #00f0ff;
          stroke-width: 2.5;
          filter: drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 28px rgba(0,240,255,0.7));
        }
        .wire-pulse {
          fill: none;
          stroke: rgba(255,255,255,0.8);
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 16 280;
          animation: wflow 3.5s linear infinite;
          filter: drop-shadow(0 0 5px #00ffff);
          pointer-events: none;
        }
        @keyframes wflow { from { stroke-dashoffset: 296; } to { stroke-dashoffset: 0; } }
        .tnode {
          position: absolute;
          transform: translate(-50%,-50%);
          width: 78px; height: 78px;
          border-radius: 20px;
          background: #07090f;
          border: 1.5px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 14px 32px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.1);
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          z-index: 10;
        }
        .tnode:hover {
          border-color: var(--nc);
          box-shadow: 0 0 32px var(--ng), 0 14px 36px rgba(0,0,0,0.7);
          transform: translate(-50%,-50%) scale(1.13) !important;
        }
        .chip-wrap {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 138px; height: 138px; border-radius: 30px;
          background: #050710;
          border: 2px solid #00d2ff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 60px rgba(0,210,255,0.28), 0 0 120px rgba(0,100,255,0.1), 0 24px 64px rgba(0,0,0,0.85);
          z-index: 12;
        }
        .chip-inner {
          width: 96px; height: 96px; border-radius: 22px;
          background: linear-gradient(140deg,#2020ee 0%,#0000aa 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 2px 6px rgba(255,255,255,0.2);
        }
        .chip-pin { position: absolute; background: rgba(0,210,255,0.45); border-radius: 2px; }
        .tip {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%);
          background: #080b16;
          border: 1px solid var(--nc);
          box-shadow: 0 8px 24px rgba(0,0,0,0.9), 0 0 20px var(--ng);
          padding: 5px 14px; border-radius: 10px;
          white-space: nowrap; z-index: 50; pointer-events: none; text-align: center;
        }
        @media(max-width:768px){
          .orbit-stage { height: 420px !important; }
          .tnode { width:58px!important; height:58px!important; border-radius:14px!important; }
          .chip-wrap { width:100px!important; height:100px!important; }
          .chip-inner { width:70px!important; height:70px!important; }
        }
      `}</style>

      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'900px', height:'900px', background:'radial-gradient(circle, rgba(0,210,255,0.07) 0%, rgba(37,99,235,0.04) 40%, transparent 70%)', filter:'blur(100px)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:2 }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', padding:'6px 20px', borderRadius:'100px', marginBottom:'20px' }}>
            <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#00d2ff', boxShadow:'0 0 10px #00d2ff', flexShrink:0 }} />
            <span style={{ fontSize:'12px', fontFamily:'var(--font-mono)', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)' }}>Core Architecture</span>
          </motion.div>
          <motion.h2 initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
            style={{ fontSize:'clamp(2.6rem,5vw,4.2rem)', fontWeight:800, color:'var(--text-heading)', fontFamily:'var(--font-serif)', letterSpacing:'-0.03em', margin:'0 0 16px' }}>
            Connected <span style={{ color:'#00d2ff' }}>Tech Circuit.</span>
          </motion.h2>
          <motion.p initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}
            style={{ fontSize:'16px', color:'var(--text-muted)', maxWidth:'520px', margin:'0 auto', lineHeight:1.6 }}>
            Interactive nerve center powering full-stack architectures, vision pipelines, and production GenAI systems.
          </motion.p>
        </div>

        {/* Orbit Stage */}
        <div className="orbit-stage" style={{ position:'relative', width:'100%', maxWidth:'840px', height:'640px', margin:'0 auto', userSelect:'none' }}>

          {/* SVG layer: dashed orbit rings + animated connecting wires */}
          <svg viewBox={`0 0 ${W} ${H}`} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }}>
            <circle className="orbit-ring" cx={CX} cy={CY} r={INNER_R}/>
            <circle className="orbit-ring" cx={CX} cy={CY} r={OUTER_R}/>
            {TECH.map(t => {
              const a = (t.angle + rotAngle - 90) * Math.PI / 180;
              const r = t.ring === 0 ? INNER_R : OUTER_R;
              const nx = CX + r * Math.cos(a);
              const ny = CY + r * Math.sin(a);
              return (
                <g key={t.id}>
                  <line x1={CX} y1={CY} x2={nx} y2={ny} className={`wire-line${hovered===t.id?' act':''}`}/>
                  <line x1={CX} y1={CY} x2={nx} y2={ny} className="wire-pulse"/>
                </g>
              );
            })}
          </svg>

          {/* Center chip — static */}
          <div className="chip-wrap">
            {[[-54,-24],[-54,0],[-54,24],[54,-24],[54,0],[54,24],[-24,-54],[0,-54],[24,-54],[-24,54],[0,54],[24,54]].map(([px,py],i)=>(
              <div key={i} className="chip-pin" style={{ width:Math.abs(px)===54?14:22, height:Math.abs(py)===54?14:22, left:`calc(50% + ${px}px)`, top:`calc(50% + ${py}px)`, transform:'translate(-50%,-50%)' }}/>
            ))}
            <div className="chip-inner"><NextLogo/></div>
          </div>

          {/* Rotating satellite nodes */}
          {TECH.map(t => {
            const a = (t.angle + rotAngle - 90) * Math.PI / 180;
            const r = t.ring === 0 ? INNER_R : OUTER_R;
            const nx = CX + r * Math.cos(a);
            const ny = CY + r * Math.sin(a);
            const lp = (nx / W) * 100;
            const tp = (ny / H) * 100;
            const Logo = LOGO_MAP[t.id];
            return (
              <div
                key={t.id}
                className="tnode"
                style={{ left:`${lp}%`, top:`${tp}%`, '--nc':t.color, '--ng':t.color+'55' }}
                onMouseEnter={()=>setHovered(t.id)}
                onMouseLeave={()=>setHovered(null)}
              >
                {/* Counter-rotate the icon so it stays upright as the orbit spins */}
                <div style={{ transform:`rotate(${-rotAngle}deg)`, display:'flex', alignItems:'center', justifyContent:'center', willChange:'transform' }}>
                  <Logo/>
                </div>
                {hovered===t.id && (
                  <div className="tip" style={{ '--nc':t.color, '--ng':t.color+'44' }}>
                    <div style={{ fontSize:'13px', fontWeight:700, color:'#fff' }}>{t.name}</div>
                    <div style={{ fontSize:'11px', color:'var(--text-muted)', fontFamily:'var(--font-mono)', marginTop:'2px' }}>{t.label}</div>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
