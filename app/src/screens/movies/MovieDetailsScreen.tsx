import { View, Image, Text, ScrollView, useColorScheme } from "react-native";
import { Movie, getMovieByIdApi } from "../../services/altenHybridApi";
import { Fragment, useState } from "react";
import { useRoute } from "@react-navigation/native";

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
  const isLight = useColorScheme() === "light";
  loadMovie(setMovie, movieId);

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
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };
