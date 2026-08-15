'use client';
import { useState, useEffect, useRef } from 'react';

const WORDS = ['Developer.', 'Builder.', 'Engineer.', 'Creator.'];

function SplitText({ text }) {
  return (
    <span>
      {text.split('').map((ch, i) => (
        <span key={i} className="split-letter">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

function WordRoller() {
  const [index, setIndex] = useState(0);
  const height = useRef(0);
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current?.querySelector('.word-roller-item');
    if (el) height.current = el.offsetHeight;
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="word-roller" style={{ height: '1em' }}>
      <span
        ref={innerRef}
        className="word-roller-inner"
        style={{ transform: `translateY(-${index}em)` }}
      >
        {WORDS.map((w, i) => (
          <span key={i} className="word-roller-item" style={{ display: 'block', height: '1em' }}>
            <SplitText text={w} />
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-bg-night" />
      <div className="hero-stars" />

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Chennai, India · B.Tech CSE · Open to opportunities
        </div>

        {/* Giant Title */}
        <h1 className="hero-title">
          <span className="hero-title-line">
            <SplitText text="Full-Stack" />
          </span>
          <span className="hero-title-row">
            <SplitText text="AI\u00A0" />
            <WordRoller />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Building AI-native web products at the intersection of great engineering and real-world impact.
          SRMIST · CGPA 9.27/10.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <div className="scroll-arrow" />
        <span>scroll</span>
      </div>
    </section>
  );
}
