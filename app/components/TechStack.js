'use client';
import { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, MeshReflectorMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  { name: 'React',      color: '#61DAFB', char: 'R' },
  { name: 'Next.js',   color: '#ffffff', char: 'N' },
  { name: 'Python',    color: '#3776AB', char: 'Py' },
  { name: 'Node.js',   color: '#339933', char: 'No' },
  { name: 'TypeScript',color: '#3178C6', char: 'TS' },
  { name: 'OpenAI',    color: '#412991', char: 'AI' },
  { name: 'AWS',       color: '#FF9900', char: 'AW' },
  { name: 'Docker',    color: '#2496ED', char: 'Do' },
  { name: 'Git',       color: '#F05032', char: 'Gt' },
  { name: 'Tailwind',  color: '#06B6D4', char: 'Tw' },
  { name: 'MongoDB',   color: '#47A248', char: 'Mg' },
  { name: 'Firebase',  color: '#FFCA28', char: 'Fb' },
  { name: 'PostgreSQL',color: '#4169E1', char: 'PG' },
  { name: 'LangChain', color: '#1C3C3C', char: 'LC' },
  { name: 'Three.js',  color: '#eeeeee', char: '3D' },
];

function Key({ skill, position, onHover, isHovered }) {
  const meshRef = useRef();
  const [pressed, setPressed] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const targetY = pressed || isHovered ? position[1] - 0.08 : position[1];
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.2;
    }
  });

  return (
    <group>
      {/* Key stem */}
      <mesh position={[position[0], position[1] - 0.18, position[2]]}>
        <boxGeometry args={[0.52, 0.12, 0.52]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Main keycap */}
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => { onHover(skill); setPressed(false); }}
        onPointerOut={() => { onHover(null); setPressed(false); }}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
      >
        <RoundedBox args={[0.55, 0.2, 0.55]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color={isHovered ? skill.color : '#1a1a2e'}
            emissive={isHovered ? skill.color : '#000000'}
            emissiveIntensity={isHovered ? 0.3 : 0}
            roughness={0.3}
            metalness={0.7}
          />
        </RoundedBox>
        {/* Keycap label */}
        <Text
          position={[0, 0.11, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.14}
          color={isHovered ? '#000000' : skill.color}
          font="/fonts/inter.woff"
          anchorX="center"
          anchorY="middle"
        >
          {skill.char}
        </Text>
      </group>
    </group>
  );
}

function KeyboardBase() {
  return (
    <group>
      {/* Main body */}
      <RoundedBox args={[5.8, 0.25, 3.4]} radius={0.12} smoothness={4} position={[0, -0.35, 0]}>
        <meshStandardMaterial color="#0d0d1a" roughness={0.4} metalness={0.8} />
      </RoundedBox>
      {/* Subtle glow strip at base */}
      <mesh position={[0, -0.235, 1.6]}>
        <boxGeometry args={[5.6, 0.02, 0.06]} />
        <meshStandardMaterial color="#5b21b6" emissive="#5b21b6" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

function Keyboard({ onHover, hoveredSkill }) {
  const rows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
  ];

  const startX = -2.2;
  const startZ = -0.9;
  const gap = 0.68;

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group rotation={[-0.35, 0.25, 0]}>
        <KeyboardBase />
        {rows.map((row, ri) =>
          row.map((skillIdx, ci) => (
            <Key
              key={skillIdx}
              skill={SKILLS[skillIdx]}
              position={[
                startX + ci * gap,
                -0.12,
                startZ + ri * gap,
              ]}
              onHover={onHover}
              isHovered={hoveredSkill?.name === SKILLS[skillIdx].name}
            />
          ))
        )}
      </group>
    </Float>
  );
}

function Scene({ onHover, hoveredSkill }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, 4, -2]} intensity={0.8} color="#5b21b6" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#06b6d4" />
      <Environment preset="city" />
      <Keyboard onHover={onHover} hoveredSkill={hoveredSkill} />
      {/* Reflective ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 50]}
          resolution={512}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050510"
          metalness={0.5}
        />
      </mesh>
    </>
  );
}

export default function TechStack() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="stack" style={{ position: 'relative', zIndex: 10, padding: '100px 8vw 60px', background: 'var(--bg-base)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 className="section-title">Tech Stack</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginTop: '12px' }}>
            Hover the keys to explore my toolkit
          </p>
        </div>

        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* 3D Keyboard Canvas */}
          <div style={{
            flex: '1 1 500px',
            height: '420px',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, #0d0d2b 0%, #050510 100%)',
            border: '1px solid rgba(91, 33, 182, 0.3)',
            boxShadow: '0 0 60px rgba(91, 33, 182, 0.15)',
            cursor: 'crosshair',
          }}>
            <Canvas
              camera={{ position: [0, 3.5, 5.5], fov: 40 }}
              gl={{ antialias: true, alpha: false }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <Scene onHover={setHoveredSkill} hoveredSkill={hoveredSkill} />
              </Suspense>
            </Canvas>
          </div>

          {/* Info Panel */}
          <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
            {hoveredSkill ? (
              <div style={{
                padding: '32px',
                borderRadius: '20px',
                background: 'var(--bg-surface)',
                border: `1px solid ${hoveredSkill.color}44`,
                boxShadow: `0 0 40px ${hoveredSkill.color}22`,
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${hoveredSkill.color}22`,
                  border: `1px solid ${hoveredSkill.color}66`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: hoveredSkill.color,
                  marginBottom: '16px',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {hoveredSkill.char}
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: hoveredSkill.color, marginBottom: '8px' }}>
                  {hoveredSkill.name}
                </h3>
                <div style={{
                  width: '40px',
                  height: '3px',
                  background: hoveredSkill.color,
                  borderRadius: '2px',
                  marginTop: '12px'
                }} />
              </div>
            ) : (
              <div style={{
                padding: '32px',
                borderRadius: '20px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
              }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                  Hover any key on the 3D keyboard to explore the tools I use to build AI-powered, full-stack applications.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {SKILLS.map((s) => (
                    <span
                      key={s.name}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: `${s.color}18`,
                        color: s.color,
                        border: `1px solid ${s.color}33`,
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
