"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import LoadingScreen from "@/components/hud/LoadingScreen";
import NavigationRail from "@/components/hud/NavigationRail";
import SectionLabel from "@/components/hud/SectionLabel";
import ContactCTA from "@/components/hud/ContactCTA";
import HeaderControls from "@/components/hud/HeaderControls";

import HeroChapter from "@/components/storytelling/HeroChapter";
import AboutChapter from "@/components/storytelling/AboutChapter";
import SkillsChapter from "@/components/storytelling/SkillsChapter";
import DataFlowChapter from "@/components/storytelling/DataFlowChapter";
import ProjectsChapter from "@/components/storytelling/ProjectsChapter";
import TimelineChapter from "@/components/storytelling/TimelineChapter";
import ContactChapter from "@/components/storytelling/ContactChapter";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => <LoadingScreen progress={0} />,
});

export default function Home() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 3D Canvas fixed background */}
      <Scene />

      {/* Glassmorphic HUD overlay controls */}
      <div id="hud-overlay">
        <HeaderControls />
        <NavigationRail />
        <SectionLabel />
        <ContactCTA />
      </div>

      {/* 7 Storytelling Chapters Container */}
      <main
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        <HeroChapter />
        <AboutChapter />
        <SkillsChapter />
        <DataFlowChapter />
        <ProjectsChapter />
        <TimelineChapter />
        <ContactChapter />
      </main>
    </>
  );
}
