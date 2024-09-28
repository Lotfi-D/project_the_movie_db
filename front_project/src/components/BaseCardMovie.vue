<template>
  <div class="base-card-movie rounded shadow-lg" :class="props.classProps">
    <div class="container">
      <img :src="displayPoster" :alt="props.movieInfo.title" class="w-full">
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 line-clamp-2 h-[56px]">{{ props.movieInfo.title }}</div>
      <p class="flex justify-between items-center">
        <span class="font-bold text-sm mb-2">{{ releaseDateFormated }}</span>
        <v-progress-circular
          :model-value="averageInPercentage"
          :rotate="360"
          :size="80"
          :width="20"
          :color="colors"
        >
          {{ averageInPercentage }}
        </v-progress-circular>
      </p>
      <p class="text-sm overflow-hidden h-[96px]">
        {{ props.movieInfo.overview }}
      </p>
    </div>
    <div>
      <v-virtual-scroll height="96px" :items="props.movieInfo.genre_ids">
        <template v-slot:default="{ item }">
          <div class="px-6 pt-4 pb-2 h-[96px] w-[20px]">
          <span 
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {{ getGenreName(item) }}
          </span>
        </div>
        </template>
    </v-virtual-scroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import type { TMovie, TGenre } from '@/types/movies';
import { genresInMdb } from '@/enum.json'
import dayjs from 'dayjs';

interface IProps {
  movieInfo: TMovie,
  classProps: string
}

const props = defineProps<IProps>()

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
</script>

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
  }
  .el-progress__text {
    font-size: 13px !important;
  }
}
</style>
