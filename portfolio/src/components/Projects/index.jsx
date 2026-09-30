import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, ChevronLeft, ChevronRight, Lock, Github, ChevronDown, Cpu, Sparkles } from 'lucide-react';
import { ProjectDrawer } from './ProjectDrawer';

export function Projects({ projects = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeProject = projects[activeIdx] || projects[0] || {};
  const accent = activeProject.accentColor || '#a855f7';

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setIsExpanded(false);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setIsExpanded(false);
  };

  return (
    <section id="systems" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
              <Workflow className="w-3.5 h-3.5" />
              <span>SELECTED WORKS & ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Selected production AI architectures and research systems. Each system is engineered for autonomous reasoning, factual grounding, and resilience at scale.
            </p>
          </div>
        </div>

        {/* 2-Column Motion Carousel & Active Project Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Motion Carousel Slide Selector */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>PROJECTS</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {activeIdx + 1} / {projects.length}
                </div>
              </div>

              {/* Vertical Stack Carousel Slides */}
              <div className="space-y-3">
                {projects.map((proj, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <motion.button
                      key={proj.id}
                      onClick={() => {
                        setActiveIdx(idx);
                        setIsExpanded(false);
                      }}
                      animate={{
                        scale: isActive ? 1.02 : 0.98,
                        opacity: isActive ? 1 : 0.65
                      }}
                      whileHover={{ scale: 1.01, opacity: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? 'bg-neutral-900/90 border-purple-500/50 shadow-lg shadow-purple-500/10'
                          : 'bg-neutral-950/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCarouselSlide"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-transparent pointer-events-none"
                        />
                      )}
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <span className="text-xs font-mono text-purple-400 font-bold">
                          #{proj.num || `0${idx + 1}`}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {proj.organization}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-mono">
                        {proj.tagline}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Controls & Animated Pill Dots */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-white/10 bg-neutral-900/80 hover:bg-neutral-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Animated Pill Dots */}
                <div className="flex items-center gap-2">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveIdx(idx);
                        setIsExpanded(false);
                      }}
                      className="relative p-1 focus:outline-none"
                    >
                      <motion.div
                        animate={{
                          width: idx === activeIdx ? 24 : 8,
                          backgroundColor: idx === activeIdx ? '#a855f7' : 'rgba(255, 255, 255, 0.2)'
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="h-2 rounded-full cursor-pointer"
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-white/10 bg-neutral-900/80 hover:bg-neutral-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Active Project Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-white/10 bg-neutral-950/80 shadow-2xl overflow-hidden"
              >
                {/* Browser Top Chrome */}
                <div className="px-5 py-3.5 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between gap-4">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  {/* Centered Browser URL Pill */}
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/90 border border-white/10 text-xs font-mono text-slate-400 overflow-hidden truncate">
                    <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="text-white font-semibold truncate">{activeProject.organization}</span>
                    <span className="shrink-0">•</span>
                    <span className="shrink-0">{activeProject.location}</span>
                  </div>

                  {/* Right Side Duration Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 border border-white/10 text-[11px] font-mono text-purple-300 shrink-0">
                    <span>{activeProject.period}</span>
                  </div>
                </div>

                {/* Card Main Content Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-purple-400 font-medium">
                      {activeProject.tagline}
                    </p>
                  </div>

                  {/* Bullet Points Highlights */}
                  <div className="space-y-3">
                    {Array.isArray(activeProject.about)
                      ? activeProject.about.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                            <span>{bullet}</span>
                          </div>
                        ))
                      : typeof activeProject.about === 'string'
                      ? activeProject.about
                          .split('\n\n')
                          .map((p) => p.trim())
                          .filter(Boolean)
                          .map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                              <span>{bullet}</span>
                            </div>
                          ))
                      : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {activeProject.tech?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-neutral-900 border border-white/5 text-xs font-mono text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-center pt-2">
                    <button
                      onClick={() => setIsExpanded((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white text-xs font-mono font-medium transition-all cursor-pointer"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Deep Dive Specs'}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </button>
                  </div>

                  <ProjectDrawer project={activeProject} isExpanded={isExpanded} />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
