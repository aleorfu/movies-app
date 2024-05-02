import { Text, View } from "react-native";
import { joinClassNames } from "../utils/styleExtras";

type CommentCardProps = {
  content: string;
  rating: number;
};

class LocalStyle {
  public static getCommentStyle(): string {
    const commonStyle: string = "shadow-lg mx-5 mt-5 p-2 rounded-lg";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTextStyle(): string {
    const commonStyle: string = "";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const CommentCard = ({
  content,
  rating,
}: CommentCardProps): React.JSX.Element => {
  return (
    <View className={LocalStyle.getCommentStyle()}>
      <Text className={LocalStyle.getTextStyle()}>{rating}/5</Text>
      <Text className={LocalStyle.getTextStyle()}>{content}</Text>
    </View>
  );
};

export { CommentCard, CommentCardProps };
