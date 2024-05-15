import { StackNavigationOptions } from "@react-navigation/stack";
import { colors } from "@src/styles/tailwindColors";
import React from "react";
import Back from "@src/assets/img/back-icon.svg";
import { useColorScheme } from "react-native";

const getOptions = (
  title: string,
  headerShown: boolean = true,
): StackNavigationOptions => {
  const isLight = useColorScheme() === "light";

  const BackIcon = (
    <Back
      width={40}
      height={40}
      color={isLight ? colors.quaternary_light : colors.quaternary_dark}
    />
  );

  return {
    title: title,
    headerTitleAlign: "center",
    headerStyle: isLight
      ? {
          backgroundColor: colors.primary_light,
          shadowColor: "black",
        }
      : {
          backgroundColor: colors.primary_dark,
          shadowColor: "white",
        },
    headerTitleStyle: isLight
      ? { color: colors.quaternary_light }
      : { color: colors.quaternary_dark },
    headerBackImage: () => BackIcon,
    headerShown: headerShown,
  };
};

export { getOptions };
