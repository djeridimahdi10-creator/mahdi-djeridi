import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, BorderStyle, ShadingType,
  ImageRun, VerticalAlign, TableLayoutType, convertInchesToTwip, PageBreak,
  HeadingLevel
} from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pt = (n) => Math.round(n * 2); // docx uses half-points (1pt = 2 units)

// Palette definitions
const THEMES = {
  fullstack: {
    primary: "0F172A",
    secondary: "1E293B",
    accent: "2563EB",
    accentDark: "1D4ED8",
    muted: "475569",
    border: "E2E8F0",
    bgBox: "F8FAFC",
  },
  devops: {
    primary: "0F172A",
    secondary: "1E293B",
    accent: "0D9488",
    accentDark: "0F766E",
    muted: "475569",
    border: "CBD5E1",
    bgBox: "F0FDFA",
  },
};

function createSectionHeading(title, theme) {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: pt(11),
        color: theme.primary,
        font: "Arial",
      }),
    ],
    border: {
      bottom: {
        color: theme.accent,
        space: 4,
        style: BorderStyle.SINGLE,
        size: 12,
      },
    },
    spacing: { before: pt(10), after: pt(5) },
  });
}

function createBullet(title, desc, theme) {
  const children = [];
  if (title) {
    children.push(
      new TextRun({
        text: title + " ",
        bold: true,
        size: pt(9),
        color: theme.primary,
        font: "Arial",
      })
    );
  }
  children.push(
    new TextRun({
      text: desc,
      size: pt(9),
      color: theme.muted,
      font: "Arial",
    })
  );

  return new Paragraph({
    children,
    bullet: { level: 0 },
    spacing: { before: pt(2), after: pt(3), line: 260 },
  });
}

function createJobHeader(title, company, period, location, theme) {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: pt(10.5),
                    color: theme.primary,
                    font: "Arial",
                  }),
                ],
                spacing: { before: pt(0), after: pt(1) },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: company,
                    bold: true,
                    size: pt(9.5),
                    color: theme.accent,
                    font: "Arial",
                  }),
                ],
                spacing: { before: pt(0), after: pt(2) },
              }),
            ],
            width: { size: 68, type: WidthType.PERCENTAGE },
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: period,
                    bold: true,
                    size: pt(9),
                    color: theme.muted,
                    font: "Arial",
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { before: pt(0), after: pt(1) },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: location,
                    italics: true,
                    size: pt(8.5),
                    color: theme.muted,
                    font: "Arial",
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { before: pt(0), after: pt(2) },
              }),
            ],
            width: { size: 32, type: WidthType.PERCENTAGE },
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });
}

function createProjectEntry(name, tech, url, desc, theme, isFr = false) {
  const prefix = isFr ? "🌐 Lien direct : https://" : "🌐 Direct URL: https://";
  const children = [
    new Paragraph({
      children: [
        new TextRun({
          text: name,
          bold: true,
          size: pt(10),
          color: theme.primary,
          font: "Arial",
        }),
      ],
      spacing: { before: pt(5), after: pt(1) },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${prefix}${url}`,
          bold: true,
          size: pt(8.5),
          color: theme.accent,
          font: "Arial",
        }),
      ],
      spacing: { before: pt(0), after: pt(1) },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: tech,
          bold: true,
          size: pt(8.5),
          color: theme.accentDark,
          font: "Arial",
        }),
      ],
      spacing: { before: pt(0), after: pt(2) },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: desc,
          size: pt(9),
          color: theme.muted,
          font: "Arial",
        }),
      ],
      spacing: { before: pt(0), after: pt(4), line: 255 },
    }),
  ];
  return children;
}

function createHeaderTable(name, title, tagline, contacts, photoBuffer, theme) {
  let photoRun = null;
  if (photoBuffer) {
    photoRun = new ImageRun({
      data: photoBuffer,
      transformation: { width: 85, height: 85 },
      type: "jpg",
    });
  }

  const photoCell = new TableCell({
    children: [
      new Paragraph({
        children: photoRun ? [photoRun] : [],
        alignment: AlignmentType.CENTER,
      }),
    ],
    width: { size: 16, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  const infoCell = new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: name.toUpperCase(),
            bold: true,
            size: pt(19),
            color: theme.primary,
            font: "Arial",
          }),
        ],
        spacing: { before: pt(0), after: pt(1) },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: pt(9.5),
            color: theme.accent,
            font: "Arial",
          }),
        ],
        spacing: { before: pt(0), after: pt(2) },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: tagline,
            size: pt(8.5),
            color: theme.muted,
            font: "Arial",
          }),
        ],
        spacing: { before: pt(0), after: pt(0) },
      }),
    ],
    width: { size: 52, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  const contactParagraphs = contacts.map((c) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: c,
          size: pt(8.5),
          color: theme.muted,
          font: "Arial",
        }),
      ],
      alignment: AlignmentType.RIGHT,
      spacing: { before: pt(1), after: pt(1) },
    });
  });

  const contactCell = new TableCell({
    children: contactParagraphs,
    width: { size: 32, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  return new Table({
    rows: [new TableRow({ children: [photoCell, infoCell, contactCell] })],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: theme.primary },
      top: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
  });
}

function buildFullStackDocEN(photoBuffer) {
  const theme = THEMES.fullstack;
  const contacts = [
    "📍 Algiers, Algeria",
    "📞 +213 555 65 13 30",
    "✉️ djeridimahdi10@gmail.com",
    "🌐 mahdi-djeridi-eight.vercel.app",
    "💼 linkedin.com/in/mehdi-djeridi",
    "🐙 github.com/djeridimahdi10-creator",
  ];

  const header = createHeaderTable(
    "Mahdi Djeridi",
    "Full-Stack Developer · Software Engineer",
    "Next.js 15 · React 19 · Node.js · ASP.NET Core (.NET 8) · SQL Server · Docker & CI/CD",
    contacts,
    photoBuffer,
    theme
  );

  return new Document({
    creator: "Mahdi Djeridi",
    title: "Mahdi Djeridi — Full-Stack Developer CV",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.4),
              bottom: convertInchesToTwip(0.4),
              left: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          header,

          // PROFESSIONAL SUMMARY
          createSectionHeading("Professional Summary", theme),
          new Paragraph({
            children: [
              new TextRun({
                text: "Results-driven Full-Stack Developer with over 3 years of hands-on experience designing, developing, and scaling high-performance web applications, enterprise satellite systems, and mission-critical financial backends. Strong command of modern frontend ecosystems (Next.js 15, React 19, TypeScript) and enterprise backend frameworks (ASP.NET Core C# .NET 8, Node.js, NestJS) with deep expertise in SQL Server (T-SQL) query tuning, indexing, and execution plan optimization. Solid background in DevOps automation, including multi-stage Docker containerization, CI/CD pipeline implementation (Jenkins, GitHub Actions), and high-availability Data Center environments. Currently actively contributing to the new Core Banking System (Temenos) transition and CI/CD workflows at BNH.",
                size: pt(9),
                color: theme.muted,
                font: "Arial",
              }),
            ],
            spacing: { before: pt(2), after: pt(6), line: 260 },
          }),

          // TECHNICAL EXPERTISE
          createSectionHeading("Technical Expertise", theme),
          createBullet("Frontend Engineering:", "Next.js 15 (App Router, Server Components, SSR/SSG), React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, Three.js / WebGL, Framer Motion, Responsive Design Systems, Modular State.", theme),
          createBullet("Backend & Microservices:", "ASP.NET Core (C# .NET 8), Node.js, NestJS, Express.js, RESTful APIs, GraphQL, Microservices Architecture, Domain-Driven Design (DDD), Clean Architecture, WebSockets.", theme),
          createBullet("Databases & Optimization:", "SQL Server (T-SQL, complex stored procedures, query optimization, clustered/non-clustered indexing, execution plan analysis, deadlock elimination), PostgreSQL, Redis (Caching & Pub/Sub).", theme),
          createBullet("DevOps, CI/CD & Cloud:", "Docker, Docker Compose, CI/CD Pipelines (GitHub Actions, Jenkins), Portainer, Kubernetes & Nomad fundamentals, Linux Administration (Ubuntu/Debian), Nginx, Vercel Edge, Azure, Banking Data Center.", theme),
          createBullet("Security & Quality:", "OAuth2, OIDC, JWT RS256, RBAC authorization, OWASP Top 10 mitigation, Unit & E2E Testing (Playwright, Jest), ACID compliance.", theme),

          // PROFESSIONAL EXPERIENCE
          createSectionHeading("Professional Experience", theme),
          createJobHeader("Full-Stack & Core Banking Software Engineer", "BNH – Banque Nationale d'Habitat", "Sept 2025 – Present", "Algiers, Algeria", theme),
          createBullet("Core Banking Modernization & CI/CD Pipelines:", "Actively contributing to the architectural transition towards the new Core Banking System (Temenos CBS); analyzing technical specifications, mapping data flows, and collaborating with infrastructure teams to establish and improve automated CI/CD pipelines (Jenkins, GitHub workflows) for automated build testing, packaging, and zero-downtime deployment across banking environments.", theme),
          createBullet("Legacy CBS (SYBU) Satellites Full-Stack Integration:", "Architected, developed, and interconnected full-stack satellite applications exchanging real-time and batch financial data with the legacy Core Banking system (SYBU): Monetics (electronic card transactions, ATM switch communications, clearing file reconciliations), Centrale des Risques (CDR credit risk reporting automation), and Centrale des Impayés (automated detection and tracking platform for unpaid debts and delinquent checks).", theme),
          createBullet("High-Performance SQL Server (T-SQL) & Execution Optimization:", "Authored high-throughput stored procedures, ACID transactions, and user-defined functions; engineered advanced indexing strategies (composite, non-clustered, covering indexes) reducing query latency by up to 60%; diagnosed bottlenecks via Execution Plan analysis and eliminated costly lock contentions on high-volume financial ledgers.", theme),
          createBullet("Secure REST APIs (.NET 8 & Node.js):", "Developed modular backend services in ASP.NET Core (C# .NET 8) and Node.js featuring JWT/RBAC security, OWASP-compliant request validation, and high-performance database connectivity.", theme),
          createBullet("DevOps & Data Center Collaboration:", "Containerized internal banking tools using Docker for reliable staging environments and coordinated with operations teams for secure deployments in the on-premise banking Data Center.", theme),

          new Paragraph({ children: [new PageBreak()] }),

          // PAGE 2: CONTINUED EXPERIENCE & PROJECTS
          createSectionHeading("Professional Experience (Continued)", theme),
          createJobHeader("Lead Full-Stack & Solutions Engineer (Freelance / Independent)", "Autonomous Projects & Enterprise Consulting", "2024 – Present", "Algiers / Remote", theme),
          createBullet("End-to-End Application Delivery:", "Architected, implemented, and deployed full-lifecycle web platforms, SaaS products, and high-throughput systems for commercial clients, overseeing frontend UI, backend APIs, database design, and cloud deployments.", theme),
          createBullet("DevOps Integration & Cloud Automation:", "Configured automated CI/CD deployment pipelines using GitHub Actions, containerized microservices using Docker, and managed edge deployment environments with 99.9% uptime.", theme),

          // KEY ENGINEERING PROJECTS
          createSectionHeading("Key Engineering Projects", theme),
          ...createProjectEntry(
            "PC Labs — Interactive Hardware & PC Building Simulator",
            "Next.js 15 · TypeScript · Tailwind CSS · React 19 · Vercel Edge",
            "pc-labs-app.vercel.app",
            "Interactive web application for simulating computer hardware compatibility and custom PC configurations. Engineered a client-side zero-latency constraint engine checking CPU sockets, RAM clearances, PCIe bandwidth, and dynamic TDP thermal power consumption with real-time bottleneck telemetry. Deployed on Vercel Global Edge CDN (60 FPS, 98+ Lighthouse score).",
            theme
          ),
          ...createProjectEntry(
            "Aura Bags — Industrial B2B Manufacturing & Packaging Portal",
            "Next.js 15 · Node.js · Express · PostgreSQL · Tailwind · Docker",
            "bags-factory.vercel.app",
            "Full-scale B2B manufacturing and packaging portal. Built a dynamic material specification builder and grammage (GSM) calculator computing tensile resistance, manufacturing costs, and real-time custom quotes. Implemented role-based admin workflows, multi-stage production tracking, and Dockerized deployment.",
            theme
          ),
          ...createProjectEntry(
            "NutriSaaS — AI Vision Health & Nutrition Platform",
            "Next.js · React · Python · NestJS · Computer Vision API · Docker",
            "mahdi-gym.vercel.app",
            "AI-driven health and fitness platform featuring real-time 4K computer vision food scanning with instant macronutrient breakdown (calories, protein, carbs, fats). Engineered an adaptive metabolic engine adjusting targets based on energy expenditure, and integrated an Algerian Darija conversational AI coach. Microservices containerized with Docker.",
            theme
          ),
          ...createProjectEntry(
            "Zain Agency — Premium Multilingual Travel & Booking Platform",
            "Next.js 15 · TypeScript · CSS Modules · i18n Routing · QR Tracking",
            "zain-agency.vercel.app/fr",
            "Comprehensive travel agency and booking platform with full trilingual internationalization (AR/FR/EN). Built package reservation systems for Hajj & Omra, airline ticketing, visa workflows, client verification portal with automated QR code pass generation, and an administrative management dashboard.",
            theme
          ),

          // EDUCATION & FORMATIONS
          createSectionHeading("Education & Professional Formations", theme),
          createBullet("Licence en Informatique (Bachelor's Degree in Computer Science):", "Université Ferhat Abbas (UFAS 1) | 2022 – 2025. Core curriculum in Software Engineering, Algorithms & Data Structures, Relational Databases, Operating Systems, Networks & Systems Architecture.", theme),
          createBullet("Formation CBS & Data Center Deployment:", "Banking Systems Infrastructure Division | 2025 – 2026. Specialized practical training on installation, configuration, and deployment of Core Banking System (CBS) environments in Banking Data Centers.", theme),
          createBullet("Formation Ingénieur DevOps:", "Institut de Formation Professionnelle | 2025. Intensive professional training in Docker containerization, Kubernetes orchestration, Jenkins automated CI/CD pipelines, and Linux server administration.", theme),
          createBullet("Google AI Professional Certificate:", "Google · Coursera (Credential ID: YS26JC7JM5VP) | 2026. Applied Generative AI architectures, vector embeddings, Prompt Engineering, RAG retrieval pipelines, and AI systems development.", theme),

          // LANGUAGES & METHODOLOGIES
          createSectionHeading("Languages & Key Competencies", theme),
          createBullet("Languages:", "Arabic (Native), French (Fluent / Bilingual C1), English (Professional Working Proficiency B2/C1).", theme),
          createBullet("Core Strengths:", "Core Banking Architecture (Temenos & SYBU), Full SDLC Ownership, CI/CD Pipeline Automation, High-Performance SQL Server Optimization, Secure Microservices Architecture.", theme),
        ],
      },
    ],
  });
}

function buildDevOpsDocEN(photoBuffer) {
  const theme = THEMES.devops;
  const contacts = [
    "📍 Algiers, Algeria",
    "📞 +213 555 65 13 30",
    "✉️ djeridimahdi10@gmail.com",
    "🌐 mahdi-djeridi-eight.vercel.app",
    "💼 linkedin.com/in/mehdi-djeridi",
    "🐙 github.com/djeridimahdi10-creator",
  ];

  const header = createHeaderTable(
    "Mahdi Djeridi",
    "DevOps Engineer · CI/CD, Containerization & Infrastructure",
    "Docker · Kubernetes · HashiCorp Nomad · Jenkins · GitHub Actions · Portainer · Linux & Data Center",
    contacts,
    photoBuffer,
    theme
  );

  return new Document({
    creator: "Mahdi Djeridi",
    title: "Mahdi Djeridi — DevOps Engineer CV",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.4),
              bottom: convertInchesToTwip(0.4),
              left: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          header,

          // PROFESSIONAL SUMMARY
          createSectionHeading("Professional Summary", theme),
          new Paragraph({
            children: [
              new TextRun({
                text: "Dedicated DevOps Engineer with a strong Full-Stack Software Development foundation, specializing in the design, configuration, and automation of resilient CI/CD pipelines, containerized environments, and hybrid cloud/on-premise infrastructures. Practical expertise spanning Docker multi-stage containerization, Kubernetes & HashiCorp Nomad orchestration, automated pipeline tooling (Jenkins, GitHub Actions), container fleet management via Portainer, and Linux server administration. Currently playing a key role in the new Core Banking System (Temenos CBS) project at BNH, implementing automated CI/CD workflows, staging environments, and high-availability Data Center deployments under rigorous banking standards. Combines a deep architectural understanding of codebases (Next.js, Node.js, C# .NET, SQL Server) with infrastructure automation to deliver zero-downtime releases and resilient systems.",
                size: pt(9),
                color: theme.muted,
                font: "Arial",
              }),
            ],
            spacing: { before: pt(2), after: pt(6), line: 260 },
          }),

          // TECHNICAL EXPERTISE
          createSectionHeading("Technical Expertise", theme),
          createBullet("CI/CD & Automation Pipelines:", "Jenkins (Declarative & Scripted Pipelines, shared libraries), GitHub Actions (Multi-Stage Workflows, matrix builds), Automated Testing & Linting Gates, Artifact Packaging, Release Management, GitOps practices.", theme),
          createBullet("Containerization & Orchestration:", "Docker, Dockerfile Multi-Stage Optimization, Docker Compose, Portainer (Stack & Lifecycle Management), Kubernetes (Pods, Deployments, Services, ConfigMaps, Ingress, Rolling Updates), HashiCorp Nomad (Job specifications, Task groups).", theme),
          createBullet("Infrastructure, Cloud & Data Center:", "Linux Server Admin (Ubuntu, Debian, CentOS/RHEL, systemd, SSH hardening), Banking Data Center on-premise infrastructure, Vercel Edge Global CDN, Microsoft Azure, Nginx (Reverse Proxy, Load Balancing, SSL/TLS 1.3), Bash scripting.", theme),
          createBullet("Monitoring, Reliability & Security:", "Prometheus (Metrics collection, alerts), Container health checks, Resource telemetry, Zero-Downtime deployments, OWASP Top 10 hardening, SSL/TLS certificate lifecycle, Environment parity (Dev / Staging / Prod).", theme),
          createBullet("Full-Stack Software Foundation:", "TypeScript, JavaScript, Python, C# ASP.NET Core (.NET 8), Node.js, Next.js 15, Express, NestJS, RESTful APIs, SQL Server (T-SQL, Query Plans), PostgreSQL, Redis, Git branching workflows.", theme),

          // PROFESSIONAL EXPERIENCE
          createSectionHeading("Professional Experience", theme),
          createJobHeader("DevOps & Core Banking Systems Engineer", "BNH – Banque Nationale d'Habitat", "Sept 2025 – Present", "Algiers, Algeria", theme),
          createBullet("Core Banking CI/CD Pipeline Implementation (Temenos CBS):", "Actively driving the design, configuration, and optimization of automated CI/CD pipelines (Jenkins, GitHub Actions) for the new Core Banking System (Temenos); establishing automated quality gates (unit tests, security linting, build packaging) and seamless deployment promotion between development, testing, and pre-production banking environments.", theme),
          createBullet("Containerization & Portainer Management for Banking Satellites:", "Architected Docker container packaging for internal banking applications and peripheral services connected to legacy CBS (SYBU), including Monetics (Card & ATM Switch interfaces), Centrale des Risques (CDR risk monitoring), and Centrale des Impayés; deployed Portainer for unified container lifecycle monitoring, health checks, and rapid service rollback.", theme),
          createBullet("Banking Data Center Infrastructure & Environment Parity:", "Collaborated with infrastructure and network operations teams in provisioning and configuring high-availability on-premise environments; set up hardened Nginx reverse proxies with SSL/TLS termination, automated header hardening, and internal network segmentation protecting internal service tiers.", theme),
          createBullet("Release Engineering & Environment Troubleshooting:", "Managed release cycles, configuration baselines, and cross-environment synchronization (Dev / Staging / Prod); resolved critical environment discrepancies, network socket issues, and permission boundaries under strict banking security policies.", theme),
          createBullet("Full-Stack Collaboration & SQL Server Reliability:", "Leveraged software engineering expertise (ASP.NET Core C# .NET 8, Node.js) and in-depth SQL Server (T-SQL) execution plan diagnostics to assist application teams in resolving deadlocks, optimizing heavy transactional batch queries, and guaranteeing ACID consistency on financial databases.", theme),

          new Paragraph({ children: [new PageBreak()] }),

          // PAGE 2: CONTINUED EXPERIENCE & PROJECTS
          createSectionHeading("Professional Experience (Continued)", theme),
          createJobHeader("DevOps & Cloud Infrastructure Engineer (Freelance / Independent)", "SaaS, Industrial & Commercial Platforms", "2024 – Present", "Algiers / Remote", theme),
          createBullet("End-to-End Infrastructure Automation:", "Engineered and automated deployment lifecycles for multiple web applications and SaaS platforms, taking complete ownership of Dockerization, CI/CD pipeline automation, reverse proxy configuration, DNS management, and monitoring.", theme),
          createBullet("Full-Stack Systems Synergy:", "Bridged the gap between application development and operations by developing both application code (TypeScript, Next.js, Node.js, databases) and automated infrastructure stacks, accelerating deployment velocity from days to minutes.", theme),

          // DEVOPS & INFRASTRUCTURE PROJECTS
          createSectionHeading("DevOps & Infrastructure Projects", theme),
          ...createProjectEntry(
            "Aura Bags — Containerized Industrial B2B Platform",
            "Docker · Docker Compose · Portainer · GitHub Actions · Nginx · Linux",
            "bags-factory.vercel.app",
            "Containerized a multi-tier industrial manufacturing platform (Next.js frontend, Node.js/Express API, PostgreSQL database). Authored multi-stage Dockerfiles utilizing Alpine base images, slashing production image sizes by 60%. Configured GitHub Actions CI/CD pipelines for automated testing, container build, and deployment. Managed container health, persistent volumes, and Let's Encrypt SSL via Portainer and Nginx.",
            theme
          ),
          ...createProjectEntry(
            "PC Labs — Edge Infrastructure & CI/CD Telemetry",
            "Vercel Edge CDN · GitHub Actions · CI Quality Gates · Automated Telemetry",
            "pc-labs-app.vercel.app",
            "Architected edge delivery pipeline for a high-performance hardware compatibility engine. Integrated automated CI build verification and bundle size gates on GitHub Actions with dynamic preview environments per pull request. Configured edge caching and client-side performance telemetry, ensuring zero-latency constraint solving and sub-15ms UI responsiveness.",
            theme
          ),
          ...createProjectEntry(
            "NutriSaaS — Multi-Service Microservices Architecture & Orchestration",
            "Docker · Docker Compose · Microservices · Python · NestJS · Next.js",
            "mahdi-gym.vercel.app",
            "Designed container topology isolating the web application, NestJS backend API, and Python AI vision/vector compute service across dedicated Docker bridge networks. Implemented persistent volume policies for vector index state, isolated container secrets, and health-check endpoints for automated recovery in the event of service degradation.",
            theme
          ),
          ...createProjectEntry(
            "Zain Agency — Production Infrastructure & Zero-Downtime Deployment",
            "Next.js 15 · GitHub Actions · SSL/TLS 1.3 · DNS Routing · Nginx",
            "zain-agency.vercel.app/fr",
            "Configured production cloud delivery for a high-traffic multilingual travel and booking platform. Implemented automated zero-downtime release pipelines with GitHub Actions, DNS routing, automated SSL/TLS certificate renewal, and security header hardening (HSTS, CSP, X-Frame-Options) to safeguard transactional client data.",
            theme
          ),

          // EDUCATION & FORMATIONS
          createSectionHeading("Education & Professional Formations", theme),
          createBullet("Formation Ingénieur DevOps:", "Institut de Formation Professionnelle | 2025. Comprehensive hands-on training in Docker containerization, Kubernetes cluster orchestration, HashiCorp Nomad scheduling, Jenkins CI/CD pipeline automation, and Linux server administration.", theme),
          createBullet("Formation CBS & Data Center Deployment:", "Banking Systems Infrastructure Division | 2025 – 2026. Practical training on installation, network configuration, and deployment of Core Banking System (CBS) environments within on-premise Banking Data Centers.", theme),
          createBullet("Licence en Informatique (Bachelor's Degree in Computer Science):", "Université Ferhat Abbas (UFAS 1) | 2022 – 2025. Core curriculum in Systems Architecture, Operating Systems & Kernels, Networking Protocols (TCP/IP, HTTP/S, DNS), Databases, and Software Engineering.", theme),
          createBullet("Google AI Professional Certificate:", "Google · Coursera (Credential ID: YS26JC7JM5VP) | 2026. Machine Learning architectures, generative models, vector embeddings, Prompt Engineering, and automated AI application engineering pipelines.", theme),

          // LANGUAGES & METHODOLOGIES
          createSectionHeading("Languages & Core DevOps Strengths", theme),
          createBullet("Languages:", "Arabic (Native), French (Fluent / Bilingual C1), English (Professional Working Proficiency B2/C1).", theme),
          createBullet("Core Capabilities:", "Automated CI/CD Workflows, Docker & Portainer Container Management, Kubernetes & HashiCorp Nomad, Banking Data Center Reliability, Full-Stack Software Synergy.", theme),
        ],
      },
    ],
  });
}

function buildFullStackDocFR(photoBuffer) {
  const theme = THEMES.fullstack;
  const contacts = [
    "📍 Alger, Algérie",
    "📞 +213 555 65 13 30",
    "✉️ djeridimahdi10@gmail.com",
    "🌐 mahdi-djeridi-eight.vercel.app",
    "💼 linkedin.com/in/mehdi-djeridi",
    "🐙 github.com/djeridimahdi10-creator",
  ];

  const header = createHeaderTable(
    "Mahdi Djeridi",
    "Ingénieur Full-Stack · Génie Logiciel & Systèmes",
    "Next.js 15 · React 19 · Node.js · ASP.NET Core (.NET 8) · SQL Server · Docker & CI/CD",
    contacts,
    photoBuffer,
    theme
  );

  return new Document({
    creator: "Mahdi Djeridi",
    title: "Mahdi Djeridi — CV Développeur Full-Stack",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.4),
              bottom: convertInchesToTwip(0.4),
              left: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          header,

          // PROFIL PROFESSIONNEL
          createSectionHeading("Profil Professionnel", theme),
          new Paragraph({
            children: [
              new TextRun({
                text: "Ingénieur Développeur Full-Stack avec plus de 3 ans d'expérience dans la conception, le développement et le déploiement d'applications web scalables, de systèmes satellites bancaires critiques et de microservices d'entreprise. Maîtrise avancée des frameworks frontend modernes (Next.js 15, React 19, TypeScript) et des architectures backend robustes (ASP.NET Core C# .NET 8, Node.js, NestJS), combinée à une expertise pointue en optimisation SQL Server (T-SQL, procédures stockées complexes, indexation et plans d'exécution). Expérience concrète en automatisation DevOps, conteneurisation Docker, mise en place de pipelines CI/CD (Jenkins, GitHub Actions) et environnements haute disponibilité en Data Center. Actuellement impliqué activement dans la transition vers le nouveau Core Banking System (Temenos) et l'optimisation des pipelines CI/CD à la BNH.",
                size: pt(9),
                color: theme.muted,
                font: "Arial",
              }),
            ],
            spacing: { before: pt(2), after: pt(6), line: 260 },
          }),

          // COMPÉTENCES TECHNIQUES
          createSectionHeading("Compétences Techniques", theme),
          createBullet("Frontend & Ingénierie UI :", "Next.js 15 (App Router, Server Components), React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, Three.js / WebGL, Framer Motion, Design Systems adaptatifs.", theme),
          createBullet("Backend & Architectures Systèmes :", "ASP.NET Core (.NET 8 C#), Node.js, NestJS, Express.js, APIs RESTful, GraphQL, Microservices, Domain-Driven Design (DDD), Clean Architecture, WebSockets.", theme),
          createBullet("Bases de Données & Performance :", "SQL Server (T-SQL, procédures stockées avancées, indexation clustered/non-clustered, plans d'exécution, résolution de deadlocks), PostgreSQL, Redis.", theme),
          createBullet("DevOps, CI/CD & Déploiement :", "Docker, Docker Compose, Pipelines CI/CD (GitHub Actions, Jenkins), Portainer, Notions Kubernetes & Nomad, Admin Linux (Ubuntu/Debian), Nginx, Vercel Edge, Azure, Data Center.", theme),
          createBullet("Sécurité & Qualité :", "OAuth2, OIDC, JWT RS256, RBAC, Conformité OWASP Top 10, Tests automatisés (Playwright, Jest), Intégrité transactionnelle ACID.", theme),

          // EXPÉRIENCE PROFESSIONNELLE
          createSectionHeading("Expérience Professionnelle", theme),
          createJobHeader("Ingénieur Full-Stack & Systèmes Core Banking", "BNH – Banque Nationale d'Habitat", "Septembre 2025 – Présent", "Alger, Algérie", theme),
          createBullet("Modernisation Core Banking & Pipelines CI/CD :", "Participation active aux travaux de transition architecturale vers le nouveau Core Banking System (Temenos CBS) ; analyse des spécifications techniques et fonctionnelles d'intégration, cartographie des flux et collaboration avec les équipes infrastructure pour concevoir et optimiser les pipelines CI/CD automatisés (Jenkins, GitHub Actions) pour les tests, builds et déploiements sans interruption.", theme),
          createBullet("Intégration & Satellites CBS SYBU (Legacy) :", "Conception, développement et interconnexion d’applications full-stack satellitaires assurant les flux de données critiques avec l'ancien Core Banking (SYBU) : Monétique (flux cartes, compensation et DAB/GAB), Centrale des Risques (CDR agrégation et reporting centralisé) et Centrale des Impayés (suivi automatisé des créances et impayés).", theme),
          createBullet("SQL Server (T-SQL) Haute Performance & Optimisation :", "Écriture de procédures stockées complexes, fonctions et transactions ACID sur volumes élevés ; élaboration de stratégies d'indexation avancée réduisant la latence jusqu'à 60% ; analyse poussée des plans d'exécution et éradication des contentions et verrous (deadlocks).", theme),
          createBullet("Architecture d'APIs Sécurisées (.NET 8 & Node.js) :", "Développement de microservices et passerelles d'API en ASP.NET Core (C# .NET 8) et Node.js intégrant sécurité JWT/RBAC stricte, validation conforme OWASP et connectivité base de données optimisée.", theme),
          createBullet("Collaboration DevOps & Data Center :", "Conteneurisation d'outils bancaires internes sous Docker pour garantir la parité des environnements et déploiement sécurisé au sein du Data Center bancaire de la BNH.", theme),

          new Paragraph({ children: [new PageBreak()] }),

          // PAGE 2: SUITE EXPÉRIENCE & PROJETS
          createSectionHeading("Expérience Professionnelle (Suite)", theme),
          createJobHeader("Ingénieur Full-Stack & Solutions Cloud (Freelance / Indépendant)", "Projets Autonomes & Conseil Digital", "2024 – Présent", "Alger / En Ligne", theme),
          createBullet("Développement Logiciel de Bout en Bout :", "Architecture, développement et déploiement de plateformes web complètes et solutions SaaS d'entreprise, assurant l'interface frontend, les APIs backend, la persistance des données et l'hébergement cloud.", theme),
          createBullet("Automatisation DevOps & Infrastructure :", "Automatisation des cycles de livraison via des pipelines CI/CD GitHub Actions, conteneurisation Docker des microservices et gestion de déploiements Edge avec haute disponibilité (99.9%).", theme),

          // PROJETS D'INGÉNIERIE
          createSectionHeading("Projets d'Ingénierie Réalisés (Consultables en Ligne)", theme),
          ...createProjectEntry(
            "PC Labs — Simulateur Matériel PC & Compatibilité",
            "Next.js 15 · TypeScript · Tailwind CSS · React 19 · Vercel Edge",
            "pc-labs-app.vercel.app",
            "Application web interactive de simulation et benchmarking d'assemblage PC. Moteur de compatibilité client sans latence validant sockets CPU, dégagements RAM, lignes PCIe, calcul thermique TDP dynamique et télémétrie des bottlenecks. Déploiement Vercel Global Edge CDN (Score Lighthouse 98+).",
            theme,
            true
          ),
          ...createProjectEntry(
            "Aura Bags — Portail Industriel B2B & Packaging",
            "Next.js 15 · Node.js · Express · PostgreSQL · Tailwind · Docker",
            "bags-factory.vercel.app",
            "Portail e-commerce industriel B2B pour fabrication de sacs et emballages. Configurateur dynamique de matériaux et grammages (GSM) calculant la résistance à la traction et générant des devis instantanés. Tableau de bord administratif sécurisé, suivi de production multi-étapes et conteneurisation Docker.",
            theme,
            true
          ),
          ...createProjectEntry(
            "NutriSaaS — Plateforme IA Nutrition & Fitness",
            "Next.js · React · Python · NestJS · API Vision · Docker",
            "mahdi-gym.vercel.app",
            "Plateforme IA santé avec scanner d'aliments par vision 4K et estimation automatique des macronutriments (calories, protéines, glucides, lipides). Moteur métabolique adaptatif ajustant les besoins caloriques et coach IA conversationnel interactif adapté en Darija algérienne. Microservices conteneurisés.",
            theme,
            true
          ),
          ...createProjectEntry(
            "Zain Agency — Portail de Réservation & Agence de Voyage",
            "Next.js 15 · TypeScript · Routage i18n · Suivi QR Code",
            "zain-agency.vercel.app/fr",
            "Plateforme de réservation et gestion de voyage trilingue (AR/FR/EN). Gestion des packages Hajj & Omra, billetterie aérienne, traitement de visas, portail client avec vérification par QR code automatisé et tableau de bord de gestion des réservations.",
            theme,
            true
          ),

          // FORMATION & CERTIFICATIONS
          createSectionHeading("Formation & Certifications Professionnelles", theme),
          createBullet("Licence en Informatique :", "Université Ferhat Abbas (UFAS 1) | 2022 – 2025. Génie logiciel, algorithmique avancée, bases de données relationnelles, systèmes d'exploitation, réseaux et architectures systèmes.", theme),
          createBullet("Formation CBS & Déploiement Data Center :", "Division Systèmes d'Information Bancaires | 2025 – 2026. Formation technique appliquée : installation, configuration et déploiement d'environnements Core Banking System en Data Center bancaire.", theme),
          createBullet("Formation Ingénieur DevOps :", "Institut de Formation Professionnelle | 2025. Conteneurisation Docker avancée, orchestration Kubernetes, automatisation de pipelines CI/CD Jenkins et administration de serveurs Linux.", theme),
          createBullet("Google AI Professional Certificate :", "Google · Coursera (ID: YS26JC7JM5VP) | 2026. Architectures IA générative, embeddings vectoriels, Prompt Engineering, pipelines RAG et développement d'applications d'IA.", theme),

          // LANGUES & ATOUTS
          createSectionHeading("Langues & Atouts", theme),
          createBullet("Langues :", "Arabe (Langue maternelle), Français (Courant / Bilingue C1), Anglais (Professionnel B2/C1).", theme),
          createBullet("Atouts Clés :", "Architecture Core Banking (Temenos / SYBU), Cycle SDLC Complet, Automatisation CI/CD & DevOps, Optimisation SQL & Indexation.", theme),
        ],
      },
    ],
  });
}

function buildDevOpsDocFR(photoBuffer) {
  const theme = THEMES.devops;
  const contacts = [
    "📍 Alger, Algérie",
    "📞 +213 555 65 13 30",
    "✉️ djeridimahdi10@gmail.com",
    "🌐 mahdi-djeridi-eight.vercel.app",
    "💼 linkedin.com/in/mehdi-djeridi",
    "🐙 github.com/djeridimahdi10-creator",
  ];

  const header = createHeaderTable(
    "Mahdi Djeridi",
    "Ingénieur DevOps · CI/CD, Conteneurisation & Infrastructure",
    "Docker · Kubernetes · HashiCorp Nomad · Jenkins · GitHub Actions · Portainer · Linux & Data Center",
    contacts,
    photoBuffer,
    theme
  );

  return new Document({
    creator: "Mahdi Djeridi",
    title: "Mahdi Djeridi — CV Ingénieur DevOps",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.4),
              bottom: convertInchesToTwip(0.4),
              left: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          header,

          // PROFIL PROFESSIONNEL
          createSectionHeading("Profil Professionnel", theme),
          new Paragraph({
            children: [
              new TextRun({
                text: "Ingénieur DevOps doté d'un solide socle en développement logiciel Full-Stack, spécialisé dans la conception, la maintenance et l'automatisation de pipelines CI/CD résilients, d'environnements conteneurisés et d'infrastructures hybrides cloud / on-premise. Expertise pratique en conteneurisation multi-étapes Docker, orchestration Kubernetes & HashiCorp Nomad, outillage CI/CD (Jenkins, GitHub Actions), gestion de parc conteneurs avec Portainer et administration Linux. Actuellement au cœur des activités DevOps pour le projet du nouveau Core Banking System (Temenos CBS) à la BNH, orchestrant les pipelines de build/déploiement, les environnements de staging et les déploiements en Data Center selon les normes de sécurité bancaire les plus strictes. Allie une compréhension intime du code (Next.js, Node.js, C# .NET, SQL Server) à l'automatisation d'infrastructure pour des livraisons rapides sans interruption de service.",
                size: pt(9),
                color: theme.muted,
                font: "Arial",
              }),
            ],
            spacing: { before: pt(2), after: pt(6), line: 260 },
          }),

          // COMPÉTENCES TECHNIQUES
          createSectionHeading("Compétences Techniques", theme),
          createBullet("Pipelines CI/CD & Automatisation :", "Jenkins (Pipelines Déclaratifs & Scriptés, shared libraries), GitHub Actions (Workflows Multi-Étapes), Barrières de tests automatisés, Packaging d'artefacts, Gestion des releases, GitOps.", theme),
          createBullet("Conteneurisation & Orchestration :", "Docker, Dockerfile Multi-Stage Optimization, Docker Compose, Portainer (Gestion de Stacks & Conteneurs), Kubernetes (Deployments, Services, ConfigMaps, Ingress), HashiCorp Nomad.", theme),
          createBullet("Infrastructure, Cloud & Data Center :", "Administration Serveur Linux (Ubuntu, Debian, CentOS/RHEL), Data Center bancaire on-premise, Vercel Edge Global CDN, Microsoft Azure, Nginx (Reverse Proxy, Load Balancing, SSL/TLS 1.3), Scripts Bash.", theme),
          createBullet("Monitoring, Fiabilité & Sécurité :", "Prometheus (Métriques, alertes), Contrôle de santé conteneurs, Télémétrie des ressources, Déploiements sans interruption, Durcissement OWASP Top 10, Cycle de vie certificats SSL/TLS, Parité Dev / Staging / Prod.", theme),
          createBullet("Socle Développeur Full-Stack :", "TypeScript, JavaScript, Python, C# ASP.NET Core (.NET 8), Node.js, Next.js 15, Express, NestJS, APIs RESTful, SQL Server (T-SQL, Plans d'Exécution), PostgreSQL, Redis, Stratégies Git (GitFlow, Trunk-based).", theme),

          // EXPÉRIENCE PROFESSIONNELLE
          createSectionHeading("Expérience Professionnelle", theme),
          createJobHeader("Ingénieur DevOps & Systèmes Core Banking", "BNH – Banque Nationale d'Habitat", "Septembre 2025 – Présent", "Alger, Algérie", theme),
          createBullet("Mise en Œuvre des Pipelines CI/CD Core Banking (Temenos CBS) :", "Conception, implémentation et optimisation active des pipelines automatisés CI/CD (Jenkins, GitHub Actions) pour la modernisation du Core Banking System (Temenos) ; mise en place de portes de validation qualité automatisées (tests unitaires, analyse statique de sécurité, empaquetage d'artefacts) et automatisation de la promotion de versions entre développement, recette et pré-production.", theme),
          createBullet("Conteneurisation Docker & Supervision Portainer :", "Architecture de conteneurisation Docker pour les applications internes et services satellites connectés au CBS legacy (SYBU), incluant la Monétique (cartes bancaires et interconnexion DAB/GAB), la Centrale des Risques (CDR) et la Centrale des Impayés ; déploiement de Portainer pour la supervision centralisée des conteneurs, le suivi de santé et les rollbacks rapides.", theme),
          createBullet("Infrastructure Data Center Bancaire & Parité des Environnements :", "Collaboration étroite avec les équipes réseau et infrastructure pour le provisionnement et la configuration des environnements haute disponibilité du Data Center ; configuration de reverse proxies Nginx durcis avec terminaison SSL/TLS, isolation réseau et politiques strictes de sécurité bancaire.", theme),
          createBullet("Ingénierie de Déploiement & Dépannage Système :", "Gestion des releases, baselines de configuration et synchronisation des environnements (Dev / Recette / Prod) ; diagnostic et résolution d'anomalies d'environnement, permissions et contraintes réseau sous politiques d'accès de moindre privilège.", theme),
          createBullet("Synergie Full-Stack & Fiabilité SQL Server :", "Mobilisation des compétences de développement (ASP.NET Core C# .NET 8, Node.js) et de l'analyse de plans d'exécution SQL Server (T-SQL) pour assister les équipes applicatives à éliminer les blocages (deadlocks), optimiser les batchs financiers volumineux et garantir l'intégrité ACID des bases bancaires.", theme),

          new Paragraph({ children: [new PageBreak()] }),

          // PAGE 2: SUITE EXPÉRIENCE & PROJETS
          createSectionHeading("Expérience Professionnelle (Suite)", theme),
          createJobHeader("Ingénieur DevOps & Cloud Infrastructure (Freelance / Indépendant)", "Plateformes SaaS, Industrielles & Commerciales", "2024 – Présent", "Alger / En Ligne", theme),
          createBullet("Automatisation Complète d'Infrastructures :", "Conception et automatisation des cycles de déploiement pour plusieurs plateformes web et applications SaaS, prenant en charge l'ensemble de la conteneurisation Docker, les pipelines CI/CD, la configuration de reverse proxies, le DNS et le monitoring.", theme),
          createBullet("Synergie Logiciel & Exploitation :", "Réduction drastique des délais de mise en production (de plusieurs jours à quelques minutes) en assurant à la fois le développement applicatif (TypeScript, Next.js, Node.js, BDD) et l'automatisation d'infrastructures résilientes.", theme),

          // PROJETS D'INFRASTRUCTURE & DEVOPS
          createSectionHeading("Projets d'Infrastructure & Travaux DevOps (Consultables en Ligne)", theme),
          ...createProjectEntry(
            "Aura Bags — Plateforme Industrielle B2B Conteneurisée",
            "Docker · Docker Compose · Portainer · GitHub Actions · Nginx · Linux",
            "bags-factory.vercel.app",
            "Conteneurisation d'une plateforme industrielle multi-tiers (frontend Next.js, API Node.js/Express, BDD PostgreSQL). Écriture de Dockerfiles multi-étapes avec images Alpine, réduisant la taille de 60%. Configuration de pipelines CI/CD GitHub Actions pour les tests, builds et déploiements automatisés. Gestion des volumes persistants, monitoring santé et SSL Let's Encrypt via Portainer et Nginx.",
            theme,
            true
          ),
          ...createProjectEntry(
            "PC Labs — Infrastructure Edge & Télémétrie CI/CD",
            "Vercel Edge CDN · GitHub Actions · CI Quality Gates · Télémétrie",
            "pc-labs-app.vercel.app",
            "Architecture de livraison Edge pour un moteur de compatibilité matérielle haute performance. Automatisation des vérifications de build et contrôle des bundles via GitHub Actions avec déploiement d'environnements de prévisualisation isolés par Pull Request. Télémétrie client temps réel et temps de réponse UI sous 15ms.",
            theme,
            true
          ),
          ...createProjectEntry(
            "NutriSaaS — Orchestration Multi-Services & Microservices",
            "Docker · Docker Compose · Microservices · Python · NestJS · Next.js",
            "mahdi-gym.vercel.app",
            "Conception d'une topologie de conteneurs isolant l'application web, l'API backend NestJS et le service d'inférence vision IA Python sur des réseaux internes Docker dédiés. Mise en place de volumes persistants pour les index vectoriels, gestion sécurisée des secrets et endpoints de contrôle de santé pour redémarrage automatique en cas de défaillance.",
            theme,
            true
          ),
          ...createProjectEntry(
            "Zain Agency — Production Cloud & Déploiement Continu",
            "Next.js 15 · GitHub Actions · SSL/TLS 1.3 · Routage DNS · Nginx",
            "zain-agency.vercel.app/fr",
            "Configuration de l'hébergement cloud d'une plateforme de réservation à fort trafic. Mise en œuvre d'un pipeline de déploiement continu sans interruption (zero-downtime) sur GitHub Actions, gestion DNS, certificats SSL/TLS 1.3 automatisés et durcissement des en-têtes HTTP de sécurité (HSTS, CSP, X-Frame-Options).",
            theme,
            true
          ),

          // FORMATION & CERTIFICATIONS
          createSectionHeading("Formation & Certifications Professionnelles", theme),
          createBullet("Formation Ingénieur DevOps :", "Institut de Formation Professionnelle | 2025. Formation pratique approfondie : conteneurisation Docker, orchestration Kubernetes, ordonnancement HashiCorp Nomad, pipelines CI/CD Jenkins et administration système Linux.", theme),
          createBullet("Formation CBS & Déploiement Data Center :", "Division Systèmes d'Information Bancaires | 2025 – 2026. Formation technique appliquée : installation, configuration réseau et déploiement d'environnements Core Banking System en Data Center bancaire sécurisé.", theme),
          createBullet("Licence en Informatique :", "Université Ferhat Abbas (UFAS 1) | 2022 – 2025. Architectures systèmes, systèmes d'exploitation & noyaux, protocoles réseaux (TCP/IP, HTTP/S, DNS), bases de données relationnelles et génie logiciel.", theme),
          createBullet("Google AI Professional Certificate :", "Google · Coursera (ID: YS26JC7JM5VP) | 2026. Architectures Machine Learning, modèles génératifs, vectorisation sémantique, Prompt Engineering et automatisation des pipelines IA.", theme),

          // LANGUES & ATOUTS
          createSectionHeading("Langues & Atouts DevOps", theme),
          createBullet("Langues :", "Arabe (Langue maternelle), Français (Courant / Bilingue C1), Anglais (Professionnel B2/C1).", theme),
          createBullet("Compétences Clés :", "Pipelines CI/CD (Jenkins / Actions), Docker & Portainer, Kubernetes & HashiCorp Nomad, Parité & Data Center Bancaire, Synergie Logiciel & DevOps.", theme),
        ],
      },
    ],
  });
}

async function main() {
  console.log("📝 Generating editable Word (.docx) documents...");

  const photoPath = path.join(__dirname, "public", "profile.jpg");
  const photoBuffer = fs.existsSync(photoPath) ? fs.readFileSync(photoPath) : null;

  const docs = [
    {
      builder: buildFullStackDocEN,
      filename: "Mahdi_Djeridi_FullStack_Developer_CV.docx",
    },
    {
      builder: buildDevOpsDocEN,
      filename: "Mahdi_Djeridi_DevOps_Engineer_CV.docx",
    },
    {
      builder: buildFullStackDocFR,
      filename: "Mahdi_Djeridi_CV_Developpeur_FullStack_FR.docx",
    },
    {
      builder: buildDevOpsDocFR,
      filename: "Mahdi_Djeridi_CV_Ingenieur_DevOps_FR.docx",
    },
  ];

  for (const item of docs) {
    const doc = item.builder(photoBuffer);
    const buffer = await Packer.toBuffer(doc);

    const rootPath = path.join(__dirname, item.filename);
    const publicPath = path.join(__dirname, "public", item.filename);

    fs.writeFileSync(rootPath, buffer);
    fs.writeFileSync(publicPath, buffer);
    console.log(`✅ Generated DOCX: ${item.filename}`);
  }

  // Update legacy djeridi-mahdi-cv.docx with French Full-Stack CV as default
  const legacyBuf = fs.readFileSync(path.join(__dirname, "Mahdi_Djeridi_CV_Developpeur_FullStack_FR.docx"));
  fs.writeFileSync(path.join(__dirname, "djeridi-mahdi-cv.docx"), legacyBuf);
  fs.writeFileSync(path.join(__dirname, "public", "djeridi-mahdi-cv.docx"), legacyBuf);
  console.log("✅ Updated legacy djeridi-mahdi-cv.docx with French Full-Stack CV");

  console.log("🎉 All .docx documents created successfully!");
}

main().catch(console.error);

