import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, BorderStyle, ShadingType,
  ImageRun, VerticalAlign, TableLayoutType, convertInchesToTwip,
} from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COLOR_DARK  = "0F172A";
const COLOR_MUTED = "334155";
const COLOR_GRAY  = "64748B";

const pt = (n) => n * 2;

function createWideHeader(text) {
  const spacedStr = text.toUpperCase().split("").join(" ");
  return new Paragraph({
    children: [
      new TextRun({
        text: spacedStr,
        bold: true,
        size: pt(10),
        color: COLOR_DARK,
        font: "Arial",
      }),
    ],
    spacing: { before: pt(14), after: pt(5) },
  });
}

function createBullet(text, boldPrefix) {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({ text: boldPrefix + " ", bold: true, size: pt(9), color: COLOR_DARK, font: "Arial" }));
  }
  children.push(new TextRun({ text: text, size: pt(9), color: COLOR_MUTED, font: "Arial" }));

  return new Paragraph({
    children,
    bullet: { level: 0 },
    spacing: { before: pt(2), after: pt(2) },
  });
}

function createJobHeader(title, company, period, location) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: title.toUpperCase() + " - " + company.toUpperCase(), bold: true, size: pt(9.5), color: COLOR_DARK, font: "Arial" }),
      ],
      spacing: { before: pt(8), after: pt(1) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: period + (location ? " | " + location : ""), italics: true, size: pt(8.5), color: COLOR_GRAY, font: "Arial" }),
      ],
      spacing: { before: pt(0), after: pt(3) },
    }),
  ];
}

function createEducationItem(degree, institution, period) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: degree.toUpperCase(), bold: true, size: pt(9), color: COLOR_DARK, font: "Arial" }),
      ],
      spacing: { before: pt(5), after: pt(1) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: period, size: pt(8.5), color: COLOR_MUTED, font: "Arial" }),
      ],
      spacing: { before: pt(0), after: pt(1) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: institution, italics: true, size: pt(8.5), color: COLOR_GRAY, font: "Arial" }),
      ],
      spacing: { before: pt(0), after: pt(4) },
    }),
  ];
}

function createTopBanner() {
  const nameCell = new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "M A H D I", bold: true, size: pt(21), color: COLOR_DARK, font: "Arial" }),
        ],
        spacing: { before: pt(0), after: pt(1) },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "D J E R I D I", bold: true, size: pt(21), color: COLOR_DARK, font: "Arial" }),
        ],
        spacing: { before: pt(0), after: pt(2) },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "FULL STACK & AI ENGINEER · DEVOPS SPECIALIST", bold: true, size: pt(8.5), color: "2563EB", font: "Arial" }),
        ],
        spacing: { before: pt(0), after: pt(1) },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Conception d'applications web scalables, d'architectures IA autonomes, de systèmes haute performance & workflows DevOps.", size: pt(8), color: COLOR_MUTED, font: "Arial" }),
        ],
        spacing: { before: pt(1), after: pt(0) },
      }),
    ],
    width: { size: 38, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  const photoPath = path.join(__dirname, "public", "profile_circle.png");
  let imageRun = null;
  if (fs.existsSync(photoPath)) {
    const imgBuf = fs.readFileSync(photoPath);
    imageRun = new ImageRun({ data: imgBuf, transformation: { width: 95, height: 95 }, type: "png" });
  }

  const photoCell = new TableCell({
    children: [
      new Paragraph({
        children: imageRun ? [imageRun] : [],
        alignment: AlignmentType.CENTER,
      }),
    ],
    width: { size: 24, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  const contactCell = new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "C O N T A C T", bold: true, size: pt(10), color: COLOR_DARK, font: "Arial" }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { before: pt(0), after: pt(3) },
      }),
      new Paragraph({
        children: [new TextRun({ text: "📞 0555 65 13 30", size: pt(8.5), color: COLOR_MUTED, font: "Arial" })],
        alignment: AlignmentType.RIGHT,
        spacing: { before: pt(1), after: pt(1) },
      }),
      new Paragraph({
        children: [new TextRun({ text: "📧 djeridimahdi10@gmail.com", size: pt(8.5), color: COLOR_MUTED, font: "Arial" })],
        alignment: AlignmentType.RIGHT,
        spacing: { before: pt(1), after: pt(1) },
      }),
      new Paragraph({
        children: [new TextRun({ text: "📍 Alger, Algérie", size: pt(8.5), color: COLOR_MUTED, font: "Arial" })],
        alignment: AlignmentType.RIGHT,
        spacing: { before: pt(1), after: pt(1) },
      }),
      new Paragraph({
        children: [new TextRun({ text: "🌐 mahdi-djeridi.vercel.app", size: pt(8.5), color: COLOR_MUTED, font: "Arial" })],
        alignment: AlignmentType.RIGHT,
        spacing: { before: pt(1), after: pt(1) },
      }),
      new Paragraph({
        children: [new TextRun({ text: "💼 linkedin.com/in/mehdi-djeridi-7b924b2a4", size: pt(8), color: COLOR_GRAY, font: "Arial" })],
        alignment: AlignmentType.RIGHT,
        spacing: { before: pt(1), after: pt(1) },
      }),
    ],
    width: { size: 38, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  return new Table({
    rows: [new TableRow({ children: [nameCell, photoCell, contactCell] })],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });
}

async function main() {
  const leftColumnContent = [
    createWideHeader("C O M P É T E N C E S"),
    createBullet("React.js, Next.js (App Router), TypeScript, Tailwind CSS, Three.js, WebGL, Framer Motion, Figma", "Frontend:"),
    createBullet("ASP.NET Core (C# .NET 8), Node.js, NestJS, Express.js, APIs RESTful, GraphQL, JWT, RBAC", "Backend:"),
    createBullet("LLM APIs (OpenAI, Claude, Gemini), Prompt Chaining, Pipelines RAG, Vector Embeddings, Agents IA, Python, LangChain", "AI & ML:"),
    createBullet("Docker, Orchestration, CI/CD (GitHub Actions), Linux Admin, Vercel, Azure, Git", "DevOps:"),
    createBullet("SQL Server, PostgreSQL, Redis, Modélisation relationnelle, Procédures stockées", "Bases de Données:"),

    createWideHeader("L A N G U E S"),
    createBullet("Natif", "Arabe:"),
    createBullet("Courant (C1)", "Français:"),
    createBullet("Professionnel (B2/C1)", "Anglais:"),

    createWideHeader("A P T I T U D E S"),
    createBullet("Architecture Système & Systèmes Financiers Bancaires"),
    createBullet("Intelligence Artificielle, RAG & Agents Autonomes"),
    createBullet("Graphismes WebGL 3D & Interfaces Immersives"),
    createBullet("High Performance Computing & Cloud Automation"),

    createWideHeader("F O R M A T I O N"),
    ...createEducationItem("LICENCE EN INFORMATIQUE", "Université Ferhat Abbas (UFAS 1)", "2022 - 2025"),
    ...createEducationItem("CERTIFICATION GOOGLE AI PROFESSIONAL", "Google · Coursera (Credential ID: YS26JC7JM5VP)", "2026"),
    ...createEducationItem("FORMATION INGÉNIEUR DEVOPS", "Institut de Formation Professionnelle", "2025"),
  ];

  const rightColumnContent = [
    createWideHeader("E X P É R I E N C E S  P R O F E S S I O N N E L L E S"),

    ...createJobHeader("INGÉNIEUR DÉVELOPPEUR FULL STACK", "BNH - Banque Nationale d'Habitat", "Septembre 2025 - Aujourd'hui", "Alger"),
    createBullet("Développement et intégration de sous-systèmes monétiques pour le traitement sécurisé des transactions et cartes bancaires.", "Système Monétique & Flux:"),
    createBullet("Conception de modules de reporting automatisés et tableaux de bord décisionnels pour la direction bancaire.", "Reporting & Dashboards:"),
    createBullet("Architecture et développement du système national de centralisation, d'analyse et de contrôle des risques de crédit bancaires.", "Central des Risques:"),
    createBullet("Développement de la solution d'identification, de suivi et de gestion automatisée des créances et impayés bancaires.", "Centrale des Impayés:"),
    createBullet("APIs hautes performances en ASP.NET Core (C#), sécurité JWT/RBAC, procédures stockées complexes et requêtes optimisées.", "APIs C# & SQL Server:"),

    ...createJobHeader("INGÉNIEUR PROJET SAAS & AI", "Projets Indépendants & Innovation", "2024 - 2026", "Alger / En Ligne"),
    createBullet("PC LABS (Simulateur Matériel PC): Application web interactive de simulation d'assemblage et compatibilité matérielle en temps réel avec calcul de consommation et détection de bottlenecks (Next.js 15, TypeScript, Tailwind CSS). Demo: pc-labs-app.vercel.app", "Simulateur Matériel PC:"),
    createBullet("AURA BAGS (Portail B2B Packaging): Plateforme e-commerce industrielle pour emballages avec configurateur dynamique sur-mesure, moteur de devis instantané et back-office sécurisé (Next.js 15, Node.js, Express, PostgreSQL). Demo: bags-factory.vercel.app", "Portail B2B Packaging:"),
    createBullet("AI NUTRITION (SaaS IA & RAG): Plateforme SaaS autonome combinant pipelines RAG, vectorisation de bases nutritionnelles et chaînage de prompts LLM pour programmes personnalisés (NestJS, Python, LangChain, OpenAI).", "SaaS IA & RAG:"),
  ];

  const leftCell = new TableCell({
    children: leftColumnContent,
    width: { size: 36, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  const rightCell = new TableCell({
    children: rightColumnContent,
    width: { size: 64, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
    margins: { left: convertInchesToTwip(0.18) },
  });

  const mainTable = new Table({
    rows: [new TableRow({ children: [leftCell, rightCell] })],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  });

  const doc = new Document({
    creator: "Mahdi Djeridi — Full Stack & AI Engineer",
    title: "Mahdi Djeridi CV",
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.35),
            bottom: convertInchesToTwip(0.35),
            left: convertInchesToTwip(0.45),
            right: convertInchesToTwip(0.45),
          },
        },
      },
      children: [
        createTopBanner(),
        new Paragraph({
          children: [],
          border: { bottom: { color: COLOR_DARK, space: 4, style: BorderStyle.SINGLE, size: 6 } },
          spacing: { before: pt(5), after: pt(7) },
        }),
        mainTable,
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const paths = [
    path.join(__dirname, "djeridi-mahdi-cv.docx"),
    path.join(__dirname, "public", "djeridi-mahdi-cv.docx"),
  ];

  for (const p of paths) {
    try {
      fs.writeFileSync(p, buffer);
      console.log("Successfully wrote: " + p);
    } catch (e) {
      console.warn("Could not write " + p + ": " + e.message);
    }
  }
}

main().catch(console.error);