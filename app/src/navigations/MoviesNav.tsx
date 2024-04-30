import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { MovieListScreen } from "../screens/movies/MovieListScreen";
import { MovieDetailsScreen } from "../screens/movies/MovieDetailsScreen";
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { colors } from "../styles/tailwindColors";
import { images } from "../constants/images";
import { NavigationProp } from "@react-navigation/native";
import { selectStyle } from "../utils/styleExtras";

type ScreenNames = ["MovieListStack", "MovieDetailsStack"];
type RootStackParamList = Record<ScreenNames[number], { movieId?: string }>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const getOptions = (title: string): StackNavigationOptions => {
  return {
    title: title,
    headerTitleAlign: "center",
    headerStyle: selectStyle<ViewStyle>([
      {
        backgroundColor: colors.primary_light,
        shadowColor: "black",
      },
      {
        backgroundColor: colors.primary_dark,
        shadowColor: "white",
      },
    ]),
    headerTitleStyle: selectStyle<TextStyle>([
      { color: colors.quaternary_light },
      { color: colors.quaternary_dark },
    ]),
    headerBackImage: () => (
      <Image
        style={selectStyle<ImageStyle>([
          { tintColor: colors.quaternary_light },
          { tintColor: colors.quaternary_dark },
        ])}
        className="w-6 h-6"
        source={images.back_icon}
      />
    ),
  };
};

const MoviesNav = () => {
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

export { MoviesNav, StackNavigation as MoviesNavStackNavigation };
