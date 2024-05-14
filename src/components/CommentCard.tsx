import { Text, View } from "react-native";
import { Rating } from "@src/services/altenHybridApi";
import React from "react";
import Element = React.JSX.Element;

type CommentCardProps = {
  rating: Rating;
};

const style = {
  comment:
    "shadow-lg mx-5 my-2.5 p-2 rounded-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  text: "text-quaternary_light dark:text-quaternary_dark",
};

const CommentCard = ({ rating }: CommentCardProps): Element => {
  return (
    <View className={style.comment}>
      <Text className={style.text}>{rating.rating}/5</Text>
      <Text className={style.text}>{rating.comment}</Text>
    </View>
  );
};

export { CommentCard, CommentCardProps };
