/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: ["class", '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        app: "rgb(var(--app-bg) / <alpha-value>)",
        surface: "rgb(var(--surface-bg) / <alpha-value>)",
        elevated: "rgb(var(--elevated-bg) / <alpha-value>)",
        line: "rgb(var(--border-color) / <alpha-value>)",
        fg: "rgb(var(--text-main) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",

        brand: {
          blue: "#2563eb",
          blueDark: "#1d4ed8",
          orange: "#f97316",
          orangeDark: "#ea580c",
          green: "#16a34a",
          greenDark: "#15803d",
        },

        danger: "#dc2626",
        warning: "#f59e0b",
        success: "#16a34a",
        info: "#0284c7",
      },

      borderRadius: {
        card: "1rem",
        panel: "1.25rem",
      },

      boxShadow: {
        card: "0 8px 30px rgb(15 23 42 / 0.06)",
        panel: "0 20px 50px rgb(15 23 42 / 0.12)",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      screens: {
        xs: "480px",
      },
    },
  },

  plugins: [],
};