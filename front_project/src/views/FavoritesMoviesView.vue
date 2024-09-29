<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import BaseCardMovie from '@/components/BaseCardMovie.vue'
import type { TMovie } from '@/types/movies'

const filteredValue = ref<string>('')
const store = useFavoritesStore()
const { listFavoritesMovies } = storeToRefs(store)

const isLoading = ref<boolean>(false)

const favortesMoviesFiltered = computed(() => {
  const filteredValueLowerCase = filteredValue.value.toLowerCase()
  return listFavoritesMovies.value.filter((favorite: TMovie) =>
    favorite.title.toLowerCase().includes(filteredValueLowerCase)
  )
})

onMounted(() => {
  reload()
})

const reload = () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 500)
}
</script>

<template>
  <div v-loading="isLoading" class="container mx-auto mt-6">
    <div>
      <div class="flex justify-between ml-5 mr-10">
        <h2 class="text-2xl font-semibold">Favorites</h2>
        <v-text-field
          v-model="filteredValue"
          hide-details="auto"
          label="Main input"
          class="max-w-[240px]"
          placeholder="Search"
        />
      </div>
      <div class="flex justify-center">
        <div v-if="favortesMoviesFiltered.length > 0" class="flex flex-col md:grid grid-cols-4 gap-4  gap-4 items-center mt-5 mb-16">
          <BaseCardMovie 
            v-for="(movie, index) in favortesMoviesFiltered"
            :key="index"
            :movie-info="movie"
            :class-props="'w-[280px] md:w-[320px]'"
            @delete-favorite="reload"
          />
        </div>
        <div v-else class="flex h-screen items-center text-xl">
          No favorite found
        </div>
      </div>
    </div>
  </div>
</template>
