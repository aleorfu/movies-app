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

/**
 * Prop types for Button component:
 *
 * text? - The content of the button in string format.
 *
 * image? - The image resource to show in the button in form of a small icon.
 *
 * buttonClassName? - The tailwind class name for the entire button.
 *
 * textClassName? - The tailwind class name for the text inside the button.
 *
 * imageClassName? - The tailwind class name for the image inside the button.
 *
 * disabled? - Whether the button is disabled or not.
 *
 * loading? - Whether the button is loading or not (this will animate the button and disabling it while loading).
 *
 * onPress? - Function called when the button is released.
 *
 * @see Button - The component using these props.
 */
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

/**
 *  A personalized button component.
 *
 * @param ButtonProps.
 *
 * @see ButtonProps - Props used in this component.
 *
 * @returns Personalized button component.
 */
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
