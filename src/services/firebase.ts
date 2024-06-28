import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";
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
  await database().ref(`users/${uid}`).set({
    displayName: userData.displayName,
    surname: userData.surname,
    phoneNumber: userData.phoneNumber,
    gender: userData.gender,
    dateOfBirth: userData.dateOfBirth,
  });
};

const getUserData = async (uid: string): Promise<UserDataType | never> => {
  const userData: FirebaseDatabaseTypes.DataSnapshot = await database()
    .ref(`users/${uid}`)
    .once("value");
  return userData.val() as UserDataType;
};

const setProfilePicture = async (
  uid: string,
  asset: ImagePickerAsset,
): Promise<void | never> => {
  const response: Response = await fetch(asset.uri);
  const blob: Blob = await response.blob();

  await storage().ref(`ProfilePictures/${uid}.jpg`).put(blob);
};

const getProfilePicture = async (uid: string): Promise<string> => {
  return await storage().ref(`ProfilePictures/${uid}.jpg`).getDownloadURL();
};

export {
  UserDataType,
  getUserData,
  setUserData,
  setProfilePicture,
  getProfilePicture,
};
