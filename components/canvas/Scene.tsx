"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";

import CameraRig from "./CameraRig";
import Environment from "./Environment";
import PostProcessing from "./PostProcessing";
import Station1Hero from "@/components/stations/Station1Hero";
import Station2Stack from "@/components/stations/Station2Stack";
import Station3DataFlow from "@/components/stations/Station3DataFlow";
import Station4Projects from "@/components/stations/Station4Projects";
import Station5About from "@/components/stations/Station5About";
import LoadingScreen from "@/components/hud/LoadingScreen";

function SceneContent() {
  return (
    <>
      <CameraRig />
      <Environment />

      {/* 3D Stations */}
      <Station1Hero />
      <Station2Stack />
      <Station3DataFlow />
      <Station4Projects />
      <Station5About />

      <PostProcessing />
    </>
  );
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);
  const { theme } = usePortfolio();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="canvas-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: theme === "light" ? "#ffffff" : "#02020a",
        transition: "background 0.3s ease",
        zIndex: 0,
      }}
    >
      <Suspense fallback={<LoadingScreen progress={0} />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            fov: 60,
            near: 0.1,
            far: 600,
            position: [0, 2, 12],
          }}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: theme === "light" ? 1.0 : 1.2,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <AdaptiveDpr pixelated />
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}
