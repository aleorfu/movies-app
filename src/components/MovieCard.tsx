import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Movie } from "@src/services/altenHybridApi";
import { MoviesNavStackNavigation } from "@src/navigations/MoviesNav";
import { LikeButton } from "@src/components/LikeButton";

type MovieCardProps = { movie: Movie; user: FirebaseAuthTypes.User | null };

const style = {
  card: "m-5 flex-col rounded-lg shadow-lg bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
  title:
    "text-center font-bold text-xl my-2.5 text-quaternary_light dark:text-quaternary_dark",
  image: "aspect-square",
};

const MovieCard = ({ movie, user }: MovieCardProps): React.JSX.Element => {
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
