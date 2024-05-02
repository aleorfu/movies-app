import { Text, View } from "react-native";
import { joinClassNames } from "../utils/styleExtras";

type CommentCardProps = {
  content: string;
  rating: number;
};

class LocalStyle {
  public static getCommentStyle() {
    const commonStyle = "shadow-lg mx-5 mt-5 p-2 rounded-lg";
    const lightStyle = "bg-primary_light shadow-black";
    const darkStyle = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const CommentCard = ({
  content,
  rating,
}: CommentCardProps): React.JSX.Element => {
  return (
    <View className={LocalStyle.getCommentStyle()}>
      <Text>{rating}/5</Text>
      <Text>{content}</Text>
    </View>
  );
};

export { CommentCard, CommentCardProps };
