/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary_color: "#222831",
        secondary_color: "#31363F",
        tertiary_color: "#76ABAE",
        quaternary_color: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
