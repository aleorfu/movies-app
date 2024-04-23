import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "../screens/profile/SignInScreen";
import { SignUpScreen } from "../screens/profile/SignUpScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { colors } from "../styles/tailwindColors";
import { Image } from "react-native";
import { images } from "../constants/images";
import { ComponentType } from "react";

const Stack = createStackNavigator();

const getStackScreen = (name: string, component: ComponentType) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary_color },
        headerTitleStyle: { color: colors.quaternary_color },
        headerBackImage: () => (
          <Image className="w-6 h-6" source={images.back_icon} />
        ),
      }}
    />
  );
};

const ProfileNav = () => {
  return (
    <Stack.Navigator>
      {getStackScreen("Profile", ProfileScreen)}
      {getStackScreen("Sign-In", SignInScreen)}
      {getStackScreen("Sign-Up", SignUpScreen)}
    </Stack.Navigator>
  );
};

export { ProfileNav };
