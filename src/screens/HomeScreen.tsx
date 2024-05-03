import { View } from "react-native";
import { Button } from "../components/Button";
import messaging from "@react-native-firebase/messaging";
import { getSubscribed, saveSubscribed } from "../localstorage/asyncStorage";
import { useEffect, useState } from "react";

const styles = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

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
    <View className={styles.view}>
      <Button
        text={isSubscribed ? "Unsubscribe" : "Subscribe"}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        onPress={() => {
          toggleSubscribed(setSubscribed);
        }}
      />
    </View>
  );
};

export { HomeScreen };
