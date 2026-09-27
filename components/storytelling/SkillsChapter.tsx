"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

interface DomainSkill {
  id: string;
  category: "ai" | "frontend" | "backend" | "devops";
  icon: string;
  tier: { en: string; fr: string };
  title: { en: string; fr: string };
  role: { en: string; fr: string };
  accent: string;
  glowColor: string;
  technologies: string[];
  capabilities: Array<{ en: string; fr: string }>;
  benchmark: { en: string; fr: string };
}

const DOMAINS: DomainSkill[] = [
  {
    id: "ai",
    category: "ai",
    icon: "🤖",
    tier: { en: "PRIMARY ARCHITECTURE · TIER-1", fr: "ARCHITECTURE PRINCIPALE · TIER-1" },
    title: { en: "AI, ML & Autonomous Agents", fr: "IA, Machine Learning & Agents Autonomes" },
    role: {
      en: "Orchestrating stateful multi-agent DAG pipelines using LangGraph, semantic vector search, function calling, and deterministic guardrails.",
      fr: "Orchestration de pipelines DAG multi-agents avec LangGraph, recherche vectorielle sémantique et garde-fous déterministes stricts.",
    },
    accent: "var(--sky-400)",
    glowColor: "rgba(56, 189, 248, 0.25)",
    technologies: ["LangGraph", "Python", "FAISS / Pinecone", "OpenAI / Claude API", "LlamaIndex", "FastAPI", "Prompt Engineering"],
    capabilities: [
      { en: "Stateful Multi-Agent DAG Consensus Loops", fr: "Boucles de consensus d'agents DAG à état" },
      { en: "Semantic Vector Search & Hybrid RAG Retrieval", fr: "Recherche vectorielle & RAG sémantique hybride" },
      { en: "Autonomous Tool Use & Dynamic Function Calling", fr: "Appel de fonctions & utilisation autonome d'outils" },
      { en: "Hallucination Defense & Guardrail Sanitization", fr: "Défense anti-hallucination & validation stricte" },
    ],
    benchmark: { en: "Sub-60ms Routing Latency · Zero Token Leakage", fr: "Latence Routage < 60ms · Zéro Fuite de Tokens" },
  },
  {
    id: "frontend",
    category: "frontend",
    icon: "⚡",
    tier: { en: "CORE INTERFACE · TIER-1", fr: "INTERFACE PRINCIPALE · TIER-1" },
    title: { en: "Frontend & 3D Interactive Platforms", fr: "Frontend & Plateformes Interactives 3D" },
    role: {
      en: "Building ultra-responsive, immersive user interfaces with Next.js 15 Server Components, React 19, Three.js WebGL, and strict TypeScript safety.",
      fr: "Conception d'interfaces web ultra-réactives et immersives avec Next.js 15 Server Components, React 19, Three.js WebGL et TypeScript.",
    },
    accent: "var(--violet-400)",
    glowColor: "rgba(139, 92, 246, 0.25)",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Three.js / R3F", "Tailwind CSS", "Framer Motion", "Vite"],
    capabilities: [
      { en: "React 19 Server Components & Streaming SSR", fr: "React 19 Server Components & Streaming SSR" },
      { en: "Real-Time 3D WebGL / TSL Particle Shaders", fr: "Shaders de particules & WebGL 3D temps réel" },
      { en: "Micro-Interactions & 60fps Kinetic Animations", fr: "Micro-interactions & animations cinétiques à 60fps" },
      { en: "Responsive Design System with Zero Layout Shift", fr: "Design System adaptatif avec zéro saut de mise en page" },
    ],
    benchmark: { en: "98+ Lighthouse Score · < 100ms Core Web Vitals", fr: "Score Lighthouse 98+ · Core Web Vitals < 100ms" },
  },
  {
    id: "backend",
    category: "backend",
    icon: "🔐",
    tier: { en: "SYSTEMS LOGIC · TIER-1", fr: "LOGIQUE SYSTÈME · TIER-1" },
    title: { en: "Backend & Systems Architecture", fr: "Backend & Architecture Systèmes" },
    role: {
      en: "Architecting modular, high-throughput microservices and APIs with NestJS, C# .NET, Node.js, and low-latency database persistence.",
      fr: "Architecture de microservices modulaires et d'APIs à haut débit avec NestJS, C# .NET, Node.js et bases de données optimisées.",
    },
    accent: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.25)",
    technologies: ["NestJS", "Node.js", "C# .NET", "PostgreSQL", "Redis", "GraphQL", "Prisma / Drizzle", "BullMQ"],
    capabilities: [
      { en: "Modular Domain-Driven Design (DDD) & CQRS", fr: "Architecture Domain-Driven Design (DDD) & CQRS" },
      { en: "Sub-25ms Database Query & Aggregation Latency", fr: "Latence requêtes de base de données < 25ms" },
      { en: "OAuth2, OIDC & RS256 Cryptographic JWT Auth", fr: "Auth cryptographique OAuth2, OIDC & JWT RS256" },
      { en: "Event-Driven Message Queues & WebSockets", fr: "Files de messages orientées événements & WebSockets" },
    ],
    benchmark: { en: "99.98% Service Availability · Zero Data Corruption", fr: "Disponibilité 99.98% · Intégrité des données garantie" },
  },
  {
    id: "devops",
    category: "devops",
    icon: "☁️",
    tier: { en: "INFRASTRUCTURE & HARDENING · TIER-1", fr: "INFRASTRUCTURE & SÉCURITÉ · TIER-1" },
    title: { en: "DevOps, Security & Cloud Infrastructure", fr: "DevOps, Sécurité & Infrastructure Cloud" },
    role: {
      en: "Automating zero-downtime cloud deliveries via Docker containerization, Kubernetes orchestration, CI/CD pipelines, and OWASP defense.",
      fr: "Automatisation des déploiements cloud sans interruption via Docker, Kubernetes, pipelines CI/CD et sécurité OWASP.",
    },
    accent: "var(--gold-400)",
    glowColor: "rgba(251, 191, 36, 0.25)",
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "OWASP Top 10", "Linux / Bash", "Nginx", "Prometheus", "TLS 1.3"],
    capabilities: [
      { en: "100% Automated Multi-Stage CI/CD Deployment", fr: "Déploiements CI/CD multi-étapes 100% automatisés" },
      { en: "Zero-Downtime Rolling & Canary Release Flows", fr: "Mises en production continues sans interruption" },
      { en: "OWASP Top 10 Security Audits & Threat Defense", fr: "Audits de sécurité OWASP Top 10 & protection" },
      { en: "Container Orchestration, Health Monitoring & Alerts", fr: "Orchestration de conteneurs & monitoring de santé" },
    ],
    benchmark: { en: "0ms Downtime Releases · Hardened Protocol Security", fr: "Déploiements sans interruption · Sécurité durcie" },
  },
];

const MARQUEE_ITEMS = [
  "Next.js 15", "Python", "NestJS", "TypeScript", "Docker", "LangGraph",
  "PostgreSQL", "React 19", "Kubernetes", "Three.js", "Redis", "C# .NET",
  "OWASP Defense", "GraphQL", "FastAPI", "Tailwind CSS", "GitHub Actions", "FAISS Vector DB",
];

// Interactive 3D Kinetic Card with Mouse Parallax & Dynamic Light Sheen
function KineticSkillCard({
  domain,
  isFr,
}: {
  domain: DomainSkill;
  isFr: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, px: 50, py: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x: x * 10, y: -y * 10, px, py });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, px: 50, py: 50 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        padding: "clamp(24px, 3.5vw, 36px)",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        border: isHovered
          ? `1px solid ${domain.accent}`
          : "1px solid var(--glass-border)",
        borderTop: `3px solid ${domain.accent}`,
        background: "var(--glass-card-bg)",
        position: "relative",
        overflow: "hidden",
        transform: `perspective(900px) rotateY(${coords.x}deg) rotateX(${coords.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.35s ease",
        boxShadow: isHovered
          ? `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${domain.glowColor}`
          : "var(--shadow-card)",
      }}
    >
      {/* ── Dynamic Flash / Cursor Spotlight Sheen ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 280px at ${coords.px}% ${coords.py}%, ${domain.glowColor}, transparent 70%)`,
          pointerEvents: "none",
          opacity: isHovered ? 0.65 : 0.15,
          transition: "opacity 0.3s ease",
          zIndex: 0,
        }}
      />

      {/* ── Living Ambient Drifting Orb ── */}
      <motion.div
        animate={{
          x: [0, 24, -18, 0],
          y: [0, -18, 14, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.2, 0.45, 0.25, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: domain.accent,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Kinetic Radar Scanning Beam ── */}
      <motion.div
        animate={{
          top: ["-20%", "120%"],
          opacity: [0, 0.3, 0.6, 0.3, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent 0%, ${domain.accent} 50%, transparent 100%)`,
          boxShadow: `0 0 10px ${domain.accent}`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Card Content ── */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
        {/* Top Meta Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <motion.span
              animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.4 }}
              style={{ fontSize: "1.3rem" }}
            >
              {domain.icon}
            </motion.span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.64rem",
                color: domain.accent,
                letterSpacing: "0.14em",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {isFr ? domain.tier.fr : domain.tier.en}
            </span>
          </div>

          {/* Pulsing Beacon */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: domain.accent,
                boxShadow: `0 0 10px ${domain.accent}`,
                animation: "pulse-glow 1.8s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Title & Role */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
              fontWeight: 800,
              color: "var(--text-heading)",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {isFr ? domain.title.fr : domain.title.en}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(0.88rem, 1.05vw, 0.96rem)",
              color: "var(--text-muted)",
              lineHeight: 1.65,
              margin: "8px 0 0 0",
            }}
          >
            {isFr ? domain.role.fr : domain.role.en}
          </p>
        </div>

        {/* Production Technologies Pills with Magnetic Hover */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--text-dim)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            {isFr ? "TECHNOLOGIES & OUTILS CLÉS" : "CORE PRODUCTION TECHNOLOGIES"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {domain.technologies.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="glass"
                style={{
                  padding: "5px 12px",
                  borderRadius: "var(--radius-full)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-main)",
                  border: "1px solid var(--glass-border)",
                  background: "var(--glass-bg)",
                  letterSpacing: "0.02em",
                  cursor: "default",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = domain.accent;
                  e.currentTarget.style.color = domain.accent;
                  e.currentTarget.style.boxShadow = `0 0 10px ${domain.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--text-main)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Validated Capabilities Checklist */}
        <div
          style={{
            padding: "14px 16px",
            borderRadius: "14px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              color: "var(--text-dim)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "2px",
              fontWeight: 600,
            }}
          >
            {isFr ? "CAPACITÉS VALIDÉES EN PRODUCTION" : "VALIDATED PRODUCTION CAPABILITIES"}
          </div>
          {domain.capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-heading)",
                fontSize: "0.82rem",
                color: "var(--text-heading)",
                transition: "color 0.2s ease",
              }}
            >
              <span
                style={{
                  color: domain.accent,
                  fontSize: "0.75rem",
                  flexShrink: 0,
                  filter: `drop-shadow(0 0 4px ${domain.accent})`,
                }}
              >
                ✓
              </span>
              <span>{isFr ? cap.fr : cap.en}</span>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Benchmark Ticker Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            borderRadius: "12px",
            background: `linear-gradient(90deg, ${domain.glowColor}, transparent)`,
            border: `1px solid ${domain.accent}33`,
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: domain.accent,
            fontWeight: 600,
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚡
          </motion.span>
          <span>{isFr ? domain.benchmark.fr : domain.benchmark.en}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsChapter() {
  const [filter, setFilter] = useState<string>("all");
  const { t, language } = usePortfolio();

  const isFr = language === "fr";

  const filterTabs = [
    { id: "all", label: isFr ? "Toutes les Technologies (4)" : "All Technologies (4)", icon: "◈" },
    { id: "ai", label: isFr ? "IA & Neural" : "AI & Neural", icon: "🤖" },
    { id: "frontend", label: isFr ? "Frontend & 3D" : "Frontend & 3D", icon: "⚡" },
    { id: "backend", label: isFr ? "Backend & APIs" : "Backend & APIs", icon: "🔐" },
    { id: "devops", label: isFr ? "Cloud & DevOps" : "Cloud & DevOps", icon: "☁️" },
  ];

  const visibleDomains = filter === "all" ? DOMAINS : DOMAINS.filter((d) => d.category === filter);

  return (
    <div className="story-chapter story-chapter-interactive" id="skills-section">
      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(32px, 5vw, 48px)",
        }}
      >
        {/* ── Section Title Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}
        >
          <div className="section-badge" style={{ justifyContent: "center" }}>
            ◈ {t.skills.badge}
          </div>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
              marginTop: "8px",
              lineHeight: 1.12,
            }}
          >
            {t.skills.heading}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
              color: "var(--text-muted)",
              marginTop: "12px",
              lineHeight: 1.65,
            }}
          >
            {t.skills.subheading}
          </p>
        </motion.div>

        {/* ── Interactive Category Filter Pills (Gliding Motion Tab) ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  position: "relative",
                  padding: "8px 18px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  background: "transparent",
                  color: isActive ? "#ffffff" : "var(--text-dim)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "color 0.25s ease",
                  letterSpacing: "0.04em",
                  zIndex: 1,
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>

                {/* Gliding Spring Active Pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-skills-filter-tab"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "999px",
                      background: "rgba(56, 189, 248, 0.16)",
                      border: "1px solid var(--sky-400)",
                      boxShadow: "0 0 16px rgba(56, 189, 248, 0.35)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── The Kinetic Capability Matrix (2x2 Matrix with Motion) ── */}
        <motion.div
          layout
          className="skills-matrix-grid"
          style={{
            display: "grid",
            gridTemplateColumns: visibleDomains.length === 1 ? "1fr" : "1fr 1fr",
            gap: "clamp(20px, 3vw, 28px)",
          }}
        >
          <AnimatePresence>
            {visibleDomains.map((domain) => (
              <KineticSkillCard key={domain.id} domain={domain} isFr={isFr} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── High-Tech Bi-Directional Ecosystem Streams ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 6px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--sky-400)",
                  boxShadow: "0 0 8px var(--sky-400)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--sky-400)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                ◈ {isFr ? "ÉCOSYSTÈME TECHNIQUE COMPLET" : "COMPLETE TECHNICAL ECOSYSTEM"}
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
              }}
            >
              {isFr ? "SURVOLEZ POUR METTRE EN PAUSE · FLUX BI-DIRECTIONNELS" : "HOVER TO PAUSE · BI-DIRECTIONAL STREAMS"}
            </span>
          </div>

          {/* Stream 1: Moving Right to Left */}
          <div className="marquee-track" style={{ padding: "6px 0" }}>
            <div className="marquee-content">
              {[
                { name: "Next.js 15", icon: "▲", tag: "Web & SSR", color: "var(--sky-400)" },
                { name: "LangGraph", icon: "🤖", tag: "AI Agents", color: "var(--sky-400)" },
                { name: "Python 3.12", icon: "🐍", tag: "Neural / APIs", color: "var(--gold-400)" },
                { name: "TypeScript", icon: "TS", tag: "Strict Types", color: "var(--sky-400)" },
                { name: "NestJS", icon: "🔺", tag: "Microservices", color: "#f43f5e" },
                { name: "Docker", icon: "🐳", tag: "Containers", color: "var(--sky-400)" },
                { name: "PostgreSQL", icon: "🐘", tag: "Relational DB", color: "#10b981" },
                { name: "Three.js", icon: "🌐", tag: "3D WebGL", color: "#10b981" },
                { name: "FastAPI", icon: "⚡", tag: "Async APIs", color: "#10b981" },
                { name: "React 19", icon: "⚛️", tag: "Interface", color: "var(--sky-400)" },
                // Duplicate for seamless infinite loop
                { name: "Next.js 15", icon: "▲", tag: "Web & SSR", color: "var(--sky-400)" },
                { name: "LangGraph", icon: "🤖", tag: "AI Agents", color: "var(--sky-400)" },
                { name: "Python 3.12", icon: "🐍", tag: "Neural / APIs", color: "var(--gold-400)" },
                { name: "TypeScript", icon: "TS", tag: "Strict Types", color: "var(--sky-400)" },
                { name: "NestJS", icon: "🔺", tag: "Microservices", color: "#f43f5e" },
                { name: "Docker", icon: "🐳", tag: "Containers", color: "var(--sky-400)" },
                { name: "PostgreSQL", icon: "🐘", tag: "Relational DB", color: "#10b981" },
                { name: "Three.js", icon: "🌐", tag: "3D WebGL", color: "#10b981" },
                { name: "FastAPI", icon: "⚡", tag: "Async APIs", color: "#10b981" },
                { name: "React 19", icon: "⚛️", tag: "Interface", color: "var(--sky-400)" },
              ].map((item, idx) => (
                <div
                  key={`stream1-${idx}`}
                  className="glass"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 18px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--glass-card-bg)",
                    border: "1px solid var(--glass-border)",
                    whiteSpace: "nowrap",
                    cursor: "default",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 6px 20px ${item.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      color: "var(--text-heading)",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      padding: "2px 7px",
                      borderRadius: "999px",
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}33`,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stream 2: Moving Left to Right (Reverse) */}
          <div className="marquee-track" style={{ padding: "6px 0" }}>
            <div className="marquee-content-reverse">
              {[
                { name: "Kubernetes", icon: "☸️", tag: "Orchestration", color: "var(--violet-400)" },
                { name: "Redis", icon: "🔴", tag: "Cache & Queues", color: "#f43f5e" },
                { name: "FAISS / Pinecone", icon: "🧠", tag: "Vector RAG", color: "var(--violet-400)" },
                { name: "GitHub Actions", icon: "⚙️", tag: "CI/CD GitOps", color: "var(--gold-400)" },
                { name: "OWASP Top 10", icon: "🛡️", tag: "App Security", color: "#10b981" },
                { name: "C# .NET 9", icon: "🔷", tag: "Enterprise", color: "var(--violet-400)" },
                { name: "GraphQL", icon: "◈", tag: "Query Layer", color: "#f43f5e" },
                { name: "Tailwind CSS", icon: "🍃", tag: "Styling", color: "var(--sky-400)" },
                { name: "Framer Motion", icon: "✦", tag: "Kinetic UI", color: "var(--gold-400)" },
                { name: "Linux / Bash", icon: "🐧", tag: "Cloud Systems", color: "var(--gold-400)" },
                // Duplicate for seamless infinite loop
                { name: "Kubernetes", icon: "☸️", tag: "Orchestration", color: "var(--violet-400)" },
                { name: "Redis", icon: "🔴", tag: "Cache & Queues", color: "#f43f5e" },
                { name: "FAISS / Pinecone", icon: "🧠", tag: "Vector RAG", color: "var(--violet-400)" },
                { name: "GitHub Actions", icon: "⚙️", tag: "CI/CD GitOps", color: "var(--gold-400)" },
                { name: "OWASP Top 10", icon: "🛡️", tag: "App Security", color: "#10b981" },
                { name: "C# .NET 9", icon: "🔷", tag: "Enterprise", color: "var(--violet-400)" },
                { name: "GraphQL", icon: "◈", tag: "Query Layer", color: "#f43f5e" },
                { name: "Tailwind CSS", icon: "🍃", tag: "Styling", color: "var(--sky-400)" },
                { name: "Framer Motion", icon: "✦", tag: "Kinetic UI", color: "var(--gold-400)" },
                { name: "Linux / Bash", icon: "🐧", tag: "Cloud Systems", color: "var(--gold-400)" },
              ].map((item, idx) => (
                <div
                  key={`stream2-${idx}`}
                  className="glass"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 18px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--glass-card-bg)",
                    border: "1px solid var(--glass-border)",
                    whiteSpace: "nowrap",
                    cursor: "default",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 6px 20px ${item.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      color: "var(--text-heading)",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      padding: "2px 7px",
                      borderRadius: "999px",
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}33`,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          .skills-matrix-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
