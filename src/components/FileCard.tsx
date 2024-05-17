import { Alert, Image, Modal, Text, useColorScheme, View } from "react-native";
import { Button } from "@src/components/Button";
import { useSignal } from "@preact/signals-react";
import { Fragment } from "react";
import NoImage from "@src/assets/img/image-x-icon.svg";
import { FileType } from "@src/services/firebase";
import { colors } from "@src/styles/tailwindColors";
import * as FileSystem from "expo-file-system";
import DownloadIcon from "@src/assets/img/download-icon.svg";

const style = {
  view: "w-24 justify-center ml-5 mr-3 my-2.5 p-2 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  image: "w-20 h-20 rounded-lg",
  modal: "flex-1 justify-center items-center bg-black/25",
  modalView:
    "justify-center items-center mx-5 p-5 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  text: "text-lg text-quaternary_light dark:text-quaternary_dark",
  modalImage: "w-40 h-40 rounded-lg mb-10",
  button: {
    button: "",
    buttonX: "px-5 py-2.5 justify-center absolute top-0 right-0",
    text: "text-lg text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const FileCard = ({ file }: { file: FileType }) => {
  const modalVisibleSignal = useSignal(false);

  const isLight = useColorScheme() === "light";
  const iconColor = isLight ? colors.quaternary_light : colors.quaternary_dark;

  const extension = file.name.split(".")[1];
  const imageExtensions = ["png", "jpg", "jpeg"];

  const closeModal = () => {
    modalVisibleSignal.value = false;
  };

  const handleCloseOnPress = () => {
    modalVisibleSignal.value = true;
  };

  const handleDownloadOnPress = () => {
    const downloadResumable = FileSystem.createDownloadResumable(
      file.uri,
      FileSystem.documentDirectory + file.name,
    );
    const handleSuccess = (
      value: FileSystem.FileSystemDownloadResult | undefined,
    ) => {
      Alert.alert("Your file has been successfully downloaded.", value?.uri);
    };

    const handleFailure = () => {
      Alert.alert(
        "There was an error while downloading your file.",
        "Please, try again later.",
      );
    };

    downloadResumable.downloadAsync().then(handleSuccess).catch(handleFailure);
  };

  return (
    <Fragment>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisibleSignal.value}
        onRequestClose={closeModal}
      >
        <View className={style.modal}>
          <View className={style.modalView}>
            {imageExtensions.includes(extension) ? (
              <Image className={style.modalImage} src={file.uri} />
            ) : (
              <NoImage width={180} height={180} color={iconColor} />
            )}
            <Text className={style.text}>{file.name}</Text>
            {"size" in file && (
              <Text className={style.text}>size: {file.size} kb</Text>
            )}
            <Button
              buttonClassName={style.button.button}
              onPress={handleDownloadOnPress}
            >
              <DownloadIcon width={50} height={50} color={iconColor} />
            </Button>
            <Button
              buttonClassName={style.button.buttonX}
              textClassName={style.button.text}
              text="x"
              onPress={closeModal}
            />
          </View>
        </View>
      </Modal>
      <Button buttonClassName={style.view} onPress={handleCloseOnPress}>
        <Fragment>
          {imageExtensions.includes(extension) ? (
            <Image className={style.image} src={file.uri} />
          ) : (
            <NoImage width={80} height={80} color={iconColor} />
          )}
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-center">
            {file.name}
          </Text>
        </Fragment>
      </Button>
    </Fragment>
  );
};

export { FileCard };
