import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Movie, likeMovie } from "../services/altenHybridApi";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type LikeButtonProps = {
  movie: Movie;
  user: FirebaseAuthTypes.User;
};

const style = {
  button: {
    button:
      "ml-auto my-5 mr-5 shadow-lg rounded-lg p-2 flex-row bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    image: "w-5 h-5 mr-2",
    text: "text-quaternary_light dark:text-quaternary_dark",
  },
};

const LikeButton = ({ movie, user }: LikeButtonProps): React.JSX.Element => {
  const [movieLiked, setMovieLiked] = useState<boolean>(false);
  const [sendingLiked, setSendingLiked] = useState<boolean>(false);

  useEffect(() => {
    if (user != null) setMovieLiked(movie.userLiked?.includes(user.uid));
  }, []);

  return (
    <Button
      text={movieLiked ? "Liked" : "Like"}
      image={
        movieLiked
          ? require("../assets/img/like-filled-icon.png")
          : require("../assets/img/like-icon.png")
      }
      buttonClassName={style.button.button}
      imageClassName={style.button.image}
      textClassName={style.button.text}
      onPress={() => {
        setSendingLiked(true);
        likeMovie(movie.id, user.uid)
          .then(() => {
            setMovieLiked(!movieLiked);
          })
          .finally(() => {
            setSendingLiked(false);
          });
      }}
      loading={sendingLiked}
    />
  );
};

export { LikeButton, LikeButtonProps };
