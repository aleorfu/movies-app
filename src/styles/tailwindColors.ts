/*
If you want to add a color into the dictionary you must add it first to "ColorKeys".
This is because I want colors to return strings, which is the data type for colors not being got from tailwind.
*/

type ColorKeys =
  | "primary_light"
  | "secondary_light"
  | "tertiary_light"
  | "quaternary_light"
  | "primary_dark"
  | "secondary_dark"
  | "tertiary_dark"
  | "quaternary_dark";

type ColorDictionary = {
  [k in ColorKeys]: string;
};

const colors: ColorDictionary = {
  primary_light: "#fafafa",
  secondary_light: "#e4e5f1",
  tertiary_light: "#9394a5",
  quaternary_light: "#484b6a",
  primary_dark: "#181818",
  secondary_dark: "#3d3d3d",
  tertiary_dark: "#aaaaaa",
  quaternary_dark: "#ffffff",
};

export { colors };
