'use client';

import { motion } from 'framer-motion';

const EXTRA_PROJECTS = [
  {
    title: 'TrackR',
    subtitle: 'AI-Powered Application Tracker',
    tags: ['Next.js', 'Groq LLaMA 3.3', 'Upstash Redis', 'cron-job.org'],
    desc: 'Full-stack tracker for managing internship & job apps. Automated workflows with Pushbullet notifications.',
  },
  {
    title: 'ShrimpCount',
    subtitle: 'Automated Hatchery Population Estimation',
    tags: ['YOLO', 'Computer Vision', 'Python'],
    desc: 'Building a YOLO-based CV system to automatically count shrimp population density from hatchery tank images.',
  },
  {
    title: 'StudyForge',
    subtitle: 'Adaptive Study Plan Generator',
    tags: ['Full Stack', 'LLM', 'React'],
    desc: 'App evolved from PrepOS. Generates complete, trackable study plans from natural language goals with dynamic dashboards.',
  },
];

export default function MoreProjects() {
  return (
    <section id="more-projects" className="section" style={{ paddingTop: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 8vw' }}>
        
        {/* Dedicated space for the 3D Bongo Cat Keyboard to appear */}
        <div style={{ height: '500px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {/* The 3D canvas is fixed in the background, this just reserves scroll space */}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>More Explorations</h3>
          <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>Swipe / Scroll</span>
        </div>
        
        <div className="more-projects-scroll">
          {EXTRA_PROJECTS.map((p, i) => (
            <motion.div 
              key={i} 
              className="more-project-card"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="card-glare" />
              <div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '8px' }}>{p.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{p.subtitle}</p>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: 1.6, flex: 1, marginTop: '16px' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    padding: '6px 12px',
                    background: 'var(--bg-base)',
                    border: '1px solid var(--border-mid)',
                    color: 'var(--text-heading)',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '100px'
                  }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .more-projects-scroll {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          padding-bottom: 40px;
          scroll-snap-type: x mandatory;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE 10+ */
        }
        .more-projects-scroll::-webkit-scrollbar {
          display: none;
        }
        .more-project-card {
          flex: 0 0 400px;
          scroll-snap-align: center;
          position: relative;
          padding: 32px;
          background: linear-gradient(145deg, var(--bg-surface), var(--bg-base));
          border: 1px solid var(--border);
          borderRadius: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
        }
        .card-glare {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s;
        }
        .more-project-card:hover .card-glare {
          left: 150%;
        }
        @media (max-width: 768px) {
          .more-project-card {
            flex: 0 0 85vw;
          }
        }
      `}</style>
    </section>
  );
}
