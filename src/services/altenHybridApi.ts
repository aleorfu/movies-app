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
  ratings: Rating[];
  likes: number;
  userLiked?: string[];
};

const instance: AxiosInstance = axios.create({
  baseURL: "https://api-w6avz2it7a-uc.a.run.app",
});
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";

const getPetition = async (url: string): Promise<Movie | Movie[] | never> =>
  (await instance.get(url)).data;

const putPetition = async (url: string, data: string): Promise<Movie | never> =>
  (await instance.put(url, data)).data;

const getMovieByIdApi = async (id: string): Promise<Movie | never> =>
  (await getPetition(`/movies/${id}`)) as Movie;

const getAllMoviesApi = async (): Promise<Movie[] | never> =>
  Object.values(await getPetition("/movies")) as Movie[];

const rateMovie = async (id: string, rating: Rating): Promise<void | never> => {
  await putPetition(`/movies/${id}/rate`, JSON.stringify(rating));
};

const likeMovie = async (
  id: string,
  userId: string,
): Promise<boolean | never> => {
  const data: { userId: string } = {
    userId: userId,
  };

  const response: Movie = (await putPetition(
    `/movies/${id}/like`,
    JSON.stringify(data),
  )) as Movie;

  return response?.userLiked?.includes(userId) ?? false;
};

export {
  getMovieByIdApi,
  getAllMoviesApi,
  rateMovie,
  likeMovie,
  Movie,
  Rating,
};
