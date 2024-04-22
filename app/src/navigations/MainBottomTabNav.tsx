import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { MoviesScreen } from "../screens/MoviesScreen";
import { colors } from "../styles/tailwindColors";
import { images } from "../constants/images";
import { ComponentType } from "react";

const Tab = createBottomTabNavigator();

const getTabScreen = (name: string, component: ComponentType, icon: number) => {
  return (
    <Tab.Screen
      name={name}
      component={component}
      options={{
        title: name,
        tabBarIcon: ({ focused }) => (
          <Image
            source={icon}
            className="w-6 h-6"
            style={{
              tintColor: focused
                ? colors.tertiary_color
                : colors.quaternary_color,
            }}
          />
        ),
        tabBarActiveTintColor: colors.tertiary_color,
        tabBarInactiveTintColor: colors.quaternary_color,
        tabBarInactiveBackgroundColor: colors.secondary_color,
        tabBarActiveBackgroundColor: colors.primary_color,
        headerStyle: { backgroundColor: colors.primary_color },
        headerTitleStyle: { color: colors.quaternary_color },
        headerTitleAlign: "center",
      }}
    />
  );
};

const MainBottom = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {getTabScreen("Home", HomeScreen, images.home_icon)}
        {getTabScreen("Movies", MoviesScreen, images.list_icon)}
        {getTabScreen("Profile", ProfileScreen, images.profile_icon)}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { MainBottom };
