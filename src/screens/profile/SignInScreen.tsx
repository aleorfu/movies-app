import { useState } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useColorScheme } from "nativewind";
import auth from "@react-native-firebase/auth";
import { Button } from "@src/components/Button";
import { colors } from "@src/styles/tailwindColors";
import { ProfileNavStackNavigation } from "@src/navigations/ProfileNav";

const styles = {
  textInput:
    "mx-5 my-3 p-3 rounded-md shadow-lg text-quaternary_light bg-primary_light shadow-black dark:text-quaternary_dark dark:bg-primary_dark dark:shadow-white",
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    button:
      "p-3 mx-5 my-3 rounded-md shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-md font-bold text-center text-quaternary_light dark:text-quaternary_dark",
    nobgButton: "mx-5 my-3",
  },
};

const signIn = async (email: string, password: string): Promise<void> => {
  await auth().signInWithEmailAndPassword(email, password);
};

const recoverPassword = async (email: string): Promise<void> => {
  await auth().sendPasswordResetEmail(email);
};

const SignInScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const { colorScheme } = useColorScheme();
  const navigation: ProfileNavStackNavigation =
    useNavigation() as ProfileNavStackNavigation;
  const isLight: boolean = colorScheme === "light";

  return (
    <View className={styles.view}>
      <TextInput
        className={styles.textInput}
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
        className={styles.textInput}
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
          if (email != "" && password != "") {
            setLoading1(true);
            signIn(email, password)
              .then(() => {
                setEmail("");
                setPassword("");
                navigation.goBack();
              })
              .catch(() => {
                Alert.alert(
                  "There was an error while signing you in.",
                  "Please, verify your credentials and try again."
                );
              })
              .finally(() => {
                setLoading1(false);
              });
          } else
            Alert.alert(
              "One or more fields are empty.",
              "Please, fill every field and try again."
            );
        }}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        loading={loading1}
      />
      <Button
        text="I forgot the password"
        buttonClassName={styles.button.nobgButton}
        textClassName={styles.button.text}
        onPress={() => {
          if (email != "") {
            setLoading2(true);
            recoverPassword(email)
              .then(() => {
                setEmail("");
                setPassword("");
              })
              .catch(() => {
                Alert.alert(
                  "There was an error while sending your password recovery email.",
                  "Please, try again later."
                );
              })
              .finally(() => {
                setLoading2(false);
              });
          } else
            Alert.alert(
              "Email field is empty.",
              "Please, fill it and try again."
            );
        }}
        loading={loading2}
      />
    </View>
  );
};

export { SignInScreen };
