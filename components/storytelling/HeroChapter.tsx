"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePortfolio } from "@/components/context/PortfolioContext";

// Typewriter hook
function useTypewriter(text: string, speed = 45, delay = 700) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

const ROLES_EN = [
  "Full-Stack Engineer",
  "AI Systems Architect",
  "DevOps Specialist",
  "Application Security",
];

const ROLES_FR = [
  "Ingénieur Full-Stack",
  "Architecte Systèmes IA",
  "Spécialiste DevOps",
  "Sécurité Applicative",
];

interface TechPill {
  name: string;
  color: string;
  glow: string;
}

const TECH_PILLS: TechPill[] = [
  { name: "Next.js 15", color: "#ffffff", glow: "rgba(255,255,255,0.4)" },
  { name: "TypeScript", color: "#38bdf8", glow: "rgba(56,189,248,0.4)" },
  { name: "Python", color: "#fbbf24", glow: "rgba(251,191,36,0.4)" },
  { name: "NestJS", color: "#f43f5e", glow: "rgba(244,63,94,0.4)" },
  { name: "Docker", color: "#0284c7", glow: "rgba(2,132,199,0.4)" },
  { name: "LangGraph", color: "#10b981", glow: "rgba(16,185,129,0.4)" },
  { name: "Three.js", color: "#8b5cf6", glow: "rgba(139,92,246,0.4)" },
  { name: "PostgreSQL", color: "#38bdf8", glow: "rgba(56,189,248,0.3)" },
];

export default function HeroChapter() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { t, language, openCvModal } = usePortfolio();

  // Mouse tilt position for Studio Card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic role cycler
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = language === "fr" ? ROLES_FR : ROLES_EN;

  const { displayed: typewriterText, done: typewriterDone } = useTypewriter(
    roles[roleIndex % roles.length],
    45,
    700
  );

  useEffect(() => {
    if (!typewriterDone) return;
    const pauseTimer = setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearTimeout(pauseTimer);
  }, [typewriterDone, roleIndex, roles.length]);

  // Mouse tilt for the portrait card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("djeridimahdi10@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const scrollToProjects = () => {
    const stationList = ["ch-hero", "ch-about", "ch-skills", "ch-flow", "ch-projects", "ch-timeline", "ch-contact"];
    const idx = stationList.indexOf("ch-projects");
    const totalH = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (idx / (stationList.length - 1)) * totalH;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div
      className="story-chapter story-chapter-interactive hero-chapter"
      ref={containerRef}
      style={{
        paddingTop: "clamp(100px, 14vh, 160px)",
        paddingBottom: "clamp(60px, 8vh, 100px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "clamp(36px, 5vw, 72px)",
          alignItems: "center",
        }}
        className="studio-hero-grid"
      >
        {/* ════════════════════════════════════════════════════
            LEFT COLUMN: Editorial Typography & Value Proposition
           ════════════════════════════════════════════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Eyebrow / Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}
          >
            <div
              className="glass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 13px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                background: "rgba(16, 185, 129, 0.08)",
                boxShadow: "0 0 16px -2px rgba(16, 185, 129, 0.2)",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px #10b981",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "#34d399",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {language === "fr" ? "Disponible · Alger (UTC+1)" : "Available · Algiers (UTC+1)"}
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
              }}
              className="badge-divider-hide"
            >
              //
            </span>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
              className="badge-divider-hide"
            >
              {language === "fr" ? "Systèmes Distribués & IA" : "Distributed Systems & Applied AI"}
            </span>
          </motion.div>

          {/* Identity & Main Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Architect Identity Moniker */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--sky-400)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "var(--violet-400)", fontWeight: 800 }}>//</span>
                <span>MAHDI DJERIDI</span>
              </div>
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "linear-gradient(90deg, rgba(56, 189, 248, 0.4), transparent)",
                }}
              />
            </motion.div>

            {/* Master Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.7rem, 5.2vw, 4.2rem)",
                  fontWeight: 800,
                  color: "var(--text-heading)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.035em",
                  margin: 0,
                }}
              >
                Building{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 24px rgba(56, 189, 248, 0.25))",
                  }}
                >
                  Intelligent,
                </span>
                <br />
                <span style={{ color: "var(--text-heading)" }}>Scalable Systems.</span>
              </h1>
            </motion.div>
          </div>

          {/* Interactive Dynamic Terminal Specialty Deck */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: "var(--glass-strong-bg)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                backdropFilter: "blur(16px)",
                boxShadow: "var(--shadow-card)",
                maxWidth: "100%",
                flexWrap: "wrap",
              }}
            >
              {/* Terminal Traffic Light Indicators */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", opacity: 0.85 }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b", opacity: 0.85 }} />
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", opacity: 0.85 }} />
              </div>

              <div
                style={{
                  width: "1px",
                  height: "12px",
                  background: "rgba(255, 255, 255, 0.12)",
                }}
              />

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                focus:
              </span>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                  color: "var(--sky-400)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "var(--violet-400)", fontWeight: 700 }}>❯</span>
                <span>{typewriterText}</span>
                <span
                  className="cursor-blink"
                  style={{
                    display: "inline-block",
                    width: "7px",
                    height: "13px",
                    background: "var(--sky-400)",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Bio Value Statement plaque */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              paddingLeft: "16px",
              borderLeft: "2px solid",
              borderImage: "linear-gradient(to bottom, #38bdf8, rgba(99, 102, 241, 0.4), transparent) 1",
              maxWidth: "580px",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 400,
              }}
            >
              {language === "fr" ? (
                <>
                  Conception de{" "}
                  <span style={{ color: "var(--text-heading)", fontWeight: 500 }}>
                    pipelines d&apos;agents autonomes
                  </span>{" "}
                  hautement scalables, de{" "}
                  <span style={{ color: "var(--text-heading)", fontWeight: 500 }}>
                    microservices cloud résilients
                  </span>{" "}
                  et d&apos;expériences web immersives conçues avec une ingénierie de précision moderne.
                </>
              ) : (
                <>
                  Crafting scalable{" "}
                  <span style={{ color: "var(--text-heading)", fontWeight: 500 }}>
                    autonomous agent pipelines
                  </span>
                  , resilient{" "}
                  <span style={{ color: "var(--text-heading)", fontWeight: 500 }}>
                    cloud microservices
                  </span>
                  , and immersive web experiences with modern precision engineering.
                </>
              )}
            </p>
          </motion.div>

          {/* Interactive Branded Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>CORE ARCHITECTURAL STACK</span>
              <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)", maxWidth: "80px" }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TECH_PILLS.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "6px 13px",
                    borderRadius: "8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.74rem",
                    fontWeight: 500,
                    color: "var(--text-main)",
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    backdropFilter: "blur(12px)",
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                    transition: "border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tech.color;
                    e.currentTarget.style.boxShadow = `0 0 16px -2px ${tech.glow}`;
                    e.currentTarget.style.color = "var(--text-heading)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.color = "var(--text-main)";
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: tech.color,
                      boxShadow: `0 0 8px ${tech.color}`,
                    }}
                  />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action CTAs & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
              paddingTop: "6px",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToProjects}
              className="btn-primary"
              style={{ pointerEvents: "all" }}
            >
              <span>{t.hero.exploreWork}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button
              type="button"
              onClick={openCvModal}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary"
              style={{ pointerEvents: "all", cursor: "pointer" }}
            >
              <span>{t.hero.viewResume}</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Social & Contact Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }} className="social-row-wrap">
              {/* GitHub */}
              <motion.a
                href="https://github.com/djeridimahdi10-creator"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass"
                title="GitHub @djeridimahdi10-creator"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-heading)",
                  border: "1px solid var(--glass-border)",
                  pointerEvents: "all",
                  transition: "border-color 0.25s ease, color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--sky-500)";
                  e.currentTarget.style.color = "var(--sky-400)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--text-heading)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/mehdi-djeridi-7b924b2a4"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass"
                title="LinkedIn"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--sky-400)",
                  border: "1px solid var(--glass-border)",
                  pointerEvents: "all",
                  transition: "border-color 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--violet-400)";
                  e.currentTarget.style.color = "var(--violet-400)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--sky-400)";
                }}
              >
                <svg width="17" height="17" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm-1.29 9.763H6.29v-8.59H3.714v8.59zM17.668 0H2.328C1.042 0 0 1.017 0 2.273v15.454C0 18.982 1.042 20 2.328 20h15.34C18.958 20 20 18.982 20 17.727V2.273C20 1.017 18.958 0 17.668 0z"/>
                </svg>
              </motion.a>

              {/* Copy Email */}
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass"
                title={copiedEmail ? "Copied to clipboard!" : "Copy djeridimahdi10@gmail.com"}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: copiedEmail ? "#10b981" : "var(--violet-400)",
                  border: copiedEmail ? "1px solid #10b981" : "1px solid var(--glass-border)",
                  background: copiedEmail ? "rgba(16,185,129,0.12)" : undefined,
                  cursor: "pointer",
                  pointerEvents: "all",
                  transition: "all 0.25s ease",
                }}
              >
                {copiedEmail ? (
                  <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4 4L16 6" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                    <path d="M2 5.5A2.5 2.5 0 014.5 3h11A2.5 2.5 0 0118 5.5v9A2.5 2.5 0 0115.5 17h-11A2.5 2.5 0 012 14.5v-9zm1.5 0v.217l6.5 4.333 6.5-4.333V5.5A1 1 0 0015.5 4.5h-11A1 1 0 003.5 5.5zm13 2.283L10 11.717 3.5 7.783V14.5a1 1 0 001 1h11a1 1 0 001-1V7.783z" fill="currentColor"/>
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Minimalist Stats Row (Linear Studio Style) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              paddingTop: "18px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.5rem, 2.2vw, 1.85rem)",
                  fontWeight: 800,
                  color: "var(--text-heading)",
                  lineHeight: 1,
                }}
              >
                3<span style={{ color: "var(--sky-400)" }}>+</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-dim)",
                  marginTop: "6px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {t.hero.stats.experience}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.5rem, 2.2vw, 1.85rem)",
                  fontWeight: 800,
                  color: "var(--text-heading)",
                  lineHeight: 1,
                }}
              >
                4<span style={{ color: "var(--violet-400)" }}>+</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-dim)",
                  marginTop: "6px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {t.hero.stats.projects}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.5rem, 2.2vw, 1.85rem)",
                  fontWeight: 800,
                  color: "var(--text-heading)",
                  lineHeight: 1,
                }}
              >
                99<span style={{ color: "#10b981" }}>.9%</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-dim)",
                  marginTop: "6px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {language === "fr" ? "Disponibilité" : "Target Uptime"}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════
            RIGHT COLUMN: Luxury Studio Portrait Showcase Card
           ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Ambient Studio Backlight Glow */}
          <div
            style={{
              position: "absolute",
              inset: "-30px",
              borderRadius: "40px",
              background: "radial-gradient(ellipse at center, rgba(56,189,248,0.2) 0%, rgba(139,92,246,0.15) 45%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Studio Glass Card */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-card"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "420px",
              borderRadius: "24px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.18s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
              border: "1px solid var(--glass-border)",
              background: "var(--glass-card-bg)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Portrait Image Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "360px",
                borderRadius: "16px",
                overflow: "hidden",
                background: "var(--void-950)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Mahdi Djeridi"
                fill
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  filter: "contrast(1.04) brightness(1.02)",
                }}
              />

              {/* Soft Gradient Overlay for depth */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,20,0.85) 0%, rgba(10,10,20,0.1) 45%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Bottom Card Title Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "18px",
                  left: "18px",
                  right: "18px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#fff",
                    textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  }}
                >
                  Mahdi Djeridi
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--sky-400)",
                    letterSpacing: "0.06em",
                    marginTop: "2px",
                  }}
                >
                  Full-Stack & AI Systems
                </div>
              </div>
            </div>

            {/* Studio Card Meta Footer */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                paddingTop: "2px",
              }}
            >
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  DevOps
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    marginTop: "3px",
                  }}
                >
                  CI/CD · Docker · Cloud
                </div>
              </div>

              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  AI Architecture
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "var(--sky-400)",
                    marginTop: "3px",
                  }}
                >
                  Agents · LLMs · Systems
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Responsive Layout Styles */}
      <style>{`
        @media (max-width: 960px) {
          .studio-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .badge-divider-hide {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .hero-chapter {
            padding-top: 100px !important;
          }
          .social-row-wrap {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
