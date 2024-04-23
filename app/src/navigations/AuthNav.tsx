import { createStackNavigator } from "@react-navigation/stack";
import { StackScreen } from "../components/StackScreen";
import { SignInScreen } from "../screens/profile_related/SignInScreen";
import { SignUpScreen } from "../screens/profile_related/SignUpScreen";

const Stack = createStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator>
      <StackScreen Stack={Stack} name="Sign-In" component={SignInScreen} />
      <StackScreen Stack={Stack} name="Sign-Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export { AuthNav };
