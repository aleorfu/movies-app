import { Text, TouchableHighlight, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

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
    <View className="flex-1 bg-secondary_color">
      <TextInput
        keyboardType="email-address"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <Button
        text="Sign-In"
        onPress={() => {
          signIn(email, password);
          setEmail("");
          setPassword("");
        }}
      />
      <Button
        text="I forgot the password"
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
