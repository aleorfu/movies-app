import { View, useColorScheme } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/tailwindColors";
import { joinClassNames, selectStyle } from "../../utils/styleExtras";

class LocalStyle {
  public static getTextInputStyle(): string {
    const commonStyle: string = "mx-5 my-3 p-3 rounded-md shadow-lg";
    const lightStyle: string =
      "text-quaternary_light bg-primary_light shadow-black";
    const darkStyle: string =
      "text-quaternary_dark bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getViewStyle(): string {
    const commonStyle: string = "flex-1 justify-center";
    const lightStyle: string = "bg-secondary_light";
    const darkStyle: string = "bg-secondary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getButtonStyle(): string {
    const commonStyle: string = "p-3 mx-5 my-3 rounded-md shadow-lg";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getButtonTextStyle(): string {
    const commonStyle: string = "text-md font-bold text-center";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

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
    <View className={LocalStyle.getViewStyle()}>
      <TextInput
        className={LocalStyle.getTextInputStyle()}
        keyboardType="email-address"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
        placeholder="Email"
        placeholderTextColor={selectStyle([
          colors.quaternary_light,
          colors.quaternary_dark,
        ])}
      />
      <TextInput
        className={LocalStyle.getTextInputStyle()}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        placeholder="Password"
        placeholderTextColor={selectStyle([
          colors.quaternary_light,
          colors.quaternary_dark,
        ])}
      />
      <Button
        text="Sign-Up"
        buttonClassName={LocalStyle.getButtonStyle()}
        textClassName={LocalStyle.getButtonTextStyle()}
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
