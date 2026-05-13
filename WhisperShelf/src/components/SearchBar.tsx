// ============================================================
// Cozy Shelf — SearchBar Component (kept for compatibility)
// ============================================================

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  shouldFocus?: boolean;
  onFocused?: () => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="🔍 Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 12,
        fontWeight: 700,
        background: "rgba(92,48,20,0.6)",
        border: "2px solid var(--wood-mid)",
        borderRadius: 8,
        padding: "5px 10px",
        color: "var(--cream)",
        outline: "none",
        width: 160,
      }}
    />
  );
}