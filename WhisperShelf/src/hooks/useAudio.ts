// ============================================================
// WhisperShelf — useAudio Hook
// Generates ambient rain sound using the Web Audio API.
// No external audio files required — the sound is synthesized
// from filtered noise, giving a gentle, realistic rain effect.
// ============================================================

import { useRef, useEffect, useCallback, useState } from "react";

interface AudioNodes {
  context: AudioContext;
  masterGain: GainNode;
  bufferSource: AudioBufferSourceNode | null;
}

/** Duration of generated noise buffer in seconds */
const BUFFER_DURATION = 4;

/** Target output volume (0–1) */
const TARGET_VOLUME = 0.18;

/** Fade duration in seconds for smooth on/off transitions */
const FADE_DURATION = 2.0;

/**
 * Generates a noise buffer filtered to sound like rain.
 * Uses bandpass filtering around low frequencies to mimic
 * the hushed, continuous sound of rainfall.
 */
function createRainBuffer(context: AudioContext): AudioBuffer {
  const sampleRate = context.sampleRate;
  const bufferSize = sampleRate * BUFFER_DURATION;
  const buffer = context.createBuffer(2, bufferSize, sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;

      // Pink noise approximation via Paul Kellet's algorithm
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;

      // Scale down and apply gentle variation to simulate rain intensity
      data[i] = (pink * 0.11 + white * 0.05) * (0.8 + 0.2 * Math.sin(i / 800));
    }
  }

  return buffer;
}

/**
 * Custom hook that manages ambient rain audio via Web Audio API.
 *
 * @returns Object with enabled state and toggle function
 */
export function useAudio() {
  const [enabled, setEnabled] = useState(false);
  const nodesRef = useRef<AudioNodes | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Initializes the AudioContext and creates all necessary nodes */
  const initAudio = useCallback(() => {
    if (nodesRef.current) return;

    const context = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0, context.currentTime);
    masterGain.connect(context.destination);

    nodesRef.current = { context, masterGain, bufferSource: null };
  }, []);

  /** Starts playing looping rain audio with a fade in */
  const startAudio = useCallback(() => {
    initAudio();
    const nodes = nodesRef.current;
    if (!nodes) return;

    const { context, masterGain } = nodes;

    // Resume context if suspended (browser autoplay policy)
    if (context.state === "suspended") {
      context.resume();
    }

    // Create and connect a new buffer source
    const source = context.createBufferSource();
    source.buffer = createRainBuffer(context);
    source.loop = true;

    // Add a low-pass filter to soften harsh frequencies
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, context.currentTime);
    filter.Q.setValueAtTime(0.5, context.currentTime);

    // Add subtle reverb via a small convolver-like effect
    // (simple delay for a sense of space)
    const delay = context.createDelay(0.1);
    delay.delayTime.setValueAtTime(0.04, context.currentTime);

    const delayGain = context.createGain();
    delayGain.gain.setValueAtTime(0.3, context.currentTime);

    source.connect(filter);
    filter.connect(masterGain);
    filter.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGain);

    source.start(context.currentTime);
    nodes.bufferSource = source;

    // Fade in
    masterGain.gain.cancelScheduledValues(context.currentTime);
    masterGain.gain.setValueAtTime(0, context.currentTime);
    masterGain.gain.linearRampToValueAtTime(
      TARGET_VOLUME,
      context.currentTime + FADE_DURATION
    );
  }, [initAudio]);

  /** Fades out and stops audio */
  const stopAudio = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;

    const { context, masterGain, bufferSource } = nodes;

    // Fade out
    masterGain.gain.cancelScheduledValues(context.currentTime);
    masterGain.gain.setValueAtTime(
      masterGain.gain.value,
      context.currentTime
    );
    masterGain.gain.linearRampToValueAtTime(
      0,
      context.currentTime + FADE_DURATION
    );

    // Stop source after fade completes
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => {
      if (bufferSource) {
        try {
          bufferSource.stop();
        } catch {
          // Source may already be stopped
        }
        nodes.bufferSource = null;
      }
    }, FADE_DURATION * 1000 + 100);
  }, []);

  /** Toggle ambient audio on/off */
  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        startAudio();
      } else {
        stopAudio();
      }
      return next;
    });
  }, [startAudio, stopAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      const nodes = nodesRef.current;
      if (nodes) {
        nodes.masterGain.disconnect();
        nodes.context.close();
      }
    };
  }, []);

  return { enabled, toggle };
}
