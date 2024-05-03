import { Fragment } from "react";
import auth from "@react-native-firebase/auth";
import { Text } from "react-native";
import { Button } from "../../../components/Button";

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
  return (
    <Fragment>
      <Text className={style.email}>{auth().currentUser?.email}</Text>
      <Button
        text="Sign-Out"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={() => {
          auth().signOut();
        }}
      />
    </Fragment>
  );
};

export { ProfileSignedIn };
