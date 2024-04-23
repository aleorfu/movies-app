import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

const textInputClassName =
  "text-primary_color bg-quaternary_color mx-5 my-3 p-3 rounded-md";

const signIn = (email: string, password: string) => {
  if (email != "" && password != "")
    auth().signInWithEmailAndPassword(email, password);
};

const recoverPassword = (email: string) => {
  auth().sendPasswordResetEmail(email);
};

const SignInScreen = () => {
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
        text="Sign-In"
        onPress={() => {
          signIn(email, password);
          setEmail("");
          setPassword("");
        }}
        buttonClassName="bg-tertiary_color p-3 mx-5 my-3 rounded-md"
        textClassName="text-quaternary_color"
      />
      <Button
        text="I forgot the password"
        buttonClassName="mx-5 my-3"
        textClassName="text-quaternary_color"
        onPress={() => {
          recoverPassword(email);
          setEmail("");
        }}
      />
    </View>
  );
};

export { SignInScreen };
