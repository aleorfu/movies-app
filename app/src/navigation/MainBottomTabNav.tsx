import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { MoviesScreen } from "../screens/MoviesScreen";
import { styles, colors } from "../styles/global";
import { images } from "../constants/images";

const Tab = createBottomTabNavigator();

function getTabScreen(name: string, component: any, icon: number) {
  return (
    <Tab.Screen
      name={name}
      component={component}
      options={{
        title: name,
        tabBarIcon: ({ focused }) => (
          <Image
            source={icon}
            className={styles.icon_size}
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
}

export default function MainBottomTabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {getTabScreen("Home", HomeScreen, images.home_icon)}
        {getTabScreen("Movies", MoviesScreen, images.list_icon)}
        {getTabScreen("Profile", ProfileScreen, images.profile_icon)}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
