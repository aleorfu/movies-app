import React, { createContext, useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const UserContext = createContext<FirebaseAuthTypes.User | null>(null);

const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(setUser);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };