import { SafeAreaView } from "react-native-safe-area-context";
import { MainNav } from "./src/navigations/MainNav";
import { PermissionsAndroid, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { joinClassNames, setIsLight } from "./src/utils/styleExtras";

class LocalStyle {
  public static getSafeAreaView(): string {
    const commonStyle: string = "flex-1";
    const lightStyle: string = "bg-primary_light";
    const darkStyle: string = "bg-primary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const requestPermissions = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
};

const App = () => {
  requestPermissions();
  setIsLight(useColorScheme() === "light");

  return (
    <SafeAreaView className={LocalStyle.getSafeAreaView()}>
      <MainNav />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
