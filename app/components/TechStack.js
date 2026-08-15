'use client';

const SKILLS = [
  { name: 'React', color: '#61DAFB', svg: 'react' },
  { name: 'Next.js', color: '#000000', svgDark: '#ffffff', svg: 'nextdotjs' },
  { name: 'Python', color: '#3776AB', svg: 'python' },
  { name: 'Node.js', color: '#339933', svg: 'nodedotjs' },
  { name: 'TypeScript', color: '#3178C6', svg: 'typescript' },
  { name: 'OpenAI', color: '#412991', svg: 'openai' },
  { name: 'LangChain', color: '#1C3C3C', svg: 'langchain' },
  { name: 'AWS', color: '#FF9900', svg: 'amazonaws' },
  { name: 'PostgreSQL', color: '#4169E1', svg: 'postgresql' },
  { name: 'Firebase', color: '#FFCA28', svg: 'firebase' },
  { name: 'Docker', color: '#2496ED', svg: 'docker' },
  { name: 'Git', color: '#F05032', svg: 'git' },
  { name: 'Tailwind', color: '#06B6D4', svg: 'tailwindcss' },
  { name: 'MongoDB', color: '#47A248', svg: 'mongodb' },
  { name: 'Three.js', color: '#000000', svgDark: '#ffffff', svg: 'threedotjs' },
];

function TechIcon({ name, color, svg }) {
  // Using simple-icons CDN via img src with colored background circle
  const iconUrl = `https://cdn.simpleicons.org/${svg}/${color.replace('#', '')}`;

  return (
    <div className="tech-icon-wrap">
      <img
        src={iconUrl}
        alt={name}
        className="tech-icon-img"
        onError={(e) => {
          // Fallback: show first 2 letters
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <span style={{
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: '22px',
        height: '22px',
        fontSize: '9px',
        fontWeight: 700,
        color,
        fontFamily: 'var(--font-mono)',
      }}>
        {name.slice(0, 2).toUpperCase()}
      </span>
      <div className="tech-tooltip">{name}</div>
    </div>
  );
}

import Spline from '@splinetool/react-spline';

export default function TechStack() {
  return (
    <section className="tech-stack-section" style={{ position: 'relative', zIndex: 10 }}>
      <div className="section" style={{ padding: '40px 8vw', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Left side: Tech Stack */}
        <div style={{ flex: '1 1 400px' }}>
          <p className="tech-stack-label" style={{ marginBottom: '24px' }}>My stack</p>
          <div className="tech-icons-row" style={{ justifyContent: 'flex-start' }}>
            {SKILLS.map((s, i) => (
              <TechIcon key={i} {...s} />
            ))}
          </div>
        </div>

        {/* Right side: 3D Spline Asset */}
        <div style={{ flex: '1 1 400px', height: '400px', position: 'relative', borderRadius: '24px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, pointerEvents: 'none' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Interactive 3D</span>
          </div>
          {/* We use a high-quality placeholder Spline scene. You can replace the URL with any Spline scene you export! */}
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>

      </div>
    </section>
  );
}
