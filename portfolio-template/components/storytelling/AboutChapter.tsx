"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePortfolio } from "@/components/context/PortfolioContext";

// Animated number counter
function Counter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now() + delay;
        const duration = 1400;
        const animate = () => {
          const now = Date.now();
          if (now < startTime) { requestAnimationFrame(animate); return; }
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Live Projects", value: 4, suffix: "+" },
  { label: "Stack Layers", value: 4, suffix: "" },
];

const IDENTITY = [
  { icon: "🧠", label: "Mindset", value: "Systems Optimizer & Architect", color: "var(--sky-500)" },
  { icon: "🏋️", label: "Training", value: "Weightlifting & Nutrition Science", color: "var(--violet-400)" },
  { icon: "📍", label: "Base", value: "Algiers, Algeria", color: "var(--emerald-500)" },
  { icon: "🎌", label: "Culture", value: "Modern Anime · Jujutsu Kaisen", color: "var(--gold-400)" },
];

export default function AboutChapter() {
  const { t } = usePortfolio();

  return (
    <div className="story-chapter story-chapter-interactive" id="about-section">
      <div style={{ width: "100%", maxWidth: "var(--content-max)", display: "flex", flexDirection: "column", gap: "56px" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <div className="section-badge" style={{ justifyContent: "center" }}>
            {(t.sections as unknown as Record<string, string>).about || t.sections.aboutTitle || "About Me"}
          </div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "8px" }}>
            {t.about.heading}
          </h2>
          <p style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            lineHeight: "1.7",
            maxWidth: "560px",
            margin: "16px auto 0",
          }}>
            {t.about.p1}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card"
              style={{
                padding: "28px 24px",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
              }}
            >
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1,
                background: "linear-gradient(135deg, var(--sky-400), var(--violet-400))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                <Counter value={stat.value} suffix={stat.suffix} delay={i * 120} />
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--text-dim)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: "6px",
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content: Terminal + Identity Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "clamp(20px, 3vw, 36px)",
          alignItems: "stretch",
        }}>
          {/* ── Terminal Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong"
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--glass-border)",
            }}
          >
            {/* Terminal Profile Header */}
            <div style={{
              padding: "18px 22px",
              background: "linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(139,92,246,0.08) 100%)",
              borderBottom: "1px solid var(--glass-border)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}>
              {/* Avatar */}
              <div style={{
                position: "relative",
                width: "72px",
                height: "72px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1.5px solid rgba(56,189,248,0.35)",
                boxShadow: "0 0 20px rgba(56,189,248,0.12)",
                flexShrink: 0,
              }}>
                <Image
                  src="/profile.jpg"
                  alt="Mahdi Djeridi"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </div>
              {/* Identity */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--sky-500)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  opacity: 0.75,
                }}>
                  ID: #0094-MD · ACTIVE
                </div>
                <div style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--text-heading)",
                }}>
                  Mahdi Djeridi
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                }}>
                  {t.hero.badge}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--emerald-500)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "2px",
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--emerald-500)", boxShadow: "0 0 6px var(--emerald-500)" }} />
                  {t.sections.location}
                </div>
              </div>
            </div>

            {/* Terminal chrome */}
            <div style={{
              padding: "8px 18px",
              background: "var(--void-900)",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              borderBottom: "1px solid var(--glass-border)",
            }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f43f5e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--sky-500)",
                marginLeft: "auto",
                letterSpacing: "0.1em",
                opacity: 0.65,
              }}>
                mahdi@portfolio: ~/about
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              padding: "22px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              lineHeight: "1.9",
              color: "var(--text-main)",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              <div>
                <span style={{ color: "var(--emerald-500)" }}>sys@mahdi:~$</span>{" "}
                <span style={{ color: "var(--sky-500)" }}>whoami</span>
              </div>
              <div style={{ color: "var(--text-heading)", fontWeight: 600, fontSize: "0.9rem" }}>
                Mahdi Djeridi — {t.hero.badge}
              </div>

              <div>
                <span style={{ color: "var(--emerald-500)" }}>sys@mahdi:~$</span>{" "}
                <span style={{ color: "var(--sky-500)" }}>cat bio.txt</span>
              </div>
              <div style={{ color: "var(--text-muted)" }}>{t.about.p1}</div>

              <div>
                <span style={{ color: "var(--emerald-500)" }}>sys@mahdi:~$</span>{" "}
                <span style={{ color: "var(--sky-500)" }}>cat stack.json</span>
              </div>
              <div style={{ color: "var(--violet-400)" }}>{t.about.p2}</div>

              {/* Blinking cursor */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--emerald-500)" }}>sys@mahdi:~$</span>
                <span className="cursor-blink" />
              </div>
            </div>
          </motion.div>

          {/* ── Identity Cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {t.about.focusItems.map((item, i) => {
              const colors = [
                "var(--sky-500)",
                "var(--violet-400)",
                "var(--emerald-500)",
                "var(--rose-500)",
              ];
              const color = colors[i % colors.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="glass-card"
                  style={{
                    padding: "20px 22px",
                    borderRadius: "var(--radius-md)",
                    borderLeft: `3px solid ${color}`,
                    flex: 1,
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}>
                    {t.about.focus}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: color,
                    marginTop: "4px",
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.74rem",
                    color: "var(--text-muted)",
                    marginTop: "5px",
                    lineHeight: "1.55",
                  }}>
                    {item.desc}
                  </div>
                </motion.div>
              );
            })}

            {/* Personal Identity Chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {IDENTITY.map((item) => (
                <div
                  key={item.label}
                  className="glass"
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.56rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: item.color,
                      marginTop: "2px",
                      lineHeight: "1.3",
                    }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about-section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #about-section > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          #about-section > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
