import { signal } from "@preact/signals-react";
import { getAllMovies } from "@src/services/altenHybridApi";
import { getUserSignal } from "@src/signals/userSignal";
import { setMovieLiked } from "@src/services/firebase";

const getLikedMoviesSignal = signal(0);

const refreshLikedMovies = async () => {
  const movies = await getAllMovies();
  const localUser = getUserSignal.value;
  let counter = 0;

  if (!localUser) return;

  movies.forEach((movie) => {
    if (movie.userLiked?.includes(localUser.uid)) {
      counter++;
    }
  });

  setMovieLiked(localUser.uid, counter);

  getLikedMoviesSignal.value = counter;
};

export { getLikedMoviesSignal, refreshLikedMovies };
