/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary_light: "#fafafa",
        secondary_light: "#e4e5f1",
        tertiary_light: "#9394a5",
        quaternary_light: "#484b6a",
        primary_dark: "#181818",
        secondary_dark: "#3d3d3d",
        tertiary_dark: "#aaaaaa",
        quaternary_dark: "#ffffff",
      },
    },
  },
  plugins: [],
};
