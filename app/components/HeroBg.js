'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Perfectly flush grid
const GRID_W = 44; 
const GRID_H = 26;
const SPACING = 4.0;
const CUBE_SIZE = 3.95; // 0.05 gap for perfectly precise grid lines

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#f8fafc'), []); 
  const cRippleLight = useMemo(() => new Color('#dcfce7'), []); 
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const states = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      s.push({
        baseZ: 0, // PERFECTLY FLAT AT REST
        pZ: 0,
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

  useFrame((state) => {
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    // FIXED CAMERA. No parallax. Perfectly head-on flush view.
    state.camera.position.set(0, 0, 100);
    state.camera.lookAt(0, 0, 0);

    let needsUpdate = false;

    // Convert mouse to world coordinates perfectly based on visible area
    // The screen maps perfectly because the camera never moves.
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

      // Very subtle ripple radius
      if (dist < 10) {
        // Tiny push! Just enough to catch the light, NOT break the wall.
        const force = (1 - dist / 10) * 0.15; 
        states[i].vZ -= force;
      }

      const displacement = states[i].pZ - states[i].baseZ;
      
      if (Math.abs(states[i].vZ) > 0.001 || Math.abs(displacement) > 0.001) {
        needsUpdate = true;
        
        states[i].vZ -= displacement * tension;
        states[i].vZ *= damping;
        states[i].pZ += states[i].vZ;

        dummy.position.set(ix, iy, states[i].pZ);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Color mapping focuses heavily on the ripple highlight rather than extreme depth
        const pressDepth = Math.abs(states[i].pZ);
        const intensity = Math.max(0, Math.min(1, pressDepth * 1.5));
        
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
      {/* 0.1 depth! They are Flat Tiles, not massive deep boxes! */}
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.1]} />
      <meshStandardMaterial roughness={0.3} metalness={0.1} />
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
        gl={{ alpha: false, antialias: true }} 
        dpr={[1, 1.5]} 
        style={{ background: isNight ? '#020617' : '#ffffff', transition: 'background 0.5s ease' }}
      >
        <orthographicCamera makeDefault position={[0, 0, 100]} zoom={20} />
        
        <ambientLight intensity={isNight ? 0.7 : 1.2} />
        {/* Lights designed to perfectly cast a tiny shadow on the top-left edge, making them look 3D despite being flat tiles */}
        <directionalLight position={[10, -10, 20]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-10, 10, 15]} intensity={isNight ? 0.4 : 0.6} color={isNight ? '#fbbf24' : '#dcfce7'} />
        
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
