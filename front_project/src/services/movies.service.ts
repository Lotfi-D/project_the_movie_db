import config from '@/config'
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

export default {
  fetchAllMovies(currentPage: number): Promise<AxiosResponse | AxiosError> {
    return axios.get(`${config.api.baseUrl}/discover/movie?page=${currentPage}&api_key=${config.api.apiKey}`)
  },

  fetchMovieById(movieId: number): Promise<AxiosResponse | AxiosError>  {
    return axios.get(`${config.api.baseUrl}/movie/${movieId}?api_key=${config.api.apiKey}`)
  }
}
