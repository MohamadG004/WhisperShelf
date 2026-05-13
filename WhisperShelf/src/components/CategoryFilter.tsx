// ============================================================
// Cozy Shelf — CategoryFilter Component
// Cartoony horizontal filter tabs
// ============================================================

import { motion } from "framer-motion";
import { BookCategory } from "../types";
import { CATEGORIES, CATEGORY_ICONS } from "../data/books";

interface CategoryFilterProps {
  activeCategory: BookCategory;
  onChange: (category: BookCategory) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({ activeCategory, onChange, counts }: CategoryFilterProps) {
  return (
    <motion.div
      className="flex items-center gap-1.5 overflow-x-auto pb-1"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{ scrollbarWidth: "none" }}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        const count = counts[category] ?? 0;
        const icon = CATEGORY_ICONS[category] ?? "📚";

        return (
          <motion.button
            key={category}
            onClick={() => onChange(category)}
            className="relative flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg cartoon-btn-sm"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 11,
              color: isActive ? "var(--text-dark)" : "var(--cream)",
              background: isActive ? "var(--gold)" : "rgba(92,48,20,0.7)",
              border: "2px solid var(--outline)",
              boxShadow: isActive ? "2px 2px 0px var(--outline)" : "2px 2px 0px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
              transition: "none",
            }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95, y: 1 }}
          >
            <span style={{ fontSize: 12 }}>{icon}</span>
            {category}
            {count > 0 && category !== "All" && (
              <span
                style={{
                  fontSize: 9,
                  background: isActive ? "rgba(0,0,0,0.2)" : "rgba(245,196,24,0.25)",
                  color: isActive ? "var(--text-dark)" : "var(--gold)",
                  borderRadius: 4,
                  padding: "0 4px",
                  marginLeft: 1,
                  fontFamily: "var(--font-body)",
                  fontWeight: 800,
                }}
              >
                {count}
              </span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}