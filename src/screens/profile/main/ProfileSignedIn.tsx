import { Signal, useSignal } from "@preact/signals-react";
import auth from "@react-native-firebase/auth";
import { Button } from "@src/components/Button";
import {
  getProfilePicture,
  getUserData,
  setProfilePicture,
  setUserData,
  UserDataType,
} from "@src/services/firebase";
import { getUserSignal, UserType } from "@src/signals/userSignal";
import { colors } from "@src/styles/tailwindColors";
import React, { Fragment, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult, MediaTypeOptions } from "expo-image-picker";
import parsePhoneNumber, { PhoneNumber } from "libphonenumber-js";

const style = {
  image:
    "bg-quaternary_light dark:bg-quaternary_dark w-20 h-20 mx-auto mt-5 rounded-full",
  title:
    "text-lg my-3 text-center font-bold text-quaternary_light dark:text-quaternary_dark",
  field:
    "text-lg p-2 mx-5 my-3 text-center rounded-lg shadow-lg bg-primary_light text-quaternary_light shadow-black dark:bg-primary_dark dark:text-quaternary_dark dark:shadow-white",
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};
const ProfileSignedIn = (): React.JSX.Element => {
  const loadingSignal: Signal<boolean> = useSignal<boolean>(false);
  const loadingSaveSignal: Signal<boolean> = useSignal<boolean>(false);

  const displayName: Signal<string> = useSignal<string>("");
  const surname: Signal<string> = useSignal<string>("");
  const phoneNumber: Signal<string> = useSignal<string>("");
  const gender: Signal<string> = useSignal<string>("");
  const dateOfBirth: Signal<string> = useSignal<string>("");
  const profilePicture: Signal<string | undefined> = useSignal<
    string | undefined
  >(undefined);

  const isLight: boolean = useColorScheme() === "light";
  const localUser: UserType = getUserSignal.value;

  const selectPicture = (): void => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: MediaTypeOptions.Images,
      selectionLimit: 1,
    };

    ImagePicker.launchImageLibraryAsync(options).then(
      (result: ImagePickerResult): void => {
        if (result.canceled) return;
        if (result.assets[0].fileName?.split(".").pop() != "jpg") return;
        profilePicture.value = result.assets[0].uri;
        setProfilePicture(localUser!!.uid, result.assets[0]);
      },
    );
  };

  useEffect((): void => {
    if (localUser === null) return;
    loadingSignal.value = true;
    getUserData(localUser.uid)
      .then(async (fetchedUserData: UserDataType): Promise<void> => {
        displayName.value = fetchedUserData.displayName;
        surname.value = fetchedUserData.surname;
        phoneNumber.value = fetchedUserData.phoneNumber;
        gender.value = fetchedUserData.gender;
        dateOfBirth.value = fetchedUserData.dateOfBirth;
        await getProfilePicture(localUser.uid).then((url: string): void => {
          profilePicture.value = url;
        });
      })
      .finally((): void => {
        loadingSignal.value = false;
      });
  }, [localUser]);

  return (
    <ScrollView>
      {localUser && !loadingSignal.value ? (
        <Fragment>
          <TouchableOpacity onPress={selectPicture}>
            <Image
              source={{ uri: profilePicture.value }}
              className={style.image}
            />
          </TouchableOpacity>
          <Text className={style.title}>Display name</Text>
          <TextInput
            className={style.field}
            value={displayName.value}
            onChangeText={(text: string): void => {
              displayName.value = text;
            }}
            textContentType="name"
          />
          <Text className={style.title}>Surname</Text>
          <TextInput
            className={style.field}
            value={surname.value}
            onChangeText={(text: string): void => {
              surname.value = text;
            }}
            textContentType="name"
          />
          <Text className={style.title}>Phone number</Text>
          <TextInput
            className={style.field}
            value={phoneNumber.value}
            onChangeText={(text: string): void => {
              phoneNumber.value = text;
            }}
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          />
          <Text className={style.title}>Gender</Text>
          <TextInput
            className={style.field}
            value={gender.value}
            onChangeText={(text: string): void => {
              gender.value = text;
            }}
          />
          <Text className={style.title}>Date of birth</Text>
          <TextInput
            className={style.field}
            value={dateOfBirth.value}
            onChangeText={(text: string): void => {
              dateOfBirth.value = text;
            }}
            textContentType="birthdate"
          />
          <Button
            text="Save"
            buttonClassName={style.button.button}
            textClassName={style.button.text}
            onPress={(): void => {
              const parsedPhoneNumber: PhoneNumber | undefined =
                parsePhoneNumber(phoneNumber.value, "ES");
              if (
                !parsedPhoneNumber?.isValid() ||
                !parsedPhoneNumber?.isPossible()
              ) {
                Alert.alert(
                  "Invalid phone number.",
                  "Check if phone number is correct and try again.",
                );
                return;
              }

              phoneNumber.value = parsedPhoneNumber?.number;
              loadingSaveSignal.value = true;
              setUserData(localUser.uid, {
                displayName: displayName.value,
                surname: surname.value,
                phoneNumber: parsedPhoneNumber?.number,
                gender: gender.value,
                dateOfBirth: dateOfBirth.value,
              }).finally((): void => {
                loadingSaveSignal.value = false;
              });
            }}
            loading={loadingSaveSignal.value}
          />
        </Fragment>
      ) : (
        <ActivityIndicator
          size="large"
          color={isLight ? colors.quaternary_light : colors.quaternary_dark}
        />
      )}
      <Button
        text="Sign-Out"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={(): void => {
          auth()
            .signOut()
            .catch((): void => {
              Alert.alert(
                "There was an error while signing you out.",
                "Please, try again later.",
              );
            });
        }}
      />
    </ScrollView>
  );
};

export { ProfileSignedIn };
