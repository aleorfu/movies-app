import { Alert, Text, View } from "react-native";
import { CommentCard } from "./CommentCard";
import { RatingTextInput } from "./RatingTextInput";
import { Button } from "./Button";
import { Movie, Rating, rateMovie } from "../services/altenHybridApi";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

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
  contentText: string,
  ratingText: string,
  userId: string,
  setMovieRatings: React.Dispatch<React.SetStateAction<Rating[]>>
): Promise<void | never> => {
  const rating: Rating = {
    userId: userId,
    comment: contentText,
    rating: Number(ratingText),
  };

  await rateMovie(movieId, rating).then(() => {
    setMovieRatings((prevMovieRatings) => {
      const existingRatingIndex = prevMovieRatings.findIndex(
        (r) => r.userId === userId
      );

      if (existingRatingIndex !== -1) {
        const updatedRatings = [...prevMovieRatings];
        updatedRatings[existingRatingIndex] = rating;
        return updatedRatings;
      } else {
        return [...prevMovieRatings, rating];
      }
    });
  });
};

const CommentArea = ({ movie }: CommentAreaProps): React.JSX.Element => {
  const [ratingText, setRatingText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [movieRatings, setMovieRatings] = useState<Rating[]>(movie.ratings);
  const [sendingRating, setSendingRating] = useState<boolean>(false);
  const user = useContext(UserContext);

  return (
    <View>
      <Text className={style.title}>
        Comments ({movieRatings?.length ?? "0"})
      </Text>
      {movieRatings?.map((rating: Rating, index: number) => (
        <CommentCard key={index} rating={rating} />
      ))}
      {user && (
        <Fragment>
          <RatingTextInput
            topTextUseState={[ratingText, setRatingText]}
            bottomTextUseState={[contentText, setContentText]}
            editable={!sendingRating}
          />
          <Button
            text="Send"
            buttonClassName={style.button.button}
            textClassName={style.button.text}
            onPress={() => {
              setSendingRating(true);
              sendRating(
                movie.id,
                contentText,
                ratingText,
                user.uid,
                setMovieRatings
              )
                .then(() => {
                  setRatingText("");
                  setContentText("");
                })
                .catch(() => {
                  Alert.alert(
                    "There was an error while sending your rating.",
                    "Please try again later."
                  );
                })
                .finally(() => {
                  setSendingRating(false);
                });
            }}
            loading={sendingRating}
          />
        </Fragment>
      )}
    </View>
  );
};

export { CommentArea };
