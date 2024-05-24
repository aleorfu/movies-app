import { Signal, useSignal } from "@preact/signals-react";
import { Button } from "@src/components/Button";
import { likeMovie, Movie } from "@src/services/altenHybridApi";
import React, { useEffect } from "react";
import { Alert, useColorScheme } from "react-native";
import FilledLikeIcon from "../assets/img/like-filled-icon.svg";
import LikeIcon from "../assets/img/like-icon.svg";
import { colors } from "@src/styles/tailwindColors";
import { refreshLikedMovies } from "@src/signals/likedMoviesSignal";

type LikeButtonProps = {
  movieId: string;
  movieUserLiked: string[];
  userId: string;
};

const style = {
  button: {
    button:
      "ml-auto my-5 mr-5 shadow-lg rounded-lg p-2 flex-row bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "ml-2 text-quaternary_light dark:text-quaternary_dark",
  },
};

const sendLike = (
  movieId: string,
  userId: string,
  movieLikedSignal: Signal<boolean>,
  loadingLikeSignal: Signal<boolean>,
): void => {
  loadingLikeSignal.value = true;

  const handleLikeMovieSuccess = (movie: Movie): void => {
    movieLikedSignal.value = movie.userLiked?.includes(userId) ?? false;
    refreshLikedMovies();
  };

  const handleLikeMovieFailure = (): void => {
    Alert.alert(
      "There was an error when sending your like.",
      "Please, try again later.",
    );
  };

  const handleLikeMovieFinally = (): void => {
    loadingLikeSignal.value = false;
  };

  likeMovie(movieId, userId)
    .then(handleLikeMovieSuccess)
    .catch(handleLikeMovieFailure)
    .finally(handleLikeMovieFinally);
};

const LikeButton = ({
  movieId,
  movieUserLiked,
  userId,
}: LikeButtonProps): React.JSX.Element => {
  const loadingLikeSignal = useSignal(false);
  const movieLikedSignal = useSignal(false);

  const isLight = useColorScheme() === "light";

  useEffect(() => {
    movieLikedSignal.value = movieUserLiked.includes(userId);
  }, [movieUserLiked, userId]);

  const handleLikeButton = (): void => {
    sendLike(movieId, userId, movieLikedSignal, loadingLikeSignal);
  };

  return (
    <Button
      text={movieLikedSignal.value ? "Liked" : "Like"}
      image={
        movieLikedSignal.value ? (
          <FilledLikeIcon
            width={20}
            height={20}
            color={isLight ? colors.quaternary_light : colors.quaternary_dark}
          />
        ) : (
          <LikeIcon
            width={20}
            height={20}
            color={isLight ? colors.quaternary_light : colors.quaternary_dark}
          />
        )
      }
      buttonClassName={style.button.button}
      textClassName={style.button.text}
      loading={loadingLikeSignal.value}
      onPress={handleLikeButton}
    />
  );
};

export { LikeButton, LikeButtonProps };
