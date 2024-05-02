import { Alert, View, useColorScheme } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/tailwindColors";
import { ProfileNavStackNavigation } from "../../navigations/ProfileNav";
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

const signIn = async (email: string, password: string): Promise<void> => {
  if (email != "" && password != "") {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        Alert.alert("Invalid credentials", "Are email and password correct?");
      });
  } else {
    Alert.alert(
      "One or more textfields are empty",
      "Every textfield is required"
    );
  }
};

const recoverPassword = (email: string): void => {
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
  const navigation = useNavigation() as ProfileNavStackNavigation;

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
        placeholderTextColor={selectStyle<string>([
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
        placeholderTextColor={selectStyle<string>([
          colors.quaternary_light,
          colors.quaternary_dark,
        ])}
      />
      <Button
        text="Sign-In"
        onPress={() => {
          signIn(email, password).then(() => {
            navigation.goBack();
            setEmail("");
            setPassword("");
          });
        }}
        buttonClassName={LocalStyle.getButtonStyle()}
        textClassName={LocalStyle.getButtonTextStyle()}
      />
      <Button
        text="I forgot the password"
        buttonClassName="mx-5 my-3"
        textClassName={LocalStyle.getButtonTextStyle()}
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
