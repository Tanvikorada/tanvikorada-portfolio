'use client';
import { motion, useTransform } from 'framer-motion';

export default function HolographicBuilding({ progress }) {
  // We use Framer Motion useTransform to map scroll progress to SVG path length and opacity.
  
  // Phase 1: School (Progress 0 -> 0.3)
  const schoolOpacity = useTransform(progress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const schoolPath = useTransform(progress, [0, 0.2], [0, 1]);

  // Phase 2: College (Progress 0.35 -> 0.65)
  const collegeOpacity = useTransform(progress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const collegePath = useTransform(progress, [0.35, 0.5], [0, 1]);

  // Phase 3: University (Progress 0.65 -> 1.0)
  const univOpacity = useTransform(progress, [0.6, 0.7, 1], [0, 1, 1]);
  const univPath = useTransform(progress, [0.65, 0.85], [0, 1]);

  // General glowing effect pulsating
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.5, 1, 0.8]);

  return (
    <div style={{ position: 'relative', width: '500px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Glow Node */}
      <motion.div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        opacity: glowOpacity,
        filter: 'blur(50px)',
        zIndex: 0
      }} />

      {/* Grid Floor */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        width: '600px',
        height: '100px',
        background: 'linear-gradient(transparent 95%, var(--primary) 100%), linear-gradient(90deg, transparent 95%, var(--primary) 100%)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(70deg)',
        opacity: 0.3,
        zIndex: 1,
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
      }} />

      {/* SVG Container for Holographic Blueprints */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2, filter: 'drop-shadow(0 0 10px var(--primary))' }}>
        
        {/* SVG Base Setup */}
        <svg viewBox="0 0 500 400" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', position: 'absolute' }}>
          
          {/* Phase 1: School SVG */}
          <motion.g style={{ opacity: schoolOpacity }}>
            {/* House Outline */}
            <motion.path d="M150 250 L250 150 L350 250 L350 350 L150 350 Z" style={{ pathLength: schoolPath }} />
            {/* Door */}
            <motion.path d="M225 350 L225 280 L275 280 L275 350" style={{ pathLength: schoolPath }} />
            {/* Window Left */}
            <motion.path d="M175 280 L195 280 L195 300 L175 300 Z" style={{ pathLength: schoolPath }} />
            {/* Window Right */}
            <motion.path d="M305 280 L325 280 L325 300 L305 300 Z" style={{ pathLength: schoolPath }} />
          </motion.g>

          {/* Phase 2: College SVG */}
          <motion.g style={{ opacity: collegeOpacity }}>
            {/* Main Building Body */}
            <motion.path d="M100 350 L100 200 L150 200 L150 100 L350 100 L350 200 L400 200 L400 350 Z" style={{ pathLength: collegePath }} />
            {/* Horizontal Beams */}
            <motion.path d="M150 150 L350 150 M100 250 L400 250 M100 300 L400 300" style={{ pathLength: collegePath }} strokeDasharray="5,5" />
            {/* Glass Panels (Vertical) */}
            <motion.path d="M200 100 L200 350 M250 100 L250 350 M300 100 L300 350" style={{ pathLength: collegePath }} />
            {/* Double Door */}
            <motion.path d="M220 350 L220 300 L280 300 L280 350 M250 300 L250 350" style={{ pathLength: collegePath }} strokeWidth="3" />
          </motion.g>

          {/* Phase 3: University SVG */}
          <motion.g style={{ opacity: univOpacity }}>
            {/* Epic Base */}
            <motion.path d="M50 350 L50 250 L150 250 L150 150 L350 150 L350 250 L450 250 L450 350 Z" style={{ pathLength: univPath }} />
            {/* Central Dome */}
            <motion.path d="M200 150 A 50 50 0 0 1 300 150" style={{ pathLength: univPath }} strokeWidth="3" />
            {/* Dome Spire */}
            <motion.path d="M250 100 L250 70 M245 70 L255 70" style={{ pathLength: univPath }} />
            {/* Left Wing Pillars */}
            <motion.path d="M70 250 L70 350 M90 250 L90 350 M110 250 L110 350 M130 250 L130 350" style={{ pathLength: univPath }} />
            {/* Right Wing Pillars */}
            <motion.path d="M370 250 L370 350 M390 250 L390 350 M410 250 L410 350 M430 250 L430 350" style={{ pathLength: univPath }} />
            {/* Central Core Data Lines */}
            <motion.path d="M175 180 L175 350 M225 180 L225 350 M275 180 L275 350 M325 180 L325 350" style={{ pathLength: univPath }} strokeDasharray="10, 5" />
            {/* Base Stairs */}
            <motion.path d="M200 350 L300 350 M180 370 L320 370 M160 390 L340 390" style={{ pathLength: univPath }} strokeWidth="2" />
          </motion.g>

        </svg>

      </div>
    </div>
  );
}
