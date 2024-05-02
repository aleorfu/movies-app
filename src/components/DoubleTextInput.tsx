import { TextInput, View } from "react-native";
import { joinClassNames, selectStyle } from "../utils/styleExtras";
import { colors } from "../styles/tailwindColors";

type DoubleTextInputProps = {
  topTextUseState: [string, React.Dispatch<React.SetStateAction<string>>];
  bottomTextUseState: [string, React.Dispatch<React.SetStateAction<string>>];
};

class LocalStyle {
  private static textInputLightStyle: string =
    "text-quaternary_light bg-primary_light shadow-black";
  private static textInputDarkStyle: string =
    "text-quaternary_dark bg-primary_dark shadow-white";
  private static textInputCommonStyle: string = "mx-5 p-2 text-10 shadow-lg";

  public static getTopTextInputStyle(): string {
    const commonStyle: string = [
      this.textInputCommonStyle,
      "mt-5 rounded-t-lg",
    ].join(" ");

    return joinClassNames(commonStyle, [
      this.textInputLightStyle,
      this.textInputDarkStyle,
    ]);
  }

  public static getBottomTextInputStyle(): string {
    const commonStyle: string = [
      this.textInputCommonStyle,
      "mb-5 rounded-b-lg",
    ].join(" ");

    return joinClassNames(commonStyle, [
      this.textInputLightStyle,
      this.textInputDarkStyle,
    ]);
  }
}

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
}: DoubleTextInputProps): React.JSX.Element => {
  const [topText, setTopText] = topTextUseState;
  const [bottomText, setBottomText] = bottomTextUseState;

  return (
    <View>
      <TextInput
        className={LocalStyle.getTopTextInputStyle()}
        onChangeText={(text: string) => {
          setTopText(verifyNumber(text));
        }}
        value={topText}
        keyboardType="number-pad"
        maxLength={1}
        placeholder="0"
        placeholderTextColor={selectStyle([
          colors.quaternary_light,
          colors.quaternary_dark,
        ])}
      />
      <TextInput
        className={LocalStyle.getBottomTextInputStyle()}
        onChangeText={setBottomText}
        value={bottomText}
        placeholder="Comment"
        placeholderTextColor={selectStyle([
          colors.quaternary_light,
          colors.quaternary_dark,
        ])}
      />
    </View>
  );
};

export { DoubleTextInput, DoubleTextInputProps };
