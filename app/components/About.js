'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import KineticText from './ui/KineticText';
import ClickSpark from './ui/ClickSpark';
import { useRef } from 'react';
import SpotlightCard from './ui/SpotlightCard';
import RippleDistortion from './ui/RippleDistortion';

const AI_SKILLS = ['OpenAI', 'Groq', 'Claude', 'Gemini', 'LangChain', 'MediaPipe', 'YOLO', 'Prompt Engineering'];
const FRONTEND = ['React', 'Next.js', 'Tailwind', 'Three.js (R3F)'];
const BACKEND = ['Node.js', 'PostgreSQL', 'Firebase', 'Supabase', 'Python'];

const SVG_ICONS = {
  push: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 3 3 3-3"/><path d="M6 18v-7"/></svg>,
  star: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  pr: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>,
  default: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
};

function AppleGlassCard({ children, className = "", style = {}, noPadding = false, withRipple = false }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
  
  const rotateX = useTransform(mouseYSpring, [0, 1], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-3deg", "3deg"]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };
  
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        ...style
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <SpotlightCard className="apple-glass-card" style={{ flex: 1, margin: 0, padding: noPadding ? 0 : '32px' }}>
          {withRipple && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.1, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
              <RippleDistortion 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                grayscale={true}
                strength={0.8}
                swirl={1.5}
                trigger="hover"
              />
            </div>
          )}
          <div style={{ 
            position: 'relative', zIndex: 2, 
            display: 'flex', 
            flexDirection: style.flexDirection || 'column', 
            width: '100%', height: '100%', 
            flexWrap: style.flexWrap, 
            alignItems: style.alignItems, 
            justifyContent: style.justifyContent, 
            gap: style.gap 
          }}>
            {children}
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}



// Fallback static data if Github API limits are hit
const FALLBACK_UPDATES = [
  { id: 1, name: "Deployed new feature", description: "Portfolio update pushed to prod", time: "2m ago", icon: SVG_ICONS.push, color: "rgba(14, 165, 233, 0.2)", textColor: "#0ea5e9" },
  { id: 2, name: "Merged Pull Request", description: "Open source contribution", time: "1h ago", icon: SVG_ICONS.pr, color: "rgba(34, 197, 94, 0.2)", textColor: "#22c55e" },
  { id: 3, name: "Solved LeetCode Hard", description: "Dynamic Programming", time: "3h ago", icon: SVG_ICONS.default, color: "rgba(234, 179, 8, 0.2)", textColor: "#eab308" },
  { id: 4, name: "Starred a repository", description: "Magic UI", time: "5h ago", icon: SVG_ICONS.star, color: "rgba(245, 158, 11, 0.2)", textColor: "#f59e0b" },
];

function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

function mapGithubEvent(event, index) {
  const repoName = event.repo.name.split('/')[1] || event.repo.name;
  
  let name = "Activity";
  let description = repoName;
  let icon = SVG_ICONS.default;
  let color = "rgba(14, 165, 233, 0.2)";
  let textColor = "#0ea5e9";

  switch (event.type) {
    case 'PushEvent':
      name = "Pushed Code";
      description = `To ${repoName}`;
      icon = SVG_ICONS.push;
      color = "rgba(34, 197, 94, 0.2)";
      textColor = "#22c55e";
      break;
    case 'WatchEvent':
      name = "Starred a Repo";
      description = repoName;
      icon = SVG_ICONS.star;
      color = "rgba(234, 179, 8, 0.2)";
      textColor = "#eab308";
      break;
    case 'PullRequestEvent':
      name = event.payload.action === 'opened' ? "Opened PR" : "Merged PR";
      description = `In ${repoName}`;
      icon = SVG_ICONS.pr;
      color = "rgba(168, 85, 247, 0.2)";
      textColor = "#a855f7";
      break;
    case 'CreateEvent':
      name = "Created Repo";
      description = repoName;
      icon = SVG_ICONS.default;
      color = "rgba(168, 85, 247, 0.2)";
      textColor = "#a855f7";
      break;
  }

  return {
    id: event.id || index,
    uniqueId: event.id ? `${event.id}-${index}` : `${index}-${Date.now() + Math.random()}`,
    name,
    description,
    time: getTimeAgo(event.created_at),
    icon,
    color,
    textColor
  };
}

function LiveActivityList() {
  const [items, setItems] = useState([]);
  const [eventPool, setEventPool] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchGithubActivity() {
      try {
        const res = await fetch('https://api.github.com/users/Tanvikorada/events/public?per_page=15');
        if (!res.ok) throw new Error('Rate limited or error');
        const data = await res.json();
        
        const parsedEvents = data.map((ev, i) => mapGithubEvent(ev, i));
        if (parsedEvents.length > 0) {
          setEventPool(parsedEvents);
          setItems([parsedEvents[0]]);
          setIndex(1);
          return;
        }
      } catch (err) {
        console.warn('Failed to fetch github activity, using fallback data.', err);
      }
      
      // Fallback
      setEventPool(FALLBACK_UPDATES);
      setItems([{ ...FALLBACK_UPDATES[0], uniqueId: Date.now() + Math.random() + Math.random() }]);
      setIndex(1);
    }
    
    fetchGithubActivity();
  }, []);

  useEffect(() => {
    if (eventPool.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextItem = eventPool[prevIndex % eventPool.length];
        setItems((prevItems) => {
          // Add new item at the top, keep max 4 items
          return [{ ...nextItem, uniqueId: Date.now() }, ...prevItems].slice(0, 4);
        });
        return prevIndex + 1;
      });
    }, 4000); 

    return () => clearInterval(interval);
  }, [eventPool]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', overflow: 'hidden', padding: '4px' }}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.uniqueId}
            layout
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: 'auto', opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px',
              background: 'var(--bg-surface)',
              borderRadius: '16px',
              border: '1px solid var(--border-mid)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '42px', height: '42px',
                borderRadius: '12px',
                background: item.color,
                color: item.textColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-heading)' }}>{item.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.time}</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.description}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  const floatY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" className="about-section" ref={containerRef} style={{ position: 'relative', overflow: 'hidden', padding: '15vh 0' }}>
      {/* Background Ambience */}
      <motion.div animate={{ x: ['-5%', '5%', '-5%'], y: ['-5%', '10%', '-5%'] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '5%', left: '0%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 60%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
      <motion.div animate={{ x: ['5%', '-5%', '5%'], y: ['10%', '-5%', '10%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '10%', right: '0%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 60%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      <style>{`
        .apple-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(140px, auto);
          gap: 24px;
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          padding: 0 5vw;
        }

        
          .apple-photo { grid-column: span 1; grid-row: span 2; }
          .apple-bio { grid-column: span 2; grid-row: span 2; display: flex; flex-direction: column; justify-content: center; }
          .apple-map { grid-column: span 1; grid-row: span 2; }
          .apple-status { grid-column: span 2; grid-row: span 1; display: flex; flex-direction: column; justify-content: center; }
          .apple-stats { grid-column: span 2; grid-row: span 1; display: flex; flex-direction: column; justify-content: center; }
          .apple-skills { grid-column: span 2; grid-row: span 2; }
          .apple-activity { grid-column: span 2; grid-row: span 2; }
          .apple-clubs { grid-column: span 4; grid-row: span 1; display: flex; flex-direction: column; justify-content: center; }

          @media (max-width: 1024px) {
          .apple-bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .apple-photo { grid-column: span 1 !important; grid-row: span 2 !important; }
          .apple-map { grid-column: span 1 !important; grid-row: span 2 !important; }
          .apple-bio { grid-column: span 2 !important; grid-row: span 2 !important; }
          .apple-stats { grid-column: span 2 !important; }
          .apple-skills { grid-column: span 2 !important; }
          .apple-status { grid-column: span 2 !important; }
          .apple-activity { grid-column: span 2; grid-row: span 2; }
          .apple-clubs { grid-column: span 2 !important; }
        }

        @media (max-width: 600px) {
          .apple-bento-grid {
            grid-template-columns: 1fr;
          }
          .apple-bento-grid > div {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }

        .apple-glass-card {
          background: linear-gradient(135deg, color-mix(in srgb, var(--bg-glass) 70%, rgba(255,255,255,0.1)), color-mix(in srgb, var(--bg-glass) 90%, rgba(0,0,0,0.05)));
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid color-mix(in srgb, var(--border) 60%, rgba(255,255,255,0.15));
          border-radius: 32px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(31, 38, 135, 0.07), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 0 20px rgba(56, 189, 248, 0.05);
          transition: box-shadow 0.4s ease;
        }

        .apple-glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1), transparent 50%),
                      radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.05), transparent 50%);
          z-index: 0;
          pointer-events: none;
        }

        .apple-label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 24px;
          font-weight: 600;
        }

        .skill-pill {
          display: inline-block;
          padding: 8px 16px;
          margin: 0 8px 8px 0;
          border-radius: 100px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-heading);
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          user-select: none;
        }
        
        .skill-pill:hover {
          transform: translateY(-4px) scale(1.05);
          border-color: #c084fc;
          background: color-mix(in srgb, #c084fc 15%, transparent);
          color: #c084fc;
          box-shadow: 0 8px 20px rgba(192, 132, 252, 0.25), inset 0 1px 1px rgba(255,255,255,0.2);
        }

        .skill-pill:active {
          transform: translateY(2px) scale(0.95);
          box-shadow: 0 2px 5px rgba(192, 132, 252, 0.15);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '8vh', position: 'relative', zIndex: 2 }}
      >
        <p className="section-eyebrow" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 20px', borderRadius: '100px', display: 'inline-block', marginBottom: '24px' }}>
          About Me
        </p>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Pixels, AI & <br/> <span style={{ color: 'var(--text-muted)' }}>Everything In Between</span>
        </h2>
      </motion.div>

      <div className="apple-bento-grid">
        
        {/* 1. Photo Tile */}
        <AppleGlassCard className="apple-photo" noPadding={true}>
          <RippleDistortion 
            src="/images/about-profile.jpg"
            grayscale={true}
            swirl={1}
            strength={0.25}
            alignY={1.0}
            trigger="hover"
          />
        </AppleGlassCard>

        {/* 2. Bio */}
        <AppleGlassCard className="apple-bio" style={{ gridColumn: 'span 2' }} withRipple={true}>
          <p className="apple-label">Who I Am</p>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '16px', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
            <KineticText text="Korada Tanvi" />
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '100%' }}>
            B.Tech CSE (Cloud Computing) student with a passion to build and ship full-stack AI-native applications using Next.js, Node.js, and LLM APIs. Previously published research on LLM pipeline architectures. Always learning and building in public.
          </p>
        </AppleGlassCard>

        {/* 3. Availability / Status */}
        <AppleGlassCard className="apple-status" withRipple={true}>
          <p className="apple-label">Availability</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ position: 'relative', display: 'flex', width: '12px', height: '12px' }}>
              <span style={{ animate: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#22c55e', opacity: 0.75 }}></span>
              <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '12px', width: '12px', background: '#22c55e' }}></span>
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>Open to Work</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Looking for Internships, Full-time roles, or Freelance collaborations. Let's build something extraordinary together.
          </p>
          <a href="mailto:tanvikorada@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '100px', color: 'var(--text-heading)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
            tanvikorada@gmail.com
          </a>
        </AppleGlassCard>

        {/* 4. Map / Location */}
        <AppleGlassCard className="apple-map" noPadding={true}>
          <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '200px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124424.31825553645!2d80.08182745330036!3d12.833917849419612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525bc8120b0805%3A0x6b19a008c2a11b0e!2sSRM%20Institute%20of%20Science%20and%20Technology%2C%20Kattankulathur!5e0!3m2!1sen!2sin!4v1707907576595!5m2!1sen!2sin" 
              style={{ border: 0, width: '100%', height: '100%', filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent, var(--bg-glass) 90%)' }}></div>
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>Chennai, India</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>SRMIST Kattankulathur</div>
            </div>
          </div>
        </AppleGlassCard>

        {/* 5. Stats / Numbers */}
        <AppleGlassCard className="apple-stats" withRipple={true} style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', letterSpacing: '-0.03em' }}>9.27</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>CGPA</div>
          </div>
          <div style={{ width: '1px', height: '60px', background: 'var(--border)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', letterSpacing: '-0.03em' }}>6+</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>Projects</div>
          </div>
          <div style={{ width: '1px', height: '60px', background: 'var(--border)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', letterSpacing: '-0.03em' }}>4+</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>Internships</div>
          </div>
        </AppleGlassCard>

        {/* 6. Technical Arsenal */}
        <AppleGlassCard className="apple-skills" style={{ gridColumn: 'span 2' }} withRipple={true}>
          <p className="apple-label"><KineticText text="Technical Arsenal" /></p>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600 }}>AI & GenAI</div>
            {AI_SKILLS.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600 }}>Web Dev</div>
            {[...FRONTEND, ...BACKEND].map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
        </AppleGlassCard>

        
        {/* Live Activity */}
        <AppleGlassCard className="apple-activity" style={{ display: 'flex', flexDirection: 'column' }} withRipple={true}>
          <p className="apple-label">Live Updates</p>
          <div style={{ flex: 1, position: 'relative', marginTop: '12px', minHeight: '260px' }}>
            <div style={{ position: 'absolute', inset: 0, overflowY: 'hidden', paddingRight: '4px' }}>
              <LiveActivityList />
            </div>
            {/* Fade out bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
              background: 'linear-gradient(to top, var(--bg-base), transparent)',
              pointerEvents: 'none',
              borderRadius: '0 0 24px 24px'
            }} />
          </div>
        </AppleGlassCard>

        {/* 7. Fun / Roles */}
        <AppleGlassCard className="apple-clubs" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }} withRipple={true}>
          <div>
            <p className="apple-label">Extracurriculars</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>Clubs & Roles</h3>
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'color-mix(in srgb, #c084fc 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>Camogenics</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Photographer (Winner)</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'color-mix(in srgb, #38bdf8 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>SRMIST Lead</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tech Community</div>
              </div>
            </div>
          </div>
        </AppleGlassCard>

      </div>
    </section>
  );
}
