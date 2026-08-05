"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePortfolio } from "@/components/context/PortfolioContext";

// Typewriter hook
function useTypewriter(text: string, speed = 42, delay = 800) {
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

export default function HeroChapter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { t, language } = usePortfolio();

  const roles = language === "fr" ? ROLES_FR : ROLES_EN;

  const { displayed: typewriterText, done: typewriterDone } = useTypewriter(
    roles[roleIndex % roles.length],
    55,
    1000
  );

  // Cycle through roles
  useEffect(() => {
    const cycleTimer = setTimeout(() => {
      if (typewriterDone) {
        const pauseTimer = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
        return () => clearTimeout(pauseTimer);
      }
    }, 200);
    return () => clearTimeout(cycleTimer);
  }, [typewriterDone, roleIndex, roles.length]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 14,
        y: (e.clientY / innerHeight - 0.5) * 14,
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const staggerChild = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
  };

  const specs = t.hero.role.split(" · ");

  return (
    <div
      className="story-chapter story-chapter-interactive"
      ref={containerRef}
      style={{ paddingTop: "clamp(120px, 16vh, 180px)" }}
    >
      {/* Floating decorative particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
          style={{
            position: "absolute",
            width: i % 2 === 0 ? "4px" : "2px",
            height: i % 2 === 0 ? "4px" : "2px",
            borderRadius: "50%",
            background: i % 3 === 0 ? "var(--sky-500)" : i % 3 === 1 ? "var(--violet-400)" : "var(--gold-400)",
            left: `${15 + i * 13}%`,
            top: `${20 + (i % 3) * 18}%`,
            boxShadow: `0 0 8px currentColor`,
            pointerEvents: "none",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        style={{
          maxWidth: "var(--content-max)",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* ── Left: Content Column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Location Badge */}
          <motion.div
            {...staggerChild}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 16px",
              borderRadius: "999px",
              alignSelf: "flex-start",
              border: "1px solid rgba(56,189,248,0.2)",
              background: "rgba(56,189,248,0.06)",
            }}
          >
            <span style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--sky-500)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              {t.sections.location}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--sky-500)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}>
              {t.hero.badge}
            </div>
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
              fontWeight: 800,
              color: "var(--text-heading)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}>
              Building{" "}
              <span className="text-aurora">Intelligent,</span>
              <br />
              <span style={{ color: "var(--text-heading)" }}>Scalable Systems.</span>
            </h1>
          </motion.div>

          {/* Name + Typewriter Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <div style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              MAHDI DJERIDI
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.82rem, 1.4vw, 1rem)",
              color: "var(--sky-500)",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              height: "1.6em",
            }}>
              <span>{typewriterText}</span>
              <span className="cursor-blink" />
            </div>
          </motion.div>

          {/* Specialization Chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            {specs.map((spec, i) => (
              <motion.span
                key={spec}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass"
                style={{
                  padding: "7px 18px",
                  borderRadius: "999px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--sky-500)",
                  cursor: "default",
                  border: "1px solid rgba(56,189,248,0.2)",
                  background: "rgba(56,189,248,0.06)",
                  letterSpacing: "0.04em",
                  transition: "all 0.25s ease",
                }}
              >
                {spec}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const stationList = ["ch-hero", "ch-about", "ch-skills", "ch-flow", "ch-projects", "ch-timeline", "ch-contact"];
                const idx = stationList.indexOf("ch-projects");
                const totalH = document.documentElement.scrollHeight - window.innerHeight;
                const targetScroll = (idx / (stationList.length - 1)) * totalH;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }}
              className="btn-primary"
              style={{ pointerEvents: "all" }}
            >
              <span>{t.hero.exploreWork}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary"
              style={{ pointerEvents: "all" }}
            >
              <span>{t.hero.viewResume}</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div style={{
                width: "1px",
                height: "32px",
                background: "linear-gradient(180deg, var(--sky-500), transparent)",
                opacity: 0.6,
              }} />
              <div style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--sky-500)",
                boxShadow: "0 0 6px var(--sky-glow)",
              }} />
            </motion.div>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              color: "var(--text-dim)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}>
              scroll to explore
            </span>
          </motion.div>
        </div>

        {/* ── Right: Avatar Visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
            transition: "transform 0.4s ease-out",
          }}
        >
          {/* Background aurora glow */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-40px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(56,189,248,0.2) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
              filter: "blur(24px)",
              pointerEvents: "none",
            }}
          />

          {/* Outer orbital ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "-20px",
              borderRadius: "50%",
              border: "1px solid rgba(56,189,248,0.12)",
              borderTopColor: "rgba(56,189,248,0.4)",
              pointerEvents: "none",
            }}
          />

          {/* Inner orbital ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              border: "1px dashed rgba(139,92,246,0.18)",
              borderRightColor: "rgba(139,92,246,0.45)",
              pointerEvents: "none",
            }}
          />

          {/* Avatar container */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "relative",
              width: "clamp(160px, 18vw, 220px)",
              height: "clamp(160px, 18vw, 220px)",
              borderRadius: "50%",
              overflow: "hidden",
              background: "var(--void-950)",
              boxShadow: "0 0 0 2px rgba(56,189,248,0.4), 0 0 40px rgba(56,189,248,0.15), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Mahdi Djeridi"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(56,189,248,0.08) 0%, transparent 50%, rgba(139,92,246,0.06) 100%)",
              pointerEvents: "none",
            }} />
          </motion.div>

          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass"
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "6px 16px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
              border: "1px solid rgba(56,189,248,0.2)",
              background: "rgba(7,7,15,0.85)",
            }}
          >
            <span style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981",
            }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--sky-500)",
              letterSpacing: "0.14em",
              fontWeight: 600,
            }}>
              OPEN TO WORK
            </span>
          </motion.div>

          {/* Floating stat badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass"
            style={{
              position: "absolute",
              top: "16px",
              right: "-16px",
              padding: "10px 14px",
              borderRadius: "14px",
              border: "1px solid rgba(56,189,248,0.2)",
              background: "rgba(7,7,15,0.88)",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "var(--sky-500)" }}>3+</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Years</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass"
            style={{
              position: "absolute",
              bottom: "40px",
              left: "-20px",
              padding: "10px 14px",
              borderRadius: "14px",
              border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(7,7,15,0.88)",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "var(--violet-400)" }}>AI</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Certified</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-avatar { display: none !important; }
        }
      `}</style>
    </div>
  );
}
