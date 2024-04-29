import { Fragment, useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavStackNavigation } from "../../navigations/ProfileNav";
import auth from "@react-native-firebase/auth";

const ProfileScreen = () => {
  const [user, setUser] = useState(auth().currentUser);
  const isLight = useColorScheme() === "light";
  const navigation = useNavigation() as ProfileNavStackNavigation;
  auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  const buttonClassName = isLight
    ? "bg-primary_light mx-8 rounded-md p-3 my-2 shadow-lg shadow-black"
    : "bg-primary_dark mx-8 rounded-md p-3 my-2 shadow-lg shadow-white";
  const textClassName = isLight
    ? "text-quaternary_light text-lg font-bold text-center"
    : "text-quaternary_dark text-lg font-bold text-center";

  return (
    <View
      className={
        isLight
          ? "flex-1 bg-secondary_light justify-center"
          : "flex-1 bg-secondary_dark justify-center"
      }
    >
      {!user ? (
        <Fragment>
          <Button
            text="Sign-In"
            buttonClassName={buttonClassName}
            textClassName={textClassName}
            onPress={() => {
              navigation.navigate("ProfileSign-InStack", {});
            }}
          />
          <Button
            text="Sign-Up"
            buttonClassName={buttonClassName}
            textClassName={textClassName}
            onPress={() => {
              navigation.navigate("ProfileSign-UpStack", {});
            }}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Text
            className={
              isLight
                ? "text-quaternary_light text-lg my-3 text-center"
                : "text-quaternary_dark text-lg my-3 text-center"
            }
          >
            {auth().currentUser?.email}
          </Text>
          <Button
            text="Sign-Out"
            buttonClassName={buttonClassName}
            textClassName={textClassName}
            onPress={() => {
              auth().signOut();
              setUser(auth().currentUser);
            }}
          />
        </Fragment>
      )}
    </View>
  );
};

export { ProfileScreen };
