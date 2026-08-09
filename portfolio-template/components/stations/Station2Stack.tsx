"use client";

import { useRef, useEffect } from "react";
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

export default function Station2Stack() {
  const groupRef = useRef<THREE.Group>(null!);
  const slabRefs = useRef<THREE.Mesh[]>([]);
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalH > 0 ? scrollY / totalH : 0;
      scrollOffset.current = Math.max(0, Math.min(1, p));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scrollOffset.current;
    const stationT = THREE.MathUtils.clamp((offset - 0.15) / 0.2, 0, 1);

    slabRefs.current.forEach((slab, i) => {
      if (!slab) return;
      const delay = SLABS[i].delayOffset;
      const t = THREE.MathUtils.smoothstep(stationT, delay, delay + 0.4);
      slab.position.z = THREE.MathUtils.lerp(-80, 0, t);
      const mat = slab.material as THREE.MeshStandardMaterial;
      if (mat) mat.opacity = THREE.MathUtils.lerp(0, 1, t);
    });
  });

  return (
    <group ref={groupRef} position={[5.5, -1, -10]}>
      {SLABS.map((slab, i) => (
        <SlabUnit
          key={i}
          config={slab}
          slabRef={(el: THREE.Mesh) => { slabRefs.current[i] = el; }}
        />
      ))}
      <ConnectorSpine />
    </group>
  );
}

function SlabUnit({
  config,
  slabRef,
}: {
  config: SlabConfig;
  slabRef: (el: THREE.Mesh) => void;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    if (matRef.current) {
      const t = clock.getElapsedTime();
      matRef.current.emissiveIntensity =
        config.emissiveIntensity +
        Math.sin(t * 1.1 + config.delayOffset * 12) * 0.35;
    }
  });

  return (
    <group position={[0, config.y, 0]}>
      <RoundedBox
        ref={slabRef}
        args={[8.4, 1.5, 0.35]}
        radius={0.1}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial
          ref={matRef}
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={config.emissiveIntensity}
          metalness={0.85}
          roughness={0.12}
          transparent
          opacity={0}
        />
      </RoundedBox>

      <pointLight
        color={config.lightColor}
        intensity={25}
        distance={10}
        decay={2}
        position={[0, 0, 1.2]}
      />

      <mesh position={[4.28, 0, 0]}>
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
