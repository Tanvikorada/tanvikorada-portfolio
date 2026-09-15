'use client';

import React, { useEffect, useState } from 'react';

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className = '',
}) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      '--angle': -angle + 'deg',
      top: '-5%',
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + 's',
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + 's',
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  if (meteorStyles.length === 0) return null;

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        <span
          key={idx}
          className={`meteor-anim ${className}`}
          style={{
            ...style,
            position: 'absolute',
            pointerEvents: 'none',
            width: '2px',
            height: '2px',
            transform: 'rotate(var(--angle))',
            borderRadius: '9999px',
            backgroundColor: '#71717a',
            boxShadow: '0 0 0 1px #ffffff10'
          }}
        >
          <div 
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              top: '50%',
              zIndex: -1,
              height: '1px',
              width: '50px',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(to right, #71717a, transparent)'
            }}
          />
        </span>
      ))}
    </>
  );
};
