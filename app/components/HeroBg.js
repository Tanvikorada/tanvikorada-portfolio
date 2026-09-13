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
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); // pure white
  const cRippleLight = useMemo(() => new Color('#c084fc'), []); // glowing lavender
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); // pure black
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
    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      const dist = Math.hypot(mx - ix, my - iy);

      if (dist < 6.0 && mouseSpeed > 0.001) {
        // push tiles inward
        states[i].vZ -= 0.15 * (1 - dist / 6.0);
      }
    }

    // 2. 2D Wave Propagation (Neighbors pull each other)
    const newTargetZ = new Float32Array(count);
    const waveSpread = 0.25; 
    
    for (let i = 0; i < count; i++) {
      let sum = 0;
      let numNeighbors = 0;
      
      const x = i % GRID_W;
      const y = Math.floor(i / GRID_W);

      if (x > 0) { sum += states[i - 1].pZ; numNeighbors++; }
      if (x < GRID_W - 1) { sum += states[i + 1].pZ; numNeighbors++; }
      if (y > 0) { sum += states[i - GRID_W].pZ; numNeighbors++; }
      if (y < GRID_H - 1) { sum += states[i + GRID_W].pZ; numNeighbors++; }

      const avg = sum / numNeighbors;
      newTargetZ[i] = states[i].pZ + (avg - states[i].pZ) * waveSpread;
    }

    const tension = 0.02; // spring back to 0
    const damping = 0.95; // more frictionless liquid flow

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;

      const pull = newTargetZ[i] - states[i].pZ;
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
        
        // Tilt the cubes based on the wave to create a 3D catching-light effect
        dummy.rotation.x = states[i].pZ * 0.1;
        dummy.rotation.y = states[i].pZ * 0.05;
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Fluid color mapping that travels with the wave
        const pressDepth = Math.abs(states[i].pZ);
        // The further it sinks, the brighter the color glow!
        const intensity = Math.max(0, Math.min(1, pressDepth * 0.8));
        
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
      {/* 3D Depth added here (12.0)! Instead of paper-thin squares (0.1), they are now thick 3D columns! */}
      <boxGeometry args={[CUBE_SIZE * 0.99, CUBE_SIZE * 0.99, 4.0]} />
      {/* High smoothness so when they tilt in the ripple, they catch the light fluidly */}
      <meshStandardMaterial roughness={0.15} metalness={0.2} />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(true);
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.5]);

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
        style={{ width: '100vw', height: '100vh', background: isNight ? '#000000' : '#ffffff', transition: 'background 0.5s ease' }}
      >
        <color attach="background" args={[isNight ? '#000000' : '#ffffff']} />
        
        <ambientLight intensity={isNight ? 0.7 : 1.2} />
        <directionalLight position={[10, -10, 20]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-10, 10, 15]} intensity={isNight ? 0.4 : 0.6} color={isNight ? '#fbbf24' : '#c084fc'} />
        
        <Cubes isNight={isNight} />
      </Canvas>
      
      <motion.div 
        style={{
          position: 'absolute', inset: 0,
          background: isNight ? '#000000' : '#ffffff',
          opacity: overlayOpacity
        }}
      />
    </div>
  );
}



