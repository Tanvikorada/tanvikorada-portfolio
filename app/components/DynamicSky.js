'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DynamicSky() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="dynamic-sky-container">
      {/* --- DAY SKY --- */}
      <div className="sky-layer day-sky">
        {/* Deep cinematic sky gradient */}
        <div className="day-bg" />
        
        {/* Glowing Sun */}
        <div className="sun-container">
          <div className="sun-core" />
          <div className="sun-glow" />
          <div className="sun-rays" />
        </div>

        {/* Dynamic Volumetric Clouds */}
        <div className="clouds-container">
          {/* Back layer - slow */}
          <div className="cloud-layer cloud-layer-1">
            <div className="cloud-volumetric cv-1" style={{ top: '15%', left: '10%' }} />
            <div className="cloud-volumetric cv-1" style={{ top: '35%', left: '60%' }} />
          </div>
          
          {/* Middle layer - medium */}
          <div className="cloud-layer cloud-layer-2">
            <div className="cloud-volumetric cv-2" style={{ top: '25%', left: '30%' }} />
            <div className="cloud-volumetric cv-2" style={{ top: '10%', left: '80%' }} />
          </div>

          {/* Front layer - fast */}
          <div className="cloud-layer cloud-layer-3">
            <div className="cloud-volumetric cv-3" style={{ top: '45%', left: '20%' }} />
            <div className="cloud-volumetric cv-3" style={{ top: '20%', left: '90%' }} />
          </div>
        </div>
      </div>
      
      {/* --- NIGHT SKY --- */}
      <div className="sky-layer night-sky">
        <div className="night-bg" />
        
        {/* Glowing Moon */}
        <div className="moon-container">
          <div className="moon-core">
            <div className="crater c1"></div>
            <div className="crater c2"></div>
            <div className="crater c3"></div>
          </div>
          <div className="moon-glow" />
        </div>

        {/* Dynamic Starfield */}
        <div className="starfield">
          <div className="stars-sm"></div>
          <div className="stars-md"></div>
          <div className="stars-lg"></div>
        </div>
        
        {/* Deep space nebulae (colored blurs) */}
        <div className="nebula n1" />
        <div className="nebula n2" />

        {/* Shooting Stars */}
        <div className="shooting-star-group">
          <div className="s-star s1"></div>
          <div className="s-star s2"></div>
          <div className="s-star s3"></div>
          <div className="s-star s4"></div>
        </div>
      </div>

      <style jsx>{`
        .dynamic-sky-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .sky-layer {
          position: absolute;
          inset: 0;
          transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* --- DAY STYLES --- */
        .day-sky {
          opacity: 1;
        }
        :global(body.night) .day-sky { 
          opacity: 0; 
        }

        .day-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #0284c7 0%, #38bdf8 60%, #bae6fd 100%);
        }

        /* Sun */
        .sun-container {
          position: absolute;
          top: 15%;
          right: 20%;
          width: 120px;
          height: 120px;
        }
        .sun-core {
          position: absolute;
          inset: 0;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 20px #fef08a, 0 0 60px #facc15;
          z-index: 2;
        }
        .sun-glow {
          position: absolute;
          inset: -100px;
          background: radial-gradient(circle, rgba(253,224,71,0.6) 0%, rgba(253,224,71,0) 70%);
          border-radius: 50%;
          animation: pulse-glow 4s ease-in-out infinite alternate;
          z-index: 1;
        }
        .sun-rays {
          position: absolute;
          inset: -150px;
          background: repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,255,255,0.1) 10deg 20deg);
          border-radius: 50%;
          animation: spin-rays 60s linear infinite;
          mask-image: radial-gradient(circle, black 20%, transparent 60%);
          -webkit-mask-image: radial-gradient(circle, black 20%, transparent 60%);
        }

        @keyframes pulse-glow {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes spin-rays {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Clouds */
        .clouds-container {
          position: absolute;
          inset: 0;
        }
        .cloud-layer {
          position: absolute;
          inset: 0;
          will-change: transform;
        }
        .cloud-layer-1 { animation: cloud-drift 45s linear infinite; }
        .cloud-layer-2 { animation: cloud-drift 30s linear infinite; }
        .cloud-layer-3 { animation: cloud-drift 20s linear infinite; }

        .cloud-volumetric {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          filter: blur(8px);
        }
        .cv-1 {
          width: 300px; height: 100px;
          opacity: 0.8;
          box-shadow: 
            50px -30px 0 20px #ffffff,
            -50px -20px 0 10px #ffffff,
            0 -40px 0 30px #ffffff,
            20px -60px 0 20px rgba(255,255,255,0.9);
        }
        .cv-2 {
          width: 200px; height: 70px;
          opacity: 0.9;
          box-shadow: 
            40px -20px 0 10px #ffffff,
            -30px -15px 0 5px #ffffff,
            0 -30px 0 20px #ffffff;
        }
        .cv-3 {
          width: 400px; height: 120px;
          opacity: 1;
          box-shadow: 
            70px -40px 0 30px #ffffff,
            -60px -30px 0 20px #ffffff,
            0 -60px 0 40px #ffffff,
            30px -80px 0 30px rgba(255,255,255,0.9);
        }

        @keyframes cloud-drift {
          0% { transform: translateX(-40vw); }
          100% { transform: translateX(120vw); }
        }

        /* --- NIGHT STYLES --- */
        .night-sky {
          opacity: 0;
        }
        :global(body.night) .night-sky { 
          opacity: 1; 
        }

        .night-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #020617 0%, #0f172a 60%, #1e1b4b 100%);
        }

        /* Moon */
        .moon-container {
          position: absolute;
          top: 15%;
          right: 20%;
          width: 100px;
          height: 100px;
        }
        .moon-core {
          position: absolute;
          inset: 0;
          background: #e2e8f0;
          border-radius: 50%;
          box-shadow: inset -15px -15px 0 rgba(0,0,0,0.2), 0 0 20px #cbd5e1;
          z-index: 2;
          overflow: hidden;
        }
        .crater {
          position: absolute;
          background: rgba(0,0,0,0.1);
          border-radius: 50%;
          box-shadow: inset 2px 2px 5px rgba(0,0,0,0.2);
        }
        .c1 { width: 25px; height: 25px; top: 20%; left: 20%; }
        .c2 { width: 15px; height: 15px; top: 50%; left: 60%; }
        .c3 { width: 35px; height: 35px; top: 60%; left: 20%; }

        .moon-glow {
          position: absolute;
          inset: -60px;
          background: radial-gradient(circle, rgba(226,232,240,0.3) 0%, rgba(226,232,240,0) 70%);
          border-radius: 50%;
          animation: pulse-glow 4s ease-in-out infinite alternate;
          z-index: 1;
        }

        /* Stars */
        .starfield {
          position: absolute;
          inset: 0;
          animation: spin-stars 200s linear infinite;
        }
        @keyframes spin-stars {
          0% { transform: rotate(0deg) scale(1.5); }
          100% { transform: rotate(360deg) scale(1.5); }
        }

        .stars-sm, .stars-md, .stars-lg {
          position: absolute;
          inset: 0;
        }
        
        /* Using multiple box-shadows to generate a starfield */
        .stars-sm {
          width: 1px; height: 1px; background: transparent;
          box-shadow: 10vw 20vh #fff, 30vw 10vh #fff, 50vw 50vh #fff, 70vw 30vh #fff, 90vw 80vh #fff,
                      15vw 60vh #fff, 35vw 70vh #fff, 55vw 15vh #fff, 75vw 65vh #fff, 95vw 25vh #fff,
                      5vw 90vh #fff, 25vw 40vh #fff, 45vw 85vh #fff, 65vw 10vh #fff, 85vw 55vh #fff;
          animation: twinkle-stars 3s ease-in-out infinite alternate;
        }
        .stars-md {
          width: 2px; height: 2px; background: transparent;
          box-shadow: 20vw 30vh #fff, 40vw 50vh #fff, 60vw 10vh #fff, 80vw 70vh #fff, 100vw 20vh #fff,
                      10vw 80vh #fff, 50vw 90vh #fff, 90vw 40vh #fff, 30vw 15vh #fff, 70vw 85vh #fff;
          animation: twinkle-stars 4s ease-in-out infinite alternate-reverse;
          border-radius: 50%;
        }
        .stars-lg {
          width: 3px; height: 3px; background: transparent;
          box-shadow: 15vw 40vh #fff, 45vw 20vh #fff, 75vw 50vh #fff, 85vw 90vh #fff, 25vw 75vh #fff;
          animation: twinkle-stars 5s ease-in-out infinite alternate;
          border-radius: 50%;
        }

        @keyframes twinkle-stars {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        /* Nebulae */
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          z-index: 0;
        }
        .n1 {
          width: 40vw; height: 40vh;
          background: #4c1d95;
          top: 10%; left: 10%;
          animation: pulse-glow 8s ease-in-out infinite alternate;
        }
        .n2 {
          width: 50vw; height: 30vh;
          background: #0ea5e9;
          bottom: 20%; right: 10%;
          animation: pulse-glow 10s ease-in-out infinite alternate-reverse;
        }

        /* Shooting Stars */
        .shooting-star-group {
          position: absolute;
          inset: 0;
          transform: rotate(-30deg);
        }
        .s-star {
          position: absolute;
          width: 150px;
          height: 2px;
          background: linear-gradient(90deg, #fff, transparent);
          border-radius: 2px;
          opacity: 0;
        }
        .s1 { top: 20%; left: 20%; animation: shoot 6s linear infinite; }
        .s2 { top: 40%; left: 60%; animation: shoot 8s linear infinite 2s; }
        .s3 { top: 60%; left: 10%; animation: shoot 7s linear infinite 4s; }
        .s4 { top: 80%; left: 70%; animation: shoot 9s linear infinite 6s; }

        @keyframes shoot {
          0% { transform: translateX(0); opacity: 1; }
          10% { transform: translateX(800px); opacity: 0; }
          100% { transform: translateX(800px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

