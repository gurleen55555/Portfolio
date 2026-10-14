import React, { useEffect } from 'react';
import { Project } from '../../data/portfolioData';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';
import { ZentroKnowledgeGraphDiagram, AstraGridPipelineDiagram, TrafficQPSONetworkDiagram } from './ProjectIllustrations';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderVisual = (id: string) => {
    switch (id) {
      case 'zentro-ai':
        return <ZentroKnowledgeGraphDiagram />;
      case 'astragrid-ai':
        return <AstraGridPipelineDiagram />;
      case 'traffic-qpso':
        return <TrafficQPSONetworkDiagram />;
      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#354354]/45 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FFFFFF] border border-[#D5E2F0] shadow-2xl text-[#354354] p-6 sm:p-8 space-y-8 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-[#D5E2F0] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C6B7D]">
              <span className="text-[#783D4C] font-semibold">Case Study #{project.number}</span>
              <span>·</span>
              <span>{project.role}</span>
              <span>·</span>
              <span>{project.date}</span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-[#354354]">
              {project.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#5C6B7D] hover:text-[#783D4C] hover:bg-[#EEF4FA] border border-[#D5E2F0] transition-colors cursor-pointer"
            aria-label="Close Case Study Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Interactive Visual Diagram */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#5C6B7D]">
            <span className="flex items-center gap-1.5 font-medium text-[#783D4C]">
              <Layers className="w-3.5 h-3.5 text-[#783D4C]" />
              Interactive Architectural Model
            </span>
            <span className="text-[11px] text-[#5C6B7D]">Click components to explore telemetry</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-[#D5E2F0]">
            {renderVisual(project.id)}
          </div>
        </div>

        {/* Problem & Architectural Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-[#EEF4FA] border border-[#D5E2F0] space-y-2">
            <span className="text-xs font-mono text-[#783D4C] uppercase font-bold tracking-wider block">
              01. The Problem Space
            </span>
            <p className="text-sm text-[#5C6B7D] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#EEF4FA] border border-[#D5E2F0] space-y-2">
            <span className="text-xs font-mono text-[#783D4C] uppercase font-bold tracking-wider block">
              02. Engineered Architecture
            </span>
            <p className="text-sm text-[#5C6B7D] leading-relaxed">
              {project.approach}
            </p>
          </div>
        </div>

        {/* Technical Capabilities & Benchmarks */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-[#354354] uppercase tracking-wider font-bold block">
            03. Verified Technical Highlights & Benchmarks
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#FFFFFF] border border-[#D5E2F0] flex items-start gap-2.5 text-xs text-[#5C6B7D]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#783D4C] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#354354]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Breakdown */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-[#354354] uppercase tracking-wider font-bold block">
            04. Production Stack & Libraries
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono text-[#354354] bg-[#EEF4FA] border border-[#D5E2F0] rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D5E2F0] text-xs font-mono">
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-white hover:bg-[#EEF4FA] border border-[#D5E2F0] hover:border-[#783D4C] text-[#354354] transition-colors inline-flex items-center gap-2 font-medium"
          >
            <Github className="w-4 h-4 text-[#354354]" />
            <span>Examine Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#5C6B7D]" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#783D4C] hover:bg-[#622F3D] text-white transition-colors cursor-pointer font-medium shadow-xs"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
