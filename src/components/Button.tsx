import { colors } from "@src/styles/tailwindColors";
import React, { Fragment } from "react";
import {
  ActivityIndicator,
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
  onPress?: () => void;
};

const Button = ({
  text,
  image,
  buttonClassName,
  textClassName,
  disabled = false,
  loading = false,
  onPress,
}: ButtonProps): React.JSX.Element => {
  const isLight: boolean = useColorScheme() === "light";

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
        <Fragment>
          {image}
          {text && <Text className={textClassName}>{text}</Text>}
        </Fragment>
      )}
    </TouchableOpacity>
  );
};
export { Button, ButtonProps };
