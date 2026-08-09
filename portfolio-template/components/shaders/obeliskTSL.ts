/**
 * Shader material helper for the hero particle obelisk.
 */
import * as THREE from "three";

export function createObeliskMaterial() {
  const material = new THREE.PointsMaterial({
    size: 0.06,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color(0x00f5ff),
  });

  return { material };
}

export function createObeliskGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const PHI = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = PHI * i;

    const stretchY = 2.5;
    const radius = 1.8 + Math.random() * 0.6;

    const x = radius * Math.sin(inclination) * Math.cos(azimuth);
    const y = radius * Math.cos(inclination) * stretchY;
    const z = radius * Math.sin(inclination) * Math.sin(azimuth);

    positions[i * 3] = x + (Math.random() - 0.5) * 0.3;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.3;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.3;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}
