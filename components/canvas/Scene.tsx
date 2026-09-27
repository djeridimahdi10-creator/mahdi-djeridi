"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";

import CameraRig from "./CameraRig";
import Environment from "./Environment";
import PostProcessing from "./PostProcessing";
import CentralCore from "./CentralCore";
import OrbitalStreams from "./OrbitalStreams";
import { getStationPosition, getStationYRotation } from "./OrbitalLayout";

import Station1Hero from "@/components/stations/Station1Hero";
import Station2Stack from "@/components/stations/Station2Stack";
import Station3DataFlow from "@/components/stations/Station3DataFlow";
import Station4Projects from "@/components/stations/Station4Projects";
import Station5About from "@/components/stations/Station5About";
import Station6Timeline from "@/components/stations/Station6Timeline";
import Station7Contact from "@/components/stations/Station7Contact";
import LoadingScreen from "@/components/hud/LoadingScreen";

/**
 * Orbital Station Wrapper
 * Positions a station on the ring at the correct angle and rotation.
 */
function OrbitalStation({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const pos = getStationPosition(index);
  const rotY = getStationYRotation(index);

  return (
    <group position={pos} rotation={[0, rotY, 0]}>
      {children}
    </group>
  );
}

/**
 * Scene Content — All 3D elements composed inside the Canvas.
 *
 * Layout:
 *   - CentralCore at origin (always visible)
 *   - OrbitalStreams connecting stations on the ring
 *   - 7 Stations placed on the orbital ring
 *   - Environment (fog, stars, grid, debris)
 *   - CameraRig (orbital camera + cursor light)
 *   - PostProcessing (bloom, chromatic aberration, vignette)
 */
function SceneContent() {
  return (
    <>
      <CameraRig />
      <Environment />

      {/* Central Gravity Core — always at origin */}
      <CentralCore />

      {/* Orbital ring track + particle streams */}
      <OrbitalStreams />

      {/* 7 Stations on the orbital ring (ordered by chapter) */}
      <OrbitalStation index={0}>
        <Station1Hero />
      </OrbitalStation>

      <OrbitalStation index={1}>
        <Station5About />
      </OrbitalStation>

      <OrbitalStation index={2}>
        <Station2Stack />
      </OrbitalStation>

      <OrbitalStation index={3}>
        <Station3DataFlow />
      </OrbitalStation>

      <OrbitalStation index={4}>
        <Station4Projects />
      </OrbitalStation>

      <OrbitalStation index={5}>
        <Station6Timeline />
      </OrbitalStation>

      <OrbitalStation index={6}>
        <Station7Contact />
      </OrbitalStation>

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
            position: [44, 3.5, 0], // Start on the outer orbit ring
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
