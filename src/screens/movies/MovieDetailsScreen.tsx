import { Image, Text, ScrollView } from "react-native";
import {
  Movie,
  getMovieByIdApi,
  likeMovie,
} from "../../services/altenHybridApi";
import { Fragment, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { joinClassNames } from "../../utils/styleExtras";
import { ListCard } from "../../components/ListCard";
import { TextCard } from "../../components/TextCard";
import { CommentArea } from "../../components/CommentArea";
import { Button } from "../../components/Button";
import auth from "@react-native-firebase/auth";
import { colors } from "../../styles/tailwindColors";

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

  public static getButtonStyle(): string {
    const commonStyle: string =
      "ml-auto mr-5 shadow-lg rounded-lg p-2 flex-row";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getButtonImageStyle(): string {
    const commonStyle: string = "w-5 h-5 mr-2";

    return commonStyle;
  }

  public static getButtonTextStyle(): string {
    const commonStyle: string = "";
    const lightStyle: string = "text-quaternary_light";
    const darkStyle: string = "text-quaternary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

const MovieDetailsScreen = (): React.JSX.Element => {
  const { movieId } = useRoute().params as {
    movieId: string;
  };
  const user = auth().currentUser;
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
          {user && (
            <Button
              text={movie.userLiked.includes(user.uid) ? "Liked" : "Like"}
              image={
                movie.userLiked.includes(user.uid)
                  ? require("../../assets/img/like-filled-icon.png")
                  : require("../../assets/img/like-icon.png")
              }
              buttonClassName={LocalStyle.getButtonStyle()}
              imageClassName={LocalStyle.getButtonImageStyle()}
              textClassName={LocalStyle.getButtonTextStyle()}
              onPress={() => {
                likeMovie(movie.id, user.uid).then(() => {
                  refreshData();
                });
              }}
            />
          )}
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
          <CommentArea movie={movie} refresh={refreshData} />
        </Fragment>
      )}
    </ScrollView>
  );
};

export { MovieDetailsScreen };
