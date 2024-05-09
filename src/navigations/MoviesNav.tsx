import { NavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { MovieDetailsScreen } from "@src/screens/movies/MovieDetailsScreen";
import { MovieListScreen } from "@src/screens/movies/MovieListScreen";
import { colors } from "@src/styles/tailwindColors";
import { Image, useColorScheme } from "react-native";
import React from "react";

type ScreenNames = ["MovieListStack", "MovieDetailsStack"];
type RootStackParamList = Record<ScreenNames[number], { movieId: string }>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

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

const MoviesNav = (): React.JSX.Element => {
  const isLight: boolean = useColorScheme() === "light";

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieListStacK"
        component={MovieListScreen}
        options={getOptions(isLight, "List")}
      />
      <Stack.Screen
        name="MovieDetailsStack"
        component={MovieDetailsScreen}
        options={getOptions(isLight, "Details")}
      />
    </Stack.Navigator>
  );
};

export { MoviesNav, StackNavigation as MoviesNavStackNavigation };
