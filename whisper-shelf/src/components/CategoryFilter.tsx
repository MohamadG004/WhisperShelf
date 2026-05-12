// ============================================================
// WhisperShelf — CategoryFilter Component
// Horizontal scrollable tab bar for filtering books by category.
// Active tab has an underline/glow indicator.
// ============================================================

import { motion } from "framer-motion";
import { BookCategory } from "../types";
import { CATEGORIES } from "../data/books";

interface CategoryFilterProps {
  activeCategory: BookCategory;
  onChange: (category: BookCategory) => void;
  /** Count of books in each category (for showing totals) */
  counts: Record<string, number>;
}

export function CategoryFilter({
  activeCategory,
  onChange,
  counts,
}: CategoryFilterProps) {
  return (
    <motion.div
      className="flex items-center gap-1 overflow-x-auto"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      style={{ scrollbarWidth: "none" }}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        const count = counts[category] ?? 0;

        return (
          <motion.button
            key={category}
            onClick={() => onChange(category)}
            className="relative flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-crimson text-sm transition-colors"
            style={{
              color: isActive
                ? "rgba(210,225,180,0.95)"
                : "rgba(140,170,140,0.6)",
              background: isActive
                ? "rgba(80,120,50,0.15)"
                : "transparent",
              border: isActive
                ? "1px solid rgba(100,150,70,0.2)"
                : "1px solid transparent",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
            whileHover={{
              color: "rgba(200,220,175,0.85)",
              background: "rgba(80,120,50,0.1)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {category}

            {/* Count badge */}
            {count > 0 && category !== "All" && (
              <span
                className="text-xs rounded-full px-1.5 py-0 min-w-[18px] text-center"
                style={{
                  color: isActive
                    ? "rgba(200,220,140,0.8)"
                    : "rgba(120,150,100,0.5)",
                  background: isActive
                    ? "rgba(100,150,60,0.2)"
                    : "rgba(100,140,80,0.1)",
                  fontSize: "10px",
                }}
              >
                {count}
              </span>
            )}

            {/* Active indicator line */}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-2 right-2"
                layoutId="categoryIndicator"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, rgba(160,200,80,0.6), transparent)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
