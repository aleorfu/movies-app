import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";
import { ImagePickerAsset } from "expo-image-picker";

type UserDataType = {
  displayName: string;
  surname: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
};

const setUserData = async (
  uid: string,
  userData: UserDataType,
): Promise<void | never> => {
  const url = `/users/${uid}`;

  try {
    await database().ref(url).set(userData);
  } catch (error) {
    console.error("There was an error while setting your user data: %s", error);

    throw error;
  }
};

const getUserData = async (uid: string): Promise<UserDataType | never> => {
  const url = `/users/${uid}`;

  try {
    const data = await database().ref(url).once("value");

    return data.val() as UserDataType;
  } catch (error) {
    console.error("There was an error while getting your user data: %s", error);

    throw error;
  }
};

const setProfilePicture = async (
  uid: string,
  asset: ImagePickerAsset,
): Promise<void | never> => {
  const url = `ProfilePictures/${uid}.jpg`;

  try {
    const response = await fetch(asset.uri);
    const blob = await response.blob();

    await storage().ref(url).put(blob);
  } catch (error) {
    console.error(
      "There was an error while setting your profile picture: %s",
      error,
    );

    throw error;
  }
};

const getProfilePicture = async (uid: string): Promise<string> => {
  const url = `ProfilePictures/${uid}.jpg`;

  try {
    return await storage().ref(url).getDownloadURL();
  } catch (error) {
    console.error(
      "There was an error while getting your profile picture: %s",
      error,
    );

    throw error;
  }
};

export {
  UserDataType,
  getUserData,
  setUserData,
  setProfilePicture,
  getProfilePicture,
};
