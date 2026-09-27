"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function HeaderControls() {
  const { language, setLanguage, theme, setTheme, t } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("ch-hero");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isFr = language === "fr";

  const navItems = [
    { label: isFr ? "À Propos" : "About", id: "ch-about", num: "01" },
    { label: isFr ? "Stack" : "Stack", id: "ch-skills", num: "02" },
    { label: isFr ? "Flux IA" : "AI Flow", id: "ch-flow", num: "03" },
    { label: isFr ? "Projets" : "Projects", id: "ch-projects", num: "04" },
    { label: isFr ? "Parcours" : "Timeline", id: "ch-timeline", num: "05" },
    { label: isFr ? "Contact" : "Contact", id: "ch-contact", num: "06" },
  ];

  const toggleLanguage = () => setLanguage(language === "en" ? "fr" : "en");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via scroll position
  useEffect(() => {
    const stationList = ["ch-hero", "ch-about", "ch-skills", "ch-flow", "ch-projects", "ch-timeline", "ch-contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalH > 0 ? scrollY / totalH : 0;
      const idx = Math.min(Math.floor(progress * stationList.length), stationList.length - 1);
      setActiveSection(stationList[idx]);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const stationList = ["ch-hero", "ch-about", "ch-skills", "ch-flow", "ch-projects", "ch-timeline", "ch-contact"];
    const idx = stationList.indexOf(id);
    if (idx === -1) return;
    const totalH = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (idx / (stationList.length - 1)) * totalH;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════
          FLOATING DYNAMIC ISLAND CAPSULE NAVBAR
         ════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: scrolled ? "10px 20px" : "16px 20px",
          pointerEvents: "none",
          transition: "padding 0.35s ease",
        }}
      >
        <div
          style={{
            pointerEvents: "all",
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: scrolled ? "7px 14px 7px 18px" : "10px 18px 10px 22px",
            borderRadius: "9999px",
            background: scrolled
              ? theme === "dark"
                ? "rgba(10, 15, 30, 0.85)"
                : "rgba(255, 255, 255, 0.92)"
              : theme === "dark"
              ? "rgba(10, 15, 30, 0.55)"
              : "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid",
            borderColor: scrolled
              ? "rgba(56, 189, 248, 0.25)"
              : "rgba(255, 255, 255, 0.08)",
            boxShadow: scrolled
              ? "0 12px 36px -4px rgba(0, 0, 0, 0.5), 0 0 20px -4px rgba(56, 189, 248, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
              : "0 4px 20px -2px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
            transition: "all 0.35s ease",
          }}
        >
          {/* ── Brand & Monogram Logo ── */}
          <motion.button
            onClick={() => scrollToSection("ch-hero")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: 0,
            }}
          >
            {/* Studio Monogram Emblem */}
            <div
              style={{
                position: "relative",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(139, 92, 246, 0.18))",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(56, 189, 248, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-heading)",
                  background: "linear-gradient(135deg, #38bdf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.04em",
                }}
              >
                MD
              </span>
            </div>

            {/* Identity & Status */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                lineHeight: 1.2,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Mahdi Djeridi
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                    animation: "pulse-glow 2s ease-in-out infinite",
                  }}
                  title={isFr ? "Disponible pour opportunités" : "Available for opportunities"}
                />
              </div>

              <span
                style={{
                  fontSize: "0.62rem",
                  color: "var(--sky-400)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {isFr ? "Architecte IA & Systèmes" : "Full-Stack & AI Architect"}
              </span>
            </div>
          </motion.button>

          {/* ── Sliding Kinetic Nav Links (Desktop) ── */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: theme === "dark" ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.85)",
              padding: "3px 4px",
              borderRadius: "9999px",
              border: "1px solid var(--glass-border)",
            }}
            className="desktop-nav"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  style={{
                    position: "relative",
                    background: "transparent",
                    border: "none",
                    borderRadius: "9999px",
                    color: isActive ? "var(--text-heading)" : isHovered ? "var(--text-heading)" : "var(--text-muted)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 600 : 500,
                    cursor: "pointer",
                    padding: "6px 13px",
                    transition: "color 0.2s ease",
                    letterSpacing: "0.02em",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    outline: "none",
                  }}
                >
                  {/* Sliding active pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navbarActivePill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "9999px",
                        background: theme === "dark" ? "linear-gradient(135deg, rgba(56, 189, 248, 0.22), rgba(129, 140, 248, 0.18))" : "rgba(255, 255, 255, 0.95)",
                        border: "1px solid rgba(56, 189, 248, 0.45)",
                        boxShadow: theme === "dark" ? "0 0 16px -2px rgba(56, 189, 248, 0.35)" : "0 2px 8px rgba(0, 0, 0, 0.08)",
                        zIndex: 0,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: isActive ? "var(--sky-400)" : "var(--text-dim)",
                      opacity: 0.8,
                    }}
                  >
                    {item.num}
                  </span>
                  <span style={{ position: "relative", zIndex: 1 }}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Action Suite & Controls ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Direct CV Download Pill */}
            <motion.a
              href="/djeridi-mahdi-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="desktop-cv-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 12px",
                borderRadius: "9999px",
                background: "rgba(56, 189, 248, 0.08)",
                border: "1px solid rgba(56, 189, 248, 0.28)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "var(--sky-400)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--sky-400)";
                e.currentTarget.style.boxShadow = "0 0 14px rgba(56, 189, 248, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.28)";
                e.currentTarget.style.boxShadow = "none";
              }}
              title="Download Resume (PDF)"
            >
              <span>CV</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            {/* Segmented Sliding Language Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "2px",
                borderRadius: "9999px",
                background: theme === "dark" ? "rgba(15, 23, 42, 0.5)" : "rgba(241, 245, 249, 0.9)",
                border: "1px solid var(--glass-border)",
                cursor: "pointer",
              }}
              onClick={toggleLanguage}
              title={language === "en" ? "Passer en Français" : "Switch to English"}
            >
              <div
                style={{
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: language === "en" ? "#ffffff" : "var(--text-dim)",
                  background: language === "en" ? "rgba(56, 189, 248, 0.25)" : "transparent",
                  border: language === "en" ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                EN
              </div>
              <div
                style={{
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: language === "fr" ? "#ffffff" : "var(--text-dim)",
                  background: language === "fr" ? "rgba(56, 189, 248, 0.25)" : "transparent",
                  border: language === "fr" ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                FR
              </div>
            </div>

            {/* Sleek SVG Theme Switcher */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              aria-label="Toggle theme"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "1px solid var(--glass-border)",
                background: theme === "dark" ? "rgba(15, 23, 42, 0.5)" : "rgba(241, 245, 249, 0.9)",
                backdropFilter: "blur(12px)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme === "dark" ? "#fbbf24" : "#818cf8",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme === "dark" ? "#fbbf24" : "#818cf8";
                e.currentTarget.style.boxShadow = theme === "dark" ? "0 0 12px rgba(251, 191, 36, 0.3)" : "0 0 12px rgba(129, 140, 248, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            {/* High-Converting "Let's Talk" CTA */}
            <motion.button
              onClick={() => scrollToSection("ch-contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="desktop-contact-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #0284c7, #6366f1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 0 16px -2px rgba(99, 102, 241, 0.4)",
                fontFamily: "var(--font-heading)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#ffffff",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              <span>{isFr ? "Discuter" : "Let's Talk"}</span>
              <span style={{ fontSize: "0.75rem" }}>→</span>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--glass-border)",
                background: theme === "dark" ? "rgba(15, 23, 42, 0.6)" : "rgba(241, 245, 249, 0.9)",
                backdropFilter: "blur(12px)",
                cursor: "pointer",
                display: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                padding: "8px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={
                    menuOpen
                      ? i === 1
                        ? { opacity: 0, scaleX: 0 }
                        : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 7 : -7 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "block",
                    width: "16px",
                    height: "1.5px",
                    background: "var(--text-heading)",
                    borderRadius: "1px",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ════════════════════════════════════════════════════
          MOBILE COMMAND DRAWER
         ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 60,
                background: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(8px)",
                pointerEvents: "all",
              }}
            />

            {/* Slide-over Command Drawer */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(340px, 86vw)",
                background: theme === "dark" ? "rgba(10, 14, 26, 0.96)" : "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(32px)",
                borderLeft: "1px solid rgba(56, 189, 248, 0.2)",
                boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.6)",
                zIndex: 65,
                padding: "24px 28px 36px",
                display: "flex",
                flexDirection: "column",
                pointerEvents: "all",
              }}
            >
              {/* Drawer Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "20px",
                  borderBottom: "1px solid var(--glass-border)",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))",
                      border: "1px solid rgba(56, 189, 248, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "var(--sky-400)",
                    }}
                  >
                    MD
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-heading)" }}>
                      Mahdi Djeridi
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                      <span>{isFr ? "Disponible" : "Available · Algiers"}</span>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Navigation Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Navigation
                </div>

                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        background: isActive ? "rgba(56, 189, 248, 0.1)" : "transparent",
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 14px",
                        textAlign: "left",
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "var(--sky-400)" : "var(--text-heading)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)" }}>
                          {item.num}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <span style={{ color: isActive ? "var(--sky-400)" : "var(--text-dim)", fontSize: "0.9rem" }}>
                        →
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Drawer Footer Actions */}
              <div
                style={{
                  paddingTop: "20px",
                  borderTop: "1px solid var(--glass-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Download CV */}
                <a
                  href="/djeridi-mahdi-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>{isFr ? "Télécharger CV (PDF)" : "Download Resume (PDF)"}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* Social & Switchers */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <a
                      href="https://github.com/djeridimahdi10-creator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass"
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "0.74rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-heading)",
                        textDecoration: "none",
                      }}
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mehdi-djeridi-7b924b2a4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass"
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "0.74rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--sky-400)",
                        textDecoration: "none",
                      }}
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      onClick={toggleLanguage}
                      className="glass"
                      style={{
                        padding: "8px 10px",
                        borderRadius: "8px",
                        fontSize: "0.74rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-heading)",
                        cursor: "pointer",
                      }}
                    >
                      {language.toUpperCase()}
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="glass"
                      style={{
                        padding: "8px 10px",
                        borderRadius: "8px",
                        fontSize: "0.74rem",
                        cursor: "pointer",
                      }}
                    >
                      {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* ── Responsive Styling ── */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cv-btn { display: none !important; }
          .desktop-contact-pill { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
