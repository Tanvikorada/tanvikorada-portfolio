'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const SKILLS = [
  { name: 'React', color: '#61DAFB', svg: 'react' },
  { name: 'Next.js', color: '#ffffff', svgDark: '#ffffff', svg: 'nextdotjs' },
  { name: 'Python', color: '#3776AB', svg: 'python' },
  { name: 'Node.js', color: '#339933', svg: 'nodedotjs' },
  { name: 'TypeScript', color: '#3178C6', svg: 'typescript' },
  { name: 'OpenAI', color: '#412991', svg: 'openai' },
  { name: 'LangChain', color: '#1C3C3C', svg: 'langchain' },
  { name: 'AWS', color: '#FF9900', svg: 'amazonaws' },
  { name: 'PostgreSQL', color: '#4169E1', svg: 'postgresql' },
  { name: 'Firebase', color: '#FFCA28', svg: 'firebase' },
  { name: 'Docker', color: '#2496ED', svg: 'docker' },
  { name: 'Git', color: '#F05032', svg: 'git' },
  { name: 'Tailwind', color: '#06B6D4', svg: 'tailwindcss' },
  { name: 'MongoDB', color: '#47A248', svg: 'mongodb' },
  { name: 'Three.js', color: '#ffffff', svgDark: '#ffffff', svg: 'threedotjs' },
];

export default function TechStack() {
  const containerRef = useRef(null);
  
  // Mouse tracking for the 3D Space Core
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [25, -25]);
  const rotateY = useTransform(smoothX, [0, 1], [-25, 25]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section className="tech-stack-section" style={{ position: 'relative', zIndex: 10, padding: '100px 8vw', background: 'var(--bg-base)' }}>
      <div className="section" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Left side: Tech Stack Grid */}
        <div style={{ flex: '1 1 500px' }}>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>Tech Stack</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '18px', maxWidth: '400px' }}>
            The tools and technologies I use to build high-performance, scalable applications.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '16px'
          }}>
            {SKILLS.map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.05 }}
                className="skill-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px 10px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={`https://cdn.simpleicons.org/${skill.svg}/${skill.color.replace('#', '')}`}
                  alt={skill.name}
                  style={{ width: '32px', height: '32px', filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.1))' }}
                  onError={(e) => e.target.style.display = 'none'}
                />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side: 3D Space Core */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            flex: '1 1 400px', 
            height: '600px', 
            perspective: '1000px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <motion.div
            style={{
              width: '300px',
              height: '300px',
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              position: 'relative'
            }}
          >
            {/* Outer Ring 1 */}
            <motion.div 
              animate={{ rotateZ: 360, rotateX: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: -50,
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                transformStyle: 'preserve-3d',
                boxShadow: '0 0 40px rgba(0, 150, 255, 0.2), inset 0 0 20px rgba(0, 150, 255, 0.1)'
              }}
            />
            {/* Outer Ring 2 */}
            <motion.div 
              animate={{ rotateZ: -360, rotateY: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: -20,
                border: '2px dashed rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                transformStyle: 'preserve-3d',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
              }}
            />
            
            {/* Inner Core */}
            <motion.div
              style={{
                position: 'absolute', inset: 50,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(0,0,0,0.8))',
                borderRadius: '50%',
                boxShadow: '0 0 60px rgba(0, 150, 255, 0.4), inset 0 0 40px rgba(0,0,0,0.9)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateZ(50px)'
              }}
            >
              <div style={{
                width: '40px', height: '40px',
                background: 'var(--accent)',
                borderRadius: '50%',
                boxShadow: '0 0 40px var(--accent), 0 0 80px var(--accent)'
              }} />
            </motion.div>
          </motion.div>

          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'var(--accent)',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px var(--accent)',
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
