import { View, Image, Text, ScrollView, ActivityIndicator } from "react-native";
import { Movie, getMovieByIdApi } from "../../services/altenHybridApi";
import { Fragment, useState } from "react";
import { colors } from "../../styles/tailwindColors";

function ListCard({ title, content }: { title: string; content: string[] }) {
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
}

function TextCard({ title, content }: { title: string; content: string }) {
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
}

async function loadMovie(
  setMovie: Function,
  setLoaded: Function,
  movieId: string
) {
  setMovie(await getMovieByIdApi(movieId));
  setLoaded(true);
}

export function MovieDetailsScreen({ route }: { route: any }) {
  const { movieId }: { movieId: string } = route.params;
  const [movie, setMovie] = useState({} as Movie);
  const [loaded, setLoaded] = useState(false);
  loadMovie(setMovie, setLoaded, movieId);
  console.log(movie);
  return (
    <ScrollView className="flex-1 bg-secondary_color">
      {loaded ? (
        <ActivityIndicator
          size="large"
          className={"flex-1 items-center justify-center"}
          color={colors.tertiary_color}
        />
      ) : (
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
}
