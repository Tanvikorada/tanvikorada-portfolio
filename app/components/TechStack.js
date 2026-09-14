'use client';
import { useEffect, useState, useMemo } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import KineticText from './ui/KineticText';

const slugs = [
  "typescript", "javascript", "dart", "java", "react", "flutter", 
  "android", "html5", "css3", "nodedotjs", "express", "nextdotjs", 
  "prisma", "amazonaws", "postgresql", "firebase", "nginx", "vercel", 
  "testinglibrary", "jest", "cypress", "docker", "git", "jira", 
  "github", "gitlab", "visualstudiocode", "androidstudio", "sonarqube", "figma"
];

function IconNode({ slug, index, total, rot, progress, isNight }) {
  const R = 220; // sphere radius
  // Fibonacci sphere math
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  
  const x = R * Math.cos(theta) * Math.sin(phi);
  const y = R * Math.sin(theta) * Math.sin(phi);
  const z = R * Math.cos(phi);

  // Random starting position far away (all around the screen)
  const startX = useMemo(() => (Math.random() - 0.5) * 3000, []);
  const startY = useMemo(() => (Math.random() - 0.5) * 3000, []);
  const startZ = useMemo(() => (Math.random() - 0.5) * 3000, []);

  // Compute transform: scatter based on progress, then billboard to camera
  const transform = useTransform([rot, progress], ([r, p]) => {
    const curX = startX + (x - startX) * p;
    const curY = startY + (y - startY) * p;
    const curZ = startZ + (z - startZ) * p;
    const ry = r;
    const rx = r * 0.5;
    return `translate3d(${curX}px, ${curY}px, ${curZ}px) rotateY(${-ry}rad) rotateX(${-rx}rad)`;
  });

  const opacity = useTransform(progress, [0, 0.8, 1], [0, 1, 1]);

  const [hovered, setHovered] = useState(false);
  
  // Icon URL based on theme (white in night mode, default in day mode)
  const iconUrl = isNight 
    ? `https://cdn.simpleicons.org/${slug}/white` 
    : `https://cdn.simpleicons.org/${slug}/black`;

  return (
    <motion.a 
      href={`https://google.com/search?q=${slug}+technology`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: '50%', top: '50%',
        width: '56px', height: '56px',
        marginLeft: '-28px', marginTop: '-28px',
        transform,
        opacity,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-mid)',
        borderRadius: '50%',
        boxShadow: hovered ? '0 0 30px var(--primary)' : 'inset 0 1px 3px rgba(255,255,255,0.05)',
        scale: hovered ? 1.4 : 1,
        transition: 'scale 0.2s, box-shadow 0.2s, background 0.2s',
        // Dynamic zIndex trick: since CSS 3D handles depth visually, we just need the hovered one on top
        zIndex: hovered ? 999 : 1
      }}
    >
      <img 
        src={iconUrl} 
        alt={slug} 
        style={{ 
          width: '28px', 
          height: '28px', 
          filter: hovered ? 'drop-shadow(0 0 8px var(--primary))' : 'none', 
          transition: 'all 0.2s',
          pointerEvents: 'none'
        }} 
      />
    </motion.a>
  );
}

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

  const rot = useMotionValue(0);
  useAnimationFrame((t, delta) => {
    // Continuous rotation
    rot.set(rot.get() + delta * 0.0003);
  });

  const parentRotateY = rot;
  const parentRotateX = useTransform(rot, v => v * 0.5);
  const parentTransform = useTransform([parentRotateX, parentRotateY], ([rx, ry]) => {
    return `rotateX(${rx}rad) rotateY(${ry}rad)`;
  });

  const progress = useSpring(0, { damping: 15, stiffness: 40 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) {
      progress.set(1);
    }
  }, [inView, progress]);

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
            Click an icon to inspect the technology. The core components driving my full-stack web applications and AI pipelines.
          </motion.p>
        </div>

        <motion.div 
          onViewportEnter={() => setInView(true)}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            perspective: '1200px', // Creates the 3D depth
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: parentTransform
            }}
          >
            {slugs.map((slug, i) => (
              <IconNode 
                key={slug} 
                slug={slug} 
                index={i} 
                total={slugs.length} 
                rot={rot} 
                progress={progress} 
                isNight={isNight} 
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
