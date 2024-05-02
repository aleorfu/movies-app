import { View } from "react-native";
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
    const commonStyle = "mx-10 mb-5 p-2 rounded-lg";
    const lightStyle = "bg-primary_light";
    const darkStyle = "bg-primary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTextStyle(): string {
    const commonStyle = "text-center";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const CommentArea = ({ movie }: CommentAreaProps) => {
  const [ratingText, setRatingText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");

  return (
    <View>
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
        onPress={async () => {
          const user = auth().currentUser;
          if (user === null) {
            console.log("mami");
          } else {
            const rating: Rating = {
              userId: user.uid,
              comment: contentText,
              rating: Number(ratingText),
            };
            await rateMovie(movie.id, rating);
          }
        }}
      />
    </View>
  );
};

export { CommentArea };
