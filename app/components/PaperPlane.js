'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PaperPlane() {
  const { scrollYProgress } = useScroll();
  
  // As user scrolls from 0 to 1:
  // Move plane down the screen, swaying left and right.
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '80vh']);
  
  // Sway horizontally: 0 -> right -> left -> right
  const x = useTransform(scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ['0vw', '20vw', '-20vw', '10vw', '0vw']
  );
  
  // Rotate to face the direction of movement
  const rotate = useTransform(scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [45, 75, -15, 60, 45]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '10vh',
        left: '50vw',
        y,
        x,
        rotate,
        zIndex: 999,
        pointerEvents: 'none',
        opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-heading)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="var(--bg-surface)" />
      </svg>
    </motion.div>
  );
}
