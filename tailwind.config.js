/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
          light: "#eff6ff",
        },

        navy: {
          50: "#f0f5fa",
          100: "#dce7f1",
          200: "#becfe3",
          300: "#92aecf",
          400: "#6086b6",
          500: "#41699f",
          600: "#335382",
          700: "#2c4369",
          800: "#273956",
          900: "#0f2747",
          950: "#081a32",
          DEFAULT: "#0f2747",
          dark: "#081a32",
        },

        security: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          DEFAULT: "#16a34a",
          light: "#f0fdf4",
        },

        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          DEFAULT: "#f97316",
          light: "#fff7ed",
        },

        page: "#f8fafc",
        surface: "#ffffff",
        border: "#e2e8f0",
        heading: "#0f172a",
        body: "#475569",
        muted: "#64748b",

        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#dc2626",
        info: "#0284c7",
      },

      borderRadius: {
        card: "0.75rem",
        button: "0.625rem",
      },

      boxShadow: {
        card: "0 1px 3px rgb(15 23 42 / 0.08)",
        panel:
          "0 10px 30px rgb(15 23 42 / 0.08)",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
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