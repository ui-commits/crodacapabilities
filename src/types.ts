export interface TopologyNode {
  id: string;
  index: string;
  name: string;
  fullName: string;
  stars: number;
  maxStars: number;
  evidence: string[];
  description: string;
  roleDescription: string;
  position: {
    left: string;
    top: string;
    cx: number;
    cy: number;
  };
  connectedTo: string[];
  status: 'proven' | 'active' | 'processing';
  tags: string[];
}

export interface TelemetryLayer {
  name: string;
  percent: number;
  resolves: string;
  targetPhases: string;
  notes: string;
}

export interface BioStoryPhase {
  id: string;
  step: string;
  era: string;
  title: string;
  subtitle: string;
  description: string;
  systemInsight: string;
  artifacts: string[];
  techStack: string[];
  iconType: 'distribution' | 'code' | 'atlas' | 'runtime';
}

export interface FlagshipProject {
  id: string;
  number: string;
  name: string;
  codename: string;
  primaryPurpose: string;
  technologies: string[];
  credibilityProves: string;
  headlineQuote: string;
  architecturalLayer: 'Execution Plane' | 'Data Plane' | 'Systems Layer';
  coreFeatures: string[];
  architectureDiagram: string;
  startDate?: string;
  estimatedCompletionDate?: string;
  timelineLabel?: string;
  deepDive: {
    problemStatement: string;
    solutionApproach: string;
    killerFeature: string;
    killerFeatureDetails: string;
  };
}

export interface ReplayEventStep {
  time: string;
  event: string;
  type: 'lifecycle' | 'tool' | 'model' | 'state' | 'human';
  details?: string;
}

export interface EvaluationMetricComparison {
  metric: string;
  v14: string;
  v15: string;
  delta: string;
  positive: boolean;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  stack: string[];
  proves: string;
  description: string;
  status: 'planned' | 'in-progress' | 'queued';
  startDate?: string;
  estimatedCompletionDate?: string;
  timelineLabel?: string;
}

export interface DeprioritizedItem {
  title: string;
  reason: string;
}

export interface WorkingPrinciple {
  title?: string;
  statement: string;
  implication?: string;
}

export type PageId = 'subject' | 'diagram' | 'tiers' | 'roadmap' | 'contact';

export interface HardeningSubCategory {
  name: string;
  percentage: number;
  status: 'hardened' | 'in-progress' | 'queued';
  deliverable: string;
}

export interface HardeningCategoryProgress {
  id: string;
  projectId: string;
  projectCodename: string;
  phaseLabel: string;
  categoryName: string;
  layer: 'Execution Plane' | 'Data Plane' | 'Systems Layer';
  completionPercentage: number;
  statusLabel: string;
  statusType: 'hardened' | 'in-progress' | 'queued';
  summary: string;
  startDate?: string;
  estimatedCompletionDate?: string;
  timelineLabel?: string;
  subCategories: HardeningSubCategory[];
}

export interface PageMeta {
  id: PageId;
  index: string;
  label: string;
  shortLabel: string;
  description: string;
  badge?: string;
}

