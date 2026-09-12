'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const GRID_W = 50; 
const GRID_H = 30;
const SPACING = 1.0;
const CUBE_SIZE = 0.98; // Creates the thin border lines between cubes

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  // Dezprox-style subtle colors
  const cBaseLight = useMemo(() => new Color('#f8fafc'), []); 
  const cRippleLight = useMemo(() => new Color('#e2e8f0'), []); 
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); // Deep black
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); // Gold accent
  
  // Create static noise map for Dezprox "blocky wall" look
  const states = useMemo(() => Array.from({ length: count }, () => {
    // Random base displacement between -0.3 and +0.3
    const baseZ = (Math.random() - 0.5) * 0.6;
    return { 
      baseZ, 
      pZ: baseZ, 
      tpZ: baseZ 
    };
  }), [count]);

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
        const ix = (i % GRID_W - GRID_W / 2) * SPACING;
        const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
        dummy.position.set(ix, iy, states[i].baseZ);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, isNight ? cBaseNight : cBaseLight);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [isNight, count, cBaseNight, cBaseLight, states, dummy]);

  useFrame((state) => {
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    // Subtle parallax on the whole wall, matching Dezprox style
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.current.x * 2, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, mouse.current.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);

    let needsUpdate = false;

    // Scale mouse to world bounds for interaction
    const mx = mouse.current.x * (GRID_W * SPACING) * 0.5;
    const my = mouse.current.y * (GRID_H * SPACING) * 0.5;

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      
      const dx = ix - mx;
      const dy = iy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Ripple interaction pushing cubes outward (Z-axis)
      const ripple = Math.max(0, 1 - dist / 6);
      
      states[i].tpZ = states[i].baseZ + ripple * 1.5;
      states[i].pZ = MathUtils.lerp(states[i].pZ, states[i].tpZ, 0.1);
      
      dummy.position.set(ix, iy, states[i].pZ);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      if (meshRef.current.instanceColor) {
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
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      {/* 
        Roughness 0.8 and Metalness 0.1 gives that beautiful matte Dezprox finish.
        The random Z displacement will catch the directional light and create the "grid blocks" look.
      */}
      <meshStandardMaterial 
        roughness={0.8} 
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
        camera={{ position: [0, 0, 18], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isNight ? 1.0 : 2.5} />
        {/* Angled light to cast subtle shadows on the randomly displaced blocks */}
        <directionalLight position={[-10, 20, 15]} intensity={isNight ? 0.5 : 1.5} color="#ffffff" />
        <directionalLight position={[10, -10, 10]} intensity={isNight ? 0.2 : 0.5} color="#ffffff" />
        
        <Cubes isNight={isNight} />
      </Canvas>

      <div style={{
        position: 'absolute', inset: 0,
        background: isNight 
          ? 'linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.9) 70%, #020617 100%)'
          : 'linear-gradient(to bottom, rgba(248,250,252,0) 0%, rgba(248,250,252,0.9) 70%, #f8fafc 100%)',
        zIndex: 2, pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
