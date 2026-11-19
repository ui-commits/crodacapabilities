import React from 'react';
import { ROADMAP_PHASES, WORKING_POSITIONS } from '../data';
import { Layers, Workflow, Sparkles, CheckCircle2, Shield, Network, ArrowDown, ExternalLink } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  return (
    <section
      id="ecosystem"
      className="space-y-8"
    >
      <div>
        <div
          className="text-[11px] font-mono uppercase tracking-[0.08em] mb-2.5 flex items-center justify-between"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>04 — Vertical Architecture Ecosystem &amp; Roadmap</span>
          <span className="text-[10px] font-bold text-[var(--state-active)]">UNIFIED STACK</span>
        </div>

        <h2
          className="text-2xl sm:text-[28px] font-bold tracking-tight mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Atlas Runtime: One Vertical Architecture
        </h2>

        <p
          className="text-[15px] leading-relaxed max-w-[70ch]"
          style={{ color: 'var(--text-secondary)' }}
        >
          Not three unrelated demos — one unified reference ecosystem for building, observing, evaluating,
          and operating agentic systems across the full stack.
        </p>
      </div>


      {/* Unified Vertical Stack Architecture Box */}
      <div
        className="border rounded-[var(--radius-panel)] p-5 sm:p-7 mb-10"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase font-bold" style={{ color: 'var(--text-primary)' }}>
            <Workflow className="w-4 h-4 text-[var(--text-secondary)]" />
            <span>Vertical Stack Topology: Control, Execution, Data & Systems</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            Single Ecosystem Reference
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Vertical Stack Diagram (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="p-4 rounded-[var(--radius-panel)] border font-mono text-[11px] overflow-x-auto leading-tight"
              style={{
                backgroundColor: 'var(--canvas-base)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <pre className="whitespace-pre">{`                         USER / OPERATOR
                               │
                               ▼
                      ┌─────────────────┐
                      │ Tauri Control   │  ◄── ASTRO / REACT UI
                      │ Plane Shell     │      (Local Desktop Native)
                      │ Rust + Astro    │
                      └────────┬────────┘
                               │ IPC / Stream
                               ▼
                      ┌─────────────────┐
                      │ Agent Runtime   │  ◄── GO DISTRIBUTED ENGINE
                      │ Core Engine     │      (Queues, Retries, Replay)
                      │ Go              │
                      └────────┬────────┘
                               │
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
                 Workers     Events      Tools
                    │          │          │
                    └──────────┼──────────┘
                               ▼
                     ┌──────────────────┐
                     │ Memory / Data    │  ◄── POSTGRESQL CONSOLIDATION
                     │ PostgreSQL       │      • pgvector (Embeddings)
                     │ pgvector         │      • S3 (Artifacts & Dumps)
                     │ Object Storage   │
                     └────────┬─────────┘
                              │
                              ▼
                        Evaluation (Automated Benchmarks)
                              │
                              ▼
                         Telemetry (OpenTelemetry Spans)
                              │
                              └──────────────► Tauri Control Plane`}</pre>
            </div>
          </div>

          {/* Stack Synergy Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded border" style={{ backgroundColor: 'var(--surface-raised)', borderColor: 'var(--border-subtle)' }}>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-bold mb-1.5">
                Coherent Technology Story
              </div>
              <ul className="space-y-1.5 font-mono text-[11.5px] text-[var(--text-primary)]">
                <li><b className="text-[var(--text-secondary)]">Astro:</b> Technical documentation & Web UI</li>
                <li><b className="text-[var(--text-secondary)]">Tauri:</b> Zero-latency desktop shell</li>
                <li><b className="text-[var(--text-secondary)]">Rust:</b> Native systems / local isolate core</li>
                <li><b className="text-[var(--text-secondary)]">Go:</b> Distributed backend & worker runtime</li>
                <li><b className="text-[var(--text-secondary)]">PostgreSQL:</b> Durable execution & relational state</li>
                <li><b className="text-[var(--text-secondary)]">pgvector:</b> Semantic memory retrieval</li>
                <li><b className="text-[var(--text-secondary)]">S3:</b> Binary object & artifact storage</li>
                <li><b className="text-[var(--text-secondary)]">OpenTelemetry:</b> High-frequency tracing</li>
              </ul>
            </div>

            <div className="p-4 rounded border font-mono text-[11px]" style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)' }}>
              <div className="font-bold text-[var(--text-primary)] mb-1">The Credibility Payoff</div>
              <p className="text-[var(--text-secondary)] text-[11.5px] leading-relaxed">
                Transforming from an “AI application developer” to an <span className="font-bold text-[var(--text-primary)]">Agent Runtime / Systems Engineer</span> who can walk into any technical room and adapt full-stack agent infrastructure to production environments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Progression Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {ROADMAP_PHASES.map((phase) => (
          <div
            key={phase.phase}
            id={`roadmap-card-${phase.phase.toLowerCase().replace(/\s+/g, '-')}`}
            className="border border-dashed rounded-[var(--radius-panel)] p-5 flex flex-col justify-between transition-all hover:border-[var(--text-primary)]"
            style={{
              backgroundColor: 'var(--structural-dark)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-mono text-[10px] tracking-[0.08em] px-2 py-0.5 rounded font-semibold border"
                  style={{
                    backgroundColor: 'var(--surface-sunken)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {phase.phase}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                  {phase.status}
                </span>
              </div>

              <h3
                className="text-[17px] font-bold mb-1.5"
                style={{ color: 'var(--text-primary)' }}
              >
                {phase.title}
              </h3>

              <div
                className="font-mono text-[11px] leading-relaxed mb-3 text-[var(--text-secondary)]"
              >
                {phase.stack.join(' · ')}
              </div>

              <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)] mb-4">
                {phase.description}
              </p>
            </div>

            <div
              className="text-[12px] border-t pt-3 font-mono leading-snug"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              <b style={{ color: 'var(--text-primary)' }}>Proves:</b> {phase.proves}
            </div>
          </div>
        ))}
      </div>

      {/* Working Positions & Philosophy */}
      <div
        className="border rounded-[var(--radius-panel)] p-5 sm:p-7"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-2 font-mono text-[12px] uppercase font-bold pb-3 mb-5 border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
          <Shield className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>Core Engineering Principles & Working Positions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKING_POSITIONS.map((principle, idx) => (
            <div
              key={idx}
              className="p-4 rounded border text-[13px] leading-relaxed"
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">
                Position 0{idx + 1}
              </div>
              <p>{principle.statement}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
