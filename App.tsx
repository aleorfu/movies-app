import { MainNav } from "./app/src/navigations/MainNav";
import { PermissionsAndroid } from "react-native";
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
  return <MainNav />;
};

export default App;
