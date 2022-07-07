/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{ts, tsx, js, jsx}",
    "./src/components/**/*.{ts, tsx, js, jsx}",
    "./src/components/**/*.{ts, tsx, js, jsx}",
  ],
  purge: ["./src/**/*.{ts, tsx, js, jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        sidebar: "200px minmax(900px, 1fr)",
      },
    },
  },
  plugins: [],
};
