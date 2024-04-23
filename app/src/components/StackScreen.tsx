import { colors } from "../styles/tailwindColors";
import { Image } from "react-native";
import { images } from "../constants/images";

const StackScreen = ({
  Stack,
  name,
  component,
}: {
  Stack: any;
  name: string;
  component: any;
}) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primary_color },
        headerTitleStyle: { color: colors.quaternary_color },
        headerBackImage: () => (
          <Image className="w-6 h-6" source={images.back_icon} />
        ),
      }}
    />
  );
};

export { StackScreen };
