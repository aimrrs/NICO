/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(56, 189, 248, 0.35)",
        "glow-green": "0 0 25px -5px rgba(34, 197, 94, 0.35)",
        "glow-lg": "0 0 50px -10px rgba(56, 189, 248, 0.4)",
      },
    },
  },
  plugins: [],
};
