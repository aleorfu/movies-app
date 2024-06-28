import { Image, useColorScheme } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { SignInScreen } from "@src/screens/profile/SignInScreen";
import { SignUpScreen } from "@src/screens/profile/SignUpScreen";
import { ProfileScreen } from "@src/screens/profile/ProfileScreen";
import { colors } from "@src/styles/tailwindColors";

type ScreenNames = [
  "ProfileProfileStack",
  "ProfileSign-InStack",
  "ProfileSign-UpStack"
];
type RootStackParamList = Record<ScreenNames[number], {}>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const getOptions = (
  isLight: boolean,
  title: string
): StackNavigationOptions => {
  return {
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
        source={require("@src/assets/img/back-icon.png")}
      />
    ),
  };
};

const ProfileNav = (): React.JSX.Element => {
  const colorScheme = useColorScheme();
  const isLight = colorScheme == "light";

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
