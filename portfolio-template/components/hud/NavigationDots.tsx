"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STATIONS = [
  { label: "Hero", id: "station-hero" },
  { label: "Stack", id: "station-stack" },
  { label: "AI & Data", id: "station-flow" },
  { label: "Projects", id: "station-projects" },
  { label: "About", id: "station-about" },
];

export default function NavigationDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalH = document.body.scrollHeight - window.innerHeight;
      const progress = totalH > 0 ? scrollY / totalH : 0;

      const idx = Math.min(
        Math.floor(progress * STATIONS.length),
        STATIONS.length - 1
      );
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStation = (index: number) => {
    const totalH = document.body.scrollHeight - window.innerHeight;
    const targetScroll = (index / (STATIONS.length - 1)) * totalH;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        zIndex: 20,
        pointerEvents: "all",
      }}
    >
      {STATIONS.map((station, i) => (
        <motion.div
          key={station.id}
          style={{ position: "relative", display: "flex", alignItems: "center" }}
          whileHover="hover"
        >
          {/* Label tooltip */}
          <motion.div
            variants={{ hover: { opacity: 1, x: 0, scale: 1 } }}
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            style={{
              position: "absolute",
              right: "22px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              color: "rgba(0,245,255,0.8)",
              textTransform: "uppercase",
              background: "rgba(2,2,10,0.75)",
              backdropFilter: "blur(10px)",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid rgba(0,245,255,0.18)",
            }}
          >
            {station.label}
          </motion.div>

          {/* Dot */}
          <button
            id={station.id}
            className={`nav-dot ${activeIndex === i ? "active" : ""}`}
            onClick={() => scrollToStation(i)}
            aria-label={`Navigate to ${station.label}`}
            title={station.label}
          />
        </motion.div>
      ))}
    </div>
  );
}
