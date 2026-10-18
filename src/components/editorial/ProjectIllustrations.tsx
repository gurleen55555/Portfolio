import React, { useState } from 'react';
import { RotateCcw, ChevronRight, Activity, Terminal, ShieldCheck, GitCommit } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. ZENTRO AI: KNOWLEDGE GRAPH INTERACTION                                  */
/* -------------------------------------------------------------------------- */
interface ZentroNode {
  id: string;
  name: string;
  role: string;
  type: 'hub' | 'agent' | 'ontology';
  description: string;
  cx: number;
  cy: number;
  radius: number;
}

export const ZentroKnowledgeGraphDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('hub');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeId = hoveredNodeId || selectedNodeId;

  const nodes: ZentroNode[] = [
    {
      id: 'hub',
      name: 'Company Brain',
      role: 'Semantic Ontology Core',
      type: 'hub',
      description:
        'Deterministic semantic ontology unifying cross-departmental records, meeting transcripts, and business invariants with step-level citation traceability.',
      cx: 260,
      cy: 125,
      radius: 34,
    },
    {
      id: 'executive',
      name: 'Executive Agent',
      role: 'Strategic Synthesis',
      type: 'agent',
      description:
        'Synthesizes high-level business intelligence from unified entity nodes to formulate strategic executive summaries.',
      cx: 110,
      cy: 65,
      radius: 20,
    },
    {
      id: 'revenue',
      name: 'Revenue Risk Agent',
      role: 'Anomaly Detection',
      type: 'agent',
      description:
        'Continuously evaluates deal velocity, margin changes, and contractual obligations to flag revenue leakage early.',
      cx: 410,
      cy: 65,
      radius: 20,
    },
    {
      id: 'lead',
      name: 'Lead Intelligence',
      role: 'Entity Provenance',
      type: 'agent',
      description:
        'Tracks touchpoint histories across email threads and CRM objects, maintaining an auditable lineage of customer interactions.',
      cx: 130,
      cy: 195,
      radius: 20,
    },
    {
      id: 'meeting',
      name: 'Meeting Intelligence',
      role: 'Action Item Graph',
      type: 'agent',
      description:
        'Extracts structured decisions, action items, and owner assignments from unstructured discussions into the central ontology.',
      cx: 390,
      cy: 195,
      radius: 20,
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeId) || null;

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(null);
    setHoveredNodeId(null);
  };

  return (
    <div className="w-full bg-[#EEF4FA] border border-[#D5E2F0] hover:border-[#783D4C]/40 transition-colors rounded-xl p-4 sm:p-5 flex flex-col justify-between font-mono select-none relative overflow-hidden group/diagram shadow-xs">
      {/* Top Header Label */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-[#D5E2F0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#783D4C]" />
          <span className="text-[#354354] text-[11px] tracking-wide font-semibold">
            SYSTEM ARCHITECTURE :: ONTOLOGY_CORE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#5C6B7D]">REASONING TRACK</span>
          {selectedNodeId && (
            <button
              onClick={handleReset}
              className="text-[10px] text-[#783D4C] hover:text-[#622F3D] flex items-center gap-1 cursor-pointer font-medium underline"
              title="Reset graph view"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] my-2">
        <svg className="w-full h-full" viewBox="0 0 520 250" fill="none">
          {/* Subtle grid background */}
          <g stroke="#D5E2F0" strokeWidth="0.8" strokeDasharray="3 3">
            <line x1="20" y1="65" x2="500" y2="65" />
            <line x1="20" y1="125" x2="500" y2="125" />
            <line x1="20" y1="195" x2="500" y2="195" />
          </g>

          {/* Connectors */}
          {nodes
            .filter((n) => n.id !== 'hub')
            .map((agent) => {
              const isConnected = activeId === 'hub' || activeId === agent.id;

              return (
                <g key={`conn-${agent.id}`}>
                  <line
                    x1={260}
                    y1={125}
                    x2={agent.cx}
                    y2={agent.cy}
                    stroke={isConnected ? '#783D4C' : '#DCE7F4'}
                    strokeWidth={isConnected ? 2 : 1.2}
                    strokeDasharray={isConnected ? '6 3' : undefined}
                    className={isConnected ? 'animate-flow-dash' : ''}
                    opacity={isConnected ? 1 : 0.8}
                  />
                  {/* Subtle data flow particle */}
                  {isConnected && (
                    <circle
                      cx={(260 + agent.cx) / 2}
                      cy={(125 + agent.cy) / 2}
                      r="2.5"
                      fill="#783D4C"
                    />
                  )}
                </g>
              );
            })}

          {/* Secondary inter-agent dashed links */}
          <line
            x1="110"
            y1="65"
            x2="410"
            y2="65"
            stroke="#D5E2F0"
            strokeWidth="0.8"
            strokeDasharray="3 4"
          />
          <line
            x1="130"
            y1="195"
            x2="390"
            y2="195"
            stroke="#D5E2F0"
            strokeWidth="0.8"
            strokeDasharray="3 4"
          />

          {/* Hub: Center Company Brain */}
          <g
            className="cursor-pointer focus:outline-none"
            onMouseEnter={() => setHoveredNodeId('hub')}
            onMouseLeave={() => setHoveredNodeId(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNodeId(selectedNodeId === 'hub' ? null : 'hub');
            }}
          >
            {/* Halo pulse when active */}
            {activeId === 'hub' && (
              <circle
                cx="260"
                cy="125"
                r="44"
                fill="#783D4C"
                opacity="0.1"
                className="animate-pulse"
              />
            )}
            <circle
              cx="260"
              cy="125"
              r="34"
              fill={activeId === 'hub' ? '#783D4C' : '#FFFFFF'}
              stroke={activeId === 'hub' ? '#622F3D' : '#783D4C'}
              strokeWidth="2.5"
              className="transition-colors duration-200"
            />
            <text
              x="260"
              y="120"
              textAnchor="middle"
              fill={activeId === 'hub' ? '#FFFFFF' : '#354354'}
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
              className="select-none"
            >
              ONTOLOGY
            </text>
            <text
              x="260"
              y="134"
              textAnchor="middle"
              fill={activeId === 'hub' ? '#DCE7F4' : '#5C6B7D'}
              fontSize="8"
              fontFamily="monospace"
              className="select-none"
            >
              CORE BRAIN
            </text>
          </g>

          {/* Specialized Peripheral Agent Nodes */}
          {nodes
            .filter((n) => n.id !== 'hub')
            .map((agent) => {
              const isActive = activeId === agent.id;

              return (
                <g
                  key={agent.id}
                  className="cursor-pointer focus:outline-none"
                  onMouseEnter={() => setHoveredNodeId(agent.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(selectedNodeId === agent.id ? null : agent.id);
                  }}
                >
                  {/* Subtle hover/active ring */}
                  {isActive && (
                    <circle
                      cx={agent.cx}
                      cy={agent.cy}
                      r={agent.radius + 6}
                      fill="none"
                      stroke="#783D4C"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      className="animate-spin-slow"
                    />
                  )}
                  <circle
                    cx={agent.cx}
                    cy={agent.cy}
                    r={agent.radius}
                    fill={isActive ? '#EEF4FA' : '#FFFFFF'}
                    stroke={isActive ? '#783D4C' : '#D5E2F0'}
                    strokeWidth="1.8"
                    className="transition-colors duration-200"
                  />
                  {/* Agent node inner label */}
                  <text
                    x={agent.cx}
                    y={agent.cy - 1}
                    textAnchor="middle"
                    fill="#354354"
                    fontSize="7.5"
                    fontWeight="bold"
                    fontFamily="monospace"
                    className="select-none"
                  >
                    {agent.id.toUpperCase()}
                  </text>
                  <text
                    x={agent.cx}
                    y={agent.cy + 9}
                    textAnchor="middle"
                    fill={isActive ? '#783D4C' : '#5C6B7D'}
                    fontSize="6.5"
                    fontFamily="monospace"
                    className="select-none"
                  >
                    AGENT
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      {/* Dynamic Inspector Panel */}
      <div className="pt-2 border-t border-[#D5E2F0] text-[11px] font-mono">
        {activeNode ? (
          <div className="bg-white p-3 rounded-lg border border-[#D5E2F0] space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#783D4C] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
                {activeNode.name}
              </span>
              <span className="text-[10px] text-[#5C6B7D]">{activeNode.role}</span>
            </div>
            <p className="text-[11px] text-[#5C6B7D] font-sans leading-relaxed">
              {activeNode.description}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between text-[#5C6B7D] py-1 text-[10px]">
            <span>Click or hover over any node to inspect semantic lineage</span>
            <span className="text-[#783D4C] font-medium">Interactive Graph</span>
          </div>
        )}
      </div>

      {/* Footer Meta */}
      <div className="flex items-center justify-between text-[10px] text-[#5C6B7D] pt-2 mt-1 border-t border-[#D5E2F0]">
        <span>Graph Ontology Layer · Multi-Agent Reasoning</span>
        <span className="text-[#783D4C] font-medium">TypeScript · Next.js · Supabase</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. ASTRAGRID AI: AIR-GAPPED AIRSPACE ML PIPELINE                          */
/* -------------------------------------------------------------------------- */
export const AstraGridPipelineDiagram: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number | null>(1);

  const stages = [
    {
      step: '01',
      title: 'Telemetry Ingestion',
      metric: '2,000 Synthetic Records',
      subtitle: 'Multivariate sensor stream preprocessed in real-time',
      badge: 'Edge Sensor Stream',
      telemetryFields: ['Synthetic telemetry', 'Local rolling buffer'],
      explanation:
        'Raw sensor arrays feed high-frequency telemetry features into a local rolling buffer, performing anomaly scoring before neural inference.',
    },
    {
      step: '02',
      title: 'LSTM Predictive Forecaster',
      metric: '85.93% Accuracy',
      subtitle: 'Air-gapped temporal anomaly sequence detection',
      badge: 'Offline Model Core',
      telemetryFields: ['0.85 Macro F1', '0.97 Failure Recall'],
      explanation:
        'A lightweight LSTM model processes temporal sequences to detect impending component failure signals before threshold breach.',
    },
    {
      step: '03',
      title: 'Offline Diagnostic Agent',
      metric: 'Ollama Phi-3 Mini',
      subtitle: 'Zero cloud latency offline diagnosis & checklists',
      badge: 'Zero-Telemetry LLM',
      telemetryFields: ['Fully offline', 'RAG over local runbooks'],
      explanation:
        'A quantized SLM (Phi-3 Mini) evaluates flagged anomalies against operational runbooks, generating structured diagnostic guidance strictly offline.',
    },
  ];

  return (
    <div className="w-full bg-[#EEF4FA] border border-[#D5E2F0] hover:border-[#783D4C]/40 transition-colors rounded-xl p-4 sm:p-5 flex flex-col justify-between font-mono select-none relative overflow-hidden group/diagram shadow-xs">
      {/* Top Header Label */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-[#D5E2F0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#783D4C]" />
          <span className="text-[#354354] text-[11px] tracking-wide font-semibold">
            SECURE AIR-GAPPED WORKFLOW
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#5C6B7D]">OFFLINE EXECUTION</span>
          {selectedStage !== null && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStage(null);
              }}
              className="text-[10px] text-[#783D4C] hover:text-[#622F3D] flex items-center gap-1 cursor-pointer font-medium underline"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Deselect</span>
            </button>
          )}
        </div>
      </div>

      {/* 3 Connected Stages */}
      <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch relative">
        {stages.map((stage, idx) => {
          const isSelected = selectedStage === idx;

          return (
            <div
              key={stage.step}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStage(isSelected ? null : idx);
              }}
              className={`rounded-lg p-3.5 transition-all duration-200 cursor-pointer flex flex-col justify-between relative border ${
                isSelected
                  ? 'bg-white border-[#783D4C] shadow-md shadow-[#783D4C]/8'
                  : 'bg-white border-[#D5E2F0] hover:border-[#783D4C]/40'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#783D4C] uppercase tracking-wider font-bold">
                    Stage {stage.step}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-[#783D4C] animate-ping' : 'bg-[#D5E2F0]'
                    }`}
                  />
                </div>

                <h4 className="text-xs font-bold text-[#354354]">{stage.title}</h4>
                <p className="text-[11px] font-semibold text-[#783D4C]">{stage.metric}</p>
                <p className="text-[9.5px] text-[#5C6B7D]">{stage.subtitle}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#D5E2F0] flex items-center justify-between text-[9px] text-[#5C6B7D]">
                <span>{stage.badge}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-[#783D4C] transition-transform ${
                    isSelected ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="pt-2 border-t border-[#D5E2F0] text-[11px] font-mono">
        {selectedStage !== null ? (
          <div className="bg-white p-3 rounded-lg border border-[#D5E2F0] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#783D4C] font-bold">
                Stage {stages[selectedStage].step}: {stages[selectedStage].title} Deep Dive
              </span>
              <span className="text-[10px] text-[#783D4C] font-semibold bg-[#EEF4FA] px-2 py-0.5 rounded border border-[#D5E2F0]">
                {stages[selectedStage].metric}
              </span>
            </div>
            <p className="text-[11px] text-[#5C6B7D] font-sans leading-relaxed">
              {stages[selectedStage].explanation}
            </p>

            <div className="pt-2 border-t border-[#D5E2F0] flex flex-wrap gap-2 text-[10px]">
              {stages[selectedStage].telemetryFields.map((field) => (
                <span
                  key={field}
                  className="px-2 py-0.5 bg-[#EEF4FA] border border-[#D5E2F0] rounded text-[#354354]"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-[#5C6B7D] py-1 text-[10px]">
            <span>Click any stage in the offline pipeline to view execution architecture</span>
            <span className="text-[#783D4C] font-medium">Stage Inspector</span>
          </div>
        )}
      </div>

      {/* Note under diagram */}
      <div className="pt-2 text-[10px] text-[#5C6B7D] italic">
        Results on synthetic telemetry; not validated on real hardware.
      </div>

      {/* Footer Meta */}
      <div className="flex items-center justify-between text-[10px] text-[#5C6B7D] pt-2 mt-1 border-t border-[#D5E2F0]">
        <span>Air-Gapped Offline Copilot Architecture</span>
        <span className="text-[#783D4C] font-medium">LSTM · Phi-3 Mini · Ollama</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. TRAFFIC QPSO: NETWORK GRAPH & BENCHMARK SIMULATION                     */
/* -------------------------------------------------------------------------- */
type TrafficScenario = 'normal' | 'rush' | 'accident';
type CandidateRoute = 'qpso' | 'dijkstra' | 'alternate';

export const TrafficQPSONetworkDiagram: React.FC = () => {
  const [scenario, setScenario] = useState<TrafficScenario>('accident');
  const [selectedRoute, setSelectedRoute] = useState<CandidateRoute>('qpso');

  const scenarioDetails = {
    normal: {
      label: 'Nominal Traffic Flow',
      description: 'Standard load across urban arterials with uniform link weights.',
      congestionLevel: 'Low Delay Factor',
      qpsoCost: 'Result: pending benchmark',
      baselineCost: 'Baseline: pending benchmark',
      incidentNode: null,
    },
    rush: {
      label: 'Peak Hour Congestion',
      description: 'Heavy saturation along central arterial causing non-linear queue delays.',
      congestionLevel: 'High Saturation Index',
      qpsoCost: 'Result: pending benchmark',
      baselineCost: 'Baseline: pending benchmark',
      incidentNode: { cx: 280, cy: 110, label: 'Bottleneck A-1' },
    },
    accident: {
      label: 'Primary Arterial Collision Blockage',
      description: 'Severe lane closure on central transit route forcing stochastic redistribution.',
      congestionLevel: 'Primary Link Blocked',
      qpsoCost: 'Result: pending benchmark',
      baselineCost: 'Baseline: pending benchmark',
      incidentNode: { cx: 280, cy: 110, label: 'INCIDENT: LINK BLOCKED' },
    },
  };

  const currentScenario = scenarioDetails[scenario];

  return (
    <div className="w-full bg-[#EEF4FA] border border-[#D5E2F0] hover:border-[#783D4C]/40 transition-colors rounded-xl p-4 sm:p-5 flex flex-col justify-between font-mono select-none relative overflow-hidden group/diagram shadow-xs">
      {/* Visible Notice Banner */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-white border border-[#D5E2F0] text-[10px] text-[#354354] font-sans flex items-center gap-2 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C] shrink-0" />
        <span className="font-semibold text-[#783D4C]">Notice:</span>
        <span className="text-[#5C6B7D]">Conceptual illustration. Real benchmark results (30 runs per algorithm) will replace this view.</span>
      </div>

      {/* Top Header Label */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-[#D5E2F0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#783D4C]" />
          <span className="text-[#354354] text-[11px] tracking-wide font-semibold">
            ROUTING GRAPH :: 600+ NODES (ILLUSTRATIVE)
          </span>
        </div>
        <span className="px-2 py-0.5 text-[9px] font-mono font-semibold text-[#783D4C] bg-white border border-[#D5E2F0] rounded">
          IN PROGRESS BENCHMARKS
        </span>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="pt-2 pb-1 flex flex-wrap items-center gap-2 text-[10px]">
        <span className="text-[#5C6B7D]">Scenario:</span>
        {(['normal', 'rush', 'accident'] as TrafficScenario[]).map((scKey) => {
          const isActive = scenario === scKey;
          return (
            <button
              key={scKey}
              onClick={(e) => {
                e.stopPropagation();
                setScenario(scKey);
              }}
              className={`px-2 py-1 rounded transition-colors cursor-pointer border ${
                isActive
                  ? 'bg-[#783D4C] text-white font-semibold border-[#783D4C]'
                  : 'bg-white text-[#5C6B7D] border-[#D5E2F0] hover:text-[#354354] hover:border-[#783D4C]/40'
              }`}
            >
              {scenarioDetails[scKey].label}
            </button>
          );
        })}
      </div>

      {/* Candidate Route Selector */}
      <div className="py-1 flex flex-wrap items-center gap-2 text-[10px]">
        <span className="text-[#5C6B7D]">Highlight Path:</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRoute('qpso');
          }}
          className={`px-2 py-0.5 rounded cursor-pointer border ${
            selectedRoute === 'qpso'
              ? 'bg-[#783D4C] text-white border-[#783D4C] font-medium'
              : 'bg-white text-[#5C6B7D] border-[#D5E2F0]'
          }`}
        >
          QPSO Candidate Path
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRoute('dijkstra');
          }}
          className={`px-2 py-0.5 rounded cursor-pointer border ${
            selectedRoute === 'dijkstra'
              ? 'bg-[#354354] text-white border-[#354354]'
              : 'bg-white text-[#5C6B7D] border-[#D5E2F0]'
          }`}
        >
          Static Baseline Path
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRoute('alternate');
          }}
          className={`px-2 py-0.5 rounded cursor-pointer border ${
            selectedRoute === 'alternate'
              ? 'bg-[#5C6B7D] text-white border-[#5C6B7D]'
              : 'bg-white text-[#5C6B7D] border-[#D5E2F0]'
          }`}
        >
          Bypass Corridor
        </button>
      </div>

      {/* 2D Road-Network Interactive SVG */}
      <div className="relative w-full aspect-[16/8] my-2 bg-white rounded-lg border border-[#D5E2F0] p-2">
        <svg className="w-full h-full" viewBox="0 0 500 210" fill="none">
          {/* Base Road Network Grid in Powder Blue & Slate */}
          <g stroke="#D5E2F0" strokeWidth="1.2">
            {/* Horizontal Avenues */}
            <line x1="50" y1="45" x2="160" y2="45" />
            <line x1="160" y1="45" x2="270" y2="40" />
            <line x1="270" y1="40" x2="380" y2="50" />
            <line x1="380" y1="50" x2="460" y2="45" />

            <line x1="50" y1="110" x2="160" y2="110" />
            <line
              x1="160"
              y1="110"
              x2="280"
              y2="110"
              stroke={scenario !== 'normal' ? '#783D4C' : '#DCE7F4'}
              strokeWidth={scenario !== 'normal' ? 2 : 1.2}
              strokeDasharray={scenario === 'accident' ? '4 2' : undefined}
            />
            <line
              x1="280"
              y1="110"
              x2="390"
              y2="110"
              stroke={scenario !== 'normal' ? '#783D4C' : '#DCE7F4'}
              strokeWidth={scenario !== 'normal' ? 2 : 1.2}
              strokeDasharray={scenario === 'accident' ? '4 2' : undefined}
            />
            <line x1="390" y1="110" x2="460" y2="110" />

            <line x1="50" y1="170" x2="170" y2="170" />
            <line x1="170" y1="170" x2="290" y2="170" />
            <line x1="290" y1="170" x2="400" y2="170" />
            <line x1="400" y1="170" x2="460" y2="170" />

            {/* Vertical cross streets */}
            <line x1="160" y1="45" x2="160" y2="170" />
            <line x1="270" y1="40" x2="280" y2="110" />
            <line x1="280" y1="110" x2="290" y2="170" />
            <line x1="380" y1="50" x2="390" y2="110" />
            <line x1="390" y1="110" x2="400" y2="170" />
          </g>

          {/* Route 1: QPSO Swarm Optimal Path */}
          {selectedRoute === 'qpso' && (
            <g>
              <polyline
                points={
                  scenario === 'normal'
                    ? '50,110 160,110 280,110 390,110 460,110'
                    : '50,110 160,45 270,40 380,50 460,110'
                }
                stroke="#783D4C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-flow-dash"
                strokeDasharray="6 3"
              />
            </g>
          )}

          {/* Route 2: Static Baseline Path (not drawn through blocked link) */}
          {selectedRoute === 'dijkstra' && (
            <polyline
              points={
                scenario === 'accident'
                  ? '50,110 160,170 290,170 400,170 460,110'
                  : '50,110 160,110 280,110 390,110 460,110'
              }
              stroke="#354354"
              strokeWidth="2.2"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
          )}

          {/* Route 3: Alternate Bypass Corridor */}
          {selectedRoute === 'alternate' && (
            <polyline
              points="50,110 160,110 170,170 290,170 400,170 460,110"
              stroke="#5C6B7D"
              strokeWidth="2.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
          )}

          {/* Incident / Accident marker */}
          {currentScenario.incidentNode && (
            <g>
              <circle
                cx={currentScenario.incidentNode.cx}
                cy={currentScenario.incidentNode.cy}
                r="11"
                fill="none"
                stroke="#783D4C"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                className="animate-pulse"
              />
              <circle
                cx={currentScenario.incidentNode.cx}
                cy={currentScenario.incidentNode.cy}
                r="4"
                fill="#783D4C"
              />
              <text
                x={currentScenario.incidentNode.cx}
                y={currentScenario.incidentNode.cy + 20}
                fill="#783D4C"
                fontSize="7.5"
                textAnchor="middle"
                fontWeight="bold"
              >
                {currentScenario.incidentNode.label}
              </text>
            </g>
          )}

          {/* Origin and Target Nodes */}
          <circle cx="50" cy="110" r="5" fill="#783D4C" stroke="#FFFFFF" strokeWidth="2" />
          <text x="50" y="96" fill="#354354" fontSize="8" fontWeight="bold" textAnchor="middle">
            Origin V1
          </text>

          <circle cx="460" cy="110" r="5" fill="#783D4C" stroke="#FFFFFF" strokeWidth="2" />
          <text x="460" y="96" fill="#354354" fontSize="8" fontWeight="bold" textAnchor="middle">
            Target D1..8
          </text>

          <circle cx="160" cy="45" r="3" fill="#EEF4FA" stroke="#783D4C" />
          <circle cx="270" cy="40" r="3" fill="#EEF4FA" stroke="#783D4C" />
          <circle cx="380" cy="50" r="3" fill="#EEF4FA" stroke="#783D4C" />
        </svg>
      </div>

      {/* Scenario Explanation Card */}
      <div className="pt-2 border-t border-[#D5E2F0] text-[11px] font-mono">
        <div className="bg-white p-3 rounded-lg border border-[#D5E2F0] space-y-1 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-[#783D4C] font-bold">{currentScenario.label}</span>
            <span className="text-[10px] text-[#5C6B7D]">{currentScenario.congestionLevel}</span>
          </div>
          <p className="text-[11px] text-[#5C6B7D] font-sans leading-relaxed">
            {currentScenario.description}
          </p>
          <div className="pt-2 border-t border-[#D5E2F0] flex flex-wrap items-center justify-between text-[10px]">
            <span className="text-[#783D4C] font-semibold">{currentScenario.qpsoCost}</span>
            <span className="text-[#5C6B7D]">{currentScenario.baselineCost}</span>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between text-[10px] text-[#5C6B7D] pt-2 mt-1 border-t border-[#D5E2F0]">
        <span>Illustrative Swarm Benchmark Simulation</span>
        <span className="text-[#783D4C] font-medium">30 Trial Runs Ongoing</span>
      </div>
    </div>
  );
};
