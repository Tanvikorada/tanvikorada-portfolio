'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const GRID_W = 46; 
const GRID_H = 30;
const SPACING = 2.5;
const CUBE_SIZE = 2.48; 

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); 
  const cRippleLight = useMemo(() => new Color('#a855f7'), []); 
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });

  const states = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      s.push({ pZ: 0, vZ: 0 });
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

  useFrame((state) => {
    prevMouse.current.x = mouse.current.x;
    prevMouse.current.y = mouse.current.y;
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.2);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.2);

    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);
    
    // Increased sensitivity to mouse speed
    const mouseSpeed = Math.hypot(mouse.current.x - prevMouse.current.x, mouse.current.y - prevMouse.current.y);

    const c2 = 0.15; 
    const anchor = 0.04; 
    const damping = 0.96; // slightly more friction so waves don't chaotic bounce

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

      const ix = (x - GRID_W / 2) * SPACING;
      const iy = (y - GRID_H / 2) * SPACING;
      const dist = Math.hypot(mx - ix, my - iy);

      // Much more responsive mouse splash!
      if (dist < 10.0 && mouseSpeed > 0.001) {
        acc -= (mouseSpeed * 1.5 + 0.05) * (1 - dist / 10.0);
      }

      nextVZ[i] = (states[i].vZ + acc) * damping;
    }

    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      states[i].vZ = nextVZ[i];
      states[i].pZ += states[i].vZ;
      
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;

      // Ambient rolling liquid motion (Dezprox style watery layer)
      // This ensures the grid is ALWAYS alive and moving beautifully
      const ambientZ = Math.sin(ix * 0.1 + t * 1.2) * Math.cos(iy * 0.1 + t * 0.8) * 0.75;
      
      const combinedZ = states[i].pZ + ambientZ;
      const renderZ = Math.max(-10.0, Math.min(10.0, combinedZ));

      dummy.position.set(ix, iy, renderZ);
      dummy.rotation.set(0, 0, 0); // No tilt, keep deep 3D skyscraper look
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Glow intensity based on how far it is from rest
      const pressDepth = Math.abs(combinedZ);
      const intensity = Math.max(0, Math.min(1, pressDepth * 0.5));
      
      const base = isNight ? cBaseNight : cBaseLight;
      const ripple = isNight ? cRippleNight : cRippleLight;
      tempColor.copy(base).lerp(ripple, intensity);
      meshRef.current.setColorAt(i, tempColor);
    }
    
    // Always update to show the ambient fluid motion!
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 12.0]} />
        <meshStandardMaterial roughness={0.2} metalness={0.1} />
      </instancedMesh>
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
