import React, { useState } from 'react';
import { Mail, Github, ExternalLink, Copy, Check, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('ui.commits@icloud.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="space-y-8">
      {/* Level 1 Headline */}
      <div className="border-b pb-5" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 text-[var(--blue-outline)]">
          <span>05. Direct Communications &amp; Registry</span>
          <span>VERIFIED CHANNELS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-3">
          Initiate Technical Dialogue
        </h1>

        <p className="text-base sm:text-[17px] leading-relaxed max-w-[68ch] text-[var(--text-dim)] font-medium m-0">
          Available for Principal Systems Architect, Director of Engineering, and Full-Stack Agentic Infrastructure engagements.
        </p>
      </div>

      {/* 3 Direct Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Email Card */}
        <div
          className="border p-5 space-y-3"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-[var(--text-dimmer)]">
            <span>01. Direct Electronic Mail</span>
            <button
              onClick={handleCopyEmail}
              className="px-2 py-0.5 border text-[11px] font-mono font-bold cursor-pointer flex items-center gap-1"
              style={{
                backgroundColor: 'var(--surface-primary)',
                borderColor: 'var(--border)',
                color: copiedEmail ? 'var(--green-proven)' : 'var(--text)',
              }}
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
          <h2 className="text-lg font-bold text-[var(--text)] m-0">
            Primary Inbox
          </h2>
          <a
            href="mailto:ui.commits@icloud.com"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[var(--blue-outline)] hover:underline"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>ui.commits@icloud.com</span>
          </a>
        </div>

        {/* GitHub Card */}
        <div
          className="border p-5 space-y-3"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="text-xs font-mono font-bold uppercase text-[var(--text-dimmer)]">
            02. Source Repositories
          </div>
          <h2 className="text-lg font-bold text-[var(--text)] m-0">
            GitHub Engineering Profile
          </h2>
          <a
            href="https://github.com/ui-commits"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[var(--blue-outline)] hover:underline"
          >
            <Github className="w-4 h-4 shrink-0" />
            <span>github.com/ui-commits</span>
          </a>
        </div>

        {/* Project Atlas Registry Card */}
        <div
          className="border p-5 space-y-3"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="text-xs font-mono font-bold uppercase text-[var(--text-dimmer)]">
            03. Production Portfolio
          </div>
          <h2 className="text-lg font-bold text-[var(--text)] m-0">
            Project Atlas Registry
          </h2>
          <a
            href="https://project-atlas-seven-nu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[var(--green-proven)] hover:underline"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span>19 Live Production Records</span>
          </a>
        </div>
      </div>
    </section>
  );
};
