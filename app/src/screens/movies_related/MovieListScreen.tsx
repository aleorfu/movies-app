import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { getAllMoviesApi, Movie } from "../../services/altenHybridApi";
import { colors } from "../../styles/tailwindColors";
import { MovieCard } from "../../components/MovieCard";

function renderMovieCard(movie: Movie, navigation: any) {
  return <MovieCard movie={movie} navigation={navigation} />;
}

export function MovieListScreen({ navigation }: { navigation: any }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const localMovies = await getAllMoviesApi();
      const newMovies = localMovies.slice(page * 5, (page + 1) * 5) || [];
      if (newMovies.length === 0) {
        setPage(0);
        setMovies(localMovies.slice(0, 5));
      } else {
        setPage((prevPage) => prevPage + 1);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const localMovies = await getAllMoviesApi();
      setMovies(localMovies.slice(0, 5));
      setPage(0);
    } catch (error) {
      console.error(`Error refreshing movies: ${error}`);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <View className="flex-1 bg-secondary_color">
      <FlatList
        data={movies}
        renderItem={({ item }) => renderMovieCard(item, navigation)}
        keyExtractor={(_, index) => index.toString()}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={2}
        onEndReached={fetchMovies}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.tertiary_color} />
          ) : null
        }
      />
    </View>
  );
}
