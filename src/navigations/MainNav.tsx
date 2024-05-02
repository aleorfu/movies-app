import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { images } from "../constants/images";
import { ProfileNav } from "./ProfileNav";
import { MoviesNav } from "./MoviesNav";
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { colors } from "../styles/tailwindColors";
import { selectStyle } from "../utils/styleExtras";

const Tab = createBottomTabNavigator();

const getOptions = (
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
        style={selectStyle<ImageStyle>([
          { tintColor: colors.quaternary_light },
          { tintColor: colors.quaternary_dark },
        ])}
      />
    ),
    tabBarActiveTintColor: selectStyle<string>([
      colors.quaternary_light,
      colors.quaternary_dark,
    ]),
    tabBarInactiveTintColor: selectStyle<string>([
      colors.quaternary_light,
      colors.quaternary_dark,
    ]),
    tabBarInactiveBackgroundColor: selectStyle<string>([
      colors.primary_light,
      colors.primary_dark,
    ]),
    tabBarActiveBackgroundColor: selectStyle<string>([
      colors.secondary_light,
      colors.secondary_dark,
    ]),
    tabBarLabelStyle: { fontSize: 12 },
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
    headerTitleAlign: "center",
    headerShown: headerShown,
  };
};

const MainNav = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={getOptions("Home", images.home_icon)}
        />
        <Tab.Screen
          name="MoviesTab"
          component={MoviesNav}
          options={getOptions("Movies", images.list_icon, false)}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileNav}
          options={getOptions("Profile", images.profile_icon, false)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { MainNav };
