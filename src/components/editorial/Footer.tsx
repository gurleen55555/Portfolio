import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ArrowUp, Github, Linkedin, Code2, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#FAF9F7] py-12 text-xs font-mono text-[#5C6B7D] border-t border-[#D5E2F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#D5E2F0]">
          {/* Left Wordmark */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-wider text-[#354354]">
              GURLEEN KAUR BHATIA
            </span>
            <span className="text-[#D5E2F0]">/</span>
            <span className="text-[#5C6B7D]">AI Engineer & Software Developer</span>
          </div>

          {/* Center Social Links */}
          <div className="flex items-center gap-5">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C6B7D] hover:text-[#783D4C] transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C6B7D] hover:text-[#783D4C] transition-colors p-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C6B7D] hover:text-[#783D4C] transition-colors p-1"
              aria-label="LeetCode Profile"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-[#5C6B7D] hover:text-[#783D4C] transition-colors p-1"
              aria-label="Email Gurleen"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Right Action */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#5C6B7D] hover:text-[#783D4C] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#783D4C]" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#5C6B7D]/85">
          <p>© {new Date().getFullYear()} Gurleen Kaur Bhatia · National Institute of Technology Agartala.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
            <span>Burgundy, Powder Blue & Slate Editorial Portfolio.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
