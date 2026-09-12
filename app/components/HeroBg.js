'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const GRID_W = 40; 
const GRID_H = 24;
const SPACING = 2.0;
const CUBE_SIZE = 2.0; // Flush edges, no gaps!

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  // Dezprox-style subtle colors
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); // Pure white cubes
  const cRippleLight = useMemo(() => new Color('#e2e8f0'), []); 
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); // Deep black
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); // Gold accent
  
  // Create static noise map for Dezprox "blocky wall" look
  const states = useMemo(() => Array.from({ length: count }, () => {
    // Random base displacement. Cubes are perfectly flush, so Z displacement creates the "grid lines" via shadows
    const baseZ = (Math.random() - 0.5) * 1.2;
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

    // Extremely subtle parallax so it feels like a solid wall, not a floating room
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.current.x * 0.5, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, mouse.current.y * 0.5, 0.05);
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
      const ripple = Math.max(0, 1 - dist / 8);
      
      states[i].tpZ = states[i].baseZ + ripple * 2.0;
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
      {/* Box geometry with slight beveling/segments to catch light softer */}
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      {/* 
        Roughness 0.9 and Metalness 0.0 gives that chalky/matte Dezprox finish.
      */}
      <meshStandardMaterial 
        roughness={0.9} 
        metalness={0.0}
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
        background: isNight ? '#020617' : '#ffffff',
        transition: 'background 0.5s ease'
      }}
    >
      <Canvas
        // Narrow FOV (15) and placed far back (z=75) creates the nearly-orthographic flat wall look
        camera={{ position: [0, 0, 75], fov: 15 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft ambient lighting */}
        <ambientLight intensity={isNight ? 0.8 : 2.5} />
        {/* Top-left directional light casts the subtle bottom-right shadows on the displaced cubes */}
        <directionalLight position={[-20, 20, 30]} intensity={isNight ? 0.5 : 1.2} color="#ffffff" castShadow />
        
        <Cubes isNight={isNight} />
      </Canvas>

      <div style={{
        position: 'absolute', inset: 0,
        background: isNight 
          ? 'linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.9) 70%, #020617 100%)'
          : 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, #ffffff 100%)',
        zIndex: 2, pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
