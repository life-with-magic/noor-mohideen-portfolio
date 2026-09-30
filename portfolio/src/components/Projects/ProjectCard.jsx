import React from 'react';
import { motion } from 'framer-motion';
import { Github, ChevronDown, Lock } from 'lucide-react';
import { ProjectDrawer } from './ProjectDrawer';

export function ProjectCard({ project, idx, isExpanded, toggleExpand }) {
  const accent = project.accentColor || '#06b6d4';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="rounded-3xl border border-white/10 bg-neutral-950/80 shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
    >
      {/* Browser Top Chrome */}
      <div className="px-5 py-3.5 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between gap-4">
        {/* Traffic Light Dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Browser URL Pill */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-950/80 border border-white/5 text-[11px] font-mono text-slate-400">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-300">https://</span>
          <span>{project.browserUrl || `${project.id}.systems.ai`}</span>
        </div>

        {/* System Badge */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider font-semibold">
          <span
            className="px-2.5 py-0.5 rounded-full border uppercase"
            style={{
              backgroundColor: `${accent}15`,
              borderColor: `${accent}40`,
              color: accent
            }}
          >
            {project.badge || 'PRODUCTION SYSTEM'}
          </span>
          <span className="text-slate-500 hidden sm:inline">#{project.num || `0${idx + 1}`}</span>
        </div>
      </div>

      {/* Card Main Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Title & Organization Meta */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-white font-semibold">{project.organization}</span>
              <span>•</span>
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.period}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Expand CTA Button */}
          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/10 bg-neutral-900/60 hover:bg-neutral-800 text-slate-300 hover:text-white transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => toggleExpand(project.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-medium transition-all"
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
        </div>

        {/* High-level Summary Preview */}
        <p className="text-sm text-slate-400 leading-relaxed max-w-4xl line-clamp-3">
          {project.about}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {project.tech?.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 rounded-lg bg-neutral-900/90 border border-white/5 text-xs font-mono text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Animated Deep Dive Accordion Drawer */}
        <ProjectDrawer project={project} isExpanded={isExpanded} />
      </div>
    </motion.article>
  );
}
