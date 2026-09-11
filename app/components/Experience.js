'use client';
import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    role: 'Software Development Intern',
    company: 'ATRIBS Software Systems Pvt Ltd',
    date: 'Sep 2026 - Oct 2026',
    desc: 'Progressive Web App (PWA) development — building installable, mobile-first web applications with offline capability and app-like UX in a live production environment.',
    tag: 'Full-Stack / PWA',
  },
  {
    role: 'Prompt Engineering Intern',
    company: 'Future Interns',
    date: 'Dec 2025 – Jan 2026',
    desc: 'Designed multi-step AI workflows and agent behaviors for GenAI systems across 5+ business use cases. Optimized LLM output quality through task decomposition and iterative refinement.',
    tag: 'AI / GenAI',
  },
  {
    role: 'Full Stack Web Dev Intern',
    company: 'Prodigy InfoTech',
    date: 'Jun 2025 – Jul 2025',
    desc: 'Built responsive full-stack web modules using HTML, CSS, JavaScript, and REST API integration across 3+ production features.',
    tag: 'Full-Stack',
  },
  {
    role: 'Python Developer Intern',
    company: 'CodSoft',
    date: 'Jun 2025 – Jul 2025',
    desc: 'Developed automated data processing pipelines in Python, eliminating manual steps for 2 recurring business workflows.',
    tag: 'Python',
  },
  {
    role: 'Artificial Intelligence Intern',
    company: 'Codec Technologies',
    date: 'May 2025 – Jun 2025',
    desc: 'Built and evaluated ML prototypes (classification, regression) on structured datasets; designed data pipelines from ingestion through model evaluation.',
    tag: 'ML / AI',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ position: 'relative' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 8vw' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Professional Experience
          </p>
          <h2 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
            Where I&apos;ve <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>worked.</em>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr auto',
                gap: '0 48px',
                padding: '2.5rem 0',
                borderBottom: '1px solid var(--border)',
                alignItems: 'start',
                cursor: 'default',
              }}
              whileHover={{ backgroundColor: 'var(--border)' }}
            >
              {/* Left: role + company */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px', lineHeight: 1.3 }}>
                  {exp.role}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>
                  {exp.company}
                </p>
              </div>

              {/* Middle: description */}
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                {exp.desc}
              </p>

              {/* Right: date + tag */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', whiteSpace: 'nowrap' }}>
                  {exp.date}
                </p>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  border: '1px solid var(--border-mid)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '1px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>
                  {exp.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

