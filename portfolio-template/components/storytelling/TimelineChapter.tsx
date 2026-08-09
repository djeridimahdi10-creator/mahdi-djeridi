"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

const CERTIFICATIONS = [
  {
    id: "google-ai",
    title: "Google AI Professional Certificate",
    issuer: "Google · Coursera",
    credentialId: "YS26JC7JM5VP",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/YS26JC7JM5VP?trk=public_profile_see-credential",
    color: "var(--sky-500)",
    date: "August 2026",
    badgeStyle: {
      background: "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)",
      letter: "G",
      boxShadow: "0 4px 16px rgba(66,133,244,0.3)",
    },
    skills: [
      "AI Agent Architecture & App Building",
      "Prompt Engineering & Model Steering",
      "Data Wrangling & AI-Driven Analytics",
      "Visual Storytelling & Generative AI",
      "Machine Learning Literacy",
    ],
    desc: "Comprehensive professional credential issued by Google certifying advanced mastery in AI agent development, prompt engineering strategies, data analytics, and building production-ready AI applications.",
  },
  {
    id: "devops-formation",
    title: "DevOps Engineering Formation",
    issuer: "Professional Training · 2025",
    credentialId: null,
    link: null,
    color: "var(--violet-400)",
    date: "2025",
    badgeStyle: {
      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
      letter: "D",
      boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
    },
    skills: [
      "Docker & Container Orchestration",
      "CI/CD Pipeline Automation",
      "Linux Server Administration",
      "Cloud Infrastructure & Deployment",
      "Monitoring & Observability",
    ],
    desc: "Completed an intensive professional formation in DevOps engineering covering the full lifecycle of modern software delivery — from containerization and CI/CD automation to cloud infrastructure management and production monitoring.",
  },
];

const MILESTONES = [
  {
    period: "2025 — PRESENT",
    role: "AI Manipulation & Integration",
    domain: "Artificial Intelligence",
    highlights: [
      "Completed Google AI Professional Certificate — mastering AI agent development and LLM integration.",
      "Built autonomous multi-agent pipelines using Python and NestJS microservices for production workflows.",
      "Engineered RAG architectures, embedding pipelines, and LLM-powered APIs for real-world applications.",
    ],
    color: "var(--emerald-500)",
  },
  {
    period: "2025",
    role: "DevOps Engineering Formation",
    domain: "Infrastructure & Automation",
    highlights: [
      "Completed professional DevOps formation covering Docker, CI/CD pipelines, and cloud deployment.",
      "Automated build and delivery workflows reducing deployment time and eliminating manual errors.",
      "Set up production monitoring, alerting systems, and zero-downtime deployment strategies.",
    ],
    color: "var(--violet-400)",
  },
  {
    period: "2024 — 2025",
    role: "Full-Stack Software Developer",
    domain: "Web Engineering",
    highlights: [
      "Architected and deployed PC Labs — a live interactive hardware PC building simulator (Next.js, Vercel).",
      "Built and launched Aura Bags — a full B2B industrial packaging portal with admin panel and order tracking.",
      "Developed scalable full-stack applications using Next.js, React, TypeScript, NestJS, and SQL databases.",
    ],
    color: "var(--sky-500)",
  },
];

export default function TimelineChapter() {
  const { t } = usePortfolio();

  return (
    <div className="story-chapter story-chapter-interactive" style={{ padding: "var(--section-padding-y) var(--section-padding-x)" }}>
      <div style={{ width: "100%", maxWidth: "960px", display: "flex", flexDirection: "column", gap: "56px" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <div className="section-badge" style={{ justifyContent: "center" }}>{t.timeline.badge}</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "8px" }}>
            {t.timeline.heading}
          </h2>
        </motion.div>

        {/* Certifications Block */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sky-500)", boxShadow: "0 0 8px var(--sky-glow)" }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--sky-500)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>
              Verified Certifications & Formations
            </span>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card"
                style={{
                  padding: "clamp(22px, 4vw, 34px)",
                  borderRadius: "var(--radius-xl)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  position: "relative",
                  overflow: "hidden",
                  border: `1px solid ${cert.color}22`,
                }}
              >
                {/* Background aurora */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "260px",
                  height: "260px",
                  borderRadius: "0 28px 0 100%",
                  background: `radial-gradient(ellipse, ${cert.color}08, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: cert.badgeStyle.background,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: 900,
                        color: "white",
                        fontFamily: "var(--font-heading)",
                        boxShadow: cert.badgeStyle.boxShadow,
                        flexShrink: 0,
                      }}>
                        {cert.badgeStyle.letter}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: cert.color,
                        letterSpacing: "0.16em",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}>
                        {cert.issuer} · {cert.date}
                      </div>
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                      fontWeight: 700,
                      color: "var(--text-heading)",
                      lineHeight: "1.2",
                    }}>
                      {cert.title}
                    </h3>
                  </div>

                  {/* Verify Button (only if there's a link) */}
                  {cert.link ? (
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: cert.color,
                        background: `${cert.color}10`,
                        border: `1px solid ${cert.color}35`,
                        padding: "9px 18px",
                        borderRadius: "999px",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        whiteSpace: "nowrap",
                        boxShadow: `0 4px 16px ${cert.color}18`,
                        transition: "all 0.25s ease",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald-500)", boxShadow: "0 0 6px var(--emerald-500)" }} />
                      Verify Credential
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                  ) : (
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: cert.color,
                      background: `${cert.color}10`,
                      border: `1px solid ${cert.color}30`,
                      padding: "7px 16px",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexShrink: 0,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: cert.color, boxShadow: `0 0 6px ${cert.color}` }} />
                      Completed
                    </div>
                  )}
                </div>

                <p style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.88rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.65",
                  maxWidth: "680px",
                }}>
                  {cert.desc}
                </p>

                {/* Skills grid */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--glass-border)",
                }}>
                  {cert.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.04, y: -2 }}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.64rem",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        background: `${cert.color}10`,
                        color: cert.color,
                        border: `1px solid ${cert.color}28`,
                        cursor: "default",
                        transition: "all 0.2s ease",
                      }}
                    >
                      ✦ {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Credential ID if present */}
                {cert.credentialId && (
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.56rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.12em",
                  }}>
                    CREDENTIAL ID: {cert.credentialId}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Timeline */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--violet-400)", boxShadow: "0 0 8px var(--violet-glow)" }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--violet-400)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>
              Career Engineering Journey
            </span>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
            {/* Vertical spine */}
            <div className="timeline-spine" />

            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.period}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.14, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
              >
                {/* Timeline node */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + 0.15, duration: 0.5, type: "spring" }}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--void-900)",
                    border: `2px solid ${m.color}`,
                    boxShadow: `0 0 16px ${m.color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 2,
                  }}
                >
                  <div style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: m.color,
                    boxShadow: `0 0 8px ${m.color}`,
                  }} />
                </motion.div>

                {/* Content card */}
                <motion.div
                  whileHover={{ x: 6 }}
                  className="glass-card"
                  style={{
                    padding: "clamp(18px, 3vw, 28px)",
                    borderRadius: "var(--radius-md)",
                    flex: 1,
                    borderLeft: `3px solid ${m.color}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: m.color,
                      letterSpacing: "0.16em",
                      fontWeight: 700,
                    }}>
                      {m.period}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--text-dim)",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                    }}>
                      {m.domain}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    marginBottom: "14px",
                  }}>
                    {m.role}
                  </h3>

                  <ul style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: 0, listStyle: "none" }}>
                    {m.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "0.86rem",
                          color: "var(--text-muted)",
                          lineHeight: "1.55",
                          display: "flex",
                          gap: "10px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span style={{ color: m.color, fontSize: "0.65rem", marginTop: "5px", flexShrink: 0 }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
