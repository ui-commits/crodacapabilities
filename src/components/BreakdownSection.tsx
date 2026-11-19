import React, { useState } from 'react';
import {
  TIER_1_PROVEN_ITEMS,
  TIER_2_UNDEREXPOSED_ITEMS,
  TIER_3_ROADMAP_ITEMS,
  DEPRIORITIZED_ITEMS,
} from '../data';

export const BreakdownSection: React.FC = () => {
  const [filterTier, setFilterTier] = useState<'all' | 'proven' | 'underexposed' | 'roadmap'>('all');

  return (
    <section id="tiers" className="space-y-8">
      {/* Level 1 Headline */}
      <div className="border-b pb-5" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 text-[var(--blue-outline)]">
          <span>03. Capability Matrix &amp; Credibility Tiers</span>
          <span>17 ARCHITECTURAL ELEMENTS AUDITED</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-3">
          Strategic Capability Breakdown
        </h1>

        <p className="text-base sm:text-[17px] leading-relaxed max-w-[68ch] text-[var(--text-dim)] font-medium m-0">
          A rigorous audit of demonstrated production capability versus implied foundation and scheduled roadmap deliverables across the full agentic systems stack.
        </p>
      </div>

      {/* Interactive Filter Segmented Bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterTier('all')}
          className="px-3.5 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer"
          style={{
            backgroundColor: filterTier === 'all' ? 'var(--surface-tertiary)' : 'var(--surface-primary)',
            borderColor: filterTier === 'all' ? 'var(--blue-outline)' : 'var(--border)',
            color: 'var(--text)',
          }}
        >
          All Tiers (17 Elements)
        </button>
        <button
          onClick={() => setFilterTier('proven')}
          className="px-3.5 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer"
          style={{
            backgroundColor: filterTier === 'proven' ? 'var(--surface-tertiary)' : 'var(--surface-primary)',
            borderColor: filterTier === 'proven' ? 'var(--green-proven)' : 'var(--border)',
            color: filterTier === 'proven' ? 'var(--green-proven)' : 'var(--text-dim)',
          }}
        >
          Tier 1: Proven (8)
        </button>
        <button
          onClick={() => setFilterTier('underexposed')}
          className="px-3.5 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer"
          style={{
            backgroundColor: filterTier === 'underexposed' ? 'var(--surface-tertiary)' : 'var(--surface-primary)',
            borderColor: filterTier === 'underexposed' ? 'var(--yellow-work)' : 'var(--border)',
            color: filterTier === 'underexposed' ? 'var(--yellow-work)' : 'var(--text-dim)',
          }}
        >
          Tier 2: Underexposed (6)
        </button>
        <button
          onClick={() => setFilterTier('roadmap')}
          className="px-3.5 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer"
          style={{
            backgroundColor: filterTier === 'roadmap' ? 'var(--surface-tertiary)' : 'var(--surface-primary)',
            borderColor: filterTier === 'roadmap' ? 'var(--red-gap)' : 'var(--border)',
            color: filterTier === 'roadmap' ? 'var(--red-gap)' : 'var(--text-dim)',
          }}
        >
          Tier 3–4: Roadmap (3)
        </button>
      </div>

      {/* Tier 1: Proven */}
      {(filterTier === 'all' || filterTier === 'proven') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-bold text-[var(--text)] m-0">
              Tier 1: Proven Production Capabilities
            </h2>
            <span className="text-xs font-mono font-bold text-[var(--green-proven)] uppercase">
              VERIFIED IN 19 ATLAS RECORDS
            </span>
          </div>

          <p className="text-base text-[var(--text-dim)] leading-relaxed max-w-[72ch] m-0">
            Eight interconnected capabilities demonstrated across nineteen projects. These form the core operational identity—agent runtimes, orchestration, deterministic state management, observability, and operator control surfaces.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIER_1_PROVEN_ITEMS.map((item) => (
              <div
                key={item.title}
                className="border p-4 space-y-2 transition-colors hover:border-[var(--blue-outline)]"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--green-proven)] uppercase">TIER 1 · PROVEN</span>
                  <span className="font-bold text-[var(--blue-outline)]">{item.rating}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] m-0">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[var(--text-dim)] leading-relaxed m-0 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  {item.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier 2: Underexposed */}
      {(filterTier === 'all' || filterTier === 'underexposed') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-bold text-[var(--text)] m-0">
              Tier 2: Underexposed Infrastructure Layer
            </h2>
            <span className="text-xs font-mono font-bold text-[var(--yellow-work)] uppercase">
              IMPLIED BY RUNTIME WORK
            </span>
          </div>

          <p className="text-base text-[var(--text-dim)] leading-relaxed max-w-[72ch] m-0">
            The backend substrate layer implied by existing runtime architectures. The priority is surfacing these capabilities explicitly through public reference implementations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIER_2_UNDEREXPOSED_ITEMS.map((item) => (
              <div
                key={item.title}
                className="border p-4 space-y-2 transition-colors hover:border-[var(--blue-outline)]"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--yellow-work)] uppercase">TIER 2 · SUBSTRATE</span>
                  <span className="font-bold text-[var(--text)]">{item.rating}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] m-0">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[var(--text-dim)] leading-relaxed m-0 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  {item.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier 3-4: Roadmap Gaps */}
      {(filterTier === 'all' || filterTier === 'roadmap') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2.5 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-bold text-[var(--text)] m-0">
              Tier 3–4: Strategic Roadmap Deliverables
            </h2>
            <span className="text-xs font-mono font-bold text-[var(--red-gap)] uppercase">
              3 FLAGSHIP CLOSING PHASES
            </span>
          </div>

          <p className="text-base text-[var(--text-dim)] leading-relaxed max-w-[72ch] m-0">
            These three vertical capabilities bridge the record from runtime control plane architect to full-stack agentic infrastructure lead.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIER_3_ROADMAP_ITEMS.map((item) => (
              <div
                key={item.title}
                className="border p-5 space-y-2.5 transition-colors hover:border-[var(--blue-outline)]"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--red-gap)] uppercase">{item.phase}</span>
                  <span className="font-bold text-[var(--text)]">{item.rating}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] m-0">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-[var(--text-dim)] leading-relaxed">
                  {item.stack}
                </div>
                <div className="text-sm text-[var(--text)] pt-2.5 border-t leading-relaxed" style={{ borderColor: 'var(--border-subtle)' }}>
                  <strong className="font-bold">Proves: </strong>
                  {item.proves}
                </div>
              </div>
            ))}
          </div>

          {/* Deliberately Not Prioritized */}
          <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-dimmer)] mb-3 font-bold">
              Deliberately Deprioritized Scope
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DEPRIORITIZED_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="border p-4"
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="text-sm font-bold line-through text-[var(--text-dim)] mb-1">
                    {item.title}
                  </div>
                  <p className="text-xs text-[var(--text-dimmer)] leading-normal m-0">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
