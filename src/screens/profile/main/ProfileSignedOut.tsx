import { Button } from "../../../components/Button";
import { ProfileNavStackNavigation } from "../../../navigations/ProfileNav";
import { useNavigation } from "@react-navigation/native";
import { Fragment } from "react";

const style = {
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const ProfileSignedOut = (): React.JSX.Element => {
  const navigation: ProfileNavStackNavigation =
    useNavigation() as ProfileNavStackNavigation;

  return (
    <Fragment>
      <Button
        text="Sign-In"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={() => {
          navigation.navigate("ProfileSign-InStack", {});
        }}
      />
      <Button
        text="Sign-Up"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={() => {
          navigation.navigate("ProfileSign-UpStack", {});
        }}
      />
    </Fragment>
  );
};

export { ProfileSignedOut };
