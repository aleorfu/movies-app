import { Alert, Text, View } from "react-native";
import { CommentCard } from "./CommentCard";
import { DoubleTextInput } from "./DoubleTextInput";
import { Button } from "./Button";
import { Movie, Rating, rateMovie } from "../services/altenHybridApi";
import { useState } from "react";
import { joinClassNames } from "../utils/styleExtras";
import auth from "@react-native-firebase/auth";

type CommentAreaProps = {
  movie: Movie;
};

class LocalStyle {
  public static getButtonStyle(): string {
    const commonStyle: string = "mx-10 mb-5 p-2 rounded-lg shadow-lg";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTextStyle(): string {
    const commonStyle: string = "text-center";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTitleStyle(): string {
    const commonStyle: string = "text-3xl font-bold text-center m-2.5";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

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

const CommentArea = ({ movie }: CommentAreaProps) => {
  const [ratingText, setRatingText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");

  return (
    <View>
      <Text className={LocalStyle.getTitleStyle()}>
        Comments ({movie.ratings?.length})
      </Text>
      {movie.ratings?.map((rating, index) => (
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
        buttonClassName={LocalStyle.getButtonStyle()}
        textClassName={LocalStyle.getTextStyle()}
        onPress={() => {
          sendComment(movie.id, contentText, ratingText);
        }}
      />
    </View>
  );
};

export { CommentArea };
