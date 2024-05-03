import { Text, View } from "react-native";

type CommentCardProps = {
  content: string;
  rating: number;
};

const style = {
  comment:
    "shadow-lg mx-5 mt-5 p-2 rounded-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  text: "text-quaternary_light dark:text-quaternary_dark",
};

const CommentCard = ({
  content,
  rating,
}: CommentCardProps): React.JSX.Element => {
  return (
    <View className={style.comment}>
      <Text className={style.text}>{rating}/5</Text>
      <Text className={style.text}>{content}</Text>
    </View>
  );
};

export { CommentCard, CommentCardProps };
