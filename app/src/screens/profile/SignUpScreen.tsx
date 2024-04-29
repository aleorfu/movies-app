import { View, useColorScheme } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/tailwindColors";

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
  const isLight = useColorScheme() === "light";
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const textInputClassName = isLight
    ? "text-quaternary_light bg-primary_light mx-5 my-3 p-3 rounded-md shadow-lg shadow-black"
    : "text-quaternary_dark bg-primary_dark mx-5 my-3 p-3 rounded-md shadow-lg shadow-white";

  return (
    <View
      className={
        isLight
          ? "flex-1 bg-secondary_light justify-center"
          : "flex-1 bg-secondary_dark justify-center"
      }
    >
      <TextInput
        className={textInputClassName}
        keyboardType="email-address"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
        placeholder="Email"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <TextInput
        className={textInputClassName}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        placeholder="Password"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <Button
        text="Sign-Up"
        buttonClassName={
          isLight
            ? "bg-primary_light p-3 mx-5 my-3 rounded-md shadow-lg shadow-black"
            : "bg-primary_dark p-3 mx-5 my-3 rounded-md shadow-lg shadow-white"
        }
        textClassName={
          isLight
            ? "text-quaternary_light text-lg font-bold text-center"
            : "text-quaternary_dark text-lg font-bold text-center"
        }
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
