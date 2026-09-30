import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { FlipCard } from './FlipCard';

export function HeroHeader({ profile = {}, isDocked = false }) {
  return (
    <div className="text-center max-w-3xl mx-auto flex flex-col items-center justify-center">
      {/* Central Circular Photo Frame — Displayed during Initial Intro/Orbit Mode */}
      {!isDocked && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex flex-col items-center justify-center pb-2 group"
        >
          {/* Ambient Backdrop Glow & Shadow */}
          <div className="absolute -inset-4 rounded-full bg-white/10 blur-2xl pointer-events-none -z-10" />
          <div className="absolute -inset-2 rounded-full bg-black/80 blur-lg pointer-events-none -z-10" />

          {/* Clean Circular Photo */}
          <div
            id="hero-portrait"
            className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-neutral-950 ring-1 ring-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),_0_0_40px_rgba(255,255,255,0.08)] group-hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`${import.meta.env.BASE_URL}user.png`}
              alt="Noor Mohideen"
              className="w-full h-full object-cover object-top select-none"
              onError={(e) => {
                e.currentTarget.src = 'user.png';
              }}
            />
            {/* Soft Inner Rim Vignette */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_18px_rgba(0,0,0,0.65)] pointer-events-none" />
          </div>
        </motion.div>
      )}

      {/* Main Page Content (Headline, FlipCard & CTAs) — Only visible once navbar moves to top/docked */}
      <motion.div
        initial={false}
        animate={
          isDocked
            ? { opacity: 1, y: 0, height: 'auto', pointerEvents: 'auto' }
            : { opacity: 0, y: 25, height: 0, pointerEvents: 'none' }
        }
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: isDocked ? 0.15 : 0 }}
        className="space-y-5 overflow-hidden w-full"
      >
        {/* FlipCard only appears on the main page */}
        <FlipCard profile={profile} isDocked={isDocked} />

        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-slate-200 text-sm sm:text-base font-mono font-medium shadow-md">
          <span>{profile.kicker || 'Noor Mohideen S • AI/ML Solution Architect & Engineer'}</span>
        </div>

        <p className="text-center text-base sm:text-lg lg:text-xl text-slate-300 max-w-4xl mx-auto font-normal leading-relaxed">
          AI Solution Architect currently broadening my expertise through an MSc in AI at the University of Edinburgh, with hands-on experience in AI engineering and designing scalable, production-grade AI systems. Designed 4+ system architectures for AI solutions across B2B and B2C environments with R&D research & cross-functional skills.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`${import.meta.env.BASE_URL}${profile.pdfPath || 'resume.pdf'}`}
            download="Noor_Mohideen_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 hover:shadow-xl hover:shadow-white/20 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span>Download Resume</span>
            <Download className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
