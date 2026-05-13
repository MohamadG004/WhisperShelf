/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"Fredoka One"', "Nunito", "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
        caveat: ['"Caveat"', "cursive"],
        // Keep old ones for fallback
        playfair: ['"Fredoka One"', "sans-serif"],
        crimson: ['"Nunito"', "sans-serif"],
        fell: ['"Caveat"', "cursive"],
      },
      colors: {
        cozy: {
          bg: "#1E0D05",
          dark: "#2C1A0E",
          panel: "#3D2210",
          wood: "#5C3014",
          amber: "#E8920A",
          gold: "#F5C418",
          cream: "#F5E8C8",
          red: "#C42B2B",
          green: "#4A8A30",
          text: "#2C1A0E",
        },
      },
      animation: {
        "leaf-fall": "leafFall 8s ease-in infinite",
        "leaf-fall-slow": "leafFall 12s ease-in infinite",
        "leaf-sway": "leafSway 3s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "bounce-soft": "bounceSoft 1.5s ease-in-out infinite",
        "coin-spin": "coinSpin 0.4s ease-in-out",
        "shake": "shake 0.5s ease-in-out",
        "pop-in": "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      },
      keyframes: {
        leafFall: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0.3" },
        },
        leafSway: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(20px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        coinSpin: {
          "0%": { transform: "scale(1) rotateY(0deg)" },
          "50%": { transform: "scale(1.3) rotateY(90deg)" },
          "100%": { transform: "scale(1) rotateY(0deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
        popIn: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        cartoon: "4px 4px 0px #2C1A0E",
        "cartoon-sm": "2px 2px 0px #2C1A0E",
        "cartoon-lg": "6px 6px 0px #2C1A0E",
        "cartoon-inset": "inset 2px 2px 0px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};