import { Signal } from "@preact/signals-react";

type MovieLikedSignalsObjectType = {
  [key: string]: Signal<boolean>;
};

const getMovieLikedSignalsObject: MovieLikedSignalsObjectType = {};

export { getMovieLikedSignalsObject, MovieLikedSignalsObjectType };
