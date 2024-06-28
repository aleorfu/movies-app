import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileNav } from "./ProfileNav";
import { MoviesNav } from "./MoviesNav";
import { Image, useColorScheme } from "react-native";
import { colors } from "../styles/tailwindColors";

const Tab = createBottomTabNavigator();

const getOptions = (
  isLight: boolean,
  title: string,
  icon: number,
  headerShown: boolean = true
): BottomTabNavigationOptions => {
  return {
    title: title,
    tabBarIcon: () => (
      <Image
        source={icon}
        className="w-6 h-6"
        style={
          isLight
            ? { tintColor: colors.quaternary_light }
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
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={getOptions(
            isLight,
            "Home",
            require("../assets/img/home-icon.png")
          )}
        />
        <Tab.Screen
          name="MoviesTab"
          component={MoviesNav}
          options={getOptions(
            isLight,
            "Movies",
            require("../assets/img/list-icon.png"),
            false
          )}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileNav}
          options={getOptions(
            isLight,
            "Profile",
            require("../assets/img/profile-icon.png"),
            false
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { MainNav };
