import { ActivityIndicator, Text, View, useColorScheme } from "react-native";
import { CommentCard } from "./CommentCard";
import { DoubleTextInput } from "./DoubleTextInput";
import { Button } from "./Button";
import { Movie, Rating, rateMovie } from "../services/altenHybridApi";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { colors } from "../styles/tailwindColors";

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
) => {
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
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  return (
    <View>
      <Text className={style.title}>
        Comments ({movie.ratings?.length ?? "0"})
      </Text>
      {movieRatings?.map((rating: Rating, index: number) => (
        <CommentCard
          key={index}
          content={rating.comment}
          rating={rating.rating}
        />
      ))}
      {user && (
        <Fragment>
          <DoubleTextInput
            topTextUseState={[ratingText, setRatingText]}
            bottomTextUseState={[contentText, setContentText]}
            editable={sendingRating ? false : true}
          />
          <Button
            text={sendingRating ? undefined : "Send"}
            component={
              sendingRating ? (
                <ActivityIndicator
                  size="small"
                  color={
                    isLight ? colors.quaternary_light : colors.quaternary_dark
                  }
                />
              ) : undefined
            }
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
              ).then(() => {
                setRatingText("");
                setContentText("");
                setSendingRating(false);
              });
            }}
            disable={sendingRating ? true : false}
          />
        </Fragment>
      )}
    </View>
  );
};

export { CommentArea };
