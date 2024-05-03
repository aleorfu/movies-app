import { SafeAreaView } from "react-native-safe-area-context";
import { MainNav } from "./src/navigations/MainNav";
import { PermissionsAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";

const style = {
  safeAreaView: "flex-1 bg-primary_light dark:bg-primary_dark",
};

const requestPermissions = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
};

const App = () => {
  requestPermissions();

  return (
    <SafeAreaView className={style.safeAreaView}>
      <MainNav />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
