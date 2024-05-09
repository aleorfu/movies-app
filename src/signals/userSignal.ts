import { Signal, signal } from "@preact/signals-react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import User = FirebaseAuthTypes.User;

type UserType = User | null;

const getUserSignal: Signal<UserType> = signal<UserType>(null);

auth().onAuthStateChanged((newUser: UserType): void => {
  getUserSignal.value = newUser;
});

export { getUserSignal, UserType };
