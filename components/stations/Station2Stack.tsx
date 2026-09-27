"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface SlabConfig {
  y: number;
  color: number;
  emissive: number;
  emissiveIntensity: number;
  lightColor: number;
  delayOffset: number;
}

const SLABS: SlabConfig[] = [
  {
    y: -4.0,
    color: 0x150508,
    emissive: 0xef4444,
    emissiveIntensity: 0.8,
    lightColor: 0xef4444,
    delayOffset: 0,
  },
  {
    y: -0.2,
    color: 0x080518,
    emissive: 0x7c3aed,
    emissiveIntensity: 0.9,
    lightColor: 0x7c3aed,
    delayOffset: 0.09,
  },
  {
    y: 3.6,
    color: 0x001018,
    emissive: 0x00f5ff,
    emissiveIntensity: 1.0,
    lightColor: 0x00f5ff,
    delayOffset: 0.18,
  },
  {
    y: 7.2,
    color: 0x040818,
    emissive: 0x10b981,
    emissiveIntensity: 0.95,
    lightColor: 0x10b981,
    delayOffset: 0.27,
  },
];

/**
 * Station2Stack: Skill stack slabs — always visible with idle animations.
 * Positioned at local origin; Scene.tsx handles orbital placement.
 */
export default function Station2Stack() {
  return (
    <group position={[0, -1, 0]}>
      {SLABS.map((slab, i) => (
        <SlabUnit key={i} config={slab} index={i} />
      ))}
      <ConnectorSpine />
    </group>
  );
}

function SlabUnit({
  config,
  index,
}: {
  config: SlabConfig;
  index: number;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const slabRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Pulsing emissive
    if (matRef.current) {
      matRef.current.emissiveIntensity =
        config.emissiveIntensity +
        Math.sin(t * 1.1 + config.delayOffset * 12) * 0.35;
    }

    // Subtle floating motion per slab
    if (slabRef.current) {
      slabRef.current.position.y =
        config.y + Math.sin(t * 0.6 + index * 0.8) * 0.15;
    }
  });

  return (
    <group>
      <RoundedBox
        ref={slabRef}
        args={[8.4, 1.5, 0.35]}
        radius={0.1}
        smoothness={4}
        castShadow
        position={[0, config.y, 0]}
      >
        <meshStandardMaterial
          ref={matRef}
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={config.emissiveIntensity}
          metalness={0.85}
          roughness={0.12}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      <pointLight
        color={config.lightColor}
        intensity={25}
        distance={10}
        decay={2}
        position={[0, config.y, 1.2]}
      />

      {/* Edge accent */}
      <mesh position={[4.28, config.y, 0]}>
        <boxGeometry args={[0.02, 1.5, 0.35]} />
        <meshStandardMaterial
          color={config.emissive}
          emissive={config.emissive}
          emissiveIntensity={6}
        />
      </mesh>
    </group>
  );
}

function ConnectorSpine() {
  const spineRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (spineRef.current) {
      (spineRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.5 + Math.sin(clock.getElapsedTime() * 2.5) * 0.5;
    }
  });

  return (
    <mesh ref={spineRef} position={[-4.45, 1.6, 0]}>
      <boxGeometry args={[0.015, 13.5, 0.015]} />
      <meshStandardMaterial
        color={0x222244}
        emissive={0x00f5ff}
        emissiveIntensity={2.0}
      />
    </mesh>
  );
}
