// ============================================================
// WhisperShelf — Book Component
// Renders a single book spine on the shelf.
// Handles hover (tilt + lift) and click (pull-forward) animations.
// Book spine includes title text rotated vertically.
// ============================================================

import { motion } from "framer-motion";
import { BookProps } from "../types";

/** Easing for book interactions */
const SPRING = { type: "spring", stiffness: 380, damping: 28 };

export function Book({ book, isSelected, onClick }: BookProps) {
  return (
    <motion.div
      className="relative cursor-pointer flex-shrink-0 select-none"
      style={{ width: book.thickness, height: book.height }}
      // Layout animation when books reflow after filter
      layout
      layoutId={`book-${book.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: isSelected ? -22 : 0,
        scale: isSelected ? 1.06 : 1,
        rotateY: isSelected ? -5 : 0,
        filter: isSelected
          ? "drop-shadow(0 20px 30px rgba(0,0,0,0.8)) brightness(1.15)"
          : "drop-shadow(2px 4px 8px rgba(0,0,0,0.6))",
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={SPRING}
      whileHover={{
        y: -14,
        scale: 1.04,
        rotateY: -4,
        filter:
          "drop-shadow(4px 12px 20px rgba(0,0,0,0.75)) brightness(1.1)",
        transition: { ...SPRING, duration: 0.2 },
      }}
      onClick={() => onClick(book)}
      title={`${book.title} — ${book.author}`}
    >
      {/* ── Book spine body ── */}
      <div
        className="w-full h-full relative overflow-hidden"
        style={{
          background: `linear-gradient(
            to right,
            rgba(0,0,0,0.5) 0%,
            ${book.color} 8%,
            ${book.color} 88%,
            rgba(0,0,0,0.4) 100%
          )`,
          borderRadius: "2px 3px 3px 2px",
          boxShadow: `
            inset 1px 0 2px rgba(255,255,255,0.08),
            inset -1px 0 3px rgba(0,0,0,0.5),
            2px 0 6px rgba(0,0,0,0.4)
          `,
        }}
      >
        {/* ── Spine highlight (left edge glint) ── */}
        <div
          className="absolute inset-y-0 left-0 w-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, transparent 100%)",
          }}
        />

        {/* ── Fabric / grain texture overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 3px,
                rgba(0,0,0,0.04) 3px,
                rgba(0,0,0,0.04) 4px
              )
            `,
            mixBlendMode: "multiply",
          }}
        />

        {/* ── Top decorative band ── */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "12px",
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)`,
            borderBottom: `1px solid rgba(255,255,255,0.06)`,
          }}
        />

        {/* ── Bottom decorative band ── */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "12px",
            background: `linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)`,
            borderTop: `1px solid rgba(255,255,255,0.04)`,
          }}
        />

        {/* ── Vertical title text ── */}
        {book.thickness >= 24 && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            <span
              className="font-playfair text-center leading-tight"
              style={{
                color: book.accentColor,
                fontSize:
                  book.thickness >= 36
                    ? "11px"
                    : book.thickness >= 28
                    ? "9px"
                    : "8px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textShadow: `0 1px 3px rgba(0,0,0,0.7)`,
                maxHeight: `${book.height - 30}px`,
                overflow: "hidden",
                opacity: 0.9,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                paddingBottom: "4px",
                paddingTop: "4px",
              }}
            >
              {book.title}
            </span>
          </div>
        )}

        {/* ── Selected glow overlay ── */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(ellipse at 50% 30%, rgba(255,200,100,0.12) 0%, transparent 70%)`,
              boxShadow: `inset 0 0 12px rgba(255,200,100,0.08)`,
            }}
          />
        )}
      </div>

      {/* ── Top of book (pages edge) ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "4px",
          background:
            "linear-gradient(to bottom, rgba(240,230,210,0.5) 0%, rgba(200,185,160,0.2) 100%)",
          borderRadius: "1px 2px 0 0",
          transform: "perspective(60px) rotateX(30deg) translateY(-3px)",
          transformOrigin: "bottom center",
        }}
      />
    </motion.div>
  );
}
