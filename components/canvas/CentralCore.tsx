"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/components/context/PortfolioContext";

const CORE_PARTICLE_COUNT = 6000;

function createCoreParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 3.0 + (Math.random() - 0.5) * 3.0;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const t = (positions[i * 3 + 1] + 4) / 8;
    const color = new THREE.Color();
    if (t < 0.33) {
      color.lerpColors(new THREE.Color("#00f5ff"), new THREE.Color("#7c3aed"), t * 3);
    } else if (t < 0.66) {
      color.lerpColors(new THREE.Color("#7c3aed"), new THREE.Color("#10b981"), (t - 0.33) * 3);
    } else {
      color.lerpColors(new THREE.Color("#10b981"), new THREE.Color("#00f5ff"), (t - 0.66) * 3);
    }
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  return { positions, colors };
}

export default function CentralCore() {
  const { theme } = usePortfolio();
  const isLight = theme === "light";

  const icosaRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const ring4Ref = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const { geometry, basePositions } = useMemo(() => {
    const { positions, colors } = createCoreParticles(CORE_PARTICLE_COUNT);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry: geo, basePositions: positions };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.y = -t * 0.25;
      icosaRef.current.rotation.x = t * 0.12;
      const mat = icosaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (isLight ? 1.2 : 2.2) + Math.sin(t * 1.5) * 0.6;
    }

    if (sphereRef.current) {
      const mat = sphereRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (isLight ? 2.0 : 4.0) + Math.sin(t * 2.0) * 1.0;
      sphereRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.03);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.25;
      ring1Ref.current.rotation.y = t * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.2;
      ring2Ref.current.rotation.z = t * 0.18;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.15;
      ring3Ref.current.rotation.z = -t * 0.22;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y = t * 0.12;
      ring4Ref.current.rotation.x = -t * 0.1;
    }

    // Particle breathing
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const breathe = Math.sin(t * 0.8) * 0.12;
      for (let i = 0; i < CORE_PARTICLE_COUNT; i += 6) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        const dist = Math.sqrt(bx * bx + by * by + bz * bz);
        const scale = 1 + breathe * (dist / 5);
        posAttr.setXYZ(
          i,
          bx * scale + Math.sin(t + i * 0.1) * 0.025,
          by * scale + Math.cos(t * 0.7 + i * 0.08) * 0.03,
          bz * scale + Math.sin(t * 0.9 + i * 0.12) * 0.025
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core particle cloud */}
      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial
          size={0.18}
          sizeAttenuation
          transparent
          opacity={isLight ? 0.6 : 0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* Central Geodesic Wireframe */}
      <Float speed={1.0} floatIntensity={0.15} rotationIntensity={0.1}>
        <mesh ref={icosaRef}>
          <icosahedronGeometry args={[4.2, 2]} />
          <meshStandardMaterial
            color={isLight ? "#0284c7" : "#005580"}
            emissive={isLight ? "#0284c7" : "#00f5ff"}
            emissiveIntensity={isLight ? 1.8 : 3.2}
            wireframe
            transparent
            opacity={isLight ? 0.6 : 0.8}
          />
        </mesh>
      </Float>

      {/* Inner Plasma Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshStandardMaterial
          color={isLight ? "#bae6fd" : "#0f2b48"}
          emissive={isLight ? "#0284c7" : "#00a2ff"}
          emissiveIntensity={isLight ? 3.0 : 5.5}
          transparent
          opacity={isLight ? 0.45 : 0.65}
        />
      </mesh>

      {/* Concentric Orbit Rings — 4 axes */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[8.0, 0.045, 16, 140]} />
        <meshStandardMaterial
          color={isLight ? "#0284c7" : "#00f5ff"}
          emissive={isLight ? "#0284c7" : "#00f5ff"}
          emissiveIntensity={isLight ? 2.5 : 4.0}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[10.2, 0.04, 16, 140]} />
        <meshStandardMaterial
          color={isLight ? "#6d28d9" : "#7c3aed"}
          emissive={isLight ? "#6d28d9" : "#7c3aed"}
          emissiveIntensity={isLight ? 2.5 : 4.5}
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[6.2, 0.035, 16, 120]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={isLight ? 2.5 : 4.0}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring4Ref}>
        <torusGeometry args={[12.5, 0.03, 16, 160]} />
        <meshStandardMaterial
          color={isLight ? "#0284c7" : "#00f5ff"}
          emissive={isLight ? "#0284c7" : "#00f5ff"}
          emissiveIntensity={isLight ? 2.0 : 3.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Core volumetric lights */}
      <pointLight
        color={isLight ? "#0284c7" : "#00f5ff"}
        intensity={isLight ? 150 : 280}
        distance={70}
        decay={2}
      />
      <pointLight
        color={isLight ? "#6d28d9" : "#7c3aed"}
        intensity={isLight ? 80 : 160}
        distance={55}
        decay={2}
        position={[0, 3, 0]}
      />
      <pointLight
        color="#10b981"
        intensity={isLight ? 50 : 100}
        distance={45}
        decay={2}
        position={[0, -3, 0]}
      />
    </group>
  );
}
