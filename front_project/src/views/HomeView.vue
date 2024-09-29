<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import BaseCardMovie from '@/components/BaseCardMovie.vue'
import BaseHeroBannerMovie from '@/components/BaseHeroBannerMovie.vue'
import { moviesService } from '@/services'
import type { TMovie, TBackDropResponse } from '@/types/movies'
import { ElNotification } from 'element-plus'
import { idHeroBannerMovie } from '@/enum.json' 

const moviesDisplayed = ref<TMovie[]>([])
let movieHeroBanner = reactive<TMovie>({
  id: null,
  title: '',
  overview: '',
  poster_path: '',
  backdrop_path: '',
  release_date: '',
  popularity: null,
  vote_average: null,
  display_hero_banner: '',
})
const isLoading = ref<boolean>(false)

onMounted(async () => {
  await getTrendMovies()
  await getHeroBannerMovie()
})

const getTrendMovies = async() => {
  try {
    isLoading.value = true
    const response: any = await moviesService.fetchTrendMovies()
    for (let i = 0; i < 4; i++) {
      checkAndAddMovies(response.data.results)
    }
  } catch (error) {
    console.error(error)
    ElNotification({ title: 'Error', message: 'An error occured', type: 'error', duration: 5000, })
  } finally {
    setTimeout(() => isLoading.value = false, 500)
  }
}

//This function will help to select 4 trending movies to display randomly
//we want a number between 0 and 19 (include) to select the movies among the first page of the response API
const getRandomNumber = (max = 20) => Math.floor(Math.random() * max)

//the function generates a random index to display randomly a movie from the response API and it also checks
//if the movie is already displayed, in this case we relaunch the function to avoid displaying the same movie
const checkAndAddMovies = (listMovies: TMovie[]) => {
  const index = getRandomNumber()
  const moviesDisplayedId = moviesDisplayed.value.map((movie: TMovie) => movie.id)
  if (!moviesDisplayedId.includes(listMovies[index].id)) {
    moviesDisplayed.value.push(listMovies[index])
  } else {
    checkAndAddMovies(listMovies)
  }
}

const getHeroBannerMovie = async() => {
  try {
    const response: any = await moviesService.fetchMovieById(idHeroBannerMovie)
    movieHeroBanner = response.data
    getImageHeroBanner(idHeroBannerMovie)
  } catch (error) {
    console.error(error)
    ElNotification({ title: 'Error', message: 'An error occured', type: 'error', duration: 5000, })
  }
}

const getImageHeroBanner = async(movieId: number) => {
  try {
    const response: any = await moviesService.fetchImageHeroBanner(movieId)
    //we get all backdrops and we filter by iso 'en' and the 'height' 1080
    //After that we choose randomly what backdrop to display
    const filterResponseByLanguage = response.data.backdrops.filter((backdrop: TBackDropResponse) => (
      backdrop.iso_639_1 === 'en' && backdrop.height === 1080
    ))
    const indexBackDrop = getRandomNumber(filterResponseByLanguage.length)
    movieHeroBanner.display_hero_banner = filterResponseByLanguage[indexBackDrop].file_path
  } catch (error) {
    console.error(error)
    ElNotification({ title: 'Error', message: 'An error occured', type: 'error', duration: 5000, })
  }
}
</script>

<template>
  <div v-loading="isLoading" class="home-page">
    <BaseHeroBannerMovie :movie-hero-banner-info="movieHeroBanner" />
    <div class="container mx-auto mt-6">
      <h2 class="text-2xl font-semibold">Trending</h2>
      <div class="flex flex-col md:flex-row md:items-start justify-center gap-4 items-center mt-5 mb-16">
        <BaseCardMovie 
          v-for="(movie, index) in moviesDisplayed"
          :key="index"
          :movie-info="movie"
          :class-props="'w-[280px] md:w-[320px]'"
        />
      </div>
    </div>
  </div>
</template>
