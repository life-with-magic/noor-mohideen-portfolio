import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export default function Experience({ experience = [], certifications = [] }) {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Work Experience */}
          <div className="lg:col-span-7 space-y-8">
            <div className="pb-6 border-b border-white/10">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>CAREER TRACK & PRODUCTION SCALE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight font-sans">
                Work Experience
              </h2>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-neutral-950/70 hover:border-purple-500/30 transition-all duration-300 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex items-start gap-3.5">
                      {exp.logo && (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={`${import.meta.env.BASE_URL}${exp.logo}`}
                            alt={exp.company}
                            className="w-full h-full object-contain select-none"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                          {exp.role}
                        </h3>
                        <div className="text-xs font-semibold text-purple-400 font-mono mt-1 flex items-center gap-2 flex-wrap">
                          <span>{exp.company}</span>
                          {exp.location && <span>• {exp.location}</span>}
                        </div>
                        {exp.parentCompany && (
                          <p className="text-[11px] text-slate-400 italic mt-0.5 font-mono">
                            {exp.parentCompany}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-900 border border-white/5 self-start shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{exp.period || exp.dates}</span>
                    </div>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Industry Certifications */}
          <div className="lg:col-span-5 space-y-8">
            <div className="pb-6 border-b border-white/10">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>INDUSTRY VERIFICATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight font-sans">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-5 rounded-2xl border border-white/10 bg-neutral-950/70 hover:border-purple-500/30 transition-all duration-300 flex items-start gap-4 shadow-xl"
                >
                  {cert.logo ? (
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}${cert.logo}`}
                        alt={cert.issuer}
                        className="w-full h-full object-contain select-none"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400">
                      <Award className="w-5 h-5" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-100 leading-snug">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="text-purple-400">{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
