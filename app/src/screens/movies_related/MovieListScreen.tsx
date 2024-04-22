import { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Movie, getAllMoviesApi } from "../../services/altenHybridApi";
import { MovieCard } from "../../components/MovieCard";

let page = 1;
let isLoading = false;

const fetchFiveMovies = (
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
) => {
  if (isLoading) return;

  isLoading = true;
  getAllMoviesApi().then((movies: Movie[]) => {
    const newMovies = movies.slice((page - 1) * 5, page * 5);
    if (newMovies.length == 0) {
      page = 1;
      isLoading = false;
      fetchFiveMovies(setMovies);
      return;
    }
    page++;
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    isLoading = false;
  });
};

const MovieListScreen = ({ navigation }: { navigation: any }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  fetchFiveMovies(setMovies);
  return (
    <View className="flex-1 bg-secondary_color">
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard movie={item} navigation={navigation} />
        )}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() => fetchFiveMovies(setMovies)}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export { MovieListScreen };
