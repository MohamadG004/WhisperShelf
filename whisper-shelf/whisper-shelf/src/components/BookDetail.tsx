// ============================================================
// WhisperShelf — BookDetail Component
// The detail panel/card that appears when a book is clicked.
// Slides in from the right with a frosted glass aesthetic.
// Shows title, author, description, rating, tags, and metadata.
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, BookOpen, Calendar, Hash } from "lucide-react";
import { BookDetailProps } from "../types";
import { getStatusConfig } from "../utils/helpers";

/** Panel slide-in animation variants */
const panelVariants = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.97,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    scale: 0.96,
    filter: "blur(6px)",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

/** Stagger container for content items */
const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Renders filled and empty star icons */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            size={13}
            style={{
              fill: filled
                ? "#e8a83a"
                : half
                ? "url(#halfStar)"
                : "transparent",
              stroke: filled || half ? "#e8a83a" : "#555",
              opacity: filled || half ? 1 : 0.5,
            }}
          />
        );
      })}
      <span
        className="ml-1.5 text-sm font-crimson"
        style={{ color: "#c49a4a" }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function BookDetail({ book, onClose }: BookDetailProps) {
  const statusConfig = getStatusConfig(book.status);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-0 top-0 bottom-0 z-50 flex items-stretch"
        style={{ width: "min(440px, 90vw)" }}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* ── Backdrop blur panel ── */}
        <div
          className="w-full flex flex-col overflow-hidden"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(12, 24, 14, 0.97) 0%,
                rgba(8, 18, 10, 0.98) 100%
              )
            `,
            borderLeft: `1px solid rgba(255,255,255,0.06)`,
            boxShadow: `-20px 0 60px rgba(0,0,0,0.7), -4px 0 12px rgba(0,0,0,0.5)`,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* ── Top color band ── */}
          <div
            className="flex-shrink-0"
            style={{
              height: "4px",
              background: `linear-gradient(to right, ${book.color}, ${book.accentColor}, ${book.color})`,
              opacity: 0.8,
            }}
          />

          {/* ── Header with close button ── */}
          <div className="flex items-start justify-between p-6 pb-4 flex-shrink-0">
            <motion.div variants={itemVariant} className="flex-1 min-w-0 mr-4">
              {/* Category badge */}
              <span
                className="inline-block text-xs font-crimson uppercase tracking-widest mb-2 px-2 py-0.5 rounded-sm"
                style={{
                  color: book.accentColor,
                  background: `${book.color}30`,
                  border: `1px solid ${book.color}50`,
                  letterSpacing: "0.15em",
                }}
              >
                {book.category}
              </span>
            </motion.div>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-full transition-colors"
              style={{
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.04)",
              }}
              whileHover={{
                color: "rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.08)",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              title="Close (Esc)"
            >
              <X size={18} />
            </motion.button>
          </div>

          {/* ── Scrollable content ── */}
          <motion.div
            className="flex-1 overflow-y-auto px-6 pb-8"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#2a3d2a transparent" }}
          >
            {/* Title */}
            <motion.h1
              className="font-playfair text-2xl leading-tight mb-1"
              style={{
                color: "rgba(240,225,195,0.97)",
                fontWeight: 600,
                textShadow: `0 0 40px ${book.accentColor}30`,
                fontStyle: "italic",
              }}
              variants={itemVariant}
            >
              {book.title}
            </motion.h1>

            {/* Author */}
            <motion.p
              className="font-crimson text-base mb-4"
              style={{ color: "rgba(160,180,160,0.8)" }}
              variants={itemVariant}
            >
              by{" "}
              <span style={{ color: "rgba(190,210,185,0.95)" }}>
                {book.author}
              </span>
            </motion.p>

            {/* Rating + Status row */}
            <motion.div
              className="flex items-center gap-4 mb-5"
              variants={itemVariant}
            >
              <StarRating rating={book.rating} />
              <span
                className="text-xs font-crimson px-2 py-0.5 rounded-sm"
                style={{
                  color: statusConfig.color,
                  background: `${statusConfig.color}18`,
                  border: `1px solid ${statusConfig.color}35`,
                }}
              >
                {statusConfig.label}
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="mb-5"
              variants={itemVariant}
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
              }}
            />

            {/* Description */}
            <motion.p
              className="font-crimson text-base leading-relaxed mb-6"
              style={{ color: "rgba(195,215,195,0.8)", lineHeight: 1.75 }}
              variants={itemVariant}
            >
              {book.description}
            </motion.p>

            {/* Metadata row */}
            <motion.div
              className="flex flex-wrap gap-4 mb-5"
              variants={itemVariant}
            >
              {/* Year */}
              <div className="flex items-center gap-1.5">
                <Calendar size={13} style={{ color: "rgba(150,180,150,0.6)" }} />
                <span
                  className="font-crimson text-sm"
                  style={{ color: "rgba(150,180,150,0.7)" }}
                >
                  {book.year}
                </span>
              </div>

              {/* Pages */}
              {book.pages && (
                <div className="flex items-center gap-1.5">
                  <BookOpen
                    size={13}
                    style={{ color: "rgba(150,180,150,0.6)" }}
                  />
                  <span
                    className="font-crimson text-sm"
                    style={{ color: "rgba(150,180,150,0.7)" }}
                  >
                    {book.pages} pages
                  </span>
                </div>
              )}
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={itemVariant}
            >
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-crimson px-2.5 py-1 rounded-sm"
                  style={{
                    color: "rgba(150,200,160,0.75)",
                    background: "rgba(40, 80, 45, 0.25)",
                    border: "1px solid rgba(60,110,65,0.3)",
                    letterSpacing: "0.02em",
                  }}
                >
                  <Hash size={10} style={{ opacity: 0.6 }} />
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Bottom decorative glow ── */}
          <div
            className="flex-shrink-0 pointer-events-none"
            style={{
              height: "80px",
              background: `
                linear-gradient(to top, ${book.color}15 0%, transparent 100%)
              `,
              borderTop: "1px solid rgba(255,255,255,0.03)",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
