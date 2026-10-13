"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/components/context/PortfolioContext";

interface ProjectFeature {
  icon: string;
  title: { en: string; fr: string };
  desc: { en: string; fr: string };
}

interface TelemetryMetric {
  label: { en: string; fr: string };
  value: string;
  badge?: string;
}

interface ShowcaseProject {
  id: string;
  code: string;
  badge: { en: string; fr: string };
  title: string;
  shortTitle: string;
  tagline: { en: string; fr: string };
  category: { en: string; fr: string };
  overview: { en: string; fr: string };
  color: string;
  glowColor: string;
  link: string;
  image: string;
  status: { en: string; fr: string };
  technologies: string[];
  keyHighlights: Array<{ en: string; fr: string }>;
  architectureFeatures: ProjectFeature[];
  telemetry: {
    perf: TelemetryMetric;
    architecture: TelemetryMetric;
    deployment: TelemetryMetric;
  };
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "pc-labs",
    code: "PRJ-01 · FLAGSHIP",
    badge: { en: "HARDWARE SIMULATOR · LIVE", fr: "SIMULATEUR MATÉRIEL · EN LIGNE" },
    title: "PC Labs",
    shortTitle: "PC Labs",
    tagline: {
      en: "Interactive Hardware & Custom PC Building Simulator",
      fr: "Simulateur Interactif de Configuration & Compatibilité PC",
    },
    category: {
      en: "Hardware Optimization · Real-Time Compatibility Engine · Component Customizer",
      fr: "Optimisation Matérielle · Moteur de Compatibilité Temps Réel · Configurateur",
    },
    overview: {
      en: "Architected and deployed an interactive web application for configuring, benchmarking, and optimizing high-performance computer builds. Features real-time component compatibility analysis, dynamic specs visualizer, TDP thermal load calculation, and instant bottleneck telemetry.",
      fr: "Conception et déploiement d'une application web interactive pour configurer, benchmarker et optimiser des configurations PC haute performance. Intègre un solveur de compatibilité en temps réel, calcul thermique TDP et télémétrie visuelle instantanée.",
    },
    color: "#00f5ff",
    glowColor: "rgba(0, 245, 255, 0.28)",
    link: "https://pc-labs-app.vercel.app/",
    image: "/projects/pc-labs.png",
    status: { en: "PRODUCTION DEPLOYED · 60FPS", fr: "DÉPLOYÉ EN PRODUCTION · 60FPS" },
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "React 19", "Vercel Edge", "Modular State"],
    keyHighlights: [
      { en: "Real-Time Compatibility Rule Engine", fr: "Solveur de compatibilité en temps réel" },
      { en: "TDP Power Load & Thermal Calculation", fr: "Calcul dynamique de consommation TDP & thermique" },
      { en: "Zero-Latency Client-Side State Solver", fr: "Résolveur d'état client sans latence" },
      { en: "Dynamic Component Spec Visualizer", fr: "Visualiseur dynamique de spécifications" },
    ],
    architectureFeatures: [
      {
        icon: "⚡",
        title: { en: "Dynamic Constraint Solver", fr: "Solveur de Contraintes Dynamique" },
        desc: {
          en: "Validates CPU sockets, RAM clearance, PCIe bandwidth, and PSU wattage across component trees instantly.",
          fr: "Validation instantanée des sockets CPU, tolérances RAM, lignes PCIe et puissance d'alimentation.",
        },
      },
      {
        icon: "🧩",
        title: { en: "Zero-Latency State Machine", fr: "Machine à États Réactive Sans Latence" },
        desc: {
          en: "Predicts cascading component incompatibilities directly on the client without blocking network roundtrips.",
          fr: "Anticipation des incompatibilités en cascade directement sur le client sans blocage réseau.",
        },
      },
      {
        icon: "📊",
        title: { en: "Real-Time Spec Telemetry", fr: "Télémétrie des Spécifications en Direct" },
        desc: {
          en: "Instant visual benchmarking across gaming, 3D rendering, and workstation compute workloads.",
          fr: "Benchmarking visuel instantané entre profils gaming, rendu 3D et stations de travail.",
        },
      },
    ],
    telemetry: {
      perf: { label: { en: "Client Performance", fr: "Performance Client" }, value: "60 FPS · < 15ms UI", badge: "A+" },
      architecture: { label: { en: "Engine Type", fr: "Type de Moteur" }, value: "Deterministic Rule Graph" },
      deployment: { label: { en: "Edge Infrastructure", fr: "Infrastructure Edge" }, value: "Vercel Global CDN" },
    },
  },
  {
    id: "aura-bags",
    code: "PRJ-02 · LIVE APP",
    badge: { en: "INDUSTRIAL B2B PORTAL · LIVE", fr: "PORTAIL INDUSTRIEL B2B · EN LIGNE" },
    title: "Aura Bags",
    shortTitle: "Aura Bags",
    tagline: {
      en: "Premium B2B Packaging & Manufacturing Portal",
      fr: "Portail Industriel de Fabrication & Packaging B2B",
    },
    category: {
      en: "Industrial B2B Portal · Custom Packaging Configurator · Supply Chain",
      fr: "Portail B2B Industriel · Configurateur de Packaging · Chaîne Logistique",
    },
    overview: {
      en: "Architected and deployed a full-scale industrial packaging and flour sack manufacturing portal for Aura Bags. Features an interactive material specs builder, dynamic print & GSM configurator, real-time production statistics, admin management panel, and multi-stage delivery tracking.",
      fr: "Conception et déploiement d'un portail industriel B2B complet de packaging et fabrication de sacs. Comprend un configurateur interactif de matériaux et grammages, personnalisation d'impression, tableau de bord admin et suivi de livraison multi-étapes.",
    },
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.28)",
    link: "https://bags-factory.vercel.app/",
    image: "/projects/bags-factory.png",
    status: { en: "LIVE B2B PLATFORM · ENTERPRISE", fr: "PLATEFORME B2B ACTIVE · ENTREPRISE" },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Vercel"],
    keyHighlights: [
      { en: "Interactive Material & GSM Spec Builder", fr: "Configurateur interactif de matériaux et grammage" },
      { en: "Multi-Step Production Pipeline Tracker", fr: "Suivi multi-étapes de la chaîne de fabrication" },
      { en: "Role-Based Administrative Dashboard", fr: "Tableau de bord administratif sécurisé par rôles" },
      { en: "Automated Enterprise Quote Generator", fr: "Génération automatisée de devis d'entreprise" },
    ],
    architectureFeatures: [
      {
        icon: "🏭",
        title: { en: "Industrial Formula Engine", fr: "Moteur de Formules Industrielles" },
        desc: {
          en: "Computes material weight, tensile tolerance, and volume capacity based on real manufacturing standards.",
          fr: "Calcul précis du poids matière, tolérance de traction et volume selon les normes de fabrication.",
        },
      },
      {
        icon: "📦",
        title: { en: "Production State Machine", fr: "Machine à États de Production" },
        desc: {
          en: "Segregated tracking from raw material extrusion to weaving, flexographic printing, and dispatch.",
          fr: "Suivi cloisonné de l'extrusion des matières premières au tissage, à l'impression et à l'expédition.",
        },
      },
      {
        icon: "🔒",
        title: { en: "Role-Based Enterprise Portal", fr: "Portail Entreprise Basé sur les Rôles" },
        desc: {
          en: "Segregated administrative controls for quote approvals, catalog management, and bulk client order flows.",
          fr: "Gestion des approbations de devis, catalogue de produits et flux de commandes grands comptes.",
        },
      },
    ],
    telemetry: {
      perf: { label: { en: "Interaction Latency", fr: "Latence d'Interaction" }, value: "< 45ms UI Speed", badge: "99.9%" },
      architecture: { label: { en: "Data Flow", fr: "Flux de Données" }, value: "Strict Type Safety" },
      deployment: { label: { en: "Delivery Status", fr: "Statut Déploiement" }, value: "Active Enterprise Portal" },
    },
  },
  {
    id: "nutrisaas",
    code: "PRJ-03 · FLAGSHIP AI",
    badge: { en: "AI HEALTH & VISION ENGINE · LIVE", fr: "MOTEUR SANTÉ IA & VISION · EN LIGNE" },
    title: "NutriSaaS",
    shortTitle: "NutriSaaS",
    tagline: {
      en: "AI-Powered Health & Nutrition Platform",
      fr: "Plateforme IA de Santé, Nutrition & Fitness",
    },
    category: {
      en: "AI Vision Food Scanner · Algerian Darija AI Coach · Dynamic Macro Engine",
      fr: "Scanner Alimentaire Vision IA · Coach IA en Darija · Moteur Macros Dynamique",
    },
    overview: {
      en: "Architected and deployed NutriSaaS — a next-generation AI health and nutrition platform. Features real-time 4K computer vision food scanning with instant macronutrient breakdown, personalized metabolic meal plans, muscle hypertrophy tracking, and an authentic Algerian Darija AI health coach.",
      fr: "Conception et déploiement de NutriSaaS — une plateforme santé et nutrition propulsée par l'IA. Intègre un scanner alimentaire par vision 4K avec estimation des macros, plans d'entraînement personnalisés et un coach santé IA interactif en Darija algérienne.",
    },
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.28)",
    link: "https://mahdi-gym.vercel.app/",
    image: "/projects/nutrisaas.png",
    status: { en: "AI POWERED · LIVE AGENTS", fr: "PROPULSÉ PAR L'IA · AGENTS ACTIFS" },
    technologies: ["Next.js", "React", "TypeScript", "Puter.js AI", "Tailwind CSS", "Vision API"],
    keyHighlights: [
      { en: "4K Computer Vision Food & Macro Scanner", fr: "Scanner alimentaire 4K avec détection de macros" },
      { en: "Authentic Algerian Darija AI Health Coach", fr: "Coach santé IA conversationnel en Darija algérienne" },
      { en: "Adaptive Daily Caloric & Hypertrophy Engine", fr: "Moteur adaptatif de calories et hypertrophie musculaire" },
      { en: "Dynamic Workout Routine Planner", fr: "Planificateur dynamique de routines d'entraînement" },
    ],
    architectureFeatures: [
      {
        icon: "👁️",
        title: { en: "Neural Vision Classification", fr: "Classification par Vision Neuronale" },
        desc: {
          en: "Extracts ingredient volume, macro distribution (protein/carbs/fats), and caloric estimations from food imagery.",
          fr: "Extraction automatique du volume d'ingrédients, répartition macro et estimation calorique par image.",
        },
      },
      {
        icon: "🧠",
        title: { en: "Dialectal LLM Fine-Tuning", fr: "Spécialisation LLM Dialectale Darija" },
        desc: {
          en: "System prompts and cultural idiom grounding delivering hyper-relatable, engaging health coaching in Darija.",
          fr: "Prompts système et ancrage culturel offrant un coaching santé fluide, naturel et personnalisé en Darija.",
        },
      },
      {
        icon: "📈",
        title: { en: "Dynamic Metabolic Rebalancing", fr: "Rééquilibrage Métabolique Dynamique" },
        desc: {
          en: "Self-correcting caloric targets adjusting daily based on logged caloric expenditure and weight velocity.",
          fr: "Ajustement automatique continu des objectifs caloriques selon l'effort enregistré et la vitesse de poids.",
        },
      },
    ],
    telemetry: {
      perf: { label: { en: "Inference Latency", fr: "Latence d'Inférence" }, value: "< 1.2s Vision Analysis", badge: "AI" },
      architecture: { label: { en: "Agent Architecture", fr: "Architecture Agent" }, value: "Puter.js AI + Multi-Prompt" },
      deployment: { label: { en: "System Reliability", fr: "Fiabilité Système" }, value: "99.9% Uptime Verified" },
    },
  },
  {
    id: "zain-agency",
    code: "PRJ-04 · LIVE APP",
    badge: { en: "PREMIUM TRAVEL AGENCY · LIVE", fr: "AGENCE DE VOYAGE PREMIUM · EN LIGNE" },
    title: "Zain Agency",
    shortTitle: "Zain Agency",
    tagline: {
      en: "Premium Travel Agency & Booking Platform",
      fr: "Agence de Voyage Premium & Plateforme de Réservation",
    },
    category: {
      en: "Multilingual Travel Portal · Hajj & Omra · Client Booking System · Admin Dashboard",
      fr: "Portail Voyage Multilingue · Hajj & Omra · Système de Réservation · Tableau de Bord Admin",
    },
    overview: {
      en: "Architected and deployed Zain Agency — a full-scale premium travel agency platform for Algeria. Features a multilingual booking interface (AR/FR/EN), Hajj & Omra package management, airline ticketing, hotel reservations, visa processing, client portal with QR code tracking, and a comprehensive admin dashboard.",
      fr: "Conception et déploiement de Zain Agency — une plateforme complète d'agence de voyage premium pour l'Algérie. Comprend une interface multilingue (AR/FR/EN), gestion des packages Hajj & Omra, billetterie aérienne, réservation d'hôtels, traitement de visas et un portail client avec suivi par QR code.",
    },
    color: "#c8a45c",
    glowColor: "rgba(200, 164, 92, 0.28)",
    link: "https://zain-agency.vercel.app/fr",
    image: "/projects/zain-agency.png",
    status: { en: "LIVE PLATFORM · MULTILINGUAL", fr: "PLATEFORME ACTIVE · MULTILINGUE" },
    technologies: ["Next.js 15", "TypeScript", "CSS Modules", "Vercel", "i18n", "QR Tracking"],
    keyHighlights: [
      { en: "Multilingual Interface AR/FR/EN with i18n Routing", fr: "Interface multilingue AR/FR/EN avec routage i18n" },
      { en: "Hajj & Omra Package Management System", fr: "Système de gestion des packages Hajj & Omra" },
      { en: "Client Portal with QR Code Booking Tracker", fr: "Portail client avec suivi de réservation par QR code" },
      { en: "Full Admin Dashboard & Booking Management", fr: "Tableau de bord admin complet et gestion des réservations" },
    ],
    architectureFeatures: [
      {
        icon: "🌍",
        title: { en: "i18n Multi-Route Architecture", fr: "Architecture Multi-Routes i18n" },
        desc: {
          en: "Dynamic locale routing supporting Arabic (RTL), French, and English with server-side language detection and persistent preference.",
          fr: "Routage dynamique par locale supportant l'arabe (RTL), le français et l'anglais avec détection côté serveur.",
        },
      },
      {
        icon: "✈️",
        title: { en: "Full-Service Booking Engine", fr: "Moteur de Réservation Complet" },
        desc: {
          en: "Integrated pipeline for flights, hotels, Saharan transport, visa applications, and Hajj & Omra group packages.",
          fr: "Pipeline intégré pour vols, hôtels, transport saharien, visas et packages Hajj & Omra collectifs.",
        },
      },
      {
        icon: "🔐",
        title: { en: "Admin & Client Portals", fr: "Portails Admin & Client" },
        desc: {
          en: "Dual-portal system with role-based access — admin manages bookings & inventory, clients track reservations via QR codes.",
          fr: "Système à double portail avec accès par rôle — admin gère les réservations, clients suivent via QR codes.",
        },
      },
    ],
    telemetry: {
      perf: { label: { en: "Page Load Speed", fr: "Vitesse de Chargement" }, value: "< 1.8s · Edge CDN", badge: "A" },
      architecture: { label: { en: "Locale Support", fr: "Support de Langues" }, value: "AR (RTL) · FR · EN" },
      deployment: { label: { en: "Platform Status", fr: "Statut de la Plateforme" }, value: "Live Production · Vercel" },
    },
  },
];

type ConsoleTab = "overview" | "architecture" | "telemetry";

export default function ProjectsChapter() {
  const { language } = usePortfolio();
  const isFr = language === "fr";

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<ConsoleTab>("overview");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  // 3D Mouse Parallax Tilt state for Studio Console
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });

  // Sync with 3D canvas card clicks
  useEffect(() => {
    const handleProjectChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      setActiveIndex(customEvent.detail.index);
    };

    window.addEventListener("orbit-project-changed", handleProjectChange);
    return () => window.removeEventListener("orbit-project-changed", handleProjectChange);
  }, []);

  const selectProject = useCallback((idx: number) => {
    setActiveIndex(idx);
    window.dispatchEvent(
      new CustomEvent("orbit-select-project", { detail: { index: idx } })
    );
  }, []);

  const nextProject = useCallback(() => {
    const nextIdx = (activeIndex + 1) % SHOWCASE_PROJECTS.length;
    selectProject(nextIdx);
  }, [activeIndex, selectProject]);

  const prevProject = useCallback(() => {
    const prevIdx = (activeIndex - 1 + SHOWCASE_PROJECTS.length) % SHOWCASE_PROJECTS.length;
    selectProject(prevIdx);
  }, [activeIndex, selectProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (previewModalOpen) {
        if (e.key === "Escape") setPreviewModalOpen(false);
        return;
      }
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject, previewModalOpen]);

  // Mouse tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    const rotateX = -((y - centerY) / centerY) * 4.5;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setTilt({ rotateX, rotateY, shineX, shineY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  const current = SHOWCASE_PROJECTS[activeIndex];

  return (
    <div
      className="story-chapter"
      style={{
        padding: "clamp(60px, 8vh, 120px) var(--section-padding-x)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      {/* ── Top Header & Carousel Segmented Dock ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          pointerEvents: "auto",
        }}
      >
        {/* Section Title & Badging */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div
            className="section-badge"
            style={{
              justifyContent: "center",
              margin: "0 auto",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: current.color,
                boxShadow: `0 0 10px ${current.color}`,
              }}
            />
            {isFr ? "CHAPITRE 05 · PROJETS EN PRODUCTION" : "CHAPTER 05 · PRODUCTION SYSTEMS SHOWCASE"}
          </div>

          <h2
            className="section-title"
            style={{
              fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)",
              marginTop: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            {isFr ? (
              <>
                Vitrine des Systèmes{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${current.color} 30%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "all 0.4s ease",
                  }}
                >
                  en Production
                </span>
              </>
            ) : (
              <>
                Production Systems{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${current.color} 30%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "all 0.4s ease",
                  }}
                >
                  Showcase
                </span>
              </>
            )}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
              color: "var(--text-muted)",
              marginTop: "4px",
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.5",
            }}
          >
            {isFr
              ? "Applications web d'entreprise, solveurs de compatibilité temps réel et pipelines d'IA déployés en production."
              : "High-performance enterprise web platforms, real-time compatibility engines, and AI pipelines deployed in production."}
          </p>
        </div>

        {/* Floating Segmented System Dock */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "4px",
            flexWrap: "wrap",
          }}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={prevProject}
            aria-label="Previous Project (Arrow Left)"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-main)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(16px)",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              fontSize: "1.1rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = current.color;
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--glass-border)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ‹
          </button>

          {/* Project Segmented Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "999px",
              padding: "4px 6px",
              backdropFilter: "blur(18px)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            {SHOWCASE_PROJECTS.map((p, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={p.id}
                  onClick={() => selectProject(i)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 16px",
                    borderRadius: "999px",
                    background: isActive ? `${p.color}1c` : "transparent",
                    border: `1px solid ${isActive ? p.color : "transparent"}`,
                    color: isActive ? "#ffffff" : "var(--text-muted)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.8rem",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isActive ? `0 0 20px ${p.color}35` : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: isActive ? p.color : "var(--text-dim)",
                      letterSpacing: "0.05em",
                      fontWeight: 700,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span>{p.shortTitle}</span>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: p.color,
                      boxShadow: isActive ? `0 0 8px ${p.color}` : "none",
                      opacity: isActive ? 1 : 0.45,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={nextProject}
            aria-label="Next Project (Arrow Right)"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-main)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(16px)",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              fontSize: "1.1rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = current.color;
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--glass-border)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* ── Main Stage Grid: Studio Console (Left) + Modern Picture Showcase (Right) ── */}
      <div
        className="projects-stage-grid"
        style={{
          width: "100%",
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(330px, 480px) minmax(360px, 1fr)",
          gap: "32px",
          alignItems: "center",
          padding: "16px 0",
        }}
      >
        {/* Left Column: 3D Mouse Parallax Studio Console */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -25, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-card"
            style={{
              pointerEvents: "auto",
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: "transform 0.12s ease-out, border-color 0.3s ease",
              borderRadius: "var(--radius-xl)",
              background: "var(--glass-card-bg)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: `1px solid ${current.color}45`,
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.65), 0 0 35px ${current.glowColor}`,
              padding: "clamp(20px, 2.5vw, 26px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient corner light accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "180px",
                height: "180px",
                background: `radial-gradient(circle, ${current.color}20 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            {/* Top Identity Ribbon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: current.color,
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                  }}
                >
                  {current.code}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--text-dim)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  SLOT 0{activeIndex + 1}/04
                </span>
              </div>

              {/* Status Pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  background: `${current.color}15`,
                  border: `1px solid ${current.color}35`,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: current.color,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: current.color,
                    boxShadow: `0 0 8px ${current.color}`,
                    animation: "pulse-glow 2s infinite ease-in-out",
                  }}
                />
                {current.status[language]}
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.35rem, 1.9vw, 1.7rem)",
                    fontWeight: 700,
                    color: "var(--text-heading)",
                    lineHeight: "1.2",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {current.title}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: current.color,
                    opacity: 0.85,
                  }}
                >
                  v2.4
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-dim)",
                  marginTop: "3px",
                  letterSpacing: "0.02em",
                  lineHeight: "1.4",
                }}
              >
                {current.category[language]}
              </p>
            </div>

            {/* Console Sub-Tabs Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px",
                borderRadius: "8px",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {[
                { id: "overview", label: isFr ? "Vue d'ensemble" : "Overview" },
                { id: "architecture", label: isFr ? "Architecture & Specs" : "Architecture & Specs" },
                { id: "telemetry", label: isFr ? "Télémétrie en Direct" : "Live Telemetry" },
              ].map((tab) => {
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ConsoleTab)}
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: "6px",
                      background: isTabActive ? `${current.color}22` : "transparent",
                      border: `1px solid ${isTabActive ? `${current.color}66` : "transparent"}`,
                      color: isTabActive ? "#ffffff" : "var(--text-dim)",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.72rem",
                      fontWeight: isTabActive ? 600 : 400,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "center",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Panels Content */}
            <div style={{ minHeight: "150px" }}>
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="tab-overview"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                        lineHeight: "1.6",
                      }}
                    >
                      {current.overview[language]}
                    </p>

                    {/* Key Highlights Capsules */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {current.keyHighlights.map((hl, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            padding: "3px 9px",
                            borderRadius: "999px",
                            background: `${current.color}10`,
                            color: current.color,
                            border: `1px solid ${current.color}28`,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span style={{ fontSize: "0.65rem" }}>✦</span>
                          {hl[language]}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "architecture" && (
                  <motion.div
                    key="tab-architecture"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                  >
                    {current.architectureFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.025)",
                          border: "1px solid var(--glass-border)",
                          display: "flex",
                          gap: "10px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span style={{ fontSize: "1rem", lineHeight: 1.2 }}>{feat.icon}</span>
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "0.78rem",
                              fontWeight: 600,
                              color: "var(--text-heading)",
                            }}
                          >
                            {feat.title[language]}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "0.72rem",
                              color: "var(--text-muted)",
                              lineHeight: "1.45",
                              marginTop: "2px",
                            }}
                          >
                            {feat.desc[language]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "telemetry" && (
                  <motion.div
                    key="tab-telemetry"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                  >
                    {[
                      current.telemetry.perf,
                      current.telemetry.architecture,
                      current.telemetry.deployment,
                    ].map((metric, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.025)",
                          border: "1px solid var(--glass-border)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.68rem",
                            color: "var(--text-dim)",
                          }}
                        >
                          {metric.label[language]}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.74rem",
                              fontWeight: 600,
                              color: current.color,
                            }}
                          >
                            {metric.value}
                          </span>
                          {metric.badge && (
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.58rem",
                                padding: "1px 5px",
                                borderRadius: "3px",
                                background: `${current.color}25`,
                                color: current.color,
                                border: `1px solid ${current.color}55`,
                              }}
                            >
                              {metric.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tech Stack Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                paddingTop: "8px",
                borderTop: "1px solid var(--glass-border)",
              }}
            >
              {current.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.035)",
                    color: "var(--text-main)",
                    border: "1px solid var(--glass-border)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = current.color;
                    e.currentTarget.style.color = current.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.color = "var(--text-main)";
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Dual Action Center */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "8px",
                marginTop: "2px",
              }}
            >
              {/* Primary Launch Button */}
              <motion.a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  background: `linear-gradient(135deg, ${current.color}ee, ${current.color}88)`,
                  border: `1px solid ${current.color}`,
                  padding: "10px 18px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: `0 4px 20px ${current.color}40`,
                  cursor: "pointer",
                }}
              >
                <span>{isFr ? "Lancer l'Application" : "Launch Live Application"}</span>
                <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1 10L10 1M10 1H3M10 1V8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>

              {/* Secondary Preview UI Modal Trigger */}
              <motion.button
                onClick={() => setPreviewModalOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Inspect UI Preview"
                title={isFr ? "Aperçu Haute Résolution" : "High-Resolution Preview"}
                style={{
                  padding: "0 14px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-main)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = current.color;
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--text-main)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{isFr ? "Aperçu" : "Preview"}</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Column: Modern Tech Studio Project Picture Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 25, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              pointerEvents: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Ambient Backlight Halo behind image frame */}
            <div
              style={{
                position: "absolute",
                top: "15%",
                left: "20%",
                width: "60%",
                height: "60%",
                background: `radial-gradient(circle, ${current.color}25 0%, transparent 70%)`,
                filter: "blur(40px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Main Floating Browser Window Mockup */}
            <div
              className="glass-card"
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "var(--radius-lg)",
                background: "var(--glass-card-bg)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: `1px solid ${current.color}45`,
                boxShadow: `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px ${current.glowColor}`,
                overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Chrome Top Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  background: "var(--glass-bg)",
                  borderBottom: "1px solid var(--glass-border)",
                }}
              >
                {/* Traffic Lights */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block", boxShadow: "0 0 6px rgba(255,95,86,0.6)" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block", boxShadow: "0 0 6px rgba(255,189,46,0.6)" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block", boxShadow: "0 0 6px rgba(39,201,63,0.6)" }} />
                </div>

                {/* URL Bar */}
                <div
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "6px",
                    padding: "3px 14px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    maxWidth: "260px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: "#10b981", fontSize: "0.65rem" }}>🔒</span>
                  <span style={{ color: "var(--text-main)", fontWeight: 500 }}>
                    {current.link.replace("https://", "").replace("/", "")}
                  </span>
                </div>

                {/* Right Status Pill & Direct Link */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background: `${current.color}15`,
                      border: `1px solid ${current.color}35`,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: current.color,
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: current.color,
                        boxShadow: `0 0 6px ${current.color}`,
                      }}
                    />
                    <span>60 FPS</span>
                  </div>

                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isFr ? "Ouvrir dans un nouvel onglet" : "Open in new tab"}
                    style={{
                      color: "var(--text-dim)",
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      padding: "2px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = current.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                  >
                    <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
                      <path
                        d="M1 10L10 1M10 1H3M10 1V8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Picture Display Window */}
              <div
                onClick={() => setPreviewModalOpen(true)}
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#050510",
                }}
              >
                {/* Real High-Resolution Project Screenshot */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    transform: imgHovered ? "scale(1.035)" : "scale(1)",
                    transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "block",
                  }}
                />

                {/* Subtle Inner Vignette Gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(4,4,12,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Diagonal Specular Sheen (Screen Glare) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 35%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Floating Top-Left Tag on Screenshot */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--glass-strong-bg)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${current.color}50`,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: current.color,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: current.color,
                      boxShadow: `0 0 6px ${current.color}`,
                    }}
                  />
                  <span>{current.code}</span>
                </div>

                {/* Floating Bottom Tag on Screenshot */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "var(--glass-strong-bg)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid var(--glass-border)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.72rem",
                    color: "var(--text-heading)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  <span style={{ color: current.color }}>✦</span>
                  <span style={{ fontWeight: 600 }}>{current.shortTitle}</span>
                  <span style={{ color: "var(--text-dim)", fontSize: "0.65rem" }}>—</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>
                    {current.keyHighlights[0][language]}
                  </span>
                </div>

                {/* Hover Center Quick Inspect Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(3, 3, 10, 0.45)",
                    backdropFilter: "blur(2px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: imgHovered ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      background: "rgba(10, 10, 24, 0.9)",
                      border: `1px solid ${current.color}`,
                      color: "#ffffff",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: `0 8px 24px rgba(0,0,0,0.7), 0 0 20px ${current.color}44`,
                      transform: imgHovered ? "translateY(0)" : "translateY(6px)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.color} strokeWidth="2.2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                    <span>{isFr ? "Cliquer pour Agrandir" : "Click to Inspect UI"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Multi-Project Thumbnail Dock */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                zIndex: 1,
              }}
            >
              {SHOWCASE_PROJECTS.map((proj, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => selectProject(idx)}
                    style={{
                      background: isSelected ? "var(--glass-card-bg)" : "var(--glass-bg)",
                      border: `1px solid ${isSelected ? proj.color : "var(--glass-border)"}`,
                      borderRadius: "var(--radius-md)",
                      padding: "6px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      cursor: "pointer",
                      backdropFilter: "blur(14px)",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: isSelected ? `0 4px 20px ${proj.color}35` : "none",
                      textAlign: "left",
                      opacity: isSelected ? 1 : 0.65,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.opacity = "0.65";
                        e.currentTarget.style.borderColor = "var(--glass-border)";
                      }
                    }}
                  >
                    {/* Mini Thumbnail */}
                    <div
                      style={{
                        width: "44px",
                        height: "30px",
                        borderRadius: "5px",
                        overflow: "hidden",
                        border: `1px solid ${isSelected ? proj.color : "rgba(255,255,255,0.08)"}`,
                        flexShrink: 0,
                        background: "#030308",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                      />
                    </div>

                    {/* Mini Info */}
                    <div style={{ minWidth: 0, overflow: "hidden" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "0.72rem",
                          fontWeight: isSelected ? 600 : 500,
                          color: isSelected ? "#ffffff" : "var(--text-muted)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {proj.shortTitle}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          color: isSelected ? proj.color : "var(--text-dim)",
                          fontWeight: isSelected ? 700 : 400,
                        }}
                      >
                        PRJ-0{idx + 1}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom Kinetic Guidance Pill ── */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--text-dim)",
          letterSpacing: "0.1em",
          pointerEvents: "auto",
          marginTop: "10px",
        }}
      >
        ✦ {isFr ? "CLIQUEZ SUR LES CARTES 3D OU UTILISEZ LES TOUCHES [ ← ] [ → ] POUR EXPLORER" : "CLICK 3D CARDS OR USE [ ← ] [ → ] ARROW KEYS TO EXPLORE"} ✦
      </div>

      {/* ── High-Resolution Lightbox Modal (Inspect UI) ── */}
      <AnimatePresence>
        {previewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreviewModalOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(4, 4, 12, 0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              pointerEvents: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong"
              style={{
                width: "100%",
                maxWidth: "920px",
                background: "var(--glass-strong-bg)",
                border: `1px solid var(--glass-border)`,
                borderRadius: "var(--radius-lg)",
                boxShadow: `0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px ${current.glowColor}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Browser Window Chrome */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  background: "var(--glass-bg)",
                  borderBottom: "1px solid var(--glass-border)",
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                </div>

                {/* URL Bar */}
                <div
                  style={{
                    background: "var(--glass-card-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "6px",
                    padding: "4px 16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    maxWidth: "400px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: "#10b981", fontSize: "0.7rem" }}>🔒</span>
                  <span>{current.link}</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    padding: "0 4px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Image Preview Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: "68vh",
                  overflowY: "auto",
                  background: "#030308",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "var(--glass-bg)",
                  borderTop: "1px solid var(--glass-border)",
                }}
              >
                <div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--text-heading)", fontWeight: 600 }}>
                    {current.title}
                  </h4>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: current.color }}>
                    {current.category[language]}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      background: `linear-gradient(135deg, ${current.color}ee, ${current.color}88)`,
                      border: `1px solid ${current.color}`,
                      padding: "8px 16px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{isFr ? "Ouvrir le Site Web ↗" : "Open Live Platform ↗"}</span>
                  </a>
                  <button
                    onClick={() => setPreviewModalOpen(false)}
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--glass-border)",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      cursor: "pointer",
                    }}
                  >
                    {isFr ? "Fermer" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 960px) {
          .story-chapter {
            padding-top: 90px !important;
          }
          div[style*="gridTemplateColumns: minmax(330px, 480px) minmax(360px, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
