import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Code, Brain, Wrench, Database, GitMerge, RotateCcw } from 'lucide-react';

export const TechnicalFocusSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  const categories = [
    { id: 'all', label: 'All Domains' },
    ...PORTFOLIO_DATA.skillGroups.map((g) => ({ id: g.group, label: g.group })),
  ];

  const filteredGroups = useMemo(() => {
    if (activeCategory === 'all') {
      return PORTFOLIO_DATA.skillGroups;
    }
    return PORTFOLIO_DATA.skillGroups.filter((g) => g.group === activeCategory);
  }, [activeCategory]);

  const getDomainIcon = (groupName: string) => {
    switch (groupName) {
      case 'Languages':
        return <Code className="w-3.5 h-3.5 text-[#783D4C]" />;
      case 'AI and Machine Learning':
        return <Brain className="w-3.5 h-3.5 text-[#783D4C]" />;
      case 'Frameworks and Libraries':
        return <Wrench className="w-3.5 h-3.5 text-[#783D4C]" />;
      case 'Data and Developer Tools':
        return <Database className="w-3.5 h-3.5 text-[#783D4C]" />;
      case 'Algorithms and CS Fundamentals':
        return <GitMerge className="w-3.5 h-3.5 text-[#783D4C]" />;
      default:
        return <Code className="w-3.5 h-3.5 text-[#783D4C]" />;
    }
  };

  const totalSkillsCount = PORTFOLIO_DATA.skillGroups.reduce(
    (acc, g) => acc + g.skills.length,
    0
  );

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className={`py-20 lg:py-28 border-b border-[#D5E2F0] bg-[#EEF4FA] text-[#354354] scroll-mt-14 transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 space-y-3">
          <div className="text-[11px] font-mono tracking-widest text-[#783D4C] uppercase font-bold flex items-center gap-2">
            <span>TECHNICAL FOCUS & STACK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#354354]">
            A systems-oriented approach<span className="text-[#783D4C]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B7D] max-w-2xl leading-relaxed">
            Core mathematical foundations and applied software proficiencies categorized by architectural domain.
          </p>
        </div>

        {/* Category Controls Bar */}
        <div className="mb-8 p-3 rounded-xl bg-white border border-[#D5E2F0] flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Technical skill domains">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#783D4C] text-white font-semibold border-[#783D4C] shadow-xs'
                      : 'bg-[#FAF9F7] text-[#5C6B7D] border-[#D5E2F0] hover:text-[#354354] hover:border-[#783D4C]/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Reset / Show All action if filtered */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#5C6B7D] ml-auto sm:ml-0">
            {activeCategory !== 'all' || selectedSkill !== null ? (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedSkill(null);
                }}
                className="text-[#783D4C] hover:text-[#622F3D] transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All</span>
              </button>
            ) : (
              <span>{totalSkillsCount} Core Proficiencies</span>
            )}
          </div>
        </div>

        {/* Selected Skill Telemetry Banner */}
        {selectedSkill && (
          <div className="mb-6 p-3 rounded-xl bg-white border border-[#783D4C]/30 text-xs font-mono flex items-center justify-between animate-fade-in shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#783D4C] animate-ping" />
              <span className="text-[#5C6B7D]">Active Focus Skill:</span>
              <span className="text-[#783D4C] font-bold">{selectedSkill}</span>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-[#783D4C] hover:text-[#622F3D] text-[11px] underline cursor-pointer font-medium"
            >
              Clear Focus
            </button>
          </div>
        )}

        {/* Editorial Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {filteredGroups.map((group, idx) => (
            <div
              key={group.group}
              className={`p-6 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between shadow-xs ${
                activeCategory === group.group
                  ? 'border-[#783D4C] shadow-md shadow-[#783D4C]/10'
                  : 'border-[#D5E2F0] hover:border-[#783D4C]/40'
              } ${
                activeCategory === 'all' && idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D5E2F0]">
                  <div className="flex items-center gap-2">
                    {getDomainIcon(group.group)}
                    <h3 className="text-xs font-mono font-bold tracking-wider text-[#354354] uppercase">
                      {group.group}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#783D4C] font-semibold bg-[#EEF4FA] px-2 py-0.5 rounded border border-[#D5E2F0]">
                    {group.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;

                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(isSelected ? null : skill)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer border text-left ${
                          isSelected
                            ? 'bg-[#783D4C] text-white font-bold border-[#783D4C] shadow-xs'
                            : 'bg-[#FAF9F7] text-[#5C6B7D] border-[#D5E2F0] hover:text-[#354354] hover:border-[#783D4C]/40 hover:bg-[#EEF4FA]'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
