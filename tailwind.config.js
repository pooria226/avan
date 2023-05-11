/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: ".5rem",
        sm: "1rem",
        lg: "2rem",
        xl: "4rem",
        "2xl": "6rem",
      },
      center: true,
    },
    extend: {},
  },
  plugins: [],
};
