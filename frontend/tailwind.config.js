/** @type {import('tailwindcss').Config} */
const { join } = require('path');

module.exports = {
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}')],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        sidebar: '250px minmax(900px, 1fr)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
    plugins: [],
  },
};
