import React from 'react';
import { motion } from 'framer-motion';

export function RadialOrbitItems({
  navItems,
  radius,
  totalItems,
  isHovered,
  activeItem,
  isMovingToNavbar,
  setActiveItem,
  handleSelect
}) {
  return (
    <motion.div
      animate={isMovingToNavbar || isHovered ? { rotate: 0 } : { rotate: 360 }}
      transition={
        isMovingToNavbar
          ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          : { duration: 55, repeat: Infinity, ease: 'linear' }
      }
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {navItems.map((item, index) => {
        const angle = (index / totalItems) * 360;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const isItemActive = activeItem?.id === item.id;

        const navbarTargetY = typeof window !== 'undefined' ? -(window.innerHeight / 2 - 38) : -300;
        const targetOffsets = [-190, -95, 0, 95, 185, 280];
        const navbarTargetX = typeof window !== 'undefined' && window.innerWidth < 640
          ? 0
          : targetOffsets[index] || (index - 2.5) * 80;

        return (
          <motion.div
            key={item.id}
            animate={
              isMovingToNavbar
                ? {
                    x: navbarTargetX,
                    y: navbarTargetY,
                    scale: 0.85,
                    opacity: 1,
                    transition: {
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.02
                    }
                  }
                : {
                    x,
                    y,
                    scale: 1,
                    opacity: 1
                  }
            }
            className="absolute pointer-events-auto"
          >
            <motion.div
              animate={isMovingToNavbar || isHovered ? { rotate: 0 } : { rotate: -360 }}
              transition={
                isMovingToNavbar
                  ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 55, repeat: Infinity, ease: 'linear' }
              }
            >
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                  delay: 0.15 + index * 0.08
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setActiveItem(item)}
                onClick={(e) => handleSelect(item, e)}
                aria-label={`Navigate to ${item.label}`}
                className={`relative group px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border shadow-xl flex items-center gap-2.5 transition-all duration-300 backdrop-blur-xl ${
                  isItemActive
                    ? 'bg-neutral-900 border-cyan-400 shadow-cyan-500/25 scale-110'
                    : 'bg-neutral-950/85 border-white/10 hover:border-cyan-400/50 hover:bg-neutral-900/90'
                }`}
                style={{
                  boxShadow: isItemActive ? `0 0 25px ${item.bgGlow}` : undefined
                }}
              >
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}40`,
                    color: item.color
                  }}
                >
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-medium text-slate-500 group-hover:text-cyan-400 transition-colors">
                      .{item.num}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-100 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
