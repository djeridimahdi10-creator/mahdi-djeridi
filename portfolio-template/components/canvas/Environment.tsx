"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";

export default function EnvironmentScene() {
  const gridRef = useRef<THREE.GridHelper>(null!);
  const { theme } = usePortfolio();
  const isLight = theme === "light";

  useFrame(() => {
    // Subtle grid drift
    if (gridRef.current) {
      gridRef.current.position.z += 0.003;
      if (gridRef.current.position.z > 2) gridRef.current.position.z = 0;
    }
  });

  return (
    <>
      {/* Fog — Pure White in Light Mode vs Dark in Dark Mode */}
      <fogExp2 attach="fog" args={[isLight ? 0xffffff : 0x02020a, isLight ? 0.012 : 0.018]} />

      {/* Ambient light */}
      <ambientLight color={isLight ? 0xffffff : 0x0a0a2e} intensity={isLight ? 1.5 : 0.3} />

      {/* Main scene directional */}
      <directionalLight
        color={isLight ? 0xffffff : 0x1a1a4e}
        intensity={isLight ? 1.0 : 0.4}
        position={[10, 20, 10]}
      />

      {/* Neon fill from below */}
      <pointLight
        color={isLight ? 0x0284c7 : 0x7c3aed}
        intensity={isLight ? 20 : 30}
        distance={40}
        decay={2}
        position={[0, -6, 0]}
      />

      {/* Background grid */}
      <gridHelper
        ref={gridRef}
        args={[200, 200, isLight ? 0x0284c7 : 0x0d0d2e, isLight ? 0x0284c7 : 0x0d0d2e]}
        position={[0, -5, -20]}
        rotation={[0, 0, 0]}
      />

      {/* Second grid layer */}
      <gridHelper
        args={[200, 80, isLight ? 0x0369a1 : 0x1a1a4e, isLight ? 0x0284c7 : 0x0d0d2e]}
        position={[0, -5.02, -20]}
      />

      {/* Horizon plane — Pure White in Light Mode */}
      <mesh position={[0, -5, -60]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 120]} />
        <meshBasicMaterial
          color={isLight ? 0xffffff : 0x02020a}
          transparent
          opacity={1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Stars / background particles */}
      <Stars isLight={isLight} />
    </>
  );
}

function Stars({ isLight }: { isLight: boolean }) {
  const starCount = 2000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = Math.random() * 80 - 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200 - 20;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={isLight ? 0x0284c7 : 0xffffff}
        size={isLight ? 0.06 : 0.08}
        sizeAttenuation
        transparent
        opacity={isLight ? 0.3 : 0.6}
        depthWrite={false}
      />
    </points>
  );
}
