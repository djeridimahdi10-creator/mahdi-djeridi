"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

export interface ProjectData {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  hexColor: number;
  link: string;
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 0,
    code: "PRJ-01 · FLAGSHIP",
    title: "PC Labs",
    subtitle: "Hardware & PC Building Simulator",
    image: "/projects/pc-labs.png",
    color: "#00f5ff",
    hexColor: 0x00f5ff,
    link: "https://pc-labs-app.vercel.app/",
  },
  {
    id: 1,
    code: "PRJ-02 · LIVE APP",
    title: "Aura Bags",
    subtitle: "B2B Manufacturing & Packaging Portal",
    image: "/projects/bags-factory.png",
    color: "#fbbf24",
    hexColor: 0xfbbf24,
    link: "https://bags-factory.vercel.app/",
  },
  {
    id: 2,
    code: "PRJ-03 · FLAGSHIP AI",
    title: "NutriSaaS",
    subtitle: "AI Vision Health & Nutrition Platform",
    image: "/projects/nutrisaas.png",
    color: "#10b981",
    hexColor: 0x10b981,
    link: "https://mahdi-gym.vercel.app/",
  },
];

const CAROUSEL_RADIUS = 6.2;

/**
 * Station4Projects: Interactive 3D Circular Carousel of flagship projects.
 * Cards orbit in a circle with textures, glowing holographic frames, and click-to-focus.
 */
export default function Station4Projects() {
  const carouselRef = useRef<THREE.Group>(null!);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const isAutoRotating = useRef(true);

  // Listen for external project selection events from HUD
  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      const idx = customEvent.detail.index;
      setSelectedIndex(idx);
      // Target rotation to bring card to front (facing camera)
      // Angle of card i is (i / 3) * 2π. To bring it to angle 0:
      targetRotation.current = -(idx / PROJECTS_DATA.length) * Math.PI * 2;
      isAutoRotating.current = false;
    };

    window.addEventListener("orbit-select-project", handleSelect);
    return () => window.removeEventListener("orbit-select-project", handleSelect);
  }, []);

  useFrame((_, delta) => {
    if (carouselRef.current) {
      if (isAutoRotating.current) {
        currentRotation.current += delta * 0.15;
      } else {
        // Smoothly interpolate to target rotation
        currentRotation.current = THREE.MathUtils.lerp(
          currentRotation.current,
          targetRotation.current,
          delta * 4.0
        );
      }
      carouselRef.current.rotation.y = currentRotation.current;
    }
  });

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
    targetRotation.current = -(index / PROJECTS_DATA.length) * Math.PI * 2;
    isAutoRotating.current = false;
    window.dispatchEvent(
      new CustomEvent("orbit-project-changed", { detail: { index } })
    );
  };

  return (
    <group position={[0, 0.4, 0]}>
      {/* 3D Circular Carousel Ring Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <ringGeometry args={[CAROUSEL_RADIUS - 0.4, CAROUSEL_RADIUS + 0.4, 64]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.18, 0]}>
        <torusGeometry args={[CAROUSEL_RADIUS, 0.03, 16, 80]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Rotating Carousel Group */}
      <group ref={carouselRef}>
        {PROJECTS_DATA.map((proj, i) => {
          const angle = (i / PROJECTS_DATA.length) * Math.PI * 2;
          const x = CAROUSEL_RADIUS * Math.cos(angle);
          const z = CAROUSEL_RADIUS * Math.sin(angle);
          // Face outward from carousel center
          const faceOutward = Math.PI / 2 - angle;

          return (
            <group key={proj.id} position={[x, 0, z]} rotation={[0, faceOutward, 0]}>
              <ProjectCard
                project={proj}
                index={i}
                isSelected={selectedIndex === i}
                onClick={() => handleCardClick(i)}
              />
            </group>
          );
        })}
      </group>

      {/* Central carousel energy pillar */}
      <Float speed={1.2} floatIntensity={0.2}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 6, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={4.0}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={3.0}
            wireframe
          />
        </mesh>
      </Float>

      {/* Ambient carousel lights */}
      <pointLight color="#00f5ff" intensity={60} distance={25} decay={2} position={[0, 2, 0]} />
      <pointLight color="#fbbf24" intensity={40} distance={20} decay={2} position={[-4, 1, 3]} />
      <pointLight color="#10b981" intensity={40} distance={20} decay={2} position={[4, 1, -3]} />
    </group>
  );
}

function ProjectCard({
  project,
  index,
  isSelected,
  onClick,
}: {
  project: ProjectData;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(project.image);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [project.image]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating bob
      const targetY = Math.sin(t * 0.8 + index * 1.5) * 0.15 + (isSelected ? 0.35 : 0);
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        delta * 3.5
      );
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

  const activeColor = project.color;

  return (
    <group
      ref={groupRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      scale={isSelected ? 1.08 : hovered ? 1.04 : 1.0}
    >
      {/* 3D Glass Tablet Body */}
      <RoundedBox args={[4.4, 5.8, 0.16]} radius={0.16} smoothness={4}>
        <meshStandardMaterial
          color={0x050714}
          metalness={0.7}
          roughness={0.1}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Holographic Glowing Border */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[4.46, 5.86, 0.15]} />
        <meshStandardMaterial
          color={project.hexColor}
          emissive={project.hexColor}
          emissiveIntensity={isSelected ? 3.5 : hovered ? 2.5 : 1.2}
          wireframe
          transparent
          opacity={isSelected ? 0.85 : hovered ? 0.7 : 0.4}
        />
      </mesh>

      {/* Screenshot Screen Display */}
      <mesh position={[0, 0.65, 0.09]}>
        <planeGeometry args={[4.0, 2.5]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Screen Frame Border */}
      <mesh position={[0, 0.65, 0.1]}>
        <ringGeometry args={[1.98, 2.02, 4]} />
        <meshBasicMaterial color={activeColor} wireframe />
      </mesh>

      {/* Floating 3D Title */}
      <Text
        position={[0, -1.0, 0.12]}
        fontSize={0.34}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
      >
        {project.title}
      </Text>

      {/* Subtitle / Spec */}
      <Text
        position={[0, -1.45, 0.12]}
        fontSize={0.16}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {project.subtitle.toUpperCase()}
      </Text>

      {/* Code badge at top */}
      <Text
        position={[0, 2.45, 0.12]}
        fontSize={0.15}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        {project.code}
      </Text>

      {/* Corner Bracket Accents */}
      <CornerAccent pos={[-2.1, 2.75, 0.1]} color={project.color} />
      <CornerAccent pos={[2.1, 2.75, 0.1]} color={project.color} flipX />
      <CornerAccent pos={[-2.1, -2.75, 0.1]} color={project.color} flipY />
      <CornerAccent pos={[2.1, -2.75, 0.1]} color={project.color} flipX flipY />

      {/* Card Spotlight */}
      <pointLight
        color={project.hexColor}
        intensity={isSelected ? 45 : hovered ? 30 : 15}
        distance={10}
        decay={2}
        position={[0, 0, 1.8]}
      />
    </group>
  );
}

function CornerAccent({
  pos,
  color,
  flipX = false,
  flipY = false,
}: {
  pos: [number, number, number];
  color: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <group position={pos}>
      <mesh position={[sx * 0.15, 0, 0]}>
        <boxGeometry args={[0.32, 0.025, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
      </mesh>
      <mesh position={[0, sy * -0.15, 0]}>
        <boxGeometry args={[0.025, 0.32, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
      </mesh>
    </group>
  );
}
