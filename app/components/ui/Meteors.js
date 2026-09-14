"use client"

import React, { useEffect, useState } from "react"

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className = "",
}) => {
  const [meteorStyles, setMeteorStyles] = useState([])

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
    }))
    setMeteorStyles(styles)
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  return (
    <>
      <style>{`
        .animate-meteor {
          animation: meteor var(--animation-duration, 5s) linear infinite;
        }
        @keyframes meteor {
          0% {
            transform: rotate(var(--angle)) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle)) translateX(-1000px);
            opacity: 0;
          }
        }
      `}</style>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={{ ...style, '--animation-duration': style.animationDuration, position: 'absolute', width: '2px', height: '2px', borderRadius: '9999px', backgroundColor: '#64748b', boxShadow: '0 0 0 1px #ffffff10' }}
          className={`animate-meteor pointer-events-none ${className}`}
        >
          {/* Meteor Tail */}
          <div style={{ position: 'absolute', top: '50%', zIndex: -10, height: '1px', width: '50px', transform: 'translateY(-50%)', background: 'linear-gradient(to right, #64748b, transparent)' }} className="pointer-events-none" />
        </span>
      ))}
    </>
  )
}
export default Meteors;
