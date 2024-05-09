import { TextInput, useColorScheme, View } from "react-native";
import { colors } from "@src/styles/tailwindColors";
import { Signal } from "@preact/signals-react";
import React from "react";

type RatingTextInputProps = {
  ratingText: Signal<string>;
  contentText: Signal<string>;
  editable?: boolean;
};

const style = {
  textInput: {
    common:
      "mx-5 p-2 text-10 shadow-lg text-quaternary_light bg-primary_light shadow-black dark:text-quaternary_dark dark:bg-primary_dark dark:shadow-white",
    top: "mt-5 rounded-t-lg",
    bottom: "mb-5 rounded-b-lg",
  },
};

const numberIsValid = (text: string): boolean => {
  try {
    const number: number = Number(text);
    return number >= 0 && number <= 5;
  } catch {
    return false;
  }
};

const RatingTextInput = ({
  ratingText,
  contentText,
  editable = true,
}: RatingTextInputProps): React.JSX.Element => {
  const isLight: boolean = useColorScheme() === "light";

  return (
    <View>
      <TextInput
        className={[style.textInput.common, style.textInput.top].join(" ")}
        onChangeText={(text: string): void => {
          if (numberIsValid(text)) ratingText.value = text;
        }}
        value={ratingText.value}
        keyboardType="number-pad"
        maxLength={1}
        placeholder="0"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
        editable={editable}
      />
      <TextInput
        className={[style.textInput.common, style.textInput.bottom].join(" ")}
        onChangeText={(text: string): void => {
          contentText.value = text;
        }}
        value={contentText.value}
        placeholder="Comment"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
        editable={editable}
      />
    </View>
  );
};

export { RatingTextInput, RatingTextInputProps };
