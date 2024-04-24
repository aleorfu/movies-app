import { View } from "react-native";
import { Button } from "../components/Button";
import messaging from "@react-native-firebase/messaging";

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-secondary_color">
      <Button text="Suscribe" />
    </View>
  );
};

export { HomeScreen };
