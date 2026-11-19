import {
  TopologyNode,
  TelemetryLayer,
  RoadmapPhase,
  DeprioritizedItem,
  WorkingPrinciple,
  BioStoryPhase,
  FlagshipProject,
  ReplayEventStep,
  EvaluationMetricComparison,
  HardeningCategoryProgress,
  HardeningSubCategory,
} from './types';

export const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: 'node-01',
    index: '01',
    name: 'Orchestrator',
    fullName: 'Multi-Agent Orchestrator',
    stars: 5,
    maxStars: 5,
    evidence: ['Meridian', 'AgentOS'],
    description: 'Dynamic task dispatching, context window packing, execution graph routing, and agent lifecycle management.',
    roleDescription: 'Directs workflow execution across distributed specialized agents while enforcing convergence guarantees.',
    position: {
      left: '50%',
      top: '13.46%',
      cx: 260,
      cy: 70,
    },
    connectedTo: ['node-02', 'node-08'],
    status: 'proven',
    tags: ['Agent Coordination', 'Graph Dispatch', 'Context Management']
  },
  {
    id: 'node-02',
    index: '02',
    name: 'Workflow',
    fullName: 'Workflow Engine',
    stars: 5,
    maxStars: 5,
    evidence: ['DetRun', 'Agentic Article Studio'],
    description: 'Deterministic DAG scheduling, retry policies, dependency resolution, and step checkpointing.',
    roleDescription: 'Translates high-level goals into deterministic DAGs with fine-grained error mitigation.',
    position: {
      left: '75.84%',
      top: '24.16%',
      cx: 394.35,
      cy: 125.65,
    },
    connectedTo: ['node-03', 'node-01'],
    status: 'proven',
    tags: ['DAG Resolution', 'Checkpointing', 'Deterministic Steps']
  },
  {
    id: 'node-03',
    index: '03',
    name: 'State',
    fullName: 'State Machine & Memory',
    stars: 5,
    maxStars: 5,
    evidence: ['XState Pro', 'XX'],
    description: 'Hierarchical statecharts, guarded transitions, parallel states, and explicit context memory models.',
    roleDescription: 'Guarantees valid transitions and immune states against runaway execution.',
    position: {
      left: '86.54%',
      top: '50%',
      cx: 450,
      cy: 260,
    },
    connectedTo: ['node-04', 'node-02'],
    status: 'proven',
    tags: ['Statecharts', 'Formal Verification', 'Guarded Transitions']
  },
  {
    id: 'node-04',
    index: '04',
    name: 'Events',
    fullName: 'Event Sourcing & Bus',
    stars: 4,
    maxStars: 5,
    evidence: ['Xxrun', 'DetRun'],
    description: 'Append-only event streaming, pub/sub bus dispatching, schema-validated payloads, and event hydration.',
    roleDescription: 'Decoupled asynchronous bus capturing every transition as immutable truth.',
    position: {
      left: '75.84%',
      top: '75.84%',
      cx: 394.35,
      cy: 394.35,
    },
    connectedTo: ['node-05', 'node-03'],
    status: 'proven',
    tags: ['Append-Only', 'Event Streams', 'Pub/Sub']
  },
  {
    id: 'node-05',
    index: '05',
    name: 'Runtime',
    fullName: 'Execution Runtime',
    stars: 5,
    maxStars: 5,
    evidence: ['DetRun', 'RUNTIMEDISTR'],
    description: 'Sandboxed code execution, worker pools, process isolation, memory monitoring, and timeout handlers.',
    roleDescription: 'Durable execution substrate providing sandboxed isolate environments for tool and code runs.',
    position: {
      left: '50%',
      top: '86.54%',
      cx: 260,
      cy: 450,
    },
    connectedTo: ['node-06', 'node-04'],
    status: 'proven',
    tags: ['Process Isolation', 'Worker Pools', 'Durable Execution']
  },
  {
    id: 'node-06',
    index: '06',
    name: 'Telemetry',
    fullName: 'Telemetry & Observability',
    stars: 4,
    maxStars: 5,
    evidence: ['StateMan', 'Neo UI'],
    description: 'Distributed tracing spans, latency metrics, token consumption tracking, and live audit streams.',
    roleDescription: 'High-frequency telemetry instrumentation giving complete visibility into internal system state.',
    position: {
      left: '24.16%',
      top: '75.84%',
      cx: 125.65,
      cy: 394.35,
    },
    connectedTo: ['node-07', 'node-05'],
    status: 'proven',
    tags: ['OpenTelemetry', 'Span Tracing', 'Audit Streams']
  },
  {
    id: 'node-07',
    index: '07',
    name: 'Replay',
    fullName: 'Deterministic Replay Engine',
    stars: 5,
    maxStars: 5,
    evidence: ['Xxrun', 'DetRun'],
    description: 'Time-travel debugging, zero-loss state rehydration from event logs, and diff-based divergence inspection.',
    roleDescription: 'Enables step-by-step execution playback, regression verification, and failure triage.',
    position: {
      left: '13.46%',
      top: '50%',
      cx: 70,
      cy: 260,
    },
    connectedTo: ['node-08', 'node-06'],
    status: 'proven',
    tags: ['Time Travel', 'Log Hydration', 'Failure Triage']
  },
  {
    id: 'node-08',
    index: '08',
    name: 'Operator UI',
    fullName: 'Operator Interface & Control Surface',
    stars: 5,
    maxStars: 5,
    evidence: ['Chromatic Topology', 'Neo UI'],
    description: 'Human-in-the-loop control surfaces, interactive system topologies, real-time log viewers, and override panels.',
    roleDescription: 'Surfaces machine state into legible, operator-controllable interfaces for instant feedback.',
    position: {
      left: '24.16%',
      top: '24.16%',
      cx: 125.65,
      cy: 125.65,
    },
    connectedTo: ['node-01', 'node-07'],
    status: 'proven',
    tags: ['Human-in-the-Loop', 'Control Planes', 'Live Topologies']
  }
];

export const BIO_STORY_PHASES: BioStoryPhase[] = [
  {
    id: 'bio-01',
    step: '01',
    era: 'Foundational Systems Engineering',
    title: 'Texas A&M Industrial Distribution',
    subtitle: 'Supply Chain Dynamics & Failure Analysis',
    description:
      'Formal academic engineering training focused on physical supply chains, stochastic logistics pipelines, inventory bottlenecks, and systemic points of failure.',
    systemInsight:
      'Physical supply chains and software execution runtimes share the exact same mathematical properties: queues, backpressure, latency variance, and cascade failure propagation.',
    artifacts: ['Logistics Queuing Models', 'Throughput Optimization', 'Failure Mode Analysis'],
    techStack: ['Operations Research', 'Queue Theory', 'Statistical Process Control'],
    iconType: 'distribution',
  },
  {
    id: 'bio-02',
    step: '02',
    era: 'Self-Taught Engineering Trajectory',
    title: 'Code, State Machines & Architecture',
    subtitle: 'From Macro Supply Lines to Microcode',
    description:
      'Driven by curiosity, translated physical distribution principles directly into software engineering — state machines, deterministic workflows, distributed concurrency, and reactive UI architecture.',
    systemInsight:
      'Code is simply digital logistics: routing inputs safely to outputs through deterministic transformations without unhandled exceptions.',
    artifacts: ['Full-Stack Systems', 'XState Hierarchies', 'Custom UI Kits'],
    techStack: ['TypeScript', 'Go', 'XState', 'React', 'Tailwind', 'Node.js'],
    iconType: 'code',
  },
  {
    id: 'bio-03',
    step: '03',
    era: 'The 19-Project Portfolio Arc',
    title: 'Project Atlas: The Art of Translation',
    subtitle: 'Making Opaque Systems Legible to Operators',
    description:
      'Constructed 19 distinct software records across Project Atlas. The common through-line: taking complex backend mechanics (event sourcing, AST parsers, agent loops) and building visual operator surfaces that anyone can trust and navigate.',
    systemInsight:
      'If an operator cannot see what a state machine or agent is thinking, the system has already failed. Observability is not a logging dashboard — it is the interface itself.',
    artifacts: ['Meridian', 'AgentOS', 'DetRun', 'Chromatic Topology', '19 Atlas Records'],
    techStack: ['Agent Orchestration', 'Event Sourcing', 'Chromatic Token UI', 'WebSockets'],
    iconType: 'atlas',
  },
  {
    id: 'bio-04',
    step: '04',
    era: 'Current Frontier (2025–2030 Vision)',
    title: 'Runtime & Agentic Infrastructure',
    subtitle: 'The Execution Plane, Data Plane & Systems Layer',
    description:
      'Closing the credibility gap by building the underlying distributed engine: moving from the visualization/control surface into Go execution runtimes, pgvector memory engines, and native Rust/Tauri desktop substrates.',
    systemInsight:
      'Agentic AI is an emergent property of well-modeled processes and workflows. Agents should not design the workflow; they operate within one humans have made legible.',
    artifacts: ['Atlas Runtime Core', 'Atlas Memory', 'Atlas Desktop'],
    techStack: ['Go', 'Rust', 'Tauri', 'pgvector', 'PostgreSQL', 'NATS', 'OpenTelemetry'],
    iconType: 'runtime',
  },
];

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'project-runtime-core',
    number: '01',
    name: 'Agent Runtime Platform',
    codename: 'Atlas Runtime Core',
    architecturalLayer: 'Execution Plane',
    primaryPurpose: 'Prove backend / distributed runtime engineering in Go',
    technologies: ['Go', 'PostgreSQL', 'Redis / NATS', 'Docker', 'OpenTelemetry'],
    credibilityProves: '“I can build the backend that actually runs agents.”',
    headlineQuote: 'A distributed execution engine for reliable, deterministic agent workflows.',
    startDate: 'Jan 2025',
    estimatedCompletionDate: 'Oct 2025',
    timelineLabel: 'Jan 2025 → Oct 2025',
    coreFeatures: [
      'Agent registration & lifecycle supervision',
      'Deterministic DAG execution & dependency resolution',
      'Execution IDs with resumable checkpoints',
      'Worker pools with job queue backpressure',
      'Append-only event streaming (SSE/WebSocket)',
      'Deterministic Event Replay from any historical step'
    ],
    architectureDiagram: `                         API
                          │
                          ▼
                   ┌──────────────┐
                   │ Go Runtime   │
                   │ Control API  │
                   └──────┬───────┘
                          │
                    create execution
                          │
                          ▼
                     Job Queue (NATS / Redis)
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
          Worker A     Worker B     Worker C
             │            │            │
             ▼            ▼            ▼
          Agent        Agent        Agent
             │            │            │
             └────────────┼────────────┘
                          │
                          ▼
                    Event Stream
                          │
             ┌────────────┼─────────────┐
             ▼            ▼             ▼
         PostgreSQL    OpenTelemetry   UI Operator`,
    deepDive: {
      problemStatement:
        'Most "agent platforms" are fragile API wrappers around single LLM calls with zero fault tolerance, unmanaged context loops, and untraceable failures.',
      solutionApproach:
        'Built in Go with explicit worker concurrency, durable PostgreSQL state tables, NATS asynchronous transport, and OpenTelemetry trace spans.',
      killerFeature: 'Deterministic Event Replay Engine',
      killerFeatureDetails:
        'Every step transition, tool call, and model response is logged as an immutable event. An operator can rewind to step #4, alter parameters, or replay the exact runtime path to debug divergence.',
    },
  },
  {
    id: 'project-memory-engine',
    number: '02',
    name: 'Agent Memory & Evaluation Engine',
    codename: 'Atlas Memory',
    architecturalLayer: 'Data Plane',
    primaryPurpose: 'Prove data & AI infrastructure architecture',
    technologies: ['PostgreSQL + pgvector', 'S3-compatible Storage', 'Go / Rust', 'Embeddings', 'OpenTelemetry'],
    credibilityProves: '“I understand agent memory, retrieval, data lifecycle, and evaluation.”',
    headlineQuote: 'A persistent memory, retrieval, and automated benchmark substrate for agent runtimes.',
    startDate: 'Aug 2025',
    estimatedCompletionDate: 'Mar 2026',
    timelineLabel: 'Aug 2025 → Mar 2026',
    coreFeatures: [
      '5-Tier Memory Lifecycle: Working, Episodic, Semantic, Artifact, Project',
      'PostgreSQL + pgvector single-engine consolidation (eliminates database sprawl)',
      'S3 object storage for raw execution logs & binary artifacts',
      'Context builder with semantic similarity & metadata filtering',
      'Continuous evaluation engine with regression benchmarks',
      'Execution linkage: inspect and replay the exact run that generated an evaluation score'
    ],
    architectureDiagram: `                    Agent Runtime
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          Memories     Events     Artifacts
              │          │          │
              ▼          ▼          ▼
          Embeddings   Postgres     S3 Storage
              │
              ▼
          pgvector
              │
              ▼
        Retrieval Engine
              │
        ┌─────┴─────┐
        ▼           ▼
    Semantic     Metadata
     Search       Filters
        │           │
        └─────┬─────┘
              ▼
        Context Builder
              │
              ▼
             Agent Loop`,
    deepDive: {
      problemStatement:
        'Naive RAG dumps unstructured text into disconnected vector databases without lifecycle aging, episodic memory compaction, or empirical evaluation tracking.',
      solutionApproach:
        'Consolidates relational metadata, permissions, evaluation scorecards, and pgvector embeddings into a unified PostgreSQL schema alongside S3 storage for artifacts.',
      killerFeature: 'Traceable Agent Evaluation Benchmarks',
      killerFeatureDetails:
        'Runs versioned prompt/tool benchmarks against validation datasets, grading latency, cost, retrieval accuracy, and failure classifications — with 1-click replay to the exact run ID.',
    },
  },
  {
    id: 'project-desktop-control',
    number: '03',
    name: 'Local Agent Runtime / Desktop Control Plane',
    codename: 'Atlas Desktop',
    architecturalLayer: 'Systems Layer',
    primaryPurpose: 'Prove systems & native desktop engineering',
    technologies: ['Rust', 'Tauri', 'Astro / React', 'SQLite', 'IPC'],
    credibilityProves: '“I can take agent infrastructure all the way down to the machine.”',
    headlineQuote: 'A high-performance native systems control plane — Docker Desktop meets Agent Runtime Debugger.',
    startDate: 'Jan 2026',
    estimatedCompletionDate: 'Nov 2026',
    timelineLabel: 'Jan 2026 → Nov 2026',
    coreFeatures: [
      'Zero-latency native desktop application built with Rust & Tauri',
      'Unified Control Surface: seamless toggle between Local Runtime and Remote Cloud Workers',
      'Local-first persistence using embedded SQLite with IPC streaming',
      'Process supervision, memory consumption monitors, and sandbox isolate jails',
      'Astro web UI / technical documentation integration',
      'Offline-capable local inference with Ollama/Llama.cpp bridging'
    ],
    architectureDiagram: `                     Tauri Shell
                ┌──────────────────┐
                │ Astro / React UI │
                │ Control Surface  │
                └────────┬─────────┘
                         │
                         │ IPC Bus
                         ▼
                ┌──────────────────┐
                │ Rust Core Engine │
                │ Systems Runtime  │
                └────────┬─────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       Processes       SQLite        Network
          │              │              │
          ▼              ▼              ▼
       Local Agents   Local State    Remote Go Runtime`,
    deepDive: {
      problemStatement:
        'Web-only agent tools suffer from network latency, lack access to local development filesystems/processes, and cannot run offline when cloud connections drop.',
      solutionApproach:
        'A native Rust engine encapsulated in Tauri that interfaces with local processes and SQLite for offline work, while exposing zero-configuration remote bridging to Go cloud clusters.',
      killerFeature: 'Local vs. Remote Hybrid Execution Switcher',
      killerFeatureDetails:
        'One single control surface manages both local low-latency isolates (Rust + SQLite) and remote heavy-duty distributed clusters (Go + Postgres) without changing developer workflows.',
    },
  },
];

export const REPLAY_SIMULATION_STEPS: ReplayEventStep[] = [
  { time: '09:31:02.104', event: 'workflow.started', type: 'lifecycle', details: 'Initialized DAG run id #8421' },
  { time: '09:31:03.220', event: 'agent.initialized', type: 'lifecycle', details: 'Context window allocated (16k tokens)' },
  { time: '09:31:04.015', event: 'tool.search invoked', type: 'tool', details: 'Query: "PostgreSQL pgvector memory lifecycle"' },
  { time: '09:31:05.430', event: 'tool.search completed', type: 'tool', details: 'Returned 4 document chunks (score > 0.89)' },
  { time: '09:31:06.180', event: 'model.request', type: 'model', details: 'Dispatched prompt tokens: 1,840 to Gemini 2.5' },
  { time: '09:31:08.050', event: 'model.response', type: 'model', details: 'Synthesized plan with schema proposals' },
  { time: '09:31:08.890', event: 'state → REVIEW', type: 'state', details: 'Transitioned to human-in-the-loop checkpoint' },
  { time: '09:31:12.340', event: 'human.approved', type: 'human', details: 'Operator validated plan with zero diffs' },
  { time: '09:31:13.120', event: 'workflow.completed', type: 'lifecycle', details: 'Durable execution saved in 11.02s' },
];

export const EVALUATION_METRICS: EvaluationMetricComparison[] = [
  { metric: 'Accuracy Score', v14: '81%', v15: '88%', delta: '+7%', positive: true },
  { metric: 'Tool Execution Success', v14: '92%', v15: '95%', delta: '+3%', positive: true },
  { metric: 'End-to-End Latency', v14: '4.2s', v15: '3.8s', delta: '-0.4s', positive: true },
  { metric: 'Cost per Run', v14: '$0.08', v15: '$0.05', delta: '-37.5%', positive: true },
  { metric: 'Context Retrieval Precision', v14: '76%', v15: '89%', delta: '+13%', positive: true },
];

export const MEMORY_LIFECYCLE_TIERS = [
  {
    tier: 'Working Memory',
    scope: 'Current Execution',
    description: 'Active scratchpad & token context window held in RAM for in-flight tasks.',
  },
  {
    tier: 'Episodic Memory',
    scope: 'Prior Executions',
    description: 'Historical records of what happened, tools run, decisions made, and errors resolved.',
  },
  {
    tier: 'Semantic Memory',
    scope: 'Cross-Project Knowledge',
    description: 'Vector-embedded knowledge base chunks, domain facts, and distilled patterns.',
  },
  {
    tier: 'Artifact Memory',
    scope: 'Durable Objects',
    description: 'Binary storage (S3) for generated code, datasets, evaluation dumps, and images.',
  },
  {
    tier: 'Project / User Memory',
    scope: 'Persistent Tenant Context',
    description: 'Long-term user preferences, team guidelines, RBAC roles, and system constraints.',
  },
];

export const TELEMETRY_LAYERS: TelemetryLayer[] = [
  {
    name: 'Backend Services',
    percent: 50,
    resolves: '→ Phase I (Atlas Runtime Core)',
    targetPhases: 'Phase I',
    notes: 'Go microservices, worker pools, and distributed execution engines.'
  },
  {
    name: 'Persistence',
    percent: 50,
    resolves: '→ Phase I & II (Atlas Memory)',
    targetPhases: 'Phase I & II',
    notes: 'PostgreSQL schema design, migration systems, and event storage models.'
  },
  {
    name: 'API Design',
    percent: 35,
    resolves: '→ Phase I (Control API)',
    targetPhases: 'Phase I',
    notes: 'gRPC & REST contracts, streaming SSE/WebSocket endpoints, and versioning.'
  },
  {
    name: 'Cloud Architecture',
    percent: 25,
    resolves: '→ Phase I (Worker Fleet)',
    targetPhases: 'Phase I',
    notes: 'Containerized infrastructure, secure VPC networking, and service mesh.'
  },
  {
    name: 'Containers / Deploy',
    percent: 45,
    resolves: '→ Phase I & III',
    targetPhases: 'Phase I & III',
    notes: 'Multi-stage Docker builds, non-root execution, CI/CD automated test pipelines.'
  },
  {
    name: 'Security / Auth',
    percent: 40,
    resolves: '→ Phase I & II',
    targetPhases: 'Phase I & II',
    notes: 'RBAC, token validation, encrypted key vaults, and sandbox jail isolation.'
  }
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 'PHASE I',
    title: 'Atlas Runtime Core',
    stack: ['Go', 'PostgreSQL', 'Redis / NATS', 'OpenTelemetry', 'Docker'],
    proves: 'distributed backend, queues & workers, durable execution, event-driven persistence',
    description: 'The central execution plane that manages worker pools, event dispatch, and durable stateful tasks.',
    startDate: 'Jan 2025',
    estimatedCompletionDate: 'Oct 2025',
    timelineLabel: 'Jan 2025 → Oct 2025',
    status: 'planned'
  },
  {
    phase: 'PHASE II',
    title: 'Atlas Memory',
    stack: ['PostgreSQL + pgvector', 'S3-compatible storage', 'embeddings'],
    proves: 'agent memory lifecycle, retrieval architecture, evaluation infrastructure',
    description: 'The data plane providing contextual vector recall, episodic memory compaction, and evaluation benchmarks.',
    startDate: 'Aug 2025',
    estimatedCompletionDate: 'Mar 2026',
    timelineLabel: 'Aug 2025 → Mar 2026',
    status: 'planned'
  },
  {
    phase: 'PHASE III',
    title: 'Atlas Desktop',
    stack: ['Rust', 'Tauri', 'SQLite', 'IPC'],
    proves: 'native systems layer, local/remote control plane',
    description: 'The native systems layer that provides a local zero-latency control plane to inspect and drive both cores.',
    startDate: 'Jan 2026',
    estimatedCompletionDate: 'Nov 2026',
    timelineLabel: 'Jan 2026 → Nov 2026',
    status: 'planned'
  }
];

export const HARDENING_PROJECT_CATEGORIES: HardeningCategoryProgress[] = [
  {
    id: 'hardening-runtime-core',
    projectId: 'project-runtime-core',
    projectCodename: 'Atlas Runtime Core',
    phaseLabel: 'PHASE I',
    categoryName: 'Execution Plane & Distributed Concurrency',
    layer: 'Execution Plane',
    completionPercentage: 78,
    statusLabel: 'Active Hardening',
    statusType: 'in-progress',
    summary: 'Hardening distributed worker concurrency, queue backpressure, durable state tables, and OpenTelemetry spans.',
    startDate: 'Jan 2025',
    estimatedCompletionDate: 'Oct 2025',
    timelineLabel: 'Jan 2025 → Oct 2025',
    subCategories: [
      {
        name: 'Queue Concurrency & Backpressure',
        percentage: 85,
        status: 'hardened',
        deliverable: 'NATS JetStream / Redis worker pools with bounded channels & token-bucket rate limits'
      },
      {
        name: 'Append-Only Event Store & WAL',
        percentage: 90,
        status: 'hardened',
        deliverable: 'PostgreSQL partitioned audit tables with deterministic sequence locks & replay index'
      },
      {
        name: 'Distributed OpenTelemetry & Tracing',
        percentage: 75,
        status: 'in-progress',
        deliverable: 'End-to-end trace context propagation across distributed worker boundaries'
      },
      {
        name: 'Container Sandboxes & Isolates',
        percentage: 62,
        status: 'in-progress',
        deliverable: 'Docker container lifecycle manager with cgroup memory limits & SIGTERM handling'
      }
    ]
  },
  {
    id: 'hardening-memory-engine',
    projectId: 'project-memory-engine',
    projectCodename: 'Atlas Memory',
    phaseLabel: 'PHASE II',
    categoryName: 'Data Plane & Vector Persistence',
    layer: 'Data Plane',
    completionPercentage: 64,
    statusLabel: 'Hardening Underway',
    statusType: 'in-progress',
    summary: 'Consolidating relational schemas with pgvector embeddings, 5-tier memory lifecycle, and automated evaluation.',
    startDate: 'Aug 2025',
    estimatedCompletionDate: 'Mar 2026',
    timelineLabel: 'Aug 2025 → Mar 2026',
    subCategories: [
      {
        name: 'Vector Storage & HNSW Indexing',
        percentage: 80,
        status: 'hardened',
        deliverable: 'PostgreSQL + pgvector single-engine consolidation with halfvec quantization'
      },
      {
        name: '5-Tier Memory Compaction Engine',
        percentage: 65,
        status: 'in-progress',
        deliverable: 'Automated background compaction from in-flight scratchpad to episodic and semantic vectors'
      },
      {
        name: 'Automated Evaluation Harness',
        percentage: 60,
        status: 'in-progress',
        deliverable: 'Empirical regression scorecards with 1-click replay to historical execution IDs'
      },
      {
        name: 'S3-Compatible Blob Object Store',
        percentage: 51,
        status: 'in-progress',
        deliverable: 'Durable bucket storage for raw execution logs, artifacts, and evaluation dumps'
      }
    ]
  },
  {
    id: 'hardening-desktop-control',
    projectId: 'project-desktop-control',
    projectCodename: 'Atlas Desktop',
    phaseLabel: 'PHASE III',
    categoryName: 'Systems Layer & Local Inference Sovereignty',
    layer: 'Systems Layer',
    completionPercentage: 52,
    statusLabel: 'In Architecture & Prototyping',
    statusType: 'in-progress',
    summary: 'Deploying native Rust systems engine, embedded SQLite WAL persistence, and offline local inference pipelines.',
    startDate: 'Jan 2026',
    estimatedCompletionDate: 'Nov 2026',
    timelineLabel: 'Jan 2026 → Nov 2026',
    subCategories: [
      {
        name: 'Rust Core & Native IPC Bus',
        percentage: 70,
        status: 'in-progress',
        deliverable: 'Tauri v2 IPC bridge with zero-copy binary streaming and process supervision'
      },
      {
        name: 'Local-First SQLite WAL Persistence',
        percentage: 65,
        status: 'in-progress',
        deliverable: 'Embedded SQLite with write-ahead logging, schema migrations, and local checkpointing'
      },
      {
        name: 'Local Inference Pipeline (Ollama/Llama.cpp)',
        percentage: 42,
        status: 'queued',
        deliverable: 'Offline-first GGUF local model execution bridging with dynamic context caching'
      },
      {
        name: 'Hybrid Local/Cloud Switcher Protocol',
        percentage: 50,
        status: 'in-progress',
        deliverable: 'Transparent runtime handshake switching between local sandbox and remote Go cluster'
      }
    ]
  }
];

export const DEPRIORITIZED_ITEMS: DeprioritizedItem[] = [
  {
    title: 'Multi-cloud (AWS + GCP + Azure)',
    reason: 'One cloud, demonstrated well, transfers. Three, done shallow, doesn\'t.'
  },
  {
    title: 'Kubernetes as a goal',
    reason: 'Should serve the architecture when it\'s needed — not become the portfolio piece.'
  },
  {
    title: 'Electron',
    reason: 'The case against it is made better by shipping Atlas Desktop in Tauri than by writing about it.'
  }
];

export const WORKING_POSITIONS: WorkingPrinciple[] = [
  {
    statement: 'Agentic AI is an emergent property of well-modeled processes and workflows — not the other way around. Agents shouldn\'t be designing the workflow; they should be operating inside one that a human has already made legible.'
  },
  {
    statement: 'Human-in-the-loop isn\'t a safety feature bolted on afterward. Most of the widely-cited "AI failure" stories are, on inspection, human-in-the-loop failures — the loop was missing, mis-designed, or ignored.'
  },
  {
    statement: 'Local AI is the only posture a serious organization can take long-term. Anything else is a dependency an org doesn\'t fully control.'
  },
  {
    statement: 'The work that matters most right now is forward-facing: building for where multi-agent orchestration, local inference, and interface design are heading by 2030.'
  }
];

export const MERMAID_CAPABILITY_GRAPH = `graph TD
  subgraph T1["🟢 TIER 1: PROVEN — Control, Execution, Observability"]
    orch["Orchestrator<br/>★★★★★"]
    wf["Workflow Engine<br/>★★★★★"]
    mr["Model Routing<br/>★★★★☆"]
    
    state["State Machines<br/>★★★★★"]
    events["Events<br/>★★★★☆"]
    runtime["Runtime<br/>★★★★★"]
    agent["Agent Execution<br/>★★★★☆"]
    
    metrics["Metrics<br/>★★★★☆"]
    logs["Logs<br/>★★★★☆"]
    replay["Replay<br/>★★★★★"]
    opui["Operator UI<br/>★★★★★"]
  end
  
  subgraph T2["🟡 TIER 2: UNDEREXPOSED — Foundation Layer"]
    backend["Backend Services<br/>◐ 50% shown"]
    persist["Persistence<br/>◐ 50% shown"]
    api["API Design<br/>○ 15% shown"]
    cloud["Cloud Architecture<br/>○ 10% shown"]
    containers["Containers / Deploy<br/>◐ 45% shown"]
    security["Security / Auth<br/>◐ 40% shown"]
  end
  
  subgraph T3["🔴 ROADMAP: Missing Capabilities"]
    phase1["PHASE I: Atlas Runtime Core<br/>Go · PostgreSQL · Redis<br/>Proves: Distributed backend, queues, durable execution"]
    phase2["PHASE II: Atlas Memory<br/>PostgreSQL + pgvector · S3<br/>Proves: Memory, retrieval, evaluation"]
    phase3["PHASE III: Atlas Desktop<br/>Rust · Tauri · SQLite<br/>Proves: Native systems layer, local/remote control"]
  end
  
  orch --> state
  wf --> events
  mr --> runtime
  
  state --> metrics
  events --> logs
  runtime --> replay
  agent --> opui
  
  metrics --> backend
  logs --> persist
  replay --> api
  opui --> cloud
  
  backend --> phase1
  persist --> phase1
  api --> phase1
  
  persist --> phase2
  cloud --> phase2
  
  phase1 --> phase3

  classDef proven fill:#4ade80,stroke:#3b82f6,stroke-width:2px,color:#000
  classDef underexposed fill:#facc15,stroke:#3b82f6,stroke-width:2px,color:#000
  classDef roadmap fill:#f87171,stroke:#3b82f6,stroke-width:2px,stroke-dasharray: 5 5,color:#000
  classDef tier1 fill:none,stroke:#3b82f6,stroke-width:2px
  classDef tier2 fill:none,stroke:#3b82f6,stroke-width:2px
  classDef tier3 fill:none,stroke:#3b82f6,stroke-width:2px
  
  class orch,wf,mr,state,events,runtime,agent,metrics,logs,replay,opui proven
  class backend,persist,api,cloud,containers,security underexposed
  class phase1,phase2,phase3 roadmap
  class T1 tier1
  class T2 tier2
  class T3 tier3`;

export const TIER_1_PROVEN_ITEMS = [
  {
    title: 'Orchestrator',
    rating: '★★★★★',
    evidence: 'Meridian · AgentOS — multi-agent coordination, routing, policies',
    status: 'proven' as const,
  },
  {
    title: 'Workflow Engine',
    rating: '★★★★★',
    evidence: 'DetRun · Agentic Article Studio — DAGs, execution, composition',
    status: 'proven' as const,
  },
  {
    title: 'State Machines',
    rating: '★★★★★',
    evidence: 'XState Pro · XX — branching, replay, deterministic execution',
    status: 'proven' as const,
  },
  {
    title: 'Events',
    rating: '★★★★☆',
    evidence: 'Xxrun · DetRun — event streams, transitions, ordering',
    status: 'proven' as const,
  },
  {
    title: 'Runtime Design',
    rating: '★★★★★',
    evidence: 'DetRun · RUNTIMEDISTR — execution model, concurrency, cancellation',
    status: 'proven' as const,
  },
  {
    title: 'Telemetry',
    rating: '★★★★☆',
    evidence: 'StateMan · Neo UI — metrics, health, runtime inspection',
    status: 'proven' as const,
  },
  {
    title: 'Replay & Time Travel',
    rating: '★★★★★',
    evidence: 'Xxrun · DetRun — event history, deterministic replay',
    status: 'proven' as const,
  },
  {
    title: 'Operator UX',
    rating: '★★★★★',
    evidence: 'Chromatic Topology · Neo UI — making invisible systems visible',
    status: 'proven' as const,
  },
];

export const TIER_2_UNDEREXPOSED_ITEMS = [
  {
    title: 'Backend Services',
    rating: '◐ 50%',
    evidence: 'APIs, service boundaries implied but not demonstrated running in production',
    status: 'underexposed' as const,
  },
  {
    title: 'Persistence',
    rating: '◐ 50%',
    evidence: 'Event history, execution state, replay all require storage — but the storage layer isn\'t shown',
    status: 'underexposed' as const,
  },
  {
    title: 'API Design',
    rating: '○ 15%',
    evidence: 'Not publicly demonstrated — REST, gRPC, streaming, service contracts',
    status: 'underexposed' as const,
  },
  {
    title: 'Cloud Architecture',
    rating: '○ 10%',
    evidence: 'Not displayed — infrastructure, networking, deployment, scaling',
    status: 'underexposed' as const,
  },
  {
    title: 'Containers / Deployment',
    rating: '◐ 45%',
    evidence: 'Work exists outside the Atlas (OneFileLinux) but not integrated into public narrative',
    status: 'underexposed' as const,
  },
  {
    title: 'Security / Authorization',
    rating: '◐ 40%',
    evidence: 'Policy concepts in Meridian, but implementation depth not shown',
    status: 'underexposed' as const,
  },
];

export const TIER_3_ROADMAP_ITEMS = [
  {
    phase: 'PHASE I',
    title: 'Queues & Workers',
    rating: '0% → ★★★★★',
    stack: 'Go · PostgreSQL · Redis/NATS · OpenTelemetry',
    proves: 'Distributed backend, asynchronous execution, queue architecture, worker concurrency, durable state, deployment',
  },
  {
    phase: 'PHASE II',
    title: 'Agent Memory & Evaluation',
    rating: '0% → ★★★★★',
    stack: 'PostgreSQL + pgvector · S3 storage · embeddings',
    proves: 'Vector retrieval, agent memory lifecycle, evaluation infrastructure, data architecture decisions',
  },
  {
    phase: 'PHASE III',
    title: 'Native Control Plane',
    rating: '0% → ★★★★★',
    stack: 'Rust · Tauri · SQLite · IPC',
    proves: 'Systems programming, native runtime, local/remote architecture, desktop application complexity',
  },
];

export const PAGES_CONFIG: {
  id: 'subject' | 'diagram' | 'tiers' | 'roadmap' | 'contact';
  index: string;
  label: string;
  shortLabel: string;
  description: string;
  badge?: string;
}[] = [
  {
    id: 'subject',
    index: '01',
    label: '01. Subject',
    shortLabel: '01. Subject',
    description: 'Candidate overview, Texas A&M Industrial Distribution background, core working positions',
    badge: 'BIO',
  },
  {
    id: 'diagram',
    index: '02',
    label: '02. Capability Map',
    shortLabel: '02. Capability Map',
    description: 'One diagram: the whole credibility story with Mermaid graph & interactive topology',
    badge: 'DIAGRAM',
  },
  {
    id: 'tiers',
    index: '03',
    label: '03. Breakdown',
    shortLabel: '03. Breakdown',
    description: 'Tier 1 Proven, Tier 2 Underexposed, Tier 3-4 Roadmap Gaps & satellites',
    badge: 'TIERS',
  },
  {
    id: 'roadmap',
    index: '04',
    label: '04. Roadmap',
    shortLabel: '04. Roadmap',
    description: 'One vertical stack, three phases: Atlas Runtime Core, Atlas Memory, Atlas Desktop',
    badge: 'ROADMAP',
  },
  {
    id: 'contact',
    index: '05',
    label: '05. Contact',
    shortLabel: '05. Contact',
    description: 'Direct contact channels, GitHub, and Project Atlas registry (19 records)',
    badge: 'ACCESS',
  },
];



