import { Signal, useSignal } from "@preact/signals-react";
import { Button } from "@src/components/Button";
import { CommentCard } from "@src/components/CommentCard";
import { RatingTextInput } from "@src/components/RatingTextInput";
import { rateMovie, Rating } from "@src/services/altenHybridApi";
import { getUserSignal } from "@src/signals/userSignal";
import React, { Fragment } from "react";
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

const sendRating = (
  userId: string,
  movieId: string,
  contentTextSignal: Signal<string>,
  ratingTextSignal: Signal<string>,
  movieRatingsSignal: Signal<Rating[]>,
  loadingSendingSignal: Signal<boolean>,
): void => {
  loadingSendingSignal.value = true;

  const rating: Rating = {
    userId: userId,
    comment: contentTextSignal.value,
    rating: Number(ratingTextSignal.value),
  };

  const handleRateMovieSuccess = (): void => {
    const newMovieRatings = [...movieRatingsSignal.value];

    const existingRatingIndex = newMovieRatings.findIndex(
      (r: Rating) => r.userId === userId,
    );

    if (existingRatingIndex !== -1) {
      newMovieRatings[existingRatingIndex] = rating;
    } else {
      newMovieRatings.push(rating);
    }

    movieRatingsSignal.value = newMovieRatings;
    ratingTextSignal.value = "";
    contentTextSignal.value = "";
  };

  const handleRateMovieFailure = (): void => {
    Alert.alert(
      "There was an error while sending your rating.",
      "Please, try again later.",
    );
  };

  const handleRateMovieFinally = (): void => {
    loadingSendingSignal.value = false;
  };

  rateMovie(movieId, rating)
    .then(handleRateMovieSuccess)
    .catch(handleRateMovieFailure)
    .finally(handleRateMovieFinally);
};

const CommentArea = ({
  movieId,
  movieRatings: initialMovieRatings,
}: CommentAreaProps): React.JSX.Element => {
  const loadingSendingSignal = useSignal(false);
  const ratingTextSignal = useSignal("");
  const contentTextSignal = useSignal("");
  const movieRatingsSignal = useSignal(initialMovieRatings);

  const localUser = getUserSignal.value;

  const handleSendOnPress = (): void => {
    sendRating(
      localUser!!.uid,
      movieId,
      contentTextSignal,
      ratingTextSignal,
      movieRatingsSignal,
      loadingSendingSignal,
    );
  };

  return (
    <View>
      <Text className={style.title}>
        Comments ({movieRatingsSignal.value?.length ?? "0"})
      </Text>
      {movieRatingsSignal.value?.map((rating) => (
        <CommentCard key={rating.userId} rating={rating} />
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
            onPress={handleSendOnPress}
          />
        </Fragment>
      )}
    </View>
  );
};

export { CommentArea, CommentAreaProps };
