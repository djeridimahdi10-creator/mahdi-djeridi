"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StationOverlays() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalH > 0 ? scrollY / totalH : 0;
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active station index (0 to 4)
  const currentStation = Math.min(
    Math.floor(scrollProgress * 5),
    4
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <AnimatePresence mode="wait">
        {currentStation === 0 && <HeroOverlay key="hero" />}
        {currentStation === 1 && <StackOverlay key="stack" />}
        {currentStation === 2 && <DataFlowOverlay key="dataflow" />}
        {currentStation === 3 && <ProjectsOverlay key="projects" />}
        {currentStation === 4 && <AboutOverlay key="about" />}
      </AnimatePresence>
    </div>
  );
}

/* ── Station 1: Hero Overlay ─────────────────────── */
function HeroOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: "center",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.2rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "rgba(0, 245, 255, 0.7)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        ◈ ALGIERS, ALGERIA
      </div>

      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "3.2rem",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: "1.15",
          letterSpacing: "-0.02em",
          textShadow: "0 0 30px rgba(0, 245, 255, 0.3)",
        }}
      >
        Building Intelligent,{" "}
        <span className="glow-cyan">Scalable Systems.</span>
      </h1>

      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.4rem",
          fontWeight: 600,
          color: "#e2e8f0",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        MAHDI DJERIDI
      </div>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "rgba(0, 245, 255, 0.8)",
          letterSpacing: "0.15em",
        }}
      >
        FULL-STACK & AI SOFTWARE ENGINEER
      </div>

      {/* Specialization Chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginTop: "0.8rem",
          pointerEvents: "all",
        }}
      >
        {[
          "AI Agent Architecture",
          "Application Security",
          "DevOps Pipelines",
          "High-Performance Systems",
        ].map((spec) => (
          <span
            key={spec}
            className="glass"
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "#00f5ff",
              border: "1px solid rgba(0, 245, 255, 0.25)",
              background: "rgba(0, 245, 255, 0.05)",
            }}
          >
            {spec}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Station 2: Stack Overlay ────────────────────── */
function StackOverlay() {
  const slabs = [
    {
      layer: "04 — AI INTELLIGENCE",
      title: "LLM Agents & AI Integration",
      techs: ["LLM APIs", "Custom AI Agents", "Embeddings", "RAG"],
      color: "#10b981",
    },
    {
      layer: "03 — INTERFACE",
      title: "Next.js · React · Vite",
      techs: ["Next.js", "React", "Vite", "TypeScript", "Tailwind"],
      color: "#00f5ff",
    },
    {
      layer: "02 — LOGIC & SECURITY",
      title: "NestJS · Node.js · C#/.NET · Python",
      techs: ["NestJS", "Node.js", "C# .NET", "Python", "App Security"],
      color: "#7c3aed",
    },
    {
      layer: "01 — DATA & INFRASTRUCTURE",
      title: "SQL Databases & DevOps Pipelines",
      techs: ["SQL Server", "PostgreSQL", "Docker", "CI/CD"],
      color: "#ef4444",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        maxWidth: "850px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          Tech Stack Architecture
        </h2>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "rgba(0,245,255,0.6)",
            letterSpacing: "0.15em",
          }}
        >
          LAYERED SYSTEM FOUNDATION
        </div>
      </div>

      {slabs.map((s, i) => (
        <motion.div
          key={s.layer}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass"
          style={{
            padding: "16px 24px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: `4px solid ${s.color}`,
            background: "rgba(6, 6, 15, 0.75)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: s.color,
                letterSpacing: "0.15em",
              }}
            >
              {s.layer}
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#ffffff",
                marginTop: "2px",
              }}
            >
              {s.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {s.techs.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.05)",
                  color: "#e2e8f0",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Station 3: Data Flow Overlay ────────────────── */
function DataFlowOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: "center",
        maxWidth: "700px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "2.4rem",
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        AI & Real-Time Data Flow
      </h2>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "rgba(255, 255, 255, 0.7)",
          lineHeight: "1.6",
        }}
      >
        Automated field-level audit log tracking & real-time pipeline processing.
        Intelligent AI agents map data across domain, infrastructure, and presentation layers.
      </p>
      <div style={{ display: "flex", gap: "16px", marginTop: "1rem" }}>
        <Chip label="9,000+ GPU Particles" color="#00f5ff" />
        <Chip label="Real-time Stream Sync" color="#a855f7" />
        <Chip label="Automated Audit Logs" color="#10b981" />
      </div>
    </motion.div>
  );
}

/* ── Station 4: Projects Overlay ─────────────────── */
function ProjectsOverlay() {
  const projects = [
    {
      code: "PRJ-01 · LIVE",
      title: "PC Labs — Interactive Hardware Simulator",
      tech: "Next.js · React · TypeScript · Vercel",
      desc: "Interactive PC building & hardware optimization app. Features real-time component compatibility analysis, dynamic specs visualizer, & performance benchmarking.",
      color: "#00f5ff",
      link: "https://pc-labs-app.vercel.app/",
    },
    {
      code: "PRJ-02 · LIVE",
      title: "Aura Bags — B2B Packaging Portal",
      tech: "Next.js · React · TypeScript · Vercel",
      desc: "Industrial B2B packaging & flour bag portal. Features custom specs builder (Woven PP, Kraft, BOPP), order tracking, & production line analytics.",
      color: "#d4a754",
      link: "https://bags-factory.vercel.app/",
    },
    {
      code: "PRJ-03",
      title: "AI-Driven Automated Audit System",
      tech: "Python · C#/.NET · Next.js",
      desc: "Field-level audit log & automated modification tracking system. Integrated AI agents manipulate and analyze data flows across domain & presentation layers.",
      color: "#a855f7",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        maxWidth: "1050px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          Featured Projects
        </h2>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "rgba(0,245,255,0.6)",
            letterSpacing: "0.15em",
          }}
        >
          SELECTED WORK
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", pointerEvents: "all" }}>
        {projects.map((p) => (
          <motion.div
            key={p.code}
            whileHover={{ y: -6, borderColor: p.color }}
            className="glass"
            style={{
              padding: "24px",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: "rgba(4, 4, 14, 0.85)",
              border: `1px solid rgba(255,255,255,0.1)`,
              transition: "border-color 0.3s, transform 0.3s",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: p.color,
                letterSpacing: "0.15em",
              }}
            >
              {p.code}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.15rem",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: "1.3",
              }}
            >
              {p.title}
            </h3>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "rgba(0,245,255,0.7)",
              }}
            >
              {p.tech}
            </div>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: "1.55",
              }}
            >
              {p.desc}
            </p>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "auto",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: p.color,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontWeight: 600,
                }}
              >
                Launch App ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Station 5: About Me Overlay ─────────────────── */
function AboutOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        maxWidth: "900px",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: "24px",
        pointerEvents: "all",
      }}
    >
      {/* Terminal window */}
      <div
        className="glass"
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          background: "rgba(2, 2, 10, 0.9)",
          border: "1px solid rgba(0, 245, 255, 0.2)",
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            background: "rgba(10, 10, 25, 0.8)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.4)",
              marginLeft: "auto",
            }}
          >
            mahdi@portfolio: ~/about
          </span>
        </div>
        <div
          style={{
            padding: "18px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            lineHeight: "1.75",
            color: "#e2e8f0",
          }}
        >
          <div>
            <span style={{ color: "#10b981" }}>sys@mahdi:~$</span>{" "}
            <span style={{ color: "#00f5ff" }}>whoami</span>
          </div>
          <div style={{ color: "#ffffff", fontWeight: 600 }}>
            Mahdi Djeridi — Full-Stack & AI Software Engineer
          </div>

          <div style={{ marginTop: "10px" }}>
            <span style={{ color: "#10b981" }}>sys@mahdi:~$</span>{" "}
            <span style={{ color: "#00f5ff" }}>cat mindset.txt</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)" }}>
            Deeply passionate about optimizing complex systems — building AI agents, robust DevOps, & studying biomechanics / nutrition science.
          </div>

          <div style={{ marginTop: "10px" }}>
            <span style={{ color: "#10b981" }}>sys@mahdi:~$</span>{" "}
            <span style={{ color: "#00f5ff" }}>cat lifestyle.json</span>
          </div>
          <div style={{ color: "#a855f7" }}>
            &#123;&nbsp;&quot;aesthetic&quot;: &quot;Dark café · neon lighting&quot;,&nbsp;&quot;base&quot;: &quot;Algiers, Algeria&quot;&nbsp;&#125;
          </div>
        </div>
      </div>

      {/* Identity Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {[
          { label: "MINDSET", val: "Systems Optimizer & Architect", color: "#00f5ff" },
          { label: "TRAINING", val: "Weightlifting & Nutrition Science", color: "#a855f7" },
          { label: "BASE", val: "Algiers, Algeria", color: "#10b981" },
          { label: "CULTURE", val: "Modern Action Anime · Mushoku Tensei", color: "#ef4444" },
        ].map((card) => (
          <div
            key={card.label}
            className="glass"
            style={{
              padding: "14px 18px",
              borderRadius: "10px",
              borderLeft: `3px solid ${card.color}`,
              background: "rgba(6, 6, 16, 0.8)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.15em",
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: card.color,
                marginTop: "2px",
              }}
            >
              {card.val}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="glass"
      style={{
        padding: "8px 18px",
        borderRadius: "999px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        color: color,
        border: `1px solid ${color}40`,
        background: `${color}10`,
      }}
    >
      {label}
    </span>
  );
}
