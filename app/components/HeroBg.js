'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils } from 'three';

const GRID_SIZE = 35; // 35x35 grid
const CUBE_SIZE = 1.0;
const SPACING = 1.02; // very slight gap like the screenshot

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_SIZE * GRID_SIZE;
  
  // Track each cube's target rotation/position for smooth spring physics
  const states = useMemo(() => Array.from({ length: count }, () => ({
    rX: 0, rY: 0, rZ: 0,
    trX: 0, trY: 0, trZ: 0,
    pY: 0, tpY: 0
  })), [count]);

  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: -100, y: -100 });

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

    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    if (meshRef.current) {
      let i = 0;
      const offset = (GRID_SIZE * SPACING) / 2;
      
      const mouseWorldX = mouse.current.x * 25;
      const mouseWorldY = mouse.current.y * 15;

      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          const px = x * SPACING - offset;
          const py = y * SPACING - offset;

          const dx = px - mouseWorldX;
          const dy = py - mouseWorldY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const cubeState = states[i];

          // If mouse is close, flip the cube
          if (dist < 3.5) {
            // Push it back slightly and rotate
            cubeState.tpY = -0.5;
            cubeState.trX = Math.PI; 
            cubeState.trY = Math.PI / 4;
          } else {
            // Subtle ambient wave when far
            const wave = Math.sin(px * 0.2 + time * 1.5) * 0.1 + Math.cos(py * 0.2 + time * 1.5) * 0.1;
            cubeState.tpY = wave;
            cubeState.trX = 0;
            cubeState.trY = 0;
          }

          // Spring interpolation
          cubeState.pY = MathUtils.lerp(cubeState.pY, cubeState.tpY, 0.08);
          cubeState.rX = MathUtils.lerp(cubeState.rX, cubeState.trX, 0.1);
          cubeState.rY = MathUtils.lerp(cubeState.rY, cubeState.trY, 0.1);

          dummy.position.set(px, py, cubeState.pY);
          dummy.rotation.set(cubeState.rX, cubeState.rY, 0);
          
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i++, dummy.matrix);
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const cubeColor = isNight ? '#0f172a' : '#ffffff';

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial 
        color={cubeColor} 
        roughness={0.1} 
        metalness={0.1}
      />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [mounted, setMounted] = useState(false);
  const [isNight, setIsNight] = useState(false);

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
      <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
        <ambientLight intensity={isNight ? 0.5 : 1.2} />
        {/* Soft, studio-like lighting to make the white cubes look premium */}
        <directionalLight position={[5, 10, 15]} intensity={isNight ? 2 : 2.5} color={isNight ? '#818cf8' : '#ffffff'} castShadow />
        <directionalLight position={[-15, -10, -10]} intensity={isNight ? 1 : 1.5} color={isNight ? '#c084fc' : '#e2e8f0'} />
        <pointLight position={[0, 0, 5]} intensity={isNight ? 1 : 0.5} color={isNight ? '#38bdf8' : '#ffffff'} />
        
        <Cubes isNight={isNight} />
        
        <fog attach="fog" args={[isNight ? '#020617' : '#fafafa', 12, 28]} />
      </Canvas>
    </div>
  );
}
