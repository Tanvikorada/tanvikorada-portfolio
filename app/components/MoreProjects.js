'use client';

import { motion } from 'framer-motion';

import SpotlightCard from './ui/SpotlightCard';
import AccordionGallery from './ui/AccordionGallery';



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

const SLIDER_ITEMS = [
  { image: '/images/gallery_2.jpg', label: 'Student Achievement Certificate - ATRIBS Software Systems' },
  { image: '/images/gallery_5.jpg', label: 'OpenAI x Outskill AI Builders Hackathon' },
  { image: '/images/gallery_4.jpg', label: 'ATRIBS Software Systems - Internship' },
  { image: '/images/gallery_3.jpg', label: 'SIH 2026 Team & Mentors - SRM Easwari Engineering' },
  { image: '/images/gallery_1.jpg', label: 'Awards Ceremony & Events' }
];

export default function MoreProjects() {
  return (
    <section id="more-projects" className="section" style={{ paddingTop: '40px', paddingBottom: '40px', overflow: 'hidden' }}>
      
      {/* Header is constrained */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 8vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>Other Projects</h3>
          <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>Selected Archive</span>
        </div>
      </div>
        
      {/* Scrolling container spans full width, but items start with 8vw padding */}
      <div style={{ padding: '20px 8vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {EXTRA_PROJECTS.map((p, i) => (
            <SpotlightCard 
              key={i} 
              className="more-project-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {p.title}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{p.subtitle}</p>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, flex: 1, marginTop: '16px' }}>{p.desc}</p>
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
            </SpotlightCard>
          ))}
        </div>

      {/* Morph Slider Gallery */}
      <div style={{ maxWidth: '1400px', margin: '60px auto 0', padding: '0 8vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>Behind the Code</h3>
          <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>Interactive</span>
        </div>
        <div style={{ width: '100%', boxShadow: 'var(--shadow-md)' }}>
          

          

          <AccordionGallery
            items={SLIDER_ITEMS}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            height={500}
            gap={10}
            radius={24}
            accentColor="var(--accent)"
            overlayColor="#020617"
            grayscale={true}
          />
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










