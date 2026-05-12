// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// WhisperShelf — Tauri desktop wrapper
// The Rust backend is minimal; all application logic lives in the React frontend.
// This file simply bootstraps the Tauri runtime and opens the native window.

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running WhisperShelf");
}
