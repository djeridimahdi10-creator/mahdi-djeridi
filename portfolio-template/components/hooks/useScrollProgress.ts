"use client";

import { useEffect, useState, useRef } from "react";

export interface ScrollState {
  progress: number;       // Smooth lerped progress [0, 1]
  rawProgress: number;    // Immediate progress [0, 1]
  stationIndex: number;   // Active station index [0, 6]
}

/**
 * Global scroll state hook — tracks window.scrollY and returns smooth
 * lerped progress [0, 1] across all 7 storytelling chapters.
 */
export function useScrollProgress(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    rawProgress: 0,
    stationIndex: 0,
  });

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalH > 0 ? scrollY / totalH : 0;
      const clamped = Math.max(0, Math.min(1, p));
      targetProgress.current = clamped;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let animId: number;
    const loop = () => {
      // 120 FPS lerp smoothing
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
      const p = currentProgress.current;
      const rawP = targetProgress.current;
      const station = Math.min(Math.floor(rawP * 7), 6);

      setScrollState({
        progress: p,
        rawProgress: rawP,
        stationIndex: station,
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return scrollState;
}
