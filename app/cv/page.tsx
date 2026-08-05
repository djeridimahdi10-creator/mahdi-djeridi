export default function CVPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center">
      {/* Header bar with download options */}
      <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">CV — Mahdi Djeridi</h1>
          <p className="text-xs text-slate-400">Full Stack & AI Engineer · DevOps Specialist — Conception d'applications web, architectures IA & systèmes haute performance</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/djeridi-mahdi-cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-all shadow"
          >
            📄 Aperçu Web (HTML)
          </a>

          <a
            href="/djeridi-mahdi-cv.pdf"
            download="djeridi-mahdi-cv.pdf"
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow shadow-blue-500/20"
          >
            ⬇️ Télécharger PDF
          </a>
        </div>
      </div>

      {/* CV Document Container */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <iframe
          src="/djeridi-mahdi-cv.html"
          className="w-full h-[1200px] border-none"
          title="Mahdi Djeridi CV Preview"
        />
      </div>
    </div>
  );
}
