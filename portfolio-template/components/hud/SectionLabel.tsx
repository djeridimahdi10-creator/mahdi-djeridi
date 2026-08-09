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
      {/* Bottom-left: Journey progress */}
      <div style={{
        position: "fixed",
        bottom: "28px",
        left: "28px",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
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
          width: "120px",
          height: "1.5px",
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
      <div style={{
        position: "fixed",
        bottom: "80px",
        right: "52px",
        zIndex: 20,
        textAlign: "right",
      }}>
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
    </>
  );
}
