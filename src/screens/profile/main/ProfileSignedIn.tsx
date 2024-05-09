import { Signal, useSignal } from "@preact/signals-react";
import auth from "@react-native-firebase/auth";
import { Button } from "@src/components/Button";
import { getUserData, setUserData, UserDataType } from "@src/services/userData";
import { getUserSignal } from "@src/signals/userSignal";
import { Fragment, useEffect } from "react";
import { Alert, ScrollView, Text, TextInput } from "react-native";

const style = {
  title:
    "text-lg my-3 text-center font-bold text-quaternary_light dark:text-quaternary_dark",
  field:
    "text-lg p-2 mx-5 my-3 text-center rounded-lg bg-primary_light text-quaternary_light dark:bg-primary_dark dark:text-quaternary_dark",
  button: {
    button:
      "mx-8 rounded-md p-3 my-2 shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg font-bold text-center text-quaternary_light dark:text-quaternary_dark",
  },
};
const ProfileSignedIn = (): React.JSX.Element => {
  const displayName: Signal<string> = useSignal<string>("");
  const surname: Signal<string> = useSignal<string>("");
  const phoneNumber: Signal<string> = useSignal<string>("");
  const gender: Signal<string> = useSignal<string>("");
  const dateOfBirth: Signal<string> = useSignal<string>("");
  const localUser = getUserSignal.value;

  useEffect(() => {
    localUser &&
      getUserData(localUser.uid).then((fetchedUserData: UserDataType) => {
        displayName.value = fetchedUserData.displayName;
        surname.value = fetchedUserData.surname;
        phoneNumber.value = fetchedUserData.phoneNumber;
        gender.value = fetchedUserData.gender;
        dateOfBirth.value = fetchedUserData.dateOfBirth;
      });
  }, []);

  return (
    <ScrollView>
      {localUser && (
        <Fragment>
          <Text className={style.title}>Display name</Text>
          <TextInput
            className={style.field}
            value={displayName.value}
            onChangeText={(text) => {
              displayName.value = text;
            }}
          />
          <Text className={style.title}>Surname</Text>
          <TextInput
            className={style.field}
            value={surname.value}
            onChangeText={(text) => {
              surname.value = text;
            }}
          />
          <Text className={style.title}>Phone number</Text>
          <TextInput
            className={style.field}
            value={phoneNumber.value}
            onChangeText={(text) => {
              phoneNumber.value = text;
            }}
          />
          <Text className={style.title}>Gender</Text>
          <TextInput
            className={style.field}
            value={gender.value}
            onChangeText={(text) => {
              gender.value = text;
            }}
          />
          <Text className={style.title}>Date of birth</Text>
          <TextInput
            className={style.field}
            value={dateOfBirth.value}
            onChangeText={(text) => {
              dateOfBirth.value = text;
            }}
          />
          <Button
            text="Save"
            buttonClassName={style.button.button}
            textClassName={style.button.text}
            onPress={async () => {
              await setUserData(localUser.uid, {
                displayName: displayName.value,
                surname: surname.value,
                phoneNumber: phoneNumber.value,
                gender: gender.value,
                dateOfBirth: dateOfBirth.value,
              });
            }}
          />
        </Fragment>
      )}
      <Button
        text="Sign-Out"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={async () => {
          await auth()
            .signOut()
            .catch(() => {
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
