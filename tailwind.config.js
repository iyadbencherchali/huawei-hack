/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--cream)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--orange)",
          foreground: "var(--white)",
        },
        secondary: {
          DEFAULT: "var(--blue)",
          foreground: "var(--white)",
        },
        accent: {
          DEFAULT: "var(--orange-light)",
          foreground: "var(--white)",
        },
      },
    },
  },
  plugins: [],
}
