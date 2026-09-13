'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Environment, ContactShadows, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

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
          fontSize={0.25}
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
  const [activeTech, setActiveTech] = useState("Press any key...");

  // Grid layout config
  const cols = 5;
  const spacing = 2.1;

  const playClick = () => {
    try {
      const audio = new Audio('/assets/keycap-sounds/click-1.mp3'); // or whichever audio
      audio.volume = 0.5;
      audio.play().catch(()=>{});
    } catch(e){}
  };

  return (
    <section id="stack" className="section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px', zIndex: 10 }}>
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
          style={{ marginTop: '20px', fontSize: '1.2rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          {activeTech}
        </motion.p>
      </div>

      <div style={{ width: '100%', height: '600px', cursor: 'grab' }} onMouseDown={e => e.currentTarget.style.cursor = 'grabbing'} onMouseUp={e => e.currentTarget.style.cursor = 'grab'}>
        <Canvas camera={{ position: [0, 8, 8], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
          <spotLight position={[-10, 10, 10]} intensity={1.5} color="#c084fc" />
          <Environment preset="city" />
          
          <PresentationControls 
            global 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 4, Math.PI / 4]} 
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <group position={[-(cols * spacing) / 2 + spacing / 2, 0, -spacing]}>
                {MY_STACK.map((tech, i) => {
                  const row = Math.floor(i / cols);
                  const col = i % cols;
                  return (
                    <Keycap 
                      key={tech.id} 
                      position={[col * spacing, 0, row * spacing]} 
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
          
          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={20} blur={2} far={4} color="#000000" />
        </Canvas>
      </div>
    </section>
  );
}


