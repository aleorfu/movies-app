import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "../screens/profile/SignInScreen";
import { SignUpScreen } from "../screens/profile/SignUpScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { colors } from "../styles/tailwindColors";
import { Image, useColorScheme } from "react-native";
import { images } from "../constants/images";
import { ComponentType } from "react";
import { NavigationProp } from "@react-navigation/native";

type ScreenNames = [
  "ProfileProfileStack",
  "ProfileSign-InStack",
  "ProfileSign-UpStack"
];
type RootStackParamList = Record<ScreenNames[number], {}>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const getStackScreen = (
  name: string,
  title: string,
  component: ComponentType
) => {
  const isLight = useColorScheme() === "light";

  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{
        title: title,
        headerTitleAlign: "center",
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
        headerBackImage: () => (
          <Image
            style={
              isLight
                ? { tintColor: colors.quaternary_light }
                : { tintColor: colors.quaternary_dark }
            }
            className="w-6 h-6"
            source={images.back_icon}
          />
        ),
      }}
    />
  );
};

const ProfileNav = () => {
  return (
    <Stack.Navigator>
      {getStackScreen("ProfileProfileStack", "Profile", ProfileScreen)}
      {getStackScreen("ProfileSign-InStack", "Sign-In", SignInScreen)}
      {getStackScreen("ProfileSign-UpStack", "Sign-Up", SignUpScreen)}
    </Stack.Navigator>
  );
};

export { ProfileNav, StackNavigation as ProfileNavStackNavigation };
