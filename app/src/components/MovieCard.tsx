import { View, Text, Image, ActivityIndicator } from "react-native";
import { Movie } from "../services/altenHybridApi";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Component, ReactNode } from "react";
import { colors } from "../styles/tailwindColors";

export type MovieCardProps = {
  movie: Movie;
  navigation: any;
};

export type MovieCardState = {
  loadingImage: boolean;
};

export class MovieCard extends Component<MovieCardProps, MovieCardState> {
  public constructor(props: MovieCardProps) {
    super(props);

    this.state = {
      loadingImage: false,
    };
  }

  private openDetails(): void {
    const movieId = this.props.movie.id;
    this.props.navigation.navigate("Details", { movieId });
  }

  private startLoading(): void {
    this.setState({ loadingImage: true });
  }

  private endLoading(): void {
    this.setState({ loadingImage: false });
  }

  public render(): ReactNode {
    return (
      <View className="bg-tertiary_color m-5 flex-col rounded-lg">
        <TouchableHighlight onPress={this.openDetails}>
          <View>
            <Text className="text-quaternary_color text-center font-extrabold text-xl my-2.5">
              {this.props.movie.name}
            </Text>
            <Image
              source={{ uri: this.props.movie.pictureUrl }}
              className="aspect-square rounded-bl-lg rounded-br-lg"
              resizeMode="cover"
              onLoadStart={this.startLoading}
              onLoadEnd={this.endLoading}
            />
            {this.state.loadingImage && (
              <ActivityIndicator size="large" color={colors.tertiary_color} />
            )}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
