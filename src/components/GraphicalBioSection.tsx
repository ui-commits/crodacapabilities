import React, { useState } from 'react';
import { BIO_STORY_PHASES } from '../data';
import { BioStoryPhase } from '../types';
import {
  Boxes,
  Code2,
  Compass,
  Cpu,
  ArrowRight,
  Sparkles,
  GitCommit,
  Workflow,
  CheckCircle2,
  Eye,
  Layers,
  Terminal,
} from 'lucide-react';

export const GraphicalBioSection: React.FC = () => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('bio-01');
  const activePhase = BIO_STORY_PHASES.find((p) => p.id === selectedPhaseId) || BIO_STORY_PHASES[0];

  const getIcon = (type: BioStoryPhase['iconType']) => {
    switch (type) {
      case 'distribution':
        return <Boxes className="w-4 h-4" />;
      case 'code':
        return <Code2 className="w-4 h-4" />;
      case 'atlas':
        return <Compass className="w-4 h-4" />;
      case 'runtime':
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="story"
      className="space-y-8"
    >
      <div>
        <div
          className="text-[11px] font-mono uppercase tracking-[0.08em] mb-2.5 flex items-center justify-between"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>02 — Graphical Biography &amp; Systems Trajectory</span>
          <span className="text-[10px] font-bold text-[var(--state-active)]">INTERACTIVE TIMELINE</span>
        </div>

        <h2
          className="text-2xl sm:text-[28px] font-bold tracking-tight mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          From Supply Chain Logistics to Agent Runtimes
        </h2>

        <p
          className="text-[15px] leading-relaxed max-w-[68ch]"
          style={{ color: 'var(--text-secondary)' }}
        >
          An interactive trajectory tracking the transition from physical queuing theory and stochastic logistics
          at Texas A&amp;M, to state machines, 19 Atlas artifacts, and distributed agent execution.
        </p>
      </div>

      {/* Interactive Step Sequence Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {BIO_STORY_PHASES.map((phase) => {
          const isSelected = phase.id === selectedPhaseId;
          return (
            <button
              key={phase.id}
              onClick={() => setSelectedPhaseId(phase.id)}
              className="text-left p-4 rounded-[var(--radius-panel)] border transition-all duration-200 relative group"
              style={{
                backgroundColor: isSelected ? 'var(--surface-raised)' : 'var(--structural-dark)',
                borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-subtle)',
              }}
            >
              {/* Step indicator tag */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center border font-semibold text-[9px]"
                    style={{
                      borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--text-primary)' : 'transparent',
                      color: isSelected ? 'var(--canvas-base)' : 'var(--text-secondary)',
                    }}
                  >
                    {phase.step}
                  </span>
                  <span>{phase.era}</span>
                </div>
                <div
                  className="p-1 rounded"
                  style={{
                    backgroundColor: isSelected ? 'var(--canvas-base)' : 'var(--surface-sunken)',
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                >
                  {getIcon(phase.iconType)}
                </div>
              </div>

              <div
                className="text-[13.5px] font-semibold tracking-tight mb-1"
                style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                {phase.title}
              </div>

              <div
                className="text-[11.5px] leading-tight line-clamp-2"
                style={{ color: 'var(--text-muted)' }}
              >
                {phase.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Graphical Story Deep-Dive Display Card */}
      <div
        className="border rounded-[var(--radius-panel)] p-5 sm:p-7 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        {/* Top Header info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b mb-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
              <span>Phase {activePhase.step} of 04</span>
              <span>•</span>
              <span className="font-semibold text-[var(--text-primary)]">{activePhase.era}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {activePhase.title}
            </h3>
            <p className="text-[13.5px] font-mono mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {activePhase.subtitle}
            </p>
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded font-mono text-[11px] border"
            style={{
              backgroundColor: 'var(--surface-raised)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            {getIcon(activePhase.iconType)}
            <span>Domain Translation Paradigm</span>
          </div>
        </div>

        {/* Narrative & Visual Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Narrative text & Artifacts (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Trajectory & Context
              </div>
              <p className="text-[14.5px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {activePhase.description}
              </p>
            </div>

            {/* Core Architectural / Systems Insight Callout */}
            <div
              className="p-4 rounded-[var(--radius-panel)] border relative"
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Sparkles className="w-3.5 h-3.5 flex-none" />
                <span className="font-semibold">Core Systems Insight</span>
              </div>
              <p className="text-[13.5px] font-medium leading-relaxed italic" style={{ color: 'var(--text-primary)' }}>
                “{activePhase.systemInsight}”
              </p>
            </div>

            {/* Proven Artifacts & Demonstrated Outputs */}
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Demonstrated Artifacts & Deliverables
              </div>
              <div className="flex flex-wrap gap-2">
                {activePhase.artifacts.map((artifact, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-mono border"
                    style={{
                      backgroundColor: 'var(--surface-sunken)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3 flex-none text-[var(--text-secondary)]" />
                    {artifact}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Graphical Systems Visualizer Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              className="p-4 rounded-[var(--radius-panel)] border font-mono text-[11px]"
              style={{
                backgroundColor: 'var(--canvas-base)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  System Topology Diagram
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9.5px] bg-[var(--surface-raised)]" style={{ color: 'var(--text-secondary)' }}>
                  Phase {activePhase.step} Model
                </span>
              </div>

              {/* Dynamic ASCII / Flow representation based on Phase */}
              {activePhase.id === 'bio-01' && (
                <div className="space-y-3">
                  <div className="text-[11px] leading-snug p-2.5 rounded bg-[var(--surface-sunken)] border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                    <div className="font-bold text-[10px] text-[var(--text-secondary)] mb-1">STOCHASTIC QUEUE THEORY</div>
                    [Inputs / Raw Demand]
                    <br />  │
                    <br />  ▼ (Arrival Rate λ)
                    <br />[Buffer Queue (M/M/c)]
                    <br />  │
                    <br />  ▼ (Service Rate μ)
                    <br />[Throughput Bottleneck] ➔ [Failure Mode Mitigation]
                  </div>
                  <p className="text-[10.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Physical distribution instilled an obsession with eliminating single points of failure, managing inventory lag, and deterministic flow routing.
                  </p>
                </div>
              )}

              {activePhase.id === 'bio-02' && (
                <div className="space-y-3">
                  <div className="text-[11px] leading-snug p-2.5 rounded bg-[var(--surface-sunken)] border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                    <div className="font-bold text-[10px] text-[var(--text-secondary)] mb-1">STATE MACHINE TRANSLATION</div>
                    [User Intent / Event]
                    <br />  │
                    <br />  ▼ (Guarded Transition)
                    <br />┌──────────────────────────┐
                    <br />│ IDLE ➔ RUNNING ➔ SUSPEND │
                    <br />└─────────────┬────────────┘
                    <br />              ▼
                    <br />[Deterministic Immutable State]
                  </div>
                  <p className="text-[10.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Self-directed mastery in TypeScript, Go, XState, and reactive UIs. Transforming supply chain dispatch algorithms into robust software statecharts.
                  </p>
                </div>
              )}

              {activePhase.id === 'bio-03' && (
                <div className="space-y-3">
                  <div className="text-[11px] leading-snug p-2.5 rounded bg-[var(--surface-sunken)] border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                    <div className="font-bold text-[10px] text-[var(--text-secondary)] mb-1">THE 19 ATLAS RECORDS</div>
                    ┌───────────────────────────┐
                    <br />│ Opaque Backend Complexity │
                    <br />└─────────────┬─────────────┘
                    <br />              ▼ (Human Translation Layer)
                    <br />┌───────────────────────────┐
                    <br />│  Operator Control Plane   │
                    <br />│  • Meridian • DetRun      │
                    <br />│  • AgentOS  • Neo UI      │
                    <br />└───────────────────────────┘
                  </div>
                  <p className="text-[10.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    19 production-grade applications establishing unmatched UI craft, event sourcing, operator telemetry, and human-in-the-loop legibility.
                  </p>
                </div>
              )}

              {activePhase.id === 'bio-04' && (
                <div className="space-y-3">
                  <div className="text-[11px] leading-snug p-2.5 rounded bg-[var(--surface-sunken)] border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                    <div className="font-bold text-[10px] text-[var(--text-secondary)] mb-1">2025–2030 RUNTIME FRONTIER</div>
                    [Tauri / Rust Native Shell]
                    <br />  │
                    <br />  ▼ (IPC / Distributed Stream)
                    <br />[Go Distributed Runtime Core]
                    <br />  │
                    <br />  ▼
                    <br />[PostgreSQL + pgvector Memory + S3]
                  </div>
                  <p className="text-[10.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Expanding beyond control planes into distributed backends, persistent memory lifecycles, and native desktop runtimes.
                  </p>
                </div>
              )}
            </div>

            {/* Tech Stack Chips */}
            <div
              className="p-3.5 rounded-[var(--radius-panel)] border font-mono text-[11px]"
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Core Technologies & Tools
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activePhase.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[10.5px] font-mono border"
                    style={{
                      backgroundColor: 'var(--canvas-base)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
