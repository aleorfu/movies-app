import { Fragment, useState } from "react";
import { View } from "react-native";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavStackNavigation } from "../../navigations/ProfileNav";

const buttonClassName = "bg-tertiary_color mx-8 rounded-md p-3 my-2";
const textClassName = "text-quaternary_color text-lg ";

const ProfileScreen = () => {
  const [logged, setLogged] = useState(false);
  const navigation = useNavigation() as ProfileNavStackNavigation;

  return (
    <View className="flex-1 bg-secondary_color justify-center ">
      {!logged && (
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
      )}
    </View>
  );
};

export { ProfileScreen };
