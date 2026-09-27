"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function SectionLabel() {
  const [current, setCurrent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = usePortfolio();

  const sections = [
    { index: 0, label: t.sections.heroTitle, sublabel: t.sections.heroSub, progress: "01 / 07" },
    { index: 1, label: t.sections.aboutTitle, sublabel: t.sections.aboutSub, progress: "02 / 07" },
    { index: 2, label: t.sections.skillsTitle, sublabel: t.sections.skillsSub, progress: "03 / 07" },
    { index: 3, label: t.sections.flowTitle, sublabel: t.sections.flowSub, progress: "04 / 07" },
    { index: 4, label: t.sections.projectsTitle, sublabel: t.sections.projectsSub, progress: "05 / 07" },
    { index: 5, label: t.sections.timelineTitle, sublabel: t.sections.timelineSub, progress: "06 / 07" },
    { index: 6, label: t.sections.contactTitle, sublabel: t.sections.contactSub, progress: "07 / 07" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalH > 0 ? scrollY / totalH : 0;
      setScrollProgress(p);
      const idx = Math.min(Math.floor(p * sections.length), sections.length - 1);
      setCurrent(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  const section = sections[current];
  const stationProgress =
    Math.min(1, (scrollProgress - current * (1 / sections.length)) / (1 / sections.length)) * 100;

  return (
    <>
      {/* Bottom-left: Journey progress & Orbital Radar */}
      <div
        className="section-label-progress"
        style={{
          position: "fixed",
          bottom: "28px",
          left: "28px",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "auto",
        }}
      >
        {/* Orbital Radar Minimap */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 12px",
            borderRadius: "14px",
            background: "var(--glass-bg)",
            backdropFilter: "blur(14px)",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 64 64" style={{ overflow: "visible" }}>
            {/* Outer orbit circle */}
            <circle
              cx="32"
              cy="32"
              r="24"
              fill="none"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            {/* Center gravity core */}
            <circle
              cx="32"
              cy="32"
              r="3.5"
              fill="#38bdf8"
              opacity="0.85"
            />
            {/* 7 Station nodes */}
            {sections.map((_, i) => {
              const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
              const sx = 32 + 24 * Math.cos(a);
              const sy = 32 + 24 * Math.sin(a);
              const isActive = current === i;
              return (
                <circle
                  key={i}
                  cx={sx}
                  cy={sy}
                  r={isActive ? 3.5 : 2}
                  fill={isActive ? "#00f5ff" : "rgba(255,255,255,0.4)"}
                  stroke={isActive ? "#38bdf8" : "none"}
                  strokeWidth="1.5"
                  style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                  onClick={() => {
                    const totalH = document.documentElement.scrollHeight - window.innerHeight;
                    window.scrollTo({ top: (i / (sections.length - 1)) * totalH, behavior: "smooth" });
                  }}
                />
              );
            })}
            {/* Camera angle indicator blip */}
            {(() => {
              const camAngle = scrollProgress * Math.PI * 2 - Math.PI / 2;
              const bx = 32 + 24 * Math.cos(camAngle);
              const by = 32 + 24 * Math.sin(camAngle);
              return (
                <g>
                  <line
                    x1="32"
                    y1="32"
                    x2={bx}
                    y2={by}
                    stroke="rgba(0, 245, 255, 0.6)"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx={bx}
                    cy={by}
                    r="4.5"
                    fill="none"
                    stroke="#00f5ff"
                    strokeWidth="1.8"
                  />
                </g>
              );
            })()}
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--sky-400)",
                letterSpacing: "0.14em",
                fontWeight: 700,
              }}
            >
              ORBITAL RADAR
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
              }}
            >
              STATION {current + 1} / 7 ACTIVE
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--sky-500)",
              letterSpacing: "0.12em",
            }}>
              {section.progress}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.56rem",
              color: "var(--text-dim)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}>
              {section.sublabel}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress track */}
        <div style={{
          width: "140px",
          height: "2px",
          background: "var(--glass-border)",
          borderRadius: "1px",
          overflow: "hidden",
        }}>
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--violet-500), var(--sky-500))",
              borderRadius: "1px",
              boxShadow: "0 0 6px var(--sky-glow)",
            }}
            animate={{ width: `${Math.max(2, stationProgress)}%` }}
            transition={{ duration: 0.08 }}
          />
        </div>

        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.52rem",
          color: "var(--text-dim)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}>
          {t.sections.location}
        </div>
      </div>

      {/* Bottom-right: Section name label */}
      <div
        className="section-label-name"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "52px",
          zIndex: 20,
          textAlign: "right",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${current}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
            }}
          >
            {section.label}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .section-label-progress,
          .section-label-name {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

