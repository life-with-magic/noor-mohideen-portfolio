import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Download,
  ChevronDown
} from 'lucide-react';
import { OrbitalRings } from './OrbitalRings';
import { NavItem } from './NavItem';
import { usePositionTracker } from './usePositionTracker';

export function Navbar({
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

  const [orbitCenter, setOrbitCenter] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  }));

  const [dockSlots, setDockSlots] = useState([]);
  const slotRefs = useRef([]);

  const [radius, setRadius] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 165;
      if (window.innerWidth < 1024) return 210;
    }
    return 245;
  });

  const UNIFIED_ICON_COLOR = '#a855f7';

  const navItems = [
    { id: 'hero', num: '01', label: 'Home', href: '#hero', icon: Home, color: UNIFIED_ICON_COLOR },
    { id: 'contact', num: '02', label: 'Contact', href: '#contact', icon: User, color: UNIFIED_ICON_COLOR },
    { id: 'education', num: '03', label: 'Education', href: '#education', icon: GraduationCap, color: UNIFIED_ICON_COLOR },
    { id: 'experience', num: '04', label: 'Experience', href: '#experience', icon: Briefcase, color: UNIFIED_ICON_COLOR },
    { id: 'projects', num: '05', label: 'Projects', href: '#systems', icon: FolderGit2, color: UNIFIED_ICON_COLOR },
    { id: 'resume', num: '06', label: 'Resume', href: `${import.meta.env.BASE_URL}${profile.pdfPath || 'resume.pdf'}`, isDownload: true, icon: Download, color: UNIFIED_ICON_COLOR }
  ];

  const totalItems = navItems.length;

  usePositionTracker(totalItems, setOrbitCenter, setRadius, setDockSlots, slotRefs);

  useEffect(() => {
    if (isDocked || isHovered) return;
    let animId;
    let lastTime = performance.now();

    const step = (now) => {
      const delta = now - lastTime;
      lastTime = now;
      setOrbitAngle((prev) => (prev + delta * 0.0095) % 360);
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isDocked, isHovered]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 35 && !isDocked) {
        setIsDocked(true);
      }

      const sections = ['hero', 'education', 'experience', 'systems', 'stack'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section === 'systems' ? 'projects' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDocked]);

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
    if (!isDocked) setIsDocked(true);
    if (item.isDownload) return;

    if (item.id === 'contact') {
      e?.preventDefault();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('flip-right-card'));
      }
      if (window.scrollY > 50) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (item.href?.startsWith('#')) {
      e?.preventDefault();
      setTimeout(() => {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
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
      <OrbitalRings orbitCenter={orbitCenter} radius={radius} isDocked={isDocked} />

      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4">
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
          {navItems.map((item, index) => (
            <NavItem
              key={item.id}
              item={item}
              index={index}
              isDocked={isDocked}
              orbitCenter={orbitCenter}
              orbitAngle={orbitAngle}
              radius={radius}
              dockSlots={dockSlots}
              totalItems={totalItems}
              activeSection={activeSection}
              activeItem={activeItem}
              slotRefs={slotRefs}
              handleItemClick={handleItemClick}
              setIsHovered={setIsHovered}
              setActiveItem={setActiveItem}
            />
          ))}
        </motion.nav>
      </header>

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

export default Navbar;
