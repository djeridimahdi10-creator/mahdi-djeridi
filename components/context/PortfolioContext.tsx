"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, Theme, TranslationSchema, translations } from "@/lib/translations";

interface PortfolioContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: TranslationSchema;
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr"); // Default to French as requested
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved preferences from localStorage if available
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "fr")) {
      setLanguageState(savedLang);
    }

    const savedTheme = localStorage.getItem("portfolio_theme") as Theme;
    if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    const handleOpen = () => setIsCvModalOpen(true);
    const handleClose = () => setIsCvModalOpen(false);
    window.addEventListener("open-cv-modal", handleOpen);
    window.addEventListener("close-cv-modal", handleClose);

    setMounted(true);

    return () => {
      window.removeEventListener("open-cv-modal", handleOpen);
      window.removeEventListener("close-cv-modal", handleClose);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const openCvModal = () => setIsCvModalOpen(true);
  const closeCvModal = () => setIsCvModalOpen(false);

  const t = translations[language];

  return (
    <PortfolioContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        t,
        isCvModalOpen,
        openCvModal,
        closeCvModal,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    // Fallback if rendered outside provider during SSG/hydration
    return {
      language: "fr" as Language,
      setLanguage: () => {},
      theme: "dark" as Theme,
      setTheme: () => {},
      t: translations.fr,
      isCvModalOpen: false,
      openCvModal: () => {},
      closeCvModal: () => {},
    };
  }
  return context;
}
