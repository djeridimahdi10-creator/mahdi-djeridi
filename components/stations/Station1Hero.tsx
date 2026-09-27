"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 10000;

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

    const radius = 3.6 + Math.sin(i * 0.02) * 1.8 + Math.random() * 1.2;
    const x = radius * Math.sin(inclination) * Math.cos(azimuth);
    const y = radius * Math.cos(inclination) * 1.8;
    const z = radius * Math.sin(inclination) * Math.sin(azimuth);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Cyan → Purple → Emerald radiant gradient
    const mixFactor = (y + 4) / 8;
    const color = new THREE.Color();
    if (mixFactor < 0.5) {
      color.lerpColors(new THREE.Color("#00f5ff"), new THREE.Color("#8b5cf6"), mixFactor * 2);
    } else {
      color.lerpColors(new THREE.Color("#8b5cf6"), new THREE.Color("#10b981"), (mixFactor - 0.5) * 2);
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
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.z += delta * 0.12;
    }
  });

  const nodes = [
    { angle: 0, color: "#00f5ff", label: "AI SYSTEMS" },
    { angle: Math.PI / 2, color: "#a855f7", label: "APP SECURITY" },
    { angle: Math.PI, color: "#10b981", label: "DEVOPS" },
    { angle: (3 * Math.PI) / 2, color: "#fbbf24", label: "FULL STACK" },
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => {
        const radius = 5.2;
        const x = Math.cos(node.angle) * radius;
        const z = Math.sin(node.angle) * radius;

        return (
          <group key={i} position={[x, Math.sin(i * 2) * 0.6, z]}>
            <mesh>
              <boxGeometry args={[0.55, 0.55, 0.55]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={3.5}
                wireframe
              />
            </mesh>
            <mesh>
              <octahedronGeometry args={[0.22]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive={node.color}
                emissiveIntensity={5.0}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Triple-axis Gyroscope Astrolabe rings
 */
function GyroscopeCore() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.8;
    if (ring2.current) ring2.current.rotation.y += delta * 0.6;
    if (ring3.current) ring3.current.rotation.z += delta * 0.7;
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={3.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.9, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={3.0}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[3.3, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={2.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/**
 * Station1Hero: Particle nebula cloud with orbiting tech nodes and gyroscope core.
 */
export default function Station1Hero() {
  const mainGroupRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);

  const { geometry, basePositions } = useMemo(() => {
    const { positions, colors } = createHeroParticles(PARTICLE_COUNT);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry: geo, basePositions: positions };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

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

    // Dynamic particle pulsation
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i += 8) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        posAttr.setXYZ(
          i,
          bx + Math.sin(t * 1.5 + i * 0.04) * 0.08,
          by + Math.cos(t * 1.2 + i * 0.03) * 0.1,
          bz + Math.sin(t * 1.3 + i * 0.05) * 0.08
        );
      }
      posAttr.needsUpdate = true;
    }

    if (materialRef.current) {
      materialRef.current.size = 0.18 + Math.sin(t * 1.2) * 0.04;
    }
  });

  return (
    <group ref={mainGroupRef} position={[0, 0.4, 0]}>
      {/* Particle Swarm Cloud */}
      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial
          ref={materialRef}
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* Central 3D Geodesic Crystal */}
      <Float speed={1.5} floatIntensity={0.25} rotationIntensity={0.2}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial
            color="#001830"
            emissive="#00f5ff"
            emissiveIntensity={2.5}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.9, 24, 24]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#38bdf8"
            emissiveIntensity={4.0}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Rotating Gyroscope Rings */}
      <GyroscopeCore />

      {/* Orbiting Tech Nodes */}
      <OrbitingTechNodes />

      {/* High-intensity station lights */}
      <pointLight color="#00f5ff" intensity={120} distance={28} decay={2} position={[0, 0, 3]} />
      <pointLight color="#a855f7" intensity={80} distance={24} decay={2} position={[0, -3, 2]} />
      <pointLight color="#10b981" intensity={70} distance={22} decay={2} position={[0, 3, 1]} />
    </group>
  );
}
