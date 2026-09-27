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
      {/* Bloom — enhanced for orbital glow trails */}
      <Bloom
        intensity={isLight ? 0.7 : 1.5}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
      />

      {/* Chromatic Aberration — subtle RGB split at edges */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.001, 0.001)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* Vignette — cinematic framing */}
      <Vignette
        offset={0.25}
        darkness={isLight ? 0.0 : 0.75}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
