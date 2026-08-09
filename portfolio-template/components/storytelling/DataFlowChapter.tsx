"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

const METRICS = [
  { value: "9K+", label: "Particles Rendered", color: "var(--sky-500)" },
  { value: "< 50ms", label: "Pipeline Latency", color: "var(--violet-400)" },
  { value: "100%", label: "Audit Coverage", color: "var(--emerald-500)" },
];

export default function DataFlowChapter() {
  const { t } = usePortfolio();

  const steps = t.flow.steps;
  const colors = [
    "var(--sky-500)",
    "var(--violet-400)",
    "var(--emerald-500)",
    "var(--rose-500)",
  ];

  return (
    <div className="story-chapter story-chapter-interactive">
      <div style={{ width: "100%", maxWidth: "var(--content-narrow)", display: "flex", flexDirection: "column", gap: "52px", alignItems: "center" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <div className="section-badge" style={{ justifyContent: "center" }}>{t.flow.badge}</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "8px" }}>
            {t.flow.heading.split("Compute")[0]}
            <span className="glow-sky">
              {t.flow.heading.includes("Compute") ? "Compute Pipeline" : t.flow.heading}
            </span>
          </h2>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            lineHeight: "1.7",
            maxWidth: "620px",
            margin: "16px auto 0",
          }}>
            {t.flow.subheading}
          </p>
        </motion.div>

        {/* Animated Flow Diagram */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
          {steps.map((step, i) => {
            const color = colors[i % colors.length];
            const isLast = i === steps.length - 1;
            return (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "relative" }}
              >
                {/* Connector line */}
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.4, duration: 0.4 }}
                    style={{
                      position: "absolute",
                      left: "27px",
                      top: "100%",
                      width: "2px",
                      height: "28px",
                      background: `linear-gradient(180deg, ${color}, ${colors[(i + 1) % colors.length]})`,
                      transformOrigin: "top",
                      zIndex: 0,
                      opacity: 0.5,
                    }}
                  />
                )}

                {/* Step Card */}
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card"
                  style={{
                    padding: "22px 24px 22px 70px",
                    borderRadius: "var(--radius-md)",
                    marginBottom: isLast ? 0 : "28px",
                    position: "relative",
                    borderLeft: `3px solid ${color}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {/* Step node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
                    style={{
                      position: "absolute",
                      left: "-19px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "var(--void-900)",
                      border: `2px solid ${color}`,
                      boxShadow: `0 0 16px ${color}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    <div style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                    }} />
                  </motion.div>

                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: color,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}>
                    STEP {i + 1} — {step.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: color,
                  }}>
                    {step.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    lineHeight: "1.6",
                  }}>
                    {step.desc}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px",
            width: "100%",
          }}
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass"
              style={{
                padding: "18px 14px",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
                border: `1px solid ${m.color}22`,
                background: `${m.color}08`,
              }}
            >
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: m.color,
                lineHeight: 1,
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--text-dim)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: "6px",
              }}>
                {m.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
