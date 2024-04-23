import { View, Text, Image } from "react-native";
import { Movie } from "../services/altenHybridApi";
import { TouchableHighlight } from "react-native-gesture-handler";

const MovieCard = ({
  navigation,
  movie,
}: {
  navigation: any;
  movie: Movie;
}) => {
  return (
    <View className="bg-tertiary_color m-5 flex-col rounded-lg">
      <TouchableHighlight
        onPress={() => {
          const movieId = movie.id;
          navigation.navigate("Details", { movieId });
        }}
      >
        <View>
          <Text className="text-quaternary_color text-center font-extrabold text-xl my-2.5">
            {movie.name}
          </Text>
          <Image
            source={{ uri: movie.pictureUrl }}
            className="aspect-square rounded-bl-lg rounded-br-lg"
            resizeMode="cover"
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export { MovieCard };
