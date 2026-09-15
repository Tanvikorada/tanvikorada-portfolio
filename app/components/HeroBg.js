'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Meteors from './ui/Meteors';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const GRID_W = 28; 
const GRID_H = 18;
const SPACING = 3.8; 
const CUBE_SIZE = 3.8; 

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); 
  const cRippleLight = useMemo(() => new Color('#d8b4fe'), []); 
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); 
  const cRippleNight = useMemo(() => new Color('#10b981'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  
  const ripples = useRef([]);
  const lastRipplePos = useRef({ x: 0, y: 0 });
  const lastRippleTime = useRef(0);

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

  useFrame((state, delta) => { 
    // Always run background effect
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.2);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.2);

    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);
    
    const t = state.clock.elapsedTime;
    const distMoved = Math.hypot(mx - lastRipplePos.current.x, my - lastRipplePos.current.y);
    
    if (distMoved > 2.0 && t - lastRippleTime.current > 0.12) {
      ripples.current.push({ x: mx, y: my, time: 0, strength: 1.0 });
      lastRipplePos.current.x = mx;
      lastRipplePos.current.y = my;
      lastRippleTime.current = t;
      if (ripples.current.length > 5) ripples.current.shift();
    }

    const dt = Math.min(delta, 0.05); 
    for (let r = 0; r < ripples.current.length; r++) {
      ripples.current[r].time += dt * 24.0; 
      ripples.current[r].strength *= 0.96; 
    }

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;

      let z = 0; 
      for (let r = 0; r < ripples.current.length; r++) {
        const rip = ripples.current[r];
        const d = Math.hypot(ix - rip.x, iy - rip.y);
        const ringDist = Math.abs(d - rip.time);
        
        if (ringDist < 10.0) { 
          const wave = Math.exp(-(ringDist * ringDist) / 12.0);
          z += wave * rip.strength * 1.5;
        }
      }

      dummy.position.set(ix, iy, z);
      dummy.rotation.set(0, 0, 0); 
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const intensity = Math.max(0, Math.min(1, z * 0.5));
      const base = isNight ? cBaseNight : cBaseLight;
      const ripple = isNight ? cRippleNight : cRippleLight;
      tempColor.copy(base).lerp(ripple, intensity);
      meshRef.current.setColorAt(i, tempColor);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 8.0]} />
        <meshStandardMaterial roughness={0.2} metalness={0.1} />
      </instancedMesh>
      <mesh position={[0, 0, -4.0]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={isNight ? '#000000' : '#ffffff'} roughness={0.2} metalness={0.1} />
      </mesh>
    </>
  );
}


function InteractiveSpace({ scrollYProgress }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  
  // Shooting stars
  const shootingStars = useMemo(() => {
    return Array.from({ length: 12 }).map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300,
      z: (Math.random() - 0.5) * 200 - 100,
      length: Math.random() * 30 + 15,
      speed: Math.random() * 6 + 4,
      active: false,
      wait: Math.random() * 200
    }));
  }, []);
  
  const shootingStarRef = useRef();
  const linesMat = useMemo(() => new THREE.LineBasicMaterial({ 
    color: new THREE.Color('#c084fc'), 
    transparent: true, 
    opacity: 0.8,
    blending: THREE.AdditiveBlending 
  }), []);

  // Nebula/Galaxy Stardust (points)
  const stardustCount = 6000;
  const [stardustPositions, stardustColors] = useMemo(() => {
    const positions = new Float32Array(stardustCount * 3);
    const colors = new Float32Array(stardustCount * 3);
    const colorInside = new THREE.Color('#c084fc');
    const colorOutside = new THREE.Color('#38bdf8');
    
    for (let i = 0; i < stardustCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 1.3) * 200;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * (40 - radius * 0.1);
      const z = Math.sin(angle) * radius;
      
      positions[i*3] = x;
      positions[i*3+1] = y;
      positions[i*3+2] = z;
      
      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 200);
      colors[i*3] = mixedColor.r;
      colors[i*3+1] = mixedColor.g;
      colors[i*3+2] = mixedColor.b;
    }
    return [positions, colors];
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state, delta) => {
    // Parallax
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.05);
    
    if (groupRef.current) {
      groupRef.current.rotation.x = mouse.current.y * 0.1;
      groupRef.current.rotation.y = mouse.current.x * 0.15;
      groupRef.current.rotation.z -= delta * 0.02; // Slow galactic spin
      
      // Fly forward on scroll!
      const scroll = scrollYProgress ? scrollYProgress.get() : 0;
      groupRef.current.position.z = scroll * 150; // Fly through stars
    }
    
    // Update shooting stars
    const positions = [];
    shootingStars.forEach(star => {
      if (!star.active) {
        star.wait--;
        if (star.wait <= 0) {
          star.active = true;
          star.x = (Math.random() - 0.5) * 400 + 200; // start from right
          star.y = (Math.random() - 0.5) * 300 + 150; // top right
          star.z = (Math.random() - 0.5) * 200 - 100;
          star.speed = Math.random() * 5 + 4;
          star.wait = Math.random() * 200 + 50;
        }
      } else {
        star.x -= star.speed;
        star.y -= star.speed * 0.6;
        if (star.x < -300 || star.y < -200) {
          star.active = false;
        } else {
          positions.push(
            star.x, star.y, star.z,
            star.x + star.length, star.y + star.length * 0.6, star.z
          );
        }
      }
    });
    
    if (shootingStarRef.current) {
      const posArray = new Float32Array(positions);
      shootingStarRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    }
  });

  return (
    <group ref={groupRef}>
        {/* Layer 1: Distant dense background stars */}
        <Stars radius={100} depth={150} count={5000} factor={4} saturation={0.5} fade speed={1} />
        {/* Layer 2: Medium purple-tinted stars */}
        <Stars radius={80} depth={100} count={2000} factor={6} saturation={1} color="#c084fc" fade speed={1.5} />
        {/* Layer 3: Close large bright stars */}
        <Stars radius={50} depth={50} count={500} factor={8} saturation={1} color="#38bdf8" fade speed={2} />
        
        {/* Shooting stars */}
        <lineSegments ref={shootingStarRef} material={linesMat}>
          <bufferGeometry />
        </lineSegments>
      </group>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(true);
  const { scrollYProgress } = useScroll();
  
  const dimOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.75]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.2], ['blur(0px)', 'blur(10px)']);

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
      {isNight && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#030014', zIndex: -2 }} />
        )}
        {isNight && (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            style={{ position: 'absolute', top: '-30vh', left: 0, width: '100%', height: '130vh', objectFit: 'cover', zIndex: -1, transform: 'rotate(180deg)', opacity: 0.9 }}
          >
            <source src="/videos/blackhole.webm" type="video/webm" />
          </video>
        )}
        <Canvas gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]} camera={{ position: [0, 0, 55], fov: 42 }} style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={isNight ? 0.7 : 2.5} />
        <directionalLight position={[15, -20, 30]} intensity={isNight ? 1.0 : 0.8} color="#ffffff" />
        <directionalLight position={[-15, 20, 20]} intensity={isNight ? 0.4 : 0.4} color={isNight ? '#fcd34d' : '#f3e8ff'} />
        
        {isNight ? <InteractiveSpace scrollYProgress={scrollYProgress} /> : <Cubes isNight={false} />}
      </Canvas>

      <motion.div 
        style={{
          position: 'absolute', inset: 0,
          backgroundColor: isNight ? '#000000' : '#ffffff',
          opacity: dimOpacity,
          backdropFilter: bgBlur,
          WebkitBackdropFilter: bgBlur,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 2 }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '80vw', height: '80vw',
          background: isNight ? 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)' : 'radial-gradient(circle, rgba(216, 180, 254, 0.35) 0%, transparent 60%)',
          filter: 'blur(90px)',
          animation: 'floatOrb 20s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '70vw', height: '70vw',
          background: isNight ? 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 60%)' : 'radial-gradient(circle, rgba(192, 132, 252, 0.25) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'floatOrb 15s ease-in-out infinite alternate-reverse',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '30%', transform: 'translateX(-50%)',
          width: '100vw', height: '60vw',
          background: isNight ? 'radial-gradient(ellipse, rgba(192, 132, 252, 0.05) 0%, transparent 50%)' : 'radial-gradient(ellipse, rgba(233, 213, 255, 0.7) 0%, transparent 50%)',
          filter: 'blur(120px)',
          animation: 'floatOrb 25s linear infinite alternate',
        }} />
      </div>
      <style>{`
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.05); }
          100% { transform: translate(-30px, 40px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}

