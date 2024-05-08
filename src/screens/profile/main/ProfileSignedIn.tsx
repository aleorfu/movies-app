import auth from "@react-native-firebase/auth";
import { Button } from "@src/components/Button";
import { user } from "@src/signals/userSignal";
import { Fragment } from "react";
import { Alert, Text } from "react-native";

const style = {
  email:
    "text-lg my-3 text-center text-quaternary_light dark:text-quaternary_dark",
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const ProfileSignedIn = (): React.JSX.Element => {
  const localUser = user.value;

  return (
    <Fragment>
      <Text className={style.email}>{localUser?.email}</Text>
      <Button
        text="Sign-Out"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={async () => {
          await auth()
            .signOut()
            .catch(() => {
              Alert.alert(
                "There was an error while signing you out.",
                "Please, try again later."
              );
            });
        }}
      />
    </Fragment>
  );
};

export { ProfileSignedIn };
