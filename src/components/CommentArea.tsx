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
    const commonStyle = "mx-10 mb-5 p-2 rounded-lg shadow-lg";
    const lightStyle = "bg-primary_light shadow-black";
    const darkStyle = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTextStyle(): string {
    const commonStyle = "text-center";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTitleStyle() {
    const commonStyle = "text-3xl font-bold text-center m-2.5";
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
        onPress={async () => {
          const user = auth().currentUser;
          if (user === null) {
            Alert.alert("Not signed-in", "You must sign-in to comment");
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
