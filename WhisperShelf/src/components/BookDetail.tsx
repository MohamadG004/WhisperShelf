// ============================================================
// Cozy Shelf — BookDetail Component
// Cartoon-style slide-in panel with buy/sell/wishlist actions
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, BookOpen, Calendar } from "lucide-react";
import { BookDetailProps } from "../types";
import { getSellPrice } from "../utils/helpers";

const panelVariants = {
  hidden:  { opacity: 0, x: 80, scale: 0.95 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 28, mass: 0.9 },
  },
  exit: {
    opacity: 0, x: 60, scale: 0.94,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const itemVariant = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          style={{
            fill: i < Math.floor(rating) ? "#F5C418" : "transparent",
            stroke: i < Math.floor(rating) ? "#C8A010" : "#888",
            opacity: i < Math.floor(rating) ? 1 : 0.4,
          }}
        />
      ))}
      <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--gold)", marginLeft: 4 }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function BookDetail({
  book,
  onClose,
  mode,
  isOwned,
  canAfford,
  onBuy,
  onSell,
  isWishlisted,
  onWishlist,
}: BookDetailProps) {
  const sellPrice = getSellPrice(book);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-0 top-0 bottom-0 z-50 flex items-stretch"
        style={{ width: "min(420px, 88vw)" }}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div
          className="w-full flex flex-col overflow-hidden"
          style={{
            background: "var(--panel-bg)",
            borderLeft: "4px solid var(--outline)",
            boxShadow: "-8px 0 40px rgba(0,0,0,0.7)",
          }}
        >
          {/* ── Top color band from book ── */}
          <div style={{ height: 6, background: `linear-gradient(to right, ${book.color}, ${book.accentColor}, ${book.color})` }} />

          {/* ── Header ── */}
          <div className="flex items-start justify-between p-5 pb-3 flex-shrink-0">
            <motion.div variants={itemVariant} className="flex-1 min-w-0 mr-3">
              {/* Category badge */}
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-display)",
                  fontSize: 10,
                  color: "var(--text-dark)",
                  background: "var(--gold)",
                  border: "2px solid var(--outline)",
                  borderRadius: 6,
                  padding: "1px 8px",
                  marginBottom: 6,
                  boxShadow: "2px 2px 0px var(--outline)",
                  letterSpacing: "0.05em",
                }}
              >
                {book.category}
              </span>
            </motion.div>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="flex-shrink-0 cartoon-btn-sm"
              style={{
                padding: "4px 8px",
                background: "rgba(196,43,43,0.85)",
                color: "#fff",
                fontSize: 11,
                fontFamily: "var(--font-display)",
              }}
              whileTap={{ scale: 0.93 }}
              title="Close (Esc)"
            >
              <X size={14} />
            </motion.button>
          </div>

          {/* ── Scrollable content ── */}
          <div
            className="flex-1 overflow-y-auto px-5 pb-5"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Book cover preview */}
            <motion.div variants={itemVariant} className="flex justify-center mb-4">
              <div
                style={{
                  width: 90,
                  height: 130,
                  background: `linear-gradient(145deg, ${book.color}ee, ${book.color})`,
                  border: "3px solid var(--outline)",
                  borderRadius: 10,
                  boxShadow: "5px 5px 0px var(--outline)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
                }}
              >
                {book.coverEmoji}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariant}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                color: "var(--cream)",
                textAlign: "center",
                marginBottom: 4,
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {book.title}
            </motion.h1>

            {/* Author */}
            <motion.p
              variants={itemVariant}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(220,180,120,0.85)",
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              by <span style={{ color: "var(--cream)", fontWeight: 700 }}>{book.author}</span>
            </motion.p>

            {/* Rating */}
            <motion.div variants={itemVariant} className="flex justify-center mb-4">
              <StarRating rating={book.rating} />
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariant}
              style={{
                height: 3,
                borderRadius: 2,
                background: `linear-gradient(to right, transparent, ${book.accentColor}60, transparent)`,
                marginBottom: 12,
              }}
            />

            {/* Description */}
            <motion.p
              variants={itemVariant}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(220,200,165,0.85)",
                lineHeight: 1.65,
                marginBottom: 14,
              }}
            >
              {book.description}
            </motion.p>

            {/* Metadata */}
            <motion.div variants={itemVariant} className="flex flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} style={{ color: "rgba(180,140,80,0.7)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(180,140,80,0.8)", fontWeight: 700 }}>
                  {book.year}
                </span>
              </div>
              {book.pages && (
                <div className="flex items-center gap-1.5">
                  <BookOpen size={12} style={{ color: "rgba(180,140,80,0.7)" }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(180,140,80,0.8)", fontWeight: 700 }}>
                    {book.pages} pages
                  </span>
                </div>
              )}
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariant} className="flex flex-wrap gap-1.5 mb-6">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--text-dark)",
                    background: "rgba(245,196,24,0.75)",
                    border: "2px solid var(--outline)",
                    borderRadius: 6,
                    padding: "1px 7px",
                    boxShadow: "1px 1px 0px var(--outline)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </motion.div>

            {/* ── Action buttons ── */}
            <motion.div variants={itemVariant} className="flex flex-col gap-2">
              {/* Price display */}
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  color: "var(--gold)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  marginBottom: 6,
                }}
              >
                {isOwned
                  ? `Sell for 🪙 ${sellPrice}`
                  : `Buy for 🪙 ${book.price}`}
              </div>

              {/* Primary action */}
              {!isOwned ? (
                <motion.button
                  onClick={() => onBuy(book)}
                  disabled={!canAfford}
                  className="cartoon-btn w-full py-2.5"
                  style={{
                    background: canAfford ? "var(--green)" : "rgba(80,60,40,0.6)",
                    color: canAfford ? "#fff" : "rgba(180,140,100,0.5)",
                    fontSize: 15,
                    fontFamily: "var(--font-display)",
                    cursor: canAfford ? "pointer" : "not-allowed",
                    opacity: canAfford ? 1 : 0.6,
                    textAlign: "center",
                  }}
                  whileTap={canAfford ? { scale: 0.96 } : {}}
                >
                  {canAfford ? "🛍️ Buy Now!" : "💸 Not enough coins!"}
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => onSell(book)}
                  className="cartoon-btn w-full py-2.5"
                  style={{
                    background: "#C42B2B",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "var(--font-display)",
                    textAlign: "center",
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  💰 Sell Book
                </motion.button>
              )}

              {/* Wishlist button */}
              {!isOwned && (
                <motion.button
                  onClick={() => onWishlist(book)}
                  className="cartoon-btn w-full py-2"
                  style={{
                    background: isWishlisted ? "#8B4A8B" : "rgba(92,48,20,0.8)",
                    color: "#fff",
                    fontSize: 13,
                    fontFamily: "var(--font-display)",
                    textAlign: "center",
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  {isWishlisted ? "💜 On Wishlist" : "🔖 Add to Wishlist"}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}