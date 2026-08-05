"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

const TECH_MARQUEE = [
  "Next.js", "React", "TypeScript", "Python", "NestJS", "Node.js",
  "C# .NET", "SQL Server", "PostgreSQL", "Docker", "CI/CD",
  "AI Agents", "LLM APIs", "RAG", "Tailwind CSS", "Vite", "GraphQL",
];

interface SkillSlab {
  layer: string;
  title: string;
  desc: string;
  techs: string[];
  color: string;
  progress: number;
  icon: string;
}

// Animated progress bar that triggers when in view
function AnimatedBar({ progress, color }: { progress: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(progress), 200);
        observer.disconnect();
      }
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [progress]);

  return (
    <div ref={ref} className="progress-track">
      <div
        className="progress-fill"
        style={{
          width: `${width}%`,
          background: color,
          boxShadow: `0 0 10px ${color}66`,
          transition: "width 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}

// 3D tilt card
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

export default function SkillsChapter() {
  const { t } = usePortfolio();

  const slabs: SkillSlab[] = [
    {
      layer: "04 — AI INTELLIGENCE",
      title: t.skills.domains.ai,
      desc: "LLM APIs · Custom AI Agents · Embeddings · RAG Architectures",
      techs: ["LLM Manipulation", "Custom AI Agents", "RAG Pipelines", "Embeddings"],
      color: "var(--emerald-500)",
      progress: 94,
      icon: "🤖",
    },
    {
      layer: "03 — INTERFACE",
      title: t.skills.domains.frontend,
      desc: "App Router · WebGL/R3F · Tailwind CSS · Responsive UX",
      techs: ["Next.js", "React", "Vite", "TypeScript", "Tailwind CSS"],
      color: "var(--sky-500)",
      progress: 96,
      icon: "⚡",
    },
    {
      layer: "02 — LOGIC & SECURITY",
      title: t.skills.domains.backend,
      desc: "Field-Level Audit · App Security · REST/GraphQL Microservices",
      techs: ["NestJS", "Node.js", "C# .NET", "Python", "Security"],
      color: "var(--violet-400)",
      progress: 92,
      icon: "🔐",
    },
    {
      layer: "01 — DATA & INFRASTRUCTURE",
      title: t.skills.domains.devops,
      desc: "SQL Server · PostgreSQL · Redis · Automated CI/CD · Docker",
      techs: ["SQL Databases", "DevOps", "PostgreSQL", "Docker", "CI/CD"],
      color: "var(--rose-500)",
      progress: 90,
      icon: "🏗️",
    },
  ];

  return (
    <div className="story-chapter story-chapter-interactive">
      <div style={{ width: "100%", maxWidth: "var(--content-max)", display: "flex", flexDirection: "column", gap: "48px" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <div className="section-badge" style={{ justifyContent: "center" }}>{t.skills.badge}</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "8px" }}>
            {t.skills.heading}
          </h2>
          <p style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            color: "var(--text-muted)",
            marginTop: "12px",
            maxWidth: "500px",
            margin: "12px auto 0",
            lineHeight: "1.65",
          }}>
            {t.skills.subheading}
          </p>
        </motion.div>

        {/* 2×2 Skill Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(14px, 2.5vw, 22px)",
        }}>
          {slabs.map((s, i) => (
            <motion.div
              key={s.layer}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard>
                <div
                  className="glass-card"
                  style={{
                    padding: "clamp(20px, 3vw, 28px)",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Background accent glow */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "120px",
                    height: "120px",
                    borderRadius: "0 20px 0 100%",
                    background: `${s.color}0a`,
                    pointerEvents: "none",
                  }} />

                  {/* Icon + Layer label */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                    }}>
                      {s.icon}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: s.color,
                        letterSpacing: "0.16em",
                        opacity: 0.8,
                      }}>
                        {s.layer}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: s.color,
                        lineHeight: 1,
                        marginTop: "2px",
                      }}>
                        {s.progress}%
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                      fontWeight: 700,
                      color: "var(--text-heading)",
                      marginBottom: "6px",
                    }}>
                      {s.title}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      lineHeight: "1.55",
                    }}>
                      {s.desc}
                    </div>
                  </div>

                  {/* Animated Progress */}
                  <AnimatedBar progress={s.progress} color={s.color} />

                  {/* Tech chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "4px" }}>
                    {s.techs.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.06, y: -1 }}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.66rem",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          background: `${s.color}12`,
                          color: s.color,
                          border: `1px solid ${s.color}28`,
                          cursor: "default",
                          transition: "all 0.2s ease",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Marquee Tech Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ overflow: "hidden" }}
        >
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "var(--text-dim)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "14px",
          }}>
            Featured Technologies
          </div>
          <div
            className="marquee-track"
            style={{ borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)", padding: "14px 0" }}
          >
            <div className="marquee-content">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.08em",
                    display: "flex",
                    alignItems: "center",
                    gap: "48px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tech}
                  <span style={{ color: "var(--sky-500)", opacity: 0.35, marginLeft: "0" }}>◆</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
