'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = [
  { name: 'React',       color: '#61DAFB' },
  { name: 'Next.js',    color: '#ffffff' },
  { name: 'Python',     color: '#3776AB' },
  { name: 'Node.js',    color: '#339933' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'OpenAI',     color: '#412991' },
  { name: 'LangChain',  color: '#1db954' },
  { name: 'AWS',        color: '#FF9900' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Firebase',   color: '#FFCA28' },
  { name: 'Docker',     color: '#2496ED' },
  { name: 'Git',        color: '#F05032' },
  { name: 'Tailwind',   color: '#06B6D4' },
  { name: 'MongoDB',    color: '#47A248' },
];

export default function TechStack() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="stack"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '80px 8vw',
        background: 'var(--bg-base)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 className="section-title">Tech Stack</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginTop: '12px' }}>
            The tools I use to build AI-powered, full-stack applications
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{
          display: 'flex',
          gap: '60px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>

          {/* Left — 3D Spline Keyboard */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              flex: '1 1 480px',
              height: '480px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(91,33,182,0.3)',
              boxShadow: '0 0 60px rgba(91,33,182,0.12)',
              background: '#050510',
            }}
          >
            {/* Loading shimmer */}
            <AnimatePresence>
              {!loaded && (
                <motion.div
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #0d0d2b, #1a0a3d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '3px solid rgba(91,33,182,0.3)',
                      borderTopColor: '#5b21b6',
                    }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Loading 3D Keyboard...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <iframe
              src="https://my.spline.design/interactivekeyboardbyabhinandcopycopy-BfsVoYA194v5uDcGlns84SMF/"
              frameBorder="0"
              width="100%"
              height="100%"
              onLoad={() => setLoaded(true)}
              style={{ display: 'block', border: 'none' }}
              title="Interactive 3D Keyboard"
            />
          </motion.div>

          {/* Right — Skill pills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ flex: '1 1 280px' }}
          >
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text-heading)',
              marginBottom: '24px',
            }}>
              My Toolkit
            </h3>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: `${skill.color}14`,
                    border: `1px solid ${skill.color}44`,
                    color: skill.color,
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'default',
                    boxShadow: `0 2px 12px ${skill.color}18`,
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 4px 24px ${skill.color}44`;
                    e.currentTarget.style.background = `${skill.color}28`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = `0 2px 12px ${skill.color}18`;
                    e.currentTarget.style.background = `${skill.color}14`;
                  }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>

            <div style={{
              marginTop: '36px',
              padding: '20px',
              borderRadius: '16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
            }}>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '14px',
                lineHeight: 1.7,
                margin: 0,
              }}>
                Interact with the 3D keyboard on the left — each key represents a technology I use to craft production-ready, AI-powered applications.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
