import { View, Text, Image } from "react-native";
import { Movie, likeMovie } from "../services/altenHybridApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MoviesNavStackNavigation } from "../navigations/MoviesNav";
import { joinClassNames } from "../utils/styleExtras";
import auth from "@react-native-firebase/auth";
import { Button } from "./Button";

type MovieCardProps = { movie: Movie; refreshData: Function };

class LocalStyle {
  public static getCardStyle(): string {
    const commonStyle: string = "m-5 flex-col rounded-lg shadow-lg";
    const lightStyle: string = "bg-primary_light shadow-black";
    const darkStyle: string = "bg-primary_dark shadow-white";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }

  public static getTitleStyle(): string {
    const commonStyle: string = "text-center font-bold text-xl my-2.5";
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
      "ml-auto my-5 mr-5 shadow-lg rounded-lg p-2 flex-row";
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

const MovieCard = ({
  movie,
  refreshData,
}: MovieCardProps): React.JSX.Element => {
  const movieId: string = movie.id;
  const navigation: MoviesNavStackNavigation =
    useNavigation() as MoviesNavStackNavigation;
  const user = auth().currentUser;

  return (
    <View className={LocalStyle.getCardStyle()}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MovieDetailsStack", { movieId });
        }}
      >
        <View>
          <Text className={LocalStyle.getTitleStyle()}>{movie.name}</Text>

          <Image
            source={{ uri: movie.pictureUrl }}
            className={LocalStyle.getImageStyle()}
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
    </View>
  );
};

export { MovieCard, MovieCardProps };
