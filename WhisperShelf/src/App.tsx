// ============================================================
// Cozy Shelf — App Root Component
// ============================================================

import { AmbientEffects } from "./components/AmbientEffects";
import { Bookshelf } from "./components/Bookshelf";

export default function App() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Layer A: Atmospheric background effects (falling leaves, glow) */}
      <AmbientEffects />

      {/* ── Layer B: Main application UI */}
      <div className="absolute inset-0 overflow-hidden">
        <Bookshelf />
      </div>
    </div>
  );
}