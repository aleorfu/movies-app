import { Signal, useSignal } from "@preact/signals-react";
import { MovieCard } from "@src/components/MovieCard";
import { getAllMovies, Movie } from "@src/services/altenHybridApi";
import { useEffect } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  useColorScheme,
  View,
} from "react-native";

const style = {
  view: "flex-1 bg-secondary_light dark:bg-secondary_dark",
};

const fetchFiveMovies = (
  moviesSignal: Signal<Movie[]>,
  loadingMoviesSignal: Signal<boolean>,
  pageSignal: Signal<number>,
): void => {
  loadingMoviesSignal.value = true;

  const handleGetAllMoviesSuccess = (fetchedMovies: Movie[]): void => {
    const nextMovies = fetchedMovies.slice(
      (pageSignal.value - 1) * 5,
      pageSignal.value * 5,
    );

    if (nextMovies.length == 0) {
      pageSignal.value = 1;
      fetchFiveMovies(moviesSignal, loadingMoviesSignal, pageSignal);
    } else {
      pageSignal.value++;
      moviesSignal.value.concat(nextMovies);
    }
  };

  const handleGetAllMoviesFailure = (): void => {
    Alert.alert(
      "There was an error while fetching movies.",
      "Please, try again later.",
    );
  };

  const handleGetAllMoviesFinally = (): void => {
    loadingMoviesSignal.value = false;
  };

  getAllMovies()
    .then(handleGetAllMoviesSuccess)
    .catch(handleGetAllMoviesFailure)
    .finally(handleGetAllMoviesFinally);
};

const MovieListScreen = (): React.JSX.Element => {
  const moviesSignal = useSignal<Movie[]>([]);
  const refreshingSignal = useSignal(false);
  const loadingMoviesSignal = useSignal(false);
  const pageSignal = useSignal(1);
  const isLight = useColorScheme() === "light";

  const handleOnRefresh = (): void => {
    refreshingSignal.value = true;
    pageSignal.value = 1;
    moviesSignal.value = [];
    fetchFiveMovies(moviesSignal, loadingMoviesSignal, pageSignal);
    refreshingSignal.value = false;
  };

  const handleOnEndReached = (): void => {
    fetchFiveMovies(moviesSignal, loadingMoviesSignal, pageSignal);
  };

  useEffect(() => {
    fetchFiveMovies(moviesSignal, loadingMoviesSignal, pageSignal);
  }, []);

  return (
    <View className={style.view}>
      <FlatList
        data={moviesSignal.value}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(movie) => movie.id}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.2}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshingSignal.value}
            onRefresh={handleOnRefresh}
          />
        }
        refreshing={loadingMoviesSignal.value}
      />
      {/*{loadingMoviesSignal.value && (*/}
      {/*  <ActivityIndicator*/}
      {/*    size="large"*/}
      {/*    color={isLight ? colors.quaternary_light : colors.quaternary_dark}*/}
      {/*  />*/}
      {/*)}*/}
    </View>
  );
};

export { MovieListScreen };
