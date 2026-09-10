'use client';
import { motion } from 'framer-motion';

const EDUCATION_DATA = [
  {
    institution: 'Ravindra Bharathi School',
    degree: 'Class X, BSEAP',
    timeline: '2022',
    score: 'Score: 88%',
    color: '#34d399' // Emerald
  },
  {
    institution: 'Tirumala Junior College',
    degree: 'Class XII (MPC), BIEAP',
    timeline: '2024',
    score: 'Score: 95.2%',
    color: '#60a5fa' // Blue
  },
  {
    institution: 'SRMIST Chennai',
    degree: 'B.Tech, CSE (Cloud Computing)',
    timeline: '2024 - 2028',
    score: 'CGPA: 9.27 / 10',
    color: '#c9961a' // Gold
  }
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '10vh 8vw', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', marginBottom: '3rem' }}
        >
          Education<span style={{ color: 'var(--primary)' }}>.</span>
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {EDUCATION_DATA.map((edu, i) => (
            <motion.div 
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bento-card"
              style={{ 
                padding: '3rem', 
                position: 'relative',
                borderTop: `2px solid ${edu.color}44`
              }}
            >
              <h3 style={{ fontSize: '2rem', color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
                {edu.institution}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-body)', fontSize: '1.1rem' }}>{edu.degree}</span>
                <span>•</span>
                <span>{edu.timeline}</span>
              </div>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center',
                padding: '0.5rem 1rem', 
                background: `linear-gradient(135deg, ${edu.color}15, ${edu.color}05)`, 
                border: `1px solid ${edu.color}33`,
                color: edu.color, 
                borderRadius: '8px', 
                fontWeight: '600', 
                fontSize: '1rem'
              }}>
                {edu.score}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
