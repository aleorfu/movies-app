import { Alert, FlatList, Modal, Text, TextInput, View } from "react-native";
import React, { Fragment, useEffect } from "react";
import { getUserSignal } from "@src/signals/userSignal";
import { Button } from "@src/components/Button";
import * as DocumentPicker from "expo-document-picker";
import {
  addFileToStorage,
  createFolder,
  DocumentListType,
  FileType,
  FolderType,
  getFilesFromStorage,
} from "@src/services/firebase";
import { Signal, useSignal } from "@preact/signals-react";
import { FolderCard } from "@src/components/FolderCard";
import { FileCard } from "@src/components/FileCard";

const style = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
  button: {
    addButton:
      "w-12 h-12 justify-center absolute bottom-5 right-5 rounded-full shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    backButton:
      "w-12 h-12 justify-center absolute bottom-5 right-20 rounded-full shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-lg text-center text-quaternary_light dark:text-quaternary_dark",
  },
  list: "flex-1",
  text: "text-lg text-center text-quaternary_light dark:text-quaternary_dark",
};

const openFilePicker = (
  filesSignal: Signal<DocumentListType>,
  route: string,
) => {
  const handleOnSuccess = (result: DocumentPicker.DocumentPickerResult) => {
    if (result.canceled) return;

    const handleUploadSuccess = () => {
      Alert.alert("File uploaded successfully.");
      getFiles(filesSignal, route);
    };

    const handleUploadFailed = () => {
      Alert.alert(
        "There was an error while uploading file.",
        "Please, try again later.",
      );
    };

    addFileToStorage(getUserSignal.value!!.uid, result.assets[0], route)
      .then(handleUploadSuccess)
      .catch(handleUploadFailed);
  };

  DocumentPicker.getDocumentAsync({
    type: "*/*",
    multiple: false,
  }).then(handleOnSuccess);
};

const getFiles = (filesSignal: Signal<DocumentListType>, route: string) => {
  const handleOnSuccess = (files: DocumentListType) => {
    filesSignal.value = files;
  };

  const handleOnFail = () => {
    Alert.alert(
      "There was an error while getting your files.",
      "Please, try again later.",
    );
  };

  getFilesFromStorage(getUserSignal.value!!.uid, route)
    .then(handleOnSuccess)
    .catch(handleOnFail);
};

const DocumentsScreen = (): React.JSX.Element => {
  const filesSignal = useSignal<DocumentListType>([]);
  const modalVisibleSignal = useSignal(false);
  const folderNameSignal = useSignal("");
  const routeSignal = useSignal("/");

  const handleAddOnClick = () => {
    Alert.alert("Choose what you want to upload...", "", [
      {
        text: "file",
        onPress: () => openFilePicker(filesSignal, routeSignal.value),
      },
      {
        text: "folder",
        onPress: () => {
          modalVisibleSignal.value = true;
        },
      },
    ]);
  };

  const handleBackOnPress = () => {
    const route = routeSignal.value;
    const parts = route.split("/");
    const newRoute = parts.slice(0, -2).join("/") + "/";
    routeSignal.value = newRoute;
  };

  const handleOnChangeText = (text: string) => {
    folderNameSignal.value = text;
  };

  const handleOnRequestClose = () => {
    modalVisibleSignal.value = false;
  };

  const handleCreateFolderOnPress = () => {
    createFolder(
      getUserSignal.value!!.uid,
      routeSignal.value,
      folderNameSignal.value,
    ).then(() => {
      getFiles(filesSignal, routeSignal.value);
    });
    modalVisibleSignal.value = false;
  };

  useEffect(() => {
    if (!getUserSignal.value) {
      filesSignal.value = [];
      return;
    }

    getFiles(filesSignal, routeSignal.value);
  }, [getUserSignal.value, routeSignal.value]);

  return (
    <View className={style.view}>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={modalVisibleSignal.value}
        onRequestClose={handleOnRequestClose}
      >
        <View className="flex-1 justify-center bg-black/25">
          <View className={"mx-5 p-5 bg-secondary_light"}>
            <TextInput
              className="bg-primary_light dark:bg-primary_dark text-quaternary_light dark:text-quaternary_dark"
              value={folderNameSignal.value}
              onChangeText={handleOnChangeText}
            />
            <Button text="Create" onPress={handleCreateFolderOnPress} />
            <Button text="Cancel" onPress={handleOnRequestClose} />
          </View>
        </View>
      </Modal>
      {getUserSignal.value ? (
        getUserSignal.value?.emailVerified ? (
          <Fragment>
            <FlatList
              data={filesSignal.value}
              renderItem={({ item }) => {
                if ("uri" in item) {
                  return <FileCard file={item as FileType} />;
                } else {
                  return (
                    <FolderCard
                      folder={item as FolderType}
                      routeSignal={routeSignal}
                    />
                  );
                }
              }}
              numColumns={3}
              keyExtractor={(_, index) => index.toString()}
              className={style.list}
            />
            {routeSignal.value != "/" && (
              <Button
                buttonClassName={style.button.backButton}
                text="<"
                textClassName={style.button.text}
                onPress={handleBackOnPress}
              />
            )}
            <Button
              buttonClassName={style.button.addButton}
              text="+"
              textClassName={style.button.text}
              onPress={handleAddOnClick}
            />
          </Fragment>
        ) : (
          <Text className={style.text}>
            You must verify your email to access this feature.
          </Text>
        )
      ) : (
        <Text className={style.text}>
          You must sign-in to access this feature.
        </Text>
      )}
    </View>
  );
};

export { DocumentsScreen };
