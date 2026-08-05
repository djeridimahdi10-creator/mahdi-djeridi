"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, AdaptiveDpr, Float } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";

/**
 * Animated Wireframe Cyber Grid Floor
 */
function DataGridFloor({ isLight }: { isLight: boolean }) {
  const gridRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 1.6;
      if (gridRef.current.position.z > 2) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <group position={[0, -4.5, -8]}>
      {/* Primary Cyber Grid */}
      <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[130, 130, 65, 65]} />
        <meshBasicMaterial
          color={isLight ? "#0284c7" : "#00f0ff"}
          wireframe
          transparent
          opacity={isLight ? 0.25 : 0.32}
        />
      </mesh>

      {/* Pure White / Dark Floor Occlusion Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[130, 130]} />
        <meshBasicMaterial color={isLight ? "#ffffff" : "#0a0f14"} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Pro Centered Neural Quantum Core (Framing Hero Text)
 */
function CenteredHeroCore({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const outerWireRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    if (groupRef.current) {
      // Mouse tracking parallax tilt
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.4 + t * 0.12,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.25,
        0.05
      );
    }

    if (outerWireRef.current) {
      (outerWireRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        isLight ? 1.0 + Math.sin(t * 1.8) * 0.3 : 1.5 + Math.sin(t * 1.8) * 0.5;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = t * 0.4;
      innerRingRef.current.rotation.z = t * 0.3;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = -t * 0.3;
      outerRingRef.current.rotation.z = -t * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, -3]}>
      {/* Central Quantum Geodesic Monolith Core */}
      <Float speed={1.4} floatIntensity={0.3} rotationIntensity={0.2}>
        <mesh ref={outerWireRef}>
          <icosahedronGeometry args={[1.8, 2]} />
          <meshStandardMaterial
            color={isLight ? "#0284c7" : "#003547"}
            emissive={isLight ? "#0284c7" : "#00f0ff"}
            emissiveIntensity={isLight ? 1.0 : 1.8}
            wireframe
            transparent
            opacity={isLight ? 0.6 : 0.75}
          />
        </mesh>
      </Float>

      {/* Inner Glowing Plasma Sphere */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color={isLight ? "#e0f2fe" : "#061a29"}
          emissive={isLight ? "#0369a1" : "#0088ff"}
          emissiveIntensity={isLight ? 1.5 : 3.2}
          transparent
          opacity={isLight ? 0.4 : 0.5}
        />
      </mesh>

      {/* Concentric Cyber Orbit Rings Framing Text */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[3.8, 0.02, 16, 120]} />
        <meshStandardMaterial
          color={isLight ? "#0284c7" : "#00f0ff"}
          emissive={isLight ? "#0284c7" : "#00f0ff"}
          emissiveIntensity={isLight ? 2.0 : 3.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={outerRingRef}>
        <torusGeometry args={[4.6, 0.015, 16, 120]} />
        <meshStandardMaterial
          color={isLight ? "#6d28d9" : "#7c3aed"}
          emissive={isLight ? "#6d28d9" : "#7c3aed"}
          emissiveIntensity={isLight ? 1.8 : 3.0}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Direct Backlight Framing Hero Headline */}
      <pointLight color={isLight ? "#0284c7" : "#00f0ff"} intensity={isLight ? 40 : 80} distance={25} decay={2} position={[0, 0, 1.5]} />
      <pointLight color={isLight ? "#6d28d9" : "#7c3aed"} intensity={isLight ? 30 : 50} distance={20} decay={2} position={[0, -2, 1]} />
    </group>
  );
}

/**
 * Background Content
 */
function BackgroundContent() {
  const { theme } = usePortfolio();
  const isLight = theme === "light";

  return (
    <>
      {/* Fog - Pure White in Light Mode */}
      <fog attach="fog" args={[isLight ? "#ffffff" : "#0a0f14", 10, 48]} />

      {/* Lighting */}
      <ambientLight color={isLight ? "#ffffff" : "#0a1526"} intensity={isLight ? 1.5 : 0.7} />
      <directionalLight color={isLight ? "#ffffff" : "#103048"} intensity={isLight ? 1.0 : 0.5} position={[-10, 20, 10]} />
      <pointLight color={isLight ? "#38bdf8" : "#0d3b4c"} intensity={isLight ? 25 : 35} distance={40} decay={2} position={[-6, -2, -8]} />

      {/* 3D Scene Components */}
      <DataGridFloor isLight={isLight} />
      <CenteredHeroCore isLight={isLight} />

      {/* Ambient Particle Clouds */}
      <Sparkles
        count={1500}
        scale={[45, 30, 45]}
        size={3.2}
        speed={0.35}
        opacity={isLight ? 0.35 : 0.65}
        color={isLight ? "#0284c7" : "#00f0ff"}
        noise={0.6}
      />
      <Sparkles
        count={800}
        scale={[35, 25, 35]}
        size={2.2}
        speed={0.2}
        opacity={isLight ? 0.3 : 0.5}
        color={isLight ? "#6d28d9" : "#7c3aed"}
        noise={0.4}
      />
    </>
  );
}

/**
 * BackgroundScene Component
 */
export default function BackgroundScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov: 55,
          near: 0.1,
          far: 100,
          position: [0, 2.5, 14],
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.18,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <AdaptiveDpr pixelated />
        <BackgroundContent />
      </Canvas>
    </div>
  );
}
