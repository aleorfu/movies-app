import MainBottomTabNav from "./app/src/navigation/MainBottomTabNav";
import auth from "@react-native-firebase/auth";

async function authTest(email: string, password: string) {
  const user = await auth().signInWithEmailAndPassword(email, password);
  console.log(user);
}

export default function App() {
  return <MainBottomTabNav />;
}
