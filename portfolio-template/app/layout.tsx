import type { Metadata } from "next";
import "./globals.css";
import { PortfolioProvider } from "@/components/context/PortfolioContext";

export const metadata: Metadata = {
  title: "Mahdi Djeridi — Full-Stack & AI Software Engineer",
  description:
    "Interactive 3D portfolio of Mahdi Djeridi — Full-Stack & AI Software Engineer specializing in AI Agent Architecture, Application Security, DevOps, and High-Performance System Design.",
  keywords: [
    "Mahdi Djeridi",
    "Full-Stack Engineer",
    "AI Software Engineer",
    "AI Agent Architecture",
    "Application Security",
    "DevOps",
    "Next.js",
    "NestJS",
    "C# .NET",
    "Python",
    "Portfolio",
    "Algeria",
  ],
  authors: [{ name: "Mahdi Djeridi" }],
  openGraph: {
    title: "Mahdi Djeridi — Full-Stack & AI Software Engineer",
    description: "AI Agent Architecture · Application Security · DevOps · High-Performance Systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className="scanlines">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
