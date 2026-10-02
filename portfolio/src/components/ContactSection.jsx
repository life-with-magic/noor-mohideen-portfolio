import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, ArrowUpRight, ArrowUp, Github, Linkedin, Download, Sparkles } from 'lucide-react';

export default function ContactSection({ profile = {} }) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-neutral-950 text-slate-400 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Heading Block */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LET'S BUILD INTELLIGENT SYSTEMS</span>
          </div>

          <h2 className="text-6xl sm:text-7xl lg:text-9xl font-black text-slate-100 tracking-tight font-sans">
            Thanks.
          </h2>
        </div>

        {/* Contact Action Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email button */}
          <button
            onClick={handleCopyEmail}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-cyan-500/30 transition-all text-left group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>EMAIL</span>
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />}
            </div>
            <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 truncate">
              {profile.email || 'noormohideen61@gmail.com'}
            </div>
          </button>

          {/* Phone button */}
          {phoneValue && (
            <button
              onClick={handleCopyPhone}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-cyan-500/30 transition-all text-left group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>DIRECT LINE</span>
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />}
              </div>
              <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                {phoneValue}
              </div>
            </button>
          )}

          {/* Resume PDF download */}
          <a
            href="https://github.com/life-with-magic/noor-mohideen-resume/blob/resume/resume.pdf"
            download="Noor_Mohideen_Resume.pdf"
            className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-cyan-500/30 transition-all text-left group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>FULL RESUME</span>
              <Download className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
            </div>
            <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-300">
              Download PDF Document
            </div>
          </a>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-10 border-t border-white/10 text-xs font-mono">
          {/* Socials */}
          <div className="flex items-center gap-4">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            )}

            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            )}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors self-start sm:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-slate-600">
          <div>
            © {new Date().getFullYear()} Noor Mohideen • All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
