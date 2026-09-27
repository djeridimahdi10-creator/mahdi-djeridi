"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { ORBIT_RADIUS, NUM_STATIONS, STATION_ANGLES } from "./OrbitalLayout";

const STREAM_COUNT = 2500;

export default function OrbitalStreams() {
  const { theme } = usePortfolio();
  const isLight = theme === "light";

  const groupRef = useRef<THREE.Group>(null!);
  const innerGroupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const positions = new Float32Array(STREAM_COUNT * 3);
    const colors = new Float32Array(STREAM_COUNT * 3);

    const colorPalette = [
      new THREE.Color("#00f5ff"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#10b981"),
      new THREE.Color("#38bdf8"),
    ];

    for (let i = 0; i < STREAM_COUNT; i++) {
      const angle = (i / STREAM_COUNT) * Math.PI * 2;
      const radialSpread = (Math.random() - 0.5) * 4;
      const heightSpread = (Math.random() - 0.5) * 2.5;
      const r = ORBIT_RADIUS + radialSpread;

      positions[i * 3] = r * Math.cos(angle);
      positions[i * 3 + 1] = heightSpread;
      positions[i * 3 + 2] = r * Math.sin(angle);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)].clone();
      color.multiplyScalar(0.6 + Math.random() * 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // Station beacon markers
  const beaconGeometry = useMemo(() => {
    const count = NUM_STATIONS * 80;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const beaconColors = [
      "#00f5ff", "#a855f7", "#ef4444", "#10b981", "#f59e0b", "#38bdf8", "#7c3aed",
    ];

    for (let s = 0; s < NUM_STATIONS; s++) {
      const angle = STATION_ANGLES[s];
      const color = new THREE.Color(beaconColors[s]);
      for (let j = 0; j < 80; j++) {
        const idx = s * 80 + j;
        const spread = 2.5;
        positions[idx * 3] = ORBIT_RADIUS * Math.cos(angle) + (Math.random() - 0.5) * spread;
        positions[idx * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[idx * 3 + 2] = ORBIT_RADIUS * Math.sin(angle) + (Math.random() - 0.5) * spread;

        const c = color.clone().multiplyScalar(0.5 + Math.random() * 0.5);
        colors[idx * 3] = c.r;
        colors[idx * 3 + 1] = c.g;
        colors[idx * 3 + 2] = c.b;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Slowly rotate stream particles around the ring
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.y = t * 0.06;
    }

    // Pulsing orbital ring track
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (isLight ? 1.5 : 2.5) + Math.sin(t * 1.5) * 0.5;
    }
    if (ring2Ref.current) {
      const mat = ring2Ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (isLight ? 1.0 : 1.8) + Math.sin(t * 1.2 + 1) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary orbital ring track — the prominent circular rail stations sit on */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_RADIUS, 0.09, 16, 240]} />
        <meshStandardMaterial
          color={isLight ? "#0284c7" : "#00f5ff"}
          emissive={isLight ? "#0284c7" : "#00f5ff"}
          emissiveIntensity={isLight ? 2.5 : 4.0}
          transparent
          opacity={isLight ? 0.7 : 0.9}
        />
      </mesh>

      {/* Secondary outer glow ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_RADIUS + 1.5, 0.04, 16, 240]} />
        <meshStandardMaterial
          color={isLight ? "#6d28d9" : "#7c3aed"}
          emissive={isLight ? "#6d28d9" : "#7c3aed"}
          emissiveIntensity={isLight ? 2.0 : 3.5}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Tertiary inner guide ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_RADIUS - 1.5, 0.03, 16, 240]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={2.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Flowing particle stream along the ring */}
      <group ref={innerGroupRef}>
        <points geometry={geometry}>
          <pointsMaterial
            size={0.18}
            sizeAttenuation
            transparent
            opacity={isLight ? 0.5 : 0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors
          />
        </points>
      </group>

      {/* Station beacon particle clusters */}
      <points geometry={beaconGeometry}>
        <pointsMaterial
          size={0.24}
          sizeAttenuation
          transparent
          opacity={isLight ? 0.6 : 0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>
    </group>
  );
}
