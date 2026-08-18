'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const KEYBOARD_ROWS = [
  [
    { id: 'esc', label: 'ESC', type: 'control' },
    { id: 'react', label: 'React', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', desc: 'A library for web and native user interfaces.' },
    { id: 'next', label: 'Next.js', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true, desc: 'The React Framework for the Web.' },
    { id: 'python', label: 'Python', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', desc: 'Powerful, fast, and plays well with others.' },
    { id: 'node', label: 'Node.js', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', desc: 'V8 JavaScript runtime for backend services.' },
    { id: 'backspace', label: 'BACKSPACE', type: 'control', width: 1.5 },
  ],
  [
    { id: 'tab', label: 'TAB', type: 'control', width: 1.5 },
    { id: 'tailwind', label: 'Tailwind', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', desc: 'Utility-first CSS framework for rapid UI.' },
    { id: 'firebase', label: 'Firebase', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', desc: 'App development platform by Google.' },
    { id: 'spline', label: 'Spline', type: 'tech', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>', desc: '3D design tool for interactive web experiences.' },
    { id: 'groq', label: 'Groq', type: 'tech', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', desc: 'Ultra-fast LPU inference engine for AI.' },
    { id: 'enter', label: 'ENTER', type: 'control', width: 1.2 },
  ],
  [
    { id: 'shiftL', label: 'SHIFT', type: 'control', width: 1.8 },
    { id: 'js', label: 'JavaScript', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', desc: 'The programming language of the Web.' },
    { id: 'html', label: 'HTML', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', desc: 'The standard markup language for documents.' },
    { id: 'css', label: 'CSS', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', desc: 'Style sheet language for presenting documents.' },
    { id: 'git', label: 'Git', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', desc: 'Distributed version control system.' },
    { id: 'shiftR', label: 'SHIFT', type: 'control', width: 1.8 },
  ],
  [
    { id: 'ctrlL', label: 'CTRL', type: 'control', width: 1.2 },
    { id: 'win', label: 'WIN', type: 'control', width: 1 },
    { id: 'altL', label: 'ALT', type: 'control', width: 1 },
    { id: 'space', label: 'FRONT-END DEVELOPER', type: 'space', width: 4.8, desc: 'Crafting premium, interactive web experiences.' },
    { id: 'altR', label: 'ALT', type: 'control', width: 1 },
    { id: 'ctrlR', label: 'CTRL', type: 'control', width: 1.2 },
  ]
];

// Emojis for the bomb menu
const BOMB_EMOJIS = ['😸', '🚀', '🔥', '⚡', '💻', '🎉', '💖', '👀'];

// Thocky mechanical switch sound synthesizer
const playThock = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Deep, fast click profile
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch(e) {
    // Ignore audio context errors before user interaction
  }
};

export default function TechStack() {
  const containerRef = useRef(null);

  // States
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [emojiMenuPos, setEmojiMenuPos] = useState(null); // {x, y}

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const catY = useTransform(scrollYProgress, [0, 0.3, 0.55, 1], [150, 150, 0, 0]);
  const catOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [0, 0, 1]); // Guaranteed invisible on page 1
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Mouse 3D tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springY, [0, 1], [40, 5]); // Steeper tilt to see 3D key sides
  const rotateY = useTransform(springX, [0, 1], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    mouseX.set(0.5);
    mouseY.set(0.1);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Global click to close emoji menu
    const handleClick = () => setEmojiMenuPos(null);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseX, mouseY]);

  const handleRightClick = (e) => {
    e.preventDefault();
    setEmojiMenuPos({ x: e.clientX, y: e.clientY });
  };

  const bombEmoji = (e, emoji) => {
    e.stopPropagation();
    const shape = confetti.shapeFromText({ text: emoji, scalar: 3 });
    confetti({
      particleCount: 150,
      spread: 120,
      startVelocity: 50,
      origin: { x: emojiMenuPos.x / window.innerWidth, y: emojiMenuPos.y / window.innerHeight },
      shapes: [shape],
      scalar: 3,
      disableForReducedMotion: true,
      zIndex: 10000,
    });
    setEmojiMenuPos(null);
  };

  const handleKeyClick = (e, key) => {
    playThock();
    
    if (key.type === 'tech') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 15,
        spread: 60,
        origin: { x, y },
        colors: ['#c9961a', '#F4D24A', '#2a2a2a'],
        disableForReducedMotion: true,
        zIndex: 9999,
      });
    }
  };

  // 3D Geometry Constants
  const keyDepth = 20; // 20px physical thickness

  return (
    <section
      id="stack"
      ref={containerRef}
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '200vh',
        background: 'var(--bg-base)',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1400px',
        overflow: 'hidden',
      }}>
        {/* Decorative Backgrounds */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(201,150,26,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Title */}
        <motion.div
          style={{
            position: 'absolute',
            top: '12vh',
            left: '8vw',
            zIndex: 20,
            pointerEvents: 'none',
            opacity: titleOpacity,
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
            Tools I build with
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-serif)' }}>
            Tech Stack
          </h2>
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            (Right-click for emoji bomb)
          </p>
        </motion.div>

        {/* Hover Info Panel (Dynamic Sidebar) */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '50%',
                right: '5vw',
                transform: 'translateY(-50%)',
                width: '280px',
                padding: '24px',
                background: 'rgba(20,20,22,0.6)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                zIndex: 30,
                color: '#fff',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {hoveredSkill.icon && (
                <img src={hoveredSkill.icon} alt="" style={{ width: '40px', height: '40px', marginBottom: '16px', filter: hoveredSkill.invert ? 'invert(1)' : 'none' }} />
              )}
              {hoveredSkill.svg && (
                <div style={{ width: '40px', height: '40px', marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: hoveredSkill.svg }} />
              )}
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>{hoveredSkill.label}</h3>
              <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.5 }}>{hoveredSkill.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Right-Click Emoji Menu */}
        <AnimatePresence>
          {emojiMenuPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              style={{
                position: 'fixed',
                top: emojiMenuPos.y,
                left: emojiMenuPos.x,
                background: 'rgba(20,20,22,0.8)',
                backdropFilter: 'blur(16px)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                zIndex: 99999,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px'
              }}
            >
              <div style={{ gridColumn: 'span 4', textAlign: 'center', color: '#fff', fontSize: '12px', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Select an emoji to bomb!</div>
              {BOMB_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={(e) => bombEmoji(e, emoji)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', fontSize: '24px', padding: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The 3D Interactive Scene */}
        <motion.div
          onContextMenu={handleRightClick}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            position: 'relative',
            marginTop: '10vh'
          }}
        >
          {/* The Typing Cat (Hidden on Page 1 via opacity) */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-140px',
              left: '50%',
              y: catY,
              x: '-50%',
              z: -20,
              opacity: catOpacity,
              width: '180px',
              height: '150px',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }}>
              <path d="M40 200C40 140 70 100 100 100C130 100 160 140 160 200" fill="#2d2d2d" />
              <circle cx="100" cy="110" r="55" fill="#2d2d2d" />
              <path d="M45 110L40 40L80 70" fill="#2d2d2d" />
              <path d="M155 110L160 40L120 70" fill="#2d2d2d" />
              <path d="M50 100L48 55L75 75" fill="#f49d9d" />
              <path d="M150 100L152 55L125 75" fill="#f49d9d" />
              <circle cx="80" cy="105" r="10" fill="#fff" />
              <circle cx="120" cy="105" r="10" fill="#fff" />
              <circle cx="80" cy="105" r="6" fill="#000" />
              <circle cx="120" cy="105" r="6" fill="#000" />
              <path d="M95 118L100 123L105 118" stroke="#f49d9d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M90 128C95 132 100 123 100 123C100 123 105 132 110 128" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
              <line x1="30" y1="110" x2="60" y2="115" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="25" y1="120" x2="55" y2="120" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="170" y1="110" x2="140" y2="115" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="175" y1="120" x2="145" y2="120" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            
            {/* Animated Paws */}
            <svg viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible', zIndex: 10, transform: 'translateZ(30px)' }}>
              <motion.g animate={{ y: [0, 15, 0] }} transition={{ duration: 0.12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}>
                <ellipse cx="60" cy="180" rx="18" ry="12" fill="#3a3a3a" />
              </motion.g>
              <motion.g animate={{ y: [0, 15, 0] }} transition={{ duration: 0.14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.06 }}>
                <ellipse cx="140" cy="180" rx="18" ry="12" fill="#3a3a3a" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Premium Dark Mechanical Keyboard Chassis */}
          <div
            style={{
              background: '#18181b', // Deep matte dark
              padding: '28px',
              borderRadius: '24px',
              borderTop: '2px solid rgba(255,255,255,0.1)',
              borderBottom: '4px solid #09090b',
              boxShadow: '0 50px 100px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0px)',
            }}
          >
            {KEYBOARD_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: 'flex', gap: '14px', transformStyle: 'preserve-3d' }}>
                {row.map((key) => {
                  const isTech = key.type === 'tech';
                  const w = key.width || 1;
                  const baseWidth = 64; 
                  const actualW = baseWidth * w + (w - 1) * 14;
                  
                  return (
                    <motion.div
                      key={key.id}
                      onPointerDown={(e) => handleKeyClick(e, key)}
                      onPointerEnter={() => key.desc && setHoveredSkill(key)}
                      onPointerLeave={() => setHoveredSkill(null)}
                      whileHover={{ z: 4 }}
                      whileTap={{ z: -8 }} // Presses the key into the board!
                      style={{
                        position: 'relative',
                        width: `${actualW}px`,
                        height: '64px',
                        cursor: 'pointer',
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(10px)', // Lifted off the board
                      }}
                    >
                      {/* TRUE 3D GEOMETRY - The Bottom/Shadow */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '12px',
                        transform: `translateZ(-10px)`,
                        filter: 'blur(8px)'
                      }} />

                      {/* TRUE 3D GEOMETRY - The Front Face (Thickness) */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: `${keyDepth}px`,
                        background: isTech ? '#1a1a1c' : '#111112',
                        transformOrigin: 'bottom',
                        transform: 'rotateX(-90deg)',
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px',
                      }} />

                      {/* TRUE 3D GEOMETRY - The Top Face (Cap) */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: isTech 
                          ? 'linear-gradient(180deg, #2c2c30 0%, #202024 100%)' 
                          : 'linear-gradient(180deg, #222225 0%, #1a1a1c 100%)',
                        borderRadius: '12px',
                        border: '1px solid #111',
                        borderTop: '1px solid #3f3f45',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: isTech ? '10px' : '10px',
                        fontWeight: isTech ? 600 : 500,
                        color: isTech ? '#ffffff' : '#888890',
                        letterSpacing: '0.05em',
                        transformStyle: 'preserve-3d',
                      }}>
                        {/* Inner keycap contour */}
                        <div style={{ position: 'absolute', inset: '3px', borderRadius: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
                        
                        <div style={{ transform: 'translateZ(2px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          {key.icon && <img src={key.icon} alt="" style={{ width: '24px', height: '24px', filter: key.invert ? 'invert(1)' : 'none' }} />}
                          {key.svg && <div style={{ width: '24px', height: '24px', color: '#fff' }} dangerouslySetInnerHTML={{ __html: key.svg }} />}
                          <span>{key.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
