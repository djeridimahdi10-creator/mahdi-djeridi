"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePortfolio } from "@/components/context/PortfolioContext";

const EMAIL = "djeridimahdi10@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/mehdi-djeridi-7b924b2a4";
const LINKEDIN_DISPLAY = "linkedin.com/in/mehdi-djeridi-7b924b2a4";
const GITHUB_URL = "https://github.com/";

const CONTACT_METHODS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 5.5A2.5 2.5 0 014.5 3h11A2.5 2.5 0 0118 5.5v9A2.5 2.5 0 0115.5 17h-11A2.5 2.5 0 012 14.5v-9zm1.5 0v.217l6.5 4.333 6.5-4.333V5.5A1 1 0 0015.5 4.5h-11A1 1 0 003.5 5.5zm13 2.283L10 11.717 3.5 7.783V14.5a1 1 0 001 1h11a1 1 0 001-1V7.783z" fill="currentColor" />
      </svg>
    ),
    label: "Email",
    value: EMAIL,
    href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`,
    color: "var(--sky-500)",
    tag: "Gmail",
    external: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm-1.29 9.763H6.29v-8.59H3.714v8.59zM17.668 0H2.328C1.042 0 0 1.017 0 2.273v15.454C0 18.982 1.042 20 2.328 20h15.34C18.958 20 20 18.982 20 17.727V2.273C20 1.017 18.958 0 17.668 0z" fill="currentColor" />
      </svg>
    ),
    label: "LinkedIn",
    value: LINKEDIN_DISPLAY,
    href: LINKEDIN_URL,
    color: "var(--violet-400)",
    tag: "Connect",
    external: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" fill="currentColor" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/mahdi-djeridi",
    href: GITHUB_URL,
    color: "var(--emerald-500)",
    tag: "Open Source",
    external: true,
  },
];

export default function ContactChapter() {
  const { t } = usePortfolio();

  return (
    <div className="story-chapter story-chapter-interactive" style={{ padding: "var(--section-padding-y) var(--section-padding-x)" }}>
      <div style={{ width: "100%", maxWidth: "var(--content-max)", display: "flex", flexDirection: "column", gap: "52px" }}>

        {/* Main Contact Block */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(32px, 5vw, 60px)",
          alignItems: "start",
        }}>
          {/* ── Left: Headline & CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            <div>
              <div className="section-badge">{t.contact.badge}</div>
              <h2 className="section-title" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", marginTop: "10px", lineHeight: "1.08" }}>
                {t.contact.heading}{" "}
                <span className="text-aurora">{t.contact.headingHighlight}</span>
              </h2>
            </div>

            {/* Avatar + status */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  position: "relative",
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(56,189,248,0.4)",
                  boxShadow: "0 0 24px rgba(56,189,248,0.15)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Mahdi Djeridi"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </motion.div>
              <div>
                <div style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-heading)",
                }}>
                  Mahdi Djeridi
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                }}>
                  {t.hero.badge}
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--emerald-500)",
                }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--emerald-500)",
                    boxShadow: "0 0 6px var(--emerald-500)",
                    animation: "pulse-glow 2s ease-in-out infinite",
                  }} />
                  Available for new projects
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              lineHeight: "1.75",
              maxWidth: "520px",
            }}>
              {t.contact.subheading}
            </p>

            {/* Primary CTA — opens Gmail */}
            <motion.a
              href={`https://mail.google.com/mail/?view=cm&to=${EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1.5 4A1.5 1.5 0 013 2.5h10A1.5 1.5 0 0114.5 4v8A1.5 1.5 0 0113 13.5H3A1.5 1.5 0 011.5 12V4zm1.5.174V12a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V4.174L8 8.833 3 4.174zM13.2 3.5H2.8L8 7.667l5.2-4.167z" fill="currentColor" />
              </svg>
              {t.contact.cta}
            </motion.a>
          </motion.div>

          {/* ── Right: Contact Method Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {CONTACT_METHODS.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 6, borderColor: method.color, y: -2 }}
                className="glass-card"
                style={{
                  padding: "20px 22px",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textDecoration: "none",
                  borderLeft: `3px solid ${method.color}`,
                  transition: "all 0.3s ease",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: `${method.color}12`,
                  border: `1px solid ${method.color}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: method.color,
                  flexShrink: 0,
                }}>
                  {method.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    {method.label}
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.56rem",
                      color: method.color,
                      background: `${method.color}12`,
                      border: `1px solid ${method.color}25`,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                    }}>
                      {method.tag}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--text-dim)",
                    marginTop: "3px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {method.value}
                  </div>
                </div>

                {/* Arrow */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: method.color, flexShrink: 0, opacity: 0.7 }}>
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Left: Copyright */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "var(--text-dim)",
            letterSpacing: "0.12em",
          }}>
            © {new Date().getFullYear()} {t.contact.footer}
          </div>

          {/* Center: Built with */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--text-dim)",
            letterSpacing: "0.12em",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            Built with
            <span style={{ color: "var(--sky-500)" }}>Next.js</span>
            ·
            <span style={{ color: "var(--violet-400)" }}>Three.js</span>
            ·
            <span style={{ color: "var(--emerald-500)" }}>Framer Motion</span>
          </div>

          {/* Right: Quick social links */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: "GH", href: GITHUB_URL, color: "var(--emerald-500)" },
              { label: "LI", href: LINKEDIN_URL, color: "var(--violet-400)" },
              { label: "✉", href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`, color: "var(--sky-500)" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="glass"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: s.color,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  border: `1px solid ${s.color}25`,
                }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
