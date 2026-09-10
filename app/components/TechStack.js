'use client';
import { motion } from 'framer-motion';

const SKILLS = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase'] },
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Python'] },
  { category: 'Design & Tools', items: ['Figma', 'Spline', 'Git', 'Vercel', 'AWS'] },
];

export default function TechStack() {
  return (
    <section id="stack" style={{ padding: '10vh 8vw', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', marginBottom: '3rem' }}
        >
          Tech Stack
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {SKILLS.map((group, i) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bento-card"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {group.category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.items.map(item => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
