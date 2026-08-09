"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { createDataFlowSystem, tickDataFlow } from "@/components/shaders/dataFlowTSL";

// Tube paths: multiple bezier curves representing data pipelines
function buildTubeCurves(): THREE.CatmullRomCurve3[] {
  return [
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 2, 0),
      new THREE.Vector3(-1, 0, -2),
      new THREE.Vector3(1, -1, -4),
      new THREE.Vector3(3, 1, -6),
      new THREE.Vector3(0, 2, -8),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(2, -1, 0),
      new THREE.Vector3(0, 1, -2),
      new THREE.Vector3(-2, 0, -4),
      new THREE.Vector3(-3, -1, -6),
      new THREE.Vector3(1, 0, -8),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, -1),
      new THREE.Vector3(2, 2, -3),
      new THREE.Vector3(3, 0, -5),
      new THREE.Vector3(1, -2, -7),
      new THREE.Vector3(-1, -1, -9),
    ]),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, -2, 0),
      new THREE.Vector3(1, -1, -2.5),
      new THREE.Vector3(2, 1, -5),
      new THREE.Vector3(-1, 2, -7),
      new THREE.Vector3(-3, 0, -9),
    ]),
  ];
}

export default function Station3DataFlow() {
  const groupRef = useRef<THREE.Group>(null!);
  const systemsRef = useRef<ReturnType<typeof createDataFlowSystem>[]>([]);

  const { tubes, curves } = useMemo(() => {
    const c = buildTubeCurves();
    const t = c.map((curve) => {
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.04, 8, false);
      return { tubeGeo, curve };
    });
    return { tubes: t, curves: c };
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;
    systemsRef.current = curves.map((curve, i) =>
      createDataFlowSystem(curve, i === 0 ? 3000 : 2000)
    );
    systemsRef.current.forEach((sys) => groupRef.current.add(sys.points));

    return () => {
      systemsRef.current.forEach((sys) => {
        groupRef.current?.remove(sys.points);
        sys.points.geometry.dispose();
        (sys.points.material as THREE.Material).dispose();
      });
    };
  }, [curves]);

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
    systemsRef.current.forEach((sys, i) => {
      tickDataFlow(sys, delta, 0.035 + i * 0.01);
    });
  });

  return (
    <group position={[-6, 0, -20]}>
      {/* Translucent tubes */}
      <group ref={groupRef}>
        {tubes.map(({ tubeGeo }, i) => (
          <mesh key={i} geometry={tubeGeo}>
            <meshStandardMaterial
              color={i % 2 === 0 ? 0x001a2e : 0x0a0020}
              emissive={i % 2 === 0 ? 0x004488 : 0x330066}
              emissiveIntensity={0.5}
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Section header */}
      <Float speed={0.7} floatIntensity={0.2}>
        <Text
          position={[0, 5, 0]}
          fontSize={0.48}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
        >
          AI & Data Flow
        </Text>
      </Float>
      <Text
        position={[0, 4.2, 0]}
        fontSize={0.17}
        color="rgba(0,245,255,0.5)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        REAL-TIME PIPELINE PROCESSING
      </Text>

      {/* Data labels floating near tubes */}
      <Float speed={1.5} floatIntensity={0.3} position={[-2, 1.5, -2]}>
        <DataChip label="AI Utilization" color="#00f5ff" />
      </Float>
      <Float speed={1.2} floatIntensity={0.25} position={[2.5, -0.5, -4]}>
        <DataChip label="Audit Logs" color="#a855f7" />
      </Float>
      <Float speed={1.8} floatIntensity={0.35} position={[-1, -2, -6]}>
        <DataChip label="Real-time Sync" color="#10b981" />
      </Float>

      {/* Scattered glow lights along the tube paths */}
      <pointLight color={0x00f5ff} intensity={20} distance={12} decay={2} position={[-2, 1, -3]} />
      <pointLight color={0x7c3aed} intensity={15} distance={10} decay={2} position={[2, 0, -6]} />
      <pointLight color={0x10b981} intensity={12} distance={8} decay={2} position={[-1, -1, -8]} />
    </group>
  );
}

function DataChip({ label, color }: { label: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.2, 0.5, 0.08]} />
        <meshStandardMaterial
          color={0x050510}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {label}
      </Text>
    </group>
  );
}
