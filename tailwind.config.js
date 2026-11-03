/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1E3A5F",
        "dusty-blue": "#6B8FB3",
        maroon: "#B13C50",
        ivory: "#F8F2E9",
        gold: "#D4AF7F",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
