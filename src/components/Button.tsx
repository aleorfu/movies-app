import { colors } from "@src/styles/tailwindColors";
import React, { Fragment } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

type ButtonProps = {
  text?: string;
  image?: React.JSX.Element;
  buttonClassName?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: React.JSX.Element;
  onPress?: (event: GestureResponderEvent) => void;
};

const Button = ({
  text,
  image,
  buttonClassName,
  textClassName,
  disabled = false,
  loading = false,
  children,
  onPress,
}: ButtonProps) => {
  const isLight = useColorScheme() === "light";

  return (
    <TouchableOpacity
      disabled={loading ? true : disabled}
      className={buttonClassName}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isLight ? colors.quaternary_light : colors.quaternary_dark}
        />
      ) : (
        children || (
          <Fragment>
            {image}
            {text && <Text className={textClassName}>{text}</Text>}
          </Fragment>
        )
      )}
    </TouchableOpacity>
  );
};

export { Button, ButtonProps };
