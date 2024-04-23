import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

const signUp = (email: string, password: string) => {
  if (email != "" && password != "")
    auth().createUserWithEmailAndPassword(email, password);
};

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
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
        text="Sign-Up"
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
