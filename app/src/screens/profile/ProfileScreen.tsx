import { Fragment, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavStackNavigation } from "../../navigations/ProfileNav";
import auth from "@react-native-firebase/auth";

const buttonClassName = "bg-tertiary_color mx-8 rounded-md p-3 my-2";
const textClassName = "text-quaternary_color text-lg ";

const ProfileScreen = () => {
  const [user, setUser] = useState(auth().currentUser);
  const navigation = useNavigation() as ProfileNavStackNavigation;
  auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return (
    <View className="flex-1 bg-secondary_color justify-center ">
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
          <Text className="text-quaternary_color text-lg my-3 text-center">
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
