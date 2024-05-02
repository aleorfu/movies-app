import { GestureResponderEvent, Image, Pressable, Text } from "react-native";

type ButtonProps = {
  text?: string;
  image?: number;
  buttonClassName?: string;
  textClassName?: string;
  imageClassName?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

const Button = ({
  text,
  image,
  buttonClassName,
  textClassName,
  imageClassName,
  onPress,
}: ButtonProps): React.JSX.Element => {
  return (
    <Pressable className={buttonClassName} onPress={onPress}>
      {image && <Image source={image} className={imageClassName} />}
      <Text className={textClassName}>{text}</Text>
    </Pressable>
  );
};

export { Button, ButtonProps };
