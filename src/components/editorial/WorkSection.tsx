import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { ZentroKnowledgeGraphDiagram, AstraGridPipelineDiagram, TrafficQPSONetworkDiagram } from './ProjectIllustrations';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ArrowUpRight, Github, Filter } from 'lucide-react';

type ProjectFilter = 'All' | 'AI / Machine Learning' | 'Full-Stack' | 'Algorithms & Optimization';

export const WorkSection: React.FC = () => {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  const filterOptions: ProjectFilter[] = [
    'All',
    'AI / Machine Learning',
    'Full-Stack',
    'Algorithms & Optimization',
  ];

  const getProjectCategories = (p: Project): ProjectFilter[] => {
    switch (p.id) {
      case 'zentro-ai':
        return ['AI / Machine Learning', 'Full-Stack'];
      case 'astragrid-ai':
        return ['AI / Machine Learning'];
      case 'traffic-qpso':
        return ['AI / Machine Learning', 'Algorithms & Optimization'];
      default:
        return ['AI / Machine Learning'];
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((project) => {
      const cats = getProjectCategories(project);
      return cats.includes(activeFilter);
    });
  }, [activeFilter]);

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
    <section 
      id="work" 
      ref={sectionRef}
      className={`py-20 lg:py-28 bg-[#FFFFFF] text-[#354354] border-b border-[#D5E2F0] scroll-mt-14 transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 space-y-3">
          <div className="text-[11px] font-mono tracking-widest text-[#783D4C] uppercase font-bold flex items-center gap-2">
            <span>SELECTED WORK / 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#354354]">
            Engineering ideas into systems<span className="text-[#783D4C]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B7D] max-w-2xl leading-relaxed">
            Case studies exploring multi-agent intelligence, secure predictive workflows, and metaheuristic optimization under real-time constraints.
          </p>
        </div>

        {/* Functional Filter Controls */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 p-3 bg-[#EEF4FA] border border-[#D5E2F0] rounded-xl shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5C6B7D]">
            <Filter className="w-3.5 h-3.5 text-[#783D4C]" />
            <span className="hidden sm:inline font-medium">Filter by Domain:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project category filters">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#783D4C] text-white font-semibold border-[#783D4C] shadow-xs'
                      : 'bg-white text-[#5C6B7D] border-[#D5E2F0] hover:text-[#354354] hover:border-[#783D4C]/40'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Result Count Indicator */}
          <div className="text-[11px] font-mono text-[#5C6B7D] ml-auto sm:ml-0">
            Showing <span className="text-[#783D4C] font-bold">{filteredProjects.length}</span> of {PORTFOLIO_DATA.projects.length} Case Studies
          </div>
        </div>

        {/* Selected Work List with Staggered Entrance */}
        <div className="space-y-16">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#D5E2F0] transition-all duration-300 hover:border-[#783D4C]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#783D4C]/6 group"
              style={{
                transitionDelay: `${idx * 60}ms`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Visual Illustration with interactive hover */}
                <div
                  className="lg:col-span-6"
                  onClick={() => setActiveProjectModal(project)}
                >
                  <div className="cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]">
                    {renderVisual(project.id)}
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Meta kicker */}
                  <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#5C6B7D]">
                    <span className="text-[#783D4C] font-semibold">Project {project.number}</span>
                    <span>{project.role} · {project.date}</span>
                  </div>

                  {/* Title & Status */}
                  <div className="flex items-center gap-3">
                    <h3
                      onClick={() => setActiveProjectModal(project)}
                      className="text-2xl font-bold text-[#354354] group-hover:text-[#783D4C] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#5C6B7D] group-hover:text-[#783D4C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>
                    {project.status && (
                      <span className="px-2.5 py-0.5 text-[10px] font-mono text-[#783D4C] bg-[#EEF4FA] border border-[#D5E2F0] rounded-full font-semibold">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Editorial Description */}
                  <p className="text-sm text-[#5C6B7D] leading-relaxed">
                    “{project.description}”
                  </p>

                  {/* Key feature highlights */}
                  <ul className="space-y-1.5 text-xs text-[#5C6B7D]">
                    {project.keyFeatures.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#783D4C] font-mono font-bold">·</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono text-[#354354] bg-[#EEF4FA] border border-[#D5E2F0] rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 border-t border-[#D5E2F0] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5C6B7D] hover:text-[#783D4C] transition-colors inline-flex items-center gap-1.5 font-medium"
                    >
                      <Github className="w-3.5 h-3.5 text-[#354354]" />
                      <span>View Source Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#5C6B7D]" />
                    </a>

                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="px-4 py-2 rounded-lg bg-[#783D4C] hover:bg-[#622F3D] text-white transition-colors cursor-pointer flex items-center gap-1.5 font-medium shadow-xs"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
