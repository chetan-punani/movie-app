import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AboutVue from '../components/About.vue'
import ContactVue from '../components/Contact.vue'
import ServiceVue from '../components/Service.vue'
import Homevue from '../components/Home.vue'
import MovieDetails from '../components/MovieDetails.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }

  {
    path: '/',
    name: 'home',
    component: Homevue
  },
  {
    path: '/about',
    name: 'about',
    component: AboutVue
   
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
