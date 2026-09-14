'use client';
import { motion } from 'framer-motion';

export default function CssKeyboard() {
  const stack = ['React', 'Next.js', 'Python', 'Node.js', 'MongoDB', 'AWS', 'Firebase', 'YOLO', 'HTML', 'CSS', 'JS', 'TS', 'Tailwind', 'GenAI', 'Prompt', 'Postgres'];
  
  return (
    <div style={{
      perspective: '1200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4rem',
      background: 'transparent'
    }}>
      <div style={{
        transform: 'rotateX(55deg) rotateZ(-40deg)',
        transformStyle: 'preserve-3d',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 80px)',
        gap: '16px',
        padding: '32px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
      }}>
        {stack.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ z: -4 }}
            whileTap={{ z: -10 }}
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transformStyle: 'preserve-3d',
              position: 'relative',
              boxShadow: '0 10px 0 rgba(0,0,0,0.3)'
            }}
          >
            {/* Top Surface */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              transform: 'translateZ(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-heading)'
            }}>
              {skill}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
