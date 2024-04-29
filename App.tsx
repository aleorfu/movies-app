import { SafeAreaView } from "react-native-safe-area-context";
import { MainNav } from "./app/src/navigations/MainNav";
import { PermissionsAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNav />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
