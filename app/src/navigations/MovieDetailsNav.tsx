import { createStackNavigator } from "@react-navigation/stack";
import { MovieListScreen } from "../screens/movies_related/MovieListScreen";
import { StackScreen } from "../components/StackScreen";
import { MovieDetailsScreen } from "../screens/movies_related/MovieDetailsScreen";

const Stack = createStackNavigator();

const MovieDetailsNav = () => {
  return (
    <Stack.Navigator>
      <StackScreen Stack={Stack} name="List" component={MovieListScreen} />
      <StackScreen
        Stack={Stack}
        name="Details"
        component={MovieDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export { MovieDetailsNav };
