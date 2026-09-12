'use client';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';

const GRID_SIZE = 26; 
const CUBE_SIZE = 2.005; 
const SPACING = 2.0; 

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_SIZE * GRID_SIZE;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#e2e8f0'), []); // slate-200
  const cRippleLight = useMemo(() => new Color('#818cf8'), []); // indigo-400
  
  const cBaseNight = useMemo(() => new Color('#0f172a'), []); // slate-900
  const cRippleNight = useMemo(() => new Color('#38bdf8'), []); // sky-400

  const states = useMemo(() => Array.from({ length: count }, () => ({
    pY: 0, tpY: 0,
    colorVal: 0
  })), [count]);

  const mouse = useRef({ x: -100, y: -100 });
  const targetMouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onLeave = () => {
      targetMouse.current.x = -100;
      targetMouse.current.y = -100;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useFrame(() => {
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    if (meshRef.current && meshRef.current.instanceColor) {
      let i = 0;
      const offset = (GRID_SIZE * SPACING) / 2;
      
      const mouseWorldX = mouse.current.x * 25;
      const mouseWorldY = mouse.current.y * 15;

      const cBase = isNight ? cBaseNight : cBaseLight;
      const cRipple = isNight ? cRippleNight : cRippleLight;

      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          const px = x * SPACING - offset;
          const py = y * SPACING - offset;

          const dx = px - mouseWorldX;
          const dy = py - mouseWorldY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const cubeState = states[i];

          const maxDist = 6.0;
          if (dist < maxDist) {
            const intensity = Math.exp(-Math.pow(dist, 2) / 8.0);
            cubeState.tpY = -2.0 * intensity;
            cubeState.colorVal = intensity; 
          } else {
            cubeState.tpY = 0;
            cubeState.colorVal = 0;
          }

          cubeState.pY = MathUtils.lerp(cubeState.pY, cubeState.tpY, 0.08);

          dummy.position.set(px, py, cubeState.pY);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);

          tempColor.copy(cBase).lerp(cRipple, MathUtils.clamp(cubeState.colorVal, 0, 1));
          meshRef.current.setColorAt(i, tempColor);

          i++;
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.8]} />
      <meshStandardMaterial 
        roughness={0.6} 
        metalness={0.1}
      />
    </instancedMesh>
  );
}

export default function HeroBg({ isNight = false }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background: isNight ? '#020617' : '#f8fafc'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 40 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={isNight ? 1.0 : 1.2} />
        <directionalLight position={[10, 20, 15]} intensity={isNight ? 1.5 : 1.8} />
        <Cubes isNight={isNight} />
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '40vh',
        background: 'linear-gradient(to bottom, transparent, var(--bg-base))',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
