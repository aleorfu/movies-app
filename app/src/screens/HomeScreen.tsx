import { View, useColorScheme } from "react-native";
import { Button } from "../components/Button";
import messaging from "@react-native-firebase/messaging";
import { getSubscribed, saveSubscribed } from "../localstorage/asyncStorage";
import { useEffect, useState } from "react";

const toggleSubscribed = (
  setSubscribed: React.Dispatch<React.SetStateAction<boolean>>
) => {
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

const HomeScreen = () => {
  const [isSubscribed, setSubscribed] = useState(false);
  const isLight = useColorScheme() === "light";

  useEffect(() => {
    getSubscribed().then((value: boolean) => {
      setSubscribed(value);
    });
  }, [setSubscribed, getSubscribed]);

  return (
    <View
      className={
        isLight
          ? "flex-1 bg-secondary_light justify-center"
          : "flex-1 bg-secondary_dark justify-center"
      }
    >
      <Button
        text={isSubscribed ? "Unsubscribe" : "Subscribe"}
        buttonClassName={
          isLight
            ? "bg-primary_light mx-8 rounded-md p-3 my-2 shadow-lg shadow-black"
            : "bg-primary_dark mx-8 rounded-md p-3 my-2 shadow-lg shadow-white"
        }
        textClassName={
          isLight
            ? "text-quaternary_light text-lg font-bold text-center"
            : "text-quaternary_dark text-lg font-bold text-center"
        }
        onPress={() => {
          toggleSubscribed(setSubscribed);
        }}
      />
    </View>
  );
};

export { HomeScreen };
