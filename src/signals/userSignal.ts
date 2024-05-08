import { Signal, signal } from "@preact/signals-react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const user: Signal<FirebaseAuthTypes.User | null> =
  signal<FirebaseAuthTypes.User | null>(null);

auth().onAuthStateChanged((newUser) => {
  user.value = newUser;
});

export { user };
