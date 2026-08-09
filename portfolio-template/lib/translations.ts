export type Language = "en" | "fr";
export type Theme = "dark" | "light";

export interface TranslationSchema {
  nav: {
    hero: string;
    about: string;
    skills: string;
    flow: string;
    projects: string;
    timeline: string;
    contact: string;
  };
  sections: {
    heroTitle: string;
    heroSub: string;
    aboutTitle: string;
    aboutSub: string;
    skillsTitle: string;
    skillsSub: string;
    flowTitle: string;
    flowSub: string;
    projectsTitle: string;
    projectsSub: string;
    timelineTitle: string;
    timelineSub: string;
    contactTitle: string;
    contactSub: string;
    journeyProgress: string;
    location: string;
  };
  cta: {
    getInTouch: string;
    exploreEcosystem: string;
    directMail: string;
  };
  hero: {
    badge: string;
    role: string;
    bio: string;
    exploreWork: string;
    viewResume: string;
    stats: {
      experience: string;
      projects: string;
      certifications: string;
    };
  };
  about: {
    badge: string;
    heading: string;
    p1: string;
    p2: string;
    focus: string;
    focusItems: Array<{ title: string; desc: string }>;
    philosophy: string;
    quote: string;
  };
  skills: {
    badge: string;
    heading: string;
    subheading: string;
    domains: {
      frontend: string;
      backend: string;
      ai: string;
      devops: string;
    };
  };
  flow: {
    badge: string;
    heading: string;
    subheading: string;
    steps: Array<{ name: string; desc: string }>;
  };
  projects: {
    badge: string;
    heading: string;
    subheading: string;
    viewCode: string;
    liveDemo: string;
    items: Array<{ title: string; category: string; desc: string }>;
  };
  timeline: {
    badge: string;
    heading: string;
    subheading: string;
    milestones: Array<{ year: string; title: string; org: string; desc: string }>;
  };
  contact: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    cta: string;
    ctaButton: string;
    copyEmail: string;
    copied: string;
    footer: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      hero: "01 Hero",
      about: "02 About Me",
      skills: "03 Tech Stack",
      flow: "04 AI & Data Flow",
      projects: "05 Projects Showcase",
      timeline: "06 Timeline",
      contact: "07 Contact",
    },
    sections: {
      heroTitle: "Mahdi Djeridi",
      heroSub: "Full-Stack & AI Software Engineer",
      aboutTitle: "About Me",
      aboutSub: "Systems Optimizer & Architect",
      skillsTitle: "Tech Stack",
      skillsSub: "Full-Stack & AI Architecture",
      flowTitle: "AI & Data Flow",
      flowSub: "Real-Time Compute Pipelines",
      projectsTitle: "Featured Projects",
      projectsSub: "Alpha · Beta · Gamma Showcase",
      timelineTitle: "Career Timeline",
      timelineSub: "Engineering Milestones",
      contactTitle: "Let's Connect",
      contactSub: "Building Extraordinary Products",
      journeyProgress: "Journey Progress",
      location: "◈ Algiers, DZ",
    },
    cta: {
      getInTouch: "Get in Touch",
      exploreEcosystem: "Explore Ecosystem ↓",
      directMail: "Direct Mail →",
    },
    hero: {
      badge: "FULL-STACK & AI SOFTWARE ENGINEER",
      role: "AI Agent Architecture · Application Security · DevOps · High-Performance Systems",
      bio: "Crafting scalable autonomous agent pipelines, resilient cloud microservices, and immersive web experiences with modern precision engineering.",
      exploreWork: "Explore My Work",
      viewResume: "View Resume",
      stats: {
        experience: "Years Experience",
        projects: "Production Systems",
        certifications: "Pro Certifications",
      },
    },
    about: {
      badge: "CHAPTER 02 — ABOUT ME",
      heading: "Architecting Intelligent Systems & Scalable Codebases",
      p1: "I am a Full-Stack & AI Software Engineer based in Algiers, Algeria. Driven by complex systems and high-throughput software architectures, I specialize in building autonomous AI agents, enterprise web applications, and resilient cloud infrastructures.",
      p2: "With background spanning Next.js, NestJS, C# .NET, Python, and containerized DevOps workflows, I transform intricate engineering problems into high-performance, secure digital products.",
      focus: "ENGINEERING FOCUS",
      focusItems: [
        { title: "AI Agent Orchestration", desc: "Multi-agent workflows, LLM integration, function calling & vector storage." },
        { title: "Full-Stack Web Systems", desc: "Next.js 15, React 19, NestJS, TypeScript & scalable REST/GraphQL APIs." },
        { title: "Application Security", desc: "OWASP compliance, OAuth2/JWT auth, threat modeling & penetration defense." },
        { title: "DevOps & Cloud Automation", desc: "Docker, CI/CD pipelines, Kubernetes, monitoring & zero-downtime deploys." },
      ],
      philosophy: "PHILOSOPHY",
      quote: "Software shouldn't just run; it should perform with mathematical elegance, robust security, and intuitive design.",
    },
    skills: {
      badge: "CHAPTER 03 — TECH STACK",
      heading: "Core Engineering Matrix",
      subheading: "A comprehensive breakdown of technologies, frameworks, and cloud systems I deploy in production.",
      domains: {
        frontend: "Frontend & 3D Interactive",
        backend: "Backend & Systems Architecture",
        ai: "AI, ML & Autonomous Agents",
        devops: "DevOps, Security & Cloud",
      },
    },
    flow: {
      badge: "CHAPTER 04 — AI & DATA FLOW",
      heading: "Real-Time AI Compute Pipeline",
      subheading: "An interactive visualization of how data flows from user intent through neural compute to execution.",
      steps: [
        { name: "01 Ingestion & Context", desc: "Raw input vectorization & context window prep" },
        { name: "02 Neural Processing", desc: "Multi-agent routing, LLM reasoning & safety validation" },
        { name: "03 Memory & State", desc: "Vector DB retrieval & conversation state persistence" },
        { name: "04 Deterministic Output", desc: "Structured response generation & API execution" },
      ],
    },
    projects: {
      badge: "CHAPTER 05 — FEATURED PROJECTS",
      heading: "Production Systems Showcase",
      subheading: "Key engineering accomplishments across AI automation, security tooling, and web platforms.",
      viewCode: "View Code",
      liveDemo: "Live Demo",
      items: [
        {
          title: "Aura Bags — B2B Packaging Portal",
          category: "B2B E-Commerce & Industrial Web Platform",
          desc: "Industrial-grade B2B packaging & flour bag manufacturing portal with custom specs builder, material visualizer, and order tracking.",
        },
        {
          title: "NeuralFlow AI Agent Platform",
          category: "AI Architecture",
          desc: "Autonomous multi-agent orchestration framework for automated code synthesis, threat analysis, and automated workflows.",
        },
        {
          title: "SecureShield Enterprise Auth",
          category: "Application Security",
          desc: "High-security identity provider with zero-trust RBAC, multi-tenant isolation, and OAuth2/OIDC integration.",
        },
      ],
    },
    timeline: {
      badge: "CHAPTER 06 — CAREER TIMELINE",
      heading: "Engineering Journey & Milestones",
      subheading: "Key technical growth, certifications, and project deliveries.",
      milestones: [
        {
          year: "2024 - Present",
          title: "Lead AI & Full-Stack Engineer",
          org: "Autonomous Systems & Cloud Architecture",
          desc: "Architecting autonomous multi-agent pipelines, Next.js web applications, and enterprise microservices.",
        },
        {
          year: "2023 - 2024",
          title: "Senior Full-Stack Developer",
          org: "Web & Enterprise Solutions",
          desc: "Built scalable web backends with NestJS and C# .NET, implemented reactive frontend UIs, and managed CI/CD pipelines.",
        },
        {
          year: "2022 - 2023",
          title: "Software & Security Engineer",
          org: "Application Security & DevOps",
          desc: "Focused on penetration vulnerability audits, automated Docker deployment workflows, and API security fortification.",
        },
      ],
    },
    contact: {
      badge: "CHAPTER 07 — LET'S CONNECT",
      heading: "Ready to Create Something",
      headingHighlight: "Extraordinary?",
      subheading: "Whether you need an autonomous AI agent system, scalable full-stack web architecture, or DevOps automation — let's turn complex engineering into elegant reality.",
      cta: "Get in Touch →",
      ctaButton: "Get in Touch",
      copyEmail: "Copy Email",
      copied: "Copied!",
      footer: "MAHDI DJERIDI · ALGIERS, ALGERIA · djeridimahdi10@gmail.com",
    },
  },
  fr: {
    nav: {
      hero: "01 Accueil",
      about: "02 À Propos",
      skills: "03 Compétences",
      flow: "04 Flux IA & Données",
      projects: "05 Projets",
      timeline: "06 Parcours",
      contact: "07 Contact",
    },
    sections: {
      heroTitle: "Mahdi Djeridi",
      heroSub: "Ingénieur Full-Stack & Intelligence Artificielle",
      aboutTitle: "À Propos",
      aboutSub: "Architecte & Optimisateur de Systèmes",
      skillsTitle: "Technologies",
      skillsSub: "Architecture Full-Stack & IA",
      flowTitle: "Flux IA & Données",
      flowSub: "Pipelines de Calcul en Temps Réel",
      projectsTitle: "Projets Phares",
      projectsSub: "Vitrine Alpha · Beta · Gamma",
      timelineTitle: "Parcours Professionnel",
      timelineSub: "Jalons d'Ingénierie",
      contactTitle: "Me Contacter",
      contactSub: "Conception de Produits D'Exception",
      journeyProgress: "Progression du Parcours",
      location: "◈ Alger, Algérie",
    },
    cta: {
      getInTouch: "Me Contacter",
      exploreEcosystem: "Découvrir l'Écosystème ↓",
      directMail: "Mail Direct →",
    },
    hero: {
      badge: "INGÉNIEUR FULL-STACK & INTELLIGENCE ARTIFICIELLE",
      role: "Architecture d'Agents IA · Sécurité des Applications · DevOps · Systèmes Haute Performance",
      bio: "Conception de pipelines d'agents autonomes scalables, de microservices cloud résilients et d'expériences web immersives de haute précision.",
      exploreWork: "Explorer mes travaux",
      viewResume: "Voir mon CV",
      stats: {
        experience: "Années d'Expérience",
        projects: "Systèmes en Production",
        certifications: "Certifications Pro",
      },
    },
    about: {
      badge: "CHAPITRE 02 — À PROPOS",
      heading: "Architecte de Systèmes Intelligents & Codebases Scalables",
      p1: "Je suis un Ingénieur Full-Stack & IA basé à Alger, en Algérie. Passionné par les systèmes complexes et les architectures logicielles à haut débit, je me spécialise dans la création d'agents IA autonomes, d'applications web d'entreprise et d'infrastructures cloud résilientes.",
      p2: "Avec une expertise couvrant Next.js, NestJS, C# .NET, Python et les workflows DevOps conteneurisés, je transforme les défis d'ingénierie complexes en produits numériques performants et sécurisés.",
      focus: "DOMAINES D'EXPERTISE",
      focusItems: [
        { title: "Orchestration d'Agents IA", desc: "Workflows multi-agents, intégration LLM, appel de fonctions et stockage vectoriel." },
        { title: "Systèmes Web Full-Stack", desc: "Next.js 15, React 19, NestJS, TypeScript et API REST/GraphQL scalables." },
        { title: "Sécurité Applicative", desc: "Conformité OWASP, authentification OAuth2/JWT, modélisation des menaces et défense." },
        { title: "DevOps & Cloud Automation", desc: "Docker, pipelines CI/CD, Kubernetes, monitoring et déploiements sans interruption." },
      ],
      philosophy: "PHILOSOPHIE",
      quote: "Un logiciel ne doit pas seulement fonctionner ; il doit performer avec une élégance mathématique, une sécurité solide et un design intuitif.",
    },
    skills: {
      badge: "CHAPITRE 03 — TECHNOLOGIES",
      heading: "Matrice de Compétences Techniques",
      subheading: "Une vue d'ensemble détaillée des technologies, frameworks et systèmes cloud déployés en production.",
      domains: {
        frontend: "Frontend & Interactif 3D",
        backend: "Backend & Architecture Systèmes",
        ai: "IA, Machine Learning & Agents",
        devops: "DevOps, Sécurité & Cloud",
      },
    },
    flow: {
      badge: "CHAPITRE 04 — FLUX IA & DONNÉES",
      heading: "Pipeline de Calcul IA Temps Réel",
      subheading: "Visualisation interactive du flux de données, de l'intention utilisateur au traitement neuronal et à l'exécution.",
      steps: [
        { name: "01 Ingestion & Contexte", desc: "Vectorisation de l'entrée et préparation de la fenêtre de contexte" },
        { name: "02 Traitement Neuronal", desc: "Routage multi-agents, raisonnement LLM & validation de sécurité" },
        { name: "03 Mémoire & État", desc: "Recherche en base vectorielle & persistance de l'état de conversation" },
        { name: "04 Sortie Déterministe", desc: "Génération de réponse structurée & exécution d'API" },
      ],
    },
    projects: {
      badge: "CHAPITRE 05 — PROJETS PHARES",
      heading: "Vitrine des Projets en Production",
      subheading: "Réalisations d'ingénierie majeures en automatisation IA, outils de sécurité et plateformes web.",
      viewCode: "Voir le Code",
      liveDemo: "Démo en Direct",
      items: [
        {
          title: "Aura Bags — Portail d'Emballage Industriel B2B",
          category: "E-Commerce B2B & Plateforme Web",
          desc: "Portail de fabrication de sacs industriels et d'emballage B2B avec configurateur sur-mesure, visualiseur de matériaux et suivi de commande.",
        },
        {
          title: "Plateforme d'Agents IA NeuralFlow",
          category: "Architecture IA",
          desc: "Framework d'orchestration multi-agents autonome pour la synthèse de code, l'analyse de menaces et l'automatisation de workflows.",
        },
        {
          title: "Authentification Enterprise SecureShield",
          category: "Sécurité Applicative",
          desc: "Fournisseur d'identité hautement sécurisé avec RBAC Zero-Trust, isolation multi-tenant et intégration OAuth2/OIDC.",
        },
      ],
    },
    timeline: {
      badge: "CHAPITRE 06 — PARCOURS PROFESSIONNEL",
      heading: "Parcours d'Ingénierie & Jalons",
      subheading: "Évolution technique, certifications professionnelles et livraison de projets d'envergure.",
      milestones: [
        {
          year: "2024 - Présent",
          title: "Lead Ingénieur IA & Full-Stack",
          org: "Systèmes Autonomes & Architecture Cloud",
          desc: "Conception de pipelines multi-agents autonomes, d'applications web Next.js et de microservices d'entreprise.",
        },
        {
          year: "2023 - 2024",
          title: "Développeur Full-Stack Senior",
          org: "Solutions Web & Entreprise",
          desc: "Développement de backends scalables en NestJS et C# .NET, création d'interfaces réactives et gestion de pipelines CI/CD.",
        },
        {
          year: "2022 - 2023",
          title: "Ingénieur Logiciel & Sécurité",
          org: "Sécurité Applicative & DevOps",
          desc: "Audit de vulnérabilités, automatisation des déploiements Docker et renforcement de la sécurité des API.",
        },
      ],
    },
    contact: {
      badge: "CHAPITRE 07 — ME CONTACTER",
      heading: "Prêt à Créer Quelque Chose d'",
      headingHighlight: "Extraordinaire ?",
      subheading: "Que vous ayez besoin d'un système d'agents IA autonomes, d'une architecture web full-stack scalable ou de l'automatisation DevOps — concrétisons vos projets complexes.",
      cta: "Me Contacter →",
      ctaButton: "Me Contacter",
      copyEmail: "Copier l'Email",
      copied: "Copié !",
      footer: "MAHDI DJERIDI · ALGER, ALGÉRIE",
    },
  },
};

export type TranslationKeys = TranslationSchema;
