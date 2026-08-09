/**
 * Material for glass project cards.
 */
import * as THREE from "three";

export function createCardMaterial(baseColor: number = 0x0a0a1a) {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColor),
    metalness: 0.1,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
  });

  return { material };
}
