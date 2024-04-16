import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { MovieListScreen } from "../screens/movies_related/MovieListScreen";
import { MovieDetailsScreen } from "../screens/movies_related/MovieDetailsScreen";
import { colors } from "../styles/tailwindColors";
import { images } from "../constants/images";
import { Component, ComponentType, ReactNode } from "react";

export default class MovieDetailsNav extends Component {
  private Stack: any;

  constructor(props: {}) {
    super(props);

    this.Stack = createStackNavigator();
  }

  private getStackScreen(name: string, component: ComponentType) {
    return (
      <this.Stack.Screen
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
  }

  public render(): ReactNode {
    return (
      <this.Stack.Navigator>
        {this.getStackScreen("List", MovieListScreen as ComponentType)}
        {this.getStackScreen("Details", MovieDetailsScreen as ComponentType)}
      </this.Stack.Navigator>
    );
  }
}
