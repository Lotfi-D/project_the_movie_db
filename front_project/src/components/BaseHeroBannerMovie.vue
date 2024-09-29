<template>
  <div 
    :style="`background-image: url(${displayImageHeroBanner()})`"
    class="relative h-screen bg-cover bg-center" 
  >
    <div class="absolute inset-0 bg-black opacity-40" />
    <div class="absolute inset-0 flex items-center text-white">
      <div class="w-[40%] pl-5">
        <h1 class="text-4xl font-semibold">Overview</h1>
        <p class="text-1xl mt-3">{{ movieHeroBannerInfo.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { TMovie } from '@/types/movies';

interface IProps {
  movieHeroBannerInfo: TMovie
}

const props = defineProps<IProps>()

const displayImageHeroBanner = () => {
  const urlImage = `https://www.themoviedb.org/t/p/original/${props.movieHeroBannerInfo.display_hero_banner}`
  return props.movieHeroBannerInfo.display_hero_banner ? urlImage : ''
}
</script>
