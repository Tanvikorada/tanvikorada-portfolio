'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const GRID_SIZE = 24; // Grid large enough to fill screen
const CUBE_SIZE = 2.002; // Matches SPACING for zero gap
const SPACING = 2.0;

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_SIZE * GRID_SIZE;
  
  const tempColor = useMemo(() => new Color(), []);
  
  // Dezprox-style styling:
  const cBaseLight = useMemo(() => new Color('#f8fafc'), []); 
  const cRippleLight = useMemo(() => new Color('#94a3b8'), []); // Silver/slate ripple
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); // Deep black
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); // Gold accent!

  const states = useMemo(() => Array.from({ length: count }, () => ({
    pY: 0, tpY: 0,
    colorVal: 0
  })), [count]);

  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.position.set(
          (i % GRID_SIZE - GRID_SIZE / 2) * SPACING,
          0,
          (Math.floor(i / GRID_SIZE) - GRID_SIZE / 2) * SPACING
        );
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, isNight ? cBaseNight : cBaseLight);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [isNight, count, cBaseNight, cBaseLight]);

  useFrame((state) => {
    const { clock } = state;
    const time = clock.getElapsedTime();

    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    // Camera follow (NO ROTATION per user request)
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.current.x * 2, 0.05);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, 20 + mouse.current.y * 2, 0.05);
    state.camera.lookAt(0, -2, 0);

    let needsUpdate = false;

    // Convert mouse screen to world pos roughly
    const mx = mouse.current.x * 25;
    const mz = -mouse.current.y * 25;

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_SIZE - GRID_SIZE / 2) * SPACING;
      const iz = (Math.floor(i / GRID_SIZE) - GRID_SIZE / 2) * SPACING;
      
      const dx = ix - mx;
      const dz = iz - mz;
      const dist = Math.sqrt(dx * dx + dz * dz);

      // Ripple interaction
      const ripple = Math.max(0, 1 - dist / 8);
      
      states[i].tpY = -ripple * 1.5;
      states[i].pY = MathUtils.lerp(states[i].pY, states[i].tpY, 0.1);
      
      dummy.position.set(ix, states[i].pY, iz);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      if (meshRef.current.instanceColor) {
        // Softly mix colors
        const mix = ripple;
        if (isNight) {
          tempColor.copy(cBaseNight).lerp(cRippleNight, mix);
        } else {
          tempColor.copy(cBaseLight).lerp(cRippleLight, mix);
        }
        meshRef.current.setColorAt(i, tempColor);
      }
      needsUpdate = true;
    }

    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.8]} />
      <meshStandardMaterial 
        roughness={1} // Very diffuse, flat lighting look
        metalness={0.1}
      />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(false);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityBg = useTransform(scrollY, [0, 600], [1, 0.1]);

  useEffect(() => {
    const checkTheme = () => {
      setIsNight(document.body.classList.contains('night'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      className="hero-bg-container"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        y: yBg,
        opacity: opacityBg,
        pointerEvents: 'none',
        background: isNight ? '#020617' : '#f8fafc',
        transition: 'background 0.5s ease'
      }}
    >
      <Canvas
        camera={{ position: [0, 8, 20], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isNight ? 2 : 2.5} />
        <directionalLight position={[10, 20, 10]} intensity={isNight ? 1 : 1.5} color={isNight ? '#ffffff' : '#ffffff'} />
        
        <Cubes isNight={isNight} />
      </Canvas>

      <div style={{
        position: 'absolute', inset: 0,
        background: isNight 
          ? 'linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.8) 70%, #020617 100%)'
          : 'linear-gradient(to bottom, rgba(248,250,252,0) 0%, rgba(248,250,252,0.8) 70%, #f8fafc 100%)',
        zIndex: 2, pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
