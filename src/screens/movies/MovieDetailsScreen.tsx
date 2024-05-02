import { Image, Text, ScrollView } from "react-native";
import { Movie, getMovieByIdApi } from "../../services/altenHybridApi";
import { Fragment, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { joinClassNames } from "../../utils/styleExtras";
import { ListCard } from "../../components/ListCard";
import { TextCard } from "../../components/TextCard";
import { CommentArea } from "../../components/CommentArea";

class LocalStyle {
  public static getScrollViewStyle(): string {
    const commonStyle: string = "flex-1";
    const lightStyle: string = "bg-secondary_light";
    const darkStyle: string = "bg-secondary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTitleStyle(): string {
    const commonStyle: string = "text-3xl font-bold text-center m-2.5";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getImageStyle(): string {
    const commonStyle: string = "aspect-square";
    return commonStyle;
  }
}

const MovieDetailsScreen = (): React.JSX.Element => {
  const { movieId } = useRoute().params as {
    movieId: string;
  };
  const [movie, setMovie] = useState<Movie>();
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    getMovieByIdApi(movieId).then((movie) => {
      setMovie(movie);
    });
  }, [refresh, movieId]);

  const refreshData = (): void => {
    setRefresh(!refresh);
  };

  return (
    <ScrollView className={LocalStyle.getScrollViewStyle()}>
      {movie && (
        <Fragment>
          <Image
            source={{ uri: movie.pictureUrl }}
            className={LocalStyle.getImageStyle()}
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
          <CommentArea movie={movie} refresh={refreshData} />
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };
