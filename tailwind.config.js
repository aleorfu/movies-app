/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary_color: "#fafafa",
        secondary_color: "#e4e5f1",
        tertiary_color: "#9394a5",
        quaternary_color: "#484b6a",
      },
    },
  },
  plugins: [],
};
