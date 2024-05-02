import { Fragment } from "react";
import auth from "@react-native-firebase/auth";
import { joinClassNames } from "../../../utils/styleExtras";
import { Text } from "react-native";
import { Button } from "../../../components/Button";

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

  public static getEmailStyle(): string {
    const commonStyle: string = "text-lg my-3 text-center";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const ProfileSignedOut = (): React.JSX.Element => {
  return (
    <Fragment>
      <Text className={LocalStyle.getEmailStyle()}>
        {auth().currentUser?.email}
      </Text>
      <Button
        text="Sign-Out"
        buttonClassName={LocalStyle.getButtonStyle()}
        textClassName={LocalStyle.getTextStyle()}
        onPress={() => {
          auth().signOut();
        }}
      />
    </Fragment>
  );
};

export { ProfileSignedOut };
