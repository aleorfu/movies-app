import { Signal, useSignal } from "@preact/signals-react";
import { colors } from "@src/styles/tailwindColors";
import { Fragment } from "react";
import {
  ActivityIndicator,
  ColorSchemeName,
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
  onPress?: () => Promise<void>;
};

const Button = ({
  text,
  image,
  buttonClassName,
  textClassName,
  imageClassName,
  disabled = false,
  onPress,
}: ButtonProps): React.JSX.Element => {
  const loading: Signal<boolean> = useSignal<boolean>(false);
  const colorScheme: ColorSchemeName = useColorScheme();
  const isLight: boolean = colorScheme === "light";

  return (
    <TouchableOpacity
      disabled={loading.value ? true : disabled}
      className={buttonClassName}
      onPress={() => {
        if (!onPress) return;

        loading.value = true;
        onPress().then(() => {
          loading.value = false;
        });
      }}
    >
      {loading.value ? (
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
