# Audio Assets

WhisperShelf generates ambient rain sound **entirely via the Web Audio API** (no external files needed).

The sound is synthesized from filtered pink noise with a low-pass filter and
a subtle delay effect, creating a gentle, continuous rain atmosphere.

## Optional: Using a Custom Audio File

If you prefer a recorded rain sound, place an `rain.mp3` file in this directory
and update `src/hooks/useAudio.ts` to use `<audio>` element playback instead.

Recommended free sources:
- https://freesound.org (search "rain ambient")
- https://pixabay.com/sound-effects/ (search "rain")

## Supported Formats
- MP3 (recommended for compatibility)
- OGG (smaller file size)
- WAV (lossless but large)
