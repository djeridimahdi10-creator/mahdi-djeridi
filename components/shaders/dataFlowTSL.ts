/**
 * Data flow particle shader for Station 3.
 * Uses standard BufferGeometry + PointsMaterial for wide compatibility.
 * Particle movement is driven via useFrame (CPU path) as a graceful
 * fallback — WebGPU compute path can be layered on top later.
 */
import * as THREE from "three";

export interface DataFlowParticleSystem {
  points: THREE.Points;
  positions: Float32Array;
  velocities: Float32Array;
  lifetimes: Float32Array;
  curve: THREE.CatmullRomCurve3;
  count: number;
}

export function createDataFlowSystem(
  curve: THREE.CatmullRomCurve3,
  count: number = 8000
): DataFlowParticleSystem {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count); // t along curve [0,1]
  const lifetimes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const t = Math.random();
    velocities[i] = t;
    lifetimes[i] = Math.random();
    const pt = curve.getPointAt(t);
    positions[i * 3] = pt.x + (Math.random() - 0.5) * 0.15;
    positions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.15;
    positions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.15;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.04,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: false,
    color: new THREE.Color(0x00f5ff),
  });

  const points = new THREE.Points(geometry, material);

  return { points, positions, velocities, lifetimes, curve, count };
}

/**
 * Called in useFrame to update particle positions along the curve.
 */
export function tickDataFlow(
  system: DataFlowParticleSystem,
  delta: number,
  speed: number = 0.04
) {
  const { positions, velocities, lifetimes, curve, count } = system;
  const geo = system.points.geometry;

  for (let i = 0; i < count; i++) {
    velocities[i] += delta * speed * (0.5 + lifetimes[i] * 0.5);
    if (velocities[i] > 1) velocities[i] = 0;

    const pt = curve.getPointAt(velocities[i]);
    positions[i * 3] = pt.x + (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.08;
  }

  (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
}
