import { Signal, signal } from "@preact/signals-react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const getUserSignal: Signal<FirebaseAuthTypes.User | null> =
  signal<FirebaseAuthTypes.User | null>(null);

auth().onAuthStateChanged((newUser: FirebaseAuthTypes.User | null): void => {
  getUserSignal.value = newUser;
});

export { getUserSignal };
