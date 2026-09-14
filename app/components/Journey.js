'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const EXPERIENCE = [
  {
    id: 'atribs',
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems Pvt Ltd',
    period: 'Sep 2026 - Oct 2026',
    desc: 'Progressive Web App (PWA) development - building installable, mobile-first web applications with offline capability.',
    tags: ['Full-Stack', 'PWA']
  },
  {
    id: 'future',
    title: 'Prompt Engineering Intern',
    org: 'Future Interns',
    period: 'Dec 2025 - Jan 2026',
    desc: 'Designed multi-step AI workflows and agent behaviors for GenAI systems across 5+ business use cases.',
    tags: ['AI / GenAI']
  },
  {
    id: 'prodigy',
    title: 'Full Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    period: 'Jun 2025 - Jul 2025',
    desc: 'Built responsive full-stack web modules using HTML, CSS, JavaScript, and REST API integration across 3+ production features.',
    tags: ['Full-Stack']
  }
];

const EDUCATION = [
  {
    id: 'srmist',
    title: 'B.Tech - CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    period: '2024 - 2028',
    desc: 'Focus on distributed systems, deep learning architectures and full-stack AI engineering. CGPA: 9.27/10',
    tags: ['Cloud Arch', 'AI / ML', 'DSA']
  },
  {
    id: 'tirumala',
    title: 'Intermediate',
    org: 'Tirumala Junior College',
    period: '2022 - 2024',
    desc: 'Maths, Physics, and Chemistry focus. Secured 952/1000 in Boards. Built foundational analytical logic.',
    tags: ['MPC', '95.2%']
  },
  {
    id: 'ravindra',
    title: 'Secondary Education',
    org: 'Ravindra Bharathi School',
    period: '2012 - 2022',
    desc: 'Completed secondary education with a strong foundation in sciences and mathematics. Secured 88% in 10th standard boards.',
    tags: ['88%']
  }
];

function WaterCard({ item, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="water-card group"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="water-card-highlight"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.6),
              transparent 80%
            )
          `
        }}
      />
      
      <div className="water-card-content">
        <div className="water-card-period">{item.period}</div>
        <div className="water-card-body">
          <h3 className="water-card-title">{item.title}</h3>
          <div className="water-card-org">{item.org}</div>
          <p className="water-card-desc">{item.desc}</p>
          <div className="water-card-tags">
            {item.tags.map(tag => (
              <span key={tag} className="water-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" style={{ padding: '12vh 4vw', position: 'relative' }}>
      <style>{`
        .water-section-title {
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 800;
          color: var(--text-heading);
          font-family: var(--font-serif);
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }

        .water-card {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border-radius: 40px;
          padding: 40px;
          margin-bottom: 32px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border 0.4s ease;
          
          /* Water reflection & deep glass drop shadow */
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-bottom-color: rgba(255, 255, 255, 0.3);
          border-right-color: rgba(255, 255, 255, 0.3);
          
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.08),
            inset 3px 3px 6px rgba(255, 255, 255, 1),
            inset -3px -3px 6px rgba(0, 0, 0, 0.05),
            inset 20px 20px 60px rgba(255, 255, 255, 0.4);
        }

        body.night .water-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom-color: rgba(255, 255, 255, 0.05);
          border-right-color: rgba(255, 255, 255, 0.05);
          
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.4),
            inset 1px 1px 3px rgba(255, 255, 255, 0.4),
            inset -1px -1px 3px rgba(0, 0, 0, 0.3),
            inset 10px 10px 40px rgba(255, 255, 255, 0.05);
        }

        .water-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(255,255,255,1);
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.1),
            inset 3px 3px 8px rgba(255, 255, 255, 1),
            inset -3px -3px 8px rgba(0, 0, 0, 0.03),
            inset 20px 20px 80px rgba(255, 255, 255, 0.6);
        }

        body.night .water-card:hover {
          border-color: rgba(255,255,255,0.3);
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.5),
            inset 2px 2px 5px rgba(255, 255, 255, 0.5),
            inset -2px -2px 5px rgba(0, 0, 0, 0.4),
            inset 10px 10px 50px rgba(255, 255, 255, 0.1);
        }

        .water-card-highlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .water-card:hover .water-card-highlight {
          opacity: 1;
        }

        .water-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column; /* Vertical stacking for grid */
          gap: 16px;
        }

        .water-card-period {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .water-card-body {
          flex: 1;
        }

        .water-card-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 0.25rem;
          font-family: var(--font-serif);
          letter-spacing: -0.02em;
        }

        .water-card-org {
          font-size: 1.1rem;
          color: var(--primary);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .water-card-desc {
          color: var(--text-body);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          max-width: 100%;
        }

        .water-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .water-tag {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.7);
          color: var(--text-heading);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: var(--font-mono);
          backdrop-filter: blur(10px);
          transition: all 0.2s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        body.night .water-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: none;
        }

        .water-card:hover .water-tag {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 6px 16px rgba(168, 85, 247, 0.3);
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
          
          {/* Left Column: Experience */}
          {EXPERIENCE.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '3rem', paddingLeft: '1rem' }}
              >
                <h2 className="water-section-title">Experience.</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px' }}>
                  Building scalable web applications, AI pipelines, and production-ready systems.
                </p>
              </motion.div>

              <div>
                {EXPERIENCE.map((item, index) => (
                  <WaterCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Right Column: Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '3rem', paddingLeft: '1rem' }}
            >
              <h2 className="water-section-title">Education.</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px' }}>
                Academic foundations in computer science and distributed architecture.
              </p>
            </motion.div>

            <div>
              {EDUCATION.map((item, index) => (
                <WaterCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
