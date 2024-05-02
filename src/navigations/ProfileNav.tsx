import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { SignInScreen } from "../screens/profile/SignInScreen";
import { SignUpScreen } from "../screens/profile/SignUpScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { colors } from "../styles/tailwindColors";
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { selectStyle } from "../utils/styleExtras";

type ScreenNames = [
  "ProfileProfileStack",
  "ProfileSign-InStack",
  "ProfileSign-UpStack"
];
type RootStackParamList = Record<ScreenNames[number], {}>;
type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

const getOptions = (title: string): StackNavigationOptions => {
  return {
    title: title,
    headerTitleAlign: "center",
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
    headerBackImage: () => (
      <Image
        style={selectStyle<ImageStyle>([
          { tintColor: colors.quaternary_light },
          { tintColor: colors.quaternary_dark },
        ])}
        className="w-6 h-6"
        source={require("../assets/img/back-icon.png")}
      />
    ),
  };
};

const ProfileNav = (): React.JSX.Element => {
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

export { ProfileNav, StackNavigation as ProfileNavStackNavigation };
