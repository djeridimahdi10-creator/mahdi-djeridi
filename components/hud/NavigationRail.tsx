"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function NavigationRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = usePortfolio();

  const stationList = [
    { label: t.nav.hero, id: "ch-hero" },
    { label: t.nav.about, id: "ch-about" },
    { label: t.nav.skills, id: "ch-skills" },
    { label: t.nav.flow, id: "ch-flow" },
    { label: t.nav.projects, id: "ch-projects" },
    { label: t.nav.timeline, id: "ch-timeline" },
    { label: t.nav.contact, id: "ch-contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalH > 0 ? scrollY / totalH : 0;
      const idx = Math.min(
        Math.floor(progress * stationList.length),
        stationList.length - 1
      );
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stationList.length]);

  const scrollToStation = (index: number) => {
    const totalH = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / (stationList.length - 1)) * totalH;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        zIndex: 20,
        pointerEvents: "all",
      }}
    >
      {/* Progress Track */}
      <div style={{
        position: "absolute",
        top: "6px",
        bottom: "6px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "1px",
        background: "var(--glass-border)",
        borderRadius: "1px",
        pointerEvents: "none",
      }}>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(180deg, var(--sky-500), var(--violet-500))",
            borderRadius: "1px",
            boxShadow: "0 0 6px var(--sky-glow)",
          }}
          animate={{ height: `${(activeIndex / (stationList.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {stationList.map((station, i) => (
        <motion.div
          key={station.id}
          style={{ position: "relative", display: "flex", alignItems: "center" }}
          whileHover="hover"
        >
          {/* Label tooltip */}
          <motion.div
            variants={{
              hover: { opacity: 1, x: 0, scale: 1, pointerEvents: "none" },
            }}
            initial={{ opacity: 0, x: 14, scale: 0.88 }}
            transition={{ duration: 0.2 }}
            className="glass"
            style={{
              position: "absolute",
              right: "22px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              color: "var(--sky-500)",
              textTransform: "uppercase",
              padding: "4px 11px",
              borderRadius: "6px",
              pointerEvents: "none",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
          >
            {station.label}
          </motion.div>

          {/* Nav Dot */}
          <motion.button
            id={station.id}
            onClick={() => scrollToStation(i)}
            aria-label={`Navigate to ${station.label}`}
            title={station.label}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.85 }}
            animate={
              activeIndex === i
                ? { scale: 1.6, backgroundColor: "var(--sky-500)" }
                : { scale: 1, backgroundColor: "transparent" }
            }
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: activeIndex === i ? "3.5px" : "50%",
              border: "1.5px solid",
              borderColor: activeIndex === i ? "var(--sky-500)" : "rgba(255,255,255,0.22)",
              cursor: "pointer",
              pointerEvents: "all",
              background: "transparent",
              position: "relative",
              zIndex: 2,
              boxShadow: activeIndex === i
                ? "0 0 0 3px rgba(56,189,248,0.18), 0 0 12px var(--sky-glow)"
                : "none",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
