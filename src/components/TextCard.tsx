import { Text, View } from "react-native";
import { joinClassNames } from "../utils/styleExtras";

type TextCardProps = {
  title: string;
  content: string;
};

class LocalStyle {
  public static getCardStyle() {
    const commonStyle = "m-5 rounded-lg shadow-lg";
    const lightStyle = "bg-primary_light shadow-black";
    const darkStyle = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTextStyle() {
    const commonStyle = "text-xl font-extrabold text-center m-2.5";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getContentStyle() {
    const commonStyle = "m-5 text-xl text-center";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const TextCard = ({ title, content }: TextCardProps): React.JSX.Element => {
  return (
    <View className={LocalStyle.getCardStyle()}>
      <Text className={LocalStyle.getTextStyle()}>{title}</Text>
      <Text className={LocalStyle.getContentStyle()}>{content}</Text>
    </View>
  );
};

export { TextCard, TextCardProps };
