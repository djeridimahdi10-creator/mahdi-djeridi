"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function ContactCTA() {
  const { t } = usePortfolio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.6 }}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "52px",
        zIndex: 20,
        display: "flex",
        gap: "10px",
        pointerEvents: "all",
      }}
    >
      {[
        { label: "GH", href: "https://github.com/", title: "GitHub — Mahdi Djeridi", color: "var(--emerald-500)" },
        { label: "LI", href: "https://www.linkedin.com/in/mehdi-djeridi-7b924b2a4", title: "LinkedIn — Mahdi Djeridi", color: "var(--violet-400)" },
        { label: "✉", href: "https://mail.google.com/mail/?view=cm&to=djeridimahdi10@gmail.com", title: "Email Mahdi", color: "var(--sky-500)" },
      ].map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          title={s.title}
          aria-label={s.title}
          target={s.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="glass"
          whileHover={{ scale: 1.14, y: -3 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: "34px",
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            color: s.color,
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textDecoration: "none",
            cursor: "pointer",
            border: `1px solid ${s.color}25`,
            transition: "all 0.2s ease",
          }}
        >
          {s.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
