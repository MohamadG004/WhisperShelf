// ============================================================
// Cozy Shelf — AmbientEffects Component
// Falling autumn leaves and warm background glow
// ============================================================

import { useMemo } from "react";
import { Leaf } from "../types";

const LEAF_COLORS = [
  "#E8920A", // amber
  "#D4600A", // burnt orange
  "#C42B2B", // red
  "#E8C040", // yellow
  "#F0A030", // warm orange
  "#A85020", // brown
];

const LEAF_COUNT = 18;

function LeafSVG({ color, shape }: { color: string; shape: Leaf["shape"] }) {
  if (shape === "maple") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 2 L11 6 L15 5 L13 8 L17 9 L13 10 L15 13 L11 12 L9 16 L7 12 L3 13 L5 10 L1 9 L5 8 L3 5 L7 6 Z"
          fill={color}
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="1"
        />
      </svg>
    );
  }
  if (shape === "round") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <ellipse cx="8" cy="8" rx="7" ry="6" fill={color} stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
        <line x1="8" y1="2" x2="8" y2="14" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      </svg>
    );
  }
  // oval
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
      <ellipse cx="7" cy="10" rx="5" ry="9" fill={color} stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <line x1="7" y1="1" x2="7" y2="19" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
    </svg>
  );
}

export function AmbientEffects() {
  const leaves = useMemo<Leaf[]>(() => {
    const shapes: Leaf["shape"][] = ["maple", "round", "oval"];
    return Array.from({ length: LEAF_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 0.7 + Math.random() * 0.8,
      delay: Math.random() * 12,
      duration: 7 + Math.random() * 8,
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Warm ambient glow — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "radial-gradient(ellipse at 50% 100%, rgba(180,80,10,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Warm glow — top right corner (lantern-like) */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -40,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,196,24,0.12) 0%, transparent 70%)",
          animation: "glowPulse 4s ease-in-out infinite",
        }}
      />

      {/* Warm glow — top left */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -40,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,146,10,0.10) 0%, transparent 70%)",
          animation: "glowPulse 5s ease-in-out infinite 1s",
        }}
      />

      {/* Falling leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          style={{
            position: "absolute",
            top: -30,
            left: `${leaf.x}%`,
            transform: `scale(${leaf.size})`,
            animation: `leafFall ${leaf.duration}s ease-in ${leaf.delay}s infinite`,
            opacity: 0,
          }}
        >
          <LeafSVG color={leaf.color} shape={leaf.shape} />
        </div>
      ))}

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}