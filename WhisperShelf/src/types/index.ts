// ============================================================
// Cozy Shelf — Type Definitions
// ============================================================

/** Represents a single book in the shop or shelf */
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  rating: number;
  tags: string[];
  /** Book cover primary color */
  color: string;
  /** Book accent / text color */
  accentColor: string;
  /** Spine width (used for shelf view) */
  thickness: number;
  /** Book height */
  height: number;
  year: number;
  pages?: number;
  /** Shop buy price in gold coins */
  price: number;
  /** Simple emoji icon for the cover */
  coverEmoji: string;
  /** Cover pattern type */
  coverPattern: "dots" | "stripes" | "diamonds" | "waves" | "stars" | "grid";
}

/** Available book categories */
export type BookCategory =
  | "All"
  | "Fiction"
  | "Fantasy"
  | "Mystery"
  | "Science"
  | "Philosophy"
  | "Poetry"
  | "History"
  | "Nature";

/** The player's game state */
export interface GameState {
  coins: number;
  ownedBookIds: Set<string>;
  /** Books the player is offering for sale */
  forSaleBookIds: Set<string>;
  /** Wishlist */
  wishlistIds: Set<string>;
}

/** Props passed to individual Book components */
export interface BookProps {
  book: Book;
  isSelected: boolean;
  onClick: (book: Book) => void;
  mode: "shop" | "myshelf";
  isOwned: boolean;
}

/** Props for the BookDetail panel */
export interface BookDetailProps {
  book: Book;
  onClose: () => void;
  mode: "shop" | "myshelf";
  isOwned: boolean;
  canAfford: boolean;
  onBuy: (book: Book) => void;
  onSell: (book: Book) => void;
  isWishlisted: boolean;
  onWishlist: (book: Book) => void;
}

/** A falling leaf particle */
export interface Leaf {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  shape: "maple" | "round" | "oval";
}