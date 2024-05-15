import { useNavigation } from "@react-navigation/native";
import { Button } from "@src/components/Button";
import {
  ProfileNavStackNavigation,
  ScreenNames,
} from "@src/navigations/ProfileNav";
import React, { Fragment } from "react";

const style = {
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const navigateToPage = (
  page: ScreenNames,
  navigation: ProfileNavStackNavigation,
): void => {
  navigation.navigate(page, {});
};

const ProfileSignedOut = (): React.JSX.Element => {
  const navigation = useNavigation() as ProfileNavStackNavigation;

  const handleSignInButtonOnPress = (): void => {
    navigateToPage("ProfileSign-InStack", navigation);
  };

  const handleSignOutButtonOnPress = (): void => {
    navigateToPage("ProfileSign-UpStack", navigation);
  };

  return (
    <Fragment>
      <Button
        text="Sign-In"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={handleSignInButtonOnPress}
      />
      <Button
        text="Sign-Up"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={handleSignOutButtonOnPress}
      />
    </Fragment>
  );
};

export { ProfileSignedOut };
