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
  title: string,
  component: ComponentType,
  icon: number,
  headerShown: boolean = true
) => {
  return (
    <Tab.Screen
      name={name}
      component={component}
      options={{
        title: title,
        tabBarIcon: () => (
          <Image
            source={icon}
            className="w-6 h-6"
            style={{
              tintColor: colors.quaternary_color,
            }}
          />
        ),
        tabBarActiveTintColor: colors.quaternary_color,
        tabBarInactiveTintColor: colors.quaternary_color,
        tabBarInactiveBackgroundColor: colors.primary_color,
        tabBarActiveBackgroundColor: colors.secondary_color,
        tabBarLabelStyle: { fontSize: 12 },
        headerStyle: {
          backgroundColor: colors.primary_color,
          shadowColor: "black",
        },
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
        {getTabScreen("HomeTab", "Home", HomeScreen, images.home_icon)}
        {getTabScreen(
          "MoviesTab",
          "Movies",
          MoviesNav,
          images.list_icon,
          false
        )}
        {getTabScreen(
          "ProfileTab",
          "Profile",
          ProfileNav,
          images.profile_icon,
          false
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { MainNav };
