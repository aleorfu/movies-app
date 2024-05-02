import { StyleProp, useColorScheme } from "react-native";

/**
 * @param 0 - Light style
 * @param 1 - Dark style
 */
type ThemedClassNames = [string, string];

/**
 * @param 0 - Light style
 * @param 1 - Dark style
 */
type ThemedStyles<T extends StyleProp<any> | string> = [T, T];

let isLight: boolean = true;

const setIsLight = (state: boolean): void => {
  isLight = state;
};

const joinClassNames = (
  commonStyle: string,
  themedClassNames: ThemedClassNames
): string => {
  return [
    commonStyle,
    isLight ? themedClassNames[0] : themedClassNames[1],
  ].join(" ");
};

const selectStyle = <T extends StyleProp<any> | string>(
  themedStyles: ThemedStyles<T>
): T => {
  return isLight ? themedStyles[0] : themedStyles[1];
};

export {
  setIsLight,
  joinClassNames,
  selectStyle,
  ThemedClassNames,
  ThemedStyles,
};
