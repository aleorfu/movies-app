import { View, useColorScheme } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/tailwindColors";

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
        text="Sign-In"
        onPress={() => {
          signIn(email, password, navigation);
          setEmail("");
          setPassword("");
        }}
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
      />
      <Button
        text="I forgot the password"
        buttonClassName="mx-5 my-3"
        textClassName={
          isLight
            ? "text-quaternary_light text-md font-bold"
            : "text-quaternary_dark text-md font-bold"
        }
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
