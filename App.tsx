import { SafeAreaView } from "react-native-safe-area-context";
import { MainNav } from "./app/src/navigations/MainNav";
import { PermissionsAndroid, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "./app/src/styles/tailwindColors";
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
  const isLight = useColorScheme() === "light";
  return (
    <SafeAreaView
      style={
        isLight
          ? { flex: 1, backgroundColor: colors.primary_light }
          : { flex: 1, backgroundColor: colors.primary_dark }
      }
    >
      <MainNav />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
