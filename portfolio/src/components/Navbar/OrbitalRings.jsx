import React from 'react';
import { motion } from 'framer-motion';

export function OrbitalRings({ orbitCenter, radius, isDocked }) {
  return (
    <motion.div
      animate={{ opacity: isDocked ? 0 : 1 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'fixed',
        left: orbitCenter.x,
        top: orbitCenter.y,
        transform: 'translate(-50%, -50%)',
        width: radius * 2.4,
        height: radius * 2.4,
        pointerEvents: 'none',
        zIndex: 25
      }}
    >
      {/* Core orbit track (Liquid White with subtle glow) */}
      <div
        className="absolute inset-0 m-auto rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.12)]"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {/* Outer dashed orbital ring */}
      <div
        className="absolute inset-0 m-auto rounded-full border border-dashed border-white/10"
        style={{ width: radius * 2.35, height: radius * 2.35 }}
      />
      {/* Inner subtle guide circle */}
      <div
        className="absolute inset-0 m-auto rounded-full border border-white/5"
        style={{ width: radius * 1.5, height: radius * 1.5 }}
      />
    </motion.div>
  );
}
