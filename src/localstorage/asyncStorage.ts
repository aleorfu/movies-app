import AsyncStorage from "@react-native-async-storage/async-storage";

const SUBSCRIBED_KEY = "subscribed";

const saveSubscribed = async (value: boolean): Promise<void | never> => {
  try {
    const data = JSON.stringify(value);

    await AsyncStorage.setItem(SUBSCRIBED_KEY, data);
  } catch (error) {
    console.error(
      'There was an error while setting "subscribed" to %b on AsyncStorage: %s',
      [value, error],
    );

    throw error;
  }
};

const getSubscribed = async (): Promise<boolean | never> => {
  try {
    const data = await AsyncStorage.getItem(SUBSCRIBED_KEY);

    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error(
      'There was an error while getting "subscribed" from AsyncStorage: %s',
      error,
    );

    throw error;
  }
};

export { saveSubscribed, getSubscribed };
