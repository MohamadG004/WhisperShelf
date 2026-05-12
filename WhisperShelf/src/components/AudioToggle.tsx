// ============================================================
// WhisperShelf — AudioToggle Component
// A minimal button to enable/disable ambient rain sound.
// Shows an animated wave icon when audio is active.
// ============================================================

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface AudioToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AudioToggle({ enabled, onToggle }: AudioToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-sm font-crimson text-sm transition-colors"
      style={{
        color: enabled ? "rgba(180,220,160,0.85)" : "rgba(120,160,120,0.5)",
        background: enabled
          ? "rgba(60,120,40,0.15)"
          : "rgba(255,255,255,0.03)",
        border: enabled
          ? "1px solid rgba(80,150,50,0.25)"
          : "1px solid rgba(255,255,255,0.05)",
      }}
      whileHover={{
        color: "rgba(200,240,180,0.9)",
        background: "rgba(60,120,40,0.2)",
        border: "1px solid rgba(80,150,50,0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      title={`${enabled ? "Mute" : "Play"} ambient rain (S)`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Icon */}
      <motion.span
        animate={enabled ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={
          enabled ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : {}
        }
      >
        {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </motion.span>

      {/* Label */}
      <span style={{ letterSpacing: "0.02em" }}>
        {enabled ? "Rain" : "Silence"}
      </span>

      {/* Animated dots when active */}
      {enabled && (
        <div className="flex items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block rounded-full"
              style={{
                width: "2px",
                height: "2px",
                background: "rgba(160,220,120,0.8)",
              }}
              animate={{
                scaleY: [1, 2.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
