import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { Button } from "@src/components/Button";
import { getSubscribed, saveSubscribed } from "@src/localstorage/asyncStorage";

const styles = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const toggleSubscribed = async (subscribed: boolean): Promise<void> => {
  if (!subscribed) {
    await messaging()
      .subscribeToTopic("alten_cantera_2024")
      .then(async () => {
        await saveSubscribed(true);
      });
  } else {
    await messaging()
      .unsubscribeFromTopic("alten_cantera_2024")
      .then(async () => {
        await saveSubscribed(false);
      });
  }
};

const HomeScreen = (): React.JSX.Element => {
  const [isSubscribed, setSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSubscribed().then((value: boolean) => {
      setSubscribed(value);
    });
  }, []);

  return (
    <View className={styles.view}>
      <Button
        text={isSubscribed ? "Unsubscribe" : "Subscribe"}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        onPress={() => {
          setLoading(true);
          toggleSubscribed(isSubscribed)
            .then(() => {
              setSubscribed(!isSubscribed);
            })
            .catch(() => {
              Alert.alert(
                "There has been an error while subscribing or unsubscribing",
                "Please, try again later."
              );
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        loading={loading}
      />
    </View>
  );
};

export { HomeScreen };
