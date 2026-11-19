import React from 'react';
import { PAGES_CONFIG, TOPOLOGY_NODES } from '../data';
import { PageId } from '../types';
import { CheckCircle2, Circle, Compass, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';

interface DossierProgressBarProps {
  currentPageId: PageId;
  visitedPages: string[];
  inspectedNodes: string[];
  onPageChange: (pageId: PageId) => void;
  onInspectNextNode: () => void;
  onResetProgress: () => void;
  compact?: boolean;
}

export const DossierProgressBar: React.FC<DossierProgressBarProps> = ({
  currentPageId,
  visitedPages,
  inspectedNodes,
  onPageChange,
  onInspectNextNode,
  onResetProgress,
  compact = false,
}) => {
  const totalPages = PAGES_CONFIG.length;
  const totalNodes = TOPOLOGY_NODES.length;
  const totalSteps = totalPages + totalNodes;
  const completedSteps = visitedPages.length + inspectedNodes.length;
  const overallPercent = Math.min(100, Math.round((completedSteps / totalSteps) * 100));

  const nextUninspectedNode = TOPOLOGY_NODES.find((n) => !inspectedNodes.includes(n.id));
  const nextUnvisitedPage = PAGES_CONFIG.find((p) => !visitedPages.includes(p.id));

  const handleAdvanceAction = () => {
    if (nextUninspectedNode) {
      onInspectNextNode();
    } else if (nextUnvisitedPage) {
      onPageChange(nextUnvisitedPage.id);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="font-bold text-[var(--text)]">{overallPercent}%</span>
          <span className="hidden xl:inline text-[var(--text-dim)]">
            ({visitedPages.length}/{totalPages} Ch · {inspectedNodes.length}/{totalNodes} Nodes)
          </span>
        </div>
        <div
          className="w-24 sm:w-28 h-2.5 border overflow-hidden flex"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderColor: 'var(--border)',
          }}
          role="progressbar"
          aria-valuenow={overallPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Dossier and node verification progress"
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${overallPercent}%`,
              backgroundColor:
                overallPercent === 100 ? 'var(--green-proven)' : 'var(--blue-outline)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-b px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3"
      style={{
        backgroundColor: 'var(--surface-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Left: Progress Status & Segmented Meter */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[var(--blue-outline)] shrink-0" />
          <span className="text-xs font-mono font-bold tracking-wide uppercase text-[var(--text)]">
            Dossier Verification: {overallPercent}%
          </span>
        </div>

        {/* 13-Step Tactical Block Bar (5 Chapters + 8 Nodes) */}
        <div
          className="flex items-center gap-1"
          title={`${visitedPages.length} of ${totalPages} chapters reviewed, ${inspectedNodes.length} of ${totalNodes} topology nodes verified`}
        >
          {PAGES_CONFIG.map((page) => {
            const isVisited = visitedPages.includes(page.id);
            const isCurrent = currentPageId === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                title={`Chapter ${page.index}: ${page.shortLabel} (${isVisited ? 'Reviewed' : 'Pending'})`}
                className="h-2.5 w-4 sm:w-5 border transition-all cursor-pointer"
                style={{
                  backgroundColor: isCurrent
                    ? 'var(--blue-outline)'
                    : isVisited
                    ? 'var(--green-proven)'
                    : 'var(--surface-primary)',
                  borderColor: isCurrent ? 'var(--text)' : 'var(--border)',
                }}
              />
            );
          })}
          <span className="mx-1 text-xs font-mono text-[var(--text-dimmer)]">/</span>
          {TOPOLOGY_NODES.map((node) => {
            const isInspected = inspectedNodes.includes(node.id);
            return (
              <button
                key={node.id}
                onClick={onInspectNextNode}
                title={`Node ${node.index}: ${node.name} (${isInspected ? 'Verified' : 'Click to inspect'})`}
                className="h-2.5 w-2.5 sm:w-3 border transition-all cursor-pointer"
                style={{
                  backgroundColor: isInspected
                    ? 'var(--blue-outline)'
                    : 'var(--surface-primary)',
                  borderColor: 'var(--border)',
                }}
              />
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[var(--text-dim)]">
          <span>
            Chapters: <strong className="text-[var(--text)]">{visitedPages.length}/{totalPages}</strong>
          </span>
          <span>·</span>
          <span>
            Topology Nodes: <strong className="text-[var(--text)]">{inspectedNodes.length}/{totalNodes}</strong>
          </span>
        </div>
      </div>

      {/* Right: Tactical Next Step Action */}
      <div className="flex items-center gap-2">
        {overallPercent < 100 ? (
          <button
            onClick={handleAdvanceAction}
            className="px-3 py-1 text-xs font-mono font-bold border flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-primary)',
              borderColor: 'var(--blue-outline)',
              color: 'var(--text)',
            }}
          >
            <span>
              {nextUninspectedNode
                ? `Verify Node ${nextUninspectedNode.index} (${nextUninspectedNode.name})`
                : nextUnvisitedPage
                ? `Open ${nextUnvisitedPage.shortLabel}`
                : 'Continue Briefing'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--blue-outline)]" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-mono font-bold text-[var(--green-proven)]">
              <ShieldCheck className="w-4 h-4" />
              <span>FULL DOSSIER VERIFIED (100%)</span>
            </span>
            <button
              onClick={onResetProgress}
              className="px-2 py-0.5 text-[11px] font-mono border text-[var(--text-dim)] hover:text-[var(--text)] cursor-pointer flex items-center gap-1"
              style={{
                backgroundColor: 'var(--surface-primary)',
                borderColor: 'var(--border)',
              }}
              title="Reset verification progress"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
