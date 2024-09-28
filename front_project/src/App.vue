<script lang="ts" setup>
import TheHeader from './layout/TheHeader.vue';
</script>

<template>
  <div class="">
    <TheHeader class="w-full" />
    <main class="">
      <router-view />
    </main>
  </div>
</template>
