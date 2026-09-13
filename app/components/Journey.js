'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EXPERIENCE = [
  {
    id: 'atribs',
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems',
    period: 'Sep – Oct 2026',
    desc: 'Engineering a full Progressive Web App from the ground up — installable, offline-first, background sync and native-like UX.',
    tags: ['Next.js', 'PWA', 'Service Workers'],
  },
  {
    id: 'future-interns',
    title: 'Prompt Engineering & AI Intern',
    org: 'Future Interns',
    period: 'Dec 2025 – Jan 2026',
    desc: 'Designed multi-step agentic workflows and LLM orchestration pipelines. Reduced hallucinations via systematic prompt decomposition.',
    tags: ['Agentic AI', 'LLM Orchestration', 'RAG'],
  },
  {
    id: 'prodigy',
    title: 'Full-Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    period: 'Jun – Jul 2025',
    desc: 'Built responsive full-stack modules with REST APIs, optimised rendering bottlenecks and shipped 3+ production features.',
    tags: ['React', 'Node.js', 'REST APIs'],
  }
];

const EDUCATION = [
  {
    id: 'srmist',
    title: 'B.Tech — CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    period: '2024 – 2028',
    desc: 'Focus on distributed systems, deep learning architectures and full-stack AI engineering. CGPA: 9.27/10',
    tags: ['Cloud Arch', 'AI / ML', 'DSA'],
  },
  {
    id: 'tirumala',
    title: 'Intermediate',
    org: 'Tirumala Junior College',
    period: '2022 – 2024',
    desc: 'Maths, Physics, Chemistry focus. Secured 977/1000 in Boards. Built foundational logic for algorithms.',
    tags: ['MPC', '97.7%'],
  },
  {
    id: 'ravindra',
    title: 'Secondary Education',
    org: 'Ravindra Bharathi School',
    period: '2012 – 2022',
    desc: 'Overall Top Rank. Secured 10/10 GPA in 10th standard state boards.',
    tags: ['10.0 GPA'],
  }
];

function ListItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="premium-list-item"
    >
      <div className="item-period">
        <span>{item.period}</span>
      </div>
      
      <div className="item-content">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-org">{item.org}</p>
        <p className="item-desc">{item.desc}</p>
        
        <div className="item-tags">
          {item.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
      
      <div className="item-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" style={{ padding: '16vh 4vw', background: 'var(--bg-base)', position: 'relative' }}>
      
      <style>{`
        .premium-section-title {
          font-family: var(--font-serif);
          font-size: clamp(3.5rem, 7vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--text-heading);
          margin-bottom: 1rem;
        }
        
        .premium-list-container {
          margin-top: 5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .premium-list-item {
          display: grid;
          grid-template-columns: 200px 1fr 60px;
          gap: 32px;
          padding: 64px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: relative;
          transition: background 0.4s ease;
          cursor: crosshair;
        }

        .premium-list-item:hover {
          background: rgba(255,255,255,0.015);
        }

        .item-period {
          font-family: var(--font-mono);
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding-top: 8px;
        }

        .item-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
        }

        .premium-list-item:hover .item-title {
          transform: translateX(12px);
          color: #00d2ff;
        }

        .item-org {
          font-family: var(--font-sans);
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .premium-list-item:hover .item-org {
          transform: translateX(12px);
        }

        .item-desc {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          max-width: 640px;
          margin-bottom: 28px;
        }

        .item-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .item-tags .tag {
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.02);
          transition: all 0.3s;
        }

        .premium-list-item:hover .item-tags .tag {
          border-color: rgba(0, 210, 255, 0.3);
          color: #00d2ff;
          background: rgba(0, 210, 255, 0.05);
        }

        .item-arrow {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding-top: 8px;
          color: rgba(255,255,255,0.15);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .item-arrow svg {
          width: 36px;
          height: 36px;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .premium-list-item:hover .item-arrow {
          color: #fff;
        }

        .premium-list-item:hover .item-arrow svg {
          transform: translate(8px, -8px) scale(1.1);
        }

        @media (max-width: 900px) {
          .premium-list-item {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 40px 0;
          }
          .item-period {
            padding-top: 0;
          }
          .item-arrow {
            display: none;
          }
          .premium-list-item:hover .item-title,
          .premium-list-item:hover .item-org {
            transform: translateX(4px);
          }
        }
      `}</style>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Experience Section */}
        <div style={{ marginBottom: '10rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '0 24px' }}
          >
            <h2 className="premium-section-title">Experience.</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', maxWidth: '400px' }}>
              Building scalable web applications, AI pipelines, and production-ready systems.
            </p>
          </motion.div>

          <div className="premium-list-container">
            {EXPERIENCE.map((item, i) => (
              <ListItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '0 24px' }}
          >
            <h2 className="premium-section-title">Education.</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', maxWidth: '400px' }}>
              Academic foundations in computer science, cloud computing, and advanced mathematics.
            </p>
          </motion.div>

          <div className="premium-list-container">
            {EDUCATION.map((item, i) => (
              <ListItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
