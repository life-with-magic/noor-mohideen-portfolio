import React, { useMemo } from 'react';
import YAML from 'yaml';
import rawYaml from './data/resume.yaml?raw';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SkillsExplorer from './components/SkillsExplorer';
import Experience from './components/Experience';
import EducationCertifications from './components/EducationCertifications';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function App() {
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
    <div className="bg-neutral-950 text-slate-100 min-h-screen relative font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Background Subtle Geometric Matrix & Ambient Lights */}
      <div className="fixed inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.06] pointer-events-none -z-20" />
      <div className="fixed inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950 pointer-events-none -z-10" />

      {/* Naeem Sabir Style Floating Glass Pill Navbar */}
      <Navbar profile={profile} />

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
