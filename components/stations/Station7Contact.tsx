"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function Station7Contact() {
  const beacon1Ref = useRef<THREE.Mesh>(null!);
  const beacon2Ref = useRef<THREE.Mesh>(null!);
  const beacon3Ref = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const orbiterRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Sonar ring expansion + fade
    [beacon1Ref, beacon2Ref, beacon3Ref].forEach((ref, i) => {
      if (ref.current) {
        const phase = (t * 0.5 + i * 0.33) % 1;
        const scale = 1 + phase * 4;
        ref.current.scale.setScalar(scale);
        const mat = ref.current.material as THREE.MeshStandardMaterial;
        mat.opacity = (1 - phase) * 0.6;
        mat.emissiveIntensity = (1 - phase) * 4;
      }
    });

    // Core pulse
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.0 + Math.sin(t * 2.5) * 1.5;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.05);
    }

    // Orbiting contact icons
    if (orbiterRef.current) {
      orbiterRef.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group>
      {/* Central beacon sphere */}
      <Float speed={1.2} floatIntensity={0.15}>
        <mesh ref={coreRef}>
          <dodecahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            color="#001a2e"
            emissive="#00f5ff"
            emissiveIntensity={3.5}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Inner solid glow */}
        <mesh>
          <sphereGeometry args={[1.0, 24, 24]} />
          <meshStandardMaterial
            color="#0d1b2a"
            emissive="#00f5ff"
            emissiveIntensity={5.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Sonar pulse rings */}
      <mesh ref={beacon1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.9, 64]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={4.5}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={beacon2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.9, 64]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={4.5}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={beacon3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.9, 64]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={4.5}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbiting contact nodes */}
      <group ref={orbiterRef}>
        {[
          { angle: 0, color: "#00f5ff", label: "Email" },
          { angle: (Math.PI * 2) / 3, color: "#7c3aed", label: "LinkedIn" },
          { angle: (Math.PI * 4) / 3, color: "#10b981", label: "GitHub" },
        ].map((node, i) => {
          const r = 4.8;
          return (
            <Float key={i} speed={1.5} floatIntensity={0.2}>
              <group
                position={[
                  r * Math.cos(node.angle),
                  Math.sin(i * 2.1) * 0.5,
                  r * Math.sin(node.angle),
                ]}
              >
                <mesh>
                  <octahedronGeometry args={[0.65, 0]} />
                  <meshStandardMaterial
                    color={node.color}
                    emissive={node.color}
                    emissiveIntensity={4.0}
                    wireframe
                  />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.25, 16, 16]} />
                  <meshStandardMaterial
                    color={node.color}
                    emissive={node.color}
                    emissiveIntensity={5.5}
                  />
                </mesh>
              </group>
            </Float>
          );
        })}
      </group>

      {/* Station lights */}
      <pointLight color={0x00f5ff} intensity={80} distance={25} decay={2} position={[0, 0, 2]} />
      <pointLight color={0x7c3aed} intensity={60} distance={22} decay={2} position={[0, 2, 0]} />
    </group>
  );
}
