'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Expanded grid for higher resolution ripples
const GRID_W = 34; 
const GRID_H = 20;
const SPACING = 3.0;
const CUBE_SIZE = 3.0; // ZERO GAP! Forms a perfectly seamless wall at rest.

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#f8fafc'), []); 
  const cRippleLight = useMemo(() => new Color('#6ee7b7'), []); // vibrant watery green
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); // fluid gold

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });

  const states = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      s.push({
        baseZ: 0,
        pZ: 0,
        vZ: 0,
        targetZ: 0
      });
    }
    return s;
  }, [count]);

  useEffect(() => {
    const handleMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const ix = (i % GRID_W - GRID_W / 2) * SPACING;
        const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
        dummy.position.set(ix, iy, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        
        tempColor.copy(isNight ? cBaseNight : cBaseLight);
        meshRef.current.setColorAt(i, tempColor);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [isNight, count, cBaseNight, cBaseLight, dummy, tempColor]);

  useFrame(() => {
    prevMouse.current.x = mouse.current.x;
    prevMouse.current.y = mouse.current.y;
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.2);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.2);

    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);
    
    const mouseSpeed = Math.hypot(mouse.current.x - prevMouse.current.x, mouse.current.y - prevMouse.current.y);

    let needsUpdate = false;

    // 1. Mouse Disturbance (Drop a stone in the water)
    // Only disturb significantly if moving
    if (mouseSpeed > 0.001) {
      for (let i = 0; i < count; i++) {
        const ix = (i % GRID_W - GRID_W / 2) * SPACING;
        const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
        const dx = ix - mx;
        const dy = iy - my;
        const dist = Math.hypot(dx, dy);

        if (dist < 6.0) {
          // Push down the tiles right under the cursor
          states[i].vZ -= (1 - dist / 6.0) * 0.15;
        }
      }
    }

    // 2. Compute Wave Propagation (Neighbor Pull)
    for (let i = 0; i < count; i++) {
      let x = i % GRID_W;
      let y = Math.floor(i / GRID_W);
      let sum = 0;
      let neighbors = 0;
      
      if (x > 0) { sum += states[i - 1].pZ; neighbors++; }
      if (x < GRID_W - 1) { sum += states[i + 1].pZ; neighbors++; }
      if (y > 0) { sum += states[i - GRID_W].pZ; neighbors++; }
      if (y < GRID_H - 1) { sum += states[i + GRID_W].pZ; neighbors++; }
      
      states[i].targetZ = sum / neighbors;
    }

    // 3. Apply Wave Physics
    const waveSpread = 0.22; // Speed the wave travels to neighbors
    const tension = 0.015;    // Elasticity (low = fluid, high = rigid)
    const damping = 0.94;    // How long the ripples bounce around

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      
      // Pull towards average of neighbors (this makes the wave travel!)
      const pull = (states[i].targetZ - states[i].pZ) * waveSpread;
      // Spring back to base 0
      const spring = (0 - states[i].pZ) * tension;
      
      states[i].vZ += pull + spring;
      states[i].vZ *= damping;
      states[i].pZ += states[i].vZ;

      // Only update Three.js matrices if the tile is actively rippling
      if (Math.abs(states[i].vZ) > 0.001 || Math.abs(states[i].pZ) > 0.001) {
        needsUpdate = true;
        
        // Depth limit so it doesn't break
        const renderZ = Math.max(-2.5, Math.min(2.5, states[i].pZ));

        dummy.position.set(ix, iy, renderZ);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Fluid color mapping that travels with the wave
        const pressDepth = Math.abs(states[i].pZ);
        // The further it sinks, the brighter the color glow!
        const intensity = Math.max(0, Math.min(1, pressDepth * 1.2));
        
        const base = isNight ? cBaseNight : cBaseLight;
        const ripple = isNight ? cRippleNight : cRippleLight;
        tempColor.copy(base).lerp(ripple, intensity);
        meshRef.current.setColorAt(i, tempColor);
      }
    }
    
    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.1]} />
      {/* High smoothness so when they tilt in the ripple, they catch the light fluidly */}
      <meshStandardMaterial roughness={0.15} metalness={0.2} />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(true);
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.85, 0.85, 0]);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        gl={{ alpha: true, antialias: true }} 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 120], fov: 15 }} 
        style={{ width: '100vw', height: '100vh', background: isNight ? '#020617' : '#ffffff', transition: 'background 0.5s ease' }}
      >
        <color attach="background" args={[isNight ? '#020617' : '#ffffff']} />
        
        <ambientLight intensity={isNight ? 0.7 : 1.2} />
        <directionalLight position={[10, -10, 20]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-10, 10, 15]} intensity={isNight ? 0.4 : 0.6} color={isNight ? '#fbbf24' : '#6ee7b7'} />
        
        <Cubes isNight={isNight} />
      </Canvas>
      
      <motion.div 
        style={{
          position: 'absolute', inset: 0,
          background: isNight ? '#020617' : '#ffffff',
          opacity: overlayOpacity
        }}
      />
    </div>
  );
}
