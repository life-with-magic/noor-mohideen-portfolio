import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ChevronDown,
  Layers,
  Cpu,
  CheckCircle2,
  Workflow,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  Database,
  Lock,
  Globe
} from 'lucide-react';

export default function Projects({ projects = [] }) {
  // Allow toggling deep dive for any project
  const [expandedId, setExpandedId] = useState(projects[0]?.id || 'decision-agent');

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="systems" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 mb-2">
              <Workflow className="w-3.5 h-3.5" />
              <span>PRODUCTION SYSTEMS & RESEARCH</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
              Architectural Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Selected production AI architectures and research systems. Each system is engineered for autonomous reasoning, factual grounding, and resilience at scale.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {projects.length} CORE SYSTEM ARCHITECTURES
          </div>
        </div>

        {/* Project Browser Cards List */}
        <div className="space-y-8">
          {projects.map((project, idx) => {
            const isExpanded = expandedId === project.id;
            const accent = project.accentColor || '#06b6d4';

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl border border-white/10 bg-neutral-950/80 shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                {/* Browser Top Chrome (macOS window style from Naeem Sabir & Zeb AI) */}
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
                        <span>{isExpanded ? 'Collapse Architecture' : 'Deep Dive Specs'}</span>
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

                  {/* Animated Deep Dive Accordion Drawer (Inspired by PDF Architectural Case Study format) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-6 mt-6 border-t border-white/10"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-900/40 p-6 sm:p-7 rounded-2xl border border-white/5">
                          {/* Column 1: Main Idea & Strategy (PDF page structure) */}
                          <div className="lg:col-span-8 space-y-6">
                            {/* MAIN IDEA */}
                            <div className="space-y-2">
                              <div className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>MAIN IDEA & SYSTEM PURPOSE</span>
                              </div>
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {project.about}
                              </p>
                            </div>

                            {/* ENGINEERING BREAKTHROUGHS */}
                            <div className="space-y-3 pt-4 border-t border-white/5">
                              <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                                <Cpu className="w-3.5 h-3.5" />
                                <span>ENGINEERING HIGHLIGHTS & ARCHITECTURE</span>
                              </div>
                              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                                {project.id === 'decision-agent' && (
                                  <>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                      <span>Strict delineation of verifiable facts (source-backed) from operational assumptions to deliver fully auditable recommendations.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                      <span>Adaptive dual-speed routing engine dynamically toggles between low-latency Faster Mode and Deep-Thinking deliberation.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                      <span>Multi-Criteria Decision Analysis (MCDA) framework resolving underspecified constraints via proactive user querying.</span>
                                    </li>
                                  </>
                                )}

                                {project.id === 'coding-pipeline' && (
                                  <>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                      <span>Dynamic ingestion synthesizing Jira stories, GitHub repos, OneDrive PRDs, and client emails into unified query context.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                      <span>Autonomous code-generation workflows synthesizing multi-source requirements into high-quality first-cut codebases.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                      <span>Extensible plug-and-play adapter layer supporting dynamic client data sources accessible via desktop and mobile apps.</span>
                                    </li>
                                  </>
                                )}

                                {project.id === 'mcp-warehousing' && (
                                  <>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                      <span>Custom Model Context Protocol (MCP) servers enabling autonomous agents to safely query Snowflake and Databricks.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                      <span>Modular ecosystem of 20+ internal Python libraries, authoring 7 core libraries from scratch for inter-agent workflows.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                      <span>Provider-agnostic 'Bring Your Own LLM' (BYOLLM) abstraction supporting 10+ LLMs, scaled into production across 200+ orgs.</span>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* Column 2: Architectural Specs & Meta Info (PDF "INFO" Block) */}
                          <div className="lg:col-span-4 space-y-5 lg:border-l lg:border-white/5 lg:pl-8">
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                              SYSTEM SPECIFICATIONS
                            </div>

                            <div className="space-y-3 text-xs font-mono">
                              <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">DOMAIN</span>
                                <span className="text-slate-200">{project.badge}</span>
                              </div>

                              <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">ORGANIZATION</span>
                                <span className="text-slate-200">{project.organization}</span>
                              </div>

                              <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">LOCATION</span>
                                <span className="text-slate-200">{project.location}</span>
                              </div>

                              <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">TIMELINE</span>
                                <span className="text-slate-200">{project.period}</span>
                              </div>

                              <div className="flex justify-between py-1.5 border-b border-white/5">
                                <span className="text-slate-400">STATUS</span>
                                <span className="text-emerald-400">PRODUCTION VERIFIED</span>
                              </div>
                            </div>

                            {/* GitHub Action */}
                            {project.githubUrl && (
                              <div className="pt-2">
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-mono font-medium transition-colors"
                                >
                                  <span>View Code & Architecture</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
