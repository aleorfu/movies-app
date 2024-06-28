import { GestureResponderEvent, Pressable, Text } from "react-native";

const Button = ({
  text,
  buttonClassName,
  textClassName,
  onPress,
  onPressIn,
  onPressOut,
}: {
  text: string;
  buttonClassName?: string;
  textClassName?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressIn?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressOut?: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  return (
    <Pressable
      className={buttonClassName}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Text className={textClassName}>{text}</Text>
    </Pressable>
  );
};

export { Button };
