import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  Code2
} from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onOpenResume: () => void;
  customPhotoSrc: string | null;
  onPhotoSelected: (file: File) => void;
  onResetPhoto: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onOpenResume,
  customPhotoSrc,
  onPhotoSelected,
  onResetPhoto,
}) => {
  // Animation entrance sequence states: 0 = start, 1 = name, 2 = portrait, 3 = bio & tags, 4 = settled
  const [animStep, setAnimStep] = useState<number>(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Core skill tags to display in hero
  const heroSkillTags = [
    'LLMs & RAG',
    'Knowledge Graphs',
    'Distributed Systems',
    'Metaheuristic Optimization',
    'Python & TypeScript',
    'Full-Stack Architecture'
  ];

  // Coordinated entrance choreography on load
  const runEntranceAnimation = useCallback(() => {
    setAnimStep(0);
    const t1 = setTimeout(() => setAnimStep(1), 80);   // Eyebrow & background nodes
    const t2 = setTimeout(() => setAnimStep(2), 320);  // Name forward with scale-and-perspective
    const t3 = setTimeout(() => setAnimStep(3), 650);  // Portrait upward & forward
    const t4 = setTimeout(() => setAnimStep(4), 1050); // Supporting text & skill tags
    const t5 = setTimeout(() => setAnimStep(5), 1400); // Fully settled with interactivity

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setAnimStep(5);
      return;
    }

    const cleanup = runEntranceAnimation();
    return cleanup;
  }, [runEntranceAnimation]);

  // Subtle interactive parallax / mouse depth on hero
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (animStep < 3) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setTilt({ rx: -y * 3.5, ry: x * 4.5 });
  }, [animStep]);

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const photoDisplayUrl = customPhotoSrc || PORTFOLIO_DATA.personal.defaultPhotoPath;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-center border-b border-[#D5E2F0] bg-[#FAF9F7] slate-grid-pattern overflow-hidden select-none"
    >
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND: Powder Blue Soft Atmosphere & Subtle Graph Elements     */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial ambient glow in Powder Blue */}
        <div className="absolute top-1/4 right-1/6 w-[560px] h-[560px] rounded-full bg-[#DCE7F4]/40 blur-[90px] animate-organic-blob" />
        <div className="absolute -bottom-20 left-1/10 w-[420px] h-[420px] rounded-full bg-[#DCE7F4]/30 blur-[100px]" />

        {/* Delicate Background Neural Network Connections (Restrained & Slate) */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-40 transition-opacity duration-1000"
          viewBox="0 0 1440 850" 
          fill="none"
        >
          {/* Subtle neural links around right hero in Slate */}
          <g stroke="#354354" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.18">
            <line x1="880" y1="220" x2="1040" y2="180" />
            <line x1="1040" y1="180" x2="1220" y2="260" />
            <line x1="1040" y1="180" x2="1080" y2="380" />
            <line x1="1080" y1="380" x2="1280" y2="420" />
            <line x1="880" y1="480" x2="1040" y2="540" />
            <line x1="1040" y1="540" x2="1220" y2="600" />
            <line x1="1080" y1="380" x2="1040" y2="540" />
          </g>

          {/* Delicate nodes */}
          <g fill="#783D4C" className="animate-delicate-pulse">
            <circle cx="880" cy="220" r="2.5" opacity="0.4" />
            <circle cx="1040" cy="180" r="3.5" opacity="0.6" />
            <circle cx="1220" cy="260" r="2.5" opacity="0.4" />
            <circle cx="1080" cy="380" r="3" opacity="0.5" />
            <circle cx="1280" cy="420" r="2.5" opacity="0.4" />
            <circle cx="880" cy="480" r="2.5" opacity="0.4" />
            <circle cx="1040" cy="540" r="3.5" opacity="0.6" />
            <circle cx="1220" cy="600" r="2.5" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN TWO-COLUMN HERO COMPOSITION                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 lg:py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ============================================================== */}
          {/* LEFT SIDE: Name, Headline, Bio, Skills, CTAs, Socials           */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Author Identity & Eyebrow */}
            <div className="space-y-2">
              <div 
                className={`text-[12px] font-mono tracking-widest text-[#783D4C] uppercase font-bold flex items-center gap-2 transition-all duration-700 delay-100 ${
                  animStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <span>COMPUTER SCIENCE · AI & SOFTWARE ENGINEERING</span>
                <span className="text-[#D5E2F0] font-normal">|</span>
                <span className="text-[#5C6B7D] text-[11px] font-normal">NIT AGARTALA</span>
              </div>

              {/* Noticeable Scale-and-Perspective Dimensional Name Reveal */}
              <div
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: `rotateX(${tilt.rx * 0.8}deg) rotateY(${tilt.ry * 0.8}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <h1 
                  className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#354354] leading-[1.06] [text-wrap:balance] text-editorial-depth transition-all duration-1000 ease-out ${
                    animStep >= 2
                      ? 'scale-100 opacity-100 translate-z-[20px] blur-0'
                      : 'scale-90 opacity-0 -translate-z-[120px] blur-[2px]'
                  }`}
                  style={{
                    letterSpacing: animStep >= 2 ? '-0.02em' : '0.04em',
                  }}
                >
                  Gurleen Kaur Bhatia
                </h1>
              </div>

              {/* “Building intelligent solutions” Headline */}
              <div 
                className={`pt-1 transition-all duration-700 delay-200 ${
                  animStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                <p className="text-xl sm:text-2xl font-serif italic text-[#783D4C] font-semibold">
                  Building intelligent solutions.
                </p>
              </div>
            </div>

            {/* Supporting Editorial Summary */}
            <p 
              className={`text-base sm:text-lg text-[#5C6B7D] leading-relaxed max-w-xl font-normal transition-all duration-700 delay-300 ${
                animStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              Computer Science & Engineering undergraduate at the National Institute of Technology Agartala. 
              Engineering scalable AI architectures, graph-grounded LLM systems, and high-performance software 
              with verifiable evaluation benchmarks.
            </p>

            {/* Staggered Skill Tags Sequence */}
            <div 
              className={`pt-1 flex flex-wrap gap-2 transition-all duration-700 delay-350 ${
                animStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {heroSkillTags.map((tag, idx) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-mono text-[#354354] bg-white border border-[#D5E2F0] rounded-md font-medium shadow-2xs hover:border-[#783D4C]/50 hover:text-[#783D4C] transition-colors"
                  style={{ transitionDelay: `${400 + idx * 40}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Call to Action Buttons + Working Social Links */}
            <div 
              className={`pt-2 flex flex-wrap items-center gap-3 sm:gap-4 transition-all duration-700 delay-400 ${
                animStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <button
                onClick={onExploreWork}
                className="px-5 py-2.5 text-xs font-mono text-white bg-[#783D4C] hover:bg-[#622F3D] transition-all rounded-md cursor-pointer font-semibold flex items-center gap-2 group active:scale-98 shadow-sm"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={handleContactClick}
                className="px-4 py-2.5 text-xs font-mono text-[#354354] hover:text-[#783D4C] bg-white hover:bg-[#EEF4FA] border border-[#D5E2F0] hover:border-[#783D4C]/40 transition-all rounded-md cursor-pointer font-medium flex items-center gap-2 active:scale-98 shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#783D4C]" />
                <span>Contact</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-3.5 py-2.5 text-xs font-mono text-[#5C6B7D] hover:text-[#783D4C] transition-colors cursor-pointer flex items-center gap-1.5 group active:scale-98 font-medium"
              >
                <span>Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#5C6B7D] group-hover:text-[#783D4C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Direct Social Links (GitHub, LinkedIn, LeetCode) */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#D5E2F0]">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-[#5C6B7D] hover:text-[#783D4C] hover:bg-white border border-transparent hover:border-[#D5E2F0] transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-[#5C6B7D] hover:text-[#783D4C] hover:bg-white border border-transparent hover:border-[#D5E2F0] transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-[#5C6B7D] hover:text-[#783D4C] hover:bg-white border border-transparent hover:border-[#D5E2F0] transition-colors"
                  aria-label="LeetCode Profile"
                  title="LeetCode Profile"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Academic Credential Line */}
            <div 
              className={`pt-4 border-t border-[#D5E2F0] text-xs font-mono text-[#5C6B7D] flex items-center transition-all duration-700 delay-450 ${
                animStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#783D4C]" />
                <span className="text-[#354354] font-medium">{PORTFOLIO_DATA.personal.institutionLine}</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT SIDE: BORDERLESS & DIMENSIONAL PORTRAIT INTEGRATION      */}
          {/* Absolutely NO card container, NO box border, NO caption strip  */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Main Dimensional Portrait Stage - Free Standing Silhouette */}
            <div 
              className={`relative w-full max-w-[420px] flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
                animStep >= 3 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transform: `rotateX(${-tilt.rx * 0.6}deg) rotateY(${-tilt.ry * 0.6}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 1. Ethereal Soft Powder-Blue Organic Backdrop Shape */}
              <div 
                className="absolute inset-0 -m-6 sm:-m-10 pointer-events-none z-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 500 560"
                  className="w-full h-full max-w-[460px] max-h-[520px] transition-transform duration-700 ease-out"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="powderBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DCE7F4" stopOpacity={0.85} />
                      <stop offset="50%" stopColor="#C9DCF0" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#EEF4FA" stopOpacity={0.3} />
                    </linearGradient>
                    <filter id="softOrganicGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="30" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Organic fluid silhouette aura behind the figure */}
                  <path
                    d="M 250 50 C 370 40, 470 120, 460 250 C 450 380, 390 490, 260 510 C 130 530, 40 430, 45 280 C 50 130, 130 60, 250 50 Z"
                    fill="url(#powderBlueGrad)"
                    filter="url(#softOrganicGlow)"
                    className="animate-organic-blob"
                  />
                </svg>
              </div>

              {/* 2. Completely Borderless Portrait - Stands Directly on Canvas */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <div 
                  className="relative w-full max-w-[380px] aspect-[4/5] flex items-end justify-center mask-blend-bottom"
                  style={{
                    filter: 'drop-shadow(0 20px 32px rgba(120, 61, 76, 0.12)) drop-shadow(0 4px 12px rgba(53, 67, 84, 0.08))',
                  }}
                >
                  <img
                    src={photoDisplayUrl}
                    alt="Gurleen Kaur Bhatia - Software Engineer & AI Researcher"
                    className="w-full h-full object-contain object-bottom select-none pointer-events-none transition-transform duration-700 ease-out hover:scale-[1.02]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.endsWith('profile-transparent.svg')) {
                        target.src = '/images/profile-transparent.svg';
                      }
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
