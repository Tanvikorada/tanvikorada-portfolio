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

export default function TechStack() {
  return (
    <section className="tech-stack-section">
      <div className="section" style={{ padding: '0', maxWidth: '1400px', margin: '0 auto', padding: '0 0' }}>
        <p className="tech-stack-label">My stack</p>
        <div className="tech-icons-row">
          {SKILLS.map((s, i) => (
            <TechIcon key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
