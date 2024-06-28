import { useColorScheme } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@src/screens/profile/SignInScreen";
import { SignUpScreen } from "@src/screens/profile/SignUpScreen";
import { ProfileScreen } from "@src/screens/profile/ProfileScreen";
import React from "react";
import { getOptions } from "@src/utils/StackNavigationUtils";

type ScreenNames = [
  "ProfileProfileStack",
  "ProfileSign-InStack",
  "ProfileSign-UpStack",
];
type RootStackParamList = Record<ScreenNames[number], {}>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const ProfileNav = (): React.JSX.Element => {
  const isLight: boolean = useColorScheme() == "light";

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileProfileStack"
        component={ProfileScreen}
        options={getOptions(isLight, "Profile")}
      />
      <Stack.Screen
        name="ProfileSign-InStack"
        component={SignInScreen}
        options={getOptions(isLight, "Sign-In")}
      />
      <Stack.Screen
        name="ProfileSign-UpStack"
        component={SignUpScreen}
        options={getOptions(isLight, "Sign-Up")}
      />
    </Stack.Navigator>
  );
};

export { ProfileNav, StackNavigation as ProfileNavStackNavigation };
