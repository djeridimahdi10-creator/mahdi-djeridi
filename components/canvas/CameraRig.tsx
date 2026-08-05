"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCursorLight } from "@/components/hooks/useCursorLight";

// Smooth 7-Station Camera Trajectory Path
const CAMERA_PATH = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 2.0, 12),     // Ch 1: Hero — Far View
    new THREE.Vector3(0, 1.6, 5),      // Ch 1: Hero — Close Approach
    new THREE.Vector3(-3.5, 1.2, -50), // Ch 2: About — Terminal Focus
    new THREE.Vector3(5.5, 2.0, -10),  // Ch 3: Skills — Slabs Focus
    new THREE.Vector3(-6.0, 1.2, -20), // Ch 4: Data Flow — Particle Tubes
    new THREE.Vector3(0, 2.5, -34),    // Ch 5: Projects — Glass Cards
    new THREE.Vector3(3.5, 1.8, -42),  // Ch 6: Timeline — Milestones
    new THREE.Vector3(0, 2.0, 8),      // Ch 7: Contact — Outro Core View
  ],
  false,
  "catmullrom",
  0.5
);

const LOOK_PATH = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 0),        // Ch 1: Hero Core
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-3.5, 0.5, -50), // Ch 2: Terminal Target
    new THREE.Vector3(5.5, -0.5, -10), // Ch 3: Slabs Target
    new THREE.Vector3(-6.0, 0, -20),   // Ch 4: Flow Tubes Target
    new THREE.Vector3(0, 0.5, -34),    // Ch 5: Glass Cards Target
    new THREE.Vector3(3.5, 0.5, -42),  // Ch 6: Timeline Target
    new THREE.Vector3(0, 0, 0),        // Ch 7: Outro Core Target
  ],
  false,
  "catmullrom",
  0.5
);

export default function CameraRig() {
  const { camera } = useThree();
  const cursorWorldPos = useCursorLight();
  const lightRef = useRef<THREE.PointLight>(null!);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalH > 0 ? scrollY / totalH : 0;
      scrollProgress.current = Math.max(0, Math.min(1, p));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    const t = scrollProgress.current;

    const camPos = CAMERA_PATH.getPointAt(Math.min(t, 0.999));
    const lookAt = LOOK_PATH.getPointAt(Math.min(t, 0.999));

    // Smooth camera interpolation
    camera.position.lerp(camPos, 0.08);

    const targetQ = new THREE.Quaternion();
    const m = new THREE.Matrix4();
    m.lookAt(camera.position, lookAt, camera.up);
    targetQ.setFromRotationMatrix(m);
    camera.quaternion.slerp(targetQ, 0.08);

    if (lightRef.current) {
      lightRef.current.position.lerp(cursorWorldPos.current, 0.1);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color={0x00f5ff}
      intensity={55}
      distance={28}
      decay={2}
    />
  );
}
