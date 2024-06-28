import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MovieDetailsScreen } from "@src/screens/movies/MovieDetailsScreen";
import { MovieListScreen } from "@src/screens/movies/MovieListScreen";
import React from "react";
import { getOptions } from "@src/utils/StackNavigationUtils";

type ScreenNames = ["MovieListStack", "MovieDetailsStack"];
type MoviesNavProps = { movieId: string };
type RootStackParamList = Record<ScreenNames[number], MoviesNavProps>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const MoviesNav = (): React.JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieListStacK"
        component={MovieListScreen}
        options={getOptions("List")}
      />
      <Stack.Screen
        name="MovieDetailsStack"
        component={MovieDetailsScreen}
        options={getOptions("Details")}
      />
    </Stack.Navigator>
  );
};

export {
  MoviesNav,
  StackNavigation as MoviesNavStackNavigation,
  MoviesNavProps,
};
