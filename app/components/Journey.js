
'use client';
import { useRef } from 'react';
import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion';

const EXPERIENCE = [
  {
    id: 'atribs',
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems',
    period: 'Sep - Oct 2026',
    desc: 'Engineering a full Progressive Web App from the ground up - installable, offline-first, background sync and native-like UX.',
    tags: ['Next.js', 'PWA', 'Service Workers'],
  },
  {
    id: 'future-interns',
    title: 'Prompt Engineering & AI Intern',
    org: 'Future Interns',
    period: 'Dec 2025 - Jan 2026',
    desc: 'Designed multi-step agentic workflows and LLM orchestration pipelines. Reduced hallucinations via systematic prompt decomposition.',
    tags: ['Agentic AI', 'LLM Orchestration', 'RAG'],
  },
  {
    id: 'prodigy',
    title: 'Full-Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    period: 'Jun - Jul 2025',
    desc: 'Built responsive full-stack modules with REST APIs, optimised rendering bottlenecks and shipped 3+ production features.',
    tags: ['React', 'Node.js', 'REST APIs'],
  }
];

const EDUCATION = [
  {
    id: 'srmist',
    title: 'B.Tech - CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    period: '2024 - 2028',
    desc: 'Focus on distributed systems, deep learning architectures and full-stack AI engineering. CGPA: 9.27/10',
    tags: ['Cloud Arch', 'AI / ML', 'DSA'],
  },
  {
    id: 'tirumala',
    title: 'Intermediate',
    org: 'Tirumala Junior College',
    period: '2022 - 2024',
    desc: 'Maths, Physics, and Chemistry focus. Secured 977/1000 in Boards. Built foundational analytical logic.',
    tags: ['MPC', '97.7%'],
  },
  {
    id: 'ravindra',
    title: 'Secondary Education',
    org: 'Ravindra Bharathi School',
    period: '2012 – 2022',
    desc: 'Completed secondary education with a strong foundation in sciences and mathematics. Secured 88% in 10th standard boards.',
    tags: ['88%'],
  }
];

function ListItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="premium-list-item group"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--primary-glow),
              transparent 80%
            )
          `
        }}
      />
      
      <div className="item-content-wrapper relative z-10 w-full h-full flex flex-col md:flex-row gap-8">
        <div className="item-period shrink-0 w-[200px]">
          <span>{item.period}</span>
        </div>
        
        <div className="item-content flex-grow">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-org">{item.org}</p>
          <p className="item-desc">{item.desc}</p>
          
          <div className="item-tags">
            {item.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
        
        <div className="item-arrow shrink-0 w-[60px] hidden md:flex">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
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
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--text-heading);
          margin-bottom: 1rem;
        }
        
        .premium-list-container {
          margin-top: 3rem;
          border-top: 1px solid var(--border-mid);
        }

        .premium-list-item {
          padding: 32px 24px;
          border-bottom: 1px solid var(--border-mid);
          position: relative;
          cursor: crosshair;
          border-radius: 12px;
          margin-top: 4px;
          --primary-glow: rgba(56, 189, 248, 0.08);
        }
        :global(.night) .premium-list-item {
          --primary-glow: rgba(56, 189, 248, 0.15);
        }

        .premium-list-item:hover {
          background: rgba(0,0,0,0.01);
          border-color: transparent;
          box-shadow: inset 0 0 0 1px var(--border-mid);
        }
        :global(.night) .premium-list-item:hover {
          background: rgba(255,255,255,0.015);
        }

        .item-content-wrapper {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }

        .item-period {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding-top: 6px;
        }

        .item-content {
          flex: 1;
        }

        .item-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2vw, 2rem);
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.1;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
        }

        .premium-list-item:hover .item-title {
          transform: translateX(8px);
          color: var(--primary);
        }

        .item-org {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          color: var(--text-body);
          margin-bottom: 16px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .premium-list-item:hover .item-org {
          transform: translateX(8px);
        }

        .item-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 640px;
          margin-bottom: 20px;
        }

        .item-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .item-tags .tag {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 4px 14px;
          border-radius: 100px;
          border: 1px solid var(--border);
          color: var(--text-body);
          background: var(--bg-surface);
          transition: all 0.3s;
        }

        .premium-list-item:hover .item-tags .tag {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
          transform: translateY(-2px);
        }

        .item-arrow {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding-top: 4px;
          color: var(--border-mid);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .item-arrow svg {
          width: 32px;
          height: 32px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .premium-list-item:hover .item-arrow {
          color: var(--text-heading);
        }

        .premium-list-item:hover .item-arrow svg {
          transform: translate(6px, -6px) scale(1.1);
        }

        @media (max-width: 900px) {
          .item-content-wrapper {
            flex-direction: column;
            gap: 12px;
          }
          .premium-list-item {
            padding: 24px 16px;
          }
          .item-period {
            padding-top: 0;
            width: 100%;
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Experience Section */}
        <div style={{ marginBottom: '6rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '0 24px' }}
          >
            <h2 className="premium-section-title">Experience.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '400px' }}>
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
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '400px' }}>
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
