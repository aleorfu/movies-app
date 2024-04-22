import { View, Text, Image, ActivityIndicator } from "react-native";
import { Movie } from "../services/altenHybridApi";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useState } from "react";
import { colors } from "../styles/tailwindColors";

const MovieCard = ({
  navigation,
  movie,
}: {
  navigation: any;
  movie: Movie;
}) => {
  const [loadingImage, setLoadingImage] = useState(false);

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
            onLoadStart={() => setLoadingImage(true)}
            onLoadEnd={() => setLoadingImage(false)}
          />
          {loadingImage && (
            <ActivityIndicator size="large" color={colors.tertiary_color} />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

export { MovieCard };
