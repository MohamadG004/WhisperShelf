#!/usr/bin/env bash
# ============================================================
# WhisperShelf — Unix Launch Script
# Run this to start the desktop application.
# Usage: bash scripts/run.sh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo ""
echo "  📚  WhisperShelf"
echo "  ─────────────────────────────────────"

# Check for Node.js
if ! command -v node &>/dev/null; then
  echo "  ✗  Node.js not found. Install from https://nodejs.org"
  exit 1
fi

NODE_VERSION=$(node -v)
echo "  ✓  Node.js $NODE_VERSION"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "  →  Installing dependencies..."
  npm install
fi

# Check if Rust/Cargo is available for the full desktop app
if command -v cargo &>/dev/null; then
  CARGO_VERSION=$(cargo --version)
  echo "  ✓  $CARGO_VERSION"
  echo "  →  Launching desktop app (Tauri)..."
  echo ""
  npm run tauri:dev
else
  echo "  ⚠  Rust/Cargo not found — launching as browser app instead."
  echo "     To run as a native desktop app, install Rust: https://rustup.rs"
  echo ""
  echo "  →  Starting dev server..."
  echo "     Open http://localhost:1420 in your browser."
  echo ""
  npm run dev
fi
