import { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Movie, getAllMoviesApi } from "../../services/altenHybridApi";
import { MovieCard } from "../../components/MovieCard";
import { joinClassNames } from "../../utils/styleExtras";

let page: number = 1;
let isLoading: boolean = false;

class LocalStyle {
  public static getViewStyle(): string {
    const commonStyle: string = "flex-1";
    const lightStyle: string = "bg-secondary_light";
    const darkStyle: string = "bg-secondary_dark";

    return joinClassNames(commonStyle, [lightStyle, darkStyle]);
  }
}

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
  const [movies, setMovies] = useState<Movie[]>([]);
  fetchFiveMovies(setMovies);

  return (
    <View className={LocalStyle.getViewStyle()}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() => fetchFiveMovies(setMovies)}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export { MovieListScreen };
