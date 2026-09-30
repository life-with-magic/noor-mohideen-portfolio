import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function SystemTopology({
  systemNodes = [],
  selectedNode,
  setSelectedNode,
  activeLaneId,
  activeLane = {},
  proofPoints = [],
}) {
  const activeNode = systemNodes.find(n => n.id === selectedNode) || systemNodes[1];

  return (
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
  );
}
