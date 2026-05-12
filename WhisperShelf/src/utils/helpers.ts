// ============================================================
// WhisperShelf — Utility Helpers
// ============================================================

import { Book, BookCategory } from "../types";

/**
 * Filters books by category and search query.
 * Returns books that match both criteria.
 */
export function filterBooks(
  books: Book[],
  category: BookCategory,
  query: string
): Book[] {
  let filtered = books;

  // Filter by category
  if (category !== "All") {
    filtered = filtered.filter((book) => book.category === category);
  }

  // Filter by search query (title, author, or tags)
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        book.category.toLowerCase().includes(q)
    );
  }

  return filtered;
}

/**
 * Renders a star rating as a string like "★★★★☆"
 */
export function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

/**
 * Returns a status badge config based on reading status.
 */
export function getStatusConfig(
  status: Book["status"]
): { label: string; color: string } {
  switch (status) {
    case "loved":
      return { label: "♥ Loved", color: "#e85a5a" };
    case "read":
      return { label: "✓ Read", color: "#5aaa7a" };
    case "reading":
      return { label: "◉ Reading", color: "#e8a83a" };
    case "unread":
    default:
      return { label: "○ Unread", color: "#888" };
  }
}

/**
 * Clamps a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a seeded pseudo-random number between 0 and 1.
 * Useful for stable random values based on a book's id.
 */
export function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash % 1000) / 1000;
}

/**
 * Distributes an array into N roughly equal buckets.
 */
export function distributeIntoRows<T>(items: T[], numRows: number): T[][] {
  const rows: T[][] = Array.from({ length: numRows }, () => []);
  items.forEach((item, i) => {
    rows[i % numRows].push(item);
  });
  return rows;
}
