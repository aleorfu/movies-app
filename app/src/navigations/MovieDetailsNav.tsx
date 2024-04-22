import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { MovieListScreen } from "../screens/movies_related/MovieListScreen";
import { MovieDetailsScreen } from "../screens/movies_related/MovieDetailsScreen";
import { colors } from "../styles/tailwindColors";
import { images } from "../constants/images";
import { ComponentType } from "react";

const Stack = createStackNavigator();

const getStackScreen = (name: string, component: ComponentType) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{
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

const MovieDetailsNav = () => {
  return (
    <Stack.Navigator>
      {getStackScreen("List", MovieListScreen as ComponentType)}
      {getStackScreen("Details", MovieDetailsScreen as ComponentType)}
    </Stack.Navigator>
  );
};

export { MovieDetailsNav };
