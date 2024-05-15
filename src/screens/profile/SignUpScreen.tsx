import { Signal, useSignal } from "@preact/signals-react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@src/components/Button";
import { colors } from "@src/styles/tailwindColors";
import { Alert, TextInput, useColorScheme, View } from "react-native";
import { ProfileNavStackNavigation } from "@src/navigations/ProfileNav";

const styles = {
  textInput:
    "mx-5 my-3 p-3 rounded-md shadow-lg text-quaternary_light bg-primary_light shadow-black dark:text-quaternary_dark dark:bg-primary_dark dark:shadow-white",
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    button:
      "p-3 mx-5 my-3 rounded-md shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-md font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const signUp = (
  navigation: ProfileNavStackNavigation,
  emailSignal: Signal<string>,
  passwordSignal: Signal<string>,
  loadingSignal: Signal<boolean>,
): void => {
  if (emailSignal.value.trim() == "" || passwordSignal.value.trim() == "") {
    Alert.alert(
      "Email or password fields are empty.",
      "Please, fill them and try again later.",
    );
    return;
  }

  const handleSignUpSuccess = (): void => {
    const handleEmailVerificationSendSuccess = (): void => {
      Alert.prompt("A verification email has been sent to you.");
    };

    const handleEmailVerificationSendFailure = (): void => {
      Alert.alert(
        "There was an error while sending your verification email.",
        "Please, try again later.",
      );
    };

    const handleEmailVerificationSendFinally = (): void => {
      emailSignal.value = "";
      passwordSignal.value = "";
      navigation.goBack();
    };

    auth()
      .currentUser?.sendEmailVerification()
      .then(handleEmailVerificationSendSuccess)
      .catch(handleEmailVerificationSendFailure)
      .finally(handleEmailVerificationSendFinally);
  };

  const handleSignUpFailure = (
    error: FirebaseAuthTypes.NativeFirebaseAuthError,
  ): void => {
    let errorTitle: string;

    if (error.code === "auth/email-already-in-use") {
      errorTitle = "That email is already in use.";
    } else if (error.code === "auth/invalid-email") {
      errorTitle = "That email is invalid.";
    } else {
      errorTitle = "There was an error while signing-up.";
    }

    Alert.alert(errorTitle, "Please, try again later");
  };

  const handleSignUpFinally = (): void => {
    loadingSignal.value = false;
  };

  loadingSignal.value = true;

  auth()
    .createUserWithEmailAndPassword(emailSignal.value, passwordSignal.value)
    .then(handleSignUpSuccess)
    .catch(handleSignUpFailure)
    .finally(handleSignUpFinally);
};

const SignUpScreen = (): React.JSX.Element => {
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

  const handleOnPress = (): void => {
    signUp(navigation, emailSignal, passwordSignal, loadingSignal);
  };

  return (
    <View className={styles.view}>
      <TextInput
        className={styles.textInput}
        keyboardType="email-address"
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
        text="Sign-Up"
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        onPress={handleOnPress}
        loading={loadingSignal.value}
      />
    </View>
  );
};

export { SignUpScreen };
