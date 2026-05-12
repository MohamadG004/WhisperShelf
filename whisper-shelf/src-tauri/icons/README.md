# App Icons

This folder should contain app icons for the Tauri build.

## Required Files

Tauri expects these files for `tauri build`:

- `32x32.png`
- `128x128.png`
- `128x128@2x.png`
- `icon.icns` (macOS)
- `icon.ico` (Windows)

## Generating Icons

Once you have a source SVG or PNG (512×512 or larger), use the Tauri CLI:

```bash
# From project root, after installing dependencies:
npx tauri icon public/favicon.svg
```

This auto-generates all required sizes into `src-tauri/icons/`.

## For Development

`tauri dev` does **not** require icons — they are only needed for `tauri build`.

You can skip this step if you only want to run the app in development mode.
