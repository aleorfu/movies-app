import AsyncStorage from "@react-native-async-storage/async-storage";

const saveSubscribed = async (value: boolean) => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem("subscribed", json);
  } catch (error) {
    console.error(
      `There has been an error while setting "subscribed" to ${value}: ${error}`
    );
  }
};

const getSubscribed = async (): Promise<boolean | never> => {
  try {
    const json = await AsyncStorage.getItem("subscribed");
    return json ? JSON.parse(json) : undefined;
  } catch (error) {
    console.error(
      `There has been an error while getting "subscribed": ${error}`
    );
    throw error;
  }
};

export { saveSubscribed, getSubscribed };
