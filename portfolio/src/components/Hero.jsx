import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  Download,
  ArrowUpRight,
  Workflow,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Radio,
  CheckCircle2,
  Sparkles,
  GitBranch
} from 'lucide-react';

export default function Hero({ profile = {}, lanes = [], proofPoints = [], isDocked = false }) {
  const [activeLaneId, setActiveLaneId] = useState(lanes[0]?.id || 'agents');
  const [selectedNode, setSelectedNode] = useState('router');

  // Interactive System Nodes configuration
  const systemNodes = [
    {
      id: 'client',
      label: 'Omnichannel Clients',
      sub: 'Desktop, Web, Mobile (Cross-Platform)',
      lane: 'systems',
      metric: '<15ms UI Response',
      icon: Radio,
      color: '#38bdf8',
      details: 'Built cross-platform client interfaces across Web, macOS, Windows, iOS & Android for real-time human-in-the-loop interaction.'
    },
    {
      id: 'router',
      label: 'Dual-Speed Router',
      sub: 'Fast Mode vs Deep-Thinking Engine',
      lane: 'research',
      metric: 'Adaptive Deliberation',
      icon: Zap,
      color: '#06b6d4',
      details: 'Dynamically routes between low-latency immediate responses and deep-thinking scenario analysis with conflict detection.'
    },
    {
      id: 'agents',
      label: 'Autonomous Agent Swarm',
      sub: 'Planner, Synthesizer, Sandbox Executor',
      lane: 'agents',
      metric: '20+ Internal Libraries',
      icon: Workflow,
      color: '#8b5cf6',
      details: 'Multi-agent orchestration that dynamically aggregates context from Jira, GitHub, PRDs and synthesizes first-cut codebases.'
    },
    {
      id: 'mcp',
      label: 'Model Context Protocol (MCP)',
      sub: 'Enterprise Tool Abstraction & BYOLLM',
      lane: 'agents',
      metric: '10+ LLM Providers',
      icon: Cpu,
      color: '#10b981',
      details: 'Custom MCP servers exposing standardized tools, database queries, and secure API boundaries to autonomous agents.'
    },
    {
      id: 'warehouse',
      label: 'Enterprise Data Lake',
      sub: 'Snowflake & Databricks Integration',
      lane: 'systems',
      metric: '200+ Enterprise Orgs',
      icon: Database,
      color: '#f59e0b',
      details: 'Hardened enterprise integration handling multi-tenant analytical queries and secure data warehousing in production.'
    }
  ];

  const activeNode = systemNodes.find(n => n.id === selectedNode) || systemNodes[1];
  const activeLane = lanes.find(l => l.id === activeLaneId) || lanes[0];

  return (
    <section
      id="hero"
      className={`min-h-screen px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${
        isDocked ? 'pt-28 pb-16' : 'pt-0 pb-0 justify-center'
      }`}
    >
      <div className={`max-w-7xl mx-auto w-full transition-all duration-700 ${isDocked ? 'space-y-12' : 'space-y-0'}`}>
        {/* Top Central Portrait & Headline */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center justify-center">
          {/* Central Portrait — Noor Mohideen (Remains proudly in the center) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex flex-col items-center justify-center pb-2 group"
          >
            {/* Ambient Backdrop Glow & Shadow for Seamless Alignment with Background */}
            <div className="absolute -inset-4 rounded-full bg-white/10 blur-2xl pointer-events-none -z-10" />
            <div className="absolute -inset-2 rounded-full bg-black/80 blur-lg pointer-events-none -z-10" />

            {/* Circular Photo Frame with Ambient Shadow & Soft Edge Blending */}
            <div
              id="hero-portrait"
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-neutral-950 ring-1 ring-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),_0_0_40px_rgba(255,255,255,0.08)] group-hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`${import.meta.env.BASE_URL}user.png`}
                alt="Noor Mohideen"
                className="w-full h-full object-cover object-top select-none"
                onError={(e) => {
                  e.currentTarget.src = 'user.png';
                }}
              />
              {/* Soft Inner Rim Vignette to seamlessly blend photo edge with dark background */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_18px_rgba(0,0,0,0.65)] pointer-events-none" />
            </div>
          </motion.div>

          {/* Headline, Kicker, Lede & Action CTAs — Only visible once navbar moves to top */}
          <motion.div
            initial={false}
            animate={
              isDocked
                ? { opacity: 1, y: 0, height: 'auto', pointerEvents: 'auto' }
                : { opacity: 0, y: 25, height: 0, pointerEvents: 'none' }
            }
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: isDocked ? 0.15 : 0 }}
            className="space-y-5 overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-slate-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>{profile.kicker || 'Noor Mohideen • AI Architect & Researcher'}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight leading-[1.08] font-sans">
              {profile.headline || 'I architect autonomous AI systems that reason and scale.'}
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {profile.lede || 'Agentic workflows, Model Context Protocol servers, and reasoning pipelines engineered into production-ready software that survives real enterprise scale.'}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#systems"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 hover:shadow-xl hover:shadow-white/20 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span>Explore Systems</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href={profile.pdfPath || 'resume.pdf'}
                download="Noor_Mohideen_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-700 bg-neutral-950/60 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span>Download Resume PDF</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Zeb AI / Naeem Sabir Style Interactive Lane Tabs & Architecture Visualizer */}
        <motion.div
          initial={false}
          animate={
            isDocked
              ? { opacity: 1, y: 0, height: 'auto', pointerEvents: 'auto' }
              : { opacity: 0, y: 30, height: 0, pointerEvents: 'none' }
          }
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: isDocked ? 0.25 : 0 }}
          className="space-y-12 overflow-hidden"
        >
        {lanes.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="tablist">
              {lanes.map((lane) => {
                const isActive = activeLaneId === lane.id;
                return (
                  <button
                    key={lane.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveLaneId(lane.id)}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-2xl text-left transition-all border ${
                      isActive
                        ? 'border-white/40 bg-neutral-900/90 shadow-lg shadow-white/10'
                        : 'border-white/5 bg-neutral-950/40 hover:bg-neutral-900/50 hover:border-white/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeroLane"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/20 -z-10"
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: lane.accent || '#ffffff' }}
                      />
                      <span className="text-xs sm:text-sm font-bold text-slate-100">
                        {lane.label}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {lane.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive System Architecture Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl border border-white/10 bg-neutral-950/90 p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Visualizer Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-xs font-mono text-slate-400 pl-2">
                architecture_topology.sys • Live Interactive Pipeline
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SYSTEM HEALTHY</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">ACTIVE LANE: {activeLane.label?.toUpperCase()}</span>
            </div>
          </div>

          {/* Interactive Topology Nodes Grid */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {systemNodes.map((node, idx) => {
              const isSelected = selectedNode === node.id;
              const matchesLane = activeLaneId === node.lane;
              const Icon = node.icon;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${
                    isSelected
                      ? 'border-white/60 bg-white/5 shadow-lg shadow-white/10 scale-[1.02]'
                      : matchesLane
                      ? 'border-white/25 bg-neutral-900/80 hover:border-white/40'
                      : 'border-white/5 bg-neutral-900/30 hover:border-white/15'
                  }`}
                >
                  {/* Status chip */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-[10px] font-mono text-slate-400">
                      STEP 0{idx + 1}
                    </span>
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${node.color}15`,
                        borderColor: `${node.color}40`,
                        color: node.color
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Node Title & Sub */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                      {node.label}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {node.sub}
                    </p>
                  </div>

                  {/* Metric footer */}
                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">{node.metric}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Inspector Drawer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-2"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${activeNode.color}20`,
                    borderColor: `${activeNode.color}50`,
                    color: activeNode.color
                  }}
                >
                  <activeNode.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-white uppercase">
                      INSPECTOR: {activeNode.label}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      {activeNode.metric}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-3xl">
                    {activeNode.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <a
                  href="#systems"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-mono transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Proof Points Ribbon */}
          {proofPoints.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3">
              {proofPoints.map((point, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-center gap-2 text-xs font-mono text-slate-300 py-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="truncate">{point}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
