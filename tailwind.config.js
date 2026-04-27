/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      // narrower max widths for the page
      screens: {
        sm: "640px",
        md: "720px",
        lg: "800px",
        xl: "900px",
        "2xl": "1000px",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};