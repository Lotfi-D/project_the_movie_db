import type { TMovie } from '@/types/movies'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('movie', () => {
  const favoritesMovies = ref<TMovie[]>([])
   
  const listFavoritesMovies = computed(() => favoritesMovies.value)

  function addToMyFavorites(movie: TMovie) {
    favoritesMovies.value.push(movie)
  }

  function deleteFromMyFavorites(movieId: number) {
    const index = favoritesMovies.value.findIndex((movie: TMovie) => movie.id === movieId)
    favoritesMovies.value.splice(index, 1)
  }

  return { 
    favoritesMovies, 
    listFavoritesMovies,
    addToMyFavorites,
    deleteFromMyFavorites,
  }
}, { persist: true })
