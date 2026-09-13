'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// High-resolution grid
const GRID_W = 46; 
const GRID_H = 30;
const SPACING = 2.5;
const CUBE_SIZE = 2.48; // Microscopic gap for that premium structural look

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); 
  const cRippleLight = useMemo(() => new Color('#a855f7'), []); // Lavender
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); // Gold

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });

  const states = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      s.push({
        pZ: 0,
        vZ: 0,
      });
    }
    return s;
  }, [count]);

  const nextVZ = useMemo(() => new Float32Array(count), [count]);

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
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.15);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.15);

    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);
    
    const mouseSpeed = Math.hypot(mouse.current.x - prevMouse.current.x, mouse.current.y - prevMouse.current.y);

    let needsUpdate = false;

    // LOOP 1: Exact 2D Laplacian Wave Equation (Guarantees true ringing water ripples)
    const c2 = 0.15; // Wave propagation speed
    const anchor = 0.04; // Tension to return to 0
    const damping = 0.97; // Liquid friction (0.97 allows beautiful ringing oscillation)

    for (let i = 0; i < count; i++) {
      let sum = 0;
      let numNeighbors = 0;
      
      const x = i % GRID_W;
      const y = Math.floor(i / GRID_W);

      if (x > 0) { sum += states[i - 1].pZ; numNeighbors++; }
      if (x < GRID_W - 1) { sum += states[i + 1].pZ; numNeighbors++; }
      if (y > 0) { sum += states[i - GRID_W].pZ; numNeighbors++; }
      if (y < GRID_H - 1) { sum += states[i + GRID_W].pZ; numNeighbors++; }

      const laplacian = sum - (numNeighbors * states[i].pZ);
      let acc = (laplacian * c2) - (states[i].pZ * anchor);

      // Mouse Splash
      const ix = (x - GRID_W / 2) * SPACING;
      const iy = (y - GRID_H / 2) * SPACING;
      const dist = Math.hypot(mx - ix, my - iy);

      if (dist < 8.0 && mouseSpeed > 0.005) {
        // Direct downward acceleration to create a deep splash that rebounds high!
        acc -= Math.min(mouseSpeed * 0.25, 0.2) * (1 - dist / 8.0);
      }

      nextVZ[i] = (states[i].vZ + acc) * damping;
    }

    // LOOP 2: Apply velocities and render
    for (let i = 0; i < count; i++) {
      states[i].vZ = nextVZ[i];
      states[i].pZ += states[i].vZ;

      // Only update Three.js matrices if the tile is actively rippling
      if (Math.abs(states[i].vZ) > 0.001 || Math.abs(states[i].pZ) > 0.001) {
        needsUpdate = true;
        
        const ix = (i % GRID_W - GRID_W / 2) * SPACING;
        const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;

        // Strict clamp to prevent exploding physics
        const renderZ = Math.max(-10.0, Math.min(10.0, states[i].pZ));

        // Z-Movement ONLY. No tilting! Perspective camera handles the 3D depth.
        dummy.position.set(ix, iy, renderZ);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Fluid color mapping (glows when high or low)
        const pressDepth = Math.abs(states[i].pZ);
        const intensity = Math.max(0, Math.min(1, pressDepth * 0.4));
        
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
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        {/* Massive 12.0 depth so they look like deep skyscrapers when the wave lifts them! */}
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 12.0]} />
        <meshStandardMaterial roughness={0.2} metalness={0.1} />
      </instancedMesh>
      
      {/* Backplate to mask gaps at rest */}
      <mesh position={[0, 0, -6.0]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={isNight ? '#000000' : '#ffffff'} roughness={0.2} metalness={0.1} />
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
        gl={{ alpha: false, antialias: true }} 
        dpr={[1, 1.5]} 
        // A wider FOV (45) naturally reveals the deep 3D sides of the blocks due to perspective! Exactly like Dezprox!
        camera={{ position: [0, 0, 45], fov: 45 }} 
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={isNight ? 0.7 : 1.3} />
        <directionalLight position={[20, -20, 30]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-20, 20, 20]} intensity={isNight ? 0.4 : 0.5} color={isNight ? '#fbbf24' : '#a855f7'} />
        
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
