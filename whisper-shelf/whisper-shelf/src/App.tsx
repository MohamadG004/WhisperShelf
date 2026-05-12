// ============================================================
// WhisperShelf — App Root Component
// Assembles ambient effects layer + bookshelf UI layer.
// ============================================================

import { AmbientEffects } from "./components/AmbientEffects";
import { Bookshelf } from "./components/Bookshelf";

export default function App() {
  return (
    // Full-screen container; overflow hidden to clip rain/effects
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ background: "#040e07" }}
    >
      {/* ── Layer A: Atmospheric background effects ── */}
      <AmbientEffects />

      {/* ── Layer B: Main application UI ── */}
      <div className="absolute inset-0 overflow-hidden">
        <Bookshelf />
      </div>
    </div>
  );
}
