"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePortfolio } from "@/components/context/PortfolioContext";

interface Project {
  code: string;
  title: string;
  subtitle: string;
  tech: string[];
  desc: string;
  color: string;
  link?: string;
  image?: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    code: "PRJ-01 · FLAGSHIP",
    title: "PC Labs — Interactive Hardware & PC Building Simulator",
    subtitle: "Hardware Optimization · Real-Time Compatibility Engine · Component Customizer",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    desc: "Architected and deployed PC Labs — an interactive web application for configuring, benchmarking, and optimizing high-performance computer builds. Features real-time component compatibility analysis, dynamic specs visualizer, and modern responsive web architecture.",
    color: "var(--sky-500)",
    link: "https://pc-labs-app.vercel.app/",
    image: "/projects/pc-labs.png",
    highlights: ["Live Web App", "Hardware Compatibility Engine", "Real-Time Spec Analytics"],
  },
  {
    code: "PRJ-02 · LIVE APP",
    title: "Aura Bags — Premium B2B Packaging & Manufacturing Portal",
    subtitle: "Industrial B2B Portal · Flour Bag Configurator · Supply Chain Dashboard",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Vercel"],
    desc: "Architected and deployed a full-scale B2B industrial packaging and flour sack manufacturing portal for Aura Bags. Features an interactive material specs builder, custom print configurator, real-time production statistics, admin panel, and full delivery tracking system.",
    color: "#d4a754",
    link: "https://bags-factory.vercel.app/",
    image: "/projects/bags-factory.png",
    highlights: ["Live Web App", "B2B Custom Packaging Builder", "Admin Panel + Order Tracking"],
  },
];

export default function ProjectsChapter() {
  const { t } = usePortfolio();

  return (
    <div className="story-chapter story-chapter-interactive" style={{ padding: "var(--section-padding-y) var(--section-padding-x)" }}>
      <div style={{ width: "100%", maxWidth: "var(--content-max)", display: "flex", flexDirection: "column", gap: "52px" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <div className="section-badge" style={{ justifyContent: "center" }}>{t.projects.badge}</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "8px" }}>
            {t.projects.heading}
          </h2>
          <p style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            color: "var(--text-muted)",
            marginTop: "12px",
          }}>
            {t.projects.subheading}
          </p>
        </motion.div>

        {/* Projects — Full-width alternating cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card"
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.05fr" : "1.05fr 1fr",
                border: `1px solid ${p.color}22`,
              }}
            >
              {/* Content panel (right for odd index) */}
              {i % 2 !== 0 && <ProjectContent p={p} />}

              {/* Image panel */}
              {p.image ? (
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "relative",
                    minHeight: "340px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: i % 2 === 0
                      ? "linear-gradient(to left, rgba(7,7,15,0.25) 0%, transparent 60%)"
                      : "linear-gradient(to right, rgba(7,7,15,0.25) 0%, transparent 60%)",
                  }} />
                  {/* Live badge */}
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 14px",
                    borderRadius: "999px",
                    background: "rgba(7,7,15,0.82)",
                    border: `1px solid ${p.color}44`,
                    backdropFilter: "blur(12px)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: p.color,
                    letterSpacing: "0.14em",
                  }}>
                    <span style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: p.color,
                      boxShadow: `0 0 6px ${p.color}`,
                    }} />
                    LIVE
                  </div>
                </motion.div>
              ) : (
                <div style={{
                  background: `radial-gradient(ellipse at center, ${p.color}10, transparent 70%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "280px",
                }}>
                  <div style={{ fontSize: "4rem", opacity: 0.3 }}>⬡</div>
                </div>
              )}

              {/* Content panel (left for even index) */}
              {i % 2 === 0 && <ProjectContent p={p} />}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .glass-card[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function ProjectContent({ p }: { p: Project }) {
  return (
    <div style={{
      padding: "clamp(24px, 4vw, 44px)",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      justifyContent: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: p.color,
          letterSpacing: "0.18em",
          fontWeight: 700,
          textTransform: "uppercase",
        }}>
          {p.code}
        </span>
        <span style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: p.color,
          boxShadow: `0 0 8px ${p.color}`,
        }} />
      </div>

      <div>
        <h3 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
          fontWeight: 700,
          color: "var(--text-heading)",
          lineHeight: "1.25",
          marginBottom: "8px",
        }}>
          {p.title}
        </h3>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-dim)",
          lineHeight: "1.5",
        }}>
          {p.subtitle}
        </div>
      </div>

      <p style={{
        fontFamily: "var(--font-heading)",
        fontSize: "0.9rem",
        color: "var(--text-muted)",
        lineHeight: "1.65",
      }}>
        {p.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {p.highlights.map((h) => (
          <span
            key={h}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              padding: "4px 12px",
              borderRadius: "999px",
              background: `${p.color}12`,
              color: p.color,
              border: `1px solid ${p.color}28`,
            }}
          >
            ✦ {h}
          </span>
        ))}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        paddingTop: "12px",
        borderTop: "1px solid var(--glass-border)",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", flex: 1 }}>
          {p.tech.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.63rem",
                padding: "4px 10px",
                borderRadius: "5px",
                background: "var(--glass-bg)",
                color: "var(--text-main)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {p.link && (
          <motion.a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: p.color,
              background: `${p.color}12`,
              border: `1px solid ${p.color}40`,
              padding: "8px 18px",
              borderRadius: "999px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap",
              transition: "all 0.25s ease",
              boxShadow: `0 4px 16px ${p.color}22`,
            }}
          >
            <span>Launch App</span>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        )}
      </div>
    </div>
  );
}
