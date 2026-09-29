import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Sparkles, Layers, Cpu, Database, Code2, ArrowUpRight } from 'lucide-react';

export default function SkillsExplorer({ stackCategories = [] }) {
  const [activeCategoryId, setActiveCategoryId] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Category Tabs
  const categories = useMemo(() => {
    return [
      { id: 'ALL', name: 'All Capabilities', stat: 'Comprehensive Stack' },
      ...stackCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        stat: cat.stat
      }))
    ];
  }, [stackCategories]);

  // Flatten tools with category metadata for filtering
  const allTools = useMemo(() => {
    let list = [];
    stackCategories.forEach(cat => {
      cat.tools?.forEach(tool => {
        list.push({
          ...tool,
          categoryId: cat.id,
          categoryName: cat.name
        });
      });
    });
    return list;
  }, [stackCategories]);

  // Filter based on active category & search query
  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesCategory = activeCategoryId === 'ALL' || tool.categoryId === activeCategoryId;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tag?.toLowerCase().includes(q) ||
        tool.exp?.toLowerCase().includes(q) ||
        tool.categoryName.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [allTools, activeCategoryId, searchQuery]);

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>STACK MATRIX & SPECIALIZATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
              Technical Capabilities
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Engineered proficiencies spanning autonomous multi-agent orchestration, machine learning systems, high-concurrency microservices, and enterprise data warehouses.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. MCP, PyTorch, Rust)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-neutral-900 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-white/10 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Animated Category Tabs with Framer Motion layoutId */}
        <div className="flex flex-wrap gap-2" role="tablist">
          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`relative px-4 py-2.5 rounded-2xl text-xs font-mono transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStackCategoryPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-2xl bg-cyan-950/60 border border-cyan-400/30 -z-10 shadow-lg shadow-cyan-950/40"
                  />
                )}
                <span>{cat.name}</span>
                {cat.stat && (
                  <span className="hidden sm:inline-block ml-2 text-[10px] text-slate-500">
                    • {cat.stat}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tool Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredTools.map((tool) => {
              const color = tool.color || '#06b6d4';

              return (
                <motion.div
                  key={`${tool.categoryId}-${tool.name}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group relative p-5 rounded-2xl border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/90 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top accent gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: color }}
                  />

                  <div>
                    {/* Header: Category Tag & Experience Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {tool.tag || tool.categoryName}
                      </span>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border"
                        style={{
                          backgroundColor: `${color}15`,
                          borderColor: `${color}35`,
                          color: color
                        }}
                      >
                        {tool.exp || 'Advanced'}
                      </span>
                    </div>

                    {/* Tool Name */}
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h3>
                  </div>

                  {/* Bottom indicator */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{tool.categoryName}</span>
                    <span
                      className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="py-12 text-center text-slate-400 font-mono text-xs">
            No capabilities matched your search term "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
}
