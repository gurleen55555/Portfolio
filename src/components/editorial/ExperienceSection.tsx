import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Award, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('google-ambassador');
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  const toggleExperience = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className={`py-20 lg:py-28 border-b border-[#D5E2F0] bg-[#FFFFFF] text-[#354354] scroll-mt-14 transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-3">
          <div className="text-[11px] font-mono tracking-widest text-[#783D4C] uppercase font-bold flex items-center gap-2">
            <span>EXPERIENCE & LEADERSHIP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#354354]">
            Beyond the code<span className="text-[#783D4C]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B7D] max-w-2xl leading-relaxed">
            Roles spanning student technology advocacy, technical operations automation, and peer community mentorship. Select any role to inspect verified milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Vertical Timeline */}
          <div className="lg:col-span-8 relative border-l border-[#D5E2F0] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
            {PORTFOLIO_DATA.experiences.map((exp) => {
              const isExpanded = expandedId === exp.id;

              return (
                <div
                  key={exp.id}
                  className="relative group cursor-pointer focus:outline-none"
                  onClick={() => toggleExperience(exp.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExperience(exp.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={`${exp.role} at ${exp.organization}`}
                >
                  {/* Timeline Dot Marker with Active Emphasis */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-2 rounded-full transition-all duration-300 ${
                      isExpanded
                        ? 'w-4 h-4 -left-[33px] sm:-left-[41px] bg-[#783D4C] ring-4 ring-[#783D4C]/15 shadow-md'
                        : 'w-3 h-3 bg-white border-2 border-[#783D4C] group-hover:scale-125'
                    }`}
                  />

                  {/* Experience Card */}
                  <div
                    className={`p-6 rounded-2xl transition-all duration-300 border ${
                      isExpanded
                        ? 'bg-white border-[#783D4C] shadow-lg shadow-[#783D4C]/8 -translate-y-0.5'
                        : 'bg-[#FAF9F7] border-[#D5E2F0] hover:border-[#783D4C]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-base font-bold transition-colors ${
                              isExpanded ? 'text-[#783D4C]' : 'text-[#354354] group-hover:text-[#783D4C]'
                            }`}
                          >
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-xs font-mono text-[#783D4C] font-semibold mt-0.5">
                          {exp.organization}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-[#5C6B7D]">
                        <span>{exp.period}</span>
                        <span>·</span>
                        <span>{exp.location}</span>
                        <span className="ml-1 text-[#783D4C]">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed mt-2.5">
                      {exp.description}
                    </p>

                    {/* Expandable Details & Highlights */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-96 opacity-100 pt-4 mt-4 border-t border-[#D5E2F0]' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-[#783D4C] uppercase tracking-wider mb-2 font-bold">
                        Key Responsibilities & Impact
                      </div>
                      <ul className="space-y-2 text-xs text-[#5C6B7D]">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#783D4C] shrink-0 mt-0.5" />
                            <span className="leading-relaxed text-[#354354]">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Recognitions & Academic Footprint */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#D5E2F0] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-[#D5E2F0]">
                <Award className="w-4 h-4 text-[#783D4C]" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-[#354354] uppercase">
                  Honors & Recognition
                </h3>
              </div>

              <div className="space-y-3">
                {PORTFOLIO_DATA.recognitions.map((rec) => (
                  <div
                    key={rec.title}
                    className="p-3.5 rounded-xl bg-[#EEF4FA] border border-[#D5E2F0] hover:border-[#783D4C]/40 transition-colors space-y-1 text-xs"
                  >
                    <span className="font-bold text-[#354354] block">
                      {rec.title}
                    </span>
                    <span className="text-[11px] text-[#5C6B7D] block">
                      {rec.context}
                    </span>
                    <span className="text-[10px] font-mono text-[#783D4C] font-semibold block">
                      {rec.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Undergraduate Footprint Card */}
            <div className="p-5 rounded-2xl bg-[#EEF4FA] border border-[#D5E2F0] text-xs text-[#5C6B7D] space-y-2 font-mono shadow-2xs">
              <span className="text-[#783D4C] font-bold block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
                Undergraduate Footprint
              </span>
              <p className="leading-relaxed text-[#354354]">
                Balancing 9.28 CGPA coursework in systems fundamentals with student representation and applied AI exploration at NIT Agartala.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
