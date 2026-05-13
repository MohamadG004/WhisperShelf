// ============================================================
// Cozy Shelf — Bookshelf Component
// Main game UI: shop, my shelf, exchange tabs + coin balance
// ============================================================

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shelf } from "./Shelf";
import { BookDetail } from "./BookDetail";
import { CategoryFilter } from "./CategoryFilter";
import { Book, BookCategory } from "../types";
import {
  BOOKS,
  CATEGORIES,
  STARTING_COINS,
  STARTING_OWNED_IDS,
} from "../data/books";
import { filterBooks, distributeIntoRows, getSellPrice } from "../utils/helpers";
import { useKeyboard } from "../hooks/useKeyboard";

const SHELF_ROWS = 3;

type Tab = "shop" | "myshelf";

interface Toast {
  id: number;
  message: string;
  type: "buy" | "sell" | "wishlist" | "error";
}

export function Bookshelf() {
  // ── Game state ──────────────────────────────────────────────
  const [coins, setCoins] = useState(STARTING_COINS);
  const [ownedBookIds, setOwnedBookIds] = useState<Set<string>>(
    new Set(STARTING_OWNED_IDS)
  );
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  // ── UI state ─────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>("shop");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeCategory, setActiveCategory] = useState<BookCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [coinBounce, setCoinBounce] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const toastIdRef = useRef(0);

  // ── Derived data ──────────────────────────────────────────────
  const displayBooks = useMemo(() => {
    const source =
      activeTab === "myshelf"
        ? BOOKS.filter((b) => ownedBookIds.has(b.id))
        : BOOKS;
    return filterBooks(source, activeCategory, searchQuery);
  }, [activeTab, ownedBookIds, activeCategory, searchQuery]);

  const shelfRows = useMemo(
    () => distributeIntoRows(displayBooks, SHELF_ROWS),
    [displayBooks]
  );

  const categoryCounts = useMemo(() => {
    const source =
      activeTab === "myshelf"
        ? BOOKS.filter((b) => ownedBookIds.has(b.id))
        : BOOKS;
    const counts: Record<string, number> = { All: source.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All")
        counts[cat] = source.filter((b) => b.category === cat).length;
    });
    return counts;
  }, [activeTab, ownedBookIds]);

  // ── Toast helper ──────────────────────────────────────────────
  const showToast = useCallback(
    (message: string, type: Toast["type"]) => {
      const id = ++toastIdRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2600);
    },
    []
  );

  // ── Game actions ──────────────────────────────────────────────
  const handleBuy = useCallback(
    (book: Book) => {
      if (coins < book.price) {
        showToast("💸 Not enough coins!", "error");
        return;
      }
      setCoins((c) => c - book.price);
      setOwnedBookIds((s) => new Set([...s, book.id]));
      setWishlistIds((s) => {
        const next = new Set(s);
        next.delete(book.id);
        return next;
      });
      setCoinBounce(true);
      setTimeout(() => setCoinBounce(false), 500);
      showToast(`📚 Bought "${book.title}"!`, "buy");
      setSelectedBook(null);
    },
    [coins, showToast]
  );

  const handleSell = useCallback(
    (book: Book) => {
      const sellPrice = getSellPrice(book);
      setCoins((c) => c + sellPrice);
      setOwnedBookIds((s) => {
        const next = new Set(s);
        next.delete(book.id);
        return next;
      });
      setCoinBounce(true);
      setTimeout(() => setCoinBounce(false), 500);
      showToast(`💰 Sold "${book.title}" for 🪙 ${sellPrice}!`, "sell");
      setSelectedBook(null);
    },
    [showToast]
  );

  const handleWishlist = useCallback(
    (book: Book) => {
      setWishlistIds((s) => {
        const next = new Set(s);
        if (next.has(book.id)) {
          next.delete(book.id);
          showToast(`🔖 Removed from wishlist`, "wishlist");
        } else {
          next.add(book.id);
          showToast(`💜 Added to wishlist!`, "wishlist");
        }
        return next;
      });
    },
    [showToast]
  );

  // ── Handlers ─────────────────────────────────────────────────
  const handleBookClick = useCallback((book: Book) => {
    setSelectedBook((prev) => (prev?.id === book.id ? null : book));
  }, []);

  const handleCloseDetail = useCallback(() => setSelectedBook(null), []);

  const handleCategoryChange = useCallback((cat: BookCategory) => {
    setActiveCategory(cat);
    setSelectedBook(null);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setSelectedBook(null);
    setActiveCategory("All");
    setSearchQuery("");
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) handleCloseDetail();
    },
    [handleCloseDetail]
  );

  useKeyboard({
    onEscape: handleCloseDetail,
    onSlash: () => searchRef.current?.focus(),
    onToggleSound: () => {},
  });

  const toastColors: Record<Toast["type"], string> = {
    buy: "var(--green)",
    sell: "#C42B2B",
    wishlist: "#8B4A8B",
    error: "#C42B2B",
  };

  return (
    <div
      className="relative w-full h-full flex flex-col"
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ══════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════ */}
      <motion.header
        className="relative z-30 flex-shrink-0 px-5 pt-4 pb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(to bottom, rgba(30,13,5,0.98) 0%, rgba(44,26,14,0.92) 100%)",
          borderBottom: "3px solid var(--wood-dark)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: 26, lineHeight: 1 }}
            >
              📚
            </motion.div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  color: "var(--gold)",
                  textShadow: "2px 2px 0px var(--outline), 0 0 20px rgba(245,196,24,0.3)",
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                }}
              >
                Cozy Shelf
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: 11,
                  color: "rgba(200,160,100,0.7)",
                  marginTop: 1,
                }}
              >
                ～ book exchange ～
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <input
                ref={searchRef}
                type="text"
                placeholder="🔍 Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  background: "rgba(92,48,20,0.6)",
                  border: "2px solid var(--wood-mid)",
                  borderRadius: 8,
                  padding: "5px 10px",
                  color: "var(--cream)",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--wood-mid)")}
              />
            </div>
          </div>

          {/* Coin balance */}
          <motion.div
            className="flex-shrink-0"
            animate={coinBounce ? { scale: [1, 1.2, 0.9, 1.05, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                color: "var(--text-dark)",
                background: "var(--gold)",
                border: "3px solid var(--outline)",
                borderRadius: 10,
                padding: "4px 12px",
                boxShadow: "3px 3px 0px var(--outline)",
                whiteSpace: "nowrap",
              }}
            >
              🪙 {coins.toLocaleString()}
            </div>
          </motion.div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex items-center gap-2 mt-3">
          {(["shop", "myshelf"] as Tab[]).map((tab) => {
            const isActive = activeTab === tab;
            const label = tab === "shop" ? "🏪 Shop" : `📦 My Books (${ownedBookIds.size})`;
            return (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="cartoon-btn px-4 py-1.5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  color: isActive ? "var(--text-dark)" : "var(--cream)",
                  background: isActive ? "var(--amber)" : "rgba(92,48,20,0.7)",
                  border: "3px solid var(--outline)",
                  boxShadow: isActive ? "3px 3px 0px var(--outline)" : "2px 2px 0px rgba(0,0,0,0.4)",
                  borderRadius: 10,
                  position: "relative",
                  zIndex: isActive ? 2 : 1,
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                {label}
              </motion.button>
            );
          })}

          {/* Wishlist count badge */}
          {wishlistIds.size > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 11,
                color: "#fff",
                background: "#8B4A8B",
                border: "2px solid var(--outline)",
                borderRadius: 8,
                padding: "3px 8px",
                boxShadow: "2px 2px 0px var(--outline)",
              }}
            >
              💜 {wishlistIds.size} on wishlist
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════════════
          CATEGORY FILTER
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-30 flex-shrink-0 px-5 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        style={{
          background: "rgba(30,13,5,0.7)",
          borderBottom: "2px solid var(--wood-dark)",
        }}
      >
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          counts={categoryCounts}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          SHELF AREA
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative z-30 flex-1 flex flex-col justify-end px-3 pb-3 gap-2 overflow-y-auto"
        style={{ paddingTop: 8 }}
      >
        {/* Tab label */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-3 flex-shrink-0"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            color: "rgba(200,150,80,0.6)",
            marginBottom: 2,
          }}
        >
          {activeTab === "shop"
            ? `🏪 All Books for Sale — ${displayBooks.length} titles`
            : `📦 Your Collection — ${displayBooks.length} books`}
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {displayBooks.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center flex-1 py-16 gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div style={{ fontSize: 48 }}>
                {activeTab === "myshelf" ? "📭" : "🔍"}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  color: "rgba(200,150,80,0.6)",
                  textAlign: "center",
                }}
              >
                {activeTab === "myshelf"
                  ? "Your shelf is empty!\nHead to the Shop to find books."
                  : "No books match your search."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shelf rows */}
        {shelfRows.map((books, rowIndex) => (
          <Shelf
            key={rowIndex}
            books={books}
            selectedBookId={selectedBook?.id ?? null}
            onBookClick={handleBookClick}
            shelfIndex={rowIndex}
            mode={activeTab}
            ownedBookIds={ownedBookIds}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          BOTTOM STATUS BAR
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-30 flex-shrink-0 flex items-center justify-between px-5 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          background: "rgba(20,10,3,0.85)",
          borderTop: "3px solid var(--wood-dark)",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 10,
            color: "rgba(180,130,70,0.55)",
          }}
        >
          📚 {BOOKS.length} books in catalog &nbsp;·&nbsp; 🪙 Sell at 60% price
        </span>
        <div className="flex items-center gap-3">
          {[
            { key: "/", label: "search" },
            { key: "Esc", label: "close" },
          ].map(({ key, label }) => (
            <span
              key={key}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "rgba(180,130,70,0.45)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <kbd
                style={{
                  background: "rgba(92,48,20,0.6)",
                  border: "2px solid rgba(92,48,20,0.9)",
                  borderRadius: 4,
                  padding: "1px 5px",
                  fontSize: 9,
                  color: "rgba(220,170,90,0.6)",
                  fontFamily: "inherit",
                }}
              >
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          BOOK DETAIL PANEL
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedBook && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetail}
              style={{ background: "rgba(0,0,0,0.0)" }}
            />
            <BookDetail
              book={selectedBook}
              onClose={handleCloseDetail}
              mode={activeTab}
              isOwned={ownedBookIds.has(selectedBook.id)}
              canAfford={coins >= selectedBook.price}
              onBuy={handleBuy}
              onSell={handleSell}
              isWishlisted={wishlistIds.has(selectedBook.id)}
              onWishlist={handleWishlist}
            />
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          TOAST NOTIFICATIONS
      ══════════════════════════════════════════════════════ */}
      <div
        className="fixed bottom-16 left-1/2 flex flex-col gap-2 items-center pointer-events-none"
        style={{ transform: "translateX(-50%)", zIndex: 100 }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                color: "#fff",
                background: toastColors[toast.type],
                border: "3px solid var(--outline)",
                borderRadius: 12,
                padding: "7px 18px",
                boxShadow: "4px 4px 0px var(--outline)",
                whiteSpace: "nowrap",
              }}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}