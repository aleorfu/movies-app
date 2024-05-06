import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, View, FlatList } from "react-native";
import { Movie, getAllMoviesApi } from "../../services/altenHybridApi";
import { MovieCard } from "../../components/MovieCard";
import { UserContext } from "../../contexts/UserContext";

let page: number = 1;
let isLoading: boolean = false;

const style = {
  view: "flex-1 bg-secondary_light dark:bg-secondary_dark",
};

const fetchFiveMovies = (
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
) => {
  if (isLoading) return;

  isLoading = true;
  getAllMoviesApi().then((movies: Movie[]) => {
    const newMovies: Movie[] = movies.slice((page - 1) * 5, page * 5);
    if (newMovies.length == 0) {
      page = 1;
      isLoading = false;
      fetchFiveMovies(setMovies);
    } else {
      page++;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      isLoading = false;
    }
  });
};

const MovieListScreen = () => {
  const user = useContext(UserContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    page = 0;
    setMovies([]);
    fetchFiveMovies(setMovies);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchFiveMovies(setMovies);
  }, []);

  return (
    <View className={style.view}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} user={user} />}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() => fetchFiveMovies(setMovies)}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export { MovieListScreen };
