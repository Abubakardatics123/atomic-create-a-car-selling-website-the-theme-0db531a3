import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#FFD700",
          600: "#B8860B",
          700: "#92650a",
          800: "#78520d",
          900: "#633f0e",
        },
        dark: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          200: "#bdbdbd",
          300: "#9e9e9e",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#2a2a2a",
          800: "#1a1a1a",
          900: "#0d0d0d",
          950: "#000000",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)",
        "dark-gradient": "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
        "hero-gradient": "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.85) 100%)",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.4)" },
          "50%": { boxShadow: "0 0 20px 8px rgba(255, 215, 0, 0.2)" },
        },
      },
      boxShadow: {
        gold: "0 0 20px rgba(255, 215, 0, 0.3)",
        "gold-lg": "0 0 40px rgba(255, 215, 0, 0.4)",
        "dark-lg": "0 25px 50px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
