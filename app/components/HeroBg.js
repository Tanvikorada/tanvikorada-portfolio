'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, MathUtils } from 'three';

const GRID_SIZE = 30; // 30x30 grid
const SPACING = 1.1;

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_SIZE * GRID_SIZE;

  // Track mouse
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    const time = clock.getElapsedTime();

    // Smooth mouse
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.05);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.05);

    if (meshRef.current) {
      let i = 0;
      const offset = (GRID_SIZE * SPACING) / 2;

      for (let x = 0; x < GRID_SIZE; x++) {
        for (let z = 0; z < GRID_SIZE; z++) {
          const px = x * SPACING - offset;
          const pz = z * SPACING - offset;

          // Distance from mouse in world space (roughly)
          const mouseWorldX = mouse.current.x * 20;
          const mouseWorldZ = -mouse.current.y * 20 - 5; // offset center
          
          const dx = px - mouseWorldX;
          const dz = pz - mouseWorldZ;
          const dist = Math.sqrt(dx * dx + dz * dz);

          // Base wave + cursor ripple
          const wave = Math.sin(px * 0.4 + time) * 0.4 + Math.cos(pz * 0.4 + time) * 0.4;
          const ripple = Math.max(0, 1 - dist / 6) * 3.5; // elevate cubes near cursor
          
          const py = wave + ripple - 3; // lower the grid slightly

          dummy.position.set(px, py, pz);
          
          // Rotate cubes slightly based on wave and ripple
          dummy.rotation.x = wave * 0.1;
          dummy.rotation.z = ripple * 0.2;
          
          // Scale cubes up near cursor
          const scale = 1 + ripple * 0.2;
          dummy.scale.set(scale, scale, scale);

          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i++, dummy.matrix);
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const cubeColor = isNight ? '#1e293b' : '#cbd5e1';

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[0.85, 0.85, 0.85]} />
      <meshStandardMaterial 
        color={cubeColor} 
        roughness={0.15} 
        metalness={0.6} 
      />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(false);

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsNight(document.body.classList.contains('night'));
    const obs = new MutationObserver(() => setIsNight(document.body.classList.contains('night')));
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: isNight ? '#020617' : '#fafafa', zIndex: -1 }} />
      <Canvas camera={{ position: [0, 8, 16], fov: 45 }}>
        <ambientLight intensity={isNight ? 0.3 : 0.9} />
        <directionalLight position={[10, 20, 10]} intensity={isNight ? 2 : 3} color={isNight ? '#818cf8' : '#ffffff'} />
        <pointLight position={[-10, 5, -10]} intensity={isNight ? 3 : 1} color={isNight ? '#f472b6' : '#94a3b8'} />
        
        <Cubes isNight={isNight} />
        
        {/* Soft fog to blend the edges of the grid */}
        <fog attach="fog" args={[isNight ? '#020617' : '#fafafa', 10, 26]} />
      </Canvas>
    </div>
  );
}
