'use client';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

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

        {/* Right side: Spline 3D Keyboard */}
        <div 
          style={{ 
            flex: '1 1 400px', 
            height: '600px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Loaded from public folder! */}
          <Spline scene="/skills-keyboard.spline" />
        </div>

      </div>
    </section>
  );
}
