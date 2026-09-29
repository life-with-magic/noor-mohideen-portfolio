import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, ExternalLink, Sparkles, Target, Compass, Globe } from 'lucide-react';

export default function AboutSection({ profile = {}, interests = [], languages = [] }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const phoneValue = profile.phone || profile.mobile || '';

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (phoneValue) {
      navigator.clipboard.writeText(phoneValue);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Greeting & Identity Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="pb-6 border-b border-white/10">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>PROFILE & BACKGROUND</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
                About Noor
              </h2>
            </div>

            {/* Profile Summary Card */}
            <div className="rounded-3xl bg-neutral-950/80 border border-white/10 p-6 space-y-5 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-teal-500/20 border border-cyan-400/40 flex items-center justify-center font-mono font-bold text-xl text-cyan-300">
                  NM
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {profile.fullName || 'Noor Mohideen'}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    {profile.title || 'AI Solution Architect'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {profile.location || 'Edinburgh, UK • Chennai, India'}
                  </p>
                </div>
              </div>

              {/* Quick Contact copy triggers */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-slate-300 transition-colors"
                >
                  <span className="truncate">{profile.email}</span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                </button>

                {phoneValue && (
                  <button
                    onClick={handleCopyPhone}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-slate-300 transition-colors"
                  >
                    <span>{phoneValue}</span>
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Beyond Code */}
          <div className="lg:col-span-8 space-y-10">
            {/* Bio Narrative */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                ENGINEERING PHILOSOPHY & BACKGROUND
              </h3>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                {profile.summary}
              </p>
            </div>

            {/* Interests & Disciplines Beyond Code */}
            {interests.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DISCIPLINES & INTERESTS BEYOND CODE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interests.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 space-y-1 hover:border-cyan-500/20 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{item.name}</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SPOKEN LANGUAGES</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {languages.map((lang, lIdx) => (
                    <div
                      key={lIdx}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-white/5 text-xs font-mono text-slate-300 flex items-center gap-2"
                    >
                      <span className="font-semibold text-slate-100">{lang.language}</span>
                      <span className="text-slate-500">• {lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
