import { GestureResponderEvent, Pressable, Text } from "react-native";

const Button = ({
  text,
  buttonClassName,
  textClassName,
  onPress,
}: {
  text: string;
  buttonClassName?: string;
  textClassName?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  return (
    <Pressable className={buttonClassName} onPress={onPress}>
      <Text className={textClassName}>{text}</Text>
    </Pressable>
  );
};

export { Button };
