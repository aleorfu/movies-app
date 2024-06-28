import messaging from "@react-native-firebase/messaging";
import { Button } from "@src/components/Button";
import { getSubscribed, saveSubscribed } from "@src/localstorage/asyncStorage";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Signal, useSignal } from "@preact/signals-react";

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
      .then(async (): Promise<void> => {
        await saveSubscribed(true);
      });
  } else {
    await messaging()
      .unsubscribeFromTopic("alten_cantera_2024")
      .then(async (): Promise<void> => {
        await saveSubscribed(false);
      });
  }
};

const HomeScreen = (): React.JSX.Element => {
  const isSubscribedSignal: Signal<boolean> = useSignal<boolean>(false);
  const loadingSignal: Signal<boolean> = useSignal<boolean>(false);

  useEffect((): void => {
    getSubscribed().then((value: boolean): void => {
      isSubscribedSignal.value = value;
    });
  }, []);

  return (
    <View className={styles.view}>
      <Button
        text={isSubscribedSignal.value ? "Unsubscribe" : "Subscribe"}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        onPress={(): void => {
          loadingSignal.value = true;
          toggleSubscribed(isSubscribedSignal.value)
            .then((): void => {
              isSubscribedSignal.value = !isSubscribedSignal.value;
            })
            .catch((): void => {
              Alert.alert(
                "There has been an error while subscribing or unsubscribing",
                "Please, try again later.",
              );
            })
            .finally((): void => {
              loadingSignal.value = false;
            });
        }}
        loading={loadingSignal.value}
      />
    </View>
  );
};

export { HomeScreen };
