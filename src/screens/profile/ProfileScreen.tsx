import { useContext } from "react";
import { View } from "react-native";
import { ProfileSignedOut } from "@src/screens/profile/main/ProfileSignedOut";
import { ProfileSignedIn } from "@src/screens/profile/main/ProfileSignedIn";
import { UserContext } from "@src/contexts/UserContext";

const style = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
};

const ProfileScreen = () => {
  const user = useContext(UserContext);

  return (
    <View className={style.view}>
      {!user ? <ProfileSignedOut /> : <ProfileSignedIn />}
    </View>
  );
};

export { ProfileScreen };
