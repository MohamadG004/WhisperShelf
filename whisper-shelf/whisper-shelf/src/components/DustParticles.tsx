// ============================================================
// WhisperShelf — DustParticles Component
// Renders slowly drifting dust motes using CSS animations.
// Each particle has a randomized position, size, and
// animation timing to create a natural, organic feel.
// ============================================================

import { useMemo } from "react";
import { DustParticle } from "../types";

/** How many dust motes to render */
const PARTICLE_COUNT = 35;

/**
 * Generates stable (seeded by index) dust particle data.
 */
function generateParticles(): DustParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    // Use the index to create a stable pseudo-random seed
    const seed = (i * 2654435761) >>> 0;
    const r = (n: number) => ((seed * (n + 1)) % 1000) / 1000;

    return {
      id: i,
      x: r(1) * 100,           // % from left
      y: r(2) * 100,           // % from top
      size: 1 + r(3) * 2.5,   // px radius
      opacity: 0.08 + r(4) * 0.25,
      speed: 15 + r(5) * 35,  // animation duration in seconds
      drift: -30 + r(6) * 60, // horizontal drift in px
    };
  });
}

export function DustParticles() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            background:
              "radial-gradient(circle, rgba(240,210,160,0.9) 0%, rgba(240,210,160,0) 70%)",
            animation: `dustFloat ${p.speed}s ease-in-out infinite`,
            animationDelay: `${-p.speed * p.x * 0.01}s`,
            "--dust-drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
