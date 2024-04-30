import { View, Text, Image } from "react-native";
import { Movie } from "../services/altenHybridApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MoviesNavStackNavigation } from "../navigations/MoviesNav";
import { joinStyles } from "../utils/joinStyles";

type MovieCardProps = { movie: Movie };

class LocalStyle {
  public static getCardStyle(): string {
    const commonStyle: string = "m-5 flex-col rounded-lg shadow-lg";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinStyles(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTitleStyle(): string {
    const commonStyle: string = "text-center font-bold text-xl my-2.5";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinStyles(commonStyle, [lightStyle, darkStyle]);
  }

  public static getImageStyle(): string {
    const commonStyle: string = "aspect-square rounded-b-lg";

    return commonStyle;
  }
}

const navigateToDetails = (movieId: string): void => {
  const navigation = useNavigation() as MoviesNavStackNavigation;
  navigation.navigate("MovieDetailsStack", { movieId });
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <View className={LocalStyle.getCardStyle()}>
      <TouchableOpacity onPress={() => navigateToDetails(movie.id)}>
        <View>
          <Text className={LocalStyle.getTitleStyle()}>{movie.name}</Text>
          <Image
            source={{ uri: movie.pictureUrl }}
            className={LocalStyle.getImageStyle()}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { MovieCard, MovieCardProps };
