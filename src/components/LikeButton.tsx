import { Signal, useSignal } from "@preact/signals-react";
import { Button } from "@src/components/Button";
import { likeMovie } from "@src/services/altenHybridApi";
import React, { useCallback, useEffect } from "react";
import { Alert, useColorScheme } from "react-native";
import FilledLikeIcon from "../assets/img/like-filled-icon.svg";
import LikeIcon from "../assets/img/like-icon.svg";
import { colors } from "@src/styles/tailwindColors";

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

const LikeButton = ({
  movieId,
  movieUserLiked,
  userId,
}: LikeButtonProps): React.JSX.Element => {
  const loadingLikeSignal: Signal<boolean> = useSignal<boolean>(false);
  const movieLikedSignal: Signal<boolean> = useSignal<boolean>(
    movieUserLiked.includes(userId),
  );

  const isLight: boolean = useColorScheme() === "light";

  useEffect((): void => {
    movieLikedSignal.value = movieUserLiked.includes(userId);
  }, [movieUserLiked, userId]);

  const handleLikeButton = useCallback((): void => {
    loadingLikeSignal.value = true;
    likeMovie(movieId, userId)
      .then((liked: boolean): void => {
        movieLikedSignal.value = liked;
      })
      .catch((): void => {
        Alert.alert(
          "There was an error when sending your like.",
          "Please, try again later.",
        );
      })
      .finally((): void => {
        loadingLikeSignal.value = false;
      });
  }, [movieId, userId]);

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
