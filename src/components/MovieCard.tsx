import { View, Text, Image } from "react-native";
import { Movie, likeMovie } from "../services/altenHybridApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MoviesNavStackNavigation } from "../navigations/MoviesNav";
import auth from "@react-native-firebase/auth";
import { Button } from "./Button";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

type MovieCardProps = { movie: Movie; refreshData: Function };

const style = {
  card: "m-5 flex-col rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  title:
    "text-center font-bold text-xl my-2.5 text-quaternary_light dark:text-quaternary_dark",
  image: "aspect-square",
  button: {
    button:
      "ml-auto my-5 mr-5 shadow-lg rounded-lg p-2 flex-row bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    image: "w-5 h-5 mr-2",
    text: "text-quaternary_light dark:text-quaternary_dark",
  },
};

const MovieCard = ({
  movie,
  refreshData,
}: MovieCardProps): React.JSX.Element => {
  const movieId: string = movie.id;
  const navigation: MoviesNavStackNavigation =
    useNavigation() as MoviesNavStackNavigation;
  const user = useContext(UserContext);

  return (
    <View className={style.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MovieDetailsStack", { movieId });
        }}
      >
        <View>
          <Text className={style.title}>{movie.name}</Text>
          <Image
            source={{ uri: movie.pictureUrl }}
            className={style.image}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      {user && (
        <Button
          text={movie.userLiked?.includes(user.uid) ? "Liked" : "Like"}
          image={
            movie.userLiked?.includes(user.uid)
              ? require("../assets/img/like-filled-icon.png")
              : require("../assets/img/like-icon.png")
          }
          buttonClassName={style.button.button}
          imageClassName={style.button.image}
          textClassName={style.button.text}
          onPress={() => {
            likeMovie(movie.id, user.uid).then(() => {
              refreshData();
            });
          }}
        />
      )}
    </View>
  );
};

export { MovieCard, MovieCardProps };
