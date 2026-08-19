'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Dynamic import with SSR disabled to prevent hydration crashing
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null
});

gsap.registerPlugin(ScrollTrigger);

const BOMB_EMOJIS = ['😸', '🚀', '🔥', '⚡', '💻', '🎉', '💖', '👀'];

const playThock = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch(e) {}
};

const playRelease = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.03);
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch(e) {}
};

const SKILLS = {
  js: { name: 'js', label: 'JavaScript', shortDescription: "The language of the web." },
  ts: { name: 'ts', label: 'TypeScript', shortDescription: "JavaScript with strict typing." },
  html: { name: 'html', label: 'HTML', shortDescription: "The internet's backbone." },
  css: { name: 'css', label: 'CSS', shortDescription: "Styling with ultimate drip." },
  react: { name: 'react', label: 'React', shortDescription: "A library for user interfaces." },
  vue: { name: 'vue', label: 'Vue', shortDescription: "The chill pill for your frontend." },
  nextjs: { name: 'nextjs', label: 'Next.js', shortDescription: "The React framework." },
  tailwind: { name: 'tailwind', label: 'Tailwind', shortDescription: "Utility classes hitting different." },
  nodejs: { name: 'nodejs', label: 'Node.js', shortDescription: "JavaScript on the backend." },
  express: { name: 'express', label: 'Express', shortDescription: "Minimalist web framework." },
  postgres: { name: 'postgres', label: 'PostgreSQL', shortDescription: "SQL but make it fashion." },
  mongodb: { name: 'mongodb', label: 'MongoDB', shortDescription: "Flexin' with that NoSQL drip." },
  git: { name: 'git', label: 'Git', shortDescription: "Version control system." },
  github: { name: 'github', label: 'GitHub', shortDescription: "Where code lives." },
  prettier: { name: 'prettier', label: 'Prettier', shortDescription: "Making your code not a whole mess." },
  npm: { name: 'npm', label: 'NPM', shortDescription: "Package manager said 'I gotchu'." },
  firebase: { name: 'firebase', label: 'Firebase', shortDescription: "Your app's ultimate wingman." },
  wordpress: { name: 'wordpress', label: 'WordPress', shortDescription: "The grandpa of CMS." },
  linux: { name: 'linux', label: 'Linux', shortDescription: "Where chmod 777 is the ultimate flex." },
  docker: { name: 'docker', label: 'Docker', shortDescription: "Containerization at its best." },
  nginx: { name: 'nginx', label: 'NginX', shortDescription: "Reverse proxy go zoom." },
  aws: { name: 'aws', label: 'AWS', shortDescription: "The king of cloud." },
  gcp: { name: 'gcp', label: 'Google Cloud', shortDescription: "Cloud computing with Google vibes." },
  vim: { name: 'vim', label: 'Vim', shortDescription: "Exit? In this economy?" },
  vercel: { name: 'vercel', label: 'Vercel', shortDescription: "The triangle company." }
};

export default function AnimatedBackground() {
  const [splineApp, setSplineApp] = useState(null);
  const [emojiMenuPos, setEmojiMenuPos] = useState(null);
  const selectedSkillRef = useRef(null);

  const bongoAnimationRef = useRef(null);
  const keycapAnimationsRef = useRef(null);

  useEffect(() => {
    const handleClick = () => setEmojiMenuPos(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

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

  const handleMouseHover = (e) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;
    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playRelease();
      selectedSkillRef.current = null;
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      const skillName = e.target.name;
      const skill = Object.values(SKILLS).find(s => s.name === skillName);
      if (skill) {
        if (selectedSkillRef.current) playRelease();
        playThock();
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      }
    }
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      playRelease();
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });

    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      const skillName = e.target.name;
      const skill = Object.values(SKILLS).find(s => s.name === skillName);
      if (skill) {
        playThock();
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      }
    });

    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent) return { start: () => {}, stop: () => {} };

    let interval;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };

    let floatTweens = [];
    let settleTweens = [];
    const killFloat = () => { floatTweens.forEach(t => t.kill()); floatTweens = []; };
    const killSettle = () => { settleTweens.forEach(t => t.kill()); settleTweens = []; };

    const start = () => {
      killSettle();
      killFloat();
      Object.values(SKILLS).sort(() => Math.random() - 0.5).forEach((skill, idx) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        floatTweens.push(
          gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.1,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          })
        );
      });
    };

    const stop = () => {
      killFloat();
      killSettle();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        settleTweens.push(
          gsap.to(keycap.position, {
            y: 0,
            duration: 4,
            ease: "elastic.out(1,0.7)",
          })
        );
      });
    };
    return { start, stop };
  };

  // Predefined states mapped exactly from Naresh's config
  const KEYBOARD_STATES = {
    hero: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 225, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    stack: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
  };

  useEffect(() => {
    if (!splineApp) return;

    handleSplineInteractions();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();

    const kbd = splineApp.findObjectByName("keyboard");
    // Setup visibility for the logos (text nodes) on the keycaps
    const tDD = splineApp.findObjectByName("text-desktop-dark");
    const tDL = splineApp.findObjectByName("text-desktop");
    const tMD = splineApp.findObjectByName("text-mobile-dark");
    const tML = splineApp.findObjectByName("text-mobile");

    const updateLogos = () => {
      const isMobile = window.innerWidth < 768;
      const isNight = document.body.classList.contains('night');
      if (tDD) tDD.visible = !isMobile && !isNight;
      if (tDL) tDL.visible = !isMobile && isNight;
      if (tMD) tMD.visible = isMobile && !isNight;
      if (tML) tML.visible = isMobile && isNight;
    };
    
    updateLogos();
    window.addEventListener('resize', updateLogos);
    
    // Make actual keycaps visible! Otherwise it looks like a plain blank keyboard block.
    const allObjects = splineApp.getAllObjects();
    const isMobile = window.innerWidth < 768;
    
    // Add pop-in drop animation for the keys
    const dropKeycaps = async () => {
      if (isMobile) {
        const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
        mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
      } else {
        const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
        
        desktopKeyCaps.forEach((keycap, idx) => {
          setTimeout(() => {
            keycap.visible = true;
          }, idx * 70);
        });

        const keycaps = allObjects.filter((obj) => obj.name === "keycap");
        keycaps.forEach((keycap, idx) => {
          keycap.visible = false;
          setTimeout(() => {
            keycap.visible = true;
            gsap.fromTo(
              keycap.position,
              { y: 200 },
              { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
            );
          }, idx * 70);
        });
      }
    };
    dropKeycaps();
    
    // Initial state setup (Hero page)
    if (kbd) {
      gsap.set(kbd.scale, KEYBOARD_STATES.hero.scale);
      gsap.set(kbd.position, KEYBOARD_STATES.hero.position);
      gsap.set(kbd.rotation, KEYBOARD_STATES.hero.rotation);
    }
    
    // Typing cat starts on hero
    bongoAnimationRef.current.start();

    // Setup timeline for the transition to TechStack
    let stackTl;
    if (kbd) {
      stackTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#stack",
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
             bongoAnimationRef.current?.stop();
             keycapAnimationsRef.current?.start();
          },
          onLeaveBack: () => {
             keycapAnimationsRef.current?.stop();
             bongoAnimationRef.current?.start();
          }
        }
      });
      stackTl.to(kbd.scale, { ...KEYBOARD_STATES.stack.scale, duration: 1 }, 0);
      stackTl.to(kbd.position, { ...KEYBOARD_STATES.stack.position, duration: 1 }, 0);
      stackTl.to(kbd.rotation, { ...KEYBOARD_STATES.stack.rotation, duration: 1 }, 0);
    }

    return () => {
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
      if (stackTl) stackTl.kill();
      window.removeEventListener('resize', updateLogos);
    };
  }, [splineApp]);

  useEffect(() => {
    if (!splineApp) return;
    const onVisibility = () => {
      if (document.hidden) splineApp.stop();
      else splineApp.play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [splineApp]);

  return (
    <>
      {emojiMenuPos && (
        <div
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
        </div>
      )}

      <div 
        onContextMenu={handleRightClick}
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 0, 
          pointerEvents: 'auto', // Must be auto so Spline registers hover/click
          width: '100vw', 
          height: '100vh', 
          background: 'var(--bg-base)'
        }}
      >
        <Suspense fallback={null}>
          <Spline
            style={{ width: '100%', height: '100%' }}
            onLoad={(app) => setSplineApp(app)}
            scene="/assets/skills-keyboard.spline"
          />
        </Suspense>
      </div>
    </>
  );
}
