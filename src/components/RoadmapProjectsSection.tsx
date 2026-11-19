import React, { useState } from 'react';
import {
  FLAGSHIP_PROJECTS,
  REPLAY_SIMULATION_STEPS,
  EVALUATION_METRICS,
  MEMORY_LIFECYCLE_TIERS,
  HARDENING_PROJECT_CATEGORIES,
} from '../data';
import { FlagshipProject, HardeningCategoryProgress } from '../types';
import {
  Terminal,
  Cpu,
  Database,
  Laptop,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Server,
  HardDrive,
  ShieldCheck,
  ChevronRight,
  Activity,
  Layers,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Calendar,
} from 'lucide-react';

export const RoadmapProjectsSection: React.FC = () => {
  const [activeProjectTab, setActiveProjectTab] = useState<string>('project-runtime-core');
  const [replayStep, setReplayStep] = useState<number>(REPLAY_SIMULATION_STEPS.length - 1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [desktopMode, setDesktopMode] = useState<'local' | 'remote'>('local');
  const [selectedHardeningCategory, setSelectedHardeningCategory] = useState<string>('all');

  const activeProject = FLAGSHIP_PROJECTS.find((p) => p.id === activeProjectTab) || FLAGSHIP_PROJECTS[0];
  const activeHardening = HARDENING_PROJECT_CATEGORIES.find((c) => c.projectId === activeProjectTab) || HARDENING_PROJECT_CATEGORIES[0];

  const handleStepBack = () => {
    setReplayStep((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    setReplayStep((prev) => Math.min(REPLAY_SIMULATION_STEPS.length - 1, prev + 1));
  };

  const handleResetReplay = () => {
    setReplayStep(REPLAY_SIMULATION_STEPS.length - 1);
  };

  const calculateOverallHardening = () => {
    const sum = HARDENING_PROJECT_CATEGORIES.reduce((acc, cat) => acc + cat.completionPercentage, 0);
    return Math.round(sum / HARDENING_PROJECT_CATEGORIES.length);
  };

  const overallHardeningScore = calculateOverallHardening();

  return (
    <section id="roadmap" className="space-y-10">
      {/* Level 1 Headline */}
      <div className="border-b pb-5" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 text-[var(--blue-outline)]">
          <span>04. Vertical Reference Architecture &amp; Roadmap</span>
          <span>3 SEQUENTIAL INFRASTRUCTURE PHASES</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-3">
          One Vertical Stack, Three Phases
        </h1>

        <p className="text-base sm:text-[17px] leading-relaxed max-w-[68ch] text-[var(--text-dim)] font-medium m-0">
          Not three unrelated portfolio pieces. One architecture, built sequentially. Each phase gives the next one something real to plug into. By the end, the existing Atlas work becomes the visualization layer sitting on top of production infrastructure.
        </p>
      </div>

      {/* Infrastructure Hardening Progress by Project Category Panel */}
      <div
        className="border rounded-[3px] p-6 space-y-6 shadow-sm"
        style={{
          backgroundColor: 'var(--surface-secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-[var(--blue-outline)]" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-semibold">
                Infrastructure Hardening Dashboard
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] m-0">
              Operational Hardening Progress by Category
            </h3>
            <p className="text-xs text-[var(--text-dim)] mt-1 font-mono m-0">
              Surfacing backend persistence, queue backpressure, and local inference execution completion status.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[var(--surface-primary)] p-3 rounded-[3px] border border-[var(--border-subtle)]">
            <div className="text-left sm:text-right">
              <div className="text-[10px] font-mono uppercase text-[var(--text-dimmer)]">
                Stack Hardening Average
              </div>
              <div className="text-xl font-bold font-mono text-[var(--text)] flex items-center gap-2">
                <span>{overallHardeningScore}%</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-[2px] bg-[var(--surface-secondary)] text-[var(--green-proven)] font-normal">
                  ACTIVE SPRINTS
                </span>
              </div>
            </div>
            <div className="w-32 sm:w-28 space-y-1">
              <div className="w-full bg-[var(--bg)] rounded-[2px] h-2.5 overflow-hidden border border-[var(--border-subtle)] flex">
                <div
                  className="h-full bg-[var(--green-proven)]"
                  style={{ width: `${HARDENING_PROJECT_CATEGORIES[0].completionPercentage / 3}%` }}
                  title="Phase I: 78%"
                />
                <div
                  className="h-full bg-[var(--blue-outline)]"
                  style={{ width: `${HARDENING_PROJECT_CATEGORIES[1].completionPercentage / 3}%` }}
                  title="Phase II: 64%"
                />
                <div
                  className="h-full bg-[var(--yellow-work)]"
                  style={{ width: `${HARDENING_PROJECT_CATEGORIES[2].completionPercentage / 3}%` }}
                  title="Phase III: 52%"
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[var(--text-dimmer)]">
                <span>P1: 78%</span>
                <span>P2: 64%</span>
                <span>P3: 52%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Detailed Category Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {HARDENING_PROJECT_CATEGORIES.map((cat) => {
            const isTargetActive = activeProjectTab === cat.projectId;
            const barColor =
              cat.completionPercentage >= 75
                ? 'var(--green-proven)'
                : cat.completionPercentage >= 60
                ? 'var(--blue-outline)'
                : 'var(--yellow-work)';

            return (
              <div
                key={cat.id}
                className={`border rounded-[3px] p-5 space-y-4 transition-all duration-200 ${
                  isTargetActive
                    ? 'border-[var(--blue-outline)] bg-[var(--surface-primary)] shadow-md'
                    : 'border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-[var(--border)]'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] bg-[var(--surface-secondary)] text-[var(--text-dim)] uppercase">
                        {cat.phaseLabel}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-dimmer)]">
                        {cat.layer}
                      </span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[var(--text)] m-0 leading-snug">
                      {cat.categoryName}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="font-mono text-xs text-[var(--blue-outline)] font-medium">
                        {cat.projectCodename}
                      </span>
                      {cat.timelineLabel && (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-dim)] bg-[var(--surface-secondary)] px-1.5 py-0.5 rounded-[2px] border border-[var(--border-subtle)]">
                          <Calendar className="w-2.5 h-2.5 text-[var(--blue-outline)]" />
                          <span>{cat.timelineLabel}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-none">
                    <div className="font-mono text-xl font-bold" style={{ color: barColor }}>
                      {cat.completionPercentage}%
                    </div>
                    <span className="text-[9px] font-mono uppercase text-[var(--text-dimmer)] block">
                      Hardened
                    </span>
                  </div>
                </div>

                {/* Primary Category Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full bg-[var(--bg)] border border-[var(--border-subtle)] rounded-[2px] h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-[1px] transition-all duration-500"
                      style={{
                        width: `${cat.completionPercentage}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)]">
                    <span>Status: <strong className="font-semibold text-[var(--text)]">{cat.statusLabel}</strong></span>
                    {cat.startDate && cat.estimatedCompletionDate && (
                      <span className="text-[10px] text-[var(--text-dimmer)] flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        Est. {cat.estimatedCompletionDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subcategories Workstreams Progress List */}
                <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dimmer)] font-semibold">
                    Hardened Subsystems ({cat.subCategories.filter(s => s.status === 'hardened').length}/{cat.subCategories.length} Verified)
                  </div>

                  <div className="space-y-2">
                    {cat.subCategories.map((sub) => {
                      const subColor =
                        sub.percentage >= 80
                          ? 'var(--green-proven)'
                          : sub.percentage >= 60
                          ? 'var(--blue-outline)'
                          : 'var(--yellow-work)';

                      return (
                        <div key={sub.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-[var(--text)] text-[11.5px] truncate max-w-[200px]" title={sub.name}>
                              {sub.name}
                            </span>
                            <span className="font-bold text-[11.5px]" style={{ color: subColor }}>
                              {sub.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-[var(--bg)] rounded-[1px] h-1.5 overflow-hidden border border-[var(--border-subtle)]">
                            <div
                              className="h-full rounded-[1px] transition-all duration-300"
                              style={{
                                width: `${sub.percentage}%`,
                                backgroundColor: subColor,
                              }}
                            />
                          </div>
                          <div className="text-[10.5px] text-[var(--text-dimmer)] truncate font-mono" title={sub.deliverable}>
                            ↳ {sub.deliverable}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick inspect button */}
                <div className="pt-1">
                  <button
                    onClick={() => setActiveProjectTab(cat.projectId)}
                    className={`w-full py-1.5 px-3 rounded-[2px] font-mono text-xs flex items-center justify-center gap-1.5 border transition-all ${
                      isTargetActive
                        ? 'bg-[var(--surface-secondary)] text-[var(--blue-outline)] border-[var(--blue-outline)] font-bold'
                        : 'bg-[var(--surface-primary)] text-[var(--text-dim)] border-[var(--border-subtle)] hover:text-[var(--text)] hover:border-[var(--border)]'
                    }`}
                  >
                    <span>{isTargetActive ? 'Viewing Substrate' : 'Inspect Substrate Details'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Core Phase Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phase I */}
        {(() => {
          const cat = HARDENING_PROJECT_CATEGORIES[0];
          return (
            <div
              className="border rounded-[3px] p-6 space-y-4 transition-all duration-200 hover:border-[var(--blue-outline)] flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border)',
                borderLeft: '6px solid var(--red-gap)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block font-mono text-[10px] font-bold tracking-[0.08em] px-2.5 py-0.5 rounded-[2px] bg-[var(--surface-primary)] text-[var(--text-dim)] uppercase">
                      PHASE I
                    </span>
                    {cat.timelineLabel && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-dim)] bg-[var(--surface-primary)] px-2 py-0.5 rounded-[2px] border border-[var(--border-subtle)]">
                        <Calendar className="w-2.5 h-2.5 text-[var(--blue-outline)]" />
                        <span>{cat.timelineLabel}</span>
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--green-proven)]">
                    {cat.completionPercentage}% HARDENED
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--text)] m-0">Atlas Runtime Core</h3>
                  <div className="flex items-center justify-between mt-0.5 font-mono text-xs">
                    <span className="text-[var(--yellow-work)]">Execution Plane (Go)</span>
                    {cat.startDate && cat.estimatedCompletionDate && (
                      <span className="text-[10px] text-[var(--text-dimmer)]">
                        {cat.startDate} – {cat.estimatedCompletionDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="space-y-1">
                  <div className="w-full bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[2px] h-2 overflow-hidden">
                    <div
                      className="h-full bg-[var(--green-proven)] transition-all duration-500"
                      style={{ width: `${cat.completionPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-dimmer)]">
                    <span>Queue &amp; State Hardening</span>
                    <span>Stage 3 of 4</span>
                  </div>
                </div>

                <div className="font-mono text-[12px] text-[var(--text-dim)] bg-[var(--surface-primary)] p-3 rounded-[2px] border border-[var(--border-subtle)] leading-relaxed">
                  <strong className="text-[var(--text)] block text-[11px] uppercase mb-1">Technologies:</strong>
                  Go · PostgreSQL · Redis / NATS · OpenTelemetry · Docker
                </div>

                <div className="text-[13px] text-[var(--text)] space-y-2 pt-2 border-t border-[var(--border-subtle)] leading-relaxed">
                  <div>
                    <strong className="font-semibold text-[var(--text)]">What it closes: </strong>
                    <span className="text-[var(--text-dim)]">Backend services, persistence, API design, cloud architecture, containers.</span>
                  </div>
                  <div>
                    <strong className="font-semibold text-[var(--text)]">What it proves: </strong>
                    <span className="text-[var(--text)]">You can build the execution plane that actually runs agents. Concurrency, queues, workers, event streams, durable state, observability, deployment.</span>
                  </div>
                </div>
              </div>

              {/* Sub-workstream mini breakdown */}
              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-1.5 font-mono text-[11px]">
                <div className="text-[10px] uppercase text-[var(--text-dimmer)] font-semibold">Subsystem Completion</div>
                {cat.subCategories.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between text-[var(--text-dim)]">
                    <span className="truncate mr-2">{sub.name}</span>
                    <span className="font-bold text-[var(--text)]">{sub.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Phase II */}
        {(() => {
          const cat = HARDENING_PROJECT_CATEGORIES[1];
          return (
            <div
              className="border rounded-[3px] p-6 space-y-4 transition-all duration-200 hover:border-[var(--blue-outline)] flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border)',
                borderLeft: '6px solid var(--red-gap)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block font-mono text-[10px] font-bold tracking-[0.08em] px-2.5 py-0.5 rounded-[2px] bg-[var(--surface-primary)] text-[var(--text-dim)] uppercase">
                      PHASE II
                    </span>
                    {cat.timelineLabel && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-dim)] bg-[var(--surface-primary)] px-2 py-0.5 rounded-[2px] border border-[var(--border-subtle)]">
                        <Calendar className="w-2.5 h-2.5 text-[var(--blue-outline)]" />
                        <span>{cat.timelineLabel}</span>
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--blue-outline)]">
                    {cat.completionPercentage}% HARDENED
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--text)] m-0">Atlas Memory</h3>
                  <div className="flex items-center justify-between mt-0.5 font-mono text-xs">
                    <span className="text-[var(--yellow-work)]">Data Plane (Postgres + pgvector)</span>
                    {cat.startDate && cat.estimatedCompletionDate && (
                      <span className="text-[10px] text-[var(--text-dimmer)]">
                        {cat.startDate} – {cat.estimatedCompletionDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="space-y-1">
                  <div className="w-full bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[2px] h-2 overflow-hidden">
                    <div
                      className="h-full bg-[var(--blue-outline)] transition-all duration-500"
                      style={{ width: `${cat.completionPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-dimmer)]">
                    <span>Vector &amp; Lifecycle Storage</span>
                    <span>Stage 2 of 4</span>
                  </div>
                </div>

                <div className="font-mono text-[12px] text-[var(--text-dim)] bg-[var(--surface-primary)] p-3 rounded-[2px] border border-[var(--border-subtle)] leading-relaxed">
                  <strong className="text-[var(--text)] block text-[11px] uppercase mb-1">Technologies:</strong>
                  PostgreSQL + pgvector · S3-compatible storage · Embeddings
                </div>

                <div className="text-[13px] text-[var(--text)] space-y-2 pt-2 border-t border-[var(--border-subtle)] leading-relaxed">
                  <div>
                    <strong className="font-semibold text-[var(--text)]">What it closes: </strong>
                    <span className="text-[var(--text-dim)]">Agent memory, retrieval, evaluation infrastructure, data architecture.</span>
                  </div>
                  <div>
                    <strong className="font-semibold text-[var(--text)]">What it proves: </strong>
                    <span className="text-[var(--text)]">You understand how agents remember, retrieve context, and how to measure whether that actually works. Persistence, retrieval, evaluation, embeddings, metadata filtering, cost/latency tradeoffs.</span>
                  </div>
                </div>
              </div>

              {/* Sub-workstream mini breakdown */}
              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-1.5 font-mono text-[11px]">
                <div className="text-[10px] uppercase text-[var(--text-dimmer)] font-semibold">Subsystem Completion</div>
                {cat.subCategories.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between text-[var(--text-dim)]">
                    <span className="truncate mr-2">{sub.name}</span>
                    <span className="font-bold text-[var(--text)]">{sub.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Phase III */}
        {(() => {
          const cat = HARDENING_PROJECT_CATEGORIES[2];
          return (
            <div
              className="border rounded-[3px] p-6 space-y-4 transition-all duration-200 hover:border-[var(--blue-outline)] flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border)',
                borderLeft: '6px solid var(--red-gap)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block font-mono text-[10px] font-bold tracking-[0.08em] px-2.5 py-0.5 rounded-[2px] bg-[var(--surface-primary)] text-[var(--text-dim)] uppercase">
                      PHASE III
                    </span>
                    {cat.timelineLabel && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-dim)] bg-[var(--surface-primary)] px-2 py-0.5 rounded-[2px] border border-[var(--border-subtle)]">
                        <Calendar className="w-2.5 h-2.5 text-[var(--blue-outline)]" />
                        <span>{cat.timelineLabel}</span>
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--yellow-work)]">
                    {cat.completionPercentage}% HARDENED
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--text)] m-0">Atlas Desktop</h3>
                  <div className="flex items-center justify-between mt-0.5 font-mono text-xs">
                    <span className="text-[var(--yellow-work)]">Systems Layer (Rust + Tauri)</span>
                    {cat.startDate && cat.estimatedCompletionDate && (
                      <span className="text-[10px] text-[var(--text-dimmer)]">
                        {cat.startDate} – {cat.estimatedCompletionDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="space-y-1">
                  <div className="w-full bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[2px] h-2 overflow-hidden">
                    <div
                      className="h-full bg-[var(--yellow-work)] transition-all duration-500"
                      style={{ width: `${cat.completionPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-dimmer)]">
                    <span>Native Systems &amp; Local Inference</span>
                    <span>Stage 2 of 4</span>
                  </div>
                </div>

                <div className="font-mono text-[12px] text-[var(--text-dim)] bg-[var(--surface-primary)] p-3 rounded-[2px] border border-[var(--border-subtle)] leading-relaxed">
                  <strong className="text-[var(--text)] block text-[11px] uppercase mb-1">Technologies:</strong>
                  Rust · Tauri · Astro · SQLite · IPC
                </div>

                <div className="text-[13px] text-[var(--text)] space-y-2 pt-2 border-t border-[var(--border-subtle)] leading-relaxed">
                  <div>
                    <strong className="font-semibold text-[var(--text)]">What it closes: </strong>
                    <span className="text-[var(--text-dim)]">Systems programming, native runtime, local execution.</span>
                  </div>
                  <div>
                    <strong className="font-semibold text-[var(--text)]">What it proves: </strong>
                    <span className="text-[var(--text)]">You can build a native control plane that switches between local and remote runtimes transparently. Rust concurrency, IPC, native capabilities, seamless local/cloud handoff.</span>
                  </div>
                </div>
              </div>

              {/* Sub-workstream mini breakdown */}
              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-1.5 font-mono text-[11px]">
                <div className="text-[10px] uppercase text-[var(--text-dimmer)] font-semibold">Subsystem Completion</div>
                {cat.subCategories.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between text-[var(--text-dim)]">
                    <span className="truncate mr-2">{sub.name}</span>
                    <span className="font-bold text-[var(--text)]">{sub.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Interactive Project Architecture Deep Dive */}
      <div
        className="border rounded-[3px] p-6 space-y-6"
        style={{
          backgroundColor: 'var(--surface-primary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dimmer)]">
              Interactive Reference Substrates
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="text-xl font-bold text-[var(--text)] m-0">
                {activeProject.name} ({activeProject.codename})
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-[2px] bg-[var(--surface-secondary)] text-[var(--green-proven)] font-semibold">
                {activeHardening.completionPercentage}% Hardened
              </span>
              {activeProject.timelineLabel && (
                <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-[2px] bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-dim)]">
                  <Calendar className="w-3 h-3 text-[var(--blue-outline)]" />
                  <span className="text-[var(--text)] font-semibold">{activeProject.timelineLabel}</span>
                  {activeProject.startDate && activeProject.estimatedCompletionDate && (
                    <span className="text-[10px] text-[var(--text-dimmer)] hidden md:inline">
                      [{activeProject.startDate} → {activeProject.estimatedCompletionDate}]
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {FLAGSHIP_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProjectTab(proj.id)}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-mono transition-all border text-left ${
                  activeProjectTab === proj.id
                    ? 'bg-[var(--surface-secondary)] text-[var(--text)] border-[var(--blue-outline)] font-bold'
                    : 'text-[var(--text-dim)] border-[var(--border-subtle)] hover:text-[var(--text)] hover:bg-[var(--surface-secondary)]'
                }`}
              >
                <div>{proj.number}. {proj.codename}</div>
                {proj.timelineLabel && (
                  <div className="text-[9.5px] text-[var(--text-dimmer)] font-normal flex items-center gap-1 mt-0.5">
                    <Calendar className="w-2.5 h-2.5 opacity-70" />
                    <span>{proj.timelineLabel}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Phase Specific Interactive View */}
        {activeProjectTab === 'project-runtime-core' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Architecture text */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-[var(--blue-outline)] font-bold uppercase">
                  Execution Plane Flow · Deterministic Event Log
                </div>
                <p className="text-[14px] text-[var(--text-dim)] leading-relaxed">
                  Every step transition, tool call, and model response is logged as an immutable event to PostgreSQL. An operator can rewind to any prior step to debug divergence.
                </p>

                <div className="font-mono text-xs bg-[var(--surface-secondary)] p-4 rounded-[2px] border border-[var(--border-subtle)] whitespace-pre overflow-x-auto text-[var(--text-dim)]">
                  {activeProject.architectureDiagram}
                </div>
              </div>

              {/* Interactive Replay Simulator */}
              <div
                className="border rounded-[3px] p-5 space-y-4"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[var(--green-proven)]" />
                    <span className="font-mono text-xs font-bold text-[var(--text)]">
                      Event Replay Stream (#8421)
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-dimmer)]">
                    STEP {replayStep + 1} / {REPLAY_SIMULATION_STEPS.length}
                  </div>
                </div>

                {/* Event log box */}
                <div className="h-[230px] overflow-y-auto space-y-1.5 p-3 rounded-[2px] bg-[var(--bg)] border border-[var(--border-subtle)] font-mono text-xs">
                  {REPLAY_SIMULATION_STEPS.slice(0, replayStep + 1).map((step, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 rounded-[1px] bg-[var(--surface-primary)] border-l-2 border-[var(--green-proven)] flex items-start justify-between gap-2"
                    >
                      <div>
                        <span className="text-[var(--text-dimmer)] mr-2">{step.time}</span>
                        <span className="text-[var(--green-proven)] font-semibold">{step.event}</span>
                        <div className="text-[11px] text-[var(--text-dim)] mt-0.5">{step.details}</div>
                      </div>
                      <span className="text-[10px] uppercase text-[var(--text-dimmer)]">{step.type}</span>
                    </div>
                  ))}
                </div>

                {/* Replay Controls */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleStepBack}
                      disabled={replayStep === 0}
                      className="px-2.5 py-1 rounded-[2px] text-xs font-mono bg-[var(--surface-primary)] border border-[var(--border)] disabled:opacity-40 text-[var(--text)] hover:border-[var(--blue-outline)]"
                    >
                      ← Step Back
                    </button>
                    <button
                      onClick={handleStepForward}
                      disabled={replayStep === REPLAY_SIMULATION_STEPS.length - 1}
                      className="px-2.5 py-1 rounded-[2px] text-xs font-mono bg-[var(--surface-primary)] border border-[var(--border)] disabled:opacity-40 text-[var(--text)] hover:border-[var(--blue-outline)]"
                    >
                      Step Next →
                    </button>
                  </div>
                  <button
                    onClick={handleResetReplay}
                    className="px-2.5 py-1 rounded-[2px] text-xs font-mono text-[var(--text-dim)] hover:text-[var(--text)] flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase II: Memory Engine */}
        {activeProjectTab === 'project-memory-engine' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 5-tier lifecycle */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[var(--blue-outline)] font-bold uppercase">
                  5-Tier Memory Hierarchy (pgvector + Postgres + S3)
                </div>
                <div className="space-y-2">
                  {MEMORY_LIFECYCLE_TIERS.map((tier) => (
                    <div
                      key={tier.tier}
                      className="p-3 rounded-[2px] border border-[var(--border-subtle)] bg-[var(--surface-secondary)]"
                    >
                      <div className="flex items-center justify-between font-mono text-xs mb-1">
                        <span className="font-bold text-[var(--text)]">{tier.tier}</span>
                        <span className="text-[var(--yellow-work)] text-[11px]">{tier.scope}</span>
                      </div>
                      <p className="text-[12px] text-[var(--text-dim)] m-0 leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation Benchmarks table */}
              <div
                className="border rounded-[3px] p-5 space-y-4"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--text)]">
                    Automated Evaluation Benchmark (v1.4 vs v1.5)
                  </span>
                  <span className="font-mono text-[10px] text-[var(--green-proven)]">
                    +13% PRECISION
                  </span>
                </div>

                <div className="divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-[2px] bg-[var(--bg)] font-mono text-xs">
                  <div className="p-2.5 grid grid-cols-4 font-bold text-[var(--text-dimmer)] text-[11px]">
                    <div>METRIC</div>
                    <div className="text-center">V1.4</div>
                    <div className="text-center">V1.5</div>
                    <div className="text-right">DELTA</div>
                  </div>
                  {EVALUATION_METRICS.map((row) => (
                    <div key={row.metric} className="p-2.5 grid grid-cols-4 text-[var(--text)] items-center">
                      <div className="font-sans text-[12px]">{row.metric}</div>
                      <div className="text-center text-[var(--text-dim)]">{row.v14}</div>
                      <div className="text-center font-bold text-[var(--text)]">{row.v15}</div>
                      <div className="text-right text-[var(--green-proven)] font-bold">{row.delta}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[11.5px] text-[var(--text-dim)] leading-relaxed">
                  Every benchmark run is directly linked to an immutable execution ID for zero-ambiguity regression audits.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase III: Desktop Control Plane */}
        {activeProjectTab === 'project-desktop-control' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Native architecture */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[var(--blue-outline)] font-bold uppercase">
                  Native Systems Runtime (Rust Core + Tauri IPC + SQLite)
                </div>
                <p className="text-[14px] text-[var(--text-dim)] leading-relaxed">
                  A high-performance native desktop application that seamlessly transparently switches between local sandbox isolates and remote Go worker clusters.
                </p>

                <div className="font-mono text-xs bg-[var(--surface-secondary)] p-4 rounded-[2px] border border-[var(--border-subtle)] whitespace-pre overflow-x-auto text-[var(--text-dim)]">
                  {activeProject.architectureDiagram}
                </div>
              </div>

              {/* Mode Switcher Interactive demo */}
              <div
                className="border rounded-[3px] p-5 space-y-4"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--text)]">
                    Local / Remote Execution Handshake
                  </span>
                  <span className="font-mono text-[10px] text-[var(--blue-outline)]">
                    HYBRID CONTROL
                  </span>
                </div>

                <div className="flex gap-2 p-1 bg-[var(--bg)] rounded-[2px] border border-[var(--border-subtle)]">
                  <button
                    onClick={() => setDesktopMode('local')}
                    className={`flex-1 py-1.5 text-xs font-mono rounded-[2px] transition-all ${
                      desktopMode === 'local'
                        ? 'bg-[var(--surface-secondary)] text-[var(--green-proven)] font-bold shadow'
                        : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                    }`}
                  >
                    Local Runtime (Rust/SQLite)
                  </button>
                  <button
                    onClick={() => setDesktopMode('remote')}
                    className={`flex-1 py-1.5 text-xs font-mono rounded-[2px] transition-all ${
                      desktopMode === 'remote'
                        ? 'bg-[var(--surface-secondary)] text-[var(--blue-outline)] font-bold shadow'
                        : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                    }`}
                  >
                    Remote Cluster (Go/NATS)
                  </button>
                </div>

                <div className="p-4 rounded-[2px] bg-[var(--bg)] border border-[var(--border-subtle)] font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-dimmer)]">Runtime Target:</span>
                    <span className="text-[var(--text)] font-bold">
                      {desktopMode === 'local' ? '127.0.0.1:9092 (Local Process)' : 'cloud.atlas.internal (NATS Fleet)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-dimmer)]">IPC Latency:</span>
                    <span className="text-[var(--green-proven)] font-bold">
                      {desktopMode === 'local' ? '0.4ms (Unix Domain Socket)' : '18.2ms (gRPC mTLS)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-dimmer)]">Persistence:</span>
                    <span className="text-[var(--text)] font-bold">
                      {desktopMode === 'local' ? 'Embedded SQLite WAL' : 'Distributed PostgreSQL + pgvector'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-dimmer)]">Offline Capability:</span>
                    <span className="text-[var(--green-proven)] font-bold">
                      {desktopMode === 'local' ? '100% Full Local Inference' : 'Online Connection Active'}
                    </span>
                  </div>
                </div>

                <div className="text-[11.5px] text-[var(--text-dim)] leading-relaxed">
                  Single code surface allows operators to develop offline on airplanes or laptops, then dispatch heavy batches to remote clusters with 0 config changes.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

