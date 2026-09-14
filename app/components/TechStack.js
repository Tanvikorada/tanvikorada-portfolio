'use client';
import { useEffect, useState, useMemo } from 'react';
import { motion, useAnimationFrame, useSpring } from 'framer-motion';
import KineticText from './ui/KineticText';

const coreTech = [
  { slug: 'nextdotjs', color: '#000000' },
  { slug: 'react', color: '#61DAFB' },
  { slug: 'python', color: '#3776AB' },
  { slug: 'nodedotjs', color: '#339939' },
  { slug: 'typescript', color: '#3178C6' },
  { slug: 'javascript', color: '#F7DF1E' },
  { slug: 'postgresql', color: '#4169E1' },
  { slug: 'prisma', color: '#2D3748' },
  { slug: 'mongodb', color: '#47A248' },
  { slug: 'firebase', color: '#FFCA28' },
  { slug: 'amazonaws', color: '#232F3E' },
  { slug: 'docker', color: '#2496ED' },
  { slug: 'git', color: '#F05032' },
  { slug: 'github', color: '#181717' },
  { slug: 'vercel', color: '#000000' },
  { slug: 'figma', color: '#F24E1E' },
  { slug: 'html5', color: '#E34F26' },
  { slug: 'css3', color: '#1572B6' },
  { slug: 'tailwindcss', color: '#06B6D4' }
];

export default function TechStack() {
  const [isNight, setIsNight] = useState(true);
  
  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Use spring for entrance progress
  const introProgress = useSpring(0, { damping: 15, stiffness: 40 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) {
      introProgress.set(1);
    }
  }, [inView, introProgress]);

  // Generate initial Fibonacci sphere points
  const points = useMemo(() => {
    const pts = [];
    const n = coreTech.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const radius = 220; // sphere radius

    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      // Random starting positions far outside for the intro animation
      const angleOut = (i / n) * Math.PI * 2;
      const distOut = 1000 + Math.random() * 1000;
      
      pts.push({
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        startX: Math.cos(angleOut) * distOut,
        startY: Math.sin(angleOut) * distOut,
        startZ: (Math.random() - 0.5) * distOut,
        ...coreTech[i]
      });
    }
    return pts;
  }, []);

  // State to hold projected 2D coordinates for rendering
  const [renderedPoints, setRenderedPoints] = useState(points.map((pt) => ({ ...pt, x: 0, y: 0, scale: 0, opacity: 0, zIndex: 0 })));
  
  // Track continuous rotation
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  useAnimationFrame((t, delta) => {
    setRotation(prev => ({
      x: prev.x + (delta * 0.0002), // rotate vertically
      y: prev.y + (delta * 0.0005)  // rotate horizontally
    }));
  });

  // Calculate 3D to 2D projection every frame
  useEffect(() => {
    const rx = rotation.x;
    const ry = rotation.y;
    const p = introProgress.get();

    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const cosY = Math.cos(ry), sinY = Math.sin(ry);

    const projected = points.map(pt => {
      // 1. Rotate base point around Y axis
      const x1 = pt.baseX * cosY - pt.baseZ * sinY;
      const z1 = pt.baseZ * cosY + pt.baseX * sinY;

      // 2. Rotate around X axis
      const y2 = pt.baseY * cosX - z1 * sinX;
      const z2 = z1 * cosX + pt.baseY * sinX;

      // 3. Interpolate from start (explosion) to current rotated pos based on progress
      const currentX = pt.startX + (x1 - pt.startX) * p;
      const currentY = pt.startY + (y2 - pt.startY) * p;
      const currentZ = pt.startZ + (z2 - pt.startZ) * p;

      // 4. Project to 2D (Calculate scale and opacity based on Z depth)
      const depthScale = (220 + currentZ) / 440; // 0 (back) to 1 (front)
      const scale = 0.5 + (depthScale * 0.7); // size varies from 0.5x to 1.2x
      const opacity = p === 0 ? 0 : 0.3 + (depthScale * 0.7); // fade items in the back
      
      return {
        ...pt,
        x: currentX,
        y: currentY,
        z: currentZ,
        scale: scale,
        opacity: opacity,
        zIndex: Math.round(currentZ + 220) // proper DOM stacking order
      };
    });

    setRenderedPoints(projected);
  }, [rotation, introProgress, points]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="tech-stack" style={{ padding: '16vh 4vw', position: 'relative', overflow: 'hidden', background: 'var(--bg-base)' }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'800px', height:'800px', background: isNight ? 'radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, rgba(3, 4, 8, 0) 60%)' : 'radial-gradient(circle, rgba(0, 210, 255, 0.03) 0%, rgba(255, 255, 255, 0) 60%)', filter:'blur(80px)', pointerEvents:'none', zIndex:0 }} />
      
      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:2 }}>
        <div style={{ textAlign:'center', marginBottom:'4rem' }}>
          <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'var(--bg-surface)', border:'1px solid var(--border-mid)', padding:'6px 20px', borderRadius:'100px', marginBottom:'20px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--primary)', boxShadow:'0 0 10px var(--primary)', flexShrink:0 }} />
            <span style={{ fontSize:'12px', fontFamily:'var(--font-mono)', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)' }}>Tech Architecture</span>
          </motion.div>
          
          <motion.h2 
            initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
            style={{ fontSize:'clamp(2.5rem, 5vw, 4rem)', fontWeight:800, color:'var(--text-heading)', fontFamily:'var(--font-serif)', letterSpacing:'-0.03em', margin:'0 0 16px' }}
          >
            <KineticText text="The Engine Room." />
          </motion.h2>
          
          <motion.p initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}
            style={{ fontSize:'1.05rem', color:'var(--text-body)', maxWidth:'520px', margin:'0 auto', lineHeight:1.6 }}>
            The core technologies powering my full-stack applications and AI pipelines.
          </motion.p>
        </div>

        <motion.div 
          onViewportEnter={() => setInView(true)}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible' // Let particles fly in from outside
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {renderedPoints.map((pt, i) => {
              const isHovered = hoveredIndex === i;
              
              // Base logic for coloring
              // Using CDN based on isNight flag, but filtering to grayscale unless hovered
              let iconUrl;
              if (isHovered) {
                // If hovered, fetch the colored version directly or use the brand color
                iconUrl = `https://cdn.simpleicons.org/${pt.slug}/${pt.color.replace('#', '')}`;
              } else {
                // Not hovered: white if night mode, black if day mode
                iconUrl = isNight 
                  ? `https://cdn.simpleicons.org/${pt.slug}/white`
                  : `https://cdn.simpleicons.org/${pt.slug}/black`;
              }

              // Special handling for Github/Nextjs in dark mode since they are inherently black
              if (isHovered && isNight && (pt.slug === 'nextdotjs' || pt.slug === 'github')) {
                iconUrl = `https://cdn.simpleicons.org/${pt.slug}/white`;
              }

              return (
                <div 
                  key={pt.slug}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: 'absolute',
                    left: '50%', top: '50%',
                    width: '56px', height: '56px',
                    marginLeft: '-28px', marginTop: '-28px',
                    // Project 2D coordinates and scale manually
                    transform: `translate3d(${pt.x}px, ${pt.y}px, 0) scale(${isHovered ? 1.5 : pt.scale})`,
                    opacity: pt.opacity,
                    zIndex: isHovered ? 9999 : pt.zIndex,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isHovered ? `${pt.color}15` : 'var(--bg-surface)',
                    border: isHovered ? `1px solid ${pt.color}` : '1px solid var(--border-mid)',
                    borderRadius: '50%',
                    boxShadow: isHovered ? `0 0 20px ${pt.color}40` : 'inset 0 1px 3px rgba(255,255,255,0.05)',
                    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.1s linear',
                    cursor: 'default' // Changed to default as requested (no clicking away)
                  }}
                >
                  <img 
                    src={iconUrl} 
                    alt={pt.slug} 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      filter: isHovered ? `drop-shadow(0 0 8px ${pt.color}80)` : 'grayscale(100%) opacity(0.8)',
                      transition: 'all 0.2s ease',
                      pointerEvents: 'none'
                    }} 
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
