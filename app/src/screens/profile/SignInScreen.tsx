import { Button, Text, TouchableHighlight, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SignInScreen = () => {
  return (
    <View className="flex-1 bg-secondary_color">
      <TextInput keyboardType="email-address" />
      <TextInput secureTextEntry={true} />
      <Button title="Sign-In" />
      <TouchableHighlight>
        <Text className="text-quaternary_color">I forgot the password</Text>
      </TouchableHighlight>
    </View>
  );
};

export { SignInScreen };
