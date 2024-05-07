import { useCallback, useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  FlatList,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { Movie, getAllMoviesApi } from "@src/services/altenHybridApi";
import { MovieCard } from "@src/components/MovieCard";
import { UserContext } from "@src/contexts/UserContext";
import { colors } from "@src/styles/tailwindColors";

let page: number = 1;

const style = {
  view: "flex-1 bg-secondary_light dark:bg-secondary_dark",
};

const fetchFiveMovies = (
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  loadingMovies: boolean,
  setLoadingMovies: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoadingMovies(true);
  getAllMoviesApi().then((movies: Movie[]) => {
    const newMovies: Movie[] = movies.slice((page - 1) * 5, page * 5);
    if (newMovies.length == 0) {
      page = 1;
      fetchFiveMovies(setMovies, loadingMovies, setLoadingMovies);
    } else {
      page++;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setLoadingMovies(false);
    }
  });
};

const MovieListScreen = () => {
  const user = useContext(UserContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    page = 1;
    setMovies([]);
    fetchFiveMovies(setMovies, loadingMovies, setLoadingMovies);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchFiveMovies(setMovies, loadingMovies, setLoadingMovies);
  }, []);

  return (
    <View className={style.view}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} user={user} />}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() =>
          fetchFiveMovies(setMovies, loadingMovies, setLoadingMovies)
        }
        onEndReachedThreshold={0.2}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        refreshing={loadingMovies}
      />
      {loadingMovies && (
        <ActivityIndicator
          size="large"
          color={isLight ? colors.quaternary_light : colors.quaternary_dark}
        />
      )}
    </View>
  );
};

export { MovieListScreen };
