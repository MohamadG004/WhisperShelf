// ============================================================
// WhisperShelf — Sample Book Data
// Add, remove, or modify books here to customize your shelf.
// ============================================================

import { Book } from "../types";

export const BOOKS: Book[] = [
  // ─── Row 1: Fiction & Fantasy ───────────────────────────────
  {
    id: "the-name-of-the-wind",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    description:
      "Told in Kvothe's own voice, this epic fantasy follows a young man who grows to be one of the most notorious magicians his world has ever seen. From his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a city's underworld, to his daringly brazen yet successful bid to enter a legendary school of magic, in The Name of the Wind Patrick Rothfuss gives us a hero built of sound and shadows.",
    category: "Fantasy",
    rating: 4.8,
    tags: ["magic", "coming-of-age", "epic", "music"],
    color: "#1a3a5c",
    accentColor: "#c9a84c",
    thickness: 44,
    height: 240,
    year: 2007,
    pages: 662,
    status: "loved",
  },
  {
    id: "piranesi",
    title: "Piranesi",
    author: "Susanna Clarke",
    description:
      "Piranesi's house is no ordinary building. Its rooms are infinite, its corridors endless, its walls lined with thousands upon thousands of statues — human, animal, and monstrous. Tides flow through its lower halls. The sky can be seen through the windows of its upper floors. Piranesi lives there alone, in perfect harmony with the house, talking to the statues and exploring its many chambers.",
    category: "Fantasy",
    rating: 4.7,
    tags: ["surreal", "mystery", "labyrinth", "quiet"],
    color: "#2d1b4e",
    accentColor: "#9b7fd4",
    thickness: 28,
    height: 210,
    year: 2020,
    pages: 272,
    status: "loved",
  },
  {
    id: "stoner",
    title: "Stoner",
    author: "John Williams",
    description:
      "William Stoner is born at the end of the nineteenth century into a dirt-poor Missouri farming family. Sent to the state university to study agronomy, he falls in love with English literature and stays on as a teacher. Stoner's life is not heroic, not particularly eventful. And yet the novel that follows him is one of the most powerful and moving works in American fiction.",
    category: "Fiction",
    rating: 4.6,
    tags: ["quiet", "literary", "life", "academic"],
    color: "#3d2b0a",
    accentColor: "#d4a574",
    thickness: 30,
    height: 225,
    year: 1965,
    pages: 278,
    status: "read",
  },
  {
    id: "the-road",
    title: "The Road",
    author: "Cormac McCarthy",
    description:
      "A father and his young son walk alone through burned America, heading slowly for the coast. Nothing moves in the ravaged landscape save the ash on the wind. It is cold enough to crack stones, and when the snow falls it is gray. The sky is dark. Their destination is unclear. This is an intimate novel about love and survival, the ultimate test of what it means to be human.",
    category: "Fiction",
    rating: 4.5,
    tags: ["post-apocalyptic", "survival", "father-son", "sparse"],
    color: "#2c2c2c",
    accentColor: "#a0a0a0",
    thickness: 26,
    height: 215,
    year: 2006,
    pages: 287,
    status: "read",
  },

  // ─── Row 2: Mystery & Philosophy ──────────────────────────────
  {
    id: "the-secret-history",
    title: "The Secret History",
    author: "Donna Tartt",
    description:
      "Under the influence of their charismatic classics professor, a group of unusual students at a small Vermont college discover a way of thinking and living that is a world away from ordinary. But when they go too far — and the gods look down — one of the students is murdered. Told in hindsight by the narrator Richard Papen, who was once one of this tight-knit group.",
    category: "Mystery",
    rating: 4.7,
    tags: ["dark academia", "campus", "psychological", "literary"],
    color: "#1c1c2e",
    accentColor: "#e8c49a",
    thickness: 46,
    height: 245,
    year: 1992,
    pages: 524,
    status: "loved",
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    description:
      "Written in Greek by an intellectual Roman emperor without any intention of publication, the Meditations of Marcus Aurelius offer a remarkable series of challenging spiritual reflections and exercises developed as the leader of an empire. Ranging from doubt and despair to conviction and exaltation, they form a timeless personal exploration of virtue, reason, and the nature of the good life.",
    category: "Philosophy",
    rating: 4.9,
    tags: ["stoicism", "wisdom", "ancient", "self-improvement"],
    color: "#4a3520",
    accentColor: "#d4a855",
    thickness: 24,
    height: 195,
    year: 180,
    pages: 254,
    status: "loved",
  },
  {
    id: "kafka-on-the-shore",
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    description:
      "A teenage boy runs away from home and takes refuge in a library in a small town in Japan. An old man talks to cats and then one day it starts raining fish. These two seemingly unrelated stories are told in alternating chapters and then gradually interweave in dreamlike, mysterious fashion. Murakami conjures a world of extraordinary beauty and pathos that is his finest achievement.",
    category: "Fiction",
    rating: 4.6,
    tags: ["surreal", "japanese", "dreamlike", "cats"],
    color: "#1a2e1a",
    accentColor: "#7ac47a",
    thickness: 40,
    height: 230,
    year: 2002,
    pages: 505,
    status: "read",
  },
  {
    id: "a-river-runs-through-it",
    title: "A River Runs Through It",
    author: "Norman Maclean",
    description:
      "In the small towns and rivers of Montana, Norman Maclean's novella tells of two brothers united by a love of fly-fishing but divided by fate. Half memoir, half literature, this autobiographical story explores family bonds, nature's sublime beauty, and the river as metaphor for life — flowing, persistent, always moving toward a destination we cannot see.",
    category: "Nature",
    rating: 4.5,
    tags: ["fly-fishing", "memoir", "montana", "brothers"],
    color: "#1e3a2a",
    accentColor: "#78b4a0",
    thickness: 22,
    height: 185,
    year: 1976,
    pages: 161,
    status: "loved",
  },

  // ─── Row 3: Science, History & Poetry ──────────────────────────
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description:
      "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations and human rights; to trust money, books and laws; and to be enslaved by bureaucracy, timetables and consumerism?",
    category: "History",
    rating: 4.4,
    tags: ["humanity", "evolution", "civilization", "nonfiction"],
    color: "#3d1a00",
    accentColor: "#e8875a",
    thickness: 42,
    height: 235,
    year: 2011,
    pages: 443,
    status: "read",
  },
  {
    id: "the-selfish-gene",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    description:
      "Richard Dawkins' brilliant reformulation of the theory of natural selection has the rare distinction of having provoked as much excitement and hostility outside the scientific community as within it. His fascinating and controversial book not only shows us how Darwinian theory can explain animal behaviour, it also introduces the concept of the 'meme', a cultural gene.",
    category: "Science",
    rating: 4.5,
    tags: ["evolution", "biology", "genetics", "controversial"],
    color: "#0a1a2e",
    accentColor: "#4a90d9",
    thickness: 36,
    height: 220,
    year: 1976,
    pages: 360,
    status: "read",
  },
  {
    id: "leaves-of-grass",
    title: "Leaves of Grass",
    author: "Walt Whitman",
    description:
      "Originally published in 1855, this collection of poetry revolutionized American literature. Whitman's free verse celebrated democracy, nature, love, and friendship. His long, flowing lines and expansive celebrations of life, the body, and the cosmos broke every convention and invented something entirely new — poetry that breathes and moves like the wind through tall grass.",
    category: "Poetry",
    rating: 4.7,
    tags: ["american", "nature", "democracy", "free verse"],
    color: "#2a3d1a",
    accentColor: "#8fba5f",
    thickness: 32,
    height: 215,
    year: 1855,
    pages: 456,
    status: "loved",
  },
  {
    id: "the-hidden-life-of-trees",
    title: "The Hidden Life of Trees",
    author: "Peter Wohlleben",
    description:
      "Are trees social beings? In this international bestseller, forester and author Peter Wohlleben convincingly makes the case that, yes, the forest is a social network. He shares his discoveries about how trees communicate, nurture their young, warn each other of danger, and even make hospitality gestures to strangers — all through an underground network of roots and fungi.",
    category: "Nature",
    rating: 4.3,
    tags: ["trees", "ecology", "wonder", "nature"],
    color: "#1a2e1a",
    accentColor: "#6aaa5a",
    thickness: 30,
    height: 205,
    year: 2015,
    pages: 288,
    status: "reading",
  },
  {
    id: "the-brothers-karamazov",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    description:
      "Dostoevsky's last and greatest novel, The Brothers Karamazov is a murder mystery, a courtroom drama, and a deeply philosophical meditation on God, free will, and morality. It tells the story of three brothers and their debauched father, whose murder shakes the foundations of a small Russian town and propels each brother on a journey of moral questioning.",
    category: "Fiction",
    rating: 4.9,
    tags: ["russian", "philosophy", "morality", "masterpiece"],
    color: "#1e0a0a",
    accentColor: "#c45a5a",
    thickness: 52,
    height: 255,
    year: 1880,
    pages: 824,
    status: "unread",
  },
  {
    id: "bury-my-heart-at-wounded-knee",
    title: "Bury My Heart at Wounded Knee",
    author: "Dee Brown",
    description:
      "This classic work of American history relates the systematic destruction of the American Indian during the second half of the nineteenth century. Using council records, autobiographies, and firsthand descriptions, Brown allows the great chiefs and warriors of the Dakota, Ute, Sioux, Cheyenne, and other tribes to speak for themselves in describing the betrayals, broken promises, and massacres of their people.",
    category: "History",
    rating: 4.6,
    tags: ["indigenous", "american west", "tragedy", "essential"],
    color: "#3d1a0a",
    accentColor: "#d47a3a",
    thickness: 38,
    height: 228,
    year: 1970,
    pages: 487,
    status: "unread",
  },
];

/** All available categories derived from the book data */
export const CATEGORIES: Book["category"][] = [
  "All",
  "Fiction",
  "Fantasy",
  "Mystery",
  "Science",
  "Philosophy",
  "Poetry",
  "History",
  "Nature",
];

/**
 * Distributes books across shelf rows.
 * Each row gets a roughly equal number of books.
 */
export function getBooksPerShelf(
  books: Book[],
  shelvesCount: number
): Book[][] {
  const shelves: Book[][] = Array.from({ length: shelvesCount }, () => []);
  books.forEach((book, index) => {
    shelves[index % shelvesCount].push(book);
  });
  return shelves;
}
