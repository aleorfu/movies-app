import { createStackNavigator } from "@react-navigation/stack";
import { MovieListScreen } from "../screens/movies/MovieListScreen";
import { MovieDetailsScreen } from "../screens/movies/MovieDetailsScreen";
import { Image, useColorScheme } from "react-native";
import { colors } from "../styles/tailwindColors";
import { images } from "../constants/images";
import { ComponentType } from "react";
import { NavigationProp } from "@react-navigation/native";

type ScreenNames = ["MovieListStack", "MovieDetailsStack"];
type RootStackParamList = Record<ScreenNames[number], { movieId?: string }>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const getStackScreen = (
  name: string,
  title: string,
  component: ComponentType
) => {
  const isLight = useColorScheme() === "light";

  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{
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
            source={images.back_icon}
          />
        ),
      }}
    />
  );
};

const MoviesNav = () => {
  return (
    <Stack.Navigator>
      {getStackScreen("MovieListStack", "List", MovieListScreen)}
      {getStackScreen("MovieDetailsStack", "Details", MovieDetailsScreen)}
    </Stack.Navigator>
  );
};

export { MoviesNav, StackNavigation as MoviesNavStackNavigation };
