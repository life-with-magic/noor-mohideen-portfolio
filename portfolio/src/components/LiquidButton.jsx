'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Animate UI Liquid Button
 * Refined with Emil Kowalski design engineering principles:
 * - Sub-300ms tactile feedback with scale(0.97) tap compression
 * - Fluid liquid wave fill via CSS variables & background-position transition
 * - Hardware-accelerated GPU transforms
 * - Touch-safe pointer hover gating
 */

const variantStyles = {
  default:
    '[--liquid-button-background-color:rgba(10,14,23,0.85)] [--liquid-button-color:#06b6d4] text-cyan-300 hover:text-neutral-950 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  primary:
    '[--liquid-button-background-color:#06b6d4] [--liquid-button-color:#22d3ee] text-neutral-950 hover:text-neutral-950 font-semibold shadow-[0_0_30px_rgba(6,182,212,0.35)]',
  secondary:
    '[--liquid-button-background-color:rgba(18,24,38,0.85)] [--liquid-button-color:#6366f1] text-indigo-300 hover:text-white border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]',
  ghost:
    '[--liquid-button-background-color:rgba(255,255,255,0.03)] [--liquid-button-color:rgba(6,182,212,0.25)] text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30',
  destructive:
    '[--liquid-button-background-color:rgba(239,68,68,0.15)] [--liquid-button-color:#ef4444] text-rose-300 hover:text-white border border-rose-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]',
  glass:
    '[--liquid-button-background-color:rgba(15,23,42,0.65)] [--liquid-button-color:rgba(6,182,212,0.85)] text-slate-100 hover:text-neutral-950 border border-white/15 backdrop-blur-xl shadow-lg',
};

const sizeStyles = {
  default: 'h-10 px-5 py-2 text-sm',
  sm: 'h-8 px-3.5 py-1 text-xs gap-1.5',
  lg: 'h-12 px-7 py-3 text-base gap-3 font-semibold',
  icon: 'size-10 p-2.5',
  'icon-sm': 'size-8 p-1.5',
  'icon-lg': 'size-12 p-3',
};

export const LiquidButton = React.forwardRef(function LiquidButton(
  {
    className,
    variant = 'default',
    size = 'default',
    delay = '0.28s',
    fillHeight = '3px',
    hoverScale = 1.03,
    tapScale = 0.97,
    children,
    style,
    asChild = false,
    ...props
  },
  ref
) {
  const Component = motion.button;

  return (
    <Component
      ref={ref}
      whileTap={{ scale: tapScale }}
      whileHover={{
        scale: hoverScale,
        '--liquid-button-fill-width': '100%',
        '--liquid-button-fill-height': '100%',
        '--liquid-button-delay': delay,
        transition: {
          '--liquid-button-fill-width': { duration: 0 },
          '--liquid-button-fill-height': { duration: 0 },
          '--liquid-button-delay': { duration: 0 },
        },
      }}
      transition={{
        type: 'spring',
        duration: 0.35,
        bounce: 0.15,
      }}
      style={{
        '--liquid-button-fill-width': '-1%',
        '--liquid-button-fill-height': fillHeight,
        '--liquid-button-delay': '0s',
        background:
          'linear-gradient(var(--liquid-button-color, #06b6d4) 0 0) no-repeat calc(200% - var(--liquid-button-fill-width, -1%)) 100% / 200% var(--liquid-button-fill-height, 3px)',
        backgroundColor: 'var(--liquid-button-background-color, rgba(10, 14, 23, 0.85))',
        transition: `background ${delay} var(--liquid-button-delay, 0s), color ${delay} ${delay}, background-position ${delay} calc(${delay} - var(--liquid-button-delay, 0s)), border-color 200ms ease`,
        ...style,
      }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium select-none overflow-hidden cursor-pointer backdrop-blur-md',
        'outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.default,
        className
      )}
      {...props}
    >
      {/* Liquid sheen surface highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
});

export default LiquidButton;
