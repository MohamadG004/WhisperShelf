// ============================================================
// WhisperShelf — Shelf Component
// Renders a single wooden shelf plank with books resting on it.
// Includes realistic wood grain, cast shadows, and depth effects.
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { Book as BookComponent } from "./Book";
import { Book } from "../types";

interface ShelfProps {
  books: Book[];
  selectedBookId: string | null;
  onBookClick: (book: Book) => void;
  shelfIndex: number;
}

export function Shelf({ books, selectedBookId, onBookClick, shelfIndex }: ShelfProps) {
  return (
    <div className="relative flex flex-col">
      {/* ── Books sitting on the shelf ── */}
      <div
        className="relative flex items-end px-8 pb-0"
        style={{ minHeight: "270px" }}
      >
        {/* Subtle shelf back wall shadow */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "60%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)",
          }}
        />

        {/* Ambient warm light from above */}
        <div
          className="absolute top-0 inset-x-8 pointer-events-none"
          style={{
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(180, 140, 60, 0.04) 0%, transparent 100%)",
          }}
        />

        {/* Books row with stagger animation */}
        <motion.div
          className="flex items-end gap-px relative z-10 w-full flex-wrap"
          style={{ gap: "2px", paddingBottom: "0px" }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.04,
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
                className="flex items-center justify-center w-full py-8"
                style={{ color: "rgba(100,140,100,0.3)", minHeight: "200px" }}
              >
                <span className="font-fell italic text-sm">
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
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Wooden shelf plank ── */}
      <div className="relative flex-shrink-0" style={{ height: "22px" }}>
        {/* Main plank surface */}
        <div
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(
                to bottom,
                #5c3d1e 0%,
                #4a3018 40%,
                #3d2510 70%,
                #2e1c0c 100%
              )
            `,
            boxShadow: `
              0 4px 16px rgba(0,0,0,0.7),
              0 8px 32px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.08),
              inset 0 -1px 0 rgba(0,0,0,0.4)
            `,
          }}
        >
          {/* Wood grain lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 18px,
                  rgba(0,0,0,0.06) 18px,
                  rgba(0,0,0,0.06) 19px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 47px,
                  rgba(255,255,255,0.03) 47px,
                  rgba(255,255,255,0.03) 48px
                )
              `,
            }}
          />

          {/* Top highlight */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "2px",
              background:
                "linear-gradient(to right, transparent 0%, rgba(255,220,160,0.12) 20%, rgba(255,220,160,0.18) 50%, rgba(255,220,160,0.12) 80%, transparent 100%)",
            }}
          />
        </div>

        {/* Under-shelf shadow cast onto the wall */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "100%",
            height: "20px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
