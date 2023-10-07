/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        primaryT: "hsl(var(--color-primary-content) / <alpha-value>)",
        ternaryT: "hsl(var(--color-ternary-content) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
