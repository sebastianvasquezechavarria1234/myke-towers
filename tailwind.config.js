/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'young-king': {
          DEFAULT: '#B8860B', // Dark Goldenrod for a premium feel
          light: '#DAA520',
          dark: '#8B6508',
        },
        'pantera': '#121212', // Deep black
      }
    },
  },
  plugins: [],
}
