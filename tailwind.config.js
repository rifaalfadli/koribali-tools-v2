/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        hp: { max: "400px" },
        2040: "2040px", // custom breakpoint
      },
    },
  },
  plugins: [],
};
