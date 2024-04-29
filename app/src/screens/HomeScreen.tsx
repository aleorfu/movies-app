import { View } from "react-native";
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

  useEffect(() => {
    getSubscribed().then((value: boolean) => {
      setSubscribed(value);
    });
  }, [setSubscribed, getSubscribed]);

  return (
    <View className="flex-1 bg-secondary_color justify-center">
      <Button
        text={isSubscribed ? "Unsubscribe" : "Subscribe"}
        buttonClassName="bg-primary_color mx-8 rounded-md p-3 my-2 shadow-lg shadow-black"
        textClassName="text-quaternary_color text-lg font-bold text-center"
        onPress={() => {
          toggleSubscribed(setSubscribed);
        }}
      />
    </View>
  );
};

export { HomeScreen };
