import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";

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

export { UserDataType, getUserData, setUserData };
