<script setup lang="ts">
import { onMounted , ref} from 'vue';
import { moviesService } from '@/services'
// import TheWelcome from '../components/TheWelcome.vue'


const getMoviesByGenre = async(genreIdEmit: string) => {
  const genreId = ref<string>('')
  const listMoviesByGenre = ref<any>([])

  try {
    genreId.value = genreIdEmit
    genreId.value = ''
    const response: any = await moviesService.fetchAllMovies(1)
    listMoviesByGenre.value = response.data.results
    console.log('listMoviesByGenre.value', listMoviesByGenre.value)
  } catch (error) {
    console.error(error)
    // notification
  } 
  // finally {
  //   setTimeout(() => { loader? }, 500)
  // }
}

onMounted(async () => {
  await getMoviesByGenre('')
})
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
  </main>
</template>
