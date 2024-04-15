import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import uuid from "react-native-uuid";
import { getAllMoviesApi, Movie } from "../../services/altenHybridApi";
import { colors, styles } from "../../styles/global";

function Item({ item, navigation }: { item: Movie; navigation: any }) {
  return (
    <View className="bg-tertiary_color m-5 flex-col rounded-lg">
      <TouchableHighlight
        onPress={() => navigation.navigate("Details", { item })}
      >
        <View>
          <Text className="text-quaternary_color text-center font-extrabold text-xl my-2.5">
            {item.name}
          </Text>
          <Image
            source={{ uri: item.pictureUrl }}
            className="aspect-square rounded-bl-lg rounded-br-lg"
            resizeMode="cover"
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}

export default function MovieListScreen({ navigation }: { navigation: any }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false); // I use this variable to control when movies can be fetch
  const [refreshing, setRefreshing] = useState(false);

  let localMovies: Movie[] | null = null;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    localMovies = await getAllMoviesApi();
    setMovies([]);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  async function fetchMovies() {
    if (loading === false) {
      setLoading(true);
      try {
        if (localMovies === null) {
          localMovies = await getAllMoviesApi();
        }
        let newMovies = localMovies.slice(page * 5, (page + 1) * 5);
        if (newMovies.length === 0) {
          newMovies = localMovies.slice(0, 5);
          setPage(1);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      } catch (error) {
        console.error(`Error al obtener películas: ${error}`);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <View className="flex-1 bg-secondary_color">
      <FlatList
        data={movies}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(_) => uuid.v4().toString()}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={2}
        onEndReached={fetchMovies}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              className={styles.loading_pos}
              color={colors.tertiary_color}
            />
          ) : null
        }
      />
    </View>
  );
}
