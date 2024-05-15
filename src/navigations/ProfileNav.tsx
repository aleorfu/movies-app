import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@src/screens/profile/SignInScreen";
import { SignUpScreen } from "@src/screens/profile/SignUpScreen";
import { ProfileScreen } from "@src/screens/profile/ProfileScreen";
import React from "react";
import { getOptions } from "@src/utils/StackNavigationUtils";
import Element = React.JSX.Element;

type ScreenNames =
  | "ProfileProfileStack"
  | "ProfileSign-InStack"
  | "ProfileSign-UpStack";
type RootStackParamList = Record<ScreenNames, {}>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const ProfileNav = (): Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileProfileStack"
        component={ProfileScreen}
        options={getOptions("Profile")}
      />
      <Stack.Screen
        name="ProfileSign-InStack"
        component={SignInScreen}
        options={getOptions("Sign-In")}
      />
      <Stack.Screen
        name="ProfileSign-UpStack"
        component={SignUpScreen}
        options={getOptions("Sign-Up")}
      />
    </Stack.Navigator>
  );
};

export {
  ProfileNav,
  StackNavigation as ProfileNavStackNavigation,
  ScreenNames,
};
