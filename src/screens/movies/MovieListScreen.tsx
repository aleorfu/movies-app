import { Signal, useSignal } from "@preact/signals-react";
import { MovieCard } from "@src/components/MovieCard";
import { getAllMoviesApi, Movie } from "@src/services/altenHybridApi";
import { colors } from "@src/styles/tailwindColors";
import { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  useColorScheme,
  View,
} from "react-native";

let page: number = 1;

const style = {
  view: "flex-1 bg-secondary_light dark:bg-secondary_dark",
};

const fetchFiveMovies = (
  movies: Signal<Movie[]>,
  loadingMovies: Signal<boolean>,
): void => {
  loadingMovies.value = true;
  getAllMoviesApi().then((fetchedMovies: Movie[]): void => {
    const newMovies: Movie[] = fetchedMovies.slice((page - 1) * 5, page * 5);
    if (newMovies.length == 0) {
      page = 1;
      fetchFiveMovies(movies, loadingMovies);
    } else {
      page++;
      movies.value = [...movies.value, ...newMovies];
      loadingMovies.value = false;
    }
  });
};

const MovieListScreen = () => {
  const movies: Signal<Movie[]> = useSignal<Movie[]>([]);
  const refreshing: Signal<boolean> = useSignal<boolean>(false);
  const loadingMovies: Signal<boolean> = useSignal<boolean>(false);
  const isLight: boolean = useColorScheme() === "light";

  const onRefresh = useCallback((): void => {
    refreshing.value = true;
    page = 1;
    movies.value = [];
    fetchFiveMovies(movies, loadingMovies);
    refreshing.value = false;
  }, []);

  useEffect((): void => {
    fetchFiveMovies(movies, loadingMovies);
  }, []);

  return (
    <View className={style.view}>
      <FlatList
        data={movies.value}
        renderItem={({ item }: { item: Movie }) => <MovieCard movie={item} />}
        keyExtractor={(_: Movie, index: number) => index.toString()}
        onEndReached={() => fetchFiveMovies(movies, loadingMovies)}
        onEndReachedThreshold={0.2}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl refreshing={refreshing.value} onRefresh={onRefresh} />
        }
        refreshing={loadingMovies.value}
      />
      {loadingMovies.value && (
        <ActivityIndicator
          size="large"
          color={isLight ? colors.quaternary_light : colors.quaternary_dark}
        />
      )}
    </View>
  );
};

export { MovieListScreen };
