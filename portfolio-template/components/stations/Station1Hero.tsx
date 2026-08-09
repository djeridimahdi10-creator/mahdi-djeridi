"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 16000;

/**
 * Creates golden-ratio spherical particle cloud with gradient colors
 */
function createHeroParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const PHI = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = PHI * i;

    const radius = 2.0 + Math.sin(i * 0.02) * 1.2 + Math.random() * 0.8;
    const x = radius * Math.sin(inclination) * Math.cos(azimuth);
    const y = radius * Math.cos(inclination) * 1.8;
    const z = radius * Math.sin(inclination) * Math.sin(azimuth);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Cyan (#00f5ff) -> Purple (#7c3aed) -> Green (#10b981) gradient
    const mixFactor = (y + 3) / 6;
    const color = new THREE.Color();
    if (mixFactor < 0.5) {
      color.lerpColors(new THREE.Color("#00f5ff"), new THREE.Color("#7c3aed"), mixFactor * 2);
    } else {
      color.lerpColors(new THREE.Color("#7c3aed"), new THREE.Color("#10b981"), (mixFactor - 0.5) * 2);
    }

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return { positions, colors };
}

/**
 * Orbiting Tech Node Cubes representing the 4 specializations
 */
function OrbitingTechNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  const nodes = [
    { angle: 0, color: "#00f5ff", label: "AI AGENTS" },
    { angle: Math.PI / 2, color: "#7c3aed", label: "SECURITY" },
    { angle: Math.PI, color: "#10b981", label: "DEVOPS" },
    { angle: (3 * Math.PI) / 2, color: "#ef4444", label: "SYSTEMS" },
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => {
        const radius = 4.8;
        const x = Math.cos(node.angle) * radius;
        const z = Math.sin(node.angle) * radius;

        return (
          <group key={i} position={[x, Math.sin(i * 2) * 0.4, z]}>
            {/* Small glowing wireframe node cube */}
            <mesh>
              <boxGeometry args={[0.35, 0.35, 0.35]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={2.5}
                wireframe
              />
            </mesh>

            {/* Inner solid core */}
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={4.0}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Multi-Axis Concentric Cyber Rings
 */
function CyberConcentricRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.35;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.25;
      ring2Ref.current.rotation.z = t * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.2;
      ring3Ref.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <>
      {/* Outer Cyan Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.6, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={3.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Middle Neon Purple Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[4.2, 0.015, 16, 120]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={3.0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner Emerald Pulse Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.8, 0.018, 16, 120]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={2.8}
          transparent
          opacity={0.75}
        />
      </mesh>
    </>
  );
}

/**
 * Station1Hero: Ultra-Pro Quantum AI Core centered directly behind Hero Text
 */
export default function Station1Hero() {
  const mainGroupRef = useRef<THREE.Group>(null!);
  const icosaRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);

  const { geometry, basePositions } = useMemo(() => {
    const { positions, colors } = createHeroParticles(PARTICLE_COUNT);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry: geo, basePositions: positions };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    // Interactive subtle mouse tracking / parallax tilt
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.y,
        pointer.x * 0.35 + t * 0.08,
        0.05
      );
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      );
    }

    // Core Icosahedron pulse
    if (icosaRef.current) {
      icosaRef.current.rotation.y = -t * 0.4;
      icosaRef.current.rotation.z = t * 0.2;
      (icosaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.8 + Math.sin(t * 1.8) * 0.6;
    }

    // Dynamic Particle pulsation
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i += 12) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        posAttr.setXYZ(
          i,
          bx + Math.sin(t * 1.4 + i * 0.04) * 0.05,
          by + Math.cos(t * 1.0 + i * 0.03) * 0.07,
          bz + Math.sin(t * 1.2 + i * 0.05) * 0.05
        );
      }
      posAttr.needsUpdate = true;
    }

    if (materialRef.current) {
      materialRef.current.size = 0.055 + Math.sin(t * 1.2) * 0.015;
    }
  });

  return (
    <group ref={mainGroupRef} position={[0, 0.4, 2]}>
      {/* ── Particle Swarm Cloud ── */}
      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial
          ref={materialRef}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* ── Central Quantum Geodesic Core ── */}
      <Float speed={1.5} floatIntensity={0.3} rotationIntensity={0.2}>
        <mesh ref={icosaRef}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshStandardMaterial
            color="#002b40"
            emissive="#00f5ff"
            emissiveIntensity={2.0}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* ── Inner Plasma Sphere ── */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#0d1b2a"
          emissive="#0088ff"
          emissiveIntensity={3.0}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* ── Concentric Rings & Orbiting Nodes ── */}
      <CyberConcentricRings />
      <OrbitingTechNodes />

      {/* ── High-Intensity Volumetric Lights Framing Text ── */}
      <pointLight color="#00f5ff" intensity={90} distance={28} decay={2} position={[0, 0, 2]} />
      <pointLight color="#7c3aed" intensity={65} distance={24} decay={2} position={[0, -2.5, 1]} />
      <pointLight color="#10b981" intensity={45} distance={20} decay={2} position={[0, 2.5, 0]} />
    </group>
  );
}
