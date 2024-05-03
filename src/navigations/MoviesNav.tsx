import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { MovieListScreen } from "../screens/movies/MovieListScreen";
import { MovieDetailsScreen } from "../screens/movies/MovieDetailsScreen";
import { Image, useColorScheme } from "react-native";
import { colors } from "../styles/tailwindColors";
import { NavigationProp } from "@react-navigation/native";

type ScreenNames = ["MovieListStack", "MovieDetailsStack"];
type RootStackParamList = Record<ScreenNames[number], { movieId?: string }>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const getOptions = (
  isLight: boolean,
  title: string
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
        source={require("../assets/img/back-icon.png")}
      />
    ),
  };
};

const MoviesNav = (): React.JSX.Element => {
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

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
