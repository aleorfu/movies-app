import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { images } from "../constants/images";
import { ProfileNav } from "./ProfileNav";
import { MoviesNav } from "./MoviesNav";
import { Image } from "react-native";
import { colors } from "../styles/tailwindColors";
import { ComponentType } from "react";

const Tab = createBottomTabNavigator();

const getTabScreen = (
  name: string,
  component: ComponentType,
  icon: number,
  headerShown: boolean = true
) => {
  return (
    <Tab.Screen
      name={name}
      component={component}
      options={{
        title: name,
        tabBarIcon: ({ focused }: { focused: boolean }) => (
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
        headerShown: headerShown,
      }}
    />
  );
};

const MainNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {getTabScreen("Home", HomeScreen, images.home_icon)}
        {getTabScreen("Movies", MoviesNav, images.list_icon)}
        {getTabScreen("Profile", ProfileNav, images.profile_icon, false)}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { MainNav };
