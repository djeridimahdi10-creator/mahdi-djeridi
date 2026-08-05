"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Station5About() {
  return (
    <group position={[0, 0.5, -50]}>
      {/* 3D Holographic Portrait */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25} position={[-3.5, 3.8, 0.5]}>
        <ProfileHologram3D />
      </Float>

      {/* Terminal panel */}
      <Float speed={0.5} floatIntensity={0.1} position={[-3.5, -0.6, 0]}>
        <TerminalPanel3D />
      </Float>

      {/* Identity cards */}
      <group position={[4.5, 0, 0]}>
        <IdentityCard3D y={3.5} color={0x00f5ff} />
        <IdentityCard3D y={1.0} color={0xa855f7} />
        <IdentityCard3D y={-1.5} color={0x10b981} />
        <IdentityCard3D y={-4.0} color={0xef4444} />
      </group>

      <pointLight color={0x00f5ff} intensity={35} distance={22} decay={2} position={[-3.5, 3.8, 2.5]} />
      <pointLight color={0x7c3aed} intensity={20} distance={18} decay={2} position={[4, 0, 3]} />
    </group>
  );
}

function ProfileHologram3D() {
  const texture = useTexture("/profile.jpg");
  const ringRef = useRef<THREE.Mesh>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.6) * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Hologram Backplate */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[1.35, 64]} />
        <meshStandardMaterial
          color={0x02020a}
          emissive={0x00f5ff}
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Profile Photo Disc */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.25, 64]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.92}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hologram Cyber Ring */}
      <mesh ref={ringRef} position={[0, 0, 0.02]}>
        <ringGeometry args={[1.28, 1.35, 64]} />
        <meshStandardMaterial
          color={0x00f5ff}
          emissive={0x00f5ff}
          emissiveIntensity={3.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function TerminalPanel3D() {
  const panelRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (panelRef.current) {
      const t = clock.getElapsedTime();
      (panelRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.15 + Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group>
      <RoundedBox args={[7.2, 7.2, 0.08]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color={0x020208}
          emissive={0x001a10}
          emissiveIntensity={0.15}
          metalness={0.2}
          roughness={0.5}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Terminal header */}
      <mesh position={[0, 3.3, 0.05]}>
        <boxGeometry args={[7.2, 0.55, 0.02]} />
        <meshStandardMaterial color={0x050515} emissive={0x001008} emissiveIntensity={0.3} />
      </mesh>

      {/* Traffic light dots */}
      {[
        { x: -3.2, color: 0xef4444 },
        { x: -2.7, color: 0xf59e0b },
        { x: -2.2, color: 0x10b981 },
      ].map((dot) => (
        <mesh key={dot.x} position={[dot.x, 3.3, 0.07]}>
          <circleGeometry args={[0.1, 12]} />
          <meshStandardMaterial color={dot.color} emissive={dot.color} emissiveIntensity={2.0} />
        </mesh>
      ))}

      {/* Wireframe border */}
      <mesh>
        <boxGeometry args={[7.22, 7.22, 0.07]} />
        <meshStandardMaterial
          color={0x00f5ff}
          emissive={0x00f5ff}
          emissiveIntensity={0.8}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </group>
  );
}

function IdentityCard3D({ y, color }: { y: number; color: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.25 + Math.sin(t * 1.3 + y) * 0.15;
    }
  });

  return (
    <Float speed={1.0} floatIntensity={0.15} position={[0, y, 0]}>
      <group>
        <RoundedBox ref={meshRef} args={[4.2, 1.8, 0.07]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={0x03030d}
            emissive={new THREE.Color(color)}
            emissiveIntensity={0.25}
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={0.88}
          />
        </RoundedBox>

        <mesh position={[-2.08, 0, 0.05]}>
          <boxGeometry args={[0.015, 1.8, 0.07]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} />
        </mesh>
      </group>
    </Float>
  );
}
