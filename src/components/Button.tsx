import { colors } from "@src/styles/tailwindColors";
import { Fragment } from "react";
import {
  ActivityIndicator,
  ColorSchemeName,
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

type ButtonProps = {
  text?: string;
  image?: number;
  buttonClassName?: string;
  textClassName?: string;
  imageClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
};

const Button = ({
  text,
  image,
  buttonClassName,
  textClassName,
  imageClassName,
  disabled = false,
  loading = false,
  onPress,
}: ButtonProps): React.JSX.Element => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isLight: boolean = colorScheme === "light";

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
          {image && (
            <Image
              source={image}
              className={imageClassName}
              tintColor={
                isLight ? colors.quaternary_light : colors.quaternary_dark
              }
            />
          )}
          {text && <Text className={textClassName}>{text}</Text>}
        </Fragment>
      )}
    </TouchableOpacity>
  );
};

export { Button, ButtonProps };
