import { Text, useColorScheme } from "react-native";
import { Button } from "@src/components/Button";
import { Fragment } from "react";
import FolderIcon from "@src/assets/img/folder-icon.svg";
import { FolderType } from "@src/services/firebase";
import { colors } from "@src/styles/tailwindColors";
import { Signal } from "@preact/signals-react";

const style = {
  view: "w-24 justify-center ml-5 mr-3 my-2.5 p-2 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
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

const FolderCard = ({
  folder,
  routeSignal,
}: {
  folder: FolderType;
  routeSignal: Signal<string>;
}) => {
  const isLight = useColorScheme() === "light";
  const iconColor = isLight ? colors.quaternary_light : colors.quaternary_dark;

  const handleOnPress = () => {
    routeSignal.value += folder.name + "/";
  };

  return (
    <Button buttonClassName={style.view} onPress={handleOnPress}>
      <Fragment>
        <FolderIcon width={80} height={80} color={iconColor} />
        <Text numberOfLines={1} ellipsizeMode="tail" className="text-center">
          {folder.name}
        </Text>
      </Fragment>
    </Button>
  );
};

export { FolderCard };
