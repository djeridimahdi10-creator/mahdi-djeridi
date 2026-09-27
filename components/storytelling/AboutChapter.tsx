"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

interface BlueprintData {
  id: string;
  tabLabel: { en: string; fr: string };
  icon: string;
  title: { en: string; fr: string };
  category: { en: string; fr: string };
  description: { en: string; fr: string };
  accent: string;
  metrics: Array<{ label: { en: string; fr: string }; value: string }>;
  stack: string[];
  pattern: { en: string; fr: string };
}

const BLUEPRINTS: BlueprintData[] = [
  {
    id: "ai",
    tabLabel: { en: "AI Agents", fr: "Agents IA" },
    icon: "🤖",
    title: {
      en: "Autonomous Multi-Agent Orchestration",
      fr: "Orchestration Multi-Agents Autonomes",
    },
    category: {
      en: "NEURAL ARCHITECTURE & RAG",
      fr: "ARCHITECTURE NEURONALE & RAG",
    },
    description: {
      en: "Designing stateful multi-agent DAG pipelines using LangGraph and function-calling. Integrating semantic vector retrieval (RAG) with strict deterministic boundaries to eliminate hallucination.",
      fr: "Conception de pipelines DAG multi-agents avec LangGraph et function-calling. Intégration de recherche vectorielle sémantique (RAG) avec garde-fous déterministes stricts.",
    },
    accent: "var(--sky-400)",
    metrics: [
      { label: { en: "Routing Latency", fr: "Latence de Routage" }, value: "< 60ms" },
      { label: { en: "Vector Index Size", fr: "Taille Index Vectoriel" }, value: "100k+ Dims" },
      { label: { en: "Reasoning Loops", fr: "Boucles de Raisonnement" }, value: "Self-Healing" },
    ],
    stack: ["LangGraph", "Python", "FAISS / Pinecone", "OpenAI / Claude API", "LlamaIndex", "FastAPI"],
    pattern: {
      en: "Stateful agent consensus loops with persistent long-term memory",
      fr: "Boucles de consensus d'agents à état avec mémoire à long terme",
    },
  },
  {
    id: "fullstack",
    tabLabel: { en: "Full-Stack", fr: "Full-Stack" },
    icon: "⚡",
    title: {
      en: "High-Throughput Web & Microservices",
      fr: "Web Haute Performance & Microservices",
    },
    category: {
      en: "DISTRIBUTED WEB PLATFORMS",
      fr: "PLATEFORMES WEB DISTRIBUÉES",
    },
    description: {
      en: "Architecting modular, type-safe platforms with Next.js 15 Server Components and NestJS microservices. Focus on sub-millisecond database queries, clean domain isolation, and real-time sockets.",
      fr: "Architecture de plateformes modulaires et type-safe avec Next.js 15 Server Components et microservices NestJS. Optimisation des requêtes SQL et isolation propre des domaines.",
    },
    accent: "var(--violet-400)",
    metrics: [
      { label: { en: "Target Uptime", fr: "Disponibilité Cible" }, value: "99.98%" },
      { label: { en: "Type Safety", fr: "Sécurité Typage" }, value: "100% E2E" },
      { label: { en: "API Latency", fr: "Latence API" }, value: "< 25ms" },
    ],
    stack: ["Next.js 15", "React 19", "NestJS", "TypeScript", "PostgreSQL", "Redis / BullMQ"],
    pattern: {
      en: "Domain-Driven Design (DDD) with clean CQRS data flow separation",
      fr: "Domain-Driven Design (DDD) avec séparation propre des flux CQRS",
    },
  },
  {
    id: "security",
    tabLabel: { en: "App Security", fr: "Sécurité" },
    icon: "🛡️",
    title: {
      en: "Zero-Trust & OWASP Hardened Defense",
      fr: "Défense Zero-Trust & Conformité OWASP",
    },
    category: {
      en: "APPLICATION SECURITY & AUTH",
      fr: "SÉCURITÉ APPLICATIVE & AUTH",
    },
    description: {
      en: "Implementing end-to-end security defense protocols: OAuth2/OIDC identity management, RS256 signed JWTs with automated rotation, strict CORS/CSP headers, and proactive threat modeling.",
      fr: "Mise en œuvre de protocoles de défense de bout en bout : OAuth2/OIDC, tokens JWT RS256 avec rotation automatique, politiques strictes CORS/CSP et modélisation des menaces.",
    },
    accent: "#10b981",
    metrics: [
      { label: { en: "OWASP Compliance", fr: "Conformité OWASP" }, value: "Top 10 Zero-Pass" },
      { label: { en: "Token Algorithm", fr: "Algorithme Token" }, value: "RS256 / Ed25519" },
      { label: { en: "Auth Protocol", fr: "Protocole Auth" }, value: "OAuth2 / OIDC" },
    ],
    stack: ["OWASP Top 10", "OAuth2 / JWT", "Argon2 / Bcrypt", "Helmet.js", "ZAP Scanner", "TLS 1.3"],
    pattern: {
      en: "Principle of least privilege with cryptographically signed assertions",
      fr: "Principe du moindre privilège avec assertions signées cryptographiquement",
    },
  },
  {
    id: "devops",
    tabLabel: { en: "DevOps & Cloud", fr: "DevOps & Cloud" },
    icon: "☁️",
    title: {
      en: "Automated CI/CD & Container Orchestration",
      fr: "CI/CD Automatisé & Conteneurisation",
    },
    category: {
      en: "INFRASTRUCTURE AS CODE",
      fr: "INFRASTRUCTURE AS CODE",
    },
    description: {
      en: "Automating cloud lifecycles via multi-stage Docker builds, automated GitHub Actions pipelines, and Kubernetes deployment strategies for resilient, zero-downtime rolling releases.",
      fr: "Automatisation du cycle de vie cloud via des builds Docker multi-étapes, des pipelines GitHub Actions et des stratégies de déploiement Kubernetes sans interruption de service.",
    },
    accent: "var(--gold-400)",
    metrics: [
      { label: { en: "Deployment Flow", fr: "Flux Déploiement" }, value: "100% Automated" },
      { label: { en: "Release Downtime", fr: "Temps d'Arrêt" }, value: "0 ms" },
      { label: { en: "Build Efficiency", fr: "Efficacité Build" }, value: "< 2 min" },
    ],
    stack: ["Docker", "Kubernetes", "GitHub Actions", "Linux / Bash", "Nginx", "Prometheus"],
    pattern: {
      en: "GitOps delivery pipeline with immutable infrastructure artifacts",
      fr: "Pipeline GitOps avec artefacts d'infrastructure immuables",
    },
  },
];

export default function AboutChapter() {
  const [activeTabId, setActiveTabId] = useState("ai");
  const { t, language } = usePortfolio();

  const isFr = language === "fr";
  const activeBlueprint = BLUEPRINTS.find((b) => b.id === activeTabId) || BLUEPRINTS[0];

  const PRINCIPLES = [
    {
      num: "01",
      title: isFr ? "Zero-Trust par Défaut" : "Zero-Trust by Default",
      desc: isFr
        ? "Sécurité ancrée dès la couche protocolaire. Authentification stricte, validation des entrées et isolation des accès."
        : "Security established at the protocol layer. Strict authentication, input sanitization, and least-privilege boundary control.",
      color: "#10b981",
    },
    {
      num: "02",
      title: isFr ? "Autonome plutôt que Réactif" : "Autonomous over Reactive",
      desc: isFr
        ? "Conception de pipelines d'agents intelligents capables d'auto-guérison et de reprise sur incident avec mémoire d'état."
        : "Designing self-orchestrating agent pipelines with automatic error recovery, state persistence, and deterministic bounds.",
      color: "var(--sky-400)",
    },
    {
      num: "03",
      title: isFr ? "La Performance comme Fonctionnalité" : "Performance as a Feature",
      desc: isFr
        ? "Requêtes sous la milliseconde, mise en cache stratégique et élimination de la complexité accidentelle."
        : "Sub-millisecond query execution, strategic multi-tier caching, and mathematical simplicity over accidental bloat.",
      color: "var(--violet-400)",
    },
  ];

  const CAPABILITIES = [
    { label: isFr ? "Pipelines d'Agents IA" : "Autonomous AI Agents", dot: "#38bdf8" },
    { label: isFr ? "Microservices Cloud Résilients" : "Resilient Cloud Microservices", dot: "#a855f7" },
    { label: isFr ? "Sécurité Zero-Trust" : "Zero-Trust Protocol", dot: "#10b981" },
    { label: isFr ? "Haute Disponibilité 99.9%" : "99.9% Production SLA", dot: "#f59e0b" },
    { label: isFr ? "Architecture Événementielle" : "Distributed Event Mesh", dot: "#38bdf8" },
    { label: isFr ? "Machines d'État Déterministes" : "Deterministic State Machines", dot: "#c084fc" },
    { label: isFr ? "Requêtes Sous-Milliseconde" : "Sub-Millisecond Query Engine", dot: "#10b981" },
    { label: isFr ? "Orchestration LangGraph" : "LangGraph Multi-Agent Workflows", dot: "#38bdf8" },
  ];

  return (
    <div className="story-chapter story-chapter-interactive" id="about-section">
      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(36px, 5vw, 56px)",
        }}
      >
        {/* ── Section Title Header (Kinetic & Moving) ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            textAlign: "center",
            maxWidth: "880px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Ambient Kinetic Floating Light Orbs */}
          <div
            style={{
              position: "absolute",
              inset: "-40px -20px",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 15, 0],
                scale: [1, 1.15, 0.9, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "10%",
                left: "20%",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <motion.div
              animate={{
                x: [0, -35, 25, 0],
                y: [0, 20, -18, 0],
                scale: [1, 0.88, 1.2, 1],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "20%",
                right: "20%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, transparent 70%)",
                filter: "blur(42px)",
              }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Engineering Beacon Badge with Dual-Ring Radar Ping */}
            <div
              className="section-badge"
              style={{
                justifyContent: "center",
                margin: "0 auto 14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 9,
                  height: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 2.5], opacity: [0.75, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "var(--sky-400)",
                  }}
                />
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--sky-400)",
                    boxShadow: "0 0 10px var(--sky-400)",
                  }}
                />
              </div>
              <span style={{ fontWeight: 600, letterSpacing: "0.14em" }}>
                {isFr ? "CHAPITRE 02 — ARCHITECTURE & IDENTITÉ" : "CHAPTER 02 — ARCHITECTURAL BLUEPRINT"}
              </span>
              <span style={{ color: "var(--text-dim)" }}>//</span>
              <span style={{ color: "var(--sky-400)", fontWeight: 600 }}>
                {isFr ? "MÉTHODOLOGIE SYSTÈME" : "CORE METHODOLOGY"}
              </span>
            </div>

            {/* Master Section Headline with Fluid Aurora Flow */}
            <h2
              className="section-title"
              style={{
                fontSize: "clamp(2.3rem, 4.4vw, 3.6rem)",
                marginTop: "8px",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
              }}
            >
              {isFr ? (
                <>
                  Architecte de{" "}
                  <motion.span
                    className="text-aurora"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% auto",
                      display: "inline-block",
                    }}
                  >
                    Systèmes Intelligents
                  </motion.span>{" "}
                  &amp; Codebases Scalables
                </>
              ) : (
                <>
                  Architecting{" "}
                  <motion.span
                    className="text-aurora"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% auto",
                      display: "inline-block",
                    }}
                  >
                    Intelligent Systems
                  </motion.span>{" "}
                  &amp; Scalable Codebases
                </>
              )}
            </h2>

            {/* Laser Horizon Scanning Beam */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                height: "1px",
                margin: "14px auto 0",
                background: "rgba(255, 255, 255, 0.08)",
                overflow: "hidden",
                borderRadius: "1px",
              }}
            >
              <motion.div
                animate={{ x: ["-100%", "260%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
                style={{
                  width: "45%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, #38bdf8, #818cf8, transparent)",
                  boxShadow: "0 0 10px #38bdf8",
                }}
              />
            </div>

            {/* Architectural Thesis Subtitle */}
            <p
              className="section-sub"
              style={{
                margin: "16px auto 0",
                maxWidth: "680px",
                fontSize: "clamp(0.96rem, 1.15vw, 1.08rem)",
                lineHeight: 1.65,
                color: "var(--text-muted)",
              }}
            >
              {isFr
                ? "Une approche d'ingénierie rigoureuse alliant architectures backend déterministes, orchestration d'agents IA autonomes et interfaces web ultra-réactives."
                : "A disciplined engineering approach unifying deterministic backend architectures, autonomous AI agent pipelines, and high-performance interactive web systems."}
            </p>

            {/* Continuous Kinetic Streaming Telemetry Marquee */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "880px",
                margin: "24px auto 0",
                overflow: "hidden",
                maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              }}
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                whileHover={{ transition: { duration: 60 } }}
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "max-content",
                  padding: "4px 0",
                  cursor: "default",
                }}
              >
                {[...CAPABILITIES, ...CAPABILITIES].map((pill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="glass"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "5px 14px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(15, 23, 42, 0.6)",
                      backdropFilter: "blur(12px)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--text-main)",
                      letterSpacing: "0.03em",
                      whiteSpace: "nowrap",
                      transition: "border-color 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = pill.dot;
                      e.currentTarget.style.boxShadow = `0 0 14px -2px ${pill.dot}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: pill.dot,
                        boxShadow: `0 0 8px ${pill.dot}`,
                      }}
                    />
                    <span>{pill.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Main 2-Column Blueprint Grid ── */}
        <div
          className="about-split-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: "clamp(24px, 4vw, 44px)",
            alignItems: "stretch",
          }}
        >
          {/* ════════════════════════════════════════════════════
              LEFT COLUMN: Editorial Narrative & 3 Core Principles
             ════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "22px" }}
          >
            {/* Bio Narrative Card */}
            <div
              className="glass-card"
              style={{
                padding: "clamp(22px, 3.5vw, 32px)",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                background: "var(--glass-card-bg)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--sky-400)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                ◈ {isFr ? "INGÉNIERIE & APPROCHE" : "ENGINEERING PHILOSOPHY"}
              </div>

              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
                  color: "var(--text-heading)",
                  lineHeight: 1.72,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {t.about.p1}
              </p>

              <p
                style={{
                  fontSize: "clamp(0.88rem, 1.05vw, 0.95rem)",
                  color: "var(--text-muted)",
                  lineHeight: 1.68,
                  margin: 0,
                }}
              >
                {t.about.p2}
              </p>

              {/* Quote pill */}
              <div
                style={{
                  marginTop: "8px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  borderLeft: "3px solid var(--violet-400)",
                  background: "rgba(139, 92, 246, 0.05)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.88rem",
                  fontStyle: "italic",
                  color: "var(--text-heading)",
                  lineHeight: 1.5,
                }}
              >
                &ldquo;{t.about.quote}&rdquo;
              </div>
            </div>

            {/* 3 Core Principles List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  paddingLeft: "4px",
                  fontWeight: 600,
                }}
              >
                {isFr ? "3 PRINCIPES D'ARCHITECTURE" : "3 ARCHITECTURAL PILLARS"}
              </div>

              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.num}
                  className="glass"
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    background: "rgba(255, 255, 255, 0.02)",
                    transition: "border-color 0.25s ease, transform 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = principle.color;
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: principle.color,
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {principle.num}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "var(--text-heading)",
                      }}
                    >
                      {principle.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                        marginTop: "3px",
                        lineHeight: 1.5,
                      }}
                    >
                      {principle.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              RIGHT COLUMN: Interactive Architectural Tab Deck
             ════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Tab Selector Buttons */}
            <div
              className="glass"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                padding: "6px",
                borderRadius: "16px",
                background: "var(--glass-strong-bg)",
                border: "1px solid var(--glass-border)",
                gap: "4px",
              }}
            >
              {BLUEPRINTS.map((item) => {
                const isActive = item.id === activeTabId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTabId(item.id)}
                    style={{
                      position: "relative",
                      padding: "10px 8px",
                      borderRadius: "10px",
                      border: "none",
                      background: "transparent",
                      color: isActive ? "#ffffff" : "var(--text-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      transition: "color 0.25s ease",
                      zIndex: 1,
                    }}
                  >
                    <span>{item.icon}</span>
                    <span className="tab-label-text">{isFr ? item.tabLabel.fr : item.tabLabel.en}</span>

                    {isActive && (
                      <motion.div
                        layoutId="active-blueprint-tab"
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "10px",
                          background: "rgba(56, 189, 248, 0.15)",
                          border: `1px solid ${item.accent}`,
                          boxShadow: `0 0 16px ${item.accent}33`,
                          zIndex: -1,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Architectural Blueprint Card */}
            <div
              className="glass-card"
              style={{
                flex: 1,
                padding: "clamp(24px, 3.5vw, 36px)",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                background: "var(--glass-card-bg)",
                border: "1px solid var(--glass-border)",
                borderTop: `3px solid ${activeBlueprint.accent}`,
                position: "relative",
                overflow: "hidden",
                minHeight: "440px",
              }}
            >
              {/* Soft Ambient Inner Glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: `${activeBlueprint.accent}18`,
                  filter: "blur(50px)",
                  pointerEvents: "none",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBlueprint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}
                >
                  {/* Category & Title */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.64rem",
                        color: activeBlueprint.accent,
                        letterSpacing: "0.18em",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      ◈ {isFr ? activeBlueprint.category.fr : activeBlueprint.category.en}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                        fontWeight: 800,
                        color: "var(--text-heading)",
                        margin: "6px 0 0 0",
                        lineHeight: 1.2,
                      }}
                    >
                      {isFr ? activeBlueprint.title.fr : activeBlueprint.title.en}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(0.92rem, 1.1vw, 1rem)",
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {isFr ? activeBlueprint.description.fr : activeBlueprint.description.en}
                  </p>

                  {/* Architecture Metrics Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "10px",
                    }}
                  >
                    {activeBlueprint.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="glass"
                        style={{
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          background: "rgba(255, 255, 255, 0.02)",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.58rem",
                            color: "var(--text-dim)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {isFr ? metric.label.fr : metric.label.en}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.15rem",
                            fontWeight: 800,
                            color: activeBlueprint.accent,
                            marginTop: "3px",
                          }}
                        >
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Production Stack */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--text-dim)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      {isFr ? "STACK VALIDÉ EN PRODUCTION" : "PRODUCTION TECH STACK"}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {activeBlueprint.stack.map((item) => (
                        <span
                          key={item}
                          className="glass"
                          style={{
                            padding: "5px 12px",
                            borderRadius: "var(--radius-full)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.7rem",
                            color: "var(--text-main)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            background: "rgba(255, 255, 255, 0.03)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture Pattern Banner */}
                  <div
                    style={{
                      marginTop: "auto",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(56, 189, 248, 0.04)",
                      border: "1px solid rgba(56, 189, 248, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: activeBlueprint.accent, fontSize: "0.9rem" }}>✦</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--text-main)",
                      }}
                    >
                      {isFr ? activeBlueprint.pattern.fr : activeBlueprint.pattern.en}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .tab-label-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
