import React, { useState } from 'react';
import { WORKING_POSITIONS } from '../data';
import {
  GraduationCap,
  Boxes,
  Compass,
  Mail,
  Github,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Activity,
  Cpu,
} from 'lucide-react';

export const SubjectAccessPage: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section
      id="subject"
      className="pb-16 mb-16 border-b scroll-mt-20 space-y-10"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      {/* Page Header */}
      <div>
        <div
          className="text-[11px] font-mono uppercase tracking-[0.08em] mb-2.5"
          style={{ color: 'var(--text-secondary)' }}
        >
          05 — Subject Record & Direct Access
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          C. Rodriguez
        </h1>

        <p
          className="font-mono text-xs sm:text-[13px] mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          Full-Stack Systems Engineer · Industrial Distribution (TAMU) · Runtime & Agent Infrastructure
        </p>
      </div>

      {/* Main Profile Summary Card */}
      <div
        className="border rounded-[var(--radius-panel)] p-5 sm:p-7 space-y-6"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase font-bold" style={{ color: 'var(--text-primary)' }}>
            <Terminal className="w-4 h-4 text-[var(--text-secondary)]" />
            <span>Personnel Record: Engineering Lineage & Translation Core</span>
          </div>
          <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[var(--surface-raised)] border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--state-active)' }}>
            ● OPEN FOR CONSULTING & RUNTIME ROLES
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Narrative Text */}
          <div className="lg:col-span-8 space-y-4 text-[15px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            <p>
              Graduate of <strong className="text-[var(--text-primary)] font-semibold">Texas A&amp;M University's Industrial Distribution program</strong> (applied supply chain engineering and operations research), and a self-directed systems developer since.
            </p>
            <p>
              The combination shows up directly in the engineering style: formal academic training in how complex stochastic systems move, queue, and fail — applied directly to software that few people outside engineering ever inspect: distributed runtimes, event replay engines, memory lifecycles, and operator control surfaces.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              The central thesis across nineteen production projects in Project Atlas is <strong className="text-[var(--text-primary)]">translation</strong>: taking opaque backend mechanics (finite state machines, AST parsers, streaming telemetry) and making them navigable and trustworthy for humans in the loop.
            </p>
          </div>

          {/* Quick Stats Column */}
          <div className="lg:col-span-4 space-y-3 font-mono text-[11.5px]">
            <div className="p-3.5 rounded border" style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-1.5 text-[10px] uppercase text-[var(--text-muted)] mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Discipline</span>
              </div>
              <div className="font-bold text-[var(--text-primary)]">Texas A&M University</div>
              <div className="text-[var(--text-secondary)] text-[11px]">Industrial Distribution (B.S.)</div>
            </div>

            <div className="p-3.5 rounded border" style={{ backgroundColor: 'var(--canvas-base)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-1.5 text-[10px] uppercase text-[var(--text-muted)] mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Portfolio Breadth</span>
              </div>
              <div className="font-bold text-[var(--text-primary)]">19 Project Atlas Records</div>
              <div className="text-[var(--text-secondary)] text-[11px]">Systems, UI & Orchestration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Working Positions & Core Theses */}
      <div
        className="border rounded-[var(--radius-panel)] p-5 sm:p-7 space-y-5"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase font-bold" style={{ color: 'var(--text-primary)' }}>
            <ShieldCheck className="w-4 h-4 text-[var(--text-secondary)]" />
            <span>Core Working Positions & Architecture Theses</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            Guiding Rules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKING_POSITIONS.map((principle, idx) => (
            <div
              key={idx}
              className="p-4 rounded border text-[13.5px] leading-relaxed flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--surface-raised)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <div>
                <div className="font-mono text-[10px] text-[var(--text-secondary)] uppercase mb-1.5 font-bold">
                  Position 0{idx + 1}
                </div>
                <p>“{principle.statement}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Communication Channels */}
      <div
        className="border rounded-[var(--radius-panel)] p-5 sm:p-7 space-y-6"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase font-bold" style={{ color: 'var(--text-primary)' }}>
            <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
            <span>Direct Channels & Verification Access</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            Direct Line
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[12px]">
          {/* Email */}
          <div
            className="p-3.5 rounded border flex flex-col justify-between"
            style={{ backgroundColor: 'var(--surface-raised)', borderColor: 'var(--border-subtle)' }}
          >
            <div>
              <div className="text-[10px] uppercase text-[var(--text-muted)] mb-1">Direct Email</div>
              <div className="font-semibold text-[var(--text-primary)] text-[12.5px] truncate">
                ChristopherIDIS@gmail.com
              </div>
            </div>
            <button
              onClick={() => handleCopy('ChristopherIDIS@gmail.com', 'email')}
              className="mt-3 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border transition-colors hover:bg-[var(--canvas-base)]"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
            >
              {copiedKey === 'email' ? <Check className="w-3 h-3 text-[var(--state-active)]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'email' ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>

          {/* GitHub */}
          <div
            className="p-3.5 rounded border flex flex-col justify-between"
            style={{ backgroundColor: 'var(--surface-raised)', borderColor: 'var(--border-subtle)' }}
          >
            <div>
              <div className="text-[10px] uppercase text-[var(--text-muted)] mb-1">GitHub Repos</div>
              <div className="font-semibold text-[var(--text-primary)] text-[12.5px]">
                github.com/chris-idis
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border transition-colors hover:bg-[var(--canvas-base)]"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)', textDecoration: 'none' }}
            >
              <Github className="w-3 h-3" />
              <span>Open GitHub</span>
            </a>
          </div>

          {/* Atlas Ecosystem */}
          <div
            className="p-3.5 rounded border flex flex-col justify-between"
            style={{ backgroundColor: 'var(--surface-raised)', borderColor: 'var(--border-subtle)' }}
          >
            <div>
              <div className="text-[10px] uppercase text-[var(--text-muted)] mb-1">Project Atlas Hub</div>
              <div className="font-semibold text-[var(--text-primary)] text-[12.5px] truncate">
                project-atlas-seven-nu
              </div>
            </div>
            <a
              href="https://project-atlas-seven-nu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border transition-colors hover:bg-[var(--canvas-base)]"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)', textDecoration: 'none' }}
            >
              <Compass className="w-3 h-3" />
              <span>Open Atlas</span>
            </a>
          </div>

          {/* Discord */}
          <div
            className="p-3.5 rounded border flex flex-col justify-between"
            style={{ backgroundColor: 'var(--surface-raised)', borderColor: 'var(--border-subtle)' }}
          >
            <div>
              <div className="text-[10px] uppercase text-[var(--text-muted)] mb-1">Discord / Chat</div>
              <div className="font-semibold text-[var(--text-primary)] text-[12.5px]">
                chris_idis
              </div>
            </div>
            <button
              onClick={() => handleCopy('chris_idis', 'discord')}
              className="mt-3 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border transition-colors hover:bg-[var(--canvas-base)]"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
            >
              {copiedKey === 'discord' ? <Check className="w-3 h-3 text-[var(--state-active)]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'discord' ? 'Copied' : 'Copy Handle'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
