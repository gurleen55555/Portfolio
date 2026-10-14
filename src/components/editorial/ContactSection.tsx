import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Mail, Github, Linkedin, Code2, ArrowUpRight, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    {
      label: 'Email',
      value: PORTFOLIO_DATA.personal.email,
      href: `mailto:${PORTFOLIO_DATA.personal.email}`,
      icon: <Mail className="w-4 h-4 text-[#783D4C]" />
    },
    {
      label: 'GitHub',
      value: 'github.com/gurleen55555',
      href: PORTFOLIO_DATA.personal.github,
      icon: <Github className="w-4 h-4 text-[#783D4C]" />
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/gurleen-kaur-bhatia',
      href: PORTFOLIO_DATA.personal.linkedin,
      icon: <Linkedin className="w-4 h-4 text-[#783D4C]" />
    },
    {
      label: 'LeetCode',
      value: 'leetcode.com/u/G8ThpK5j53',
      href: PORTFOLIO_DATA.personal.leetcode,
      icon: <Code2 className="w-4 h-4 text-[#783D4C]" />
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-20 lg:py-28 border-b border-[#D5E2F0] bg-[#EEF4FA] text-[#354354] scroll-mt-14 transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="text-[11px] font-mono tracking-widest text-[#783D4C] uppercase font-bold flex items-center gap-2">
            <span>COMMUNICATION</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#783D4C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#354354]">
            Have an interesting problem to solve<span className="text-[#783D4C]">?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5C6B7D] leading-relaxed">
            I’m interested in opportunities to learn, build, and contribute to thoughtful engineering teams working on software and AI.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactLinks.map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-2xl bg-white border border-[#D5E2F0] flex flex-col justify-between space-y-4 group transition-all hover:border-[#783D4C]/40 hover:shadow-md shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-[#EEF4FA] border border-[#D5E2F0]">
                  {item.icon}
                </div>
                <a
                  href={item.href}
                  target={item.label !== 'Email' ? '_blank' : undefined}
                  rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-[#5C6B7D] group-hover:text-[#783D4C] transition-colors p-1"
                  aria-label={`Open ${item.label}`}
                >
                  <ArrowUpRight className="w-4 h-4 text-[#783D4C]" />
                </a>
              </div>

              <div>
                <span className="text-xs font-mono text-[#5C6B7D] block mb-1">
                  {item.label}
                </span>
                <a
                  href={item.href}
                  target={item.label !== 'Email' ? '_blank' : undefined}
                  rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-sm font-bold text-[#354354] group-hover:text-[#783D4C] transition-colors truncate block"
                >
                  {item.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Copy Email Action */}
        <div className="mt-8 pt-6 border-t border-[#D5E2F0] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#5C6B7D]">
          <span>Primary Inbox: <strong className="text-[#354354]">{PORTFOLIO_DATA.personal.email}</strong></span>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D5E2F0] hover:border-[#783D4C] text-[#354354] hover:text-[#783D4C] transition-all cursor-pointer font-medium shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#783D4C]" />
                <span className="text-[#783D4C] font-semibold">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#783D4C]" />
                <span>Copy Email Address</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
