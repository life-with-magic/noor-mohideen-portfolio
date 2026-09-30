import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, MapPin, Calendar, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function Experience({ experience = [] }) {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRACK & PRODUCTION SCALE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
            Work Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Leading AI solution architecture and research initiatives from initial design through multi-tenant production deployment.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-neutral-950/70 hover:border-white/20 transition-all duration-300 space-y-6 shadow-xl"
            >
              {/* Header: Role, Company, Location, Period */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                      {exp.role}
                    </h3>
                    <span className="text-slate-400 font-normal">at</span>
                    <span className="px-3 py-1 rounded-xl bg-white/10 text-white font-semibold font-mono text-sm border border-white/20">
                      {exp.company}
                    </span>
                  </div>

                  {exp.parentCompany && (
                    <p className="text-xs text-slate-400 italic mt-1 font-mono">
                      {exp.parentCompany}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/5 text-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.period || exp.dates}</span>
                  </div>

                  {exp.location && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights Bullet Points */}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-3 pt-2">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
