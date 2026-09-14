'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function KineticText({ text, className = "", style = {} }) {
  const letters = text.split("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <motion.span 
      className={className} 
      style={{ display: 'inline-flex', flexWrap: 'wrap', cursor: 'default', ...style }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.04 } },
        hidden: {}
      }}
    >
      {letters.map((letter, i) => {
        const isSpace = letter === " ";
        // Calculate distance from the hovered letter to create a "wave" effect
        const distance = hoveredIndex !== null && !isSpace ? Math.abs(hoveredIndex - i) : Infinity;
        
        let y = 0;
        let scale = 1;
        let color = 'inherit';
        let rotate = 0;
        let filter = 'drop-shadow(0px 0px 0px transparent)';
        
        if (distance === 0) {
          y = -12; scale = 1.25; color = 'var(--primary)'; rotate = (Math.random() - 0.5) * 15;
          filter = 'drop-shadow(0px 10px 10px rgba(14, 165, 233, 0.4))';
        } else if (distance === 1) {
          y = -6; scale = 1.1; color = 'var(--accent, #38bdf8)'; rotate = (Math.random() - 0.5) * 8;
        } else if (distance === 2) {
          y = -2; scale = 1.05; color = 'inherit'; rotate = 0;
        }

        return (
          <motion.span
            key={i}
            onMouseEnter={() => !isSpace && setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: -90, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }
            }}
            animate={
              hoveredIndex !== null 
                ? { y, scale, color, rotate, filter, transition: { type: "spring", stiffness: 400, damping: 12 } } 
                : { y: 0, scale: 1, color: 'inherit', rotate: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 400, damping: 20 } }
            }
            style={{ 
              display: 'inline-block', 
              whiteSpace: 'pre',
              transformOrigin: 'bottom center',
              willChange: 'transform, color, filter',
            }}
          >
            {letter}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
