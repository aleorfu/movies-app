import { StackNavigationOptions } from "@react-navigation/stack";
import { colors } from "@src/styles/tailwindColors";
import React from "react";
import Back from "@src/assets/img/back-icon.svg";

const getOptions = (
  isLight: boolean,
  title: string,
): StackNavigationOptions => {
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
    headerBackImage: () => (
      <Back
        width={40}
        height={40}
        color={isLight ? colors.quaternary_light : colors.quaternary_dark}
      />
    ),
  };
};

export { getOptions };
