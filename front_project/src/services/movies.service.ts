import config from '@/config'
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

export default {
  fetchAllMovies(currentPage: number, genreId: string = ''): Promise<AxiosResponse | AxiosError> {
    return axios.get(`${config.api.baseUrl}/discover/movie?page=${currentPage}&with_genres=${genreId}&api_key=${config.api.apiKey}`)
  },

  fetchMovieById(movieId: number): Promise<AxiosResponse | AxiosError>  {
    return axios.get(`${config.api.baseUrl}/movie/${movieId}?api_key=${config.api.apiKey}`)
  },

  fetchMovieByName(currentPage: number, movieName: string) : Promise<AxiosResponse | AxiosError>  {
    return axios.get(`${config.api.baseUrl}/search/movie?query=${movieName}&include_adult=false&page=${currentPage}&api_key=${config.api.apiKey}`)
  },

  fetchMovieCredit(movieId: number): Promise<AxiosResponse | AxiosError>  {
    return axios.get(`${config.api.baseUrl}/movie/${movieId}/credits?api_key=${config.api.apiKey}`)
  },

  fetchTrendMovies(): Promise<AxiosResponse | AxiosError> {
    return axios.get<AxiosResponse>(`${config.api.baseUrl}/trending/movie/day?language=en-US&api_key=${config.api.apiKey}`)
  },

  fetchImageHeroBanner(movieId: number): Promise<AxiosResponse | AxiosError>  {
    return axios.get(`${config.api.baseUrl}/movie/${movieId}/images?api_key=${config.api.apiKey}`)
  },
}
