import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="document-footer"
      className="max-w-[1300px] mx-auto py-6 px-6 sm:px-8 border-t md:border-l md:border-t-0 font-mono text-[11px]"
      style={{
        borderColor: 'var(--border)',
        color: 'var(--text-dimmer)',
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span>
          CAP/PROFILE/001 · draft v4 · mermaid diagram with green/yellow/red color coding · production-ready layout
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
          C. RODRIGUEZ · RUNTIME INFRASTRUCTURE
        </span>
      </div>
    </footer>
  );
};
