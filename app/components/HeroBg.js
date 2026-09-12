'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const GRID_W = 40; 
const GRID_H = 24;
const SPACING = 2.0;
const CUBE_SIZE = 2.0; 

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); 
  const cRippleLight = useMemo(() => new Color('#38bdf8'), []); 
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const states = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      
      const distFromCenter = Math.hypot(ix, iy);
      const baseZ = Math.sin(distFromCenter * 0.2) * 1.5 - distFromCenter * 0.1;
      
      s.push({
        baseZ,
        pZ: baseZ,
        vZ: 0
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
        dummy.position.set(ix, iy, states[i].baseZ);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        
        tempColor.copy(isNight ? cBaseNight : cBaseLight);
        meshRef.current.setColorAt(i, tempColor);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [isNight, count, cBaseNight, cBaseLight, dummy, tempColor, states]);

  useFrame((state) => {
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.current.x * 0.5, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, mouse.current.y * 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);

    let needsUpdate = false;

    const mx = mouse.current.x * (state.viewport.width / 2);
    const my = mouse.current.y * (state.viewport.height / 2);

    const tension = 0.04;
    const damping = 0.85;

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      
      const dx = ix - mx;
      const dy = iy - my;
      const dist = Math.hypot(dx, dy);

      if (dist < 10) {
        const force = (1 - dist / 10) * 0.6;
        states[i].vZ -= force;
      }

      const displacement = states[i].pZ - states[i].baseZ;
      
      // OPTIMIZATION: Only process blocks that are actively moving or displaced!
      if (Math.abs(states[i].vZ) > 0.001 || Math.abs(displacement) > 0.001) {
        needsUpdate = true;
        
        states[i].vZ -= displacement * tension;
        states[i].vZ *= damping;
        states[i].pZ += states[i].vZ;

        dummy.position.set(ix, iy, states[i].pZ);
        const stretch = Math.max(0.1, 1 + (states[i].pZ - states[i].baseZ) * 0.2);
        dummy.scale.set(1, 1, stretch);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        const pressDepth = states[i].baseZ - states[i].pZ;
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
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial roughness={0.8} metalness={0.2} />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // OPTIMIZATION: Replaced expensive CSS blur with a highly performant hardware-accelerated opacity overlay.
  // Blurring a massive live WebGL canvas causes extreme lag on older laptops.
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
        camera={{ position: [0, 0, 75], fov: 15 }} 
        gl={{ alpha: false, antialias: false }} // alpha: false is faster!
        dpr={1} // Lock pixel ratio to 1 for immense performance gain on high-res low-end laptops
        style={{ background: isNight ? '#020617' : '#ffffff', transition: 'background 0.5s ease' }}
      >
        <ambientLight intensity={isNight ? 0.4 : 1.2} />
        <directionalLight position={[10, 20, 15]} intensity={isNight ? 1.5 : 2.0} color="#ffffff" />
        <directionalLight position={[-10, -10, 15]} intensity={isNight ? 0.5 : 0.8} color={isNight ? '#fbbf24' : '#38bdf8'} />
        <Cubes isNight={isNight} />
      </Canvas>
      
      {/* High-performance fade overlay replaces the expensive blur */}
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
