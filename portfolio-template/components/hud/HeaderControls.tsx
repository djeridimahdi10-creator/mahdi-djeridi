"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function HeaderControls() {
  const { language, setLanguage, theme, setTheme, t } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: language === "fr" ? "À Propos" : "About", id: "ch-about" },
    { label: language === "fr" ? "Compétences" : "Skills", id: "ch-skills" },
    { label: language === "fr" ? "Projets" : "Work", id: "ch-projects" },
    { label: language === "fr" ? "Parcours" : "Timeline", id: "ch-timeline" },
    { label: language === "fr" ? "Contact" : "Contact", id: "ch-contact" },
  ];

  const toggleLanguage = () => setLanguage(language === "en" ? "fr" : "en");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
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
          padding: scrolled ? "10px 32px" : "18px 32px",
          transition: "padding 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
          background: scrolled
            ? theme === "dark"
              ? "rgba(7, 7, 15, 0.88)"
              : "rgba(255, 255, 255, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--glass-border)" : "1px solid transparent",
          boxShadow: scrolled
            ? theme === "dark"
              ? "0 4px 32px rgba(0,0,0,0.4)"
              : "0 4px 24px rgba(15,23,42,0.08)"
            : "none",
          pointerEvents: "all",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* ── Logo Mark ── */}
        <motion.button
          onClick={() => scrollToSection("ch-hero")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: 0,
          }}
        >
          {/* MD Badge */}
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(139,92,246,0.15))",
            border: "1px solid rgba(56,189,248,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
            fontWeight: 800,
            fontFamily: "var(--font-heading)",
            color: "var(--sky-500)",
            letterSpacing: "-0.04em",
            boxShadow: "0 0 16px rgba(56,189,248,0.12)",
          }}>
            MD
          </div>
          <div style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "var(--text-heading)",
            letterSpacing: "0.01em",
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.2,
          }}>
            <span>Mahdi Djeridi</span>
            <span style={{
              fontSize: "0.58rem",
              color: "var(--sky-500)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              Full-Stack &amp; AI
            </span>
          </div>
        </motion.button>

        {/* ── Desktop Nav Links ── */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: isActive ? "rgba(56,189,248,0.1)" : "transparent",
                  border: isActive ? "1px solid rgba(56,189,248,0.25)" : "1px solid transparent",
                  borderRadius: "8px",
                  color: isActive ? "var(--sky-500)" : "var(--text-muted)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.86rem",
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  padding: "7px 16px",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--text-heading)";
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--glass-bg)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        {/* ── Controls ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Language Toggle */}
          <div
            className="glass"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "5px 12px",
              borderRadius: "999px",
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={toggleLanguage}
          >
            <span style={{
              color: language === "en" ? "var(--sky-500)" : "var(--text-dim)",
              opacity: language === "en" ? 1 : 0.45,
              transition: "all 0.2s",
              padding: "2px 4px",
              borderRadius: "4px",
              background: language === "en" ? "rgba(56,189,248,0.1)" : "transparent",
            }}>EN</span>
            <span style={{ color: "var(--text-dim)", fontSize: "0.6rem", margin: "0 1px" }}>·</span>
            <span style={{
              color: language === "fr" ? "var(--sky-500)" : "var(--text-dim)",
              opacity: language === "fr" ? 1 : 0.45,
              transition: "all 0.2s",
              padding: "2px 4px",
              borderRadius: "4px",
              background: language === "fr" ? "rgba(56,189,248,0.1)" : "transparent",
            }}>FR</span>
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            aria-label="Toggle theme"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.95rem",
              transition: "all 0.25s ease",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
            className="mobile-menu-btn"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
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
                animate={menuOpen ? (i === 1 ? { opacity: 0, scaleX: 0 } : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 7 : -7 }) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
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
      </motion.header>

      {/* Mobile Drawer */}
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
                zIndex: 45,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                pointerEvents: "all",
              }}
            />
            {/* Drawer */}
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
                width: "min(320px, 85vw)",
                background: theme === "dark" ? "rgba(7, 7, 15, 0.97)" : "rgba(255,255,255,0.98)",
                backdropFilter: "blur(32px)",
                borderLeft: "1px solid var(--glass-border)",
                zIndex: 55,
                padding: "80px 32px 40px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                pointerEvents: "all",
              }}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-dim)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}>
                Navigation
              </div>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "14px 0",
                    textAlign: "left",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    cursor: "pointer",
                    borderBottom: "1px solid var(--glass-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {item.label}
                  <span style={{ color: "var(--sky-500)", fontSize: "1rem" }}>→</span>
                </motion.button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
