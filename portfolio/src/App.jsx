import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import YAML from 'yaml';
import rawYaml from './data/resume.yaml?raw';

import RadialIntro from './components/RadialIntro';
import HexagonBackground from './components/HexagonBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SkillsExplorer from './components/SkillsExplorer';
import Experience from './components/Experience';
import EducationCertifications from './components/EducationCertifications';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [showRadialIntro, setShowRadialIntro] = useState(true);

  const resumeData = useMemo(() => {
    try {
      return YAML.parse(rawYaml) || {};
    } catch (err) {
      console.error('[YAML Loader] Error parsing resume.yaml:', err);
      return {};
    }
  }, []);

  const {
    profile = {},
    lanes = [],
    proof_points = [],
    stack_categories = [],
    projects = [],
    experience = [],
    education = [],
    certifications = [],
    interests = [],
    languages = []
  } = resumeData;

  const handleIntroComplete = (targetHref) => {
    setShowRadialIntro(false);
    if (targetHref && targetHref.startsWith('#')) {
      setTimeout(() => {
        const el = document.querySelector(targetHref);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <div className="bg-neutral-950 text-slate-100 min-h-screen relative font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Hexagon Background (Animate UI Hexagon Background with Denis Klak interactive grid) */}
      <HexagonBackground
        className="fixed inset-0 pointer-events-auto -z-20 opacity-80"
        hexagonSize={75}
        hexagonMargin={3}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950/90 pointer-events-none -z-10" />

      {/* Radial Intro Screen (Animate UI Community Radial Intro component with user.png & Nav Orbits) */}
      <AnimatePresence>
        {showRadialIntro && (
          <RadialIntro
            profile={profile}
            onComplete={handleIntroComplete}
          />
        )}
      </AnimatePresence>

      {/* Naeem Sabir Style Floating Glass Pill Navbar */}
      <Navbar
        profile={profile}
        onOpenIntro={() => setShowRadialIntro(true)}
      />

      {/* Main Content Narrative */}
      <main id="main-content">
        {/* Interactive Hero with Lane Switcher & System Architecture Visualizer */}
        <Hero
          profile={profile}
          lanes={lanes}
          proofPoints={proof_points}
        />

        {/* Selected Production AI Systems & Research Case Studies with Expandable Drawers */}
        <Projects projects={projects} />

        {/* Capabilities & Interactive Stack Matrix */}
        <SkillsExplorer stackCategories={stack_categories} />

        {/* Production Career Experience */}
        <Experience experience={experience} />

        {/* Academic Foundation & Databricks Certifications */}
        <EducationCertifications
          education={education}
          certifications={certifications}
        />

        {/* Profile Narrative, Disciplines Beyond Code & Languages */}
        <AboutSection
          profile={profile}
          interests={interests}
          languages={languages}
        />
      </main>

      {/* Editorial Contact & Provenance Outro */}
      <ContactSection profile={profile} />
    </div>
  );
}
