<template>
  <header class="bg-black p-4 w-full z-10 font-bold">
    <div class="container flex items-center">
      <router-link to="/">
        <img
          src="../../static/logo.png"
          alt="logo"
          class="h-12"
        />
      </router-link>
      <nav class="ml-5 space-x-4 text-lg">
        <router-link to="/favorites" class="text-white">Favorites</router-link>
      </nav>
    </div>
  </header>
</template>
