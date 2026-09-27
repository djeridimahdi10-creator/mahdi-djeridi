"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePortfolio } from "@/components/context/PortfolioContext";

const EMAIL = "djeridimahdi10@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/mehdi-djeridi-7b924b2a4";
const LINKEDIN_DISPLAY = "linkedin.com/in/mehdi-djeridi-7b924b2a4";
const GITHUB_URL = "https://github.com/djeridimahdi10-creator";
const GITHUB_DISPLAY = "github.com/djeridimahdi10-creator";
const CV_URL = "/djeridi-mahdi-cv.pdf";

interface InquiryTopic {
  id: string;
  icon: string;
  label: { en: string; fr: string };
  subject: { en: string; fr: string };
  body: { en: string; fr: string };
}

const INQUIRY_TOPICS: InquiryTopic[] = [
  {
    id: "ai-agents",
    icon: "🤖",
    label: { en: "Autonomous AI Agents", fr: "Agents IA Autonomes" },
    subject: {
      en: "Inquiry: Autonomous AI Agent Pipeline Architecture",
      fr: "Demande : Architecture de Pipeline d'Agents IA Autonomes",
    },
    body: {
      en: "Hi Mahdi,%0D%0A%0D%0AI would like to discuss building an autonomous multi-agent pipeline / generative AI solution with your expertise.%0D%0A%0D%0ABest regards,",
      fr: "Bonjour Mahdi,%0D%0A%0D%0AJe souhaiterais échanger sur la conception d'un pipeline multi-agents autonomes / solution d'IA générative avec votre expertise.%0D%0A%0D%0ACordialement,",
    },
  },
  {
    id: "fullstack",
    icon: "⚡",
    label: { en: "Full-Stack Web App", fr: "Application Web Full-Stack" },
    subject: {
      en: "Inquiry: Full-Stack Web Platform Development",
      fr: "Demande : Développement de Plateforme Web Full-Stack",
    },
    body: {
      en: "Hi Mahdi,%0D%0A%0D%0AWe are interested in collaborating on a scalable web application built with Next.js, TypeScript, and microservices.%0D%0A%0D%0ABest regards,",
      fr: "Bonjour Mahdi,%0D%0A%0D%0ANous sommes intéressés par une collaboration sur une application web scalable avec Next.js, TypeScript et microservices.%0D%0A%0D%0ACordialement,",
    },
  },
  {
    id: "banking",
    icon: "🏦",
    label: { en: "Core Banking & Enterprise", fr: "Core Banking & Entreprise" },
    subject: {
      en: "Inquiry: Core Banking (CBS) & Enterprise Architecture",
      fr: "Demande : Core Banking (CBS) & Architecture d'Entreprise",
    },
    body: {
      en: "Hi Mahdi,%0D%0A%0D%0AI would like to consult with you regarding banking systems integration, satellite systems, and secure Data Center deployments.%0D%0A%0D%0ABest regards,",
      fr: "Bonjour Mahdi,%0D%0A%0D%0AJe souhaite vous consulter concernant l'intégration de systèmes bancaires, applications satellites et déploiements sécurisés en Data Center.%0D%0A%0D%0ACordialement,",
    },
  },
  {
    id: "devops",
    icon: "☁️",
    label: { en: "Cloud & DevOps", fr: "Cloud & DevOps" },
    subject: {
      en: "Inquiry: CI/CD, Docker & Cloud Architecture",
      fr: "Demande : CI/CD, Docker & Architecture Cloud",
    },
    body: {
      en: "Hi Mahdi,%0D%0A%0D%0AWe would like your assistance in setting up automated CI/CD pipelines, containerization, and cloud security hardening.%0D%0A%0D%0ABest regards,",
      fr: "Bonjour Mahdi,%0D%0A%0D%0ANous aimerions votre expertise pour la mise en place de pipelines CI/CD automatisés, conteneurisation et sécurité cloud.%0D%0A%0D%0ACordialement,",
    },
  },
];

export default function ContactChapter() {
  const { t, language } = usePortfolio();
  const isFr = language === "fr";

  const [selectedTopic, setSelectedTopic] = useState<string>("ai-agents");
  const [copied, setCopied] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // 3D Mouse Parallax Tilt for Left Card
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });

  const activeTopicObj = INQUIRY_TOPICS.find((top) => top.id === selectedTopic) || INQUIRY_TOPICS[0];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setTilt({ rotateX, rotateY, shineX, shineY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=${encodeURIComponent(
    activeTopicObj.subject[language]
  )}&body=${activeTopicObj.body[language]}`;

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
          maxWidth: "var(--content-max)",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
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
            {isFr ? "CHAPITRE 07 · ME CONTACTER" : "CHAPTER 07 · LET'S CONNECT"}
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: "clamp(2.1rem, 4.2vw, 3.2rem)",
              marginTop: "8px",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {isFr ? (
              <>
                Prêt à Créer Quelque Chose d'
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--sky-400) 25%, #8b5cf6 65%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Extraordinaire ?
                </span>
              </>
            ) : (
              <>
                Ready to Create Something{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--sky-400) 25%, #8b5cf6 65%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Extraordinary?
                </span>
              </>
            )}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(0.88rem, 1.15vw, 1.02rem)",
              color: "var(--text-muted)",
              marginTop: "8px",
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.6",
            }}
          >
            {isFr
              ? "Que vous ayez besoin d'un système d'agents IA autonomes, d'une architecture web full-stack d'entreprise ou de l'automatisation DevOps — transformons vos défis complexes en réalité élégante."
              : "Whether you need an autonomous AI agent system, resilient enterprise full-stack architecture, or DevOps automation — let's turn complex engineering into elegant reality."}
          </p>
        </motion.div>

        {/* ── Main Stage Grid: Executive Studio Card (Left) + Interactive Dispatch Center (Right) ── */}
        <div
          id="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "36px",
            alignItems: "stretch",
          }}
        >
          {/* ── Left Column: 3D Mouse Parallax Executive Studio Profile ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-card"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: "transform 0.12s ease-out, border-color 0.3s ease",
              borderRadius: "var(--radius-xl)",
              background: "var(--glass-card-bg)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid var(--glass-border)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.65), 0 0 35px rgba(56, 189, 248, 0.2)",
              padding: "clamp(24px, 3.5vw, 36px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient Background Aura */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "220px",
                height: "220px",
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Profile Identity Row */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div
                style={{
                  position: "relative",
                  width: "78px",
                  height: "78px",
                  borderRadius: "50%",
                  padding: "3px",
                  background: "linear-gradient(135deg, var(--sky-400), #8b5cf6, #10b981)",
                  boxShadow: "0 0 24px rgba(56, 189, 248, 0.35)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#050510",
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Mahdi Djeridi"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  />
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    lineHeight: 1.2,
                  }}
                >
                  Mahdi Djeridi
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--sky-400)",
                    marginTop: "3px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {isFr
                    ? "Ingénieur Full-Stack & Intelligence Artificielle"
                    : "Full-Stack & AI Systems Software Engineer"}
                </div>

                {/* Live Availability Beacon */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "8px",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "rgba(16, 185, 129, 0.14)",
                    border: "1px solid rgba(16, 185, 129, 0.35)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "#10b981",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 8px #10b981",
                      animation: "pulse-glow 2s infinite ease-in-out",
                    }}
                  />
                  <span>
                    {isFr
                      ? "DISPONIBLE POUR NOUVEAUX PROJETS"
                      : "AVAILABLE FOR PRODUCTION ENGAGEMENTS"}
                  </span>
                </div>
              </div>
            </div>

            {/* Telemetry Status Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-dim)" }}>
                  LOCATION
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "var(--text-heading)", fontWeight: 600, marginTop: "2px" }}>
                  Algiers, DZ (UTC+1)
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-dim)" }}>
                  RESPONSE LATENCY
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "var(--sky-400)", fontWeight: 600, marginTop: "2px" }}>
                  &lt; 4 Hours
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-dim)" }}>
                  SECURITY
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "#10b981", fontWeight: 600, marginTop: "2px" }}>
                  TLS 1.3 / Verified
                </div>
              </div>
            </div>

            {/* Quick Inquiry Preset Selectors */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                }}
              >
                {isFr ? "SÉLECTIONNER UN DOMAINE D'ÉCHANGE :" : "SELECT INQUIRY TOPIC :"}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {INQUIRY_TOPICS.map((topic) => {
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: isSelected ? "rgba(56, 189, 248, 0.18)" : "rgba(255, 255, 255, 0.04)",
                        border: `1px solid ${isSelected ? "var(--sky-400)" : "var(--glass-border)"}`,
                        color: isSelected ? "#ffffff" : "var(--text-muted)",
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.74rem",
                        fontWeight: isSelected ? 600 : 400,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>{topic.icon}</span>
                      <span>{topic.label[language]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px" }}>
                {/* Launch Gmail with Pre-populated Topic */}
                <motion.a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: "linear-gradient(135deg, var(--sky-400), #0284c7)",
                    border: "1px solid var(--sky-400)",
                    color: "#ffffff",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    padding: "12px 20px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(56, 189, 248, 0.4)",
                    cursor: "pointer",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1.5 4A1.5 1.5 0 013 2.5h10A1.5 1.5 0 0114.5 4v8A1.5 1.5 0 0113 13.5H3A1.5 1.5 0 011.5 12V4zm1.5.174V12a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V4.174L8 8.833 3 4.174zM13.2 3.5H2.8L8 7.667l5.2-4.167z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{isFr ? "Envoyer à djeridimahdi10@gmail.com ↗" : "Send Mail to djeridimahdi10@gmail.com ↗"}</span>
                </motion.a>

                {/* Copy Direct Email Button */}
                <motion.button
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  title={isFr ? "Copier l'adresse email" : "Copy email address"}
                  style={{
                    background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.06)",
                    border: `1px solid ${copied ? "#10b981" : "var(--glass-border)"}`,
                    color: copied ? "#10b981" : "var(--text-main)",
                    padding: "0 18px",
                    borderRadius: "999px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.25s ease",
                  }}
                >
                  {copied ? (
                    <>
                      <span>✓</span>
                      <span>{t.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      <span>{t.contact.copyEmail}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Direct CV Download Link */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "4px" }}>
                <a
                  href={CV_URL}
                  download="Mahdi-Djeridi-CV.pdf"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--text-dim)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sky-400)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                >
                  <span>📄</span>
                  <span>{isFr ? "Télécharger le CV Officiel (PDF)" : "Download Official Resume (PDF)"}</span>
                  <span>↓</span>
                </a>

                <button
                  onClick={() => setCvModalOpen(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--sky-400)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {isFr ? "Aperçu du CV" : "Preview Resume"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: High-Impact Contact Channels & Live Dispatch Terminal ── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Channel Card 1: Direct Email */}
            <motion.div
              whileHover={{ x: 6 }}
              className="glass-card"
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: "var(--glass-card-bg)",
                border: "1px solid var(--glass-border)",
                borderLeft: "3px solid var(--sky-400)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(56, 189, 248, 0.12)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--sky-400)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M2 5.5A2.5 2.5 0 014.5 3h11A2.5 2.5 0 0118 5.5v9A2.5 2.5 0 0115.5 17h-11A2.5 2.5 0 012 14.5v-9zm1.5 0v.217l6.5 4.333 6.5-4.333V5.5A1 1 0 0015.5 4.5h-11A1 1 0 003.5 5.5zm13 2.283L10 11.717 3.5 7.783V14.5a1 1 0 001 1h11a1 1 0 001-1V7.783z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "var(--text-heading)" }}>
                      Direct Email
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--sky-400)", background: "rgba(56,189,248,0.15)", padding: "2px 8px", borderRadius: "999px" }}>
                      PRIMARY
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                    {EMAIL}
                  </div>
                </div>
              </div>

              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--sky-400)",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  background: "rgba(56, 189, 248, 0.12)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Compose</span>
                <span>↗</span>
              </a>
            </motion.div>

            {/* Channel Card 2: LinkedIn Profile */}
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              className="glass-card"
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: "var(--glass-card-bg)",
                border: "1px solid var(--glass-border)",
                borderLeft: "3px solid var(--violet-400)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(139, 92, 246, 0.12)",
                    border: "1px solid rgba(139, 92, 246, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--violet-400)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm-1.29 9.763H6.29v-8.59H3.714v8.59zM17.668 0H2.328C1.042 0 0 1.017 0 2.273v15.454C0 18.982 1.042 20 2.328 20h15.34C18.958 20 20 18.982 20 17.727V2.273C20 1.017 18.958 0 17.668 0z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "var(--text-heading)" }}>
                      LinkedIn Professional
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--violet-400)", background: "rgba(139,92,246,0.15)", padding: "2px 8px", borderRadius: "999px" }}>
                      NETWORK
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                    {LINKEDIN_DISPLAY}
                  </div>
                </div>
              </div>

              <span style={{ color: "var(--violet-400)", fontSize: "1rem" }}>↗</span>
            </motion.a>

            {/* Channel Card 3: GitHub Codebase */}
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              className="glass-card"
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: "var(--glass-card-bg)",
                border: "1px solid var(--glass-border)",
                borderLeft: "3px solid var(--emerald-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--emerald-500)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "var(--text-heading)" }}>
                      GitHub Organization
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--emerald-500)", background: "rgba(16,185,129,0.15)", padding: "2px 8px", borderRadius: "999px" }}>
                      OPEN SOURCE
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                    {GITHUB_DISPLAY}
                  </div>
                </div>
              </div>

              <span style={{ color: "var(--emerald-500)", fontSize: "1rem" }}>↗</span>
            </motion.a>

            {/* Interactive Live Message Dispatch Terminal */}
            <div
              className="glass-card"
              style={{
                borderRadius: "var(--radius-md)",
                background: "var(--glass-card-bg)",
                border: "1px solid var(--glass-border)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-dim)", marginLeft: "6px" }}>
                    DISPATCH_CONSOLE.sh
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#10b981" }}>
                  READY TO DISPATCH
                </span>
              </div>

              {/* Code draft block */}
              <div
                style={{
                  background: "var(--glass-bg)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                }}
              >
                <div>
                  <span style={{ color: "var(--sky-400)" }}>TO:</span> {EMAIL}
                </div>
                <div>
                  <span style={{ color: "var(--sky-400)" }}>SUBJECT:</span> {activeTopicObj.subject[language]}
                </div>
                <div style={{ marginTop: "4px", color: "var(--text-dim)", fontSize: "0.62rem" }}>
                  // Click below to compose and send directly to djeridimahdi10@gmail.com via Gmail
                </div>
              </div>

              {/* Single High-Impact Dispatch Button to djeridimahdi10@gmail.com */}
              <motion.a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  background: "linear-gradient(135deg, var(--sky-400), #0284c7)",
                  border: "1px solid var(--sky-400)",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  padding: "11px 18px",
                  borderRadius: "8px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(56, 189, 248, 0.35)",
                  cursor: "pointer",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1.5 4A1.5 1.5 0 013 2.5h10A1.5 1.5 0 0114.5 4v8A1.5 1.5 0 0113 13.5H3A1.5 1.5 0 011.5 12V4zm1.5.174V12a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V4.174L8 8.833 3 4.174zM13.2 3.5H2.8L8 7.667l5.2-4.167z"
                    fill="currentColor"
                  />
                </svg>
                <span>{isFr ? "Envoyer un Mail à djeridimahdi10@gmail.com ↗" : "Dispatch Mail to djeridimahdi10@gmail.com ↗"}</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="divider" style={{ opacity: 0.4 }} />

        {/* ── Studio Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Left: Copyright */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.64rem",
              color: "var(--text-dim)",
              letterSpacing: "0.08em",
            }}
          >
            © {new Date().getFullYear()} MAHDI DJERIDI · ALGIERS, ALGERIA · {EMAIL}
          </div>

          {/* Center: Architecture Tech Stack */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--text-dim)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>ENGINEERED WITH</span>
            <span style={{ color: "var(--sky-400)" }}>Next.js 15</span>
            <span>·</span>
            <span style={{ color: "var(--violet-400)" }}>Three.js WebGL</span>
            <span>·</span>
            <span style={{ color: "var(--emerald-500)" }}>TypeScript</span>
          </div>

          {/* Right: Quick Social Pills */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { label: "GITHUB", href: GITHUB_URL, color: "var(--emerald-500)" },
              { label: "LINKEDIN", href: LINKEDIN_URL, color: "var(--violet-400)" },
              { label: "CV PDF", href: CV_URL, color: "var(--sky-400)", download: true },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.download ? "_self" : "_blank"}
                rel="noopener noreferrer"
                download={s.download ? "Mahdi-Djeridi-CV.pdf" : undefined}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  color: s.color,
                  textDecoration: "none",
                  border: `1px solid ${s.color}35`,
                  background: `${s.color}0e`,
                }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── High-Resolution CV Lightbox Modal ── */}
      <AnimatePresence>
        {cvModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCvModalOpen(false)}
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
                maxWidth: "820px",
                background: "var(--glass-strong-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(56, 189, 248, 0.25)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
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
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-heading)", marginLeft: "6px" }}>
                    Mahdi Djeridi — Official Curriculum Vitae
                  </span>
                </div>

                <button
                  onClick={() => setCvModalOpen(false)}
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

              {/* Preview Image */}
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
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/djeridi-mahdi-cv-preview.png"
                  alt="Mahdi Djeridi Resume Preview"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6)",
                    display: "block",
                  }}
                />
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "var(--glass-bg)",
                  borderTop: "1px solid var(--glass-border)",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)" }}>
                  FORMAT: PDF (OFFICIAL 2026 EDITION)
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={CV_URL}
                    download="Mahdi-Djeridi-CV.pdf"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      background: "linear-gradient(135deg, var(--sky-400), #0284c7)",
                      border: "1px solid var(--sky-400)",
                      padding: "8px 18px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Download PDF ↓</span>
                  </a>
                  <button
                    onClick={() => setCvModalOpen(false)}
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--glass-border)",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          #contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
