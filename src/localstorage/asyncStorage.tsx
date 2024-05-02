import AsyncStorage from "@react-native-async-storage/async-storage";

const saveSubscribed = async (value: boolean): Promise<void | never> => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem("subscribed", data);
  } catch (error) {
    throw new Error(
      `There has been an error while setting "subscribed" to ${value}:\n\t${error}`
    );
  }
};

const getSubscribed = async (): Promise<boolean | never> => {
  try {
    const data = await AsyncStorage.getItem("subscribed");
    return data ? JSON.parse(data, Boolean) : false;
  } catch (error) {
    throw new Error(
      `There has been an error while getting "subscribed":\n\t${error}`
    );
  }
};

export { saveSubscribed, getSubscribed };
