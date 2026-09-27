"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCursorLight } from "@/components/hooks/useCursorLight";
import {
  CAMERA_ORBIT_RADIUS,
  CAMERA_HEIGHT,
  ORBIT_RADIUS,
} from "./OrbitalLayout";

/**
 * Orbital Camera Rig
 * Camera orbits outside the station ring, looking inward.
 * Scroll progress [0 → 1] maps to camera angle [0 → 2π].
 */
export default function CameraRig() {
  const { camera } = useThree();
  const cursorWorldPos = useCursorLight();
  const lightRef = useRef<THREE.PointLight>(null!);
  const scrollProgress = useRef(0);
  const mouseOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalH > 0 ? scrollY / totalH : 0;
      scrollProgress.current = Math.max(0, Math.min(1, p));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseOffset.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseOffset.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const t = scrollProgress.current;

    // Orbital angle based on scroll progress
    const angle = t * Math.PI * 2;

    // Camera position on outer orbit circle
    // Subtle height variation adds dynamism between stations
    const heightWave = Math.sin(angle * 3.5) * 1.2;
    const camX = CAMERA_ORBIT_RADIUS * Math.cos(angle);
    const camY = CAMERA_HEIGHT + heightWave;
    const camZ = CAMERA_ORBIT_RADIUS * Math.sin(angle);

    // Mouse parallax: offset camera position slightly based on cursor
    const parallaxX = mouseOffset.current.x * 1.8;
    const parallaxY = mouseOffset.current.y * 0.9;

    // Apply parallax perpendicular to the view direction (tangential)
    const tangentX = -Math.sin(angle);
    const tangentZ = Math.cos(angle);

    const targetPos = new THREE.Vector3(
      camX + tangentX * parallaxX,
      camY + parallaxY,
      camZ + tangentZ * parallaxX
    );

    // Look at the station position on the inner ring (same angle)
    // Offset target slightly along tangent so the 3D station is centered in the open right-hand area
    const frameOffset = -2.4;
    const lookX = ORBIT_RADIUS * Math.cos(angle);
    const lookZ = ORBIT_RADIUS * Math.sin(angle);
    const lookTarget = new THREE.Vector3(
      lookX + tangentX * frameOffset,
      0.6,
      lookZ + tangentZ * frameOffset
    );

    // Smooth camera interpolation
    camera.position.lerp(targetPos, 0.055);

    // Smooth quaternion rotation toward look target
    const targetQ = new THREE.Quaternion();
    const m = new THREE.Matrix4();
    m.lookAt(camera.position, lookTarget, camera.up);
    targetQ.setFromRotationMatrix(m);
    camera.quaternion.slerp(targetQ, 0.055);

    // Cursor-following point light
    if (lightRef.current) {
      lightRef.current.position.lerp(cursorWorldPos.current, 0.08);
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
