"use client";

import { useState } from "react";

interface CVVersion {
  id: string;
  role: "fullstack" | "devops";
  lang: "fr" | "en";
  label: string;
  badge: string;
  badgeColor: string;
  description: string;
  htmlUrl: string;
  pdfUrl: string;
  docxUrl: string;
}

const CV_VERSIONS: CVVersion[] = [
  {
    id: "fs-fr",
    role: "fullstack",
    lang: "fr",
    label: "Développeur Full-Stack (Français)",
    badge: "Full-Stack & DevOps · FR",
    badgeColor: "bg-blue-600/20 text-blue-400 border-blue-500/30",
    description: "Orientation Développement Web & Systèmes : Next.js 15, React 19, C# ASP.NET Core (.NET 8), tuning SQL Server (T-SQL), Core Banking (Temenos / SYBU) et CI/CD.",
    htmlUrl: "/cv-fullstack-fr.html",
    pdfUrl: "/Mahdi_Djeridi_CV_Developpeur_FullStack_FR.pdf",
    docxUrl: "/Mahdi_Djeridi_CV_Developpeur_FullStack_FR.docx",
  },
  {
    id: "devops-fr",
    role: "devops",
    lang: "fr",
    label: "Ingénieur DevOps (Français)",
    badge: "DevOps & Infrastructure · FR",
    badgeColor: "bg-teal-600/20 text-teal-400 border-teal-500/30",
    description: "Orientation DevOps & Cloud : pipelines CI/CD automatisés (Jenkins, GitHub Actions), conteneurisation Docker, Kubernetes, Nomad, Portainer et Data Center bancaire.",
    htmlUrl: "/cv-devops-fr.html",
    pdfUrl: "/Mahdi_Djeridi_CV_Ingenieur_DevOps_FR.pdf",
    docxUrl: "/Mahdi_Djeridi_CV_Ingenieur_DevOps_FR.docx",
  },
  {
    id: "fs-en",
    role: "fullstack",
    lang: "en",
    label: "Full-Stack Developer (English)",
    badge: "Full-Stack & DevOps · EN",
    badgeColor: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
    description: "International edition: Next.js 15, React 19, ASP.NET Core (.NET 8), SQL Server optimization, Temenos CBS integration, and automated CI/CD workflows.",
    htmlUrl: "/cv-fullstack-en.html",
    pdfUrl: "/Mahdi_Djeridi_FullStack_Developer_CV.pdf",
    docxUrl: "/Mahdi_Djeridi_FullStack_Developer_CV.docx",
  },
  {
    id: "devops-en",
    role: "devops",
    lang: "en",
    label: "DevOps Engineer (English)",
    badge: "DevOps & Infrastructure · EN",
    badgeColor: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
    description: "International edition: CI/CD automation (Jenkins, GitHub Actions), Docker multi-stage images, Kubernetes, Nomad, Portainer, and Data Center reliability.",
    htmlUrl: "/cv-devops-en.html",
    pdfUrl: "/Mahdi_Djeridi_DevOps_Engineer_CV.pdf",
    docxUrl: "/Mahdi_Djeridi_DevOps_Engineer_CV.docx",
  },
];

export default function CVPage() {
  const [selectedId, setSelectedId] = useState<string>("fs-fr");
  const currentCV = CV_VERSIONS.find((c) => c.id === selectedId) || CV_VERSIONS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      {/* Top Header Card */}
      <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 mb-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border mb-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Curriculum Vitae Professionnels · Édition 2026 (Format 2 Pages)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Mahdi Djeridi — CV Professionnels
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              Versions optimisées pour le recrutement et les systèmes ATS. Chaque projet intègre son URL directe lisible sur papier pour un accès immédiat.
            </p>
          </div>

          {/* Quick Action Downloads */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={currentCV.pdfUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              Télécharger PDF
            </a>

            <a
              href={currentCV.docxUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M4 2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 3v10h2l2-6 2 6h2V5h-2v5l-1.5-5h-1L8 10V5H6z"/>
              </svg>
              Format Word (.docx)
            </a>

            <a
              href={currentCV.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700"
            >
              <span>Aperçu Web ↗</span>
            </a>
          </div>
        </div>

        {/* CV Selector Pills */}
        <div className="pt-5">
          <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
            Sélectionner le profil ciblé :
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CV_VERSIONS.map((cv) => {
              const isSelected = cv.id === selectedId;
              return (
                <button
                  key={cv.id}
                  onClick={() => setSelectedId(cv.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all relative cursor-pointer ${
                    isSelected
                      ? "bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cv.badgeColor}`}
                    >
                      {cv.badge}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    {cv.label}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {cv.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Printable URL notice */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
          <span className="text-emerald-400 text-sm">✓</span>
          <span>
            <strong>Lisibilité sur papier garantie :</strong> Chaque projet mentionne son URL complète (ex: <code className="text-slate-300">https://pc-labs-app.vercel.app</code>, <code className="text-slate-300">https://bags-factory.vercel.app</code>) pour consultation directe lors de la lecture d'une version imprimée.
          </span>
        </div>
      </div>

      {/* Embedded Document Viewer Container */}
      <div className="w-full max-w-5xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-700 ml-2">
              {currentCV.label} — Aperçu Document 2 Pages A4
            </span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Norme A4 (210mm × 297mm) · Rendu Vectoriel ATS
          </span>
        </div>
        <iframe
          key={currentCV.id}
          src={currentCV.htmlUrl}
          className="w-full h-[1400px] border-none"
          title={currentCV.label}
        />
      </div>
    </div>
  );
}
