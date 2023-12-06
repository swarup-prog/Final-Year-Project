/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        ternary: "hsl(var(--color-ternary) / <alpha-value>)",
        accent: "hsl(var(--color-accent) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
