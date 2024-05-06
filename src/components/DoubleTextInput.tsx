import { TextInput, View, useColorScheme } from "react-native";
import { colors } from "../styles/tailwindColors";

type DoubleTextInputProps = {
  topTextUseState: [string, React.Dispatch<React.SetStateAction<string>>];
  bottomTextUseState: [string, React.Dispatch<React.SetStateAction<string>>];
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

const verifyNumber = (text: string): string => {
  const textAsNumber: number = Number(text);
  if (textAsNumber >= 0 && textAsNumber <= 5) return text;
  else if (textAsNumber < 0) return "0";
  else if (textAsNumber > 5) return "5";
  else return "";
};

const DoubleTextInput = ({
  topTextUseState,
  bottomTextUseState,
  editable = true,
}: DoubleTextInputProps): React.JSX.Element => {
  const [topText, setTopText] = topTextUseState;
  const [bottomText, setBottomText] = bottomTextUseState;
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  return (
    <View>
      <TextInput
        className={[style.textInput.common, style.textInput.top].join(" ")}
        onChangeText={(text: string) => {
          setTopText(verifyNumber(text));
        }}
        value={topText}
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
        onChangeText={setBottomText}
        value={bottomText}
        placeholder="Comment"
        placeholderTextColor={
          isLight ? colors.quaternary_light : colors.quaternary_dark
        }
        editable={editable}
      />
    </View>
  );
};

export { DoubleTextInput, DoubleTextInputProps };
