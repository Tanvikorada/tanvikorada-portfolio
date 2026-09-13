'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Environment, ContactShadows, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const MY_STACK = [
  { id: 'react', label: 'React', color: '#61dafb' },
  { id: 'next', label: 'Next.js', color: '#ffffff' },
  { id: 'node', label: 'Node.js', color: '#339933' },
  { id: 'python', label: 'Python', color: '#3776ab' },
  { id: 'postgres', label: 'PostgreSQL', color: '#336791' },
  { id: 'firebase', label: 'Firebase', color: '#ffca28' },
  { id: 'aws', label: 'AWS Cloud', color: '#ff9900' },
  { id: 'html', label: 'HTML/CSS', color: '#e34f26' },
  { id: 'js', label: 'JavaScript', color: '#f7df1e' },
  { id: 'tailwind', label: 'Tailwind', color: '#38b2ac' },
  { id: 'yolo', label: 'YOLO CV', color: '#00ffff' },
  { id: 'mediapipe', label: 'MediaPipe', color: '#ff4b4b' },
  { id: 'genai', label: 'GenAI', color: '#c084fc' },
  { id: 'prompt', label: 'Prompt Eng.', color: '#a855f7' },
  { id: 'git', label: 'Git / GitHub', color: '#f05032' },
];

const BOMB_EMOJIS = ['🚀', '💥', '🔥', '✨', '💻', '💡', '🌟', '🤯'];

function Keycap({ position, label, accent, onClick }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  
  const targetY = pressed ? position[1] - 0.2 : (hovered ? position[1] + 0.15 : position[1]);
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, delta * 15);
      if (hovered) {
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -0.1, delta * 10);
        mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, 0.05, delta * 10);
      } else {
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, 0, delta * 10);
        mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, 0, delta * 10);
      }
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={mesh}
        args={[1.8, 0.6, 1.8]}
        radius={0.15}
        smoothness={4}
        onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); setPressed(false); document.body.style.cursor = 'default'; }}
        onPointerDown={(e) => { e.stopPropagation(); setPressed(true); }}
        onPointerUp={(e) => { e.stopPropagation(); setPressed(false); onClick?.(label); }}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial 
          color={hovered ? accent : "#1a1a24"} 
          roughness={hovered ? 0.2 : 0.4} 
          metalness={0.5}
          clearcoat={hovered ? 1 : 0.5}
          clearcoatRoughness={0.1}
        />
        <Text
          position={[0, 0.31, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.24}
          color={hovered ? "#000000" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {label}
        </Text>
      </RoundedBox>
    </group>
  );
}

export default function TechStackKeyboard() {
  const [activeTech, setActiveTech] = useState("Hover or click a key");
  const [emojiMenuPos, setEmojiMenuPos] = useState(null);

  const cols = 5;
  const spacing = 2.1;

  const playClick = () => {
    try {
      const audio = new Audio('/assets/keycap-sounds/click-1.mp3');
      audio.volume = 0.5;
      audio.play().catch(()=>{});
    } catch(e){}
  };

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

  return (
    <section 
      id="stack" 
      className="section" 
      onClick={() => setEmojiMenuPos(null)}
      onContextMenu={handleRightClick}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      
      {emojiMenuPos && (
        <div 
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: Math.min(emojiMenuPos.x, typeof window !== 'undefined' ? window.innerWidth - 200 : 0),
            top: Math.min(emojiMenuPos.y, typeof window !== 'undefined' ? window.innerHeight - 150 : 0),
            background: 'var(--bg-glass)',
            border: '1px solid var(--border)',
            padding: '16px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            zIndex: 10000,
            backdropFilter: 'blur(24px)',
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

      <div style={{ textAlign: 'center', marginBottom: '10px', zIndex: 10, pointerEvents: 'none' }}>
        <motion.p 
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-eyebrow" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 20px', borderRadius: '100px', display: 'inline-block', marginBottom: '24px' }}>
          My Tech Stack
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
          Interactive Keyboard
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ marginTop: '16px', fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          (Right-click anywhere to emoji bomb)
        </motion.p>
      </div>

      <div style={{ width: '100%', height: '70vh', cursor: 'grab' }} onMouseDown={e => e.currentTarget.style.cursor = 'grabbing'} onMouseUp={e => e.currentTarget.style.cursor = 'grab'}>
        <Canvas camera={{ position: [0, 8, 5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
          <spotLight position={[-10, 10, 10]} intensity={1.5} color="#c084fc" />
          <Environment preset="city" />
          
          <PresentationControls 
            global 
            rotation={[0.3, 0.4, -0.1]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 4, Math.PI / 4]} 
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
              <group>
                {/* Keyboard Base / Case */}
                <RoundedBox
                  args={[11.6, 0.5, 7.4]}
                  position={[0, -0.35, 0]}
                  radius={0.2}
                  smoothness={4}
                  castShadow
                  receiveShadow
                >
                  <meshPhysicalMaterial 
                    color="#09090c" 
                    roughness={0.8}
                    metalness={0.2}
                    clearcoat={0.1}
                  />
                </RoundedBox>
                
                {/* Accent Trim */}
                <RoundedBox
                  args={[11.8, 0.1, 7.6]}
                  position={[0, -0.55, 0]}
                  radius={0.2}
                  smoothness={4}
                >
                  <meshPhysicalMaterial color="#38bdf8" roughness={0.5} metalness={0.8} />
                </RoundedBox>

                {/* Keys */}
                {MY_STACK.map((tech, i) => {
                  const row = Math.floor(i / cols);
                  const col = i % cols;
                  // Centered positions
                  const x = (col * spacing) - ((cols - 1) * spacing / 2);
                  const z = (row * spacing) - (2 * spacing / 2); // 3 rows
                  return (
                    <Keycap 
                      key={tech.id} 
                      position={[x, 0.1, z]} 
                      label={tech.label} 
                      accent={tech.color}
                      onClick={(label) => {
                        setActiveTech(label + " initialized.");
                        playClick();
                      }}
                    />
                  );
                })}
              </group>
            </Float>
          </PresentationControls>
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={25} blur={2.5} far={4} color="#000000" />
        </Canvas>
      </div>
      
      <div style={{ position: 'absolute', bottom: '10%', pointerEvents: 'none' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
          {activeTech}
        </p>
      </div>
    </section>
  );
}
