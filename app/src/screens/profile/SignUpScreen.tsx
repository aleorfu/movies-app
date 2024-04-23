import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

const textInputClassName =
  "text-primary_color bg-quaternary_color mx-5 my-3 p-3 rounded-md";

const signUp = (email: string, password: string) => {
  if (email != "" && password != "")
    auth().createUserWithEmailAndPassword(email, password);
};

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex-1 bg-secondary_color justify-center">
      <TextInput
        className={textInputClassName}
        keyboardType="email-address"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
        placeholder="Email"
      />
      <TextInput
        className={textInputClassName}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        placeholder="Password"
      />
      <Button
        text="Sign-Up"
        buttonClassName="bg-tertiary_color p-3 mx-5 my-3 rounded-md"
        textClassName="text-quaternary_color"
        onPress={() => {
          signUp(email, password);
          setEmail("");
          setPassword("");
        }}
      />
    </View>
  );
};

export { SignUpScreen };
