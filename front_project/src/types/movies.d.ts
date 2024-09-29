type TMovie = {
  id: number | null,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
  popularity: number | null,
  vote_average: number | null,
  genre_ids?: Array,
  display_hero_banner?: string,
  credits: TCreditsMovie,
  genres: Array,
  vote_count: number
}

type = TCreditsMovie = {
  cast: Array,
  crew: TCast,
  id: number
}

type TBackDropResponse = {
  iso_639_1: string,
  width: number,
  height: number,
}

type TGenre = {
  id: number | string,
  name: string
}

type TCast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export { TMovie, TBackDropResponse, TGenre, TCast }
