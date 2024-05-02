import { useState } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import { joinClassNames } from "../../utils/styleExtras";
import { ProfileSignedIn } from "./main/ProfileSignedIn";
import { ProfileSignedOut } from "./main/ProfileSignedOut";

class LocalStyle {
  public static getViewStyle(): string {
    const commonStyle: string = "flex-1 justify-center";
    const lightStyle: string = "bg-secondary_light";
    const darkStyle: string = "bg-secondary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const ProfileScreen = () => {
  const [user, setUser] = useState(auth().currentUser);
  auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return (
    <View className={LocalStyle.getViewStyle()}>
      {!user ? <ProfileSignedIn /> : <ProfileSignedOut />}
    </View>
  );
};

export { ProfileScreen };
