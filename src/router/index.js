import Vue from 'vue'
// import Cookies from "js-cookie";
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MoreMovies from '../views/MoreMovies.vue'
import MovieDetails from '../views/MovieDetails.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import UserProfile from '../views/Profile.vue'
// import GoogleAuth from '../components/GoogleAuth.vue'
// import FacebookAuth from '../components/FacebookAuth.vue'

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
    component: MoreMovies,
  },
  {
    path: '/moviedetails/:movieId',
    name: 'moviedetails',
    component: MovieDetails,
    props: true,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfile,
  },
  // { name: 'google-auth', path: '/google-auth', component: GoogleAuth, props: true },
  // { name: 'facebook-auth', path: '/facebook-auth', component: FacebookAuth, props: true },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach(async(to, from, next) => {
//   if(to.matched.some((record) => record.meta.requiredAuth)) {
//     const refreshtoken = Cookies.get('refreshToken')
//     const token = Cookies.get('idToken')
//     if( token && refreshtoken) {
//       next();
//     } else {
//       next('/login');
//     }
//   } else {
//     next();
//   }
// });

export default router
