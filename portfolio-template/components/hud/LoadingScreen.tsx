"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

interface LoadingScreenProps {
  progress?: number;
}

const LOADING_STAGES = [
  "INITIALIZING",
  "LOADING ASSETS",
  "ASSEMBLING SCENE",
  "COMPILING SHADERS",
  "LAUNCHING",
];

export default function LoadingScreen({ progress: externalProgress }: LoadingScreenProps) {
  const { progress: r3fProgress } = useProgress();
  const rawProgress = externalProgress !== undefined ? externalProgress : r3fProgress;
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        const next = Math.max(prev + 3.5, rawProgress);
        setStageIndex(Math.min(
          Math.floor((next / 100) * LOADING_STAGES.length),
          LOADING_STAGES.length - 1
        ));
        if (next >= 100) {
          setIsLoaded(true);
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, 38);

    const forceTimer = setTimeout(() => {
      setDisplayProgress(100);
      setIsLoaded(true);
    }, 2200);

    return () => {
      clearInterval(timer);
      clearTimeout(forceTimer);
    };
  }, [rawProgress]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient background radials */}
          <div style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, transparent 70%)",
              }}
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.16, 0.08] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Monogram Logo with SVG stroke animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "-18px",
                borderRadius: "50%",
                border: "1px solid rgba(56, 189, 248, 0.18)",
                borderTopColor: "var(--sky-500)",
                borderRightColor: "rgba(56, 189, 248, 0.4)",
              }}
            />
            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                border: "1px dashed rgba(139, 92, 246, 0.2)",
                borderTopColor: "rgba(139, 92, 246, 0.5)",
              }}
            />

            {/* MD Monogram */}
            <div style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(139,92,246,0.12))",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(56,189,248,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              <svg width="44" height="32" viewBox="0 0 44 32" fill="none">
                {/* M */}
                <motion.path
                  d="M2 30V2L12 22L22 2V30"
                  stroke="url(#loadGrad)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                />
                {/* D */}
                <motion.path
                  d="M26 2H34C39.523 2 44 6.477 44 12V20C44 25.523 39.523 30 34 30H26V2Z"
                  stroke="url(#loadGrad)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
                />
                <defs>
                  <linearGradient id="loadGrad" x1="0" y1="0" x2="44" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center" }}
          >
            <div style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              Mahdi Djeridi
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "rgba(56,189,248,0.55)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: "5px",
            }}>
              Full-Stack &amp; AI Engineer
            </div>
          </motion.div>

          {/* Progress System */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "260px",
            }}
          >
            {/* Progress bar */}
            <div className="loading-bar-track" style={{ width: "100%" }}>
              <div
                className="loading-bar-fill"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            {/* Stage + percentage */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}>
              <motion.span
                key={stageIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: "rgba(56,189,248,0.45)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {LOADING_STAGES[stageIndex]}
              </motion.span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "rgba(56,189,248,0.35)",
                letterSpacing: "0.1em",
              }}>
                {Math.round(displayProgress)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
