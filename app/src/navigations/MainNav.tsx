import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { images } from "../constants/images";
import { ProfileNav } from "./ProfileNav";
import { MoviesNav } from "./MoviesNav";
import { Image, useColorScheme } from "react-native";
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
  const isLight = useColorScheme() === "light";

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
            style={
              isLight
                ? {
                    tintColor: colors.quaternary_light,
                  }
                : { tintColor: colors.quaternary_dark }
            }
          />
        ),
        tabBarActiveTintColor: isLight
          ? colors.quaternary_light
          : colors.quaternary_dark,
        tabBarInactiveTintColor: isLight
          ? colors.quaternary_light
          : colors.quaternary_dark,
        tabBarInactiveBackgroundColor: isLight
          ? colors.primary_light
          : colors.primary_dark,
        tabBarActiveBackgroundColor: isLight
          ? colors.secondary_light
          : colors.secondary_dark,
        tabBarLabelStyle: { fontSize: 12 },
        headerStyle: {
          backgroundColor: isLight ? colors.primary_light : colors.primary_dark,
          shadowColor: isLight ? "black" : "white",
        },
        headerTitleStyle: isLight
          ? { color: colors.quaternary_light }
          : { color: colors.quaternary_dark },
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
