import React, { useState } from 'react';
import { TOPOLOGY_NODES, TELEMETRY_LAYERS, DEPRIORITIZED_ITEMS } from '../data';
import { TopologyNode } from '../types';
import { Layers, Activity, Sparkles, X, ChevronRight, CheckCircle2 } from 'lucide-react';

export const SystemMapSection: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeNodeId = hoveredNodeId || selectedNodeId;
  const activeNode: TopologyNode | undefined = TOPOLOGY_NODES.find((n) => n.id === activeNodeId);

  // SVG curved connector paths definition: exactly matching the topological closed loop
  const edgeCurves = [
    { from: 'node-01', to: 'node-02', d: 'M 260 70 Q 307.02 146.48 394.35 125.65' },
    { from: 'node-02', to: 'node-03', d: 'M 394.35 125.65 Q 373.52 212.98 450 260' },
    { from: 'node-03', to: 'node-04', d: 'M 450 260 Q 373.52 307.03 394.35 394.35' },
    { from: 'node-04', to: 'node-05', d: 'M 394.35 394.35 Q 307.02 373.53 260 450' },
    { from: 'node-05', to: 'node-06', d: 'M 260 450 Q 212.98 373.53 125.65 394.35' },
    { from: 'node-06', to: 'node-07', d: 'M 125.65 394.35 Q 146.48 307.03 70 260' },
    { from: 'node-07', to: 'node-08', d: 'M 70 260 Q 146.48 212.98 125.65 125.65' },
    { from: 'node-08', to: 'node-01', d: 'M 125.65 125.65 Q 212.98 146.48 260 70' },
  ];

  const handleNodeClick = (id: string) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="map"
      className="space-y-8"
    >
      <div>
        <div
          className="text-[11px] font-mono uppercase tracking-[0.08em] mb-2.5 flex items-center justify-between"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>01 — System Topology Map</span>
          <span className="text-[10px] font-bold text-[var(--state-active)]">LIVE TOPOLOGY</span>
        </div>

        <h2
          className="text-2xl sm:text-[28px] font-bold tracking-tight mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          The proven core, as a live topology
        </h2>

        <p
          className="text-[15px] leading-relaxed max-w-[68ch]"
          style={{ color: 'var(--text-secondary)' }}
        >
          Eight roles, one closed loop — operator feedback runs back into orchestration, same as the
          philosophy states. ★ rates demonstrated ability. Dots on the layer below rate how visible the
          proof is, not the skill itself.
        </p>
      </div>


      {/* Legend */}
      <div
        className="flex flex-wrap gap-4 sm:gap-5 font-mono text-[11.5px] border rounded-[var(--radius-panel)] p-3.5 sm:p-4 mb-9"
        style={{
          backgroundColor: 'var(--structural-dark)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-secondary)',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 flex-none rounded-[1px] border"
            style={{
              backgroundColor: 'var(--surface-raised)',
              borderColor: 'var(--border-subtle)',
            }}
          />
          <span>Ring node — proven, live in the Atlas</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 flex-none rounded-[1px]"
            style={{ backgroundColor: 'var(--text-secondary)' }}
          />
          <span>◐ ○ Proof-progress, underexposed layer</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 flex-none rounded-[1px] border border-dashed"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'var(--text-secondary)',
            }}
          />
          <span>Dashed panel — roadmap, not yet built</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 flex-none rounded-[1px] border"
            style={{
              backgroundColor: 'var(--structural-dark)',
              borderColor: 'var(--border-subtle)',
            }}
          />
          <span>Deliberately deprioritized</span>
        </div>

        <div
          className="w-full text-[10.5px] font-sans mt-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Ring geometry and node/edge states are ported from the Chromatic Topology UI kit's own token system.
        </div>
      </div>

      {/* Ring & Ledger Wrap */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start mb-6">
        {/* Ring Plane */}
        <div
          className="relative w-full max-w-[480px] aspect-square mx-auto flex-none select-none"
          style={{ touchAction: 'manipulation' }}
        >
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 520 520">
            {/* Guide circle & Telemetry Track */}
            <circle
              cx="260"
              cy="260"
              r="190"
              className="fill-none stroke-[1.5]"
              style={{ stroke: 'rgba(112, 115, 151, 0.35)' }}
            />
            {/* Outer animated telemetry pulse */}
            <circle cx="260" cy="260" r="190" className="ring-telemetry-pulse" />

            {/* Inner secondary orbit */}
            <circle
              cx="260"
              cy="260"
              r="120"
              className="fill-none stroke-dashed stroke-[1]"
              style={{ stroke: 'rgba(112, 115, 151, 0.18)', strokeDasharray: '4 6' }}
            />

            {/* Bezier connector edges */}
            {edgeCurves.map((edge, idx) => {
              const isHighlighted =
                activeNodeId && (edge.from === activeNodeId || edge.to === activeNodeId);
              return (
                <path
                  key={idx}
                  d={edge.d}
                  className="fill-none transition-all duration-300"
                  style={{
                    stroke: isHighlighted ? 'var(--text-primary)' : 'rgba(112, 115, 151, 0.4)',
                    strokeWidth: isHighlighted ? 2.5 : 1.5,
                    filter: isHighlighted ? 'drop-shadow(0 0 3px rgba(243, 240, 232, 0.5))' : 'none',
                  }}
                />
              );
            })}
          </svg>

          {/* 8 Topology Ring Nodes */}
          {TOPOLOGY_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isActive = isSelected || isHovered;

            return (
              <button
                key={node.id}
                id={`topology-node-${node.index}`}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                aria-label={`Node ${node.index}: ${node.name}`}
                className="absolute w-[68px] h-[68px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center p-1.5 transition-all duration-200 cursor-pointer rounded-[var(--radius-control)] border focus:outline-none"
                style={{
                  left: node.position.left,
                  top: node.position.top,
                  backgroundColor: isActive
                    ? 'var(--surface-raised)'
                    : 'var(--surface-recessed)',
                  borderColor: isActive ? 'var(--text-primary)' : 'var(--border-subtle)',
                  transform: isActive
                    ? 'translate(-50%, -50%) scale(1.08)'
                    : 'translate(-50%, -50%) scale(1)',
                  boxShadow: isActive
                    ? '0 6px 16px rgba(20, 21, 31, 0.4), 0 0 0 1px var(--text-primary)'
                    : '0 2px 6px rgba(20, 21, 31, 0.2)',
                  color: 'var(--text-primary)',
                  zIndex: isActive ? 10 : 2,
                }}
              >
                <span
                  className="font-mono text-[9px] mb-0.5 leading-none transition-colors"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {node.index}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.03em] uppercase leading-[1.2]">
                  {node.name}
                </span>
              </button>
            );
          })}

          {/* Center Command Core */}
          <div
            id="command-core"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] p-3 text-center rounded-[var(--radius-panel)] border shadow-2xl transition-all"
            style={{
              backgroundColor: 'var(--surface-recessed)',
              borderColor: 'var(--text-secondary)',
              boxShadow: '0 8px 24px rgba(20, 21, 31, 0.35)',
            }}
          >
            <div className="flex justify-between items-center text-[8.5px] font-mono tracking-[0.08em] mb-2 text-[var(--text-muted)]">
              <span
                className="px-1.5 py-0.5 rounded-[var(--radius-control)] font-semibold text-[var(--text-secondary)]"
                style={{ backgroundColor: 'var(--structural-dark)' }}
              >
                TIER 1
              </span>
              <span>8 / 8</span>
            </div>

            <div className="text-[14px] font-bold tracking-[0.03em] text-[var(--text-primary)]">
              RUNTIME ENGINEER
            </div>

            <div className="text-[8px] tracking-[0.08em] uppercase mt-0.5 text-[var(--text-secondary)]">
              Core layers proven
            </div>

            <div
              className="w-full h-[2px] rounded-[1px] mt-2 overflow-hidden"
              style={{ backgroundColor: 'var(--structural-dark)' }}
            >
              <div
                className="h-full w-full"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
            </div>
          </div>
        </div>

        {/* Node Ledger */}
        <div
          id="node-ledger"
          className="flex-1 w-full lg:min-w-[280px] rounded-[var(--radius-panel)] p-4 sm:p-5 border"
          style={{
            backgroundColor: 'var(--surface-recessed)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] mb-3 text-[var(--text-muted)]">
            <span>Node ledger</span>
            <span className="text-[9.5px] text-[var(--text-secondary)]">19 PROOFS</span>
          </div>

          <div className="space-y-0 divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
            {TOPOLOGY_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isHighlighted = isSelected || isHovered;

              const fullStars = '★'.repeat(node.stars);
              const emptyStars = '☆'.repeat(node.maxStars - node.stars);

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className="py-2.5 px-2 -mx-2 rounded transition-all cursor-pointer group"
                  style={{
                    backgroundColor: isHighlighted
                      ? 'rgba(112, 115, 151, 0.4)'
                      : 'transparent',
                  }}
                >
                  <div className="grid grid-cols-[22px_1fr_auto] gap-2 items-baseline text-[13px]">
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: isHighlighted ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      {node.index}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: isHighlighted ? 'var(--text-primary)' : 'var(--text-primary)' }}
                    >
                      {node.fullName}
                    </span>
                    <span
                      className="font-mono text-[12px] tracking-[1px] whitespace-nowrap"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {fullStars}
                      {emptyStars && (
                        <span style={{ color: 'var(--border-subtle)' }}>{emptyStars}</span>
                      )}
                    </span>
                  </div>

                  <div
                    className="font-mono text-[10.5px] pl-[30px] mt-0.5 transition-colors"
                    style={{
                      color: isHighlighted ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {node.evidence.join(' · ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Node Inspector Tray (when node is hovered or selected) */}
      {activeNode && (
        <div
          id="node-inspector"
          className="border rounded-[var(--radius-panel)] p-4 sm:p-5 mb-8 animate-in fade-in duration-150"
          style={{
            backgroundColor: 'var(--structural-dark)',
            borderColor: 'var(--text-secondary)',
            boxShadow: '0 4px 14px rgba(20, 21, 31, 0.3)',
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2 pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: 'var(--surface-recessed)', color: 'var(--text-primary)' }}
              >
                NODE {activeNode.index}
              </span>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {activeNode.fullName}
              </h3>
            </div>
            {selectedNodeId && (
              <button
                onClick={() => setSelectedNodeId(null)}
                className="text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Close details
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1">
                Architectural Role
              </div>
              <p className="text-[var(--text-primary)] leading-relaxed">
                {activeNode.roleDescription}
              </p>
              <p className="text-[var(--text-secondary)] text-xs mt-1.5 leading-relaxed">
                {activeNode.description}
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1">
                Demonstrated In Project Atlas
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {activeNode.evidence.map((ev, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: 'var(--surface-recessed)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {ev}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {activeNode.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(112, 115, 151, 0.25)', color: 'var(--text-secondary)' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Underexposed telemetry rows */}
      <div
        className="font-mono text-[10.5px] uppercase tracking-[0.08em] mt-11 mb-3.5 flex items-center gap-2.5"
        style={{ color: 'var(--text-muted)' }}
      >
        <span>Foundation — underexposed</span>
        <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border-subtle)' }} />
      </div>

      <div className="space-y-0">
        {TELEMETRY_LAYERS.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-[170px_1fr_130px] gap-2 sm:gap-4 items-center py-2.5 border-t first:border-t-0 text-[13.5px]"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="font-medium text-[var(--text-primary)]">{row.name}</div>
            <div
              className="h-1 rounded-[1px] overflow-hidden"
              style={{ backgroundColor: 'var(--structural-dark)' }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${row.percent}%`,
                  backgroundColor: 'var(--text-secondary)',
                }}
              />
            </div>
            <div
              className="font-mono text-[10.5px] text-left sm:text-right"
              style={{ color: 'var(--text-muted)' }}
            >
              {row.resolves}
            </div>
          </div>
        ))}
      </div>

      {/* Satellite / deprioritized */}
      <div
        className="mt-10 pt-5.5 border-t border-dashed flex flex-wrap gap-4"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div
          className="w-full font-mono text-[10.5px] uppercase tracking-[0.08em]"
          style={{ color: 'var(--text-muted)' }}
        >
          Considered, deliberately not prioritized
        </div>

        {DEPRIORITIZED_ITEMS.map((sat, idx) => (
          <div
            key={idx}
            className="border rounded-[var(--radius-control)] p-3 flex-1 min-w-[200px]"
            style={{
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
              backgroundColor: 'rgba(41, 43, 61, 0.4)',
            }}
          >
            <div
              className="text-[12.5px] line-through mb-1 font-medium"
              style={{
                textDecorationColor: 'var(--text-muted)',
                color: 'var(--text-secondary)',
              }}
            >
              {sat.title}
            </div>
            <p className="text-[11.5px] m-0" style={{ color: 'var(--text-muted)' }}>
              {sat.reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
