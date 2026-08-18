'use client';
import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';

const KEYBOARD_ROWS = [
  [
    { id: 'esc', label: 'ESC', type: 'control' },
    { id: 'react', label: 'REACT', type: 'tech' },
    { id: 'next', label: 'NEXT.JS', type: 'tech' },
    { id: 'python', label: 'PYTHON', type: 'tech' },
    { id: 'node', label: 'NODE.JS', type: 'tech' },
    { id: 'backspace', label: 'BACKSPACE', type: 'control', width: 1.5 },
  ],
  [
    { id: 'tab', label: 'TAB', type: 'control', width: 1.5 },
    { id: 'tailwind', label: 'TAILWIND', type: 'tech' },
    { id: 'firebase', label: 'FIREBASE', type: 'tech' },
    { id: 'spline', label: 'SPLINE', type: 'tech' },
    { id: 'groq', label: 'GROQ', type: 'tech' },
    { id: 'enter', label: 'ENTER', type: 'control', width: 1.2 },
  ],
  [
    { id: 'shiftL', label: 'SHIFT', type: 'control', width: 1.8 },
    { id: 'js', label: 'JAVASCRIPT', type: 'tech' },
    { id: 'html', label: 'HTML', type: 'tech' },
    { id: 'css', label: 'CSS', type: 'tech' },
    { id: 'git', label: 'GIT', type: 'tech' },
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

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse [0, 1] to rotation degrees
  // e.g. looking down at the keyboard, so slight tilt X and Y
  const rotateX = useTransform(springY, [0, 1], [30, -10]);
  const rotateY = useTransform(springX, [0, 1], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    // Set initial slightly tilted state
    mouseX.set(0.5);
    mouseY.set(0.2); // slight look-down
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleKeyClick = (e, key) => {
    // Determine center of the button for the confetti origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Trigger emoji blast
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
    
    // Also add some standard confetti for pop
    confetti({
      particleCount: 20,
      spread: 70,
      origin: { x, y },
      colors: ['#c9961a', '#000000', '#ffffff'],
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
        minHeight: '100vh',
        background: 'var(--bg-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1400px', // Creates the 3D depth
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(201,150,26,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          position: 'absolute',
          top: '12vh',
          left: '8vw',
          zIndex: 20,
          pointerEvents: 'none',
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
          (Press a key to interact)
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
        {/* The Cute Cat Peeking from Behind the Keyboard */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '-140px',
            left: '50%',
            transform: 'translateX(-50%) translateZ(-20px)', // Behind the keyboard board
            width: '180px',
            height: '150px',
            zIndex: -1,
          }}
        >
          {/* Cute SVG Cat */}
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <path d="M40 200C40 140 70 100 100 100C130 100 160 140 160 200" fill="#2d2d2d" />
            {/* Head */}
            <circle cx="100" cy="110" r="55" fill="#2d2d2d" />
            {/* Ears */}
            <path d="M45 110L40 40L80 70" fill="#2d2d2d" />
            <path d="M155 110L160 40L120 70" fill="#2d2d2d" />
            {/* Inner Ears */}
            <path d="M50 100L48 55L75 75" fill="#f49d9d" />
            <path d="M150 100L152 55L125 75" fill="#f49d9d" />
            {/* Eyes */}
            <circle cx="80" cy="105" r="10" fill="#fff" />
            <circle cx="120" cy="105" r="10" fill="#fff" />
            {/* Pupils (using motion values to look at mouse could be cool, but static for now) */}
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
            {/* Paws resting on keyboard */}
            <ellipse cx="60" cy="185" rx="20" ry="15" fill="#2d2d2d" />
            <ellipse cx="140" cy="185" rx="20" ry="15" fill="#2d2d2d" />
          </svg>
        </motion.div>

        {/* The Keyboard Board/Chassis */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '24px',
            borderRadius: '24px',
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05), inset 0 2px 5px rgba(255,255,255,0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0px)',
          }}
        >
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                gap: '12px',
                transformStyle: 'preserve-3d',
              }}
            >
              {row.map((key) => {
                const isTech = key.type === 'tech';
                const w = key.width || 1;
                const baseWidth = 60; // Base px width for a standard key
                
                return (
                  <motion.button
                    key={key.id}
                    onPointerDown={(e) => handleKeyClick(e, key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95, translateZ: 2 }} // Press down effect
                    style={{
                      position: 'relative',
                      width: `${baseWidth * w + (w - 1) * 12}px`,
                      height: '60px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                      transformStyle: 'preserve-3d',
                      // Base depth offset from the board
                      transform: 'translateZ(10px)',
                      // 3D keycap look using CSS gradients and shadows
                      background: isTech 
                        ? 'linear-gradient(180deg, #ffffff 0%, #f1f3f5 100%)' 
                        : 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: isTech 
                        ? '0px 8px 0px 0px #d0d0d0, 0px 12px 15px rgba(0,0,0,0.1)'
                        : '0px 6px 0px 0px #c4c4c4, 0px 10px 10px rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: isTech ? '11px' : '10px',
                      fontWeight: isTech ? 700 : 500,
                      color: isTech ? 'var(--accent)' : 'var(--text-secondary)',
                      letterSpacing: '0.05em',
                      transition: 'box-shadow 0.1s ease',
                    }}
                    onPointerDownCapture={(e) => {
                      // Decrease shadow size visually when pressed
                      e.currentTarget.style.boxShadow = isTech
                        ? '0px 2px 0px 0px #d0d0d0, 0px 4px 5px rgba(0,0,0,0.1)'
                        : '0px 2px 0px 0px #c4c4c4, 0px 4px 5px rgba(0,0,0,0.05)';
                    }}
                    onPointerUpCapture={(e) => {
                      // Restore shadow
                      e.currentTarget.style.boxShadow = isTech
                        ? '0px 8px 0px 0px #d0d0d0, 0px 12px 15px rgba(0,0,0,0.1)'
                        : '0px 6px 0px 0px #c4c4c4, 0px 10px 10px rgba(0,0,0,0.05)';
                    }}
                    onPointerLeave={(e) => {
                      // Restore shadow if cursor leaves while held down
                      e.currentTarget.style.boxShadow = isTech
                        ? '0px 8px 0px 0px #d0d0d0, 0px 12px 15px rgba(0,0,0,0.1)'
                        : '0px 6px 0px 0px #c4c4c4, 0px 10px 10px rgba(0,0,0,0.05)';
                    }}
                  >
                    {/* Inner keycap contour line */}
                    <div style={{
                      position: 'absolute',
                      inset: '4px',
                      borderRadius: '8px',
                      borderTop: '1px solid rgba(255,255,255,0.8)',
                      borderBottom: '1px solid rgba(0,0,0,0.03)',
                      pointerEvents: 'none'
                    }} />
                    
                    <span style={{ 
                      position: 'relative', 
                      zIndex: 2, 
                      transform: 'translateZ(5px)', // lift text slightly
                    }}>
                      {key.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
