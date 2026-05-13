// ============================================================
// Cozy Shelf — AudioToggle Component (kept for compatibility)
// ============================================================

interface AudioToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AudioToggle({ enabled, onToggle }: AudioToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="cartoon-btn-sm"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: 16,
        background: "rgba(92,48,20,0.7)",
        color: "var(--cream)",
        padding: "4px 8px",
        border: "2px solid var(--wood-mid)",
        borderRadius: 8,
      }}
      title={enabled ? "Mute" : "Unmute"}
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
}