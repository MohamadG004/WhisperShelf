// ============================================================
// WhisperShelf — AmbientEffects Component
// Orchestrates all atmospheric background effects:
// - Animated forest/rain background layers
// - Rain canvas overlay
// - Floating dust particles
// - Fog/mist drifting layer
// - Warm candlelight vignette
// ============================================================

import { RainCanvas } from "./RainCanvas";
import { DustParticles } from "./DustParticles";

export function AmbientEffects() {
  return (
    <>
      {/* ── Layer 1: Deep forest background gradient ── */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(10, 40, 15, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(5, 25, 10, 0.95) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(15, 8, 2, 0.8) 0%, transparent 50%),
            linear-gradient(180deg, #04100a 0%, #071a0e 30%, #091a0c 60%, #0d1208 100%)
          `,
        }}
      />

      {/* ── Layer 2: Tree silhouettes (left & right edges) ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at -10% 30%, rgba(4, 14, 6, 0.95) 0%, transparent 35%),
            radial-gradient(ellipse at 110% 25%, rgba(4, 14, 6, 0.95) 0%, transparent 35%)
          `,
        }}
      />

      {/* ── Layer 3: Warm cabin window light (centre glow) ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 45%, rgba(90, 55, 10, 0.12) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Layer 4: Animated fog/mist strips ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.4 }}
      >
        {/* Low ground fog */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "25%",
            background:
              "linear-gradient(to top, rgba(20, 50, 25, 0.35) 0%, transparent 100%)",
            animation: "fogDrift 25s ease-in-out infinite",
          }}
        />
        {/* Mid-level wisps */}
        <div
          className="absolute"
          style={{
            top: "35%",
            left: "-10%",
            right: "-10%",
            height: "18%",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(15, 40, 18, 0.2) 0%, transparent 70%)",
            animation: "fogDrift 35s ease-in-out infinite reverse",
            animationDelay: "-12s",
          }}
        />
      </div>

      {/* ── Layer 5: Rain canvas (drawn in JS) ── */}
      <RainCanvas />

      {/* ── Layer 6: Floating dust motes ── */}
      <DustParticles />

      {/* ── Layer 7: Warm vignette overlay ── */}
      <div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4, 10, 4, 0.55) 100%)
          `,
        }}
      />

      {/* ── Layer 8: Top fade for depth ── */}
      <div
        className="fixed top-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: "120px",
          background:
            "linear-gradient(to bottom, rgba(3, 8, 4, 0.85) 0%, transparent 100%)",
        }}
      />

      {/* ── Layer 9: Bottom fade ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: "80px",
          background:
            "linear-gradient(to top, rgba(3, 8, 4, 0.9) 0%, transparent 100%)",
        }}
      />
    </>
  );
}
