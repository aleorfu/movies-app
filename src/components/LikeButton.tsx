import { Signal, useSignal } from "@preact/signals-react";
import { Button } from "@src/components/Button";
import { Movie, likeMovie } from "@src/services/altenHybridApi";
import { user } from "@src/signals/userSignal";
import { Fragment, useEffect } from "react";
import { Alert } from "react-native";

type LikeButtonProps = {
  movie: Movie;
};

const style = {
  button: {
    button:
      "ml-auto my-5 mr-5 shadow-lg rounded-lg p-2 flex-row bg-primary_light shadow-black dark:bg-primary_dark dark:shadow-white",
    image: "w-5 h-5 mr-2",
    text: "text-quaternary_light dark:text-quaternary_dark",
  },
};

const LikeButton = ({ movie }: LikeButtonProps): React.JSX.Element => {
  const movieLiked: Signal<boolean> = useSignal<boolean>(false);

  const localUser = user.value;

  useEffect(() => {
    if (localUser != null)
      movieLiked.value = movie.userLiked?.includes(localUser.uid);
  }, []); // TODO verify if I should add localUser as required

  return (
    <Fragment>
      {localUser && (
        <Button
          text={movieLiked.value ? "Liked" : "Like"}
          image={
            movieLiked.value
              ? require("../assets/img/like-filled-icon.png")
              : require("../assets/img/like-icon.png")
          }
          buttonClassName={style.button.button}
          imageClassName={style.button.image}
          textClassName={style.button.text}
          onPress={async () => {
            await likeMovie(movie.id, localUser.uid)
              .then(() => {
                movieLiked.value = !movieLiked.value;
              })
              .catch(() => {
                Alert.alert(
                  "There was an error when sending your like.",
                  "Please, try again later."
                );
              });
          }}
        />
      )}
    </Fragment>
  );
};

export { LikeButton, LikeButtonProps };
