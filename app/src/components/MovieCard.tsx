import { View, Text, Image, useColorScheme } from "react-native";
import { Movie } from "../services/altenHybridApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MoviesNavStackNavigation } from "../navigations/MoviesNav";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const navigation = useNavigation() as MoviesNavStackNavigation;
  const isLight = useColorScheme() === "light";

  return (
    <View
      className={
        isLight
          ? "bg-primary_light m-5 flex-col rounded-lg shadow-lg shadow-black"
          : "bg-primary_dark m-5 flex-col rounded-lg shadow-lg shadow-white"
      }
    >
      <TouchableOpacity
        onPress={() => {
          const movieId = movie.id;
          navigation.navigate("MovieDetailsStack", { movieId });
        }}
      >
        <View>
          <Text
            className={
              isLight
                ? "text-quaternary_light text-center font-bold text-xl my-2.5"
                : "text-quaternary_dark text-center font-bold text-xl my-2.5"
            }
          >
            {movie.name}
          </Text>
          <Image
            source={{ uri: movie.pictureUrl }}
            className="aspect-square rounded-bl-lg rounded-br-lg"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { MovieCard };
