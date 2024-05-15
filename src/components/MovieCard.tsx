import { useNavigation } from "@react-navigation/native";
import { LikeButton } from "@src/components/LikeButton";
import { MoviesNavStackNavigation } from "@src/navigations/MoviesNav";
import { Movie } from "@src/services/altenHybridApi";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getUserSignal } from "@src/signals/userSignal";

type MovieCardProps = { movie: Movie };

const style = {
  card: "m-5 flex-col rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  title:
    "text-center font-bold text-xl my-2.5 text-quaternary_light dark:text-quaternary_dark",
  image: "aspect-square",
};

const navigateToMovieDetails = (
  movieId: string,
  navigation: MoviesNavStackNavigation,
): void => {
  navigation.navigate("MovieDetailsStack", { movieId: movieId });
};

const MovieCard = ({ movie }: MovieCardProps): React.JSX.Element => {
  const navigation = useNavigation() as MoviesNavStackNavigation;
  const localUser = getUserSignal.value;

  const handleOnPress = (): void => {
    navigateToMovieDetails(movie.id, navigation);
  };

  return (
    <View className={style.card}>
      <TouchableOpacity onPress={handleOnPress}>
        <View>
          <Text className={style.title}>{movie.name}</Text>
          <Image
            source={{ uri: movie.pictureUrl }}
            className={style.image}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      {localUser && (
        <LikeButton
          movieId={movie.id}
          movieUserLiked={movie.userLiked ?? []}
          userId={localUser.uid}
        />
      )}
    </View>
  );
};

export { MovieCard, MovieCardProps };
