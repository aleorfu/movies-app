import { Signal, useSignal } from "@preact/signals-react";
import { useRoute } from "@react-navigation/native";
import { CommentArea } from "@src/components/CommentArea";
import { LikeButton } from "@src/components/LikeButton";
import { ListCard } from "@src/components/ListCard";
import { TextCard } from "@src/components/TextCard";
import { getMovieById, Movie } from "@src/services/altenHybridApi";
import React, { Fragment, useEffect } from "react";
import { Alert, Image, RefreshControl, ScrollView, Text } from "react-native";
import { getUserSignal } from "@src/signals/userSignal";
import { MoviesNavProps } from "@src/navigations/MoviesNav";

const style = {
  scrollView: "flex-1 bg-secondary_light dark:bg-secondary_dark",
  title:
    "text-3xl font-bold text-center m-2.5 text-quaternary_light dark:text-quaternary_dark",
  image: "aspect-square",
  button: {
    button:
      "ml-auto mr-5 shadow-lg rounded-lg p-2 flex-row bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    image: "w-5 h-5 mr-2",
    text: "text-quaternary_light dark:text-quaternary_dark",
  },
};

const fetchMovieInfo = (
  movieId: string,
  refreshingSignal: Signal<boolean>,
  movieSignal: Signal<Movie | null>,
): void => {
  refreshingSignal.value = true;

  const handleGetMovieByIdSuccess = (fetchedMovie: Movie): void => {
    movieSignal.value = fetchedMovie;
  };

  const handleGetMovieByIdFailure = (): void => {
    Alert.alert(
      "There was an error while fetching movie info.",
      "Please, try again later.",
    );
  };

  const handleGetMovieByIdFinally = (): void => {
    refreshingSignal.value = false;
  };

  getMovieById(movieId)
    .then(handleGetMovieByIdSuccess)
    .catch(handleGetMovieByIdFailure)
    .finally(handleGetMovieByIdFinally);
};

const MovieDetailsScreen = (): React.JSX.Element => {
  const movieSignal = useSignal<Movie | null>(null);
  const refreshingSignal = useSignal(false);

  const { movieId } = useRoute().params as MoviesNavProps;

  const localUser = getUserSignal.value;

  const handleOnRefresh = () => {
    fetchMovieInfo(movieId, refreshingSignal, movieSignal);
  };

  useEffect(() => {
    fetchMovieInfo(movieId, refreshingSignal, movieSignal);
  }, [movieId]);

  return (
    <ScrollView
      className={style.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshingSignal.value}
          onRefresh={handleOnRefresh}
        />
      }
    >
      {movieSignal.value && (
        <Fragment>
          <Image
            source={{ uri: movieSignal.value.pictureUrl }}
            className={style.image}
            resizeMode="cover"
          />
          <Text className={style.title}>{movieSignal.value.name}</Text>
          {localUser && (
            <LikeButton
              movieId={movieSignal.value.id}
              movieUserLiked={movieSignal.value.userLiked ?? []}
              userId={localUser.uid}
            />
          )}
          <TextCard
            title={"Description"}
            content={movieSignal.value.description}
          />
          <ListCard title={"Actors"} content={movieSignal.value.actors} />
          <ListCard
            title={"Categories"}
            content={movieSignal.value.categories}
          />
          <ListCard
            title={"Other data"}
            content={[
              `Duration: ${movieSignal.value.duration}`,
              `Rate: ${movieSignal.value.rating}/5`,
              `Likes: ${movieSignal.value.likes}`,
            ]}
          />
          <CommentArea
            movieId={movieSignal.value.id}
            movieRatings={movieSignal.value.ratings ?? []}
          />
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };
