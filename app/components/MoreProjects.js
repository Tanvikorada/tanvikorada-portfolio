'use client';

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
    <section className="section" style={{ paddingTop: 0 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 8vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-heading)' }}>More Explorations</h3>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Scroll horizontally →</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          overflowX: 'auto', 
          paddingBottom: '24px',
          scrollbarWidth: 'none', // Firefox
          WebkitOverflowScrolling: 'touch',
        }}>
          {EXTRA_PROJECTS.map((p, i) => (
            <div key={i} style={{
              flex: '0 0 350px',
              padding: '24px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)' }}>{p.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{p.subtitle}</p>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.5, flex: 1 }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    padding: '4px 10px',
                    background: 'var(--border-mid)',
                    color: 'var(--text-heading)',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '100px'
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
