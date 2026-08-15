'use client';

const AI_SKILLS = ['OpenAI API', 'Groq API', 'Claude API', 'Gemini API', 'LangChain', 'LangGraph', 'MediaPipe', 'YOLO', 'Computer Vision', 'Prompt Engineering'];
const FRONTEND = ['React', 'Next.js', 'Tailwind CSS', 'Three.js (R3F)', 'HTML/CSS'];
const BACKEND = ['Node.js', 'REST APIs', 'Next.js API Routes', 'Python'];
const DATABASES = ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Upstash Redis'];
const CLOUD = ['AWS', 'Vercel', 'Render', 'Railway', 'Docker', 'Git'];

export default function About() {
  return (
    <section id="about" className="about-section">
      <p className="section-eyebrow">About Me</p>

      <div className="bento-grid">
        {/* Bio */}
        <div className="bento-card bento-bio">
          <p className="bento-label">Who I am</p>
          <h2 className="bento-name">Korada Tanvi</h2>
          <p className="bento-body">
            B.Tech CSE (Cloud Computing) student at SRMIST Chennai with a CGPA of 9.27/10. I build and ship full-stack AI-native web products using React, Next.js, Node.js, and LLM APIs. Published first-author research on LLM pipeline architecture. Currently freelancing and building in public.
          </p>
        </div>

        {/* Status */}
        <div className="bento-card bento-status" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
          <p className="bento-label">Status</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="status-dot" />
            <span style={{ fontWeight: 600, color: '#166534', fontSize: '15px' }}>Open to opportunities</span>
          </div>
          <p className="bento-body" style={{ fontSize: '13px' }}>
            Internships · Full-time · Freelance · Collabs
          </p>
          <p style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
            tanvikorada@gmail.com
          </p>
        </div>

        {/* Stats */}
        <div className="bento-card" style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <div className="bento-stat-num">9.27</div>
          <div className="bento-stat-label">CGPA / 10</div>
        </div>
        <div className="bento-card" style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <div className="bento-stat-num">6+</div>
          <div className="bento-stat-label">Projects Shipped</div>
        </div>
        <div className="bento-card" style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <div className="bento-stat-num">1</div>
          <div className="bento-stat-label">Research Paper</div>
        </div>
        <div className="bento-card" style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <div className="bento-stat-num">4+</div>
          <div className="bento-stat-label">Internships</div>
        </div>

        {/* Skills */}
        <div className="bento-card bento-skills">
          <p className="bento-label">AI & GenAI</p>
          <div style={{ marginBottom: '16px' }}>
            {AI_SKILLS.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
          <p className="bento-label">Frontend</p>
          <div style={{ marginBottom: '16px' }}>
            {FRONTEND.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
          <p className="bento-label">Backend & DB</p>
          <div>
            {[...BACKEND, ...DATABASES].map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
        </div>

        {/* Location */}
        <div className="bento-card bento-location" style={{ background: 'linear-gradient(135deg, #fef9ee 0%, #fef3c7 100%)' }}>
          <p className="bento-label">Location</p>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>📍</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--text-heading)' }}>Chennai</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>India · Tamil Nadu</div>
          <div style={{ marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            SRMIST · 2024 – 2028
          </div>
        </div>

        {/* Clubs & Roles */}
        <div className="bento-card bento-fun">
          <p className="bento-label">Clubs & Roles</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-heading)' }}>📸 Camogenics</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Photographer, Film Society (Winner: 'Saving Nature')</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-heading)' }}>📰 Andropedia</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Media Team Member</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-heading)' }}>🔌 SlugNPlug</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hardware & Systems Club</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
