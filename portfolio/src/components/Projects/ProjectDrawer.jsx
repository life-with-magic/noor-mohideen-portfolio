import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function ProjectDrawer({ project, isExpanded }) {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden pt-6 mt-6 border-t border-white/10"
        >
          <div className="bg-neutral-900/40 p-6 sm:p-7 rounded-2xl border border-white/5 space-y-6">
            {/* MAIN IDEA */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MAIN IDEA & SYSTEM PURPOSE</span>
              </div>
              <div className="space-y-2.5">
                {(() => {
                  const bullets = Array.isArray(project.details) ? project.details
                    : Array.isArray(project.about) ? project.about
                    : null;
                  return bullets ? (
                    bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-300 leading-relaxed">{project.about}</p>
                  );
                })()}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
