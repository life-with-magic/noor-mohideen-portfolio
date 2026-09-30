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
        <div className="space-y-12">

          <div className="lg:col-span-8 space-y-10">
            {/* Interests & Disciplines Beyond Code */}
            {interests.length > 0 && (
              <div className="">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 font-bold pb-6">
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
                  Disciplines & Interests Beyond Code
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interests.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 space-y-1 hover:border-white/20 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
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
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight font-sans">
                  Spoken Languages
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {languages.map((lang, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-4 rounded-2xl bg-neutral-950/60 border border-white/5 space-y-1 hover:border-white/20 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span>{lang.language}</span>
                      </h4>
                      <p className="text-xs text-slate-400">{lang.proficiency}</p>
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
