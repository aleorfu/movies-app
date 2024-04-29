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
instance.defaults.headers["Accept"] = "application/json";

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
  data: any,
  config: AxiosRequestConfig = {}
): Promise<Movie | never> => {
  try {
    const response = await instance.put(url, data, config);
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

const rateMovie = async (id: string, rating: Rating): Promise<void> => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  await putPetition(`/movies/${id}/rate`, JSON.stringify(rating), config);
};

export { getMovieByIdApi, getAllMoviesApi, rateMovie, Movie, Rating };
