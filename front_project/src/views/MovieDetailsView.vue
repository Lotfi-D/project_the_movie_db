<template>
  <v-container class="my-20">
    <v-row class="justify-center">
      <v-col cols="12" md="3">
        <v-img :src="displayPoster" alt="movie.title" max-width="" class="rounded-lg" />
      </v-col>

      <v-col cols="12" md="8">
        <h1 class="text-4xl mb-4">{{ movie?.title }}</h1>
        <v-chip-group column>
          <v-chip v-for="genre in movie?.genres" :key="genre.id" class="mb-3">
            {{ genre.name }}
          </v-chip>
        </v-chip-group>
        <p class="mb-2 text-lg"><strong>Release Date:</strong> {{ releaseDateFormated }}</p>
        <p class="mb-2 text-lg"><strong>Rating:</strong> {{ ratingFormated }} / 10</p>
        <p class="mb-2 text-lg"><strong>Vote count:</strong> {{ movie?.vote_count }}</p>
        <p class="mb-2 text-lg"><strong>Overview:</strong> {{ movie?.overview }}</p>
        <p class="mb-2 text-lg">
          <strong>Directors: </strong>
          <span 
            v-for="(director, index) in getDirectorsMovie()"
            :key="index"
            class="ml-2"
          >
            {{ director }}
          </span>
        </p>
        <p class="mb-2 text-lg">
          <strong>Actors: </strong>
          <span 
            v-for="(actor, index) in getActorsMovie()"
            :key="index"
            class="ml-2"
          >
            {{ actor }}
          </span>
        </p>
      </v-col>
    </v-row>
    <div class="mt-10">
      <BaseCommentariesMovie :movie-id="movieId" /> 
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { moviesService } from '@/services'
import type { TMovie, TCast } from '@/types/movies';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import BaseCommentariesMovie from '../components/BaseCommentariesMovie.vue'

const route = useRoute();

const movieId = ref<number>(+route.params.id);
const movie = ref<TMovie>()

const displayPoster = computed(() => 
  `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.value?.poster_path}`
)

const releaseDateFormated = computed(() => dayjs(movie?.value?.release_date).format('dddd MMMM YYYY'))

const ratingFormated = computed(() => {
  if (movie?.value?.vote_average) return Math.round(movie?.value?.vote_average * 10) / 10
  return ''
})

const getMovieInformations = async () => {
  const response: any = await moviesService.fetchMovieById(movieId.value)
  const responseCredit: any = await moviesService.fetchMovieCredit(movieId.value)

  movie.value = response.data

  if (movie.value) {
    movie.value['credits'] = responseCredit.data
  }
}

const getDirectorsMovie = () => {
  const directors = movie?.value?.credits?.cast.filter((cast: TCast) => cast.known_for_department === 'Directing')

  return directors?.map((director: any) => director.name)
}

const getActorsMovie = () => {
  const actors = movie?.value?.credits?.cast.filter((cast: TCast) => cast.known_for_department === 'Acting')

  // we want to display most popular actors, they are the first actors in the list so we limited to 5 with the slice
  return actors?.slice(0, 5).map((actor: any) => actor.name)
}

onMounted(async () => {
  await getMovieInformations()
})
</script>
