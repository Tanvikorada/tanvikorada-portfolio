'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Higher resolution grid for liquid smoothness
const GRID_W = 46; 
const GRID_H = 28;
const SPACING = 2.4;
const CUBE_SIZE = 2.4; // Zero gap.

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); // Pure white
  const cRippleLight = useMemo(() => new Color('#a855f7'), []); // Glowing lavender
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); // Pure black
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); // Fluid gold

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
        dummy.rotation.set(0, 0, 0);
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
    // Smoother mouse tracking for liquid feel
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);
    
    const mouseSpeed = Math.hypot(mouse.current.x - prevMouse.current.x, mouse.current.y - prevMouse.current.y);

    let needsUpdate = false;

    // 1. Mouse Disturbance (Wider, softer splash = liquid feel)
    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      const dist = Math.hypot(mx - ix, my - iy);

      if (dist < 12.0 && mouseSpeed > 0.001) {
        // Soft gradient push
        states[i].vZ -= 0.06 * (1 - dist / 12.0);
      }
    }

    // 2. 2D Wave Propagation (Faster spread for liquid fluidity)
    const newTargetZ = new Float32Array(count);
    const waveSpread = 0.38; 
    
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

    // Heavy liquid physics
    const tension = 0.015; // Slow spring back
    const damping = 0.975; // Ultra low friction, ripples roll beautifully

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
        
        const renderZ = Math.max(-3.0, Math.min(3.0, states[i].pZ));

        dummy.position.set(ix, iy, renderZ);
        
        // Tilt dynamic to wave gradient! This gives the true 3D liquid faceted look
        dummy.rotation.x = states[i].pZ * 0.12;
        dummy.rotation.y = states[i].pZ * 0.12;
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Fluid color mapping
        const pressDepth = Math.abs(states[i].pZ);
        const intensity = Math.max(0, Math.min(1, pressDepth * 0.7));
        
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
    <>
      <instancedMesh ref={meshRef} args={[null, null, count]} position={[0, 0, 1]}>
        {/* Deep columns so you see the 3D sides when they ripple */}
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 8.0]} />
        <meshStandardMaterial roughness={0.1} metalness={0.1} />
      </instancedMesh>
      
      {/* 
        THE SECRET TO ZERO WHITE LINES:
        A massive backplate right behind the cubes with the EXACT same material and color.
        If a gap opens, it just reveals the identical lit background, making the grid 100% invisible at rest!
      */}
      <mesh position={[0, 0, -3.5]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={isNight ? '#000000' : '#ffffff'} roughness={0.1} metalness={0.1} />
      </mesh>
    </>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(true);
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.4]);

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
        gl={{ alpha: false, antialias: true }} // alpha false because we have the backplate
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 80], fov: 20 }} 
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={isNight ? 0.8 : 1.4} />
        {/* Soft, beautiful studio lighting */}
        <directionalLight position={[20, -20, 30]} intensity={isNight ? 1.0 : 1.2} color="#ffffff" />
        <directionalLight position={[-20, 20, 20]} intensity={isNight ? 0.3 : 0.4} color={isNight ? '#fbbf24' : '#a855f7'} />
        
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
