import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MoreMovies from '../views/MoreMovies.vue'
import MovieDetails from '../views/MovieDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/moremovies',
    name: 'moremovies',
    component: MoreMovies
  },
  {
    path: '/moviedetails/:movieId',
    name: 'moviedetails',
    component: MovieDetails,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
