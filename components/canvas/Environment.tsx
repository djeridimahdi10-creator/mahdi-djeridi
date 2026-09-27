"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { ORBIT_RADIUS } from "./OrbitalLayout";

/**
 * Orbital Environment — Nebula backdrop, orbital ring track,
 * grid floor, ambient particles, and fog.
 */
export default function EnvironmentScene() {
  const { theme } = usePortfolio();
  const isLight = theme === "light";
  const gridRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    // Subtle grid rotation drift
    if (gridRef.current) {
      gridRef.current.rotation.y += delta * 0.003;
    }
  });

  return (
    <>
      {/* Fog — balanced for deep space atmosphere without obscuring stations */}
      <fog
        attach="fog"
        args={[isLight ? "#ffffff" : "#02020a", 28, 130]}
      />

      {/* Ambient fill */}
      <ambientLight
        color={isLight ? 0xffffff : 0x14143a}
        intensity={isLight ? 1.4 : 0.6}
      />

      {/* Main directional */}
      <directionalLight
        color={isLight ? 0xffffff : 0x4d5eff}
        intensity={isLight ? 1.0 : 0.7}
        position={[25, 35, 20]}
      />

      {/* Neon underlight */}
      <pointLight
        color={isLight ? 0x0284c7 : 0x7c3aed}
        intensity={isLight ? 25 : 45}
        distance={80}
        decay={2}
        position={[0, -6, 0]}
      />

      {/* Massive wireframe grid floor beneath the ring */}
      <mesh
        ref={gridRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -6, 0]}
      >
        <planeGeometry args={[200, 200, 100, 100]} />
        <meshBasicMaterial
          color={isLight ? "#0284c7" : "#00f0ff"}
          wireframe
          transparent
          opacity={isLight ? 0.06 : 0.1}
        />
      </mesh>

      {/* Floor occlusion plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6.05, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial
          color={isLight ? "#ffffff" : "#02020a"}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Nested nebula shells — concentric transparent spheres */}
      <mesh>
        <sphereGeometry args={[120, 32, 32]} />
        <meshBasicMaterial
          color={isLight ? "#e0f2fe" : "#050510"}
          side={THREE.BackSide}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[110, 24, 24]} />
        <meshBasicMaterial
          color={isLight ? "#bae6fd" : "#0a0a25"}
          side={THREE.BackSide}
          transparent
          opacity={isLight ? 0.3 : 0.5}
        />
      </mesh>

      {/* Stars / background particles */}
      <Stars isLight={isLight} />

      {/* Floating debris for parallax depth */}
      <FloatingDebris isLight={isLight} />
    </>
  );
}

/**
 * Star field — particles scattered in a large sphere
 */
function Stars({ isLight }: { isLight: boolean }) {
  const geometry = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 50 + Math.random() * 50;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={isLight ? 0x0284c7 : 0xffffff}
        size={isLight ? 0.06 : 0.1}
        sizeAttenuation
        transparent
        opacity={isLight ? 0.25 : 0.6}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Floating debris — small wireframe shapes at varying distances for parallax
 */
function FloatingDebris({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const debris = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 25 + Math.random() * 35;
        return {
          position: [
            r * Math.sin(phi) * Math.cos(theta),
            (Math.random() - 0.5) * 20,
            r * Math.sin(phi) * Math.sin(theta),
          ] as [number, number, number],
          scale: 0.3 + Math.random() * 0.7,
          speed: 0.1 + Math.random() * 0.3,
          type: Math.floor(Math.random() * 3), // 0=octa, 1=tetra, 2=ico
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = t * debris[i].speed;
        mesh.rotation.y = t * debris[i].speed * 0.7;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {debris.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          position={d.position}
          scale={d.scale}
        >
          {d.type === 0 && <octahedronGeometry args={[1, 0]} />}
          {d.type === 1 && <tetrahedronGeometry args={[1, 0]} />}
          {d.type === 2 && <icosahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={isLight ? "#0284c7" : "#0d0d2e"}
            emissive={isLight ? "#0284c7" : "#00f5ff"}
            emissiveIntensity={isLight ? 0.3 : 0.5}
            wireframe
            transparent
            opacity={isLight ? 0.12 : 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
