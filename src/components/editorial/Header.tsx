import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'skills', 'experience', 'about', 'contact'];
      const scrollY = window.scrollY;

      if (scrollY < 200) {
        setActiveSection('hero');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          if (scrollY >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F7]/92 backdrop-blur-md border-b border-[#D5E2F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Wordmark */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="text-sm font-mono font-bold tracking-wider text-[#354354] hover:text-[#783D4C] transition-colors flex items-center group cursor-pointer"
            aria-label="Gurleen Kaur Bhatia Home"
          >
            <span className="tracking-widest">GURLEEN KAUR BHATIA</span>
            <span className="text-[#783D4C] group-hover:scale-125 transition-transform inline-block ml-1 font-bold text-base">
              .
            </span>
          </a>

          {/* Right Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const targetId = link.href.substring(1);
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors py-1 relative cursor-pointer font-medium ${
                    isActive
                      ? 'text-[#783D4C] font-semibold'
                      : 'text-[#5C6B7D] hover:text-[#354354]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#783D4C] rounded-full transition-all" />
                  )}
                </a>
              );
            })}

            <span className="w-[1px] h-4 bg-[#D5E2F0]" />

            <button
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-md bg-[#783D4C] hover:bg-[#622F3D] text-white transition-colors cursor-pointer flex items-center gap-1.5 group active:scale-98 font-mono text-xs font-medium shadow-xs"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </nav>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#5C6B7D] hover:text-[#354354] focus:outline-none cursor-pointer rounded border border-[#D5E2F0] bg-white"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#783D4C]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#D5E2F0] px-5 py-4 space-y-3 font-mono text-xs animate-fade-in shadow-xl">
          {navLinks.map((link) => {
            const targetId = link.href.substring(1);
            const isActive = activeSection === targetId;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block py-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#783D4C] font-semibold pl-2 border-l-2 border-[#783D4C]'
                    : 'text-[#5C6B7D] hover:text-[#354354]'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="pt-3 border-t border-[#D5E2F0]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-[#783D4C] font-semibold hover:text-[#622F3D] transition-colors cursor-pointer flex items-center gap-1.5 py-1 w-full"
            >
              <span>View Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#783D4C]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
