"use client";

/**
 * Orbital Layout System — Constants & Utilities
 * All stations are arranged on a circular ring in the XZ plane.
 * Camera orbits outside the ring, looking inward.
 */

export const ORBIT_RADIUS = 24;
export const CAMERA_ORBIT_RADIUS = 35;
export const CAMERA_HEIGHT = 2.0;
export const NUM_STATIONS = 7;

/** Angle in radians for each station slot on the ring */
export const STATION_ANGLES = Array.from({ length: NUM_STATIONS }, (_, i) =>
  (i / NUM_STATIONS) * Math.PI * 2
);

/** World position of a station on the orbital ring */
export function getStationPosition(index: number): [number, number, number] {
  const angle = STATION_ANGLES[index];
  return [
    ORBIT_RADIUS * Math.cos(angle),
    0,
    ORBIT_RADIUS * Math.sin(angle),
  ];
}

/**
 * Y-axis rotation to make a station's local +Z face outward (toward camera).
 * Derived from: rotating [0,0,1] by angle φ around Y gives [sin(φ), 0, cos(φ)].
 * To align with outward direction [cos(θ), 0, sin(θ)], solve φ = π/2 − θ.
 */
export function getStationYRotation(index: number): number {
  const angle = STATION_ANGLES[index];
  return Math.PI / 2 - angle;
}

/** Labels for each station slot */
export const STATION_LABELS = [
  "HERO",
  "ABOUT",
  "SKILLS",
  "DATA FLOW",
  "PROJECTS",
  "TIMELINE",
  "CONTACT",
];
