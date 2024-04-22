import { MainBottomTabNav } from "./app/src/navigations/MainBottomTabNav";
import auth from "@react-native-firebase/auth";

const authTest = async (email: string, password: string) => {
  const user = await auth().signInWithEmailAndPassword(email, password);
  console.log(user);
};

const App = () => {
  return <MainBottomTabNav />;
};

export default App;
