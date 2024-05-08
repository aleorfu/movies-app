import { Signal, useSignal } from "@preact/signals-react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@src/components/Button";
import { ProfileNavStackNavigation } from "@src/navigations/ProfileNav";
import { colors } from "@src/styles/tailwindColors";
import { useColorScheme } from "nativewind";
import { Alert, TextInput, View } from "react-native";

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

const signIn = async (email: string, password: string): Promise<void> => {
  await auth().signInWithEmailAndPassword(email, password);
};

const recoverPassword = async (email: string): Promise<void> => {
  await auth().sendPasswordResetEmail(email);
};

const SignInScreen = (): React.JSX.Element => {
  const email: Signal<string> = useSignal<string>("");
  const password: Signal<string> = useSignal<string>("");
  const { colorScheme } = useColorScheme();
  const navigation: ProfileNavStackNavigation =
    useNavigation() as ProfileNavStackNavigation;
  const isLight: boolean = colorScheme === "light";

  return (
    <View className={styles.view}>
      <TextInput
        className={styles.textInput}
        keyboardType="email-address"
        onChangeText={(text) => (email.value = text)}
        value={email.value}
        placeholder="Email"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <TextInput
        className={styles.textInput}
        secureTextEntry={true}
        onChangeText={(text) => (password.value = text)}
        value={password.value}
        placeholder="Password"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <Button
        text="Sign-In"
        onPress={async () => {
          if (email.value != "" && password.value != "") {
            await signIn(email.value, password.value)
              .then(() => {
                email.value = "";
                password.value = "";
                navigation.goBack();
              })
              .catch(() => {
                Alert.alert(
                  "There was an error while signing you in.",
                  "Please, verify your credentials and try again."
                );
              });
          } else
            Alert.alert(
              "One or more fields are empty.",
              "Please, fill every field and try again."
            );
        }}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
      />
      <Button
        text="I forgot the password"
        buttonClassName={styles.button.noBgButton}
        textClassName={styles.button.text}
        onPress={async () => {
          if (email.value != "") {
            await recoverPassword(email.value)
              .then(() => {
                email.value = "";
                password.value = "";
              })
              .catch(() => {
                Alert.alert(
                  "There was an error while sending your password recovery email.",
                  "Please, try again later."
                );
              });
          } else
            Alert.alert(
              "Email field is empty.",
              "Please, fill it and try again."
            );
        }}
      />
    </View>
  );
};

export { SignInScreen };
