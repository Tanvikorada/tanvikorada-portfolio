'use client';
import { motion } from 'framer-motion';

const STACK = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'] },
  { category: 'Backend & DB', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Supabase'] },
  { category: 'AI & ML', items: ['PyTorch', 'TensorFlow', 'YOLO', 'OpenAI', 'Hugging Face'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma', 'Vercel'] }
];

export default function TechStack() {
  return (
    <section style={{ padding: '15vh 5vw', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '8vh' }}>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 20px', borderRadius: '100px', display: 'inline-block', marginBottom: '24px', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
          >
            Technical Arsenal
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            The tools that power <br/>
            <span style={{ color: 'var(--text-muted)' }}>my digital experiences.</span>
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {STACK.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--bg-glass) 40%, rgba(255,255,255,0.05)), color-mix(in srgb, var(--bg-glass) 60%, rgba(0,0,0,0.02)))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                {group.category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {group.items.map((tech, j) => (
                  <div 
                    key={j}
                    style={{
                      padding: '8px 16px',
                      background: 'color-mix(in srgb, var(--text-heading) 5%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--text-heading) 10%, transparent)',
                      borderRadius: '100px',
                      fontSize: '14px',
                      color: 'var(--text-body)',
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                      cursor: 'default'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'color-mix(in srgb, var(--text-heading) 10%, transparent)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'color-mix(in srgb, var(--text-heading) 5%, transparent)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
