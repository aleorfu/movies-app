import { Image, Modal, Text, View } from "react-native";
import { DocumentPickerAsset } from "expo-document-picker";
import { Button } from "@src/components/Button";
import { useSignal } from "@preact/signals-react";
import { Fragment } from "react";

const style = {
  view: "justify-center mx-2.5 my-2.5 p-2 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  image: "w-20 h-20 rounded-lg",
  modal: "flex-1 justify-center items-center bg-black/25",
  modalView:
    "justify-center items-center mx-5 p-5 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  text: "text-lg text-quaternary_light dark:text-quaternary_dark",
  modalImage: "w-40 h-40 rounded-lg mb-10",
  button: {
    button: "px-5 py-2.5 justify-center absolute top-0 right-0",
    text: "text-lg text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const FileCard = ({ file }: { file: DocumentPickerAsset }) => {
  const modalVisibleSignal = useSignal(false);

  const closeModal = () => {
    modalVisibleSignal.value = false;
  };

  const handleOnPress = () => {
    modalVisibleSignal.value = true;
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
            <Image className={style.modalImage} src={file.uri} />
            <Text className={style.text}>{file.name}</Text>
            <Button
              buttonClassName={style.button.button}
              textClassName={style.button.text}
              text="x"
              onPress={closeModal}
            />
          </View>
        </View>
      </Modal>
      <Button buttonClassName={style.view} onPress={handleOnPress}>
        <Image className={style.image} src={file.uri} />
      </Button>
    </Fragment>
  );
};

export { FileCard };
