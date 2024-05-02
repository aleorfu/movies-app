import { Fragment, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavStackNavigation } from "../../navigations/ProfileNav";
import auth from "@react-native-firebase/auth";
import { joinClassNames } from "../../utils/styleExtras";

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

  public static getViewStyle(): string {
    const commonStyle: string = "flex-1 justify-center";
    const lightStyle: string = "bg-secondary_light";
    const darkStyle: string = "bg-secondary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getEmailStyle(): string {
    const commonStyle: string = "text-lg my-3 text-center";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const ProfileScreen = () => {
  const [user, setUser] = useState(auth().currentUser);
  const navigation: ProfileNavStackNavigation =
    useNavigation() as ProfileNavStackNavigation;
  auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return (
    <View className={LocalStyle.getViewStyle()}>
      {!user ? (
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
      ) : (
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
      )}
    </View>
  );
};

export { ProfileScreen };
