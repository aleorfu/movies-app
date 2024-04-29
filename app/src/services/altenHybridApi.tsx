import axios, { AxiosRequestConfig } from "axios";

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
  ratings: Rating[];
  likes: number;
  userLiked: string[];
};

const instance = axios.create({
  baseURL: "https://api-w6avz2it7a-uc.a.run.app",
});
instance.defaults.headers.common["Accept"] = "application/json";

const getPetition = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<Movie | Movie[] | never> => {
  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    console.error(`There has been an error with api get petition: ${error}`);
    throw error;
  }
};

const putPetition = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<Movie | never> => {
  try {
    const response = await instance.put(url, config);
    return response.data;
  } catch (error) {
    console.error(`There has been an error with api put petition: ${error}`);
    throw error;
  }
};

const getMovieByIdApi = async (id: string): Promise<Movie | never> =>
  (await getPetition(`/movies/${id}`)) as Movie;

const getAllMoviesApi = async (): Promise<Movie[] | never> =>
  Object.values(await getPetition("/movies"));

const rateMovie = async (id: string, rating: Rating): Promise<Movie | never> =>
  (await putPetition(`/movies/${id}/rate`, { data: rating })) as Movie;

const likeMovie = async (id: string, userId: string): Promise<void | never> => {
  await putPetition(`/movies/${id}/like`, { data: { userId: userId } });
};

export {
  getMovieByIdApi,
  getAllMoviesApi,
  rateMovie,
  likeMovie,
  Movie,
  Rating,
};
