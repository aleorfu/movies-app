import { Component, ReactNode } from "react";
import MainBottomTabNav from "./app/src/navigations/MainBottomTabNav";
import auth from "@react-native-firebase/auth";

export default class App extends Component {
  private async authTest(email: string, password: string) {
    const user = await auth().signInWithEmailAndPassword(email, password);
    console.log(user);
  }

  public render(): ReactNode {
    return <MainBottomTabNav />;
  }
}
