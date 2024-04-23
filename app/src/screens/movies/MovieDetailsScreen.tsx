import { View, Image, Text, ScrollView } from "react-native";
import { Movie, getMovieByIdApi } from "../../services/altenHybridApi";
import { Fragment, useState } from "react";

const ListCard = ({ title, content }: { title: string; content: string[] }) => {
  return (
    <View className="bg-tertiary_color m-5 rounded-lg">
      <Text className="text-xl font-extrabold text-center m-2.5 text-quaternary_color">
        {title}
      </Text>
      <View>
        {content.map((item, index) => (
          <Text
            key={index}
            className="text-quaternary_color m-5 text-xl text-center"
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

const TextCard = ({ title, content }: { title: string; content: string }) => {
  return (
    <View className="bg-tertiary_color m-5 rounded-lg">
      <Text className="text-xl font-extrabold text-center m-2.5 text-quaternary_color">
        {title}
      </Text>
      <Text className="text-quaternary_color m-5 text-xl text-center">
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

const MovieDetailsScreen = ({ route }: { route?: any }) => {
  const { movieId }: { movieId: string } = route.params;
  const [movie, setMovie] = useState<Movie>();
  loadMovie(setMovie, movieId);

  return (
    <ScrollView className="flex-1 bg-secondary_color">
      {movie && (
        <Fragment>
          <Image
            source={{ uri: movie.pictureUrl }}
            className="aspect-square"
            resizeMode="cover"
          />
          <Text className="text-quaternary_color text-3xl font-extrabold text-center m-2.5">
            {movie.name}
          </Text>
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
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };