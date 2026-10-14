import React, { useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { X, Download, Printer, AlertCircle, Upload } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customPdfUrl, setCustomPdfUrl] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('Gurleen_Kaur_Bhatia_Resume.pdf');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCustomPdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setCustomPdfUrl(objectUrl);
      setPdfFileName(file.name);
    }
  };

  const downloadTarget = customPdfUrl || PORTFOLIO_DATA.personal.resumePath;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#354354]/45 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl my-8 bg-white border border-[#D5E2F0] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D5E2F0] bg-[#EEF4FA]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#783D4C] tracking-wider uppercase">
              CURRICULUM VITAE
            </span>
            <span className="text-[#D5E2F0]">/</span>
            <span className="text-xs font-mono text-[#5C6B7D] font-medium">GURLEEN KAUR BHATIA</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-mono text-[#5C6B7D] hover:text-[#354354] hover:bg-white border border-[#D5E2F0] rounded-lg transition-colors cursor-pointer hidden sm:flex items-center gap-1.5 font-medium"
            >
              <Printer className="w-3.5 h-3.5 text-[#783D4C]" />
              <span>Print / PDF</span>
            </button>

            <a
              href={downloadTarget}
              download={pdfFileName}
              className="px-4 py-1.5 text-xs font-mono font-semibold text-white bg-[#783D4C] hover:bg-[#622F3D] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-[#5C6B7D] hover:text-[#354354] hover:bg-[#D5E2F0]/50 rounded-lg transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informational Asset Note Banner */}
        <div className="px-6 py-2.5 bg-[#FAF9F7] border-b border-[#D5E2F0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C6B7D] font-mono">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#783D4C] shrink-0" />
            <span className="text-[11px]">
              Asset Path: <code className="text-[#783D4C] font-bold">/public/resume/Gurleen_Kaur_Bhatia_Resume.pdf</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCustomPdfUpload}
              accept=".pdf"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] text-[#783D4C] hover:text-[#622F3D] transition-colors flex items-center gap-1 underline cursor-pointer font-medium"
            >
              <Upload className="w-3 h-3 text-[#783D4C]" />
              <span>Load Local PDF File</span>
            </button>
          </div>
        </div>

        {/* Clean Printable CV Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white text-[#354354] font-sans selection:bg-[#EEF4FA]">
          {/* Header */}
          <div className="border-b border-[#D5E2F0] pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#354354]">
              GURLEEN KAUR BHATIA
            </h1>
            <p className="text-sm font-mono text-[#783D4C] mt-1 font-semibold">
              Computer Science & Engineering Undergraduate · National Institute of Technology Agartala
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#5C6B7D] mt-3">
              <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-[#783D4C] font-medium hover:underline">
                {PORTFOLIO_DATA.personal.email}
              </a>
              <span>·</span>
              <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="hover:text-[#354354]">
                github.com/gurleen55555
              </a>
              <span>·</span>
              <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#354354]">
                linkedin.com/in/gurleen-kaur-bhatia
              </a>
              <span>·</span>
              <a href={PORTFOLIO_DATA.personal.leetcode} target="_blank" rel="noreferrer" className="hover:text-[#354354]">
                leetcode.com/u/G8ThpK5j53
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-[#783D4C] uppercase tracking-wider font-bold">
              EDUCATION
            </h2>
            <div className="space-y-1 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-[#354354]">
                  National Institute of Technology Agartala
                </span>
                <span className="font-mono text-xs text-[#5C6B7D]">2022 – 2026 (Expected)</span>
              </div>
              <p className="text-xs text-[#5C6B7D]">
                Bachelor of Technology in Computer Science and Engineering
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#354354] pt-1">
                <span>Undergraduate CGPA: <strong className="text-[#783D4C]">9.28 / 10</strong></span>
                <span>·</span>
                <span>Class XII: <strong>95%</strong></span>
                <span>·</span>
                <span>Class X: <strong>97%</strong></span>
              </div>
            </div>
          </div>

          {/* Technical Focus */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-[#783D4C] uppercase tracking-wider font-bold">
              TECHNICAL PROFICIENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed text-[#5C6B7D]">
              <div className="p-3 rounded-lg bg-[#FAF9F7] border border-[#D5E2F0]">
                <strong className="text-[#354354] font-mono block mb-0.5">Languages:</strong>
                <span>Python, Java, C, SQL, TypeScript, Swift</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF9F7] border border-[#D5E2F0]">
                <strong className="text-[#354354] font-mono block mb-0.5">AI & Machine Learning:</strong>
                <span>Deep Learning, Generative AI, LLMs, RAG, LSTM, Embeddings, Knowledge Graphs</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF9F7] border border-[#D5E2F0]">
                <strong className="text-[#354354] font-mono block mb-0.5">Frameworks & Tools:</strong>
                <span>TensorFlow/Keras, PyTorch, scikit-learn, Pandas, NumPy, NetworkX, OSMnx, Next.js, Streamlit, Ollama</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF9F7] border border-[#D5E2F0]">
                <strong className="text-[#354354] font-mono block mb-0.5">Optimization & CS Core:</strong>
                <span>QPSO, Metaheuristics, Dijkstra, A*, Genetic Algorithms, Ant Colony Optimization, DSA, DBMS, OS, Networks</span>
              </div>
            </div>
          </div>

          {/* Selected Work */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-[#783D4C] uppercase tracking-wider font-bold">
              SELECTED PROJECTS
            </h2>
            <div className="space-y-4 text-xs">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="space-y-1 p-3.5 rounded-xl bg-[#FAF9F7] border border-[#D5E2F0]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-[#354354]">
                      {proj.name} — {proj.role}
                    </span>
                    <span className="font-mono text-[#5C6B7D]">{proj.date}</span>
                  </div>
                  <p className="text-[#5C6B7D] leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="text-[11px] font-mono text-[#783D4C] font-medium pt-1">
                    Stack: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Leadership */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-[#783D4C] uppercase tracking-wider font-bold">
              EXPERIENCE & LEADERSHIP
            </h2>
            <div className="space-y-3 text-xs">
              {PORTFOLIO_DATA.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1 p-3 rounded-xl bg-[#FAF9F7] border border-[#D5E2F0]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-[#354354]">
                      {exp.role} — {exp.organization}
                    </span>
                    <span className="font-mono text-[#5C6B7D]">{exp.period}</span>
                  </div>
                  <p className="text-[#5C6B7D]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Recognition */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-[#783D4C] uppercase tracking-wider font-bold">
              CERTIFICATIONS & RECOGNITION
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5C6B7D]">
              {PORTFOLIO_DATA.certifications.map((c) => (
                <div key={c.title} className="p-3 rounded-lg bg-[#FAF9F7] border border-[#D5E2F0]">
                  <strong className="text-[#354354] block font-semibold">{c.title}</strong>
                  <span className="text-[#783D4C] font-mono text-[11px]">{c.issuer} ({c.year})</span>
                </div>
              ))}
              {PORTFOLIO_DATA.recognitions.map((r) => (
                <div key={r.title} className="p-3 rounded-lg bg-[#FAF9F7] border border-[#D5E2F0]">
                  <strong className="text-[#354354] block font-semibold">{r.title}</strong>
                  <span className="text-[#5C6B7D]">{r.context}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
