import { View, Text, Image } from "react-native";
import { Movie } from "../services/altenHybridApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MoviesNavStackNavigation } from "../navigations/MoviesNav";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LikeButton } from "./LikeButton";

type MovieCardProps = { movie: Movie };

const style = {
  card: "m-5 flex-col rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  title:
    "text-center font-bold text-xl my-2.5 text-quaternary_light dark:text-quaternary_dark",
  image: "aspect-square",
};

const MovieCard = ({ movie }: MovieCardProps): React.JSX.Element => {
  const user = useContext(UserContext);
  const navigation: MoviesNavStackNavigation =
    useNavigation() as MoviesNavStackNavigation;

  return (
    <View className={style.card}>
      <TouchableOpacity
        onPress={() => {
          const movieId: string = movie.id;
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
      {user && <LikeButton movie={movie} user={user} />}
    </View>
  );
};

export { MovieCard, MovieCardProps };
