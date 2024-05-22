import { Alert, Image, Modal, Text, useColorScheme, View } from "react-native";
import { Button } from "@src/components/Button";
import { useSignal } from "@preact/signals-react";
import { Fragment, useCallback } from "react";
import NoImage from "@src/assets/img/image-x-icon.svg";
import { FileType } from "@src/services/firebase";
import { colors } from "@src/styles/tailwindColors";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import DownloadIcon from "@src/assets/img/download-icon.svg";

const style = {
  view: "w-24 justify-center ml-5 mr-3 my-2.5 p-2 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  image: "w-20 h-20 rounded-lg",
  modal: "flex-1 justify-center items-center bg-black/25",
  modalView:
    "justify-center items-center mx-5 p-5 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  text: "text-lg text-quaternary_light dark:text-quaternary_dark",
  shortText: "text-center",
  modalImage: "w-40 h-40 rounded-lg mb-10",
  button: {
    buttonX: "px-5 py-2.5 justify-center absolute top-0 right-0",
    text: "text-lg text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const IMAGE_EXTENSIONS = ["image/png", "image/jpg", "image/jpeg"];

const downloadFile = (file: FileType) => {
  const ERROR_MESSAGE = "Please, try again later";

  const handlePermissionSuccess = (
    permissions: FileSystem.FileSystemRequestDirectoryPermissionsResult,
  ) => {
    if (!permissions.granted) throw new Error("Permissions not granted.");

    const handleDownloadSuccess = (
      result: FileSystem.FileSystemDownloadResult,
    ) => {
      const handleReadingSuccess = (content: string) => {
        if (!file.type) throw new Error("No file type.");

        const handleFileCreationSuccess = (uri: string) => {
          const handleWritingSuccess = () => {
            Alert.alert("Your file has been successfully downloaded.");
          };

          const handleWritingFailure = (error: any) => {
            const ERROR_TITLE = "There was an error while writing file.";
            console.error("%s -> %s", ERROR_TITLE, error);
            Alert.alert(ERROR_TITLE, ERROR_MESSAGE);
          };

          FileSystem.writeAsStringAsync(uri, content, {
            encoding: FileSystem.EncodingType.Base64,
          })
            .then(handleWritingSuccess)
            .catch(handleWritingFailure);
        };

        const handleFileCreationFailure = (error: any) => {
          const ERROR_TITLE = "There was an error while creating file.";
          console.error("%s -> %s", ERROR_TITLE, error);
          Alert.alert(ERROR_TITLE, ERROR_MESSAGE);
        };

        StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          file.name,
          file.type,
        )
          .then(handleFileCreationSuccess)
          .catch(handleFileCreationFailure);
      };

      const handleReadingFailure = (error: any) => {
        const ERROR_TITLE = "There was an error while reading file.";
        console.error("%s -> %s", ERROR_TITLE, error);
        Alert.alert(ERROR_TITLE, ERROR_MESSAGE);
      };

      FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then(handleReadingSuccess)
        .catch(handleReadingFailure);
    };

    const handleDownloadFailure = (error: any) => {
      const ERROR_TITLE = "There was an error while downloading file.";
      console.error("%s -> %s", [ERROR_TITLE, error]);
      Alert.alert(ERROR_TITLE, ERROR_MESSAGE);
    };

    FileSystem.downloadAsync(file.uri, FileSystem.cacheDirectory + file.name)
      .then(handleDownloadSuccess)
      .catch(handleDownloadFailure);
  };

  const handlePermissionFailure = (error: any) => {
    const ERROR_TITLE =
      "There was an error while getting directory permissions.";
    console.error("%s -> %s", [ERROR_TITLE, error]);
    Alert.alert(ERROR_TITLE, "Please, try again later.");
  };

  StorageAccessFramework.requestDirectoryPermissionsAsync()
    .then(handlePermissionSuccess)
    .catch(handlePermissionFailure);
};

const FileCard = ({ file }: { file: FileType }) => {
  const modalVisibleSignal = useSignal(false);

  const isLight = useColorScheme() === "light";
  const iconColor = isLight ? colors.quaternary_light : colors.quaternary_dark;

  const handleCloseModal = useCallback(() => {
    modalVisibleSignal.value = false;
  }, []);

  const handleCardOnPress = useCallback(() => {
    modalVisibleSignal.value = true;
  }, []);

  const handleDownloadOnPress = useCallback(() => {
    downloadFile(file);
  }, [file]);

  return (
    <Fragment>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisibleSignal.value}
        onRequestClose={handleCloseModal}
      >
        <View className={style.modal}>
          <View className={style.modalView}>
            {file.type && IMAGE_EXTENSIONS.includes(file.type) ? (
              <Image className={style.modalImage} src={file.uri} />
            ) : (
              <NoImage width={180} height={180} color={iconColor} />
            )}
            <Text className={style.text}>{file.name}</Text>
            <Text className={style.text}>size: {file.size} kb</Text>
            <Button onPress={handleDownloadOnPress}>
              <DownloadIcon width={50} height={50} color={iconColor} />
            </Button>
            <Button
              buttonClassName={style.button.buttonX}
              textClassName={style.button.text}
              text="x"
              onPress={handleCloseModal}
            />
          </View>
        </View>
      </Modal>
      <Button buttonClassName={style.view} onPress={handleCardOnPress}>
        <Fragment>
          {file.type && IMAGE_EXTENSIONS.includes(file.type) ? (
            <Image className={style.image} src={file.uri} />
          ) : (
            <NoImage width={80} height={80} color={iconColor} />
          )}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={style.shortText}
          >
            {file.name}
          </Text>
        </Fragment>
      </Button>
    </Fragment>
  );
};

export { FileCard };
