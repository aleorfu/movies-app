import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@src/screens/HomeScreen";
import { ProfileStackNav } from "@src/navigations/ProfileStackNav";
import { MoviesNav } from "@src/navigations/MoviesNav";
import { colors } from "@src/styles/tailwindColors";
import React from "react";
import Home from "@src/assets/img/home-icon.svg";
import List from "@src/assets/img/list-icon.svg";
import Profile from "@src/assets/img/profile-icon.svg";

const Tab = createBottomTabNavigator();

const getOptions = (
  isLight: boolean,
  title: string,
  icon: React.JSX.Element,
  headerShown: boolean = true,
): BottomTabNavigationOptions => {
  return {
    title: title,
    tabBarIcon: () => icon,
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
    headerTitleAlign: "center",
    headerShown: headerShown,
  };
};

const MainNav = (): React.JSX.Element => {
  const isLight = useColorScheme() === "light";
  const iconColor = isLight ? colors.quaternary_light : colors.quaternary_dark;

  const HomeIcon = <Home width={30} height={30} color={iconColor} />;
  const ListIcon = <List width={30} height={30} color={iconColor} />;
  const ProfileIcon = <Profile width={20} height={20} color={iconColor} />;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={getOptions(isLight, "Home", HomeIcon)}
        />
        <Tab.Screen
          name="MoviesTab"
          component={MoviesNav}
          options={getOptions(isLight, "Movies", ListIcon, false)}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNav}
          options={getOptions(isLight, "Profile", ProfileIcon, false)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { MainNav };
