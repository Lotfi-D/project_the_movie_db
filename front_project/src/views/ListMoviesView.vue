<script setup lang="ts">
import { onMounted , ref} from 'vue';
import { moviesService } from '@/services'
import type { TMovie } from '@/types/movies';
import { ElNotification } from 'element-plus'

import BaseCardMovie from '../components/BaseCardMovie.vue'
import BaseTabsMovie from '../components/BaseTabsMovie.vue'

const genreId = ref<string>('')
const searchName = ref<string>('')
const searchMode = ref<boolean>(false)
const listMoviesByGenre = ref<TMovie[]>([])
const isLoading = ref<boolean>(false)
const currentPage = ref<number>(1)

const getMovies = async(genreIdEmit: string = '', search: boolean = false, loadMoreMovies: boolean = false) => {
  try {
    isLoading.value = true
    currentPage.value = loadMoreMovies ? (currentPage.value + 1) : 1
    genreId.value = genreIdEmit
    searchMode.value = search

    const response: any = searchMode.value 
      ? await moviesService.fetchMovieByName(currentPage.value, searchName.value)
      : await moviesService.fetchAllMoviesByGenre(currentPage.value, genreIdEmit)
    
    listMoviesByGenre.value = loadMoreMovies ? [...listMoviesByGenre.value, ...response.data.results] : response.data.results 
  } catch (error) {
    console.error(error)
    ElNotification({ title: 'Error', message: 'An error occured', type: 'error', duration: 5000, })
  } finally {
    setTimeout(() => { isLoading.value = false }, 800)
  }
}

// const loadMoreMovies = async() => {
//   try {
//     isLoading.value = true
//     currentPage.value++

//     const response: any = searchMode.value 
//       ? await moviesService.fetchMovieByName(currentPage.value, searchName.value)
//       : await moviesService.fetchAllMoviesByGenre(currentPage.value, genreId.value)

//     listMoviesByGenre.value = [...listMoviesByGenre.value, ...response.data.results]
//   } catch (error) {
//     console.error(error)
//     ElNotification({ title: 'Error', message: 'An error occured', type: 'error', duration: 5000, })
//   } 
//   finally {
//     setTimeout(() => { isLoading.value = false }, 800)
//   }
// }

onMounted(async () => {
  await getMovies('')
})
</script>

<template>
  <div v-loading=isLoading class="list-page">
    <BaseTabsMovie @change-tab="getMovies">
      <v-text-field
        v-show="genreId === ''"
        v-model="searchName"
        class="w-[1248px]"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        @keyup.enter="getMovies('', true)"
      />
      
      <div v-if="listMoviesByGenre.length > 0" class="flex justify-center min-w-[1248px]">
        <div class="flex md:grid grid-cols-4 gap-4 mb-10 mt-5">
          <BaseCardMovie 
            v-for="(movie, index) in listMoviesByGenre" 
            :key="index"
            :movie-info="movie"
            :class-props="'w-[280px] md:w-[300px]'"
          />
        </div>
      </div>
      <div v-else class="flex h-[300px] justify-center items-center text-xl">
        No movies found
      </div>

    </BaseTabsMovie>
    <div class="flex justify-center">
      <button
        class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl w-[50%] mb-5"
        @click="getMovies(genreId, searchMode, true)"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.list-page {
  .el-tabs {
    --el-tabs-header-height: 60px;
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }
    .el-tabs__active-bar {
      background-color: red;
    }
    .el-tabs__item {
      font-size: 18px;
      &.is-active {
        color: red;
      }
      &:hover {
        color: red;
      }
    }
  }
}
</style>
