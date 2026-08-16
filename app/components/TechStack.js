'use client';

import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'React', color: '#61DAFB', svg: 'react' },
  { name: 'Next.js', color: '#000000', svgDark: '#ffffff', svg: 'nextdotjs' },
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
  { name: 'Three.js', color: '#000000', svgDark: '#ffffff', svg: 'threedotjs' },
];

function KeyboardKey({ skill, index }) {
  const iconUrl = skill.svg ? `https://cdn.simpleicons.org/${skill.svg}/${skill.color.replace('#', '')}` : null;

  return (
    <motion.div 
      className="iso-key"
      whileHover={{ y: 8, x: -8 }} // Push the key down
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="iso-key-top">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={skill.name}
            className="iso-key-icon"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : (
          <div style={{ display: 'none' }} />
        )}
        <span style={{
          display: iconUrl ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 800,
          color: skill.color,
          fontFamily: 'var(--font-mono)',
        }}>
          {skill.name.slice(0, 3).toUpperCase()}
        </span>
      </div>
      <div className="iso-key-left"></div>
      <div className="iso-key-bottom"></div>
      <div className="iso-key-shadow"></div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section className="tech-stack-section" style={{ position: 'relative', zIndex: 10, padding: '100px 0', overflow: 'hidden' }}>
      <div className="section" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="section-title">Tech Stack</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Press a key to interact</p>
        </div>

        {/* Isometric Keyboard Container */}
        <div className="keyboard-container">
          <div className="iso-grid">
            {SKILLS.map((s, i) => (
              <KeyboardKey key={i} skill={s} index={i} />
            ))}
            {/* Add an extra wide key for 'Space' */}
            <motion.div 
              className="iso-key iso-key-space"
              whileHover={{ y: 8, x: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="iso-key-top">
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '10px', color: 'var(--text-muted)' }}>FULL STACK DEV</span>
              </div>
              <div className="iso-key-left"></div>
              <div className="iso-key-bottom"></div>
              <div className="iso-key-shadow"></div>
            </motion.div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .keyboard-container {
          perspective: 2000px;
          transform-style: preserve-3d;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .iso-grid {
          display: grid;
          grid-template-columns: repeat(5, 80px);
          gap: 20px;
          /* The magic isometric rotation */
          transform: rotateX(60deg) rotateZ(-45deg);
          transform-style: preserve-3d;
        }

        @media (max-width: 768px) {
          .iso-grid {
            grid-template-columns: repeat(3, 70px);
            gap: 16px;
          }
        }

        .iso-key {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .iso-key-space {
          grid-column: span 3;
          aspect-ratio: 3 / 0.8;
        }

        .iso-key-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--bg-surface);
          border: 2px solid var(--border-mid);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(20px);
          transition: background 0.2s;
          box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
        }

        .iso-key:hover .iso-key-top {
          background: var(--bg-base);
          border-color: var(--accent);
        }

        .iso-key-icon {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        /* 3D Sides */
        .iso-key-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 100%;
          background: var(--bg-base);
          border: 1px solid var(--border);
          transform-origin: left;
          transform: rotateY(-90deg);
          border-radius: 4px 0 0 4px;
        }

        .iso-key-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: var(--bg-base);
          border: 1px solid var(--border);
          transform-origin: bottom;
          transform: rotateX(-90deg);
          border-radius: 0 0 4px 4px;
        }

        /* Drop shadow on the "floor" */
        .iso-key-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          transform: translateZ(-5px) scale(0.95);
          filter: blur(10px);
          transition: transform 0.2s, filter 0.2s;
        }

        .iso-key:hover .iso-key-shadow {
          transform: translateZ(-2px) scale(0.98);
          filter: blur(4px);
        }

        html[class*="dark"] .iso-key-shadow {
          background: rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
}
