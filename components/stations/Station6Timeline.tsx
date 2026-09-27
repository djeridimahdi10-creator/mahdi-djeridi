"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const MILESTONES = [
  { y: 3.0, color: 0x00f5ff, label: "2024" },
  { y: 1.0, color: 0x7c3aed, label: "2023" },
  { y: -1.0, color: 0x10b981, label: "2022" },
  { y: -3.0, color: 0xf59e0b, label: "2021" },
];

export default function Station6Timeline() {
  const spineRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (spineRef.current) {
      const mat = spineRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.0 + Math.sin(clock.getElapsedTime() * 2.0) * 0.8;
    }
  });

  return (
    <group>
      {/* Central vertical spine */}
      <mesh ref={spineRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 9.5, 16]} />
        <meshStandardMaterial
          color={0x00f5ff}
          emissive={0x00f5ff}
          emissiveIntensity={3.0}
        />
      </mesh>

      {/* Milestone nodes */}
      {MILESTONES.map((milestone, i) => (
        <MilestoneNode
          key={i}
          y={milestone.y}
          color={milestone.color}
          index={i}
        />
      ))}

      {/* Ambient station light */}
      <pointLight color={0x00f5ff} intensity={50} distance={22} decay={2} position={[0, 2, 2]} />
      <pointLight color={0x7c3aed} intensity={40} distance={20} decay={2} position={[0, -2, 2]} />
    </group>
  );
}

function MilestoneNode({ y, color, index }: { y: number; color: number; index: number }) {
  const nodeRef = useRef<THREE.Mesh>(null!);
  const connectorRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (nodeRef.current) {
      const mat = nodeRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.0 + Math.sin(t * 1.5 + index * 1.2) * 1.0;
    }

    if (connectorRef.current) {
      const mat = connectorRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.5 + Math.sin(t * 2.5 + index) * 1.5;
    }
  });

  const side = index % 2 === 0 ? 1 : -1;

  return (
    <Float speed={0.8} floatIntensity={0.1} position={[0, y, 0]}>
      <group>
        {/* Connector line from spine to card */}
        <mesh ref={connectorRef} position={[side * 1.6, 0, 0]}>
          <boxGeometry args={[3.2, 0.04, 0.04]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={3.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Milestone card */}
        <group position={[side * 3.4, 0, 0]}>
          <RoundedBox args={[3.6, 1.4, 0.12]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color={0x03030d}
              emissive={new THREE.Color(color)}
              emissiveIntensity={0.35}
              metalness={0.4}
              roughness={0.15}
              transparent
              opacity={0.9}
            />
          </RoundedBox>

          {/* Accent bar */}
          <mesh position={[side * -1.75, 0, 0.08]}>
            <boxGeometry args={[0.06, 1.3, 0.06]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={5}
            />
          </mesh>
        </group>

        {/* Node sphere at spine */}
        <mesh ref={nodeRef}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={4.0}
          />
        </mesh>
      </group>
    </Float>
  );
}
