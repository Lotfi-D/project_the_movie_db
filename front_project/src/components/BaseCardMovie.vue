<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue';
import type { TMovie, TGenre }  from '@/types/movies';
import { genresInMdb } from '@/enum.json'
import dayjs from 'dayjs';
import BaseFavoriteButtonMovie from './BaseFavoriteButtonMovie.vue';
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'

interface IProps {
  movieInfo: TMovie,
  classProps: string
}

const props = defineProps<IProps>()

const emit = defineEmits(['deleteFavorite'])

const store = useFavoritesStore()
const { listFavoritesMovies } = storeToRefs(store)
const { addToMyFavorites, deleteFromMyFavorites } = store

const isFavorite = computed(() => {
  const idsFavoritesMovies = listFavoritesMovies.value.map((movie: TMovie) => movie.id)
  return idsFavoritesMovies.includes(props.movieInfo.id)
})

const classColorButton = computed(() => isFavorite.value ? 'text-red-600' : 'text-white')

const releaseDateFormated = computed(() => dayjs(props.movieInfo.release_date).format('ddd MMM YYYY'))

const displayPoster = computed(() => 
  `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.movieInfo.poster_path}`
)

const averageInPercentage = computed(() => {
  if (props.movieInfo.vote_average) {
    return Math.round((props.movieInfo.vote_average / 10) * 100)
  } return 0
})

const colors = computed(() => {
  if (averageInPercentage.value <= 50) return '#f56c6c'
  else if (50 < averageInPercentage.value && averageInPercentage.value <= 65) return '#e6a23c'
  else if (65 < averageInPercentage.value && averageInPercentage.value < 80) return '#f0e68c'
  return '#5cb87a'
})

const getGenreName = (genreId: number | unknown) => {
  const findGenre = genresInMdb.find((genre: TGenre) => genre.id === genreId)
  return findGenre?.name
}

const addOrDeleteToFavorites = () => {
  if (props.movieInfo.id) {
    if (isFavorite.value) {
      deleteFromMyFavorites(props.movieInfo.id)
      emit('deleteFavorite')
    } else {
      addToMyFavorites(props.movieInfo)
    }
  }
}
</script>

<template>
  <div class="base-card-movie rounded shadow-lg" :class="props.classProps">
    <div class="container">
      <div class="flex justify-end">
        <BaseFavoriteButtonMovie :class-color="classColorButton" @select="addOrDeleteToFavorites" />
      </div>
      <img :src="displayPoster" :alt="props.movieInfo.title" class="w-full">
    </div>
    <router-link :to="`/movie/${movieInfo.id}`">
      <div class="px-6 py-2">
        <div class="font-bold text-xl mb-0 line-clamp-2 h-[56px]">{{ props.movieInfo.title }}</div>
        <p class="flex justify-between items-center">
          <span class="font-bold text-sm mb-2">{{ releaseDateFormated }}</span>
          <v-progress-circular
            :model-value="averageInPercentage"
            :rotate="360"
            :size="50"
            :width="8"
            :color="colors"
          >
            {{ averageInPercentage }}
          </v-progress-circular>
        </p>
        <p class="text-sm overflow-hidden h-[96px] mb-2 mt-2">
          {{ props.movieInfo.overview }}
        </p>
      </div>
    </router-link>
    <div>
      <v-virtual-scroll height="96px" :items="props.movieInfo.genre_ids">
        <template v-slot:default="{ item }">
          <span 
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {{ getGenreName(item) }}
          </span>
        </template>
      </v-virtual-scroll>
    </div>
  </div>
</template>

<style lang="scss">
.base-card-movie {
  .container {
    .btn-favorite {
      position: absolute;
      font-size: 16px;
    }
  }
  .v-virtual-scroll__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .el-progress__text {
    font-size: 13px !important;
  }
}
</style>
