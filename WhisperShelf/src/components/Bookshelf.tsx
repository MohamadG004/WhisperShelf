// ============================================================
// WhisperShelf — Bookshelf Component
// The main content area: controls + multiple shelf rows.
// Handles filtering, search, and book selection state.
// Distributes filtered books evenly across 3 shelf rows.
// ============================================================

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shelf } from "./Shelf";
import { BookDetail } from "./BookDetail";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { AudioToggle } from "./AudioToggle";
import { Book, BookCategory } from "../types";
import { BOOKS, CATEGORIES } from "../data/books";
import { filterBooks, distributeIntoRows } from "../utils/helpers";
import { useAudio } from "../hooks/useAudio";
import { useKeyboard } from "../hooks/useKeyboard";
import { Library } from "lucide-react";

/** Number of shelf rows to display */
const SHELF_ROWS = 3;

export function Bookshelf() {
  // ── State ──────────────────────────────────────────────────
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeCategory, setActiveCategory] = useState<BookCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [focusSearch, setFocusSearch] = useState(false);
  const { enabled: audioEnabled, toggle: toggleAudio } = useAudio();

  const backdropRef = useRef<HTMLDivElement>(null);

  // ── Derived data ───────────────────────────────────────────

  /** Books after applying category filter and search */
  const filteredBooks = useMemo(
    () => filterBooks(BOOKS, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  /** Books distributed across shelf rows */
  const shelfRows = useMemo(
    () => distributeIntoRows(filteredBooks, SHELF_ROWS),
    [filteredBooks]
  );

  /** Category counts for filter tabs */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: BOOKS.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = BOOKS.filter((b) => b.category === cat).length;
      }
    });
    return counts;
  }, []);

  // ── Handlers ───────────────────────────────────────────────

  const handleBookClick = useCallback((book: Book) => {
    setSelectedBook((prev) => (prev?.id === book.id ? null : book));
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedBook(null);
  }, []);

  const handleCategoryChange = useCallback((cat: BookCategory) => {
    setActiveCategory(cat);
    setSelectedBook(null);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) {
        handleCloseDetail();
      }
    },
    [handleCloseDetail]
  );

  // ── Keyboard shortcuts ─────────────────────────────────────
  useKeyboard({
    onEscape: handleCloseDetail,
    onSlash: () => setFocusSearch(true),
    onToggleSound: toggleAudio,
  });

  return (
    <div className="relative w-full h-full flex flex-col" ref={backdropRef} onClick={handleBackdropClick}>

      {/* ══════════════════════════════════════════════════════
          HEADER BAR
      ══════════════════════════════════════════════════════ */}
      <motion.header
        className="relative z-30 flex-shrink-0 flex items-center justify-between px-8 pt-6 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo / wordmark */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Library size={20} style={{ color: "rgba(200,170,90,0.8)" }} />
          </motion.div>
          <div>
            <h1
              className="font-playfair text-xl"
              style={{
                color: "rgba(235,215,175,0.95)",
                letterSpacing: "0.12em",
                fontWeight: 500,
                textShadow: "0 0 30px rgba(200,160,60,0.3)",
              }}
            >
              WhisperShelf
            </h1>
            <p
              className="font-fell italic text-xs"
              style={{
                color: "rgba(140,170,120,0.55)",
                letterSpacing: "0.08em",
                marginTop: "-1px",
              }}
            >
              your quiet library
            </p>
          </div>
        </div>

        {/* Controls: search + audio */}
        <div className="flex items-center gap-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            shouldFocus={focusSearch}
            onFocused={() => setFocusSearch(false)}
          />
          <AudioToggle enabled={audioEnabled} onToggle={toggleAudio} />
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════════════
          CATEGORY FILTER
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-30 flex-shrink-0 px-8 pb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          counts={categoryCounts}
        />

        {/* Thin divider */}
        <div
          className="mt-3"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          BOOKSHELF AREA
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-30 flex-1 flex flex-col justify-end px-4 pb-4 gap-2 overflow-y-auto">

        {/* Empty state */}
        <AnimatePresence>
          {filteredBooks.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center flex-1 py-16"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p
                className="font-fell italic text-lg"
                style={{ color: "rgba(120,160,110,0.4)" }}
              >
                No books match your search.
              </p>
              <p
                className="font-crimson text-sm mt-2"
                style={{ color: "rgba(100,140,90,0.3)" }}
              >
                Try a different title, author, or category.
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
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          BOOK DETAIL PANEL
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedBook && (
          <>
            {/* Backdrop click-catcher */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetail}
              style={{ background: "rgba(0,0,0,0.0)" }}
            />
            <BookDetail book={selectedBook} onClose={handleCloseDetail} />
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          FOOTER / KEYBOARD HINT
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-30 flex-shrink-0 flex items-center justify-center pb-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {[
          { key: "/", label: "search" },
          { key: "S", label: "sound" },
          { key: "Esc", label: "close" },
        ].map(({ key, label }) => (
          <span
            key={key}
            className="flex items-center gap-1.5 font-crimson"
            style={{ color: "rgba(100,140,100,0.35)", fontSize: "11px" }}
          >
            <kbd
              className="px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "inherit",
                fontSize: "10px",
                color: "rgba(150,190,140,0.5)",
              }}
            >
              {key}
            </kbd>
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
