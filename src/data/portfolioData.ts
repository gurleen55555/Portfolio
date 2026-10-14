export interface Project {
  id: string;
  number: string;
  name: string;
  role: string;
  date: string;
  status?: string;
  description: string;
  problem: string;
  approach: string;
  architecture: string;
  technologies: string[];
  keyFeatures: string[];
  evidenceAndMetrics: string[];
  limitationsAndNextSteps: string[];
  repository: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'leadership' | 'operations' | 'community' | 'recognition';
  description: string;
  highlights: string[];
}

export interface Recognition {
  title: string;
  context: string;
  type: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Gurleen Kaur Bhatia",
    monogram: "GKB",
    eyebrow: "COMPUTER SCIENCE · AI ENGINEERING",
    tagline: "Building intelligent solutions.",
    heroSummary: "I build AI systems and software that turn complex problems into practical solutions.",
    institutionLine: "NIT Agartala · Computer Science & Engineering",
    aboutIntro: "I’m Gurleen Kaur Bhatia, a Computer Science undergraduate at NIT Agartala. I’m interested in AI engineering, software development, algorithms, and building systems that make complex information more useful. I enjoy exploring ideas from implementation through evaluation, with a focus on understanding how things work beneath the interface.",
    email: "khushibhatia5555@gmail.com",
    github: "https://github.com/gurleen55555",
    linkedin: "https://linkedin.com/in/gurleen-kaur-bhatia-907b23293",
    leetcode: "https://leetcode.com/u/G8ThpK5j53",
    resumePath: "/resume/Gurleen_Kaur_Bhatia_Resume.pdf",
    defaultPhotoPath: "/gurleen-portrait.jpg",
  },
  education: {
    institution: "National Institute of Technology Agartala",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2025 – 2029",
    expectedGraduation: "2029",
    cgpa: "9.28 / 10",
    academicRecords: [
      { label: "Undergraduate CGPA", value: "9.28 / 10", note: "Scale of 10" },
      { label: "Senior Secondary (Class XII)", value: "95%", note: "Board Examinations" },
      { label: "Secondary (Class X)", value: "97%", note: "Board Examinations" }
    ]
  },
  certifications: [
    {
      title: "Introduction to Machine Learning",
      issuer: "AWS Educate",
      year: "2026",
      summary: "Foundational ML models, evaluation metrics, supervised and unsupervised learning pipelines."
    },
    {
      title: "Introduction to Generative AI",
      issuer: "AWS Educate",
      year: "2026",
      summary: "Foundations of large language models, transformer mechanisms, prompt structures, and generative paradigms."
    }
  ],
  projects: [
    {
      id: "zentro-ai",
      number: "01",
      name: "Zentro AI",
      role: "Full-Stack AI Developer",
      date: "May 2026",
      description: "A multi-agent business operating system designed to connect company knowledge with explainable, decision-oriented intelligence.",
      problem: "Enterprises face critical blind spots because organizational context and operational risk signals remain trapped across siloed communication channels, meeting notes, and disjointed records.",
      approach: "Built a collaborative multi-agent architecture grounded on a centralized Company Brain ontology. Decoupled specialized reasoning agents from shared enterprise state to ensure citation traceability and verifiable outputs.",
      architecture: "Deterministic knowledge graph traversal coupled with LLM reasoning agents. Each agent query evaluates context from the ontology, generates step-by-step reasoning chains, and validates invariant rules before finalizing conclusions.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Knowledge Graphs", "Multi-Agent Systems"],
      keyFeatures: [
        "Specialized agents for reasoning, executive insights, lead intelligence, revenue risk, and meeting intelligence.",
        "Company Brain knowledge graph uniting cross-departmental entities.",
        "Citation-backed answers and step-level confidence indicators.",
        "Explainable reasoning paths and an explicit ontology structure."
      ],
      evidenceAndMetrics: [
        "Submitted to Microsoft Agents League 2026 in the Reasoning Agents track.",
        "5 autonomous domain agents coordinated over a unified semantic graph.",
        "End-to-end citation provenance linking agent conclusions to source nodes."
      ],
      limitationsAndNextSteps: [
        "Currently scoped to structured enterprise ontology schemas; next phase explores dynamic real-time graph updates from live video meeting transcripts."
      ],
      repository: "https://github.com/gurleen55555/zentro-ai-league"
    },
    {
      id: "astragrid-ai",
      number: "02",
      name: "AstraGrid AI",
      role: "AI Engineer — LLM and RAG",
      date: "July 2026",
      description: "An offline predictive copilot designed for secure, air-gapped environments, combining local language-model assistance with telemetry-based anomaly and failure prediction.",
      problem: "Mission-critical aerospace installations operate under strict zero-exfiltration air-gap protocols that prohibit connections to external cloud AI APIs, demanding completely offline assistance.",
      approach: "Engineered a dual-stage architecture combining local quantized language model inference (Phi-3 Mini via Ollama) with an LSTM anomaly detection network trained on synthetic telemetry data.",
      architecture: "3-tier pipeline: Telemetry Stream Analysis → Dual-Layer LSTM Anomaly Scorer → Local Copilot RAG Runbook Engine. Anomaly flags automatically trigger vector retrieval over offline technical recovery runbooks.",
      technologies: ["Python", "Streamlit", "TensorFlow/Keras", "LSTM", "scikit-learn", "Ollama", "Phi-3 Mini", "RAG"],
      keyFeatures: [
        "Local Phi-3 Mini inference requiring zero external internet access.",
        "Retrieval-grounded operational runbook assistance embedded in local vector index.",
        "LSTM-based anomaly prediction model trained on 2,000 synthetic telemetry records.",
        "Reported project metrics: 85.93% accuracy, 0.85 macro F1, and 0.97 failure recall (project-reported results on synthetic data)."
      ],
      evidenceAndMetrics: [
        "Built with a three-member team for Bharatiya Antariksh Hackathon 2026.",
        "Reported project metrics: 85.93% accuracy, 0.85 macro F1, 0.97 failure recall.",
        "Note: Metrics represent project-reported findings on synthetic telemetry; synthetic evaluation does not establish real-world operational reliability."
      ],
      limitationsAndNextSteps: [
        "Validation conducted on 2,000 synthetic records. Future work focuses on evaluating the pipeline on hardware-in-the-loop sensor telemetry under physical noise."
      ],
      repository: "https://github.com/gurleen55555/AirGappedCopilot"
    },
    {
      id: "traffic-qpso",
      number: "03",
      name: "Quantum-Inspired Traffic Optimization",
      role: "AI/ML and Optimization Engineer",
      date: "September 2026 – Present",
      status: "In Progress",
      description: "A routing optimization project exploring quantum-behaved particle swarm optimization for road networks under changing traffic conditions.",
      problem: "Dynamic urban route scheduling under sudden disruptions (lane blocks, peak congestion, traffic accidents) causes traditional deterministic search algorithms to suffer combinatorial slowdowns.",
      approach: "Developing a Quantum-Behaved Particle Swarm Optimization (QPSO) framework modeled on urban road networks using OSMnx and NetworkX, testing swarm convergence under dynamic cost surfaces.",
      architecture: "Graph topology representation (600+ nodes) with dynamic edge weights. Swarm particles update positions using quantum state wave equations rather than classical velocity vectors to prevent premature local minima trapping.",
      technologies: ["Python", "NumPy", "QPSO", "NetworkX", "OSMnx", "Metaheuristic Optimization"],
      keyFeatures: [
        "Routing experiments conducted on an urban road graph with 600+ nodes.",
        "Scenario modeling involving five simultaneous delivery vehicles and eight destination targets.",
        "Simulating normal traffic, rush-hour volume, and dynamic accident disruption conditions.",
        "Planned and ongoing benchmarking against Dijkstra, A*, genetic algorithms, and ant colony optimization across 30 runs per algorithm."
      ],
      evidenceAndMetrics: [
        "Completed road graph extraction and base QPSO routing formulation.",
        "Active benchmarking in progress across 30 trials per algorithm.",
        "Note: Work is actively in progress; benchmark metrics and comparative convergence performance are ongoing experiments."
      ],
      limitationsAndNextSteps: [
        "Currently benchmarking convergence time and path optimality against classical heuristic baselines; finalizing multi-objective Pareto penalty functions."
      ],
      repository: "https://github.com/rudrakshsharma1312-gif/Sih-new-login"
    }
  ] as Project[],
  skillGroups: [
    {
      group: "Languages",
      skills: ["Python", "Java", "C", "SQL", "TypeScript", "Swift"]
    },
    {
      group: "AI and Machine Learning",
      skills: [
        "Machine Learning",
        "Deep Learning",
        "Generative AI",
        "LLMs",
        "RAG",
        "LSTM",
        "Embeddings",
        "Semantic Search",
        "Knowledge Graphs"
      ]
    },
    {
      group: "Frameworks and Libraries",
      skills: [
        "TensorFlow/Keras",
        "PyTorch",
        "scikit-learn",
        "Pandas",
        "NumPy",
        "NetworkX",
        "OSMnx",
        "Next.js",
        "React",
        "Streamlit",
        "Ollama"
      ]
    },
    {
      group: "Data and Developer Tools",
      skills: ["PostgreSQL", "MySQL", "Supabase", "Git", "GitHub", "VS Code", "Jupyter"]
    },
    {
      group: "Algorithms and CS Fundamentals",
      skills: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
        "QPSO",
        "Metaheuristics",
        "Dijkstra",
        "A*",
        "Genetic Algorithms",
        "Ant Colony Optimization"
      ]
    }
  ],
  experiences: [
    {
      id: "google-ambassador",
      role: "Google Student Ambassador",
      organization: "Google",
      location: "NIT Agartala",
      period: "May 2026 – Present",
      type: "leadership",
      description: "Serving as campus liaison supporting student technology initiatives and peer learning.",
      highlights: [
        "Engaging with the campus student developer community around modern software engineering and responsible AI practices.",
        "Organizing technical awareness sessions and facilitating collaborative peer learning for undergraduate students.",
        "Representing student engineering interests and sharing developer resources from Google developer programs."
      ]
    },
    {
      id: "levitate-labs",
      role: "Tech Operations Assistant",
      organization: "Levitate Labs",
      location: "Remote",
      period: "May 2026 – Present",
      type: "operations",
      description: "Technical operations, CRM workflow automation, and backend systems maintenance.",
      highlights: [
        "Assisting in technical operations, system automation, and cross-team workflows involving databases and APIs.",
        "Contributed to internal CRM optimizations with a reported estimate of 40% improvement in sales workflow efficiency.",
        "Documenting standard operating procedures and verifying data hygiene routines across distributed technical teams."
      ]
    },
    {
      id: "dsai-club",
      role: "Core Member",
      organization: "DSAI Club, NIT Agartala",
      location: "NIT Agartala",
      period: "2025 – Present",
      type: "community",
      description: "Active member contributing to campus AI/ML and data science study groups.",
      highlights: [
        "Participating in peer-to-peer technical learning sessions focused on algorithmic problem solving and ML foundations.",
        "Collaborating with club members on introductory data science workshops and hackathon preparations."
      ]
    },
    {
      id: "nari-udaan",
      role: "Technical Team Member",
      organization: "Nari Udaan",
      location: "India",
      period: "2025 – Present",
      type: "community",
      description: "Technical enablement and digital literacy initiatives supporting women in technology.",
      highlights: [
        "Supported digital skills and technical learning initiatives with an approximate reported reach of 100 girls.",
        "Assisted in technical coordination for community outreach workshops."
      ]
    }
  ] as Experience[],
  recognitions: [
    {
      title: "Smart India Hackathon 2026",
      context: "College Internal Round Qualifier",
      type: "Hackathon"
    },
    {
      title: "Best Delegate",
      context: "KACE-IX Model United Nations",
      type: "Conference"
    },
    {
      title: "Verbal Mention",
      context: "NITA-MUN",
      type: "Conference"
    },
    {
      title: "Community Member",
      context: "Rewriting the Code (Global Community)",
      type: "Professional Community"
    }
  ] as Recognition[]
};
