// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color palette — neutral SaaS tones
      colors: {
        brand: {
          50:  "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#6c757d",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
      },
      // Smooth font stack
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Soft shadow system
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.06)",
        card: "0 4px 16px rgba(0,0,0,0.08)",
        focus: "0 0 0 3px rgba(99,102,241,0.15)",
      },
      // Consistent border radius
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      // Animation for loaders
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        pulse: "pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;