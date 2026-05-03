import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F4E1E1",
        champagne: "#D4A574",
        cream: "#FFF5EE",
        rose: "#905C5C",
        pearl: "#F5F0EB",
        charcoal: "#1C1A1A",
        mutedGold: "#A7885E",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-cormorant)", "serif"],
        ui: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 12px 40px rgba(144, 92, 92, 0.16)",
        glass: "0 8px 32px rgba(212, 165, 116, 0.18)",
      },
      backgroundImage: {
        "luxury-gradient":
          "linear-gradient(135deg, rgba(244,225,225,0.92), rgba(255,245,238,0.98))",
        "gold-gradient":
          "linear-gradient(90deg, #D4A574 0%, #E7C9A2 50%, #D4A574 100%)",
      },
      animation: {
        shimmer: "shimmer 2.8s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
