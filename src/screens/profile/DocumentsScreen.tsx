import { View } from "react-native";
import React from "react";

const style = {
  view: "flex-1 justify-center bg-secondary_light dark:bg-secondary_dark",
};

const DocumentsScreen = (): React.JSX.Element => {
  return <View className={style.view}></View>;
};

export { DocumentsScreen };
