import { createStackNavigator } from "@react-navigation/stack";
import { MovieListScreen } from "../screens/movies/MovieListScreen";
import { MovieDetailsScreen } from "../screens/movies/MovieDetailsScreen";
import { Image } from "react-native";
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
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{
        title: title,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary_color },
        headerTitleStyle: { color: colors.quaternary_color },
        headerBackImage: () => (
          <Image className="w-6 h-6" source={images.back_icon} />
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
