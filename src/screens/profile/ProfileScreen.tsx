import { ProfileSignedIn } from "@src/screens/profile/main/ProfileSignedIn";
import { ProfileSignedOut } from "@src/screens/profile/main/ProfileSignedOut";
import { user } from "@src/signals/userSignal";
import { View } from "react-native";

const style = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
};

const ProfileScreen = () => {
  const localUser = user.value;

  return (
    <View className={style.view}>
      {!localUser ? <ProfileSignedOut /> : <ProfileSignedIn />}
    </View>
  );
};

export { ProfileScreen };
