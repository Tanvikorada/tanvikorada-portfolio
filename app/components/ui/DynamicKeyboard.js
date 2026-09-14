'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const TECH_STACK = [
  'React', 'Next.js', 'Node.js', 'Python',
  'Postgres', 'Firebase', 'AWS', 'YOLO',
  'MediaPipe', 'GenAI', 'Prompt', 'HTML',
  'CSS', 'Tailwind', 'JS', 'Git'
];

function Keycap({ position, label, onClick }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  
  const targetY = pressed ? position[1] - 0.2 : (hovered ? position[1] + 0.1 : position[1]);
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, delta * 15);
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={mesh}
        args={[1.8, 0.8, 1.8]}
        radius={0.15}
        smoothness={4}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => { setHover(false); setPressed(false); }}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => { setPressed(false); onClick?.(label); }}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial 
          color={hovered ? "#38bdf8" : "#ffffff"} 
          roughness={0.2} 
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <Text
          position={[0, 0.41, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.35}
          color="#000000"
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

export default function DynamicKeyboard() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 8, 10], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Environment preset="city" />
        
        <group position={[-3.5, 0, -3.5]}>
          {TECH_STACK.map((tech, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            return (
              <Keycap 
                key={tech} 
                position={[col * 2.2, 0, row * 2.2]} 
                label={tech} 
                onClick={(label) => console.log('Clicked', label)}
              />
            );
          })}
        </group>
        
        <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
