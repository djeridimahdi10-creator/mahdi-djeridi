"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

interface PipelinePhase {
  id: number;
  stepNumber: string;
  name: { en: string; fr: string };
  category: { en: string; fr: string };
  desc: { en: string; fr: string };
  accent: string;
  glow: string;
  icon: string;
  telemetry: {
    metric1: { label: { en: string; fr: string }; value: string };
    metric2: { label: { en: string; fr: string }; value: string };
  };
  payload: string;
  technologies: string[];
}

const PHASES: PipelinePhase[] = [
  {
    id: 0,
    stepNumber: "01",
    name: { en: "Ingestion & Context Embedding", fr: "Ingestion & Vectorisation Sémantique" },
    category: { en: "TOKENIZATION & VECTOR EMBEDDING", fr: "TOKENISATION & PROJECTION VECTORIELLE" },
    desc: {
      en: "Raw user intent or streaming payload is ingested, tokenized, and projected into 1536-dimensional semantic vector space via high-speed embeddings.",
      fr: "L'intention brute ou le flux de données entrant est analysé, tokenisé et projeté dans un espace sémantique à 1536 dimensions à haute vitesse.",
    },
    accent: "var(--sky-400)",
    glow: "rgba(56, 189, 248, 0.25)",
    icon: "📥",
    telemetry: {
      metric1: { label: { en: "Context Window", fr: "Fenêtre Contexte" }, value: "128k Tokens" },
      metric2: { label: { en: "Vector Latency", fr: "Latence Vecteur" }, value: "4.8 ms" },
    },
    payload: `input: "deploy autonomous security guardrail"
-> tokens: 1,420 | dim: 1536 | cosine_norm: 0.998`,
    technologies: ["FastAPI", "Python", "tiktoken", "LangChain Core"],
  },
  {
    id: 1,
    stepNumber: "02",
    name: { en: "Neural Multi-Agent Routing", fr: "Routage Neuronal Multi-Agents" },
    desc: {
      en: "LangGraph DAG evaluates intent, resolves agent routing, executes function calling schemas, and validates safety constraints against LLM hallucination.",
      fr: "Le graphe DAG LangGraph évalue l'intention, distribue la tâche aux agents spécialisés et vérifie les contraintes de sécurité sans hallucination.",
    },
    category: { en: "LANGGRAPH ORCHESTRATION & REASONING", fr: "ORCHESTRATION LANGGRAPH & RAISONNEMENT" },
    accent: "var(--violet-400)",
    glow: "rgba(139, 92, 246, 0.25)",
    icon: "🧠",
    telemetry: {
      metric1: { label: { en: "Agent Consensus", fr: "Consensus Agents" }, value: "3/3 Nodes" },
      metric2: { label: { en: "Reasoning Time", fr: "Temps Raisonnement" }, value: "22.4 ms" },
    },
    payload: `agent_graph.dispatch(target="SecurityAuditorNode")
-> state: consensus_reached | guardrails: verified`,
    technologies: ["LangGraph", "Claude 3.5 API", "OpenAI GPT-4o", "StateGraph"],
  },
  {
    id: 2,
    stepNumber: "03",
    name: { en: "Hybrid Vector Memory Retrieval", fr: "Recherche en Mémoire Vectorielle Hybride" },
    desc: {
      en: "Hybrid semantic & BM25 keyword search retrieves contextual domain knowledge from Pinecone / FAISS vector stores with sub-10ms similarity clustering.",
      fr: "Recherche hybride sémantique et par mots-clés dans les bases vectorielles Pinecone / FAISS avec clustering de similarité sous les 10ms.",
    },
    category: { en: "HYBRID RAG & STATE PERSISTENCE", fr: "RAG HYBRIDE & PERSISTANCE D'ÉTAT" },
    accent: "#10b981",
    glow: "rgba(16, 185, 129, 0.25)",
    icon: "🗄️",
    telemetry: {
      metric1: { label: { en: "Similarity Top-K", fr: "Top-K Similarité" }, value: "0.942 Cosine" },
      metric2: { label: { en: "Index Query", fr: "Requête Index" }, value: "7.9 ms" },
    },
    payload: `vector_store.similarity_search(query_vec, k=5)
-> hits: 5/5 matched | relevance_score: 94.2%`,
    technologies: ["FAISS", "Pinecone", "Redis Cache", "PostgreSQL pgvector"],
  },
  {
    id: 3,
    stepNumber: "04",
    name: { en: "Deterministic Output & API Execution", fr: "Sortie Déterministe & Exécution d'API" },
    desc: {
      en: "Structured JSON schema generation, OWASP Zero-Trust security validation, and immediate execution via microservice API endpoints or WebSockets.",
      fr: "Génération de schémas JSON structurés, validation de sécurité OWASP Zero-Trust et exécution immédiate via les endpoints de microservices.",
    },
    category: { en: "STRUCTURED JSON & MICROSERVICE CALL", fr: "JSON STRUCTURÉ & APPEL DE MICROSERVICES" },
    accent: "var(--gold-400)",
    glow: "rgba(251, 191, 36, 0.25)",
    icon: "🚀",
    telemetry: {
      metric1: { label: { en: "Safety Audit", fr: "Audit Sécurité" }, value: "100% Pass" },
      metric2: { label: { en: "Execution Time", fr: "Temps Exécution" }, value: "5.6 ms" },
    },
    payload: `api.execute_action(endpoint="/v1/deploy-guardrail")
-> http_status: 200 OK | execution_time: 40.7ms`,
    technologies: ["NestJS", "Docker Engine", "TypeScript", "REST / WebSockets"],
  },
];

export default function DataFlowChapter() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const { t, language } = usePortfolio();

  const isFr = language === "fr";

  // Auto-run simulation step progression when triggered
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= PHASES.length - 1) {
            setIsSimulating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const runSimulation = () => {
    setActiveStep(0);
    setIsSimulating(true);
  };

  const currentPhase = PHASES[activeStep];

  return (
    <div className="story-chapter story-chapter-interactive" id="flow-section">
      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(36px, 5vw, 52px)",
        }}
      >
        {/* ── Section Title Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto" }}
        >
          <div className="section-badge" style={{ justifyContent: "center" }}>
            ◈ {t.flow.badge}
          </div>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
              marginTop: "8px",
              lineHeight: 1.12,
            }}
          >
            {isFr ? "Pipeline de Calcul IA en Temps Réel" : "Real-Time AI Compute Pipeline"}
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
            {isFr
              ? "De l'intention brute de l'utilisateur à l'orchestration multi-agents LangGraph et à l'exécution d'API déterministe."
              : "From raw intent vectorization through LangGraph multi-agent orchestration to deterministic API execution."}
          </p>

          {/* Live 3D Stream Signal Beacon */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "14px",
              padding: "5px 14px",
              borderRadius: "var(--radius-full)",
              background: "rgba(56, 189, 248, 0.06)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
                animation: "pulse-glow 1.8s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.66rem",
                color: "var(--sky-400)",
                letterSpacing: "0.12em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {isFr ? "FLUX 3D SYNCHRONISÉ : 9 000+ PARTICULES ACTIVES" : "SYNCHRONIZED 3D STREAM: 9,000+ PARTICLES ACTIVE"}
            </span>
          </div>
        </motion.div>

        {/* ── Pipeline Stepper & Controls Bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            padding: "0 4px",
          }}
        >
          {/* Phase Selector Buttons */}
          <div
            className="glass"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px",
              borderRadius: "var(--radius-full)",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              flexWrap: "wrap",
            }}
          >
            {PHASES.map((phase) => {
              const isActive = activeStep === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveStep(phase.id);
                  }}
                  style={{
                    position: "relative",
                    padding: "7px 16px",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    background: "transparent",
                    color: isActive ? "#ffffff" : "var(--text-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.25s ease",
                    zIndex: 1,
                  }}
                >
                  <span>{phase.icon}</span>
                  <span>PHASE {phase.stepNumber}</span>

                  {isActive && (
                    <motion.div
                      layoutId="active-phase-tab"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        background: "rgba(56, 189, 248, 0.18)",
                        border: `1px solid ${phase.accent}`,
                        boxShadow: `0 0 16px ${phase.glow}`,
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Simulation Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={runSimulation}
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "var(--radius-full)",
              border: isSimulating
                ? "1px solid var(--sky-400)"
                : "1px solid rgba(56, 189, 248, 0.3)",
              background: isSimulating
                ? "rgba(56, 189, 248, 0.15)"
                : "linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(139,92,246,0.1) 100%)",
              color: "#ffffff",
              fontFamily: "var(--font-mono)",
              fontSize: "0.74rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: isSimulating ? "0 0 20px rgba(56,189,248,0.3)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            <span>{isSimulating ? "⚡" : "▶"}</span>
            <span>
              {isSimulating
                ? isFr
                  ? "Simulation en cours..."
                  : "Streaming Pipeline..."
                : isFr
                ? "Lancer la Simulation du Flux"
                : "Run Pipeline Simulation"}
            </span>
          </motion.button>
        </div>

        {/* ── Active Phase Spotlight Console (Hero Display) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-card"
            style={{
              padding: "clamp(26px, 4vw, 40px)",
              borderRadius: "28px",
              border: "1px solid var(--glass-border)",
              borderLeft: `5px solid ${currentPhase.accent}`,
              background: "var(--glass-card-bg)",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${currentPhase.glow}`,
            }}
          >
            {/* Ambient Background Aura */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: currentPhase.glow,
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "32px",
                alignItems: "center",
              }}
              className="pipeline-spotlight-grid"
            >
              {/* Left Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      color: currentPhase.accent,
                    }}
                  >
                    PHASE {currentPhase.stepNumber}
                  </span>
                  <span style={{ color: "var(--text-dim)" }}>//</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.64rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {isFr ? currentPhase.category.fr : currentPhase.category.en}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 800,
                    color: "var(--text-heading)",
                    margin: 0,
                    lineHeight: 1.18,
                  }}
                >
                  {isFr ? currentPhase.name.fr : currentPhase.name.en}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(0.92rem, 1.1vw, 1.02rem)",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {isFr ? currentPhase.desc.fr : currentPhase.desc.en}
                </p>

                {/* Micro-Telemetry Badges */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
                  <div
                    className="glass"
                    style={{
                      padding: "8px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
                      {isFr ? currentPhase.telemetry.metric1.label.fr : currentPhase.telemetry.metric1.label.en}
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 800, color: currentPhase.accent, marginTop: "2px" }}>
                      {currentPhase.telemetry.metric1.value}
                    </div>
                  </div>

                  <div
                    className="glass"
                    style={{
                      padding: "8px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
                      {isFr ? currentPhase.telemetry.metric2.label.fr : currentPhase.telemetry.metric2.label.en}
                    </div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 800, color: currentPhase.accent, marginTop: "2px" }}>
                      {currentPhase.telemetry.metric2.value}
                    </div>
                  </div>
                </div>

                {/* Tech Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
                  {currentPhase.technologies.map((t) => (
                    <span
                      key={t}
                      className="glass"
                      style={{
                        padding: "4px 12px",
                        borderRadius: "var(--radius-full)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--text-main)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        background: "rgba(255, 255, 255, 0.03)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Live Simulated Payload Terminal */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--glass-border)",
                  background: "var(--glass-strong-bg)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                }}
              >
                {/* Header Chrome */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    background: "var(--glass-bg)",
                    borderBottom: "1px solid var(--glass-border)",
                  }}
                >
                  <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f43f5e" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--sky-400)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    stream://packet-phase-{currentPhase.stepNumber}
                  </span>
                </div>

                {/* Terminal Body */}
                <div
                  style={{
                    padding: "18px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    lineHeight: 1.65,
                    color: "var(--text-main)",
                    whiteSpace: "pre-wrap",
                    position: "relative",
                  }}
                >
                  <div style={{ color: "var(--text-dim)", marginBottom: "8px" }}>
                    // LIVE COMPUTE TELEMETRY CAPTURE:
                  </div>
                  <div style={{ color: currentPhase.accent, fontWeight: 500 }}>
                    {currentPhase.payload}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "12px",
                      color: "#10b981",
                      fontSize: "0.65rem",
                    }}
                  >
                    <span>✓</span>
                    <span>STATE PERSISTED · PIPELINE BUFFER OK</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── 4 Pipeline Slabs (Connected Step Flow) ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            className="pipeline-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {PHASES.map((phase) => {
              const isActive = activeStep === phase.id;
              return (
                <motion.div
                  key={phase.id}
                  whileHover={{ y: -3, scale: 1.015 }}
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveStep(phase.id);
                  }}
                  className="glass-card"
                  style={{
                    padding: "20px",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    border: isActive
                      ? `1.5px solid ${phase.accent}`
                      : "1px solid var(--glass-border)",
                    borderTop: `3px solid ${phase.accent}`,
                    background: isActive ? "var(--glass-strong-bg)" : "var(--glass-card-bg)",
                    boxShadow: isActive ? `0 10px 30px ${phase.glow}` : "none",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "1.3rem" }}>{phase.icon}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        color: phase.accent,
                      }}
                    >
                      {phase.stepNumber}
                    </span>
                  </div>

                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.98rem",
                        fontWeight: 700,
                        color: "var(--text-heading)",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {isFr ? phase.name.fr : phase.name.en}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                        margin: "6px 0 0 0",
                      }}
                    >
                      {isFr ? phase.category.fr : phase.category.en}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Production Diagnostics Dashboard (Bottom Bar) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card pipeline-diagnostics-grid"
          style={{
            padding: "20px 24px",
            borderRadius: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "18px",
            border: "1px solid var(--glass-border)",
            background: "var(--glass-card-bg)",
          }}
        >
          {[
            {
              value: "9,200+",
              label: isFr ? "Particules 3D Calculées" : "3D Particles Rendered",
              color: "var(--sky-400)",
            },
            {
              value: "< 42ms",
              label: isFr ? "Latence Globale Pipeline" : "End-to-End Latency",
              color: "var(--violet-400)",
            },
            {
              value: "100%",
              label: isFr ? "Couverture des Garde-fous" : "Guardrail Audit Coverage",
              color: "#10b981",
            },
            {
              value: "0-Leak",
              label: isFr ? "Déterminisme Garanti" : "Deterministic Isolation",
              color: "var(--gold-400)",
            },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderLeft: i > 0 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                paddingLeft: i > 0 ? "18px" : "0",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  color: m.color,
                  lineHeight: 1.1,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Responsive Layout Styles */}
      <style>{`
        @media (max-width: 960px) {
          .pipeline-spotlight-grid {
            grid-template-columns: 1fr !important;
          }
          .pipeline-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .pipeline-diagnostics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .pipeline-grid {
            grid-template-columns: 1fr !important;
          }
          .pipeline-diagnostics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
