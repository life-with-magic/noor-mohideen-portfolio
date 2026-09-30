import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Education({ education = [] }) {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
            Education
          </h2>
        </div>

        {/* Full Width Education Cards */}
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-neutral-950/70 hover:border-purple-500/30 transition-all duration-300 space-y-6 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {edu.logo && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}${edu.logo}`}
                        alt={edu.institution}
                        className="w-full h-full object-contain select-none"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                      {edu.degree}
                    </h3>
                    <div className="text-xs font-semibold text-purple-400 font-mono mt-1 flex items-center gap-2">
                      <span>{edu.institution}</span>
                      {edu.location && <span>• {edu.location}</span>}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-white/5 self-start">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{edu.period || edu.dates}</span>
                </div>
              </div>

              {edu.details && edu.details.length > 0 && (
                <ul className="space-y-3 pt-2">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {edu.courses && edu.courses.length > 0 && (
                <div className="pt-4 border-t border-white/5 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Specialized Coursework:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/5 text-xs font-mono text-slate-300 hover:border-purple-500/20 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
