// ============================================================
// WhisperShelf — useKeyboard Hook
// Manages global keyboard shortcuts for the application.
// ============================================================

import { useEffect } from "react";

interface KeyboardHandlers {
  /** Called when Escape is pressed */
  onEscape?: () => void;
  /** Called when "/" is pressed (focus search) */
  onSlash?: () => void;
  /** Called when "s" or "S" is pressed (toggle sound) */
  onToggleSound?: () => void;
}

/**
 * Registers global keyboard event listeners for application shortcuts.
 * Cleans up listeners on unmount or when handlers change.
 */
export function useKeyboard(handlers: KeyboardHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire shortcuts when typing in an input field
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      switch (e.key) {
        case "Escape":
          handlers.onEscape?.();
          break;

        case "/":
          // Only intercept "/" when not already in an input
          if (!isInput) {
            e.preventDefault();
            handlers.onSlash?.();
          }
          break;

        case "s":
        case "S":
          // Only fire when not typing in an input
          if (!isInput) {
            handlers.onToggleSound?.();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}
