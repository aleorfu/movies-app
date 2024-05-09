import { useNavigation } from "@react-navigation/native";
import { LikeButton } from "@src/components/LikeButton";
import { MoviesNavStackNavigation } from "@src/navigations/MoviesNav";
import { Movie } from "@src/services/altenHybridApi";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getUserSignal, UserType } from "@src/signals/userSignal";

type MovieCardProps = { movie: Movie };

const style = {
  card: "m-5 flex-col rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  title:
    "text-center font-bold text-xl my-2.5 text-quaternary_light dark:text-quaternary_dark",
  image: "aspect-square",
};

const MovieCard = ({ movie }: MovieCardProps): React.JSX.Element => {
  const navigation: MoviesNavStackNavigation =
    useNavigation() as MoviesNavStackNavigation;

  const localUser: UserType = getUserSignal.value;

  return (
    <View className={style.card}>
      <TouchableOpacity
        onPress={(): void => {
          const movieId: string = movie.id;
          navigation.navigate("MovieDetailsStack", { movieId });
        }}
      >
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
