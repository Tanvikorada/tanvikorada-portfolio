'use client';
import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import confetti from 'canvas-confetti';

const KEYBOARD_ROWS = [
  [
    { id: 'esc', label: 'ESC', type: 'control' },
    { id: 'react', label: 'React', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { id: 'next', label: 'Next.js', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true },
    { id: 'python', label: 'Python', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { id: 'node', label: 'Node.js', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { id: 'backspace', label: 'BACKSPACE', type: 'control', width: 1.5 },
  ],
  [
    { id: 'tab', label: 'TAB', type: 'control', width: 1.5 },
    { id: 'tailwind', label: 'Tailwind', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { id: 'firebase', label: 'Firebase', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
    { id: 'spline', label: 'Spline', type: 'tech', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
    { id: 'groq', label: 'Groq', type: 'tech', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>' },
    { id: 'enter', label: 'ENTER', type: 'control', width: 1.2 },
  ],
  [
    { id: 'shiftL', label: 'SHIFT', type: 'control', width: 1.8 },
    { id: 'js', label: 'JavaScript', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { id: 'html', label: 'HTML', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { id: 'css', label: 'CSS', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { id: 'git', label: 'Git', type: 'tech', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { id: 'shiftR', label: 'SHIFT', type: 'control', width: 1.8 },
  ],
  [
    { id: 'ctrlL', label: 'CTRL', type: 'control', width: 1.2 },
    { id: 'win', label: 'WIN', type: 'control', width: 1 },
    { id: 'altL', label: 'ALT', type: 'control', width: 1 },
    { id: 'space', label: 'FRONT-END DEVELOPER', type: 'space', width: 4.8 },
    { id: 'altR', label: 'ALT', type: 'control', width: 1 },
    { id: 'ctrlR', label: 'CTRL', type: 'control', width: 1.2 },
  ]
];

// Emojis for the tech blast!
const TECH_EMOJIS = ['🚀', '💻', '✨', '⚡', '😸', '🔥'];

export default function TechStack() {
  const containerRef = useRef(null);

  // Scroll tracking for the 2-page sticky sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Cat slides up between 30% and 55% scroll
  const catY = useTransform(scrollYProgress, [0, 0.3, 0.55, 1], [150, 150, 0, 0]);
  
  // Title opacity fades out as we scroll to page 2 to focus on the cat
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse [0, 1] to rotation degrees
  const rotateX = useTransform(springY, [0, 1], [30, -10]);
  const rotateY = useTransform(springX, [0, 1], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    // Set initial tilted state
    mouseX.set(0.5);
    mouseY.set(0.2);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleKeyClick = (e, key) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    const scalar = 2;
    const emojiShape = confetti.shapeFromText({ text: TECH_EMOJIS[Math.floor(Math.random() * TECH_EMOJIS.length)], scalar });
    
    confetti({
      particleCount: 15,
      spread: 60,
      origin: { x, y },
      shapes: [emojiShape],
      scalar,
      disableForReducedMotion: true,
      zIndex: 10000,
    });
    
    confetti({
      particleCount: 20,
      spread: 70,
      origin: { x, y },
      colors: ['#c9961a', '#F4D24A', '#2a2a2a'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });
  };

  return (
    <section
      id="stack"
      ref={containerRef}
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '200vh', // 2 Pages height for sticky sequence
        background: 'var(--bg-base)',
      }}
    >
      {/* Sticky Inner Container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1400px', // Creates the 3D depth
        overflow: 'hidden',
      }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(201,150,26,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

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
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '8px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Tools I build with
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Tech Stack
          </h2>
          <p
            style={{
              marginTop: '12px',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            (Scroll & press a key to interact)
          </p>
        </motion.div>

        {/* The 3D Interactive Scene */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            position: 'relative',
            marginTop: '10vh'
          }}
        >
          {/* The Typing Cat */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-140px',
              left: '50%',
              // Cat Y is controlled by scroll
              y: catY,
              x: '-50%',
              z: -20, // Behind the keyboard
              width: '180px',
              height: '150px',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Body */}
              <path d="M40 200C40 140 70 100 100 100C130 100 160 140 160 200" fill="#2d2d2d" />
              {/* Head */}
              <circle cx="100" cy="110" r="55" fill="#2d2d2d" />
              {/* Ears */}
              <path d="M45 110L40 40L80 70" fill="#2d2d2d" />
              <path d="M155 110L160 40L120 70" fill="#2d2d2d" />
              <path d="M50 100L48 55L75 75" fill="#f49d9d" />
              <path d="M150 100L152 55L125 75" fill="#f49d9d" />
              {/* Eyes */}
              <circle cx="80" cy="105" r="10" fill="#fff" />
              <circle cx="120" cy="105" r="10" fill="#fff" />
              <circle cx="80" cy="105" r="6" fill="#000" />
              <circle cx="120" cy="105" r="6" fill="#000" />
              {/* Nose/Mouth */}
              <path d="M95 118L100 123L105 118" stroke="#f49d9d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M90 128C95 132 100 123 100 123C100 123 105 132 110 128" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Whiskers */}
              <line x1="30" y1="110" x2="60" y2="115" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="25" y1="120" x2="55" y2="120" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="170" y1="110" x2="140" y2="115" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="175" y1="120" x2="145" y2="120" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            
            {/* Animated Paws (Typing) */}
            <svg viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible', zIndex: 10, transform: 'translateZ(30px)' }}>
              <motion.g
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 0.12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              >
                <ellipse cx="60" cy="180" rx="18" ry="12" fill="#3a3a3a" />
              </motion.g>
              <motion.g
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 0.14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.06 }}
              >
                <ellipse cx="140" cy="180" rx="18" ry="12" fill="#3a3a3a" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Premium Dark Mechanical Keyboard Chassis */}
          <div
            style={{
              background: '#141416', // Deep matte dark
              padding: '28px',
              borderRadius: '24px',
              border: '1px solid #2a2a2c',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 10px 20px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0px)',
            }}
          >
            {KEYBOARD_ROWS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: 'flex',
                  gap: '14px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {row.map((key) => {
                  const isTech = key.type === 'tech';
                  const w = key.width || 1;
                  const baseWidth = 64; 
                  
                  return (
                    <motion.button
                      key={key.id}
                      onPointerDown={(e) => handleKeyClick(e, key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95, translateZ: 2 }} // Press down physics
                      style={{
                        position: 'relative',
                        width: `${baseWidth * w + (w - 1) * 14}px`,
                        height: '64px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        outline: 'none',
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(14px)', // Key depth
                        
                        // Premium Dark Keycaps
                        background: isTech 
                          ? 'linear-gradient(180deg, #2c2c30 0%, #202024 100%)' 
                          : 'linear-gradient(180deg, #222225 0%, #1a1a1c 100%)',
                        border: '1px solid #111',
                        borderTop: '1px solid #3f3f45',
                        // Chunky 3D drop shadow mimicking key sides
                        boxShadow: isTech 
                          ? '0px 10px 0px 0px #0f0f11, 0px 15px 20px rgba(0,0,0,0.4)'
                          : '0px 8px 0px 0px #0a0a0c, 0px 12px 15px rgba(0,0,0,0.4)',
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
                        transition: 'box-shadow 0.1s ease',
                      }}
                      onPointerDownCapture={(e) => {
                        e.currentTarget.style.boxShadow = isTech
                          ? '0px 2px 0px 0px #0f0f11, 0px 5px 10px rgba(0,0,0,0.4)'
                          : '0px 2px 0px 0px #0a0a0c, 0px 4px 8px rgba(0,0,0,0.4)';
                      }}
                      onPointerUpCapture={(e) => {
                        e.currentTarget.style.boxShadow = isTech
                          ? '0px 10px 0px 0px #0f0f11, 0px 15px 20px rgba(0,0,0,0.4)'
                          : '0px 8px 0px 0px #0a0a0c, 0px 12px 15px rgba(0,0,0,0.4)';
                      }}
                      onPointerLeave={(e) => {
                        e.currentTarget.style.boxShadow = isTech
                          ? '0px 10px 0px 0px #0f0f11, 0px 15px 20px rgba(0,0,0,0.4)'
                          : '0px 8px 0px 0px #0a0a0c, 0px 12px 15px rgba(0,0,0,0.4)';
                      }}
                    >
                      {/* Inner keycap contour line for realism */}
                      <div style={{
                        position: 'absolute',
                        inset: '3px',
                        borderRadius: '8px',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        pointerEvents: 'none'
                      }} />
                      
                      <div style={{ 
                        position: 'relative', 
                        zIndex: 2, 
                        transform: 'translateZ(6px)', // lift text/icons off the key surface
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {/* Render Tech SVG Icon if present */}
                        {key.icon && (
                          <img 
                            src={key.icon} 
                            alt={key.label} 
                            style={{ 
                              width: '24px', 
                              height: '24px', 
                              filter: key.invert ? 'invert(1)' : 'none' 
                            }} 
                          />
                        )}
                        {/* Custom inline SVGs for unhosted icons */}
                        {key.svg && (
                          <div style={{ width: '24px', height: '24px', color: '#fff' }} dangerouslySetInnerHTML={{ __html: key.svg }} />
                        )}
                        
                        <span>{key.label}</span>
                      </div>
                    </motion.button>
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
