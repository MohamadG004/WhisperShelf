// ============================================================
// WhisperShelf — RainCanvas Component
// Renders animated rain using an HTML canvas element.
// Rain drops are drawn as thin, semi-transparent lines
// falling at a slight angle for a naturalistic effect.
// ============================================================

import { useEffect, useRef } from "react";
import { RainDrop } from "../types";

/** Number of rain drops rendered simultaneously */
const RAIN_DROPS = 180;

/** Slight rightward angle (radians) for wind effect */
const RAIN_ANGLE = 0.15;

/**
 * Initializes a single rain drop with random properties.
 */
function createDrop(width: number, height: number): RainDrop {
  return {
    x: Math.random() * width,
    y: Math.random() * height - height,
    length: 12 + Math.random() * 22,
    speed: 8 + Math.random() * 16,
    opacity: 0.08 + Math.random() * 0.22,
    width: 0.5 + Math.random() * 1,
  };
}

export function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<RainDrop[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize drops after resize
      dropsRef.current = Array.from({ length: RAIN_DROPS }, () =>
        createDrop(canvas.width, canvas.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize drops
    dropsRef.current = Array.from({ length: RAIN_DROPS }, () =>
      createDrop(canvas.width, canvas.height)
    );

    /** Main animation loop */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dropsRef.current.forEach((drop) => {
        // Draw rain streak
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(
          drop.x + drop.length * Math.sin(RAIN_ANGLE),
          drop.y + drop.length * Math.cos(RAIN_ANGLE)
        );

        // Gradient from white-blue to transparent
        const grad = ctx.createLinearGradient(
          drop.x,
          drop.y,
          drop.x + drop.length * Math.sin(RAIN_ANGLE),
          drop.y + drop.length
        );
        grad.addColorStop(0, `rgba(180, 220, 255, 0)`);
        grad.addColorStop(0.4, `rgba(180, 220, 255, ${drop.opacity})`);
        grad.addColorStop(1, `rgba(180, 220, 255, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = drop.width;
        ctx.stroke();

        // Move drop downward
        drop.y += drop.speed;
        drop.x += drop.speed * Math.sin(RAIN_ANGLE);

        // Reset when below screen
        if (drop.y > canvas.height + drop.length) {
          drop.y = -drop.length - Math.random() * 200;
          drop.x = Math.random() * canvas.width;
          drop.speed = 8 + Math.random() * 16;
          drop.opacity = 0.08 + Math.random() * 0.22;
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
