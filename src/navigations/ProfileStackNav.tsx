import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@src/screens/profile/SignInScreen";
import { SignUpScreen } from "@src/screens/profile/SignUpScreen";
import React from "react";
import { getOptions } from "@src/utils/StackNavigationUtils";
import { ProfileScreen } from "@src/screens/profile/ProfileScreen";

type ScreenNames =
  | "ProfileProfileStack"
  | "ProfileSign-InStack"
  | "ProfileSign-UpStack";
type RootStackParamList = Record<ScreenNames, {}>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const ProfileStackNav = (): React.JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileProfileStack"
        component={ProfileScreen}
        options={getOptions("Profile", false)}
      />
      <Stack.Screen
        name="ProfileSign-InStack"
        component={SignInScreen}
        options={getOptions("Sign-In", false)}
      />
      <Stack.Screen
        name="ProfileSign-UpStack"
        component={SignUpScreen}
        options={getOptions("Sign-Up", false)}
      />
    </Stack.Navigator>
  );
};

export {
  ProfileStackNav,
  StackNavigation as ProfileNavStackNavigation,
  ScreenNames,
};
