// ============================================================
// Cozy Shelf — Utility Helpers
// ============================================================

import { Book, BookCategory } from "../types";
import { SELL_RATIO } from "../data/books";

export function filterBooks(books: Book[], category: BookCategory, query: string): Book[] {
  let filtered = books;
  if (category !== "All") {
    filtered = filtered.filter((b) => b.category === category);
  }
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q)
    );
  }
  return filtered;
}

export function getSellPrice(book: Book): number {
  return Math.floor(book.price * SELL_RATIO);
}

export function formatCoins(amount: number): string {
  return `🪙 ${amount.toLocaleString()}`;
}

export function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

export function distributeIntoRows<T>(items: T[], numRows: number): T[][] {
  const rows: T[][] = Array.from({ length: numRows }, () => []);
  items.forEach((item, i) => rows[i % numRows].push(item));
  return rows;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash % 1000) / 1000;
}

/** Returns a pastel variant of a color for UI use */
export function getStatusConfig(status?: string): { label: string; color: string } {
  switch (status) {
    case "loved":   return { label: "♥ Loved",   color: "#e85a5a" };
    case "read":    return { label: "✓ Read",     color: "#5aaa7a" };
    case "reading": return { label: "◉ Reading",  color: "#e8a83a" };
    default:        return { label: "○ Unread",   color: "#888" };
  }
}