import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('systems');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'systems', 'stack', 'experience', 'education', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'systems', label: 'Systems', href: '#systems' },
    { id: 'stack', label: 'Stack', href: '#stack' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'about', label: 'About', href: '#about' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={`pointer-events-auto transition-all duration-300 w-full max-w-4xl rounded-full border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between shadow-2xl backdrop-blur-xl ${
          isScrolled
            ? 'bg-neutral-950/85 border-cyan-500/20 shadow-cyan-950/30'
            : 'bg-neutral-900/70 border-white/10'
        }`}
      >
        {/* Monogram / Live Status Badge */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 px-2 py-1 rounded-full text-slate-200 hover:text-white transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center font-mono font-bold text-xs text-cyan-300 group-hover:scale-105 transition-transform">
            NM
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
              <span>Noor Mohideen</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">AI Solution Architect</span>
          </div>
        </a>

        {/* Center Pill Links with Sliding Layout Highlight */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-neutral-950/40 border border-white/5">
          {navLinks.map((link) => {
            const isCurrent = activeSection === link.id;
            const isHovered = hoveredSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onMouseEnter={() => setHoveredSection(link.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isCurrent ? 'text-cyan-300 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {/* Active or Hover Sliding Highlight Pill */}
                {isCurrent && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-400/30 -z-10"
                  />
                )}
                {isHovered && !isCurrent && (
                  <motion.div
                    layoutId="hoverNavPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-white/5 -z-10"
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Action: Resume PDF Button */}
        <div className="flex items-center gap-2">
          <a
            href={profile.pdfPath || 'resume.pdf'}
            download="Noor_Mohideen_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-slate-100 text-neutral-950 hover:bg-white hover:shadow-lg hover:shadow-cyan-500/15 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Resume</span>
            <Download className="w-3 h-3 text-neutral-900" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 rounded-3xl bg-neutral-950/95 border border-white/10 p-5 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 md:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-cyan-400">NAVIGATION</span>
              <span className="text-[11px] font-mono text-slate-400">Noor Mohideen</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            ))}

            <div className="pt-2 border-t border-white/10 mt-1">
              <a
                href={profile.pdfPath || 'resume.pdf'}
                download="Noor_Mohideen_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 text-neutral-950 font-semibold text-xs transition-transform active:scale-95"
              >
                <span>Download Resume PDF</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
