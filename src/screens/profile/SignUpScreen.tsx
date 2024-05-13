import { Signal, useSignal } from "@preact/signals-react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@src/components/Button";
import { setUserData, UserDataType } from "@src/services/firebase";
import { colors } from "@src/styles/tailwindColors";
import { Alert, TextInput, useColorScheme, View } from "react-native";

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

const signUp = async (email: string, password: string): Promise<void> => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials: FirebaseAuthTypes.UserCredential): void => {
      const userData: UserDataType = {
        displayName: "",
        surname: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
      };
      setUserData(userCredentials.user.uid, userData);
    });
};

const SignUpScreen = () => {
  const emailSignal: Signal<string> = useSignal<string>("");
  const passwordSignal: Signal<string> = useSignal<string>("");
  const loadingSignal: Signal<boolean> = useSignal<boolean>(false);

  const navigation = useNavigation();
  const isLight: boolean = useColorScheme() === "light";

  return (
    <View className={styles.view}>
      <TextInput
        className={styles.textInput}
        keyboardType="email-address"
        onChangeText={(text: string): void => {
          emailSignal.value = text;
        }}
        value={emailSignal.value}
        placeholder="Email"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <TextInput
        className={styles.textInput}
        secureTextEntry={true}
        onChangeText={(text: string): void => {
          passwordSignal.value = text;
        }}
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
        onPress={async (): Promise<void> => {
          if (emailSignal.value != "" && passwordSignal.value != "") {
            loadingSignal.value = true;
            await signUp(emailSignal.value, passwordSignal.value)
              .then((): void => {
                emailSignal.value = "";
                passwordSignal.value = "";
                auth().currentUser?.sendEmailVerification();
                navigation.goBack();
              })
              .catch((error): void => {
                if (error.code === "auth/email-already-in-use") {
                  Alert.alert(
                    "That email is already in use.",
                    "Please, try again with another one.",
                  );
                } else if (error.code === "auth/invalid-email") {
                  Alert.alert(
                    "That email is invalid.",
                    "Please, try again with another one.",
                  );
                }
              })
              .finally((): void => {
                loadingSignal.value = false;
              });
          } else
            Alert.alert(
              "One or more fields are empty.",
              "Please, fill every field and try again.",
            );
        }}
        loading={loadingSignal.value}
      />
    </View>
  );
};

export { SignUpScreen };
