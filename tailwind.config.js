/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/static/**/*.{html,js}", "./app/templates/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        window: "#121212",
        main: { dark: "#1E1E1E", light: "#FFFFFF" },
        secondary: { normal: "#3DB991", hover: "#52D1A8" },
      },
      fontFamily: {
        rubik: ["rubik"],
      },
    },
  },
  plugins: [],
};
