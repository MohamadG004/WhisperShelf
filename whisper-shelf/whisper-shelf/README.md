# 📚 WhisperShelf

> *A cozy, atmospheric virtual bookshelf — your personal library bathed in candlelight and rain.*

WhisperShelf is a desktop application built with Tauri + React that brings a cinematic, immersive bookshelf experience to your desktop. Rain falls outside a forest cabin window, dust motes drift through warm light, and your books wait quietly on wooden shelves.

---

## ✨ Features

- 🌧️ Animated rainy forest atmosphere with parallax effects
- 📖 Interactive books with smooth 3D open/close animations
- ✨ Floating dust particles and ambient candlelight glow
- 🔍 Live search across your library
- 🏷️ Category filtering
- 🔊 Web Audio API ambient rain sounds (no external file needed)
- ⌨️ Keyboard shortcuts (Escape to close, `/` to search)
- 12 pre-loaded sample books across multiple genres
- Fully responsive bookshelf layout

---

## 🛠️ Prerequisites

### For Tauri Desktop App:
- **Node.js** v18 or higher — https://nodejs.org
- **Rust** (latest stable) — https://rustup.rs
- **System dependencies** (see below by OS)

### macOS
```bash
xcode-select --install
```

### Windows
- Install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- Install [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (usually pre-installed on Win11)

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file \
  libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

### Linux (Fedora)
```bash
sudo dnf install webkit2gtk4.1-devel openssl-devel curl wget file \
  libappindicator-gtk3-devel librsvg2-devel
sudo dnf group install "C Development Tools and Libraries"
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run in development mode
```bash
npm run tauri:dev
```
This opens the app in a native window with hot-reload.

### 3. Build for production
```bash
npm run tauri:build
```
Compiled binaries are in `src-tauri/target/release/bundle/`

---

## 🌐 Run as Web App (No Rust Required)

If you don't want to install Rust, you can run WhisperShelf as a browser app:

```bash
npm install
npm run dev
```
Then open http://localhost:5173 in your browser.

---

## 📁 Project Structure

```
whisper-shelf/
├── README.md
├── package.json                  # Node dependencies & scripts
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite bundler config
├── tailwind.config.js            # Tailwind CSS config
├── postcss.config.js             # PostCSS config
├── tsconfig.json                 # TypeScript config
├── tsconfig.node.json            # TypeScript config for Node
│
├── src/                          # React application source
│   ├── main.tsx                  # App entry point
│   ├── App.tsx                   # Root component
│   ├── index.css                 # Global styles & CSS variables
│   │
│   ├── components/               # UI components
│   │   ├── Bookshelf.tsx         # Main bookshelf layout
│   │   ├── Shelf.tsx             # Individual shelf row
│   │   ├── Book.tsx              # Book spine component
│   │   ├── BookDetail.tsx        # Book detail panel/card
│   │   ├── SearchBar.tsx         # Search input
│   │   ├── CategoryFilter.tsx    # Category tabs
│   │   ├── AmbientEffects.tsx    # Rain + particles container
│   │   ├── RainCanvas.tsx        # Animated rain canvas
│   │   ├── DustParticles.tsx     # Floating dust motes
│   │   └── AudioToggle.tsx       # Sound on/off button
│   │
│   ├── data/
│   │   └── books.ts              # Sample book data
│   │
│   ├── hooks/
│   │   ├── useAudio.ts           # Web Audio API rain sound
│   │   └── useKeyboard.ts        # Keyboard shortcut handler
│   │
│   ├── utils/
│   │   └── helpers.ts            # Utility functions
│   │
│   └── types/
│       └── index.ts              # TypeScript type definitions
│
├── src-tauri/                    # Tauri (Rust) desktop wrapper
│   ├── Cargo.toml                # Rust dependencies
│   ├── tauri.conf.json           # Tauri configuration
│   └── src/
│       └── main.rs               # Rust entry point
│
├── public/                       # Static assets
│   └── audio/                    # (placeholder for external audio)
│
└── scripts/
    ├── run.sh                    # Unix launch script
    └── run.bat                   # Windows launch script
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `Escape` | Close book detail / clear search |
| `S` | Toggle ambient sound |

---

## 🎨 Customization

### Adding Books
Edit `src/data/books.ts` and add entries to the `BOOKS` array:
```typescript
{
  id: "my-book",
  title: "My Book Title",
  author: "Author Name",
  description: "A short description...",
  category: "Fiction",
  rating: 4.5,
  tags: ["mystery", "thriller"],
  color: "#8B4513",        // Spine color
  accentColor: "#D4A017",  // Text/accent color
  thickness: 32,           // Spine width in px (20-60)
  height: 220,             // Book height in px (180-260)
  year: 2024
}
```

### Changing the Atmosphere
The rain intensity and particle count can be tweaked in:
- `src/components/RainCanvas.tsx` — `RAIN_DROPS` constant
- `src/components/DustParticles.tsx` — `PARTICLE_COUNT` constant

---

## 🔮 Future Improvements

- [ ] User-defined book collection with local storage persistence
- [ ] Import from Goodreads CSV
- [ ] Reading progress tracking
- [ ] Personal notes per book
- [ ] Multiple shelf themes (library, cabin, spaceship)
- [ ] Book cover image support
- [ ] Reading statistics dashboard
- [ ] Drag-and-drop shelf reordering
- [ ] Custom ambient soundscapes (fireplace, café, thunderstorm)
- [ ] Plugin system for data sources (Open Library API, Google Books)
- [ ] Export reading list as PDF