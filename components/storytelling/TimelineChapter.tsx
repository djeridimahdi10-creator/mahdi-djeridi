"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

interface TimelineEntry {
  id: string;
  type: "career" | "certification" | "formation";
  period: { en: string; fr: string };
  year: string;
  isCurrent?: boolean;
  isFlagship?: boolean;
  role: { en: string; fr: string };
  org: { en: string; fr: string };
  domain: { en: string; fr: string };
  color: string;
  glowColor: string;
  badge: {
    letter: string;
    background: string;
    boxShadow?: string;
  };
  summary: { en: string; fr: string };
  highlights: Array<{ en: string; fr: string }>;
  technologies: string[];
  credential?: {
    id: string;
    link: string;
    verified: boolean;
    imagePreview?: string;
  };
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: "google-ai",
    type: "certification",
    isFlagship: true,
    period: { en: "AUGUST 3, 2026 · FLAGSHIP", fr: "3 AOÛT 2026 · TITRE PHARE" },
    year: "2026",
    role: {
      en: "Google AI Professional Certificate (7 Courses)",
      fr: "Certification Professionnelle Google AI (7 Cours)",
    },
    org: {
      en: "Google · Coursera Verified Professional Credential",
      fr: "Google · Titre Professionnel Vérifié Coursera",
    },
    domain: {
      en: "Artificial Intelligence & Autonomous Agents",
      fr: "Intelligence Artificielle & Agents Autonomes",
    },
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.35)",
    badge: {
      letter: "G",
      background: "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)",
      boxShadow: "0 4px 18px rgba(66, 133, 244, 0.45)",
    },
    summary: {
      en: "Comprehensive professional credential issued by Google certifying advanced mastery across 7 specialized courses: AI App Building, Data Analysis, Content Creation, Research, and Prompt Engineering, with a portfolio of 20+ production AI artifacts.",
      fr: "Certification professionnelle complète délivrée par Google validant la maîtrise de 7 cours spécialisés : création d'applications IA, analyse de données, recherche sémantique et ingénierie de prompts, avec un portfolio de plus de 20 artefacts IA.",
    },
    highlights: [
      {
        en: "7 Specialized Courses: AI Fundamentals, App Building, Data Analysis, Research & Insights, Content Creation, and Prompt Steering.",
        fr: "7 Cours Spécialisés : Fondamentaux IA, Création d'Apps, Analyse de Données, Recherche & Insights, et Ingénierie de Prompts.",
      },
      {
        en: "Engineered 20+ Generative AI Artifacts and coded custom autonomous AI solutions solving workplace challenges.",
        fr: "Conception de plus de 20 artefacts d'IA générative et développement d'une solution IA sur-mesure pour cas réels d'entreprise.",
      },
      {
        en: "Mastered effective prompt engineering, LLM output evaluation, and responsible enterprise AI integration.",
        fr: "Maîtrise de l'ingénierie de prompts avancée, évaluation des sorties de modèles et intégration IA responsable.",
      },
    ],
    technologies: ["Google AI", "AI for App Building", "Prompt Engineering", "Data Analysis", "Autonomous Agents", "Python"],
    credential: {
      id: "YS26JC7JM5VP",
      link: "https://coursera.org/verify/professional-cert/YS26JC7JM5VP",
      verified: true,
      imagePreview: "/google-ai-cert.png",
    },
  },
  {
    id: "bnh-cbs",
    type: "career",
    period: { en: "2025 — PRESENT", fr: "2025 — PRÉSENT" },
    year: "2025",
    isCurrent: true,
    role: {
      en: "Core Banking System (CBS) & Full-Stack Engineer",
      fr: "Ingénieur Core Banking (CBS) & Full-Stack",
    },
    org: {
      en: "BNH (Banque Nationale de l'Habitat) · Banking Infrastructure & Data Center",
      fr: "BNH (Banque Nationale de l'Habitat) · Systèmes Bancaires & Data Center",
    },
    domain: {
      en: "Banking & Financial Systems",
      fr: "Systèmes Bancaires & Finance",
    },
    color: "#00f5ff",
    glowColor: "rgba(0, 245, 255, 0.28)",
    badge: {
      letter: "B",
      background: "linear-gradient(135deg, #0284c7, #00f5ff)",
      boxShadow: "0 4px 16px rgba(0, 245, 255, 0.35)",
    },
    summary: {
      en: "Driving strategic banking modernization towards Temenos Core Banking System (CBS), while architecting and fortifying satellite banking applications connected to legacy CBS SYBU.",
      fr: "Pilotage de la modernisation bancaire vers le Core Banking Temenos, tout en concevant et sécurisant les applications satellites connectées au CBS SYBU.",
    },
    highlights: [
      {
        en: "Strategic transition towards Temenos CBS: technical requirement analysis, peripheral module mapping, and transaction interface integration.",
        fr: "Transition stratégique vers Temenos CBS : analyse technique, cartographie des flux et intégration des modules périphériques.",
      },
      {
        en: "Engineered critical satellite banking applications on CBS SYBU: Monetics (cards & ATM clearing), Central Risk (CDR), and Payment Default Central.",
        fr: "Conception d'applications satellites critiques sur CBS SYBU : Monétique (cartes & transactions), Centrale des Risques (CDR) et Centrale des Impayés.",
      },
      {
        en: "Architected high-throughput ASP.NET Core (C# .NET 8) APIs and optimized mission-critical SQL Server stored procedures for real-time banking operations.",
        fr: "Architecture d'APIs sécurisées ASP.NET Core (C# .NET 8) et optimisation de procédures stockées SQL Server à haute criticité.",
      },
      {
        en: "Trained in secure Data Center installation, high availability clustering, failover topologies, and banking regulatory compliance.",
        fr: "Déploiement en Data Center bancaire sécurisé, clustering de bases de données, haute disponibilité et conformité réglementaire.",
      },
    ],
    technologies: ["C# .NET 8", "ASP.NET Core", "Temenos CBS", "SYBU CBS", "SQL Server", "Monetics", "Data Center", "High Availability"],
  },
  {
    id: "cbs-datacenter",
    type: "formation",
    period: { en: "2025 — 2026", fr: "2025 — 2026" },
    year: "2025",
    role: {
      en: "Core Banking (CBS) & Data Center Deployment Formation",
      fr: "Formation Core Banking (CBS) & Déploiement Data Center",
    },
    org: {
      en: "Enterprise Banking Infrastructure Training",
      fr: "Formation d'Infrastructure Bancaire d'Entreprise",
    },
    domain: {
      en: "Data Center Infrastructure & HA",
      fr: "Infrastructure Data Center & HA",
    },
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.28)",
    badge: {
      letter: "C",
      background: "linear-gradient(135deg, #10b981, #059669)",
      boxShadow: "0 4px 16px rgba(16, 185, 129, 0.35)",
    },
    summary: {
      en: "Specialized training on installing, configuring, and operating Core Banking System (CBS) stacks within secure enterprise Tier-3 Data Centers.",
      fr: "Formation spécialisée sur le déploiement, la configuration et l'exploitation des environnements Core Banking en Data Centers sécurisés Tier-3.",
    },
    highlights: [
      {
        en: "Temenos & SYBU CBS application tier installation, multi-node clustering, and SAN storage integration.",
        fr: "Installation des tiers applicatifs Temenos & SYBU, clustering multi-nœuds et stockage SAN.",
      },
      {
        en: "High-availability active-passive and active-active failover mechanisms with automated disaster recovery procedures.",
        fr: "Mécanismes de basculement haute disponibilité actif-passif et actif-actif avec procédures de reprise d'activité.",
      },
      {
        en: "Banking network zoning, DMZ segregation, and stringent financial regulatory security compliance.",
        fr: "Segmentation réseau bancaire, isolation DMZ et conformité aux normes réglementaires de sécurité financière.",
      },
    ],
    technologies: ["Temenos", "Data Center Tier-3", "Cluster Failover", "High Availability", "SAN Storage", "SQL Server HA"],
  },
  {
    id: "devops-formation",
    type: "formation",
    period: { en: "2025", fr: "2025" },
    year: "2025",
    role: {
      en: "DevOps & Cloud Automation Engineering",
      fr: "Ingénierie DevOps & Automatisation Cloud",
    },
    org: {
      en: "Professional DevOps Formation",
      fr: "Formation Professionnelle DevOps",
    },
    domain: {
      en: "Cloud Infrastructure & CI/CD",
      fr: "Infrastructure Cloud & CI/CD",
    },
    color: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.28)",
    badge: {
      letter: "D",
      background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
      boxShadow: "0 4px 16px rgba(139, 92, 246, 0.35)",
    },
    summary: {
      en: "Intensive professional formation covering containerization, automated multi-stage CI/CD pipelines, Linux server administration, and production observability.",
      fr: "Formation intensive couvrant la conteneurisation, les pipelines CI/CD multi-étapes automatisés, l'administration Linux et l'observabilité en production.",
    },
    highlights: [
      {
        en: "Docker multi-stage builds, container security hardening, and production image footprint reduction.",
        fr: "Builds Docker multi-étapes, renforcement de la sécurité des conteneurs et réduction d'empreinte des images.",
      },
      {
        en: "Automated GitHub Actions CI/CD workflows with automated linting, test suites, and zero-downtime rolling deploys.",
        fr: "Workflows CI/CD GitHub Actions avec tests automatisés et déploiements continus sans coupure.",
      },
      {
        en: "Prometheus & Grafana metric dashboards, central logging, and proactive uptime alerting.",
        fr: "Tableaux de bord de métriques Prometheus & Grafana, centralisation des logs et alertes proactives.",
      },
    ],
    technologies: ["Docker", "GitHub Actions", "CI/CD", "Linux / Bash", "Nginx", "Prometheus", "Grafana", "Cloud Deployments"],
  },
  {
    id: "web-systems",
    type: "career",
    period: { en: "2024 — 2025", fr: "2024 — 2025" },
    year: "2024",
    role: {
      en: "Lead Full-Stack Web Engineer",
      fr: "Ingénieur Web Full-Stack Principal",
    },
    org: {
      en: "Interactive Web Systems & Platforms",
      fr: "Plateformes Interactives & Systèmes Web",
    },
    domain: {
      en: "Web Applications & Simulator Engines",
      fr: "Applications Web & Moteurs Interactifs",
    },
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.28)",
    badge: {
      letter: "W",
      background: "linear-gradient(135deg, #f59e0b, #d97706)",
      boxShadow: "0 4px 16px rgba(251, 191, 36, 0.35)",
    },
    summary: {
      en: "Architected and delivered scalable production web applications, including PC Labs (Interactive Hardware Simulator) and Aura Bags (Industrial B2B Manufacturing Portal).",
      fr: "Conception et livraison d'applications web en production, dont PC Labs (Simulateur Matériel) et Aura Bags (Portail Industriel B2B).",
    },
    highlights: [
      {
        en: "Architected PC Labs: interactive hardware configuration and real-time compatibility solver with 60fps UI.",
        fr: "Conception de PC Labs : configurateur de matériel interactif et solveur de compatibilité en temps réel à 60fps.",
      },
      {
        en: "Built Aura Bags: full-scale B2B industrial packaging portal with dynamic GSM calculator and order tracking.",
        fr: "Développement d'Aura Bags : portail B2B de fabrication de sacs avec configurateur de grammage et suivi de commandes.",
      },
      {
        en: "Built reactive web applications using Next.js 15, TypeScript, NestJS microservices, and PostgreSQL.",
        fr: "Développement d'applications web réactives avec Next.js 15, TypeScript, microservices NestJS et PostgreSQL.",
      },
    ],
    technologies: ["Next.js", "React", "TypeScript", "NestJS", "Tailwind CSS", "PostgreSQL", "Vercel"],
  },
];

type FilterType = "all" | "career" | "certifications";

export default function TimelineChapter() {
  const { language } = usePortfolio();
  const isFr = language === "fr";

  const [filter, setFilter] = useState<FilterType>("all");
  const [certModalOpen, setCertModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredEntries = TIMELINE_ENTRIES.filter((entry) => {
    if (filter === "all") return true;
    if (filter === "career") return entry.type === "career";
    if (filter === "certifications") return entry.type === "certification" || entry.type === "formation";
    return true;
  });

  return (
    <div
      className="story-chapter story-chapter-interactive"
      style={{
        padding: "clamp(80px, 12vh, 140px) var(--section-padding-x)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1040px",
          display: "flex",
          flexDirection: "column",
          gap: "36px",
          margin: "0 auto",
        }}
      >
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <div
            className="section-badge"
            style={{
              justifyContent: "center",
              margin: "0 auto",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--sky-400)",
                boxShadow: "0 0 10px var(--sky-400)",
              }}
            />
            {isFr ? "CHAPITRE 06 · PARCOURS D'INGÉNIERIE" : "CHAPTER 06 · CAREER TIMELINE"}
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.9rem)",
              marginTop: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            {isFr ? (
              <>
                Parcours d'Ingénierie &{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--sky-400) 30%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Jalons Majeurs
                </span>
              </>
            ) : (
              <>
                Engineering Journey &{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--sky-400) 30%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Milestones
                </span>
              </>
            )}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(0.85rem, 1.1vw, 0.96rem)",
              color: "var(--text-muted)",
              marginTop: "6px",
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.5",
            }}
          >
            {isFr
              ? "Évolution technique, certifications professionnelles validées et déploiements de systèmes d'entreprise en production."
              : "Technical growth, verified professional credentials, and mission-critical enterprise production deployments."}
          </p>
        </motion.div>

        {/* ── Studio Metrics Ribbon (4 Linear Stats) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="timeline-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {[
            {
              metric: "Google AI",
              label: isFr ? "Certifié Professionnel" : "Professional Credential",
              sub: isFr ? "Coursera ID vérifié" : "Coursera Verified ID",
              accent: "#38bdf8",
            },
            {
              metric: "3+ Years",
              label: isFr ? "Ingénierie de Systèmes" : "Systems Engineering",
              sub: isFr ? "Plein cycle & production" : "Full-lifecycle production",
              accent: "var(--sky-400)",
            },
            {
              metric: "Temenos & SYBU",
              label: isFr ? "Systèmes Bancaires (CBS)" : "Core Banking Systems",
              sub: isFr ? "BNH · Monétique & Risques" : "BNH · Monetics & Risk",
              accent: "#10b981",
            },
            {
              metric: "Data Center",
              label: isFr ? "Haute Disponibilité" : "High Availability",
              sub: isFr ? "Clustering & failover" : "Clustering & failover",
              accent: "#8b5cf6",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "14px 18px",
                borderRadius: "var(--radius-md)",
                background: "var(--glass-card-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(16px)",
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: stat.accent,
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.metric}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--text-heading)",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--text-dim)",
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Segmented Category Filter Bar ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "999px",
              padding: "4px 6px",
              backdropFilter: "blur(18px)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            {[
              { id: "all", label: isFr ? "✦ Tous les Jalons" : "✦ All Milestones", count: TIMELINE_ENTRIES.length },
              { id: "certifications", label: isFr ? "🎓 Certifications & Formations" : "🎓 Certifications & Formations", count: 3 },
              { id: "career", label: isFr ? "💼 Parcours Bancaire & Web" : "💼 Career & Banking", count: 2 },
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as FilterType)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    borderRadius: "999px",
                    background: isActive ? "rgba(56, 189, 248, 0.15)" : "transparent",
                    border: `1px solid ${isActive ? "var(--sky-400)" : "transparent"}`,
                    color: isActive ? "#ffffff" : "var(--text-muted)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.8rem",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isActive ? "0 0 20px rgba(56, 189, 248, 0.3)" : "none",
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      padding: "1px 5px",
                      borderRadius: "999px",
                      background: isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "#ffffff" : "var(--text-dim)",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Kinetic Interactive Timeline Pipeline ── */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Luminous Animated Energy Spine */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              bottom: "15px",
              left: "24px",
              width: "2px",
              background: "linear-gradient(180deg, #38bdf8 0%, #00f5ff 25%, #10b981 50%, #8b5cf6 75%, #fbbf24 100%)",
              boxShadow: "0 0 12px rgba(56, 189, 248, 0.4)",
              zIndex: 0,
            }}
          />

          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry, idx) => (
              <TimelineCard
                key={entry.id}
                entry={entry}
                index={idx}
                language={language}
                isFr={isFr}
                onOpenCertPreview={() => setCertModalOpen(true)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── High-Resolution Certificate Lightbox Modal ── */}
      <AnimatePresence>
        {certModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCertModalOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(4, 4, 12, 0.88)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              pointerEvents: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong"
              style={{
                width: "100%",
                maxWidth: "880px",
                background: "var(--glass-strong-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(66, 133, 244, 0.35)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Certificate Modal Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  background: "var(--glass-bg)",
                  borderBottom: "1px solid var(--glass-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#4285F4" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EA4335" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FBBC05" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#34A853" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-heading)",
                      marginLeft: "6px",
                    }}
                  >
                    Google AI Professional Certificate · Mahdi Djeridi
                  </span>
                </div>

                <button
                  onClick={() => setCertModalOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    padding: "0 4px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Certificate High-Res Image Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  background: "#030308",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/google-ai-cert.png"
                  alt="Google AI Professional Certificate — Mahdi Djeridi"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.7)",
                    display: "block",
                  }}
                />
              </div>

              {/* Modal Action Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "var(--glass-bg)",
                  borderTop: "1px solid var(--glass-border)",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "#10b981",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid rgba(16, 185, 129, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                    VERIFIED CREDENTIAL ID: YS26JC7JM5VP
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <a
                    href="https://coursera.org/verify/professional-cert/YS26JC7JM5VP"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      background: "linear-gradient(135deg, #4285F4, #0284c7)",
                      border: "1px solid #4285F4",
                      padding: "8px 18px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      boxShadow: "0 4px 16px rgba(66, 133, 244, 0.4)",
                    }}
                  >
                    <span>{isFr ? "Vérifier sur Coursera ↗" : "Verify on Coursera ↗"}</span>
                  </a>
                  <button
                    onClick={() => setCertModalOpen(false)}
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--glass-border)",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      cursor: "pointer",
                    }}
                  >
                    {isFr ? "Fermer" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TimelineCard({
  entry,
  index,
  language,
  isFr,
  onOpenCertPreview,
}: {
  entry: TimelineEntry;
  index: number;
  language: "en" | "fr";
  isFr: boolean;
  onOpenCertPreview?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 3;
    const rotateX = -((y - centerY) / centerY) * 3;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setTilt({ rotateX, rotateY, shineX, shineY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="timeline-entry-row"
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "flex-start",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Timeline Node Emblem */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="timeline-node-emblem"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "14px",
          background: "var(--glass-strong-bg)",
          border: `2px solid ${entry.color}`,
          boxShadow: `0 0 20px ${entry.glowColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          zIndex: 2,
          position: "relative",
          backdropFilter: "blur(12px)",
          cursor: "default",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "9px",
            background: entry.badge.background,
            boxShadow: entry.badge.boxShadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          {entry.badge.letter}
        </div>
      </motion.div>

      {/* 3D Mouse Parallax Milestone Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card timeline-milestone-card"
        style={{
          flex: 1,
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.12s ease-out, border-color 0.3s ease",
          borderRadius: "var(--radius-xl)",
          background: "var(--glass-card-bg)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: `1px solid ${entry.isFlagship ? "rgba(66, 133, 244, 0.6)" : `${entry.color}40`}`,
          boxShadow: entry.isFlagship
            ? "0 18px 48px rgba(0, 0, 0, 0.65), 0 0 35px rgba(66, 133, 244, 0.35)"
            : `0 14px 40px rgba(0, 0, 0, 0.55), 0 0 25px ${entry.glowColor}`,
          padding: "clamp(20px, 3vw, 28px)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {/* Period + Live/Flagship Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: entry.color,
                letterSpacing: "0.14em",
              }}
            >
              {entry.period[language]}
            </span>

            {entry.isFlagship && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "3px 9px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, rgba(66,133,244,0.2), rgba(52,168,83,0.2))",
                  border: "1px solid rgba(66, 133, 244, 0.5)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                <span>★</span>
                <span>{isFr ? "TITRE PHARE · TIER-1" : "TIER-1 CREDENTIAL"}</span>
              </span>
            )}

            {entry.isCurrent && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: `${entry.color}15`,
                  border: `1px solid ${entry.color}40`,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: entry.color,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: entry.color,
                    boxShadow: `0 0 6px ${entry.color}`,
                    animation: "pulse-glow 2s infinite ease-in-out",
                  }}
                />
                {isFr ? "ACTIF" : "ACTIVE ROLE"}
              </span>
            )}
          </div>

          {/* Domain Capsule */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--text-dim)",
              padding: "3px 10px",
              borderRadius: "999px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            {entry.domain[language]}
          </span>
        </div>

        {/* Role & Org Identity */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.2rem, 1.9vw, 1.55rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              lineHeight: "1.25",
              letterSpacing: "-0.01em",
            }}
          >
            {entry.role[language]}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: entry.color,
              marginTop: "4px",
              letterSpacing: "0.03em",
            }}
          >
            {entry.org[language]}
          </p>
        </div>

        {/* Summary */}
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.86rem",
            color: "var(--text-muted)",
            lineHeight: "1.6",
          }}
        >
          {entry.summary[language]}
        </p>

        {/* Highlights List */}
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            paddingLeft: 0,
            listStyle: "none",
            marginTop: "2px",
          }}
        >
          {entry.highlights.map((hl, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.82rem",
                color: "var(--text-main)",
                lineHeight: "1.5",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: entry.color,
                  fontSize: "0.75rem",
                  marginTop: "3px",
                  flexShrink: 0,
                }}
              >
                ▸
              </span>
              <span>{hl[language]}</span>
            </li>
          ))}
        </ul>

        {/* ── High-Impact Credential Action Center (Special for Certifications) ── */}
        {entry.credential && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              padding: "14px 16px",
              borderRadius: "var(--radius-md)",
              background: "rgba(66, 133, 244, 0.08)",
              border: "1px solid rgba(66, 133, 244, 0.35)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
              marginTop: "2px",
            }}
          >
            {/* Left: Thumbnail & Credential ID */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {entry.credential.imagePreview && (
                <div
                  onClick={onOpenCertPreview}
                  title={isFr ? "Cliquer pour agrandir" : "Click to enlarge"}
                  style={{
                    width: "56px",
                    height: "42px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid rgba(66, 133, 244, 0.5)",
                    cursor: "pointer",
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                    position: "relative",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.credential.imagePreview}
                    alt="Certificate thumbnail"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0, 0, 0, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontSize: "0.8rem",
                    }}
                  >
                    🔍
                  </div>
                </div>
              )}

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-heading)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                  <span>{isFr ? "Diplôme Authentifié" : "Verified Credential"}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--sky-400)",
                    letterSpacing: "0.08em",
                    marginTop: "2px",
                  }}
                >
                  ID: {entry.credential.id}
                </div>
              </div>
            </div>

            {/* Right: Explicit Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {/* Preview Button */}
              {onOpenCertPreview && (
                <motion.button
                  onClick={onOpenCertPreview}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "9px 16px",
                    borderRadius: "999px",
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-heading)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--sky-400)";
                    e.currentTarget.style.color = "var(--sky-400)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.color = "var(--text-heading)";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{isFr ? "Aperçu du Diplôme" : "Preview Certificate"}</span>
                </motion.button>
              )}

              {/* Verify Credential Button */}
              <motion.a
                href={entry.credential.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "9px 18px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  border: "1px solid #10b981",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 18px rgba(16, 185, 129, 0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{isFr ? "Vérifier sur Coursera" : "Verify Credential (Coursera)"}</span>
                <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1 10L10 1M10 1H3M10 1V8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </div>
          </div>
        )}

        {/* Technologies Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            paddingTop: "10px",
            borderTop: "1px solid var(--glass-border)",
            marginTop: "2px",
          }}
        >
          {/* Tech Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {entry.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  background: "var(--glass-bg)",
                  color: "var(--text-main)",
                  border: "1px solid var(--glass-border)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = entry.color;
                  e.currentTarget.style.color = entry.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--text-main)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              color: "var(--text-dim)",
              letterSpacing: "0.1em",
            }}
          >
            {entry.type === "certification" ? "VERIFIED CERTIFICATION" : entry.type === "career" ? "ENTERPRISE ROLE" : "FORMATION"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
