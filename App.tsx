// noinspection JSUnusedGlobalSymbols

import { MainNav } from "@src/navigations/MainNav";
import { StatusBar } from "expo-status-bar";
import { PermissionsAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const style = {
  safeAreaView: "flex-1 bg-primary_light dark:bg-primary_dark",
};

const requestPermissions = (): void => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
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
