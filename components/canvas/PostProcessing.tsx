"use client";

import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function PostProcessing() {
  const { theme } = usePortfolio();
  const isLight = theme === "light";

  return (
    <EffectComposer multisampling={0}>
      {/* Bloom — makes emissive materials glow */}
      <Bloom
        intensity={isLight ? 0.6 : 1.2}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.8}
      />

      {/* Chromatic Aberration — subtle RGB split at edges */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.0008, 0.0008)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.6}
      />

      {/* Vignette — Disabled in light mode so background stays pure white */}
      <Vignette
        offset={0.3}
        darkness={isLight ? 0.0 : 0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
