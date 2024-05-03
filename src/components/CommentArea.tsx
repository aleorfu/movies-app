import { Alert, Text, View } from "react-native";
import { CommentCard } from "./CommentCard";
import { DoubleTextInput } from "./DoubleTextInput";
import { Button } from "./Button";
import { Movie, Rating, rateMovie } from "../services/altenHybridApi";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

type CommentAreaProps = {
  movie: Movie;
  refresh: () => void;
};

type TextUseState = [string, React.Dispatch<React.SetStateAction<string>>];

const style = {
  title:
    "text-3xl font-bold text-center m-2.5 text-quaternary_light dark:text-quaternary_dark",
  button: {
    button:
      "mx-10 mb-5 p-2 rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    text: "text-center text-quaternary_light dark:text-quaternary_dark",
  },
};

const sendComment = async (
  movieId: string,
  contentText: string,
  ratingText: string
): Promise<void> => {
  const user = auth().currentUser;
  if (user === null) {
    Alert.alert("Not signed-in", "You must sign-in to comment");
  } else {
    const rating: Rating = {
      userId: user.uid,
      comment: contentText,
      rating: Number(ratingText),
    };
    await rateMovie(movieId, rating);
  }
};

const CommentArea = ({
  movie,
  refresh,
}: CommentAreaProps): React.JSX.Element => {
  const [ratingText, setRatingText]: TextUseState = useState<string>("");
  const [contentText, setContentText]: TextUseState = useState<string>("");

  return (
    <View>
      <Text className={style.title}>
        Comments ({movie.ratings?.length ?? "0"})
      </Text>
      {movie.ratings?.map((rating: Rating, index: number) => (
        <CommentCard
          key={index}
          content={rating.comment}
          rating={rating.rating}
        />
      ))}
      <DoubleTextInput
        topTextUseState={[ratingText, setRatingText]}
        bottomTextUseState={[contentText, setContentText]}
      />
      <Button
        text="Send"
        buttonClassName={style.button.button}
        textClassName={style.button.text}
        onPress={() => {
          const movieId = movie.id;
          sendComment(movieId, contentText, ratingText).then(() => {
            refresh();
          });
          setRatingText("");
          setContentText("");
        }}
      />
    </View>
  );
};

export { CommentArea };
