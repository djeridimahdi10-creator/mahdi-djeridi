"use client";

import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface Project {
  id: number;
  codename: string;
  accentColor: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

const PROJECTS: Project[] = [
  {
    id: 0,
    codename: "Alpha",
    accentColor: 0x00f5ff,
    position: [-4.5, 0, 0],
    rotation: [0, 0.14, 0],
  },
  {
    id: 1,
    codename: "Beta",
    accentColor: 0xa855f7,
    position: [0, 0.5, -1.5],
    rotation: [0, 0, 0],
  },
  {
    id: 2,
    codename: "Gamma",
    accentColor: 0x10b981,
    position: [4.5, 0, 0],
    rotation: [0, -0.14, 0],
  },
];

export default function Station4Projects() {
  return (
    <group position={[0, 0.5, -34]}>
      {PROJECTS.map((proj) => (
        <ProjectCard key={proj.id} project={proj} />
      ))}

      <pointLight color={0x00f5ff} intensity={15} distance={30} decay={2} position={[-5, 3, 3]} />
      <pointLight color={0xa855f7} intensity={15} distance={30} decay={2} position={[0, 3, 3]} />
      <pointLight color={0x10b981} intensity={15} distance={30} decay={2} position={[5, 3, 3]} />
    </group>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);
  const borderRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const hoverStrength = useRef(0);

  useFrame(({ clock }, delta) => {
    hoverStrength.current = THREE.MathUtils.lerp(
      hoverStrength.current,
      hovered ? 1 : 0,
      delta * 4.5
    );

    const t = clock.getElapsedTime();
    const h = hoverStrength.current;

    if (groupRef.current) {
      const baseFloat = Math.sin(t * 0.55 + project.id * 1.3) * 0.18;
      groupRef.current.position.y = baseFloat + h * 0.4;
      groupRef.current.rotation.y =
        project.rotation[1] + (hovered ? project.rotation[1] * -0.5 : 0);
    }

    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.15 + h * 1.8;
    }

    if (borderRef.current) {
      (borderRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.35 + h * 0.55 + Math.sin(t * 3.5) * 0.05 * h;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 8 + h * 40;
    }
  });

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const onPointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <Float
      speed={0.7}
      rotationIntensity={0.015}
      floatIntensity={0.08}
      position={project.position}
    >
      <group
        ref={groupRef}
        rotation={project.rotation}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {/* ── Glass card body ── */}
        <RoundedBox args={[4.0, 6.2, 0.1]} radius={0.14} smoothness={4}>
          <meshStandardMaterial
            color={0x03030e}
            metalness={0.4}
            roughness={0.0}
            transparent
            opacity={0.88}
          />
        </RoundedBox>

        {/* ── Glowing wireframe border ── */}
        <mesh ref={borderRef}>
          <boxGeometry args={[4.05, 6.25, 0.09]} />
          <meshStandardMaterial
            color={project.accentColor}
            emissive={project.accentColor}
            emissiveIntensity={1.8}
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>

        {/* ── Screen area ── */}
        <mesh ref={screenRef} position={[0, 1.05, 0.06]}>
          <planeGeometry args={[3.55, 3.0]} />
          <meshStandardMaterial
            color={0x010109}
            emissive={new THREE.Color(project.accentColor)}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Divider line */}
        <mesh position={[0, -0.65, 0.07]}>
          <boxGeometry args={[3.55, 0.008, 0.01]} />
          <meshStandardMaterial
            color={project.accentColor}
            emissive={project.accentColor}
            emissiveIntensity={3.0}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Corner marks */}
        <CornerMark pos={[-1.85, 2.95, 0.07]} color={project.accentColor} />
        <CornerMark pos={[1.85, 2.95, 0.07]} color={project.accentColor} flipX />

        {/* Point light */}
        <pointLight
          ref={lightRef}
          color={project.accentColor}
          intensity={8}
          distance={12}
          decay={2}
          position={[0, 0, 2]}
        />
      </group>
    </Float>
  );
}

function CornerMark({
  pos,
  color,
  flipX = false,
}: {
  pos: [number, number, number];
  color: number;
  flipX?: boolean;
}) {
  const sign = flipX ? -1 : 1;
  return (
    <group position={pos}>
      <mesh position={[sign * 0.12, 0, 0]}>
        <boxGeometry args={[0.28, 0.018, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[0.018, 0.28, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
      </mesh>
    </group>
  );
}
