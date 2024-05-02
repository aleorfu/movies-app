import { joinClassNames } from "../../../utils/styleExtras";
import { Button } from "../../../components/Button";
import { ProfileNavStackNavigation } from "../../../navigations/ProfileNav";
import { useNavigation } from "@react-navigation/native";
import { Fragment } from "react";

class LocalStyle {
  public static getButtonStyle(): string {
    const commonStyle: string = "mx-8 rounded-md p-3 my-2 shadow-lg";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTextStyle(): string {
    const commonStyle: string = "text-lg font-bold text-center";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const ProfileSignedIn = (): React.JSX.Element => {
  const navigation: ProfileNavStackNavigation =
    useNavigation() as ProfileNavStackNavigation;

  return (
    <Fragment>
      <Button
        text="Sign-In"
        buttonClassName={LocalStyle.getButtonStyle()}
        textClassName={LocalStyle.getTextStyle()}
        onPress={() => {
          navigation.navigate("ProfileSign-InStack", {});
        }}
      />
      <Button
        text="Sign-Up"
        buttonClassName={LocalStyle.getButtonStyle()}
        textClassName={LocalStyle.getTextStyle()}
        onPress={() => {
          navigation.navigate("ProfileSign-UpStack", {});
        }}
      />
    </Fragment>
  );
};

export { ProfileSignedIn };
