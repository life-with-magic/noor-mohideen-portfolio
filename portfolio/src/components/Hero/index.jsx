import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Cpu, Database, Zap, Radio } from 'lucide-react';
import { HeroHeader } from './HeroHeader';
import { SystemTopology } from './SystemTopology';

export function Hero({ profile = {}, lanes = [], proofPoints = [], isDocked = false }) {
  const [activeLaneId, setActiveLaneId] = useState(lanes[0]?.id || 'agents');
  const [selectedNode, setSelectedNode] = useState('router');

  // Interactive System Nodes configuration
  const systemNodes = [
    {
      id: 'client',
      label: 'Omnichannel Clients',
      sub: 'Desktop, Web, Mobile (Cross-Platform)',
      lane: 'systems',
      metric: '<15ms UI Response',
      icon: Radio,
      color: '#38bdf8',
      details: 'Built cross-platform client interfaces across Web, macOS, Windows, iOS & Android for real-time human-in-the-loop interaction.'
    },
    {
      id: 'router',
      label: 'Dual-Speed Router',
      sub: 'Fast Mode vs Deep-Thinking Engine',
      lane: 'research',
      metric: 'Adaptive Deliberation',
      icon: Zap,
      color: '#06b6d4',
      details: 'Dynamically routes between low-latency immediate responses and deep-thinking scenario analysis with conflict detection.'
    },
    {
      id: 'agents',
      label: 'Autonomous Agent Swarm',
      sub: 'Planner, Synthesizer, Sandbox Executor',
      lane: 'agents',
      metric: '20+ Internal Libraries',
      icon: Workflow,
      color: '#8b5cf6',
      details: 'Multi-agent orchestration that dynamically aggregates context from Jira, GitHub, PRDs and synthesizes first-cut codebases.'
    },
    {
      id: 'mcp',
      label: 'Model Context Protocol (MCP)',
      sub: 'Enterprise Tool Abstraction & BYOLLM',
      lane: 'agents',
      metric: '10+ LLM Providers',
      icon: Cpu,
      color: '#10b981',
      details: 'Custom MCP servers exposing standardized tools, database queries, and secure API boundaries to autonomous agents.'
    },
    {
      id: 'warehouse',
      label: 'Enterprise Data Lake',
      sub: 'Snowflake & Databricks Integration',
      lane: 'systems',
      metric: '200+ Enterprise Orgs',
      icon: Database,
      color: '#f59e0b',
      details: 'Hardened enterprise integration handling multi-tenant analytical queries and secure data warehousing in production.'
    }
  ];

  const activeLane = lanes.find(l => l.id === activeLaneId) || lanes[0];

  return (
    <section
      id="hero"
      className={`min-h-screen px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${
        isDocked ? 'pt-28 pb-16' : 'pt-0 pb-0 justify-center'
      }`}
    >
      <div className={`max-w-7xl mx-auto w-full transition-all duration-700 ${isDocked ? 'space-y-6' : 'space-y-0'}`}>
        <HeroHeader profile={profile} isDocked={isDocked} />
      </div>
    </section>
  );
}

export default Hero;
