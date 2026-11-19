import React, { useState } from 'react';
import { MERMAID_CAPABILITY_GRAPH, TOPOLOGY_NODES, TELEMETRY_LAYERS } from '../data';
import { MermaidDiagram } from './MermaidDiagram';
import { TopologyNode } from '../types';
import {
  Network,
  Layers,
  X,
  CheckCircle2,
  Circle,
  ArrowRight,
  Compass,
  ShieldCheck,
} from 'lucide-react';

interface CapabilityMapSectionProps {
  diagramMode?: 'circular' | 'mermaid';
  onChangeDiagramMode?: (mode: 'circular' | 'mermaid') => void;
  selectedNodeId?: string | null;
  onSelectNode?: (nodeId: string) => void;
  inspectedNodes?: string[];
}

export const CapabilityMapSection: React.FC<CapabilityMapSectionProps> = ({
  diagramMode = 'circular',
  onChangeDiagramMode,
  selectedNodeId: controlledSelectedNodeId,
  onSelectNode,
  inspectedNodes = ['node-01'],
}) => {
  const [internalMode, setInternalMode] = useState<'circular' | 'mermaid'>('circular');
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>('node-01');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const viewMode = onChangeDiagramMode ? diagramMode : internalMode;
  const setViewMode = (mode: 'circular' | 'mermaid') => {
    if (onChangeDiagramMode) {
      onChangeDiagramMode(mode);
    } else {
      setInternalMode(mode);
    }
  };

  const selectedNodeId =
    controlledSelectedNodeId !== undefined ? controlledSelectedNodeId : internalSelectedId;

  const activeNodeId = hoveredNodeId || selectedNodeId || 'node-01';
  const activeNode: TopologyNode =
    TOPOLOGY_NODES.find((n) => n.id === activeNodeId) || TOPOLOGY_NODES[0];

  // SVG curved connector paths definition: closed loop topology
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
    if (onSelectNode) {
      onSelectNode(id);
    } else {
      setInternalSelectedId(id);
    }
  };

  const handleStepNextNode = () => {
    const currentIndex = TOPOLOGY_NODES.findIndex((n) => n.id === activeNode.id);
    const nextNode = TOPOLOGY_NODES[(currentIndex + 1) % TOPOLOGY_NODES.length];
    handleNodeClick(nextNode.id);
  };

  return (
    <section id="diagram" className="space-y-6">
      {/* Level 1 Headline & Cascading Size/Color Hierarchy */}
      <div className="border-b pb-5" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 text-[var(--blue-outline)]">
          <span>02. Interactive Node Topology &amp; System Architecture</span>
          <span>{inspectedNodes.length} OF {TOPOLOGY_NODES.length} NODES VERIFIED</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-3">
          Strategic Capability Topology
        </h1>

        <p className="text-base sm:text-[17px] leading-relaxed max-w-[68ch] text-[var(--text-dim)] font-medium">
          Click any node in the circular control ring to verify production evidence, architectural guarantees, and connected runtime dependencies. Every verified node advances your overall Dossier Verification score.
        </p>
      </div>

      {/* Mode Switcher & Node Verification Progress Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('circular')}
            className="px-3.5 py-2 text-xs font-mono font-bold transition-all flex items-center gap-2 border cursor-pointer"
            style={{
              backgroundColor: viewMode === 'circular' ? 'var(--surface-tertiary)' : 'var(--surface-primary)',
              color: 'var(--text)',
              borderColor: viewMode === 'circular' ? 'var(--blue-outline)' : 'var(--border)',
            }}
          >
            <Network className="w-4 h-4 text-[var(--blue-outline)]" />
            <span>Interactive Node Topology (Default)</span>
          </button>

          <button
            onClick={() => setViewMode('mermaid')}
            className="px-3.5 py-2 text-xs font-mono font-bold transition-all flex items-center gap-2 border cursor-pointer"
            style={{
              backgroundColor: viewMode === 'mermaid' ? 'var(--surface-tertiary)' : 'var(--surface-primary)',
              color: 'var(--text)',
              borderColor: viewMode === 'mermaid' ? 'var(--blue-outline)' : 'var(--border)',
            }}
          >
            <Layers className="w-4 h-4 text-[var(--green-proven)]" />
            <span>Full-Stack Dependency Graph</span>
          </button>
        </div>

        {/* Quick Node Verification Stepper */}
        <button
          onClick={handleStepNextNode}
          className="px-3 py-1.5 text-xs font-mono font-bold border flex items-center gap-1.5 cursor-pointer transition-colors"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderColor: 'var(--blue-outline)',
            color: 'var(--text)',
          }}
        >
          <span>Step Next Node</span>
          <ArrowRight className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
        </button>
      </div>

      {/* Primary Interactive Viewport */}
      {viewMode === 'circular' ? (
        <div className="space-y-6">
          {/* Split Tactical Workstation Layout: Left Circular Radar + Right Live Node Dossier */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 items-start">
            {/* Left Column: SVG Circular Node Topology Canvas */}
            <div
              className="border p-5 sm:p-6 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-bold text-[var(--text)] uppercase">
                  SECTOR RING // 8 TIER-1 RUNTIME NODES
                </span>
                <span className="text-[var(--text-dimmer)]">
                  CLICK NODE TO LOCK TELEMETRY
                </span>
              </div>

              <div className="relative w-full max-w-[490px] aspect-square mx-auto">
                <svg
                  viewBox="0 0 520 520"
                  className="w-full h-full select-none"
                  style={{ overflow: 'visible' }}
                >
                  {/* Background Concentric Cartographic Rings */}
                  <circle
                    cx="260"
                    cy="260"
                    r="225"
                    fill="none"
                    stroke="var(--border-subtle)"
                    strokeWidth="1"
                    strokeDasharray="2 8"
                  />
                  <circle
                    cx="260"
                    cy="260"
                    r="190"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="1.25"
                    strokeDasharray="6 6"
                  />
                  <circle
                    cx="260"
                    cy="260"
                    r="130"
                    fill="none"
                    stroke="var(--border-subtle)"
                    strokeWidth="1"
                  />
                  {/* Crosshair Rangefinder Axes */}
                  <line x1="260" y1="20" x2="260" y2="500" stroke="var(--border-subtle)" strokeWidth="0.75" strokeDasharray="3 6" />
                  <line x1="20" y1="260" x2="500" y2="260" stroke="var(--border-subtle)" strokeWidth="0.75" strokeDasharray="3 6" />

                  <circle cx="260" cy="260" r="190" className="ring-telemetry-pulse" />

                  {/* Closed Loop Curved Connectors */}
                  {edgeCurves.map((edge) => {
                    const isHighlighted =
                      activeNode.id === edge.from || activeNode.id === edge.to;
                    return (
                      <path
                        key={`${edge.from}-${edge.to}`}
                        d={edge.d}
                        fill="none"
                        stroke={isHighlighted ? 'var(--blue-outline)' : 'var(--border)'}
                        strokeWidth={isHighlighted ? 3 : 1.5}
                        strokeDasharray={isHighlighted ? 'none' : '4 4'}
                        className="transition-all duration-200"
                      />
                    );
                  })}

                  {/* Central Command Hub */}
                  <g className="cursor-default">
                    <circle
                      cx="260"
                      cy="260"
                      r="52"
                      fill="var(--surface-primary)"
                      stroke="var(--blue-outline)"
                      strokeWidth="2"
                    />
                    <text
                      x="260"
                      y="249"
                      textAnchor="middle"
                      fill="var(--text)"
                      fontSize="11"
                      fontFamily="var(--font-mono)"
                      fontWeight="700"
                      letterSpacing="0.08em"
                    >
                      VERIFIED
                    </text>
                    <text
                      x="260"
                      y="265"
                      textAnchor="middle"
                      fill="var(--blue-outline)"
                      fontSize="12"
                      fontFamily="var(--font-mono)"
                      fontWeight="800"
                    >
                      {inspectedNodes.length} / {TOPOLOGY_NODES.length} NODES
                    </text>
                    <text
                      x="260"
                      y="281"
                      textAnchor="middle"
                      fill="var(--text-dim)"
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      fontWeight="600"
                    >
                      19 ATLAS RECORDS
                    </text>
                  </g>

                  {/* 8 Capability Nodes */}
                  {TOPOLOGY_NODES.map((node) => {
                    const isSelected = activeNode.id === node.id;
                    const isInspected = inspectedNodes.includes(node.id);

                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onClick={() => handleNodeClick(node.id)}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                      >
                        {/* Active Target Halo */}
                        {isSelected && (
                          <circle
                            cx={node.position.cx}
                            cy={node.position.cy}
                            r="46"
                            fill="none"
                            stroke="var(--blue-outline)"
                            strokeWidth="2"
                            strokeDasharray="5 3"
                          />
                        )}

                        {/* Main Node Circle */}
                        <circle
                          cx={node.position.cx}
                          cy={node.position.cy}
                          r="37"
                          fill={isSelected ? 'var(--surface-tertiary)' : 'var(--surface-primary)'}
                          stroke={
                            isSelected
                              ? 'var(--blue-outline)'
                              : isInspected
                              ? 'var(--green-proven)'
                              : 'var(--border)'
                          }
                          strokeWidth={isSelected ? 3 : 2}
                        />

                        {/* Node Index & Verification Check */}
                        <text
                          x={node.position.cx}
                          y={node.position.cy - 12}
                          textAnchor="middle"
                          fill={isInspected ? 'var(--green-proven)' : 'var(--text-dimmer)'}
                          fontSize="9.5"
                          fontFamily="var(--font-mono)"
                          fontWeight="700"
                        >
                          {isInspected ? `✓ ${node.index}` : `NODE ${node.index}`}
                        </text>

                        {/* Node Name */}
                        <text
                          x={node.position.cx}
                          y={node.position.cy + 4}
                          textAnchor="middle"
                          fill="var(--text)"
                          fontSize="11"
                          fontFamily="var(--font-display)"
                          fontWeight="700"
                        >
                          {node.name}
                        </text>

                        {/* Rating Stars */}
                        <text
                          x={node.position.cx}
                          y={node.position.cy + 19}
                          textAnchor="middle"
                          fill="var(--blue-outline)"
                          fontSize="10"
                          fontFamily="var(--font-mono)"
                          fontWeight="700"
                        >
                          {'★'.repeat(node.stars)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Right Column: Persistent Active Node Inspection Dossier & Checklist */}
            <div className="space-y-4">
              {/* Active Node Telemetry Card */}
              <div
                className="border-2 p-5 space-y-4"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--blue-outline)',
                }}
              >
                <div className="flex items-start justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--blue-outline)] uppercase">
                      <span>ACTIVE NODE {activeNode.index}</span>
                      <span>·</span>
                      <span>{activeNode.stars} / 5 RATING</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-1">
                      {activeNode.fullName}
                    </h2>
                  </div>
                  <span
                    className="px-2 py-0.5 text-[11px] font-mono font-bold border uppercase"
                    style={{
                      backgroundColor: 'var(--surface-primary)',
                      borderColor: 'var(--green-proven)',
                      color: 'var(--green-proven)',
                    }}
                  >
                    Verified
                  </span>
                </div>

                {/* Cascading Hierarchy: Role Summary & Deep Description */}
                <div className="space-y-2">
                  <div className="text-sm font-bold text-[var(--text)]">
                    {activeNode.roleDescription}
                  </div>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed m-0">
                    {activeNode.description}
                  </p>
                </div>

                {/* Production Evidence & Architectural Guarantees */}
                <div className="space-y-3 pt-3 border-t text-xs font-mono" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--text-dimmer)] mb-1">
                      Production Atlas Evidence
                    </div>
                    <div className="text-sm font-bold text-[var(--text)]">
                      {activeNode.evidence.join(' · ')}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--text-dimmer)] mb-1">
                      Architectural Guarantees
                    </div>
                    <div className="text-xs font-semibold text-[var(--text-dim)]">
                      {activeNode.tags.join(' · ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* 8-Node Verification Roster Checklist */}
              <div
                className="border p-4 space-y-3"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase">
                  <span className="text-[var(--text)]">Node Verification Roster</span>
                  <span className="text-[var(--green-proven)]">
                    {inspectedNodes.length}/{TOPOLOGY_NODES.length} Complete
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {TOPOLOGY_NODES.map((node) => {
                    const isVerified = inspectedNodes.includes(node.id);
                    const isCurrent = activeNode.id === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node.id)}
                        className="px-2.5 py-2 border text-left font-mono text-xs flex items-center justify-between transition-colors cursor-pointer"
                        style={{
                          backgroundColor: isCurrent
                            ? 'var(--surface-tertiary)'
                            : 'var(--surface-primary)',
                          borderColor: isCurrent
                            ? 'var(--blue-outline)'
                            : isVerified
                            ? 'var(--border)'
                            : 'var(--border-subtle)',
                          color: 'var(--text)',
                        }}
                      >
                        <span className="truncate font-semibold">
                          {node.index}. {node.name}
                        </span>
                        {isVerified ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--green-proven)] shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-[var(--text-dimmer)] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Foundation Layer Visibility Breakdown */}
          <div
            className="border p-5 sm:p-6 space-y-4"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-[var(--text)] m-0">
                Foundation Layer Visibility Breakdown
              </h2>
              <span className="text-xs font-mono font-bold text-[var(--text-dimmer)] uppercase">
                PORTFOLIO EXPOSURE METRICS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TELEMETRY_LAYERS.map((layer) => (
                <div
                  key={layer.name}
                  className="border p-4 space-y-2"
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="font-bold text-[var(--text)]">{layer.name}</span>
                    <span className="text-[var(--blue-outline)] font-bold">
                      {layer.percent}% Visible
                    </span>
                  </div>
                  <div
                    className="h-2 border overflow-hidden"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${layer.percent}%`,
                        backgroundColor: 'var(--blue-outline)',
                      }}
                    />
                  </div>
                  <p className="text-xs text-[var(--text-dim)] leading-relaxed m-0">
                    {layer.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Legend Bar for Full-Stack Dependency Graph */}
          <div
            className="flex flex-wrap items-center gap-6 font-mono text-xs border p-4"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
              color: 'var(--text-dim)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 inline-block border"
                style={{
                  backgroundColor: 'var(--green-proven)',
                  borderColor: 'var(--text)',
                }}
              />
              <span>
                <strong className="text-[var(--text)]">Proven</strong> — Demonstrated in 19 Atlas Projects
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 inline-block border"
                style={{
                  backgroundColor: 'var(--yellow-work)',
                  borderColor: 'var(--text)',
                }}
              />
              <span>
                <strong className="text-[var(--text)]">Underexposed</strong> — Implied Infrastructure
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 inline-block border"
                style={{
                  backgroundColor: 'var(--red-gap)',
                  borderColor: 'var(--text)',
                }}
              />
              <span>
                <strong className="text-[var(--text)]">Roadmap</strong> — Scheduled Flagship Closing Layers
              </span>
            </div>
          </div>

          <div
            className="border p-4 sm:p-6 overflow-x-auto"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <MermaidDiagram chart={MERMAID_CAPABILITY_GRAPH} />
          </div>
        </div>
      )}
    </section>
  );
};
