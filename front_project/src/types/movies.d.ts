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
  crew: Array,
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

export { TMovie, TBackDropResponse, TGenre }
