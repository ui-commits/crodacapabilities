import React from 'react';
import { X, ShieldCheck, Compass, Keyboard, CheckCircle2, Layers, Sun, Moon } from 'lucide-react';

interface OsSystemModalsProps {
  activeModal: 'about' | 'help' | null;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  visitedCount: number;
  inspectedNodeCount: number;
}

export const OsSystemModals: React.FC<OsSystemModalsProps> = ({
  activeModal,
  onClose,
  theme,
  onToggleTheme,
  visitedCount,
  inspectedNodeCount,
}) => {
  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10, 9, 8, 0.72)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="os-modal-title"
    >
      <div
        className="w-full max-w-[620px] border-2 shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--surface-primary)',
          borderColor: 'var(--blue-outline)',
          color: 'var(--text)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal OS Title Bar */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{
            backgroundColor: 'var(--surface-tertiary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-2.5 font-mono text-xs font-bold tracking-wider uppercase">
            <Compass className="w-4 h-4 text-[var(--blue-outline)]" />
            <span id="os-modal-title">
              {activeModal === 'about'
                ? 'System Specification · Desert Strategic OS (2026–2027)'
                : 'Operator Manual · Tactical Controls & Verification Guide'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 border transition-colors cursor-pointer hover:bg-[var(--surface-secondary)]"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {activeModal === 'about' ? (
          <div className="p-6 space-y-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--blue-outline)] font-bold mb-1">
                CAP/PROFILE/001 · ARCHITECTURE DOSSIER
              </div>
              <h2 className="text-2xl font-bold text-[var(--text)] m-0">
                C. Rodriguez — Engineering Capability OS
              </h2>
              <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
                Designed around 2026–2027 strategic and cartographic interface standards. Rather than a traditional scrolling web page, this environment operates inside a fixed-dimension tactical workstation frame sitting above a live desert topographic elevation map and wind-particle canvas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="p-4 border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--green-proven)] uppercase mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>WCAG AAA High Contrast</span>
                </div>
                <p className="text-xs text-[var(--text-dim)] leading-relaxed m-0">
                  Both Sonoran Night Ops (Dark) and Mojave Daylight (Light) exceed the strict 7.0:1 WCAG AAA contrast ratio across all primary, secondary, and metadata typography tiers.
                </p>
              </div>

              <div
                className="p-4 border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--blue-outline)] uppercase mb-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Current Telemetry Status</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-[var(--text-dim)]">
                  <div>Chapters Reviewed: <strong className="text-[var(--text)]">{visitedCount} / 5</strong></div>
                  <div>Topology Nodes Verified: <strong className="text-[var(--text)]">{inspectedNodeCount} / 8</strong></div>
                  <div>Active Posture: <strong className="text-[var(--text)] uppercase">{theme === 'dark' ? 'Sonoran Night (Dark)' : 'Mojave Daylight (Light)'}</strong></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={onToggleTheme}
                className="px-3.5 py-2 border text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--yellow-work)]" /> : <Moon className="w-4 h-4 text-[var(--blue-outline)]" />}
                <span>Switch to {theme === 'dark' ? 'Mojave Daylight (Light)' : 'Sonoran Night (Dark)'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 border text-xs font-mono font-bold cursor-pointer"
                style={{
                  backgroundColor: 'var(--blue-outline)',
                  borderColor: 'var(--blue-outline)',
                  color: theme === 'dark' ? '#14110E' : '#FAF6EE',
                }}
              >
                Acknowledge
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--blue-outline)] font-bold mb-1">
                TACTICAL WORKSTATION MANUAL
              </div>
              <h2 className="text-2xl font-bold text-[var(--text)] m-0">
                Navigation, Menus &amp; Progress Verification
              </h2>
            </div>

            <div className="space-y-3">
              <div
                className="p-3.5 border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text)] mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[var(--green-proven)]" />
                  <span>1. Interactive Node Topology &amp; Progress Verification</span>
                </div>
                <p className="text-xs text-[var(--text-dim)] leading-relaxed m-0">
                  Click any of the 8 circular nodes in the Interactive Node Topology (or use the &quot;Verify Node&quot; action button in the progress bar) to inspect its production evidence and advance your dossier verification score toward 100%.
                </p>
              </div>

              <div
                className="p-3.5 border"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text)] mb-1">
                  <Keyboard className="w-4 h-4 text-[var(--blue-outline)]" />
                  <span>2. Hardware Keyboard Shortcuts</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[var(--text-dim)] mt-2">
                  <div><kbd className="px-1.5 py-0.5 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text)] font-bold">1</kbd> – <kbd className="px-1.5 py-0.5 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text)] font-bold">5</kbd> Jump to Chapter 01–05</div>
                  <div><kbd className="px-1.5 py-0.5 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text)] font-bold">←</kbd> / <kbd className="px-1.5 py-0.5 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text)] font-bold">→</kbd> Previous / Next Chapter</div>
                  <div><kbd className="px-1.5 py-0.5 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text)] font-bold">N</kbd> Inspect Next Topology Node</div>
                  <div><kbd className="px-1.5 py-0.5 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text)] font-bold">T</kbd> Toggle Desert Dark / Light</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[var(--border-subtle)]">
              <button
                onClick={onClose}
                className="px-4 py-2 border text-xs font-mono font-bold cursor-pointer"
                style={{
                  backgroundColor: 'var(--blue-outline)',
                  borderColor: 'var(--blue-outline)',
                  color: theme === 'dark' ? '#14110E' : '#FAF6EE',
                }}
              >
                Resume Operations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
