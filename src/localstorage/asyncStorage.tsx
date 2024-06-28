import AsyncStorage from "@react-native-async-storage/async-storage";

const saveSubscribed = async (value: boolean): Promise<void | never> => {
  await AsyncStorage.setItem("subscribed", JSON.stringify(value));
};

const getSubscribed = async (): Promise<boolean | never> => {
  const data: string | null = await AsyncStorage.getItem("subscribed");
  return data ? JSON.parse(data) : false;
};

export { saveSubscribed, getSubscribed };
