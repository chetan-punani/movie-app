import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import MoreMovies from '../components/MoreMovies.vue'
import ContactVue from '../components/Contact.vue'
import ServiceVue from '../components/Service.vue'
import Homevue from '../components/Home.vue'
import MovieDetails from '../components/MovieDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homevue
  },
  {
    path: '/moremovies/:category',
    name: 'moremovies',
    component: MoreMovies,
    props: true,
   
  },
  {
    path: '/service',
    name: 'service',
    component: ServiceVue 
   
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactVue 
   
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
