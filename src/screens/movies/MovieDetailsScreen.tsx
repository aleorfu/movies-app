import { View, Image, Text, ScrollView } from "react-native";
import {
  Movie,
  Rating,
  getMovieByIdApi,
  rateMovie,
} from "../../services/altenHybridApi";
import { Fragment, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { colors } from "../../styles/tailwindColors";
import auth from "@react-native-firebase/auth";
import { joinClassNames } from "../../utils/styleExtras";

class LocalStyle {
  public static getCardStyle() {
    const commonStyle = "m-5 rounded-lg shadow-lg";
    const lightStyle = "bg-primary_light shadow-black";
    const darkStyle = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTextStyle() {
    const commonStyle = "text-xl font-extrabold text-center m-2.5";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getContentStyle() {
    const commonStyle = "m-5 text-xl text-center";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getCommentStyle() {
    const commonStyle = "shadow-lg mx-5 mt-5 p-2 rounded-lg";
    const lightStyle = "bg-primary_light shadow-black";
    const darkStyle = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getScrollViewStyle() {
    const commonStyle = "flex-1";
    const lightStyle = "bg-secondary_light";
    const darkStyle = "bg-secondary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTitleStyle() {
    const commonStyle = "text-3xl font-bold text-center m-2.5";
    const lightStyle = "text-quaternary_light";
    const darkStyle = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const ListCard = ({ title, content }: { title: string; content: string[] }) => {
  return (
    <View className={LocalStyle.getCardStyle()}>
      <Text className={LocalStyle.getTextStyle()}>{title}</Text>
      <View>
        {content.map((item, index) => (
          <Text key={index} className={LocalStyle.getContentStyle()}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

const TextCard = ({ title, content }: { title: string; content: string }) => {
  return (
    <View className={LocalStyle.getCardStyle()}>
      <Text className={LocalStyle.getTextStyle()}>{title}</Text>
      <Text className={LocalStyle.getContentStyle()}>{content}</Text>
    </View>
  );
};

const Comment = ({ content, rating }: { content: string; rating: number }) => {
  return (
    <View className={LocalStyle.getCommentStyle()}>
      <Text>{rating}/5</Text>
      <Text>{content}</Text>
    </View>
  );
};

const loadMovie = (setMovie: Function, movieId: string) => {
  getMovieByIdApi(movieId).then((movie) => {
    setMovie(movie);
  });
};

const MovieDetailsScreen = () => {
  const { movieId } = useRoute().params as {
    movieId: string;
  };
  const [movie, setMovie] = useState<Movie>();
  const [ratingText, setRatingText] = useState("");
  const [contentText, setContentText] = useState("");

  useEffect(() => {
    loadMovie(setMovie, movieId);
  }, [loadMovie, setMovie, movieId]);

  return (
    <ScrollView className={LocalStyle.getScrollViewStyle()}>
      {movie && (
        <Fragment>
          <Image
            source={{ uri: movie.pictureUrl }}
            className="aspect-square"
            resizeMode="cover"
          />
          <Text className={LocalStyle.getTitleStyle()}>{movie.name}</Text>
          <TextCard title={"Descripción"} content={movie.description} />
          <ListCard title={"Actores"} content={movie.actors} />
          <ListCard title={"Categoría"} content={movie.categories} />
          <ListCard
            title={"Otros datos"}
            content={[
              `Duración: ${movie.duration}`,
              `Valoración: ${movie.rating}/5`,
            ]}
          />
          <View>
            {movie.ratings?.map((rating, index) => (
              <Comment
                key={index}
                content={rating.comment}
                rating={rating.rating}
              />
            ))}
            <TextInput
              className={
                isLight
                  ? "mx-5 mt-5 rounded-t-lg p-2 text-quaternary_light text-10 bg-primary_light shadow-lg shadow-black"
                  : "mx-5 mt-5 rounded-t-lg p-2 text-quaternary_dark text-10 bg-primary_dark shadow-lg shadow-white"
              }
              onChangeText={(text) => {
                setRatingText(text);
              }}
              value={ratingText}
              keyboardType="number-pad"
              maxLength={1}
              placeholder="0"
              placeholderTextColor={
                isLight ? colors.quaternary_light : colors.quaternary_dark
              }
            />
            <TextInput
              className={
                isLight
                  ? "mx-5 mb-5 rounded-b-lg p-2 text-quaternary_light text-10 bg-primary_light shadow-lg shadow-black"
                  : "mx-5 mb-5 rounded-b-lg p-2 text-quaternary_dark text-10 bg-primary_dark shadow-lg shadow-white"
              }
              onChangeText={(text) => {
                setContentText(text);
              }}
              value={contentText}
              placeholder="Comment"
              placeholderTextColor={
                isLight ? colors.quaternary_light : colors.quaternary_dark
              }
            />
            <Button
              text="Send"
              buttonClassName={
                isLight
                  ? "mx-10 mb-5 p-2 rounded-lg bg-primary_light"
                  : "mx-10 mb-5 p-2 rounded-lg bg-primary_dark"
              }
              textClassName={
                isLight
                  ? "text-center text-quaternary_light"
                  : "text-center text-quaternary_dark"
              }
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
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };
