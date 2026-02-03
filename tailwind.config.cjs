/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0E14",
          soft: "#121526",
          card: "#1A1F36",
        },
        neon: {
          purple: "#7C3AED",
          indigo: "#6366F1",
          cyan: "#22D3EE",
          pink: "#FB7185",
          orange: "#F59E0B",
        },
      },

      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, #1E1B4B 0%, #0B0E14 60%)",
        "neon-gradient":
          "linear-gradient(135deg, #7C3AED, #6366F1, #EC4899)",
        "card-gradient":
          "linear-gradient(180deg, rgba(124,58,237,0.12), rgba(0,0,0,0))",
      },

      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.35)",
        neon: "0 0 60px rgba(99,102,241,0.45)",
        soft: "0 10px 40px rgba(0,0,0,0.4)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
