import React, { useState } from 'react';
import {
  FLAGSHIP_PROJECTS,
  REPLAY_SIMULATION_STEPS,
  EVALUATION_METRICS,
  MEMORY_LIFECYCLE_TIERS,
} from '../data';
import { FlagshipProject } from '../types';
import {
  Layers,
  Cpu,
  Database,
  Monitor,
  Play,
  RotateCcw,
  FastForward,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  HardDrive,
  Network,
  Binary,
  ShieldCheck,
} from 'lucide-react';

export const SkillsetMatricesSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('project-runtime-core');
  const [replayStepIndex, setReplayStepIndex] = useState<number>(3); // defaulted to step #4 (index 3)
  const [replayIsRunning, setReplayIsRunning] = useState<boolean>(false);
  const [executionMode, setExecutionMode] = useState<'local' | 'remote'>('local');
  const [selectedMemoryTier, setSelectedMemoryTier] = useState<number>(0);

  const activeProject: FlagshipProject =
    FLAGSHIP_PROJECTS.find((p) => p.id === selectedProjectId) || FLAGSHIP_PROJECTS[0];

  const handleStepForward = () => {
    setReplayStepIndex((prev) => Math.min(prev + 1, REPLAY_SIMULATION_STEPS.length - 1));
  };

  const handleStepBackward = () => {
    setReplayStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleReplayFromStep4 = () => {
    setReplayStepIndex(3);
    setReplayIsRunning(true);
    setTimeout(() => setReplayIsRunning(false), 800);
  };

  return (
    <section
      id="matrices"
      className="space-y-8"
    >
      {/* Section Header */}
      <div>
        <div
          className="text-[11px] font-mono uppercase tracking-[0.08em] mb-2.5 flex items-center justify-between"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>03 — Skillset Matrices &amp; Flagship Projects</span>
          <span className="text-[10px] font-bold text-[var(--state-active)]">CREDIBILITY MATRIX</span>
        </div>

        <h2
          className="text-2xl sm:text-[28px] font-bold tracking-tight mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Closing the Credibility Gap: Three Complementary Engines
        </h2>

        <p
          className="text-[15px] leading-relaxed max-w-[70ch]"
          style={{ color: 'var(--text-secondary)' }}
        >
          Moving beyond isolated demonstrations of Rust, Go, or databases. These three deliberately
          complementary reference projects complete the full stack: adding the{' '}
          <span className="font-semibold text-[var(--text-primary)]">Execution Plane</span>,{' '}
          <span className="font-semibold text-[var(--text-primary)]">Data Plane</span>, and{' '}
          <span className="font-semibold text-[var(--text-primary)]">Systems Layer</span> to the existing
          control plane / visualization lineage.
        </p>
      </div>


      {/* Objective 3 Credibility Matrix Table */}
      <div
        className="border rounded-[var(--radius-panel)] p-4 sm:p-6 mb-10 overflow-x-auto"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase font-bold" style={{ color: 'var(--text-primary)' }}>
            <Layers className="w-4 h-4 text-[var(--text-secondary)]" />
            <span>The Portfolio Credibility Matrix</span>
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Objective: Prove Whole-Stack Competence
          </span>
        </div>

        <table className="w-full text-left font-mono text-[12px] border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b text-[10.5px] uppercase tracking-wider" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th className="pb-3 pr-4 font-semibold">Project & Layer</th>
              <th className="pb-3 pr-4 font-semibold">Primary Purpose</th>
              <th className="pb-3 pr-4 font-semibold">Technologies</th>
              <th className="pb-3 font-semibold">Credibility Established</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {FLAGSHIP_PROJECTS.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <tr
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className="cursor-pointer transition-colors duration-150 hover:bg-[var(--surface-raised)]"
                  style={{
                    backgroundColor: isSelected ? 'var(--surface-raised)' : 'transparent',
                  }}
                >
                  <td className="py-3.5 pr-4 align-top">
                    <div className="font-bold text-[13px]" style={{ color: 'var(--text-primary)' }}>
                      {proj.number}. {proj.name}
                    </div>
                    <div className="text-[11px] font-sans font-medium text-[var(--text-secondary)] mt-0.5">
                      {proj.codename} • <span className="text-[var(--text-primary)] font-mono">{proj.architecturalLayer}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 align-top text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                    {proj.primaryPurpose}
                  </td>
                  <td className="py-3.5 pr-4 align-top">
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--surface-sunken)] border"
                          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                        >
                          {t}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="text-[10px] text-[var(--text-muted)] self-center">
                          +{proj.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 align-top font-sans text-[12.5px] italic font-medium" style={{ color: 'var(--text-primary)' }}>
                    {proj.credibilityProves}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {FLAGSHIP_PROJECTS.map((proj) => {
          const isSelected = proj.id === selectedProjectId;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-panel)] border font-mono text-[12px] transition-all"
              style={{
                backgroundColor: isSelected ? 'var(--surface-raised)' : 'var(--structural-dark)',
                borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-subtle)',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px]"
                style={{
                  backgroundColor: isSelected ? 'var(--text-primary)' : 'var(--surface-sunken)',
                  color: isSelected ? 'var(--canvas-base)' : 'var(--text-muted)',
                }}
              >
                0{proj.number}
              </span>
              <span className="font-semibold">{proj.name}</span>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Interactive Showcase Panel */}
      <div
        className="border rounded-[var(--radius-panel)] p-5 sm:p-7 space-y-8"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        {/* Project Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
              <span>Project {activeProject.number}</span>
              <span>•</span>
              <span className="font-semibold text-[var(--text-primary)]">{activeProject.architecturalLayer}</span>
              <span>•</span>
              <span className="text-[var(--text-muted)]">{activeProject.codename}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {activeProject.name}
            </h3>
            <p className="text-[14.5px] italic mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
              “{activeProject.headlineQuote}”
            </p>
          </div>

          <div
            className="p-3 rounded-[var(--radius-panel)] border font-mono text-[11px] max-w-sm"
            style={{
              backgroundColor: 'var(--surface-raised)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="text-[10px] uppercase text-[var(--text-muted)] mb-1">Credibility Impact</div>
            <div className="font-semibold text-[var(--text-primary)]">{activeProject.credibilityProves}</div>
          </div>
        </div>

        {/* Architecture ASCII Flow Diagram & Core Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Architecture Diagram (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="flex items-center justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <span className="uppercase tracking-wider">Engine Architecture Topology</span>
              <span>ASCII Representation</span>
            </div>
            <div
              className="p-4 rounded-[var(--radius-panel)] border font-mono text-[11px] overflow-x-auto leading-tight"
              style={{
                backgroundColor: 'var(--canvas-base)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <pre className="whitespace-pre">{activeProject.architectureDiagram}</pre>
            </div>
          </div>

          {/* Core Feature Matrix (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Core Runtime Capabilities
              </div>
              <div className="space-y-2">
                {activeProject.coreFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded text-[13px] border"
                    style={{
                      backgroundColor: 'var(--surface-raised)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-none text-[var(--text-secondary)] mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="p-3 rounded border font-mono text-[11px]" style={{ backgroundColor: 'var(--surface-sunken)', borderColor: 'var(--border-subtle)' }}>
              <div className="text-[10px] uppercase text-[var(--text-muted)] mb-1.5">Stack Composition</div>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] bg-[var(--surface-raised)] border"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Project-Specific Interactive Simulator Sub-panels */}

        {/* 1. PROJECT 1: DETERMINISTIC EVENT REPLAY SIMULATOR */}
        {activeProject.id === 'project-runtime-core' && (
          <div
            className="p-5 sm:p-6 rounded-[var(--radius-panel)] border space-y-4"
            style={{
              backgroundColor: 'var(--surface-raised)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-primary)' }}>
                  <RotateCcw className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>Killer Feature Demo: Deterministic Replay Engine</span>
                </div>
                <div className="text-[12px] font-mono text-[var(--text-secondary)] mt-0.5">
                  Execution Session <span className="text-[var(--text-primary)] font-bold">#8421</span> • Active Event Stream Rehydration
                </div>
              </div>

              {/* Replay Controls */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <button
                  onClick={handleStepBackward}
                  disabled={replayStepIndex === 0}
                  className="px-2.5 py-1 rounded border disabled:opacity-40"
                  style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  Prev
                </button>
                <span className="px-2 py-1 rounded bg-[var(--canvas-base)] border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                  Step {replayStepIndex + 1} / {REPLAY_SIMULATION_STEPS.length}
                </span>
                <button
                  onClick={handleStepForward}
                  disabled={replayStepIndex === REPLAY_SIMULATION_STEPS.length - 1}
                  className="px-2.5 py-1 rounded border disabled:opacity-40"
                  style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  Next
                </button>
                <button
                  onClick={handleReplayFromStep4}
                  className="flex items-center gap-1.5 px-3 py-1 rounded font-semibold border"
                  style={{
                    backgroundColor: 'var(--text-primary)',
                    borderColor: 'var(--text-primary)',
                    color: 'var(--canvas-base)',
                  }}
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${replayIsRunning ? 'animate-spin' : ''}`} />
                  <span>Replay from event #4</span>
                </button>
              </div>
            </div>

            {/* Event Timeline Trace */}
            <div className="space-y-1.5 font-mono text-[12px]">
              {REPLAY_SIMULATION_STEPS.map((step, idx) => {
                const isActive = idx === replayStepIndex;
                const isPast = idx < replayStepIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setReplayStepIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded border transition-all cursor-pointer ${
                      isActive ? 'ring-1 ring-[var(--text-primary)]' : ''
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? 'var(--canvas-base)'
                        : isPast
                        ? 'var(--surface-sunken)'
                        : 'var(--surface-raised)',
                      borderColor: isActive ? 'var(--text-primary)' : 'var(--border-subtle)',
                      opacity: idx > replayStepIndex ? 0.6 : 1,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-none"
                        style={{
                          backgroundColor: isActive
                            ? 'var(--text-primary)'
                            : isPast
                            ? 'var(--border-subtle)'
                            : 'transparent',
                          color: isActive ? 'var(--canvas-base)' : 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">{step.time}</span>
                      <span className={`font-semibold ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                        {step.event}
                      </span>
                    </div>

                    <div className="text-[11.5px] text-[var(--text-secondary)] truncate max-w-xs sm:max-w-md hidden sm:block">
                      {step.details}
                    </div>

                    {isActive && (
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[var(--text-primary)] text-[var(--canvas-base)]">
                        Active State
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded text-[12px] font-mono border" style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
              <span className="font-bold text-[var(--text-primary)]">Why this matters:</span> Replay is an actual distributed runtime capability (Go + PostgreSQL event store + SSE streaming), not a UI mockup. An operator can rewind to step #4, alter parameters, or replay the exact execution path.
            </div>
          </div>
        )}

        {/* 2. PROJECT 2: 5-TIER MEMORY LIFECYCLE & EVALUATION SCORECARD */}
        {activeProject.id === 'project-memory-engine' && (
          <div className="space-y-6">
            {/* Memory Lifecycle Tiers */}
            <div
              className="p-5 rounded-[var(--radius-panel)] border space-y-4"
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-primary)' }}>
                  <Database className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>5-Tier Memory Lifecycle Architecture</span>
                </div>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  Consolidated in PostgreSQL + pgvector + S3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {MEMORY_LIFECYCLE_TIERS.map((tier, idx) => {
                  const isSelected = selectedMemoryTier === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedMemoryTier(idx)}
                      className="text-left p-3 rounded border transition-all"
                      style={{
                        backgroundColor: isSelected ? 'var(--canvas-base)' : 'var(--surface-sunken)',
                        borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-subtle)',
                      }}
                    >
                      <div className="font-mono text-[9.5px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Tier 0{idx + 1}
                      </div>
                      <div className="font-semibold text-[12.5px] text-[var(--text-primary)] mb-1">
                        {tier.tier}
                      </div>
                      <div className="font-mono text-[10.5px] text-[var(--text-secondary)]">
                        {tier.scope}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded border font-mono text-[12px]" style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)' }}>
                <div className="font-bold text-[var(--text-primary)] mb-1">
                  {MEMORY_LIFECYCLE_TIERS[selectedMemoryTier].tier}
                </div>
                <p className="text-[var(--text-secondary)]">
                  {MEMORY_LIFECYCLE_TIERS[selectedMemoryTier].description}
                </p>
              </div>
            </div>

            {/* Evaluation Scorecard Comparison */}
            <div
              className="p-5 rounded-[var(--radius-panel)] border space-y-4"
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-primary)' }}>
                  <TrendingUp className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>Agent Evaluation Benchmark Comparison (v1.4 vs v1.5)</span>
                </div>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  Linked to Run #8421
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[12px] border-collapse">
                  <thead>
                    <tr className="border-b text-[10.5px] text-[var(--text-muted)] uppercase" style={{ borderColor: 'var(--border-subtle)' }}>
                      <th className="pb-2.5 font-semibold">Evaluation Metric</th>
                      <th className="pb-2.5 font-semibold">Version 1.4</th>
                      <th className="pb-2.5 font-semibold">Version 1.5</th>
                      <th className="pb-2.5 font-semibold">Delta Variance</th>
                      <th className="pb-2.5 font-semibold">Trace Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                    {EVALUATION_METRICS.map((m, idx) => (
                      <tr key={idx} className="hover:bg-[var(--surface-sunken)]">
                        <td className="py-2.5 font-semibold text-[var(--text-primary)]">{m.metric}</td>
                        <td className="py-2.5 text-[var(--text-secondary)]">{m.v14}</td>
                        <td className="py-2.5 font-bold text-[var(--text-primary)]">{m.v15}</td>
                        <td className="py-2.5 font-bold text-[var(--text-primary)]">{m.delta}</td>
                        <td className="py-2.5">
                          <button
                            onClick={() => {
                              setSelectedProjectId('project-runtime-core');
                              handleReplayFromStep4();
                            }}
                            className="inline-flex items-center gap-1 text-[11px] underline underline-offset-2 text-[var(--text-primary)] hover:opacity-80"
                          >
                            <span>Replay Execution</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. PROJECT 3: HYBRID LOCAL VS REMOTE RUNTIME SWITCHER */}
        {activeProject.id === 'project-desktop-control' && (
          <div
            className="p-5 sm:p-6 rounded-[var(--radius-panel)] border space-y-5"
            style={{
              backgroundColor: 'var(--surface-raised)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-primary)' }}>
                  <Monitor className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span>Killer Feature Demo: One Unified Control Plane</span>
                </div>
                <div className="text-[12px] font-mono text-[var(--text-secondary)] mt-0.5">
                  Tauri Shell + Rust Core Substrate • Seamless Environment Bridging
                </div>
              </div>

              {/* Mode Toggle Switch */}
              <div className="flex items-center gap-1 p-1 rounded bg-[var(--canvas-base)] border" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  onClick={() => setExecutionMode('local')}
                  className="px-3 py-1 rounded font-mono text-[11px] font-semibold transition-all"
                  style={{
                    backgroundColor: executionMode === 'local' ? 'var(--text-primary)' : 'transparent',
                    color: executionMode === 'local' ? 'var(--canvas-base)' : 'var(--text-secondary)',
                  }}
                >
                  Local Mode (Rust + SQLite)
                </button>
                <button
                  onClick={() => setExecutionMode('remote')}
                  className="px-3 py-1 rounded font-mono text-[11px] font-semibold transition-all"
                  style={{
                    backgroundColor: executionMode === 'remote' ? 'var(--text-primary)' : 'transparent',
                    color: executionMode === 'remote' ? 'var(--canvas-base)' : 'var(--text-secondary)',
                  }}
                >
                  Remote Mode (Go + Postgres)
                </button>
              </div>
            </div>

            {/* Dynamic Interactive Mode Architecture Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11.5px]">
              <div
                className={`p-4 rounded border ${
                  executionMode === 'local' ? 'ring-1 ring-[var(--text-primary)]' : 'opacity-60'
                }`}
                style={{
                  backgroundColor: 'var(--canvas-base)',
                  borderColor: executionMode === 'local' ? 'var(--text-primary)' : 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center justify-between font-bold text-[12px] text-[var(--text-primary)] mb-2">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>LOCAL RUNTIME PATH</span>
                  </div>
                  {executionMode === 'local' && (
                    <span className="px-1.5 py-0.5 text-[9.5px] bg-[var(--text-primary)] text-[var(--canvas-base)] rounded">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-[var(--text-secondary)]">
                  <div>Tauri (Desktop Shell)</div>
                  <div>  ↓ [IPC Message Bus]</div>
                  <div>Rust Core Runtime Engine</div>
                  <div>  ↓ [Local Process Spawn]</div>
                  <div>SQLite Embedded State + Local Tools</div>
                </div>
                <div className="mt-3 pt-2 border-t text-[10.5px] text-[var(--text-muted)]" style={{ borderColor: 'var(--border-subtle)' }}>
                  Zero-latency, 100% offline, native process sandboxing.
                </div>
              </div>

              <div
                className={`p-4 rounded border ${
                  executionMode === 'remote' ? 'ring-1 ring-[var(--text-primary)]' : 'opacity-60'
                }`}
                style={{
                  backgroundColor: 'var(--canvas-base)',
                  borderColor: executionMode === 'remote' ? 'var(--text-primary)' : 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center justify-between font-bold text-[12px] text-[var(--text-primary)] mb-2">
                  <div className="flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5" />
                    <span>REMOTE CLUSTER PATH</span>
                  </div>
                  {executionMode === 'remote' && (
                    <span className="px-1.5 py-0.5 text-[9.5px] bg-[var(--text-primary)] text-[var(--canvas-base)] rounded">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 text-[var(--text-secondary)]">
                  <div>Tauri (Desktop Shell)</div>
                  <div>  ↓ [gRPC / TLS Stream]</div>
                  <div>Remote Go Execution Runtime</div>
                  <div>  ↓ [NATS Distributed Workers]</div>
                  <div>PostgreSQL + pgvector + S3 Cluster</div>
                </div>
                <div className="mt-3 pt-2 border-t text-[10.5px] text-[var(--text-muted)]" style={{ borderColor: 'var(--border-subtle)' }}>
                  Heavy multi-agent fleet dispatch across distributed nodes.
                </div>
              </div>
            </div>

            <div className="p-3 rounded text-[12px] font-mono border" style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
              <span className="font-bold text-[var(--text-primary)]">The Developer Experience:</span> The operator interface is identical regardless of whether execution is running on bare-metal local Rust isolates or remote Go worker clusters in the cloud.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
