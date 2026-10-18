import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Award, GraduationCap, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

export const AboutEducationSection: React.FC = () => {
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 lg:py-28 border-b border-[#D5E2F0] bg-[#FAF9F7] text-[#354354] scroll-mt-14 transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-3">
          <div className="text-[11px] font-mono tracking-widest text-[#783D4C] uppercase font-bold flex items-center gap-2">
            <span>ABOUT & ACADEMICS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#354354]">
            Curious about how intelligent systems work<span className="text-[#783D4C]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B7D] max-w-2xl leading-relaxed">
            Bridging foundational computer science rigor with hands-on AI research and production-ready software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Narrative Introduction & Engineering Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-white border border-[#D5E2F0] shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#783D4C] font-bold pb-2 border-b border-[#D5E2F0]">
                <BookOpen className="w-4 h-4 text-[#783D4C]" />
                <span>TECHNICAL PHILOSOPHY</span>
              </div>
              
              <p className="text-sm sm:text-base text-[#354354] leading-relaxed">
                {PORTFOLIO_DATA.personal.aboutIntro}
              </p>

              <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
                I'm drawn to problems where machine learning meets structured reasoning: grounding LLM outputs in knowledge graphs and retrieval, and evaluating them honestly.
              </p>

              <div className="pt-2 border-t border-[#D5E2F0] grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#EEF4FA] border border-[#D5E2F0]">
                  <span className="text-[10px] text-[#5C6B7D] block">FOCUS</span>
                  <span className="text-[#783D4C] font-bold">Graph RAG & LLMs</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#EEF4FA] border border-[#D5E2F0]">
                  <span className="text-[10px] text-[#5C6B7D] block">OBJECTIVE</span>
                  <span className="text-[#354354] font-bold">2027 AI/ML Internships</span>
                </div>
              </div>
            </div>

            {/* Core Competencies Box */}
            <div className="p-6 rounded-2xl bg-[#EEF4FA] border border-[#D5E2F0] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#783D4C] font-bold">
                <Terminal className="w-4 h-4" />
                <span>CORE ENGINEERING HABITS</span>
              </div>
              <ul className="space-y-2 text-xs text-[#5C6B7D]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#783D4C] shrink-0 mt-0.5" />
                  <span>Documenting projects with clear limitations and next steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#783D4C] shrink-0 mt-0.5" />
                  <span>Reporting metrics with the data they were measured on</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Academic Credentials & Certifications */}
          <div className="lg:col-span-7 space-y-6">
            {/* Education Block */}
            <div className="p-7 rounded-2xl bg-white border border-[#D5E2F0] space-y-6 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#783D4C]" />
                    <span className="text-[10px] font-mono text-[#783D4C] uppercase tracking-wider font-bold">
                      DEGREE PROGRAM
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#354354]">
                    {PORTFOLIO_DATA.education.institution}
                  </h3>
                  <p className="text-sm text-[#5C6B7D]">
                    {PORTFOLIO_DATA.education.degree}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#5C6B7D] block">{PORTFOLIO_DATA.education.period}</span>
                  <span className="text-xs font-mono text-[#783D4C] block mt-0.5 font-bold">
                    Exp. {PORTFOLIO_DATA.education.expectedGraduation}
                  </span>
                </div>
              </div>

              {/* Three-Column Academic Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#D5E2F0]">
                {PORTFOLIO_DATA.education.academicRecords.map((rec) => (
                  <div key={rec.label} className="p-3.5 rounded-xl bg-[#EEF4FA] border border-[#D5E2F0] text-center">
                    <span className="text-[10px] font-mono text-[#5C6B7D] block mb-1 uppercase font-semibold">
                      {rec.label}
                    </span>
                    <span className="text-lg sm:text-xl font-mono font-extrabold text-[#783D4C] tabular-nums block">
                      {rec.value}
                    </span>
                    <span className="text-[10px] text-[#5C6B7D] block mt-0.5">{rec.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Block */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#354354] uppercase tracking-wider flex items-center gap-2 font-bold">
                <Award className="w-4 h-4 text-[#783D4C]" />
                <span>Certifications</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certifications.map((cert) => (
                  <div key={cert.title} className="p-4 rounded-xl bg-white border border-[#D5E2F0] space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#783D4C] font-bold">{cert.issuer}</span>
                      <span className="text-[#5C6B7D]">{cert.year}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#354354]">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-[#5C6B7D] leading-relaxed">
                      {cert.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
