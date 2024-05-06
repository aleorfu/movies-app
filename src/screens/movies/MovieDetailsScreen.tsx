import { Image, Text, ScrollView } from "react-native";
import { Movie, getMovieByIdApi } from "../../services/altenHybridApi";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ListCard } from "../../components/ListCard";
import { TextCard } from "../../components/TextCard";
import { CommentArea } from "../../components/CommentArea";
import { UserContext } from "../../contexts/UserContext";
import { LikeButton } from "../../components/LikeButton";

const style = {
  scrollView: "flex-1 bg-secondary_light dark:bg-secondary_dark",
  title:
    "text-3xl font-bold text-center m-2.5 text-quaternary_light dark:text-quaternary_dark",
  image: "aspect-square",
  button: {
    button:
      "ml-auto mr-5 shadow-lg rounded-lg p-2 flex-row bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    image: "w-5 h-5 mr-2",
    text: "text-quaternary_light dark:text-quaternary_dark",
  },
};

const MovieDetailsScreen = (): React.JSX.Element => {
  const { movieId } = useRoute().params as {
    movieId: string;
  };
  const user = useContext(UserContext);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    getMovieByIdApi(movieId).then((movie) => {
      setMovie(movie);
    });
  }, [movieId]);

  return (
    <ScrollView className={style.scrollView}>
      {movie && (
        <Fragment>
          <Image
            source={{ uri: movie.pictureUrl }}
            className={style.image}
            resizeMode="cover"
          />
          <Text className={style.title}>{movie.name}</Text>
          {user && <LikeButton movie={movie} user={user} />}
          <TextCard title={"Description"} content={movie.description} />
          <ListCard title={"Actors"} content={movie.actors} />
          <ListCard title={"Categories"} content={movie.categories} />
          <ListCard
            title={"Other data"}
            content={[
              `Duration: ${movie.duration}`,
              `Rate: ${movie.rating}/5`,
              `Likes: ${movie.likes}`,
            ]}
          />
          <CommentArea movie={movie} />
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };
