import { View } from "react-native";
import { Button } from "../components/Button";
import messaging from "@react-native-firebase/messaging";
import { getSubscribed, saveSubscribed } from "../localstorage/asyncStorage";
import { useEffect, useState } from "react";
import { joinClassNames } from "../utils/styleExtras";

class LocalStyle {
  public static getViewStyle(): string {
    const commonStyle: string = "flex-1 justify-center";
    const lightStyle: string = "bg-secondary_light";
    const darkStyle: string = "bg-secondary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getButtonStyle(): string {
    const commonStyle: string = "mx-8 rounded-md p-3 my-2 shadow-lg";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getButtonTextStyle(): string {
    const commonStyle = "text-lg font-bold text-center";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const toggleSubscribed = (
  setSubscribed: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  getSubscribed().then((value: boolean) => {
    const newValue = !value;
    saveSubscribed(newValue).then(() => {
      setSubscribed(newValue);
      if (newValue) {
        messaging().subscribeToTopic("alten_cantera_2024");
        console.log('Subscribed to "alten_cantera_2024"');
      } else {
        messaging().unsubscribeFromTopic("alten_cantera_2024");
        console.log('Unsubscribed from "alten_cantera_2024"');
      }
    });
  });
};

const HomeScreen = (): React.JSX.Element => {
  const [isSubscribed, setSubscribed] = useState(false);

  useEffect(() => {
    getSubscribed().then((value: boolean) => {
      setSubscribed(value);
    });
  }, [setSubscribed, getSubscribed]);

  return (
    <View className={LocalStyle.getViewStyle()}>
      <Button
        text={isSubscribed ? "Unsubscribe" : "Subscribe"}
        buttonClassName={LocalStyle.getButtonStyle()}
        textClassName={LocalStyle.getButtonTextStyle()}
        onPress={() => {
          toggleSubscribed(setSubscribed);
        }}
      />
    </View>
  );
};

export { HomeScreen };
