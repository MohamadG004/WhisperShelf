// ============================================================
// WhisperShelf — Type Definitions
// ============================================================

/** Represents a single book in the shelf */
export interface Book {
  /** Unique identifier */
  id: string;
  /** Full title of the book */
  title: string;
  /** Author name(s) */
  author: string;
  /** Short description / synopsis */
  description: string;
  /** Genre/category label */
  category: BookCategory;
  /** Rating out of 5 */
  rating: number;
  /** Descriptive tags */
  tags: string[];
  /** Spine background color (CSS color string) */
  color: string;
  /** Accent / text color on spine */
  accentColor: string;
  /** Spine width in pixels (20–60) */
  thickness: number;
  /** Book height in pixels (170–260) */
  height: number;
  /** Publication year */
  year: number;
  /** Optional: page count */
  pages?: number;
  /** Optional: personal reading status */
  status?: ReadingStatus;
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

/** Reading status for a book */
export type ReadingStatus = "unread" | "reading" | "read" | "loved";

/** State for the bookshelf application */
export interface ShelfState {
  /** Currently selected/open book */
  selectedBook: Book | null;
  /** Active category filter */
  activeCategory: BookCategory;
  /** Current search query */
  searchQuery: string;
  /** Whether ambient audio is playing */
  audioEnabled: boolean;
}

/** Props passed to individual Book components */
export interface BookProps {
  book: Book;
  isSelected: boolean;
  onClick: (book: Book) => void;
}

/** Props for the BookDetail panel */
export interface BookDetailProps {
  book: Book;
  onClose: () => void;
}

/** A single rain drop for canvas rendering */
export interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

/** A dust particle for ambient effect */
export interface DustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
}
