import { GestureResponderEvent, Pressable, Text } from "react-native";

type ButtonProps = {
  text?: string;
  buttonClassName?: string;
  textClassName?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

const Button = ({
  text,
  buttonClassName,
  textClassName,
  onPress,
}: ButtonProps): React.JSX.Element => {
  return (
    <Pressable className={buttonClassName} onPress={onPress}>
      <Text className={textClassName}>{text}</Text>
    </Pressable>
  );
};

export { Button, ButtonProps };
