import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const textInputClassName =
  "text-quaternary_color bg-primary_color mx-5 my-3 p-3 rounded-md shadow-lg shadow-black";

const signUp = (email: string, password: string, navigation: any) => {
  if (email != "" && password != "") {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");
        auth().currentUser?.sendEmailVerification();
        navigation.goBack();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  }
};

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
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
        buttonClassName="bg-primary_color p-3 mx-5 my-3 rounded-md shadow-lg shadow-black"
        textClassName="text-quaternary_color text-lg font-bold text-center"
        onPress={() => {
          signUp(email, password, navigation);
          setEmail("");
          setPassword("");
        }}
      />
    </View>
  );
};

export { SignUpScreen };
