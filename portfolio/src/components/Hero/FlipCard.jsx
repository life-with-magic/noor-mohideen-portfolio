import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  MapPin,
  RotateCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function FlipCard({ profile = {}, isDocked = false }) {
  const [isRightFlipped, setIsRightFlipped] = useState(false);

  useEffect(() => {
    const handleFlipEvent = () => {
      setIsRightFlipped(true);
    };
    window.addEventListener('flip-right-card', handleFlipEvent);
    return () => window.removeEventListener('flip-right-card', handleFlipEvent);
  }, []);

  const email = profile.email || 'noormohideen61@gmail.com';
  const phone = profile.phone || '+44 7533971320';
  const github = profile.github || 'life-with-magic';
  const githubUrl = profile.githubUrl || 'https://github.com/life-with-magic';
  const linkedin = profile.linkedin || 'noor-mohideen';
  const linkedinUrl = profile.linkedinUrl || 'https://linkedin.com/in/noor-mohideen';
  const pdfPath = profile.pdfPath || 'resume.pdf';
  const website = profile.website || 'https://noormohideen.works';
  const location = profile.location || 'Edinburgh, UK • Chennai, India';
  const summary = 'Work Until dream becomes reality. Engineer until the impossible is possible. Build until the world is better than you found it.';
  const lede = profile.lede || 'Agentic workflows, Model Context Protocol servers, and reasoning pipelines engineered into production-ready software that survives real enterprise scale.';

  return (
    <div id="hero-flipcards" className="w-full max-w-4xl mx-auto my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
      {/* LEFT DUAL FLIP CARD */}
      <div className="perspective-1000 w-full max-w-[340px] h-[400px] mx-auto group cursor-pointer">
        <motion.div
          className="relative w-full h-full preserve-3d transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
        >
          {/* LEFT FRONT: Pure Full-Bleed Photo Card */}
          <div className="absolute inset-0 w-full h-full rounded-3xl border border-purple-500/40 shadow-2xl backface-hidden overflow-hidden group/photo">
            <img
              src={`${import.meta.env.BASE_URL}user.png`}
              alt="Noor Mohideen"
              className="w-full h-full object-cover object-top select-none group-hover/photo:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = 'user.png';
              }}
            />
            {/* Subtle Inner Rim Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_25px_rgba(0,0,0,0.6)] pointer-events-none" />
          </div>

          {/* LEFT BACK: Contact Details (Rotated 180deg) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-neutral-950/95 border border-purple-500/40 p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between backface-hidden [transform:rotateY(180deg)] overflow-hidden text-left">
            {/* Contact List */}
            <div className="space-y-3 text-xs font-mono my-auto">
              {/* Location */}
              <div className="flex items-center gap-2.5 text-slate-300 truncate">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{location}</span>
              </div>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{email}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{phone}</span>
              </a>

              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{github}</span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{linkedin}</span>
              </a>

              {/* Website */}
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{website}</span>
              </a>
            </div>

          </div>
        </motion.div>
      </div>

      {/* RIGHT DUAL FLIP CARD */}
      <div 
        onClick={() => setIsRightFlipped((prev) => !prev)}
        onMouseEnter={() => {
          if (!isRightFlipped) setIsRightFlipped(true);
        }}
        onMouseLeave={() => {
          setIsRightFlipped(false);
        }}
        className="perspective-1000 w-full max-w-[340px] h-[400px] mx-auto cursor-pointer"
      >
        <motion.div
          animate={{ rotateY: isRightFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full preserve-3d"
        >
          {/* RIGHT FRONT: Clean Pure Quote Card */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-neutral-950/90 border border-white/15 p-6 sm:p-7 shadow-2xl backdrop-blur-xl flex items-center justify-center backface-hidden overflow-hidden text-left">
            {/* Ambient Front Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Single Quote Content — 3 Line Formatting */}
            <div className="relative z-10 space-y-2">
              <p className="text-base sm:text-lg text-slate-100 leading-snug font-sans font-medium italic tracking-wide">
                "Work until dream becomes reality.
              </p>
              <p className="text-base sm:text-lg text-slate-100 leading-snug font-sans font-medium italic tracking-wide">
                Engineer until the impossible is possible.
              </p>
              <p className="text-base sm:text-lg text-slate-100 leading-snug font-sans font-medium italic tracking-wide">
                Build until the world is better than you found it."
              </p>
            </div>
          </div>

          {/* RIGHT BACK: Contact Details (On Flip / Rotated 180deg) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-neutral-950/95 border border-purple-500/40 p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between backface-hidden [transform:rotateY(180deg)] overflow-hidden text-left">
            {/* Contact List */}
            <div className="space-y-3 text-xs font-mono my-auto">
              {/* Location */}
              <div className="flex items-center gap-2.5 text-slate-300 truncate">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{location}</span>
              </div>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{email}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{phone}</span>
              </a>

              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{github}</span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{linkedin}</span>
              </a>

              {/* Website */}
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group/item truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover/item:border-purple-400/50 shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{website}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
