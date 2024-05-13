import { Signal, useSignal } from "@preact/signals-react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@src/components/Button";
import { setUserData, UserDataType } from "@src/services/firebase";
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
  },
};

const signUp = async (email: string, password: string) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
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
  const email: Signal<string> = useSignal<string>("");
  const password: Signal<string> = useSignal<string>("");
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const isLight: boolean = colorScheme === "light";

  return (
    <View className={styles.view}>
      <TextInput
        className={styles.textInput}
        keyboardType="email-address"
        onChangeText={(text) => {
          email.value = text;
        }}
        value={email.value}
        placeholder="Email"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <TextInput
        className={styles.textInput}
        secureTextEntry={true}
        onChangeText={(text) => {
          password.value = text;
        }}
        value={password.value}
        placeholder="Password"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
      />
      <Button
        text="Sign-Up"
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        onPress={async () => {
          if (email.value != "" && password.value != "") {
            await signUp(email.value, password.value)
              .then(() => {
                email.value = "";
                password.value = "";
                auth().currentUser?.sendEmailVerification();
                navigation.goBack();
              })
              .catch((error) => {
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
              });
          } else
            Alert.alert(
              "One or more fields are empty.",
              "Please, fill every field and try again.",
            );
        }}
      />
    </View>
  );
};

export { SignUpScreen };
