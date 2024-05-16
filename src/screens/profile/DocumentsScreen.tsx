import { Alert, FlatList, Text, View } from "react-native";
import React, { Fragment, useEffect } from "react";
import { getUserSignal } from "@src/signals/userSignal";
import { Button } from "@src/components/Button";
import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerAsset } from "expo-document-picker";
import { addFileToStorage, getFilesFromStorage } from "@src/services/firebase";
import { useSignal } from "@preact/signals-react";
import { FileCard } from "@src/components/FileCard";

const style = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    button:
      "w-12 h-12 justify-center absolute bottom-5 right-5 rounded-full shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg text-center text-quaternary_light dark:text-quaternary_dark",
  },
  list: "flex-1",
};

const openFilePicker = () => {
  const handleOnSuccess = (result: DocumentPicker.DocumentPickerResult) => {
    if (result.canceled) return;

    const handleUploadSuccess = () => {
      Alert.alert("File uploaded successfully.");
    };

    const handleUploadFailed = () => {
      Alert.alert(
        "There was an error while uploading file.",
        "Please, try again later.",
      );
    };

    addFileToStorage(getUserSignal.value!!.uid, result.assets[0]).then(
      handleUploadSuccess,
    );
  };

  DocumentPicker.getDocumentAsync({
    type: "*/*",
    multiple: false,
  }).then(handleOnSuccess);
};

const DocumentsScreen = (): React.JSX.Element => {
  const filesSignal = useSignal<DocumentPickerAsset[]>([]);

  useEffect(() => {
    if (!getUserSignal.value) return;

    const handleOnSuccess = (files: DocumentPickerAsset[]) => {
      filesSignal.value = files;
    };

    const handleOnFail = () => {
      Alert.alert(
        "There was an error while getting your files.",
        "Please, try again later.",
      );
    };

    getFilesFromStorage(getUserSignal.value!!.uid)
      .then(handleOnSuccess)
      .catch(handleOnFail);
  }, [getUserSignal.value]);

  return (
    <View className={style.view}>
      {getUserSignal.value ? (
        getUserSignal.value?.emailVerified ? (
          <Fragment>
            <FlatList
              data={filesSignal.value}
              renderItem={({ item }) => <FileCard file={item} />}
              numColumns={3}
              keyExtractor={(_, index) => index.toString()}
              className={style.list}
            />
            <Button
              buttonClassName={style.button.button}
              text="+"
              textClassName={style.button.text}
              onPress={openFilePicker}
            />
          </Fragment>
        ) : (
          <Text>You must verify your email to access this feature.</Text>
        )
      ) : (
        <Text>You must sign-in to access this feature.</Text>
      )}
    </View>
  );
};

export { DocumentsScreen };
