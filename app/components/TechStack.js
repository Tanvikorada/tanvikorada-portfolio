'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// --- Custom useFrame Hook ---
function useFrame(callback) {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(time, deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
}

export default function TechStack() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isStageHovered, setIsStageHovered] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Fast spin velocity ref
  const vel = useRef(0);
  const rot = useRef(0);
  const [rotAngle, setRotAngle] = useState(0);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const obs = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Trigger fast spin when entering view
  useEffect(() => {
    if (isInView) {
      vel.current = 6.0; // Fast initial spin!
    }
  }, [isInView]);

  useFrame((time, delta) => {
    if (!isStageHovered) {
      // Smoothly decay down to idle speed 0.15
      vel.current += (0.15 - vel.current) * 0.05;
    } else {
      // Pause completely on hover
      vel.current += (0.0 - vel.current) * 0.1;
    }
    rot.current += vel.current;
    setRotAngle(rot.current);
  });

  const TECH = [
    { id: 'react', name: 'React', label: 'UI Framework', angle: 0, ring: 1, color: '#00d8ff' },
    { id: 'python', name: 'Python', label: 'AI / Backend', angle: 45, ring: 0, color: '#4b8bbe' },
    { id: 'nodejs', name: 'Node.js', label: 'Runtime', angle: 90, ring: 1, color: '#539e43' },
    { id: 'openai', name: 'OpenAI API', label: 'LLMs', angle: 135, ring: 0, color: '#10a37f' },
    { id: 'postgres', name: 'PostgreSQL', label: 'Database', angle: 180, ring: 1, color: '#336791' },
    { id: 'docker', name: 'Docker', label: 'DevOps', angle: 225, ring: 0, color: '#2496ed' },
    { id: 'ts', name: 'TypeScript', label: 'Type Safety', angle: 270, ring: 1, color: '#3178c6' },
    { id: 'nextjs', name: 'Next.js', label: 'React Framework', angle: 315, ring: 0, color: '#000000' },
  ];

  const CX = 400, CY = 400;
  const INNER_R = 180;
  const OUTER_R = 320;
  const TILT = 75; // More 3D!
  const W = 800, H = 800;

  function ReactLogo() { return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="34" height="34" alt="React" />; }
  function PythonLogo() { return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="34" height="34" alt="Python" />; }
  function NodeLogo() { return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="34" height="34" alt="Node.js" />; }
  function PgLogo() { return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="34" height="34" alt="PostgreSQL" />; }
  function DockerLogo() { return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" width="34" height="34" alt="Docker" />; }
  function TSLogo() { return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="30" height="30" alt="TypeScript" style={{ borderRadius: 4 }} />; }
  function NextLogo() { 
    return isNight ? 
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-line.svg" style={{ filter: 'invert(1)' }} width="34" height="34" alt="Next.js" /> :
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="34" height="34" alt="Next.js" />;
  }
  function OpenAILogo() {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M22.28 9.82a5.99 5.99 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.99 5.99 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.99 5.99 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68V11.2l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.43zM3.6 18.3a4.47 4.47 0 0 1-.54-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95A4.5 4.5 0 0 1 3.6 18.3zm-1.22-9.77a4.49 4.49 0 0 1 2.34-1.97v5.68a.78.78 0 0 0 .39.68l5.84 3.37-2.02 1.17a.07.07 0 0 1-.07 0L4.02 14.68a4.5 4.5 0 0 1-1.64-6.14zm14.8 3.66-5.84-3.37 2.02-1.17a.07.07 0 0 1 .07 0l4.84 2.78a4.5 4.5 0 0 1-.68 8.11v-5.67a.79.79 0 0 0-.41-.68zm2.43-3.65-4.78-2.76a.77.77 0 0 0-.78 0L8.2 9.16V6.83a.08.08 0 0 1 .03-.06l4.84-2.79a4.5 4.5 0 0 1 6.15 1.65 4.49 4.49 0 0 1 .53 3.01zm-9.39-1.9 2.02-1.17a.07.07 0 0 1 .07 0l4.84 2.78a4.5 4.5 0 0 1-1.64 6.14 4.49 4.49 0 0 1-2.34 1.97V11.23a.78.78 0 0 0-.39-.68L8.2 7.18z"/>
      </svg>
    );
  }
  function CenterCoreLogo() {
    return isNight ? 
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-line.svg" style={{ filter: 'invert(1)' }} width="50" height="50" alt="Core" /> :
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="50" height="50" alt="Core" />;
  }

  const LOGO_MAP = {
    react: ReactLogo, python: PythonLogo, nodejs: NodeLogo,
    openai: OpenAILogo, postgres: PgLogo, docker: DockerLogo,
    ts: TSLogo, nextjs: NextLogo,
  };

  return (
    <section ref={sectionRef} id="tech-stack" style={{ padding: '16vh 4vw', position: 'relative', overflow: 'hidden', background: 'var(--bg-base)' }}>
      <style>{`
        .scene {
          position: relative;
          width: 100%;
          height: 700px;
          perspective: 800px; /* Stronger 3D perspective */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .stage {
          position: absolute;
          width: 800px;
          height: 800px;
          transform-style: preserve-3d;
        }

        .tnode {
          position: absolute;
          width: 80px; height: 80px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }

        .tnode-inner { 
          width: 100%; height: 100%; 
          border-radius: 50%; 
          background: transparent; 
          border: 1px solid var(--border-mid); 
          display: flex; align-items: center; justify-content: center; 
          transition: all 0.3s;
        }

        .chip-wrap {
          position: absolute;
          left: 50%; top: 50%;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 60px var(--primary-glow, rgba(0, 210, 255, 0.1)), var(--shadow-lg);
          z-index: 12;
        }
        
        .chip-inner {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 1px solid var(--border-mid);
          display: flex; align-items: center; justify-content: center;
        }

        .tip {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--text-heading);
          color: var(--bg-solid);
          box-shadow: var(--shadow-lg);
          padding: 8px 16px;
          border-radius: 8px;
          white-space: nowrap;
          z-index: 50;
          pointer-events: none;
          text-align: center;
        }

        @media(max-width:768px){
          .scene { height: 400px !important; perspective: 600px; transform: scale(0.85); }
        }
      `}</style>

      {/* Background glow matching theme */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'800px', height:'800px', background: isNight ? 'radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, rgba(3, 4, 8, 0) 60%)' : 'radial-gradient(circle, rgba(0, 210, 255, 0.03) 0%, rgba(255, 255, 255, 0) 60%)', filter:'blur(80px)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:2 }}>

        <div style={{ textAlign:'center', marginBottom:'4rem' }}>
          <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'var(--bg-surface)', border:'1px solid var(--border-mid)', padding:'6px 20px', borderRadius:'100px', marginBottom:'20px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', boxShadow:'0 0 10px var(--primary)', flexShrink:0 }} />
            <span style={{ fontSize:'12px', fontFamily:'var(--font-mono)', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)' }}>Tech Architecture</span>
          </motion.div>
          
          <motion.h2 initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
            style={{ fontSize:'clamp(2.5rem, 5vw, 4rem)', fontWeight:800, color:'var(--text-heading)', fontFamily:'var(--font-serif)', letterSpacing:'-0.03em', margin:'0 0 16px' }}>
            The <span style={{ color:'var(--primary)' }}>Engine</span> Room.
          </motion.h2>
          
          <motion.p initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}
            style={{ fontSize:'1.05rem', color:'var(--text-body)', maxWidth:'520px', margin:'0 auto', lineHeight:1.6 }}>
            Hover over the circuit to inspect the full-stack architecture powering robust web apps and production AI pipelines.
          </motion.p>
        </div>

        <div className="scene">
          <div 
            className="stage"
            onMouseEnter={() => setIsStageHovered(true)}
            onMouseLeave={() => setIsStageHovered(false)}
            style={{ transform: `rotateX(${TILT}deg) rotateZ(${rotAngle}deg)` }}
          >
            <div 
              className="chip-wrap"
              style={{ 
                transform: `translate(-50%, -50%) rotateZ(${-rotAngle}deg) rotateX(${-TILT}deg)` 
              }}
            >
              <div className="chip-inner"><CenterCoreLogo/></div>
            </div>

            {TECH.map(t => {
              const a = (t.angle - 90) * Math.PI / 180;
              const r = t.ring === 0 ? INNER_R : OUTER_R;
              
              const nx = CX + r * Math.cos(a);
              const ny = CY + r * Math.sin(a);
              const left = (nx / W) * 100;
              const top = (ny / H) * 100;
              
              const Logo = LOGO_MAP[t.id];
              const isHovered = hoveredNode === t.id;
              
              const isNextDark = isNight && t.id === 'nextjs';
              const hexColor = isNextDark ? '#ffffff' : t.color;
              const filterOnHover = isNextDark ? 'brightness(0)' : 'brightness(0) invert(1)';
              
              return (
                <div
                  key={t.id}
                  className="tnode"
                  onMouseEnter={() => setHoveredNode(t.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    left: `${left}%`, top: `${top}%`,
                    transform: `translate(-50%, -50%) rotateZ(${-rotAngle}deg) rotateX(${-TILT}deg)`
                  }}
                >
                  <motion.div
                    className="tnode-inner"
                    animate={{
                      scale: isHovered ? 1.15 : 1,
                      y: isHovered ? -8 : 0,
                      backgroundColor: isHovered ? hexColor : 'transparent',
                      borderColor: isHovered ? hexColor : 'var(--border-mid)',
                      boxShadow: isHovered ? `0 15px 35px ${hexColor}88` : '0 4px 12px rgba(0,0,0,0)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{
                       filter: isHovered ? filterOnHover : 'grayscale(100%) opacity(0.5)',
                       transition: 'all 0.3s',
                       display: 'flex',
                       color: 'var(--text-heading)'
                    }}>
                       <Logo/>
                    </div>
                  </motion.div>
                  
                  {isHovered && (
                    <div className="tip">
                      <div style={{ fontSize:'14px', fontWeight:700 }}>{t.name}</div>
                      <div style={{ fontSize:'11px', opacity: 0.8, fontFamily:'var(--font-mono)', marginTop:'4px' }}>{t.label}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
