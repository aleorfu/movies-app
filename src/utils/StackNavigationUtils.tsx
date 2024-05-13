import { StackNavigationOptions } from "@react-navigation/stack";
import { colors } from "@src/styles/tailwindColors";
import { Image } from "react-native";
import React from "react";

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
      <Image
        style={
          isLight
            ? { tintColor: colors.quaternary_light }
            : { tintColor: colors.quaternary_dark }
        }
        className="w-6 h-6"
        source={require("@src/assets/img/back-icon.png")}
      />
    ),
  };
};

export { getOptions };
