const fs = require('fs');
const path = require('path');

function createSimplePDF() {
  const lines = [
    'BT',
    '/F1 16 Tf',
    '50 740 Td',
    '(GURLEEN KAUR BHATIA) Tj',
    '/F1 10 Tf',
    '0 -20 Td',
    '(National Institute of Technology Agartala - B.Tech CSE 2025-2029) Tj',
    '0 -15 Td',
    '(CGPA: 9.28 / 10 | Class XII: 95% | Class X: 97%) Tj',
    '0 -15 Td',
    '(Email: khushibhatia5555@gmail.com | GitHub: https://github.com/gurleen55555) Tj',
    '0 -15 Td',
    '(LinkedIn: https://linkedin.com/in/gurleen-kaur-bhatia-907b23293) Tj',
    '0 -25 Td',
    '/F1 12 Tf',
    '(SELECTED PROJECTS) Tj',
    '/F1 9 Tf',
    '0 -16 Td',
    '(1. Zentro AI - Multi-Agent Business Operating System (May 2026)) Tj',
    '0 -13 Td',
    '(- Company Brain knowledge graph, deterministic ontology, explainable reasoning paths.) Tj',
    '0 -13 Td',
    '(- Stack: Next.js, React, TypeScript, Tailwind CSS, Supabase, Knowledge Graphs) Tj',
    '0 -18 Td',
    '(2. AstraGrid AI - Air-Gapped Local LLM & Telemetry (May 2026)) Tj',
    '0 -13 Td',
    '(- Edge incident runbook synthesis with local LLMs, strict zero-leakage compliance.) Tj',
    '0 -13 Td',
    '(- Stack: Python, Local LLMs, Ollama, React, TypeScript, Tailwind CSS) Tj',
    '0 -18 Td',
    '(3. Quantum-Inspired Traffic Optimization - QPSO (Feb 2026 - Present)) Tj',
    '0 -13 Td',
    '(- 600+ node urban network route optimization with quantum-behaved particle swarm.) Tj',
    '0 -13 Td',
    '(- Stack: Python, NetworkX, NumPy, SciPy, Matplotlib, Streamlit) Tj',
    '0 -25 Td',
    '/F1 12 Tf',
    '(EXPERIENCE & LEADERSHIP) Tj',
    '/F1 9 Tf',
    '0 -16 Td',
    '(- Google Student Ambassador | Google (May 2026 - Present)) Tj',
    '0 -13 Td',
    '(- Technical Operations Assistant | Levitate Labs (May 2026 - Present)) Tj',
    '0 -25 Td',
    '/F1 12 Tf',
    '(EDUCATION & CERTIFICATIONS) Tj',
    '/F1 9 Tf',
    '0 -16 Td',
    '(- B.Tech in Computer Science and Engineering, NIT Agartala (CGPA: 9.28/10)) Tj',
    '0 -13 Td',
    '(- AWS Educate: Introduction to Machine Learning (2026)) Tj',
    '0 -13 Td',
    '(- AWS Educate: Introduction to Generative AI (2026)) Tj',
    'ET'
  ];

  const content = lines.join('\n');
  const streamLength = Buffer.byteLength(content, 'utf-8');

  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n';
  const obj4 = '4 0 obj\n<< /Length ' + streamLength + ' >>\nstream\n' + content + '\nendstream\nendobj\n';
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n';

  const objects = [obj1, obj2, obj3, obj4, obj5];
  let pdf = '%PDF-1.4\n';
  const offsets = [];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, 'utf-8'));
    pdf += objects[i];
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf-8');
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let i = 0; i < offsets.length; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xrefOffset + '\n%%EOF\n';
  const fullPdf = pdf + xref + trailer;

  const targetDir = path.resolve('public/resume');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetPath = path.join(targetDir, 'Gurleen_Kaur_Bhatia_Resume.pdf');
  fs.writeFileSync(targetPath, fullPdf, 'utf-8');
  console.log('PDF written successfully to', targetPath, 'size:', Buffer.byteLength(fullPdf, 'utf-8'));
}

createSimplePDF();
