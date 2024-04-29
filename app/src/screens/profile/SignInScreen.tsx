import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const textInputClassName =
  "text-quaternary_color bg-primary_color mx-5 my-3 p-3 rounded-md shadow-lg shadow-black";

const signIn = (email: string, password: string, navigation: any) => {
  if (email != "" && password != "") {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Signed in!");
      })
      .catch((error) => {
        console.log("Authentication error");
        console.error(error);
      });
    navigation.goBack();
  }
};

const recoverPassword = (email: string) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Reset password email sent!");
    })
    .catch((error) => {
      console.log("That email address doesn't exists!");
      console.error(error);
    });
};

const SignInScreen = () => {
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
        text="Sign-In"
        onPress={() => {
          signIn(email, password, navigation);
          setEmail("");
          setPassword("");
        }}
        buttonClassName="bg-primary_color p-3 mx-5 my-3 rounded-md shadow-lg shadow-black"
        textClassName="text-quaternary_color text-lg font-bold text-center"
      />
      <Button
        text="I forgot the password"
        buttonClassName="mx-5 my-3"
        textClassName="text-quaternary_color text-md font-bold"
        onPress={() => {
          recoverPassword(email);
          setEmail("");
          setPassword("");
        }}
      />
    </View>
  );
};

export { SignInScreen };
