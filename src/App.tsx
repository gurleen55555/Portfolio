import React, { useState, useEffect } from 'react';
import { Header } from './components/editorial/Header';
import { HeroSection } from './components/editorial/HeroSection';
import { WorkSection } from './components/editorial/WorkSection';
import { TechnicalFocusSection } from './components/editorial/TechnicalFocusSection';
import { ExperienceSection } from './components/editorial/ExperienceSection';
import { AboutEducationSection } from './components/editorial/AboutEducationSection';
import { ContactSection } from './components/editorial/ContactSection';
import { ResumeModal } from './components/editorial/ResumeModal';
import { Footer } from './components/editorial/Footer';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [customPhotoSrc, setCustomPhotoSrc] = useState<string | null>(null);

  // Restore saved photo from localStorage if available and sync to server disk
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gurleen_editorial_photo');
      if (saved) {
        setCustomPhotoSrc(saved);
        // Persist to public disk so production build & published deployments include it
        fetch('/api/sync-portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: saved }),
        }).catch(() => {
          // Ignore network errors in static production environments
        });
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const handlePhotoSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomPhotoSrc(result);
        try {
          localStorage.setItem('gurleen_editorial_photo', result);
        } catch {
          // Quota limit fallback
        }
        // Sync to server so production build has it
        fetch('/api/sync-portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: result }),
        }).catch(() => {});
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setCustomPhotoSrc(null);
    try {
      localStorage.removeItem('gurleen_editorial_photo');
    } catch {
      // Ignore
    }
  };

  const handleExploreWork = () => {
    const el = document.getElementById('work');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#354354] flex flex-col font-sans selection:bg-[#DCE7F4] selection:text-[#783D4C] antialiased">
      {/* Light Editorial Navigation */}
      <Header onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections with Alternating Rhythm */}
      <main className="flex-1">
        {/* First Viewport: Opening Hero with Dramatic Entrance & Borderless Portrait */}
        <HeroSection
          onExploreWork={handleExploreWork}
          onOpenResume={() => setResumeOpen(true)}
          customPhotoSrc={customPhotoSrc}
          onPhotoSelected={handlePhotoSelected}
          onResetPhoto={handleResetPhoto}
        />

        {/* Selected Work (Pure White background) */}
        <WorkSection />

        {/* Technical Focus (Soft Powder Blue light background #EEF4FA) */}
        <TechnicalFocusSection />

        {/* Experience & Leadership (Pure White background) */}
        <ExperienceSection />

        {/* About & Education (Neutral Canvas #FAF9F7 background) */}
        <AboutEducationSection />

        {/* Contact (Soft Powder Blue light background #EEF4FA) */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Printable/Viewable Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
