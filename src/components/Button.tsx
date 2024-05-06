import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles/tailwindColors";
import { Fragment } from "react";

type ButtonProps = {
  text?: string;
  image?: number;
  component?: React.JSX.Element;
  buttonClassName?: string;
  textClassName?: string;
  imageClassName?: string;
  disable?: boolean;
  loading?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
};

const Button = ({
  text,
  image,
  component,
  buttonClassName,
  textClassName,
  imageClassName,
  disable = false,
  loading = false,
  onPress,
}: ButtonProps): React.JSX.Element => {
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  return (
    <TouchableOpacity
      disabled={loading ? true : disable}
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
          {component}
        </Fragment>
      )}
    </TouchableOpacity>
  );
};

export { Button, ButtonProps };
