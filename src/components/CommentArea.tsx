import { Signal, useSignal } from "@preact/signals-react";
import { Button } from "@src/components/Button";
import { CommentCard } from "@src/components/CommentCard";
import { RatingTextInput } from "@src/components/RatingTextInput";
import { rateMovie, Rating } from "@src/services/altenHybridApi";
import { getUserSignal, UserType } from "@src/signals/userSignal";
import React, { Fragment, useCallback } from "react";
import { Alert, Text, View } from "react-native";

type CommentAreaProps = {
  movieId: string;
  movieRatings: Rating[];
};

const style = {
  title:
    "text-3xl font-bold text-center m-2.5 text-quaternary_light dark:text-quaternary_dark",
  button: {
    button:
      "mx-10 mb-5 p-2 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const CommentArea = ({
  movieId,
  movieRatings: initialMovieRatings,
}: CommentAreaProps): React.JSX.Element => {
  const loadingSendingSignal: Signal<boolean> = useSignal<boolean>(false);
  const ratingTextSignal: Signal<string> = useSignal<string>("");
  const contentTextSignal: Signal<string> = useSignal<string>("");
  const movieRatingsSignal: Signal<Rating[]> =
    useSignal<Rating[]>(initialMovieRatings);

  const localUser: UserType = getUserSignal.value;

  const handleSending = useCallback(
    (
      userId: string,
      ratingText: string,
      contentText: string,
      movieRatings: Rating[],
    ): void => {
      loadingSendingSignal.value = true;
      if (isNaN(Number(ratingText))) {
        Alert.alert(
          "Invalid rating value.",
          "Please, insert a number in rating field and try again.",
        );
        loadingSendingSignal.value = false;
        return;
      }

      const rating: Rating = {
        userId: userId,
        comment: contentText,
        rating: Number(ratingText),
      };

      rateMovie(movieId, rating)
        .then((): void => {
          const prevMovieRatings: Rating[] = movieRatings;

          const existingRatingIndex: number = prevMovieRatings.findIndex(
            (r: Rating): boolean => r.userId === userId,
          );

          if (existingRatingIndex !== -1) {
            const updatedRatings: Rating[] = [...prevMovieRatings];
            updatedRatings[existingRatingIndex] = rating;

            movieRatingsSignal.value = updatedRatings;
          } else {
            movieRatingsSignal.value = [...prevMovieRatings, rating];
          }
          ratingTextSignal.value = "";
          contentTextSignal.value = "";
        })
        .catch((): void => {
          Alert.alert(
            "There was an error while sending your rating.",
            "Please, try again later.",
          );
        })
        .finally(() => {
          loadingSendingSignal.value = false;
        });
    },
    [movieId],
  );

  return (
    <View>
      <Text className={style.title}>
        Comments ({movieRatingsSignal.value?.length ?? "0"})
      </Text>
      {movieRatingsSignal.value?.map((rating: Rating, index: number) => (
        <CommentCard key={index} rating={rating} />
      ))}
      {localUser && (
        <Fragment>
          <RatingTextInput
            ratingText={ratingTextSignal}
            contentText={contentTextSignal}
          />
          <Button
            text="Send"
            buttonClassName={style.button.button}
            textClassName={style.button.text}
            loading={loadingSendingSignal.value}
            onPress={() =>
              handleSending(
                localUser.uid,
                ratingTextSignal.value,
                contentTextSignal.value,
                movieRatingsSignal.value,
              )
            }
          />
        </Fragment>
      )}
    </View>
  );
};

export { CommentArea, CommentAreaProps };
