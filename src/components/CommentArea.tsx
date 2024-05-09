import { Signal, useSignal } from "@preact/signals-react";
import { Button } from "@src/components/Button";
import { CommentCard } from "@src/components/CommentCard";
import { RatingTextInput } from "@src/components/RatingTextInput";
import { Movie, rateMovie, Rating } from "@src/services/altenHybridApi";
import { getUserSignal } from "@src/signals/userSignal";
import React, { Fragment } from "react";
import { Alert, Text, View } from "react-native";

type CommentAreaProps = {
  movie: Movie;
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

const sendRating = async (
  movieId: string,
  userId: string,
  ratingText: Signal<string>,
  contentText: Signal<string>,
  movieRatings: Signal<Rating[]>,
): Promise<void | never> => {
  const rating: Rating = {
    userId: userId,
    comment: contentText.value,
    rating: Number(ratingText.value),
  };

  await rateMovie(movieId, rating).then(() => {
    const prevMovieRatings = movieRatings.value;

    const existingRatingIndex = prevMovieRatings.findIndex(
      (r) => r.userId === userId,
    );

    if (existingRatingIndex !== -1) {
      const updatedRatings = [...prevMovieRatings];
      updatedRatings[existingRatingIndex] = rating;

      movieRatings.value = updatedRatings;
    } else {
      movieRatings.value = [...prevMovieRatings, rating];
    }
  });
};

const CommentArea = ({ movie }: CommentAreaProps): React.JSX.Element => {
  const ratingText: Signal<string> = useSignal<string>("");
  const contentText: Signal<string> = useSignal<string>("");
  const movieRatings: Signal<Rating[]> = useSignal<Rating[]>(movie.ratings);

  const localUser = getUserSignal.value;

  return (
    <View>
      <Text className={style.title}>
        Comments ({movieRatings.value?.length ?? "0"})
      </Text>
      {movieRatings.value?.map((rating: Rating, index: number) => (
        <CommentCard key={index} rating={rating} />
      ))}
      {localUser && (
        <Fragment>
          <RatingTextInput ratingText={ratingText} contentText={contentText} />
          <Button
            text="Send"
            buttonClassName={style.button.button}
            textClassName={style.button.text}
            onPress={async () => {
              await sendRating(
                movie.id,
                localUser.uid,
                ratingText,
                contentText,
                movieRatings,
              )
                .then(() => {
                  ratingText.value = "";
                  contentText.value = "";
                })
                .catch(() => {
                  Alert.alert(
                    "There was an error while sending your rating.",
                    "Please, try again later.",
                  );
                });
            }}
          />
        </Fragment>
      )}
    </View>
  );
};

export { CommentArea, CommentAreaProps };
