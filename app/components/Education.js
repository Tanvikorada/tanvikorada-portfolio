'use client';
import { motion } from 'framer-motion';

const EDUCATION_DATA = [
  {
    institution: 'Ravindra Bharathi School',
    short: 'Class X · BSEAP',
    timeline: '2022',
    score: '88%',
    label: 'Secondary School',
    color: '#34d399',
  },
  {
    institution: 'Tirumala Junior College',
    short: 'Class XII (MPC) · BIEAP',
    timeline: '2024',
    score: '95.2%',
    label: 'Higher Secondary',
    color: '#60a5fa',
  },
  {
    institution: 'SRMIST Chennai',
    short: 'B.Tech · CSE (Cloud Computing)',
    timeline: '2024 – 2028',
    score: '9.27 / 10',
    label: 'Undergraduate',
    color: '#f59e0b',
  },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '10vh 8vw', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Academic Journey
          </p>
          <h2 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
            Education
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {EDUCATION_DATA.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1px 1fr',
                gap: '0 40px',
                position: 'relative',
                paddingBottom: i < EDUCATION_DATA.length - 1 ? '3.5rem' : 0,
              }}
            >
              <div style={{ textAlign: 'right', paddingTop: '4px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                  {edu.timeline}
                </span>
              </div>

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: edu.color, flexShrink: 0, marginTop: '6px', boxShadow: '0 0 0 3px ' + edu.color + '33' }} />
                {i < EDUCATION_DATA.length - 1 && (
                  <div style={{ width: '1px', flex: 1, background: 'var(--border)', marginTop: '8px' }} />
                )}
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: edu.color, marginBottom: '8px' }}>
                  {edu.label}
                </p>
                <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', marginBottom: '8px', lineHeight: 1.2 }}>
                  {edu.institution}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{edu.short}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid ' + edu.color + '44', background: edu.color + '0d' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: edu.color, display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: edu.color }}>{edu.score}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
