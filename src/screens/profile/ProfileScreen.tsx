import { useState } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import { ProfileSignedOut } from "./main/ProfileSignedOut";
import { ProfileSignedIn } from "./main/ProfileSignedIn";

const style = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
};

const ProfileScreen = () => {
  const [user, setUser] = useState(auth().currentUser);
  auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return (
    <View className={style.view}>
      {!user ? <ProfileSignedOut /> : <ProfileSignedIn />}
    </View>
  );
};

export { ProfileScreen };
