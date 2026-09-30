import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  Terminal,
  Briefcase,
  GraduationCap,
  Compass,
  Download,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export default function RadialIntro({ onComplete, autoDismissDelay = 3500, profile = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isMovingToNavbar, setIsMovingToNavbar] = useState(false);

  // Orbit radius responsive measurement
  const [radius, setRadius] = useState(230);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(160);
      } else if (window.innerWidth < 1024) {
        setRadius(200);
      } else {
        setRadius(240);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Navigation Items arranged radially
  const navItems = [
    {
      id: 'systems',
      num: '01',
      label: 'Systems',
      tagline: 'Production AI Architectures',
      href: '#systems',
      icon: Workflow,
      color: '#06b6d4',
      bgGlow: 'rgba(6,182,212,0.2)'
    },
    {
      id: 'stack',
      num: '02',
      label: 'Stack',
      tagline: 'Capabilities & MCP Matrix',
      href: '#stack',
      icon: Terminal,
      color: '#a855f7',
      bgGlow: 'rgba(168,85,247,0.2)'
    },
    {
      id: 'experience',
      num: '03',
      label: 'Experience',
      tagline: 'Enterprise AI & Cloud Track Record',
      href: '#experience',
      icon: Briefcase,
      color: '#10b981',
      bgGlow: 'rgba(16,185,129,0.2)'
    },
    {
      id: 'education',
      num: '04',
      label: 'Education',
      tagline: 'MSc AI (Edinburgh) & Certifications',
      href: '#education',
      icon: GraduationCap,
      color: '#f59e0b',
      bgGlow: 'rgba(245,158,11,0.2)'
    },
    {
      id: 'about',
      num: '05',
      label: 'About',
      tagline: 'Profile & Beyond Code',
      href: '#about',
      icon: Compass,
      color: '#ec4899',
      bgGlow: 'rgba(236,72,153,0.2)'
    },
    {
      id: 'resume',
      num: '06',
      label: 'Resume',
      tagline: 'Download Full Resume PDF',
      href: profile.pdfPath || 'resume.pdf',
      isDownload: true,
      icon: Download,
      color: '#38bdf8',
      bgGlow: 'rgba(56,189,248,0.2)'
    }
  ];

  const totalItems = navItems.length;

  const triggerTransition = (targetHref) => {
    if (isMovingToNavbar) return;
    setIsMovingToNavbar(true);

    // After the circular items smoothly fly into the top navbar (650ms), complete and reveal the page
    setTimeout(() => {
      onComplete?.(targetHref);
    }, 650);
  };

  const handleSelect = (item, e) => {
    if (e) e.stopPropagation();
    triggerTransition(item.href);
  };

  const handleSkip = () => {
    triggerTransition();
  };

  // Optional auto-dismiss timer (user can cancel or pause by hovering)
  useEffect(() => {
    if (autoDismissDelay <= 0) return;

    const timer = setTimeout(() => {
      if (!isHovered && !activeItem && !isMovingToNavbar) {
        triggerTransition();
      }
    }, autoDismissDelay);

    return () => clearTimeout(timer);
  }, [autoDismissDelay, isHovered, activeItem, isMovingToNavbar]);

  const userImgSrc = `${import.meta.env.BASE_URL}user.png`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-transparent overflow-hidden select-none"
    >
      {/* Orbit Rings (Dissolve smoothly when moving to navbar) */}
      <motion.div
        animate={{ opacity: isMovingToNavbar ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="rounded-full border border-cyan-500/15"
          style={{ width: radius * 2, height: radius * 2 }}
        />
        <div
          className="absolute rounded-full border border-dashed border-white/5"
          style={{ width: radius * 2.35, height: radius * 2.35 }}
        />
        <div
          className="absolute rounded-full border border-white/5"
          style={{ width: radius * 1.5, height: radius * 1.5 }}
        />
      </motion.div>

      {/* Radial Stage Container */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: radius * 2.4, height: radius * 2.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveItem(null);
        }}
      >
        {/* Orbit Rotating / Moving Items */}
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

            // Target position in the top navbar pill:
            // Centered at top of screen (y ≈ -(windowHeight/2 - 38px))
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
                {/* Counter-rotate each element so labels & icons stay upright */}
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
                    {/* Item Icon */}
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

                    {/* Numeric Prefix & Section Title */}
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

        {/* Center: User Portrait (Clean, static, NO spinning) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col items-center text-center cursor-pointer group"
          onClick={handleSkip}
        >
          {/* User Image in Circular Frame */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.25)] bg-neutral-900 group-hover:scale-105 transition-transform duration-300">
            <img
              src={userImgSrc}
              alt="Noor Mohideen"
              className="w-full h-full object-cover object-top select-none"
              onError={(e) => {
                e.currentTarget.src = 'user.png';
              }}
            />
          </div>

          {/* Center Identity Info */}
          <motion.div
            animate={{ opacity: isMovingToNavbar ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="mt-3.5 space-y-0.5"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-[10px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Noor Mohideen</span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              AI Solution Architect
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Hint / Enter Action (Dissolves when moving to navbar) */}
      <motion.div
        animate={{ opacity: isMovingToNavbar ? 0 : 1, y: isMovingToNavbar ? 20 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <AnimatePresence mode="wait">
          {activeItem ? (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="px-4 py-2 rounded-2xl bg-neutral-900/90 border border-cyan-400/40 shadow-xl backdrop-blur-xl flex items-center gap-2.5 text-xs font-mono"
            >
              <activeItem.icon className="w-4 h-4" style={{ color: activeItem.color }} />
              <span className="text-slate-200">{activeItem.tagline}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] font-mono text-slate-400 tracking-wider flex items-center gap-2"
            >
              <span>Click any circle or press enter to explore</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter Portfolio Action Button */}
        <button
          onClick={handleSkip}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100/90 hover:bg-white text-neutral-950 font-bold text-xs font-sans tracking-wide shadow-xl active:scale-95 transition-all cursor-pointer"
        >
          <span>Enter Portfolio</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </motion.div>
  );
}
