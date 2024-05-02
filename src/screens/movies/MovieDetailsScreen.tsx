import { Image, Text, ScrollView } from "react-native";
import { Movie, getMovieByIdApi } from "../../services/altenHybridApi";
import { Fragment, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { joinClassNames } from "../../utils/styleExtras";
import { ListCard } from "../../components/ListCard";
import { TextCard } from "../../components/TextCard";
import { CommentArea } from "../../components/CommentArea";

class LocalStyle {
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

const MovieDetailsScreen = (): React.JSX.Element => {
  const { movieId } = useRoute().params as {
    movieId: string;
  };
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    getMovieByIdApi(movieId).then((movie) => {
      setMovie(movie);
    });
  }, [setMovie, movieId]);

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
          <TextCard title={"Description"} content={movie.description} />
          <ListCard title={"Actors"} content={movie.actors} />
          <ListCard title={"Categories"} content={movie.categories} />
          <ListCard
            title={"Other data"}
            content={[
              `Duración: ${movie.duration}`,
              `Valoración: ${movie.rating}/5`,
            ]}
          />
          <CommentArea movie={movie} />
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };
