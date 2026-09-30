import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  Terminal,
  Briefcase,
  GraduationCap,
  User,
  FileText,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  profile = {},
  isDocked: controlledDocked,
  setIsDocked: setControlledDocked
}) {
  const [internalDocked, setInternalDocked] = useState(false);
  const isDocked = controlledDocked !== undefined ? controlledDocked : internalDocked;
  const setIsDocked = (val) => {
    if (setControlledDocked) setControlledDocked(val);
    else setInternalDocked(val);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState('systems');
  const [orbitAngle, setOrbitAngle] = useState(0);

  // Exact portrait center on screen
  const [orbitCenter, setOrbitCenter] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  }));

  // Measured real DOM positions of dock slots in the top navbar
  const [dockSlots, setDockSlots] = useState([]);
  const slotRefs = useRef([]);

  // Radius for orbital circle — generous clearance around portrait
  const [radius, setRadius] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 165;
      if (window.innerWidth < 1024) return 210;
    }
    return 245;
  });

  // Unified color for all icons matching the liquid white theme
  const UNIFIED_ICON_COLOR = '#ffffff';

  const navItems = [
    {
      id: 'systems',
      num: '01',
      label: 'Systems',
      href: '#systems',
      icon: Workflow,
      color: UNIFIED_ICON_COLOR
    },
    {
      id: 'stack',
      num: '02',
      label: 'Stack',
      href: '#stack',
      icon: Terminal,
      color: UNIFIED_ICON_COLOR
    },
    {
      id: 'experience',
      num: '03',
      label: 'Experience',
      href: '#experience',
      icon: Briefcase,
      color: UNIFIED_ICON_COLOR
    },
    {
      id: 'education',
      num: '04',
      label: 'Education',
      href: '#education',
      icon: GraduationCap,
      color: UNIFIED_ICON_COLOR
    },
    {
      id: 'about',
      num: '05',
      label: 'About',
      href: '#about',
      icon: User,
      color: UNIFIED_ICON_COLOR
    },
    {
      id: 'resume',
      num: '06',
      label: 'Resume',
      href: profile.pdfPath || 'resume.pdf',
      isDownload: true,
      icon: FileText,
      color: UNIFIED_ICON_COLOR
    }
  ];

  const totalItems = navItems.length;

  // Track portrait center and dock slots accurately in the DOM
  useEffect(() => {
    const updatePositions = () => {
      // 1. Measure portrait position
      const el = document.getElementById('hero-portrait');
      if (el) {
        const rect = el.getBoundingClientRect();
        setOrbitCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      } else {
        setOrbitCenter({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        });
      }

      // 2. Measure responsive radius
      if (window.innerWidth < 640) {
        setRadius(165);
      } else if (window.innerWidth < 1024) {
        setRadius(210);
      } else {
        setRadius(245);
      }

      // 3. Measure untransformed dock slots
      const measured = [];
      slotRefs.current.forEach((node) => {
        if (node) {
          const r = node.getBoundingClientRect();
          measured.push({
            x: r.left + r.width / 2,
            y: r.top + r.height / 2
          });
        }
      });
      if (measured.length === totalItems) {
        setDockSlots(measured);
      }
    };

    updatePositions();
    // Re-check after DOM paints
    const timer = setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePositions);
    };
  }, [totalItems]);

  // Smooth orbit rotation when in circular mode
  useEffect(() => {
    if (isDocked || isHovered) return;
    let animId;
    let lastTime = performance.now();

    const step = (now) => {
      const delta = now - lastTime;
      lastTime = now;
      // 360 degrees every 38 seconds (~0.0095 deg/ms)
      setOrbitAngle((prev) => (prev + delta * 0.0095) % 360);
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isDocked, isHovered]);

  // Auto-docking on scroll or active section observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 35 && !isDocked) {
        setIsDocked(true);
      }

      const sections = ['hero', 'systems', 'stack', 'experience', 'education', 'about'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDocked]);

  // Auto-dock timer after 4.2s if user has not interacted
  useEffect(() => {
    if (isDocked) return;
    const timer = setTimeout(() => {
      if (!isHovered && !activeItem) {
        setIsDocked(true);
      }
    }, 4200);
    return () => clearTimeout(timer);
  }, [isDocked, isHovered, activeItem]);

  const handleItemClick = (item, e) => {
    if (!isDocked) {
      setIsDocked(true);
    }

    if (item.isDownload) {
      return;
    }

    if (item.href?.startsWith('#')) {
      e?.preventDefault();
      setTimeout(() => {
        const el = document.querySelector(item.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  };

  const handleDockNow = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('trigger-hex-sweep'));
    }
    setIsDocked(true);
  };

  return (
    <>
      {/* Orbital Circles around the Portrait (Clean & Geometric, dissolving on dock) */}
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

      {/* Unified Top Navbar & Orbit Coordinator */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4">
        {/* Floating Glass Pill Dock - Invisible border/bg in orbit mode, materializes into frosted glass on dock */}
        <motion.nav
          aria-label="Primary Navigation"
          animate={{
            backgroundColor: isDocked ? 'rgba(7, 10, 15, 0.88)' : 'rgba(7, 10, 15, 0)',
            borderColor: isDocked ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0)',
            boxShadow: isDocked ? '0 20px 40px -10px rgba(0, 0, 0, 0.7)' : '0 0 0 rgba(0, 0, 0, 0)'
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto rounded-full border px-2 sm:px-3 py-1.5 flex items-center justify-center gap-1 sm:gap-2 max-w-full ${
            isDocked ? 'backdrop-blur-xl' : 'backdrop-blur-none border-transparent'
          }`}
        >
          {navItems.map((item, index) => {
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
                key={item.id}
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
                    className={`group relative rounded-full flex items-center gap-2 sm:gap-2.5 cursor-pointer transition-all duration-200 select-none bg-transparent ${
                      isDocked
                        ? isCurrentActive
                          ? 'text-white font-bold px-2 sm:px-2.5 py-1'
                          : 'text-slate-400 hover:text-white px-2 sm:px-2.5 py-1'
                        : isItemHovered
                          ? 'text-white px-3 sm:px-4 py-2'
                          : 'text-slate-200 hover:text-white px-3 sm:px-4 py-2'
                    }`}
                    style={{
                      textShadow: !isDocked && isItemHovered ? '0 0 16px rgba(255, 255, 255, 0.7)' : undefined
                    }}
                  >
                    {/* Icon Container with Liquid White Color */}
                    <div
                      className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{
                        color: item.color
                      }}
                    >
                      <item.icon className={isDocked ? "w-3.5 h-3.5 sm:w-4 sm:h-4" : "w-4.5 h-4.5 sm:w-5 sm:h-5"} />
                    </div>

                    {/* Section Label — Slightly Bigger, No Dot */}
                    <span className={isDocked ? "text-xs sm:text-sm font-medium tracking-tight" : "text-sm sm:text-base font-semibold tracking-tight"}>
                      {item.label}
                    </span>
                  </a>
                </motion.div>
              </div>
            );
          })}
        </motion.nav>
      </header>

      {/* Orbit Mode Centered Down Arrow (Dissolves when docked) */}
      <AnimatePresence>
        {!isDocked && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
          >
            <motion.button
              onClick={handleDockNow}
              aria-label="Scroll down to explore"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-950/80 hover:bg-neutral-900 border border-white/15 hover:border-white/40 text-slate-300 hover:text-white shadow-lg shadow-black/50 hover:shadow-white/10 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
