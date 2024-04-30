import { useColorScheme } from "react-native";

type ThemeStyle = [string, string];

const joinStyles = (commonStyle: string, themedStyle: ThemeStyle): string => {
  const isLight = useColorScheme() === "light";
  return [commonStyle, isLight ? themedStyle[0] : themedStyle[1]].join(" ");
};

export { joinStyles, ThemeStyle };
