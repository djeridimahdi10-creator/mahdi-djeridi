"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function CVModal3D() {
  const { isCvModalOpen, closeCvModal, language } = usePortfolio();
  const [selectedLang, setSelectedLang] = useState<"fr" | "en">(language === "en" ? "en" : "fr");

  useEffect(() => {
    setSelectedLang(language === "en" ? "en" : "fr");
  }, [language]);

  // Lock background scroll and freeze 3D scene camera when modal is open
  useEffect(() => {
    if (isCvModalOpen) {
      document.body.classList.add("modal-open");
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isCvModalOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCvModalOpen) {
        closeCvModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCvModalOpen, closeCvModal]);

  const isFr = selectedLang === "fr";

  return (
    <AnimatePresence>
      {isCvModalOpen && (
        <div
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            overscrollBehavior: "contain",
          }}
        >
          {/* Backdrop with cyber blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCvModal}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(3, 7, 18, 0.88)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          />

          {/* Stable Level Floating Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1020px",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.97), rgba(3, 7, 18, 0.98))",
              border: "1px solid rgba(56, 189, 248, 0.28)",
              borderRadius: "26px",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 50px rgba(37, 99, 235, 0.18)",
              padding: "26px 30px",
              color: "#ffffff",
              zIndex: 10,
            }}
          >
            {/* Top Modal Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: "rgba(56, 189, 248, 0.1)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    color: "var(--sky-400, #38bdf8)",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
                  {isFr ? "Sélection du Profil Professionnel" : "Select Engineering Profile"}
                </div>
                <h2 style={{ fontSize: "1.55rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
                  {isFr ? "Quel CV souhaitez-vous consulter ?" : "Which Resume Would You Like to View?"}
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "4px 0 0 0" }}>
                  {isFr
                    ? "Deux CVs distincts en format 2 pages A4, adaptés selon le poste ciblé avec liens projets visibles."
                    : "Two dedicated 2-page A4 resumes tailored to the target role with explicit, printable project URLs."}
                </p>
              </div>

              {/* Language Switcher & Close button */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Language Switcher Pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "999px",
                    padding: "3px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  <button
                    onClick={() => setSelectedLang("fr")}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      border: "none",
                      background: isFr ? "var(--sky-500, #0284c7)" : "transparent",
                      color: isFr ? "#ffffff" : "#94a3b8",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setSelectedLang("en")}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      border: "none",
                      background: !isFr ? "var(--sky-500, #0284c7)" : "transparent",
                      color: !isFr ? "#ffffff" : "#94a3b8",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    EN
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeCvModal}
                  aria-label="Close Modal"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#cbd5e1",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                    e.currentTarget.style.borderColor = "#ef4444";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                    e.currentTarget.style.color = "#cbd5e1";
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* STABLE CARDS GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "22px",
                marginTop: "14px",
              }}
            >
              {/* CARD 1: FULL-STACK DEVELOPER */}
              <CardFullStackStable isFr={isFr} />

              {/* CARD 2: DEVOPS ENGINEER */}
              <CardDevOpsStable isFr={isFr} />
            </div>

            {/* Bottom Info Bar */}
            <div
              style={{
                marginTop: "22px",
                paddingTop: "15px",
                borderTop: "1px solid rgba(148, 163, 184, 0.15)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                fontSize: "0.78rem",
                color: "#94a3b8",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#10b981", fontSize: "0.85rem" }}>✓</span>
                <span>
                  {isFr
                    ? "Les URLs des projets sont explicitement lisibles sur papier et cliquables au format numérique."
                    : "Project URLs are explicitly printed for paper reading and live clickable in digital formats."}
                </span>
              </div>

              <a
                href="/cv"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--sky-400, #38bdf8)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                <span>{isFr ? "Ouvrir la page CV complète (/cv)" : "Open Full CV Hub (/cv)"}</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── STABLE CARD 1: FULL-STACK DEVELOPER ───
function CardFullStackStable({ isFr }: { isFr: boolean }) {
  const pdfUrl = isFr ? "/Mahdi_Djeridi_CV_Developpeur_FullStack_FR.pdf" : "/Mahdi_Djeridi_FullStack_Developer_CV.pdf";
  const docxUrl = isFr ? "/Mahdi_Djeridi_CV_Developpeur_FullStack_FR.docx" : "/Mahdi_Djeridi_FullStack_Developer_CV.docx";
  const htmlUrl = isFr ? "/cv-fullstack-fr.html" : "/cv-fullstack-en.html";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        position: "relative",
        background: "linear-gradient(160deg, rgba(30, 58, 138, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)",
        border: "1px solid rgba(59, 130, 246, 0.4)",
        borderRadius: "20px",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.45), 0 0 25px rgba(37, 99, 235, 0.12)",
      }}
    >
      <div>
        {/* Card Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "3px 10px",
              borderRadius: "999px",
              background: "rgba(59, 130, 246, 0.2)",
              color: "#60a5fa",
              border: "1px solid rgba(59, 130, 246, 0.4)",
            }}
          >
            ⚡ {isFr ? "Profil Principal" : "Flagship Profile"}
          </span>

          <span style={{ fontSize: "0.72rem", color: "#93c5fd", fontWeight: 600 }}>
            {isFr ? "Édition Française" : "English Edition"}
          </span>
        </div>

        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 6px 0", color: "#ffffff" }}>
          {isFr ? "Développeur Full-Stack" : "Full-Stack Developer"}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "0 0 14px 0", lineHeight: 1.4 }}>
          {isFr
            ? "Applications web scalables, Next.js 15, React 19, ASP.NET Core (.NET 8), tuning SQL Server et intégration Core Banking (Temenos CBS)."
            : "End-to-end web platforms, Next.js 15, React 19, C# .NET 8 APIs, SQL Server optimization, and Temenos CBS integration."}
        </p>

        {/* Stable Architecture Diagram */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "14px",
          }}
        >
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#60a5fa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>{isFr ? "Architecture Système 3 Tiers" : "3-Tier System Architecture"}</span>
            <span style={{ color: "#38bdf8", fontSize: "0.65rem", fontWeight: 600 }}>● SYNC ACTIVE</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 10px",
                borderRadius: "8px",
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              <span>🖥️ Frontend Client</span>
              <span style={{ color: "#60a5fa", fontFamily: "monospace", fontSize: "0.7rem" }}>Next.js 15 · React 19</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "14px" }}>
              <span style={{ fontSize: "0.72rem", color: "#38bdf8", opacity: 0.9 }}>↕ RESTful & GraphQL APIs (C# .NET 8) ↕</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 10px",
                borderRadius: "8px",
                background: "rgba(30, 64, 175, 0.25)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              <span>🗄️ Database & CBS</span>
              <span style={{ color: "#93c5fd", fontFamily: "monospace", fontSize: "0.7rem" }}>SQL Server (T-SQL) · Temenos</span>
            </div>
          </div>

          <div
            style={{
              marginTop: "8px",
              padding: "4px 8px",
              borderRadius: "6px",
              background: "rgba(2, 6, 23, 0.8)",
              border: "1px solid rgba(148, 163, 184, 0.15)",
              fontFamily: "monospace",
              fontSize: "0.68rem",
              color: "#38bdf8",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: "#10b981" }}>&gt;</span>
            <span>GET /cbs/accounts [12ms] · ACID Compliant</span>
          </div>
        </div>

        {/* Key Bullet Highlights */}
        <div style={{ fontSize: "0.78rem", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
            <span style={{ color: "#60a5fa" }}>▸</span>
            <span><strong>Next.js 15 & React 19 :</strong> Interfaces réactives, Server Components & 60 FPS.</span>
          </div>
          <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
            <span style={{ color: "#60a5fa" }}>▸</span>
            <span><strong>ASP.NET Core (.NET 8) :</strong> APIs sécurisées JWT/RBAC & microservices.</span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ color: "#60a5fa" }}>▸</span>
            <span><strong>SQL Server (T-SQL) :</strong> Procédures complexes, indexation & tuning.</span>
          </div>
        </div>
      </div>

      {/* Action Download Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <a
            href={pdfUrl}
            download
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "10px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
              transition: "transform 0.15s ease",
            }}
          >
            <span>📄 Télécharger PDF</span>
          </a>

          <a
            href={docxUrl}
            download
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "10px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              color: "#e2e8f0",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              transition: "transform 0.15s ease",
            }}
          >
            <span>📝 Word (.docx)</span>
          </a>
        </div>

        <a
          href={htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "6px",
            borderRadius: "8px",
            background: "transparent",
            color: "#93c5fd",
            textDecoration: "none",
            fontSize: "0.74rem",
            fontWeight: 600,
          }}
        >
          <span>Aperçu Web Plein Écran ↗</span>
        </a>
      </div>
    </motion.div>
  );
}

// ─── STABLE CARD 2: DEVOPS ENGINEER ───
function CardDevOpsStable({ isFr }: { isFr: boolean }) {
  const pdfUrl = isFr ? "/Mahdi_Djeridi_CV_Ingenieur_DevOps_FR.pdf" : "/Mahdi_Djeridi_DevOps_Engineer_CV.pdf";
  const docxUrl = isFr ? "/Mahdi_Djeridi_CV_Ingenieur_DevOps_FR.docx" : "/Mahdi_Djeridi_DevOps_Engineer_CV.docx";
  const htmlUrl = isFr ? "/cv-devops-fr.html" : "/cv-devops-en.html";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        position: "relative",
        background: "linear-gradient(160deg, rgba(13, 148, 136, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)",
        border: "1px solid rgba(20, 184, 166, 0.4)",
        borderRadius: "20px",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.45), 0 0 25px rgba(13, 148, 136, 0.12)",
      }}
    >
      <div>
        {/* Card Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "3px 10px",
              borderRadius: "999px",
              background: "rgba(13, 148, 136, 0.2)",
              color: "#2dd4bf",
              border: "1px solid rgba(20, 184, 166, 0.4)",
            }}
          >
            ☁️ {isFr ? "Profil Spécialisé" : "Infrastructure Profile"}
          </span>

          <span style={{ fontSize: "0.72rem", color: "#99f6e4", fontWeight: 600 }}>
            {isFr ? "Édition Française" : "English Edition"}
          </span>
        </div>

        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 6px 0", color: "#ffffff" }}>
          {isFr ? "Ingénieur DevOps" : "DevOps Engineer"}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "0 0 14px 0", lineHeight: 1.4 }}>
          {isFr
            ? "Automatisation CI/CD (Jenkins, Actions), conteneurisation Docker, Kubernetes, Nomad, Portainer, Data Center bancaire et socle Full-Stack."
            : "Automated CI/CD pipelines (Jenkins, Actions), Docker multi-stage, Kubernetes, Nomad, Portainer, and Banking Data Center."}
        </p>

        {/* Stable CI/CD Pipeline Diagram */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(20, 184, 166, 0.25)",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "14px",
          }}
        >
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2dd4bf", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>{isFr ? "Pipeline CI/CD & Déploiement" : "CI/CD & Deployment Flow"}</span>
            <span style={{ color: "#10b981", fontSize: "0.65rem", fontWeight: 600 }}>● 0 DOWNTIME</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "rgba(13, 148, 136, 0.2)",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                padding: "5px 4px",
                borderRadius: "6px",
                textAlign: "center",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              <div>📦 Git</div>
              <div style={{ fontSize: "0.58rem", color: "#2dd4bf" }}>Commit</div>
            </div>

            <div
              style={{
                background: "rgba(13, 148, 136, 0.2)",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                padding: "5px 4px",
                borderRadius: "6px",
                textAlign: "center",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              <div>⚙️ Jenkins</div>
              <div style={{ fontSize: "0.58rem", color: "#2dd4bf" }}>Test CI</div>
            </div>

            <div
              style={{
                background: "rgba(13, 148, 136, 0.2)",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                padding: "5px 4px",
                borderRadius: "6px",
                textAlign: "center",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              <div>🐳 Docker</div>
              <div style={{ fontSize: "0.58rem", color: "#2dd4bf" }}>Multi-Stage</div>
            </div>

            <div
              style={{
                background: "rgba(13, 148, 136, 0.25)",
                border: "1px solid rgba(20, 184, 166, 0.4)",
                padding: "5px 4px",
                borderRadius: "6px",
                textAlign: "center",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              <div>🚀 Cluster</div>
              <div style={{ fontSize: "0.58rem", color: "#34d399" }}>K8s/Nomad</div>
            </div>
          </div>

          <div
            style={{
              marginTop: "8px",
              padding: "4px 8px",
              borderRadius: "6px",
              background: "rgba(2, 6, 23, 0.8)",
              border: "1px solid rgba(148, 163, 184, 0.15)",
              fontFamily: "monospace",
              fontSize: "0.68rem",
              color: "#2dd4bf",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: "#10b981" }}>&gt;</span>
            <span>Portainer: cbs-satellite [HEALTHY] 99.98%</span>
          </div>
        </div>

        {/* Key Bullet Highlights */}
        <div style={{ fontSize: "0.78rem", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
            <span style={{ color: "#2dd4bf" }}>▸</span>
            <span><strong>Pipelines CI/CD :</strong> Jenkins & GitHub Actions avec gates de qualité.</span>
          </div>
          <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
            <span style={{ color: "#2dd4bf" }}>▸</span>
            <span><strong>Conteneurs & Portainer :</strong> Docker, Kubernetes & HashiCorp Nomad.</span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ color: "#2dd4bf" }}>▸</span>
            <span><strong>Data Center Bancaire :</strong> Reverse proxies Nginx, SSL/TLS & parité.</span>
          </div>
        </div>
      </div>

      {/* Action Download Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <a
            href={pdfUrl}
            download
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "10px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #0d9488, #0f766e)",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              boxShadow: "0 4px 14px rgba(13, 148, 136, 0.35)",
              transition: "transform 0.15s ease",
            }}
          >
            <span>📄 Télécharger PDF</span>
          </a>

          <a
            href={docxUrl}
            download
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "10px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(20, 184, 166, 0.4)",
              color: "#e2e8f0",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              transition: "transform 0.15s ease",
            }}
          >
            <span>📝 Word (.docx)</span>
          </a>
        </div>

        <a
          href={htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "6px",
            borderRadius: "8px",
            background: "transparent",
            color: "#99f6e4",
            textDecoration: "none",
            fontSize: "0.74rem",
            fontWeight: 600,
          }}
        >
          <span>Aperçu Web Plein Écran ↗</span>
        </a>
      </div>
    </motion.div>
  );
}
