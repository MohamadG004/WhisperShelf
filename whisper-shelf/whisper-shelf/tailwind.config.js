/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "Georgia", "serif"],
        crimson: ['"Crimson Text"', "Georgia", "serif"],
        fell: ['"IM Fell English"', "Georgia", "serif"],
      },
      colors: {
        // Forest cabin palette
        forest: {
          950: "#050d08",
          900: "#0a1a0f",
          800: "#0f2416",
          700: "#142e1c",
          600: "#1a3d24",
          500: "#224e2e",
          400: "#2d6640",
          300: "#3d8055",
          200: "#5aab77",
          100: "#8fcca6",
        },
        amber: {
          950: "#1a0d00",
          900: "#3d1f00",
          800: "#6b3500",
          700: "#8b4500",
          600: "#b35a00",
          500: "#cc6f00",
          400: "#e68a1a",
          300: "#f0a233",
          200: "#f5bc5f",
          100: "#fad494",
          50: "#fef0d0",
        },
        shelf: {
          wood: "#3d2b1a",
          dark: "#2a1e12",
          light: "#6b4c2e",
          grain: "#4a3320",
        },
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "fog-drift": "fogDrift 20s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fogDrift: {
          "0%": { transform: "translateX(-5%) scaleX(1.1)", opacity: "0.3" },
          "50%": { transform: "translateX(5%) scaleX(1)", opacity: "0.15" },
          "100%": { transform: "translateX(-5%) scaleX(1.1)", opacity: "0.3" },
        },
      },
      boxShadow: {
        book: "2px 4px 12px rgba(0,0,0,0.5), inset -2px 0 4px rgba(0,0,0,0.3)",
        "book-hover":
          "6px 12px 24px rgba(0,0,0,0.7), inset -2px 0 4px rgba(0,0,0,0.3)",
        shelf: "0 8px 24px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)",
        glow: "0 0 20px rgba(230, 138, 26, 0.3)",
        "glow-strong": "0 0 40px rgba(230, 138, 26, 0.5)",
      },
    },
  },
  plugins: [],
};
