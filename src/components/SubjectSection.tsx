import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export const SubjectSection: React.FC = () => {
  return (
    <section id="subject" className="space-y-8">
      {/* Level 1 Headline & Cascading Size/Color Hierarchy */}
      <div className="border-b pb-5" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 text-[var(--blue-outline)]">
          <span>01. Subject Profile &amp; Architectural Thesis</span>
          <span>FILE — CAP/PROFILE/001</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-2">
          C. Rodriguez
        </h1>

        <p className="text-base sm:text-lg font-semibold text-[var(--text-dim)] m-0">
          Full-Stack Systems Engineer · Runtime &amp; Agentic Infrastructure
        </p>
      </div>

      {/* Level 2 Subheader & Level 3 Analysis Prose */}
      <div className="space-y-4 max-w-[72ch]">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text)] m-0">
          Architectural Thesis
        </h2>

        <div className="space-y-4 text-base leading-relaxed text-[var(--text)]">
          <p className="font-medium">
            Applying formal queuing theory and supply chain logistics to distributed software architecture. The focus is strictly on the operational control plane: runtimes, multi-agent orchestration, telemetry, deterministic state machines, and event replay mechanisms.
          </p>
          <p className="text-[var(--text-dim)]">
            The through-line across all 19 Atlas projects is control plane legibility. It is the practice of surfacing hidden state transitions, concurrency bottlenecks, and distributed failure domains, making complex mechanical realities navigable for operators and decision-makers without relying on leaky abstractions.
          </p>
          <p className="text-sm text-[var(--text-dimmer)]">
            Current architectural focus extends beyond runtime state visualization into deep infrastructure—hardening persistence layers, deploying local inference pipelines, and engineering the backend event-driven architectures required to support them.
          </p>
        </div>
      </div>

      {/* Level 2 Subheader: Core Working Positions */}
      <div
        className="border p-6 space-y-4"
        style={{
          backgroundColor: 'var(--surface-secondary)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-bold text-[var(--text)] m-0">
            Core Working Positions
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--blue-outline)] uppercase">
            FIRST PRINCIPLES
          </span>
        </div>

        <ul className="divide-y divide-[var(--border-subtle)] m-0 p-0 list-none">
          <li className="py-3.5 first:pt-1">
            <h3 className="text-base font-bold text-[var(--text)] mb-1">
              01. Agents as Execution, Not Orchestration
            </h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed m-0">
              Agentic autonomy is an emergent property of rigorously modeled, deterministic workflows (finite state machines). Agents are functional units that belong inside a governed loop; they are not reliable workflow architects.
            </p>
          </li>

          <li className="py-3.5">
            <h3 className="text-base font-bold text-[var(--text)] mb-1">
              02. Human-in-the-Loop (HITL) as a Core Primitive
            </h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed m-0">
              HITL is a primary control plane mechanism, not a retroactive safety patch. System failures routinely attributed to AI are operational design failures—specifically, the failure to engineer proper state-handoffs, escalation paths, and boundary constraints for human operators.
            </p>
          </li>

          <li className="py-3.5">
            <h3 className="text-base font-bold text-[var(--text)] mb-1">
              03. Infrastructure Sovereignty
            </h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed m-0">
              Reliance on cloud-only inference introduces unacceptable coupling and uncontrollable failure domains. Hardened local AI infrastructure and local model execution are non-negotiable requirements for operational resilience.
            </p>
          </li>

          <li className="py-3.5 last:pb-0">
            <h3 className="text-base font-bold text-[var(--text)] mb-1">
              04. Composability Over Monolithic Horizons
            </h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed m-0">
              Long-term platform viability demands strict separation of orchestration from execution. Architectural focus centers on decoupled multi-agent orchestration, specialized local inference, and precise operator tooling over generalized black-box dependencies.
            </p>
          </li>
        </ul>
      </div>

      {/* Foundation & Trajectory */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-[var(--text)] m-0">
          Foundation &amp; Trajectory
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="border p-5 flex items-start gap-3.5"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <GraduationCap className="w-5 h-5 text-[var(--blue-outline)] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--text-dimmer)] mb-1">
                Academic Foundation
              </div>
              <h3 className="text-base font-bold text-[var(--text)] m-0">
                Texas A&amp;M University
              </h3>
              <p className="text-sm text-[var(--text-dim)] mt-1 leading-snug m-0">
                B.S. Industrial Distribution (Supply Chain Engineering &amp; Queuing Theory)
              </p>
            </div>
          </div>

          <div
            className="border p-5 flex items-start gap-3.5"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <ShieldCheck className="w-5 h-5 text-[var(--green-proven)] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--text-dimmer)] mb-1">
                Systems Trajectory
              </div>
              <h3 className="text-base font-bold text-[var(--text)] m-0">
                19 Project Atlas Records
              </h3>
              <p className="text-sm text-[var(--text-dim)] mt-1 leading-snug m-0">
                Core focus on Runtime Architecture, Time-Travel Event Replay, and Operator Control Planes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
