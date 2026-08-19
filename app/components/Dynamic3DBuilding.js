'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';

// This is the inner 3D scene
function Scene({ progress }) {
  // References for our 3 groups
  const groupRef = useRef();
  const schoolRef = useRef();
  const collegeRef = useRef();
  const univRef = useRef();

  useFrame(() => {
    // Read the latest scroll progress (0 to 1)
    const p = progress.get();

    // Helper to map values (like useTransform)
    const map = (val, inMin, inMax, outMin, outMax) => {
      if (val <= inMin) return outMin;
      if (val >= inMax) return outMax;
      return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
    };

    // Phase 1: School
    const schoolS = map(p, 0, 0.2, 0, 1);
    const schoolY = map(p, 0, 0.2, 5, 0);
    if (schoolRef.current) {
      schoolRef.current.scale.set(schoolS, schoolS, schoolS);
      schoolRef.current.position.y = schoolY;
    }

    // Phase 2: College
    const collegeS = map(p, 0.3, 0.5, 0, 1);
    const collegeY = map(p, 0.3, 0.5, 5, 0);
    if (collegeRef.current) {
      collegeRef.current.scale.set(collegeS, collegeS, collegeS);
      collegeRef.current.position.y = collegeY;
    }

    // Phase 3: University
    const univS = map(p, 0.6, 0.8, 0, 1);
    const univY = map(p, 0.6, 0.8, 5, 0);
    if (univRef.current) {
      univRef.current.scale.set(univS, univS, univS);
      univRef.current.position.y = univY;
    }

    // General rotation as user scrolls
    if (groupRef.current) {
      groupRef.current.rotation.y = map(p, 0, 1, Math.PI / 4, Math.PI * 1.5);
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* --- The School (Base building) --- */}
      <group ref={schoolRef}>
        {/* Main block */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1, 1.5]} />
          <meshStandardMaterial color="#34d399" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[1.5, 0.5, 4]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
      </group>

      {/* --- The College (Expands the school) --- */}
      <group ref={collegeRef}>
        {/* Left Wing */}
        <mesh position={[-1.5, 0.75, 0]}>
          <boxGeometry args={[1, 1.5, 1.5]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Right Wing */}
        <mesh position={[1.5, 0.75, 0]}>
          <boxGeometry args={[1, 1.5, 1.5]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Upper Level */}
        <mesh position={[0, 1.75, 0]}>
          <boxGeometry args={[2, 0.5, 1.5]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>

      {/* --- The University (Massive Expansion) --- */}
      <group ref={univRef}>
        {/* Massive Base */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[5, 0.5, 3]} />
          <meshStandardMaterial color="#c9961a" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Pillars */}
        {[-2, -1, 1, 2].map((x) => (
          <mesh key={x} position={[x, 1.25, 1.2]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
        ))}
        {/* Epic Dome */}
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c9961a" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

    </group>
  );
}

// Wrapper component to provide the Canvas
export default function Dynamic3DBuilding({ progress }) {
  return (
    <div style={{ width: '100%', height: '500px', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [5, 5, 8], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        
        {/* Beautiful Environment Reflections */}
        <Environment preset="city" />

        {/* The Animated Scene */}
        <Scene progress={progress} />

        {/* Fake Shadow on the floor */}
        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
