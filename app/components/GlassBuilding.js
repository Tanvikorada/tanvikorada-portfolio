'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Premium Glass Material
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#ffffff',
  transmission: 1, // Glass-like transparency
  opacity: 1,
  metalness: 0.1,
  roughness: 0.1,
  ior: 1.5,
  thickness: 2,
  specularIntensity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
});

// Glowing Neon Core Material
const neonCoreMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color('#00ffcc').multiplyScalar(2), // Super bright cyan
});

export default function GlassBuilding({ progress = 0 }) {
  const groupRef = useRef();
  const schoolRef = useRef();
  const collegeRef = useRef();
  const univRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slowly rotate the entire structure for a premium showcase feel
    groupRef.current.rotation.y += delta * 0.2;
    
    // Animate individual scales based on scroll progress
    
    // School (0 -> 0.3)
    const schoolScale = progress < 0.3 ? 1 : 1 - (progress - 0.3) * 5;
    if (schoolRef.current) {
      schoolRef.current.scale.setScalar(Math.max(0, schoolScale));
    }

    // College (0.3 -> 0.6)
    let collegeScale = 0;
    if (progress > 0.25 && progress < 0.65) {
      collegeScale = Math.min(1, (progress - 0.25) * 5);
      if (progress > 0.55) collegeScale = Math.max(0, 1 - (progress - 0.55) * 5);
    }
    if (collegeRef.current) {
      collegeRef.current.scale.setScalar(Math.max(0, collegeScale));
    }

    // University (0.6 -> 1.0)
    let univScale = 0;
    if (progress > 0.55) {
      univScale = Math.min(1, (progress - 0.55) * 5);
    }
    if (univRef.current) {
      univRef.current.scale.setScalar(Math.max(0, univScale));
    }
  });

  return (
    <>
      {/* Studio Lighting & Reflections for Glass */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00ffcc" />
      
      {/* Floating animation for the whole group */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef} position={[0, -1, 0]}>
          
          {/* Phase 1: School (Minimalistic Glass House) */}
          <group ref={schoolRef}>
            <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={4} material={glassMaterial} />
            <mesh position={[0, 1.5, 0]}>
              <coneGeometry args={[1.5, 1, 4]} />
              <primitive object={glassMaterial} attach="material" />
            </mesh>
            {/* Glowing Core inside */}
            <mesh position={[0, 0, 0]} material={neonCoreMaterial}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
            </mesh>
          </group>

          {/* Phase 2: College (Multi-level Glass Structure) */}
          <group ref={collegeRef} scale={0}>
            <RoundedBox args={[3, 1, 2]} position={[0, -0.5, 0]} radius={0.1} smoothness={4} material={glassMaterial} />
            <RoundedBox args={[2, 1.5, 1.5]} position={[0, 0.75, 0]} radius={0.1} smoothness={4} material={glassMaterial} />
            <RoundedBox args={[1, 1, 1]} position={[0, 2, 0]} radius={0.1} smoothness={4} material={glassMaterial} />
            {/* Multiple Glowing Cores */}
            <mesh position={[-1, -0.5, 0]} material={neonCoreMaterial}><sphereGeometry args={[0.3, 16, 16]} /></mesh>
            <mesh position={[1, -0.5, 0]} material={neonCoreMaterial}><sphereGeometry args={[0.3, 16, 16]} /></mesh>
            <mesh position={[0, 0.75, 0]} material={neonCoreMaterial}><sphereGeometry args={[0.4, 16, 16]} /></mesh>
          </group>

          {/* Phase 3: University (Massive Glass Campus) */}
          <group ref={univRef} scale={0}>
            {/* Main Base */}
            <RoundedBox args={[4, 1, 4]} position={[0, -0.5, 0]} radius={0.1} smoothness={4} material={glassMaterial} />
            {/* Center Dome */}
            <mesh position={[0, 0.5, 0]} material={glassMaterial}>
              <sphereGeometry args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
            {/* 4 Towers */}
            <RoundedBox args={[0.5, 3, 0.5]} position={[-1.5, 1, -1.5]} radius={0.05} smoothness={4} material={glassMaterial} />
            <RoundedBox args={[0.5, 3, 0.5]} position={[1.5, 1, -1.5]} radius={0.05} smoothness={4} material={glassMaterial} />
            <RoundedBox args={[0.5, 3, 0.5]} position={[-1.5, 1, 1.5]} radius={0.05} smoothness={4} material={glassMaterial} />
            <RoundedBox args={[0.5, 3, 0.5]} position={[1.5, 1, 1.5]} radius={0.05} smoothness={4} material={glassMaterial} />
            
            {/* Giant Central Glow Core */}
            <mesh position={[0, 0.2, 0]} material={neonCoreMaterial}>
              <torusKnotGeometry args={[0.5, 0.1, 100, 16]} />
            </mesh>
            {/* Floating Data Nodes (Sparkles) */}
            <Sparkles count={100} scale={5} size={2} color="#00ffcc" speed={0.5} />
          </group>

        </group>
      </Float>

      {/* Realistic Shadow beneath the buildings */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.8} scale={10} blur={2} far={4} color="#00ffcc" />
    </>
  );
}
