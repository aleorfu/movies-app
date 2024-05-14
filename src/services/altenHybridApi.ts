import axios, { AxiosInstance } from "axios";

type Rating = {
  userId: string;
  rating: number;
  comment: string;
};

type Movie = {
  id: string;
  name: string;
  rating: string;
  pictureUrl: string;
  duration: string;
  description: string;
  categories: string[];
  actors: string[];
  ratings?: Rating[];
  likes: number;
  userLiked?: string[];
};

const instance: AxiosInstance = axios.create({
  baseURL: "https://api-w6avz2it7a-uc.a.run.app",
});
instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";

const getMovieById = async (id: string): Promise<Movie | never> => {
  const url = `/movies/${id}`;

  try {
    const response = await instance.get(url);

    return response.data as Movie;
  } catch (error) {
    console.error('There was an error while getting movie with id "%s": %s', [
      id,
      error,
    ]);

    throw error;
  }
};

const getAllMovies = async (): Promise<Movie[] | never> => {
  const url = "/movies";

  try {
    const response = await instance.get(url);

    return Object.values(response.data) as Movie[];
  } catch (error) {
    console.error("There was an error while getting all movies: %s", error);

    throw error;
  }
};

const rateMovie = async (
  movieId: string,
  rating: Rating,
): Promise<Movie | never> => {
  const url = `/movies/${movieId}/rate`;

  try {
    const data = JSON.stringify(rating);
    const response = await instance.put(url, data);

    return response.data as Movie;
  } catch (error) {
    console.error("There was an error while sending your rating: %s", error);

    throw error;
  }
};

const likeMovie = async (
  movieId: string,
  userId: string,
): Promise<Movie | never> => {
  const url = `/movies/${movieId}/like`;

  try {
    const data = JSON.stringify({
      userId: userId,
    });
    const response = await instance.put(url, data);

    return response.data as Movie;
  } catch (error) {
    console.error("There was an error while sending your like: %s", error);

    throw error;
  }
};

export { getMovieById, getAllMovies, rateMovie, likeMovie, Movie, Rating };
