import axios, { AxiosRequestConfig } from "axios";

export type Movie = {
  id: string;
  name: string;
  rating: string;
  pictureUrl: string;
  duration: string;
  description: string;
  categories: string[];
  actors: string[];
};

const instance = axios.create({
  baseURL: "https://api-w6avz2it7a-uc.a.run.app",
});
instance.defaults.headers.common["Accept"] = "application/json";

const getPetition = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<any> => {
  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    console.error(`There has been an error with api get petition: ${error}`);
    throw error;
  }
};

const getMovieByIdApi = async (id: string | number): Promise<Movie> => {
  const movie: Movie = Object.values(
    await getPetition(`/movies/${id}`)
  )[0] as Movie;
  return movie;
};

const getAllMoviesApi = async (): Promise<Movie[]> => {
  const movies: Movie[] = Object.values(
    await getPetition("/movies")
  ) as Movie[];
  return movies;
};

export { getMovieByIdApi, getAllMoviesApi };
