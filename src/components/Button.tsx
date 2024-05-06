import { GestureResponderEvent, Image, Pressable, Text } from "react-native";

type ButtonProps = {
  text?: string;
  image?: number;
  component?: React.JSX.Element;
  buttonClassName?: string;
  textClassName?: string;
  imageClassName?: string;
  disable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const Button = ({
  text,
  image,
  component,
  buttonClassName,
  textClassName,
  imageClassName,
  disable = false,
  onPress,
}: ButtonProps): React.JSX.Element => {
  return (
    <Pressable disabled={disable} className={buttonClassName} onPress={onPress}>
      {image && <Image source={image} className={imageClassName} />}
      {text && <Text className={textClassName}>{text}</Text>}
      {component && component}
    </Pressable>
  );
};

export { Button, ButtonProps };
