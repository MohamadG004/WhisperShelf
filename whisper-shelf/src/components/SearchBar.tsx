// ============================================================
// WhisperShelf — SearchBar Component
// A styled search input with focus effects and clear button.
// Press "/" to focus from anywhere in the app.
// ============================================================

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  /** Whether the input should be focused programmatically */
  shouldFocus: boolean;
  onFocused: () => void;
}

export function SearchBar({
  value,
  onChange,
  shouldFocus,
  onFocused,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when requested by keyboard shortcut
  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
      onFocused();
    }
  }, [shouldFocus, onFocused]);

  return (
    <motion.div
      className="relative flex items-center"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Search icon */}
      <Search
        size={14}
        className="absolute left-3 pointer-events-none z-10"
        style={{ color: "rgba(160,200,160,0.45)" }}
      />

      {/* Input field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your library…"
        className="font-crimson text-sm outline-none transition-all duration-300"
        style={{
          width: "220px",
          paddingLeft: "30px",
          paddingRight: value ? "28px" : "12px",
          paddingTop: "6px",
          paddingBottom: "6px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "4px",
          color: "rgba(210,230,210,0.9)",
          caretColor: "rgba(200,160,80,0.8)",
        }}
        onFocus={(e) => {
          (e.target as HTMLInputElement).style.borderColor =
            "rgba(160,200,80,0.25)";
          (e.target as HTMLInputElement).style.background =
            "rgba(255,255,255,0.06)";
          (e.target as HTMLInputElement).style.boxShadow =
            "0 0 0 2px rgba(100,160,80,0.08)";
        }}
        onBlur={(e) => {
          (e.target as HTMLInputElement).style.borderColor =
            "rgba(255,255,255,0.07)";
          (e.target as HTMLInputElement).style.background =
            "rgba(255,255,255,0.04)";
          (e.target as HTMLInputElement).style.boxShadow = "none";
        }}
      />

      {/* Clear button */}
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute right-2 flex items-center justify-center"
          style={{
            color: "rgba(160,200,160,0.4)",
            width: "16px",
            height: "16px",
          }}
          onClick={() => onChange("")}
          whileHover={{ color: "rgba(200,230,200,0.8)", scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={12} />
        </motion.button>
      )}
    </motion.div>
  );
}
