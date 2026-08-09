"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, Theme, TranslationSchema, translations } from "@/lib/translations";

interface PortfolioContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: TranslationSchema;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<Theme>("dark");
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

    setMounted(true);
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

  const t = translations[language];

  return (
    <PortfolioContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        t,
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
      language: "en" as Language,
      setLanguage: () => {},
      theme: "dark" as Theme,
      setTheme: () => {},
      t: translations.en,
    };
  }
  return context;
}
