import { Text, View } from "react-native";
import React from "react";

type TextCardProps = {
  title: string;
  content: string;
};

const style = {
  card: "m-5 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  title:
    "text-xl font-extrabold text-center m-2.5 text-quaternary_light dark:text-quaternary_dark",
  content:
    "m-5 text-xl text-center text-quaternary_light dark:text-quaternary_dark",
};

const TextCard = ({ title, content }: TextCardProps): React.JSX.Element => {
  return (
    <View className={style.card}>
      <Text className={style.title}>{title}</Text>
      <Text className={style.content}>{content}</Text>
    </View>
  );
};

export { TextCard, TextCardProps };
