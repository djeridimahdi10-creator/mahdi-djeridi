"use client";

import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Tracks mouse position in normalized device coordinates and returns
 * a THREE.Vector3 ref representing the 3D world position on a virtual
 * plane at y=0 (for cursor-following point light placement).
 */
export function useCursorLight() {
  const { camera, gl } = useThree();
  const worldPos = useRef(new THREE.Vector3(0, 4, 0));
  const mouse = useRef(new THREE.Vector2(0, 0));
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), -4));

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const target = new THREE.Vector3();
      raycaster.current.ray.intersectPlane(plane.current, target);
      if (target) {
        // Clamp to reasonable range + smooth
        worldPos.current.lerp(
          new THREE.Vector3(
            THREE.MathUtils.clamp(target.x, -20, 20),
            4,
            THREE.MathUtils.clamp(target.z, -20, 20)
          ),
          0.08
        );
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [camera, gl]);

  return worldPos;
}
