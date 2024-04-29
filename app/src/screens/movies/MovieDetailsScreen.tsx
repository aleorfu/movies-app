import { View, Image, Text, ScrollView, useColorScheme } from "react-native";
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

const ListCard = ({
  title,
  content,
  isLight,
}: {
  title: string;
  content: string[];
  isLight: Boolean;
}) => {
  return (
    <View
      className={
        isLight
          ? "bg-primary_light m-5 rounded-lg shadow-lg shadow-black"
          : "bg-primary_dark m-5 rounded-lg shadow-lg shadow-white"
      }
    >
      <Text
        className={
          isLight
            ? "text-xl font-extrabold text-center m-2.5 text-quaternary_light"
            : "text-xl font-extrabold text-center m-2.5 text-quaternary_dark"
        }
      >
        {title}
      </Text>
      <View>
        {content.map((item, index) => (
          <Text
            key={index}
            className={
              isLight
                ? "text-quaternary_light m-5 text-xl text-center"
                : "text-quaternary_dark m-5 text-xl text-center"
            }
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

const TextCard = ({
  title,
  content,
  isLight,
}: {
  title: string;
  content: string;
  isLight: Boolean;
}) => {
  return (
    <View
      className={
        isLight
          ? "bg-primary_light m-5 rounded-lg shadow-lg shadow-black"
          : "bg-primary_dark m-5 rounded-lg shadow-lg shadow-whtie"
      }
    >
      <Text
        className={
          isLight
            ? "text-xl font-extrabold text-center m-2.5 text-quaternary_light"
            : "text-xl font-extrabold text-center m-2.5 text-quaternary_dark"
        }
      >
        {title}
      </Text>
      <Text
        className={
          isLight
            ? "text-quaternary_light m-5 text-xl text-center"
            : "text-quaternary_dark m-5 text-xl text-center"
        }
      >
        {content}
      </Text>
    </View>
  );
};

const Comment = ({
  content,
  rating,
  isLight,
}: {
  content: string;
  rating: number;
  isLight: Boolean;
}) => {
  return (
    <View
      className={
        isLight
          ? "bg-primary_light shadow-lg shadow-black mx-5 mt-5 p-2 rounded-lg"
          : "bg-primary_dark shadow-lg shadow-white mx-5 mt-5 p-2 rounded-lg"
      }
    >
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
  const isLight = useColorScheme() === "light";
  useEffect(() => {
    loadMovie(setMovie, movieId);
  }, [loadMovie, setMovie, movieId]);

  return (
    <ScrollView
      className={
        isLight ? "flex-1 bg-secondary_light" : "flex-1 bg-secondary_dark"
      }
    >
      {movie && (
        <Fragment>
          <Image
            source={{ uri: movie.pictureUrl }}
            className="aspect-square"
            resizeMode="cover"
          />
          <Text
            className={
              isLight
                ? "text-quaternary_light text-3xl font-bold text-center m-2.5"
                : "text-quaternary_dark text-3xl font-bold text-center m-2.5"
            }
          >
            {movie.name}
          </Text>
          <TextCard
            title={"Descripción"}
            content={movie.description}
            isLight={isLight}
          />
          <ListCard
            title={"Actores"}
            content={movie.actors}
            isLight={isLight}
          />
          <ListCard
            title={"Categoría"}
            content={movie.categories}
            isLight={isLight}
          />
          <ListCard
            title={"Otros datos"}
            content={[
              `Duración: ${movie.duration}`,
              `Valoración: ${movie.rating}/5`,
            ]}
            isLight={isLight}
          />
          <View>
            {movie.ratings?.map((rating, index) => (
              <Comment
                key={index}
                content={rating.comment}
                rating={rating.rating}
                isLight={isLight}
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
