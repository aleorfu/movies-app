import { Signal, useSignal } from "@preact/signals-react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@src/components/Button";
import { ProfileNavStackNavigation } from "@src/navigations/ProfileStackNav";
import { colors } from "@src/styles/tailwindColors";
import { Alert, TextInput, useColorScheme, View } from "react-native";
import React from "react";

const styles = {
  textInput:
    "mx-5 my-3 p-3 rounded-md shadow-lg text-quaternary_light bg-primary_light shadow-black dark:text-quaternary_dark dark:bg-primary_dark dark:shadow-white",
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    button:
      "p-3 mx-5 my-3 rounded-md shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-md font-bold text-center text-quaternary_light dark:text-quaternary_dark",
    noBgButton: "mx-5 my-3",
  },
};

const signIn = (
  navigation: ProfileNavStackNavigation,
  emailSignal: Signal<string>,
  passwordSignal: Signal<string>,
  loadingSignal: Signal<boolean>,
): void => {
  if (emailSignal.value.trim() == "" || passwordSignal.value.trim() == "") {
    Alert.alert(
      "Email or password fields are empty.",
      "Please, try again later.",
    );
    return;
  }

  const handleSignInSuccess = (): void => {
    emailSignal.value = "";
    passwordSignal.value = "";
    navigation.goBack();
  };

  const handleSignInFailure = (): void => {
    Alert.alert(
      "There was an error while signing you in.",
      "Please, verify your credentials and try again.",
    );
  };

  const handleSignInFinally = (): void => {
    loadingSignal.value = false;
  };

  loadingSignal.value = true;

  auth()
    .signInWithEmailAndPassword(emailSignal.value, passwordSignal.value)
    .then(handleSignInSuccess)
    .catch(handleSignInFailure)
    .finally(handleSignInFinally);
};

const recoverPassword = (
  emailSignal: Signal<string>,
  passwordSignal: Signal<string>,
): void => {
  if (emailSignal.value.trim() === "") {
    Alert.alert("Email field is empty.", "Please, fill it and try again.");
    return;
  }

  const handlePasswordResetSuccess = (): void => {
    emailSignal.value = "";
    passwordSignal.value = "";
    Alert.prompt("An email has been sent to you.");
  };

  const handlePasswordResetFailure = (): void => {
    Alert.alert(
      "There was an error while sending your password recovery email.",
      "Please, try again later.",
    );
  };

  auth()
    .sendPasswordResetEmail(emailSignal.value)
    .then(handlePasswordResetSuccess)
    .catch(handlePasswordResetFailure);
};

const SignInScreen = (): React.JSX.Element => {
  const emailSignal = useSignal("");
  const passwordSignal = useSignal("");
  const loadingSignal = useSignal(false);
  const navigation = useNavigation() as ProfileNavStackNavigation;
  const isLight = useColorScheme() === "light";

  const handleOnChangeEmailText = (text: string): void => {
    emailSignal.value = text;
  };

  const handleOnChangePasswordText = (text: string): void => {
    passwordSignal.value = text;
  };

  const handleSignInButtonOnPress = (): void => {
    signIn(navigation, emailSignal, passwordSignal, loadingSignal);
  };

  const handleRecoverPasswordOnPress = (): void => {
    recoverPassword(emailSignal, passwordSignal);
  };

  return (
    <View className={styles.view}>
      <TextInput
        className={styles.textInput}
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={handleOnChangeEmailText}
        value={emailSignal.value}
        placeholder="Email"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <TextInput
        className={styles.textInput}
        secureTextEntry={true}
        onChangeText={handleOnChangePasswordText}
        value={passwordSignal.value}
        placeholder="Password"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <Button
        text="Sign-In"
        onPress={handleSignInButtonOnPress}
        loading={loadingSignal.value}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
      />
      <Button
        text="I forgot the password"
        buttonClassName={styles.button.noBgButton}
        textClassName={styles.button.text}
        onPress={handleRecoverPasswordOnPress}
      />
    </View>
  );
};

export { SignInScreen };
