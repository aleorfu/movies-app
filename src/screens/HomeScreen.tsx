import messaging from "@react-native-firebase/messaging";
import { Button } from "@src/components/Button";
import { getSubscribed, saveSubscribed } from "@src/localstorage/asyncStorage";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Signal, useSignal } from "@preact/signals-react";
import Element = React.JSX.Element;

const styles = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const toggleSubscribed = (
  isSubscribedSignal: Signal<boolean>,
  loadingSignal: Signal<boolean>,
): void => {
  const topic = "alten_cantera_2024";
  const action = isSubscribedSignal.value
    ? messaging().unsubscribeFromTopic(topic)
    : messaging().subscribeToTopic(topic);

  loadingSignal.value = true;

  const handleActionSuccess = (): void => {
    const newValue = !isSubscribedSignal.value;

    const handleSavingSuccess = (): void => {
      isSubscribedSignal.value = newValue;
    };

    const handleSavingFailure = (): void => {
      Alert.alert(
        "There was an error while saving your subscription state.",
        "Please, try again later",
      );
    };

    saveSubscribed(newValue)
      .then(handleSavingSuccess)
      .catch(handleSavingFailure);
  };

  const handleActionFailure = (): void => {
    Alert.alert(
      "There was an error while sending your subscription state.",
      "Please, try again later.",
    );
  };

  const handleActionFinally = (): void => {
    loadingSignal.value = false;
  };

  action
    .then(handleActionSuccess)
    .catch(handleActionFailure)
    .finally(handleActionFinally);
};

const HomeScreen = (): Element => {
  const isSubscribedSignal = useSignal(false);
  const loadingSignal = useSignal(false);

  const handleOnPress = (): void => {
    toggleSubscribed(isSubscribedSignal, loadingSignal);
  };

  useEffect(() => {
    loadingSignal.value = true;

    const handleGetSubscribedSuccess = (newValue: boolean): void => {
      isSubscribedSignal.value = newValue;
    };

    const handleGetSubscribedFailure = (): void => {
      Alert.alert(
        "There was an error while getting your subscription state.",
        "Please, try again later.",
      );
    };

    const handleGetSubscribedFinally = (): void => {
      loadingSignal.value = false;
    };

    getSubscribed()
      .then(handleGetSubscribedSuccess)
      .catch(handleGetSubscribedFailure)
      .finally(handleGetSubscribedFinally);
  }, []);

  return (
    <View className={styles.view}>
      <Button
        text={isSubscribedSignal.value ? "Unsubscribe" : "Subscribe"}
        buttonClassName={styles.button.button}
        textClassName={styles.button.text}
        onPress={handleOnPress}
        loading={loadingSignal.value}
      />
    </View>
  );
};

export { HomeScreen };
