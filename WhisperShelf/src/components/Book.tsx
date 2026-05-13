// ============================================================
// Cozy Shelf — Book Component
// Front-facing cartoon book card with price tag
// ============================================================

import { motion } from "framer-motion";
import { BookProps } from "../types";
import { getSellPrice } from "../utils/helpers";

const SPRING = { type: "spring", stiffness: 340, damping: 24 };

/** SVG pattern overlay for book cover */
function CoverPattern({
  pattern,
  color,
}: {
  pattern: string;
  color: string;
}) {
  const id = `pat-${pattern}-${color.replace("#", "")}`;
  switch (pattern) {
    case "dots":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id={id} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="2.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "stripes":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-15" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id={id} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="white" strokeWidth="3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "diamonds":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-18" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id={id} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <polygon points="7,1 13,7 7,13 1,7" fill="none" stroke="white" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "waves":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-15" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id={id} x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 5 Q5 0 10 5 Q15 10 20 5" fill="none" stroke="white" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "grid":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-12" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id={id} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M0 0 L16 0 M0 0 L0 16" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "stars":
    default:
      return (
        <svg className="absolute inset-0 w-full h-full opacity-18" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id={id} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <text x="5" y="13" fontSize="10" fill="white">★</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
  }
}

export function Book({ book, isSelected, onClick, mode, isOwned }: BookProps) {
  const sellPrice = getSellPrice(book);
  const displayPrice = mode === "myshelf" && isOwned ? sellPrice : book.price;
  const cardWidth = 90;
  const cardHeight = 130;

  return (
    <motion.div
      className="relative cursor-pointer select-none flex-shrink-0"
      style={{ width: cardWidth, height: cardHeight + 24 }}
      layout
      layoutId={`book-${book.id}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: isSelected ? -10 : 0,
        scale: isSelected ? 1.06 : 1,
      }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      transition={SPRING}
      whileHover={{
        y: -8,
        scale: 1.04,
        transition: { ...SPRING, duration: 0.15 },
      }}
      onClick={() => onClick(book)}
      title={`${book.title} — ${book.author}`}
    >
      {/* ── Book card body ── */}
      <div
        className="relative overflow-hidden"
        style={{
          width: cardWidth,
          height: cardHeight,
          background: `linear-gradient(145deg, ${book.color}ee 0%, ${book.color} 100%)`,
          border: `3px solid var(--outline)`,
          borderRadius: "8px",
          boxShadow: isSelected
            ? `3px 3px 0px var(--outline), 0 0 0 3px var(--gold), 0 0 20px rgba(245,196,24,0.4)`
            : `4px 4px 0px var(--outline)`,
        }}
      >
        {/* Pattern overlay */}
        <CoverPattern pattern={book.coverPattern} color={book.color} />

        {/* Top band */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 22,
            background: `rgba(0,0,0,0.25)`,
            borderBottom: `2px solid rgba(0,0,0,0.3)`,
          }}
        />

        {/* Big emoji icon */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 30,
            lineHeight: 1,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
        >
          {book.coverEmoji}
        </div>

        {/* Title area */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "4px 5px 5px",
            background: `rgba(0,0,0,0.45)`,
            borderTop: `2px solid rgba(0,0,0,0.3)`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 9,
              color: book.accentColor,
              lineHeight: 1.2,
              textAlign: "center",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {book.title}
          </p>
        </div>

        {/* Owned badge */}
        {isOwned && mode === "shop" && (
          <div
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              background: "var(--green)",
              border: "2px solid var(--outline)",
              borderRadius: 4,
              padding: "1px 4px",
              fontSize: 7,
              fontFamily: "var(--font-display)",
              color: "#fff",
              boxShadow: "1px 1px 0px var(--outline)",
            }}
          >
            OWNED
          </div>
        )}

        {/* Selected glow */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 50% 30%, rgba(245,196,24,0.2) 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* ── Price tag below card ── */}
      <div
        style={{
          marginTop: 4,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            color: mode === "myshelf" && isOwned ? "#e05050" : "var(--gold)",
            textShadow: "0 1px 3px rgba(0,0,0,0.9)",
            background: "rgba(0,0,0,0.5)",
            border: `2px solid ${mode === "myshelf" && isOwned ? "#e05050" : "var(--gold)"}`,
            borderRadius: 5,
            padding: "1px 5px",
            display: "inline-block",
          }}
        >
          {mode === "myshelf" && isOwned ? `↩ ${sellPrice}` : `🪙 ${displayPrice}`}
        </span>
      </div>
    </motion.div>
  );
}