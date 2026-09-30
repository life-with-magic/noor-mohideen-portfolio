import React from 'react';
import { motion } from 'framer-motion';

export function NavItem({
  item,
  index,
  isDocked,
  orbitCenter,
  orbitAngle,
  radius,
  dockSlots,
  totalItems,
  activeSection,
  activeItem,
  slotRefs,
  handleItemClick,
  setIsHovered,
  setActiveItem
}) {
  // 1. Compute exact angle and orbit coordinate on the circle
  const itemAngle = (index / totalItems) * 360 + orbitAngle;
  const rad = (itemAngle * Math.PI) / 180;
  const orbitX = orbitCenter.x + Math.cos(rad) * radius;
  const orbitY = orbitCenter.y + Math.sin(rad) * radius;

  // 2. Measure delta from the actual dock slot coordinate
  const slot = dockSlots[index] || {
    x: orbitCenter.x + (index - (totalItems - 1) / 2) * 115,
    y: 32
  };
  const deltaX = orbitX - slot.x;
  const deltaY = orbitY - slot.y;

  const isCurrentActive = activeSection === item.id;
  const isItemHovered = activeItem?.id === item.id;

  return (
    <div
      ref={(el) => (slotRefs.current[index] = el)}
      className="shrink-0 relative"
    >
      <motion.div
        animate={
          isDocked
            ? {
                x: 0,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.02
                }
              }
            : {
                x: deltaX,
                y: deltaY,
                scale: isItemHovered ? 1.08 : 1,
                transition: {
                  duration: 0 // Zero-lag tracking of perfect circular path
                }
              }
        }
        className="shrink-0"
      >
        <a
          href={item.href}
          download={item.isDownload ? 'Noor_Mohideen_Resume.pdf' : undefined}
          onClick={(e) => handleItemClick(item, e)}
          onMouseEnter={() => {
            setIsHovered(true);
            setActiveItem(item);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveItem(null);
          }}
          aria-label={item.label}
          className={`group relative rounded-full flex items-center gap-2.5 sm:gap-3 cursor-pointer transition-all duration-200 select-none bg-transparent ${
            isDocked
              ? isCurrentActive
                ? 'text-white font-bold px-3 sm:px-4 py-1.5'
                : 'text-slate-400 hover:text-white px-3 sm:px-4 py-1.5'
              : isItemHovered
                ? 'text-white px-4 sm:px-5 py-2.5'
                : 'text-slate-200 hover:text-white px-4 sm:px-5 py-2.5'
          }`}
          style={{
            textShadow: !isDocked && isItemHovered ? '0 0 16px rgba(255, 255, 255, 0.7)' : undefined
          }}
        >
          {/* Icon Container with Purple Color */}
          <div
            className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{
              color: item.color
            }}
          >
            <item.icon className={isDocked ? "w-4.5 h-4.5 sm:w-5 sm:h-5" : "w-5.5 h-5.5 sm:w-6 sm:h-6"} />
          </div>

          {/* Section Label — Prominent & Legible */}
          <span className={isDocked ? "text-sm sm:text-base font-semibold tracking-tight" : "text-base sm:text-lg font-bold tracking-tight"}>
            {item.label}
          </span>
        </a>
      </motion.div>
    </div>
  );
}
