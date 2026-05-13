// ============================================================
// Cozy Shelf — Shelf Component
// A cartoony wooden shelf plank with books on it
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { Book as BookComponent } from "./Book";
import { Book } from "../types";

interface ShelfProps {
  books: Book[];
  selectedBookId: string | null;
  onBookClick: (book: Book) => void;
  shelfIndex: number;
  mode: "shop" | "myshelf";
  ownedBookIds: Set<string>;
}

export function Shelf({
  books,
  selectedBookId,
  onBookClick,
  shelfIndex,
  mode,
  ownedBookIds,
}: ShelfProps) {
  return (
    <div className="relative flex flex-col">
      {/* ── Books sitting on the shelf ── */}
      <div
        className="relative flex items-end px-6 pb-0"
        style={{ minHeight: "175px" }}
      >
        {/* Books row */}
        <motion.div
          className="flex items-end gap-2 relative z-10 w-full flex-wrap"
          style={{ paddingBottom: "0px" }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: shelfIndex * 0.1,
              },
            },
            hidden: {},
          }}
        >
          <AnimatePresence mode="popLayout">
            {books.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center w-full py-6"
                style={{ minHeight: "160px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(180,130,80,0.45)",
                    fontSize: 13,
                  }}
                >
                  — no books here —
                </span>
              </motion.div>
            ) : (
              books.map((book) => (
                <BookComponent
                  key={book.id}
                  book={book}
                  isSelected={selectedBookId === book.id}
                  onClick={onBookClick}
                  mode={mode}
                  isOwned={ownedBookIds.has(book.id)}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Cartoon wooden shelf plank ── */}
      <div className="relative flex-shrink-0" style={{ height: 20 }}>
        {/* Main plank */}
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(to bottom, var(--wood-top) 0%, var(--wood-light) 30%, var(--wood-mid) 70%, var(--wood-dark) 100%)`,
            border: "3px solid var(--outline)",
            borderRadius: "0 0 6px 6px",
            boxShadow: "0 6px 0px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3)",
          }}
        >
          {/* Wood grain lines */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-md"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent 0px, transparent 22px,
                rgba(0,0,0,0.08) 22px, rgba(0,0,0,0.08) 23px
              )`,
            }}
          />
          {/* Top highlight */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "3px",
              background: "rgba(255,220,140,0.35)",
            }}
          />
        </div>

        {/* Under-shelf shadow */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "100%",
            height: "14px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}