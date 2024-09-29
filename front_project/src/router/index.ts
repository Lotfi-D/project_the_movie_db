import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/listmovies',
      name: 'list-movies',
      component: () => import('../views/ListMoviesView.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: () => import('../views/MovieDetailsView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesMoviesView.vue')
    },
  ]
})

export default router
