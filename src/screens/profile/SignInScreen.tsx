import { Alert, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/tailwindColors";
import { ProfileNavStackNavigation } from "../../navigations/ProfileNav";
import { useColorScheme } from "nativewind";

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

const SignInScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
          setLoading(true);
          signIn(email, password)
            .then(() => {
              navigation.goBack();
              setEmail("");
              setPassword("");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        loading={loading}
      />
      <Button
        text="I forgot the password"
        buttonClassName={styles.button.nobgButton}
        textClassName={styles.button.text}
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
