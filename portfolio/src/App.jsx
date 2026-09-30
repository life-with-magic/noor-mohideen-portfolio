import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import YAML from 'yaml';
import rawYaml from './data/resume.yaml?raw';

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
  const [isDocked, setIsDocked] = useState(false);

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

  return (
    <div className="text-slate-100 min-h-screen relative font-sans selection:bg-white/20 selection:text-white">
      {/* Only Hexagon Background with Top-Left to Bottom-Right Sweep */}
      <HexagonBackground
        className="fixed inset-0 pointer-events-auto -z-10"
        hexagonSize={75}
        hexagonMargin={3}
        onSweepComplete={() => setIsDocked(true)}
      />

      {/* Unified Circular-to-Top Navbar */}
      <Navbar
        profile={profile}
        isDocked={isDocked}
        setIsDocked={setIsDocked}
      />

      {/* Main Content Narrative */}
      <main id="main-content">
        {/* Interactive Hero with Lane Switcher & System Architecture Visualizer */}
        <Hero
          profile={profile}
          lanes={lanes}
          proofPoints={proof_points}
          isDocked={isDocked}
          setIsDocked={setIsDocked}
        />

        {/* Subsequent Sections — only visible once navbar moves to top */}
        <motion.div
          animate={{
            opacity: isDocked ? 1 : 0,
            pointerEvents: isDocked ? 'auto' : 'none'
          }}
          transition={{ duration: 0.6, delay: isDocked ? 0.3 : 0 }}
        >
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

          {/* Editorial Contact & Provenance Outro */}
          <ContactSection profile={profile} />
        </motion.div>
      </main>
    </div>
  );
}
