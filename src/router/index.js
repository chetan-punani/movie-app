import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MoreMovies from '../views/MoreMovies.vue'
import MovieDetails from '../views/MovieDetails.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import UserProfile from '../views/Profile.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  })
}

router.beforeEach(async(to, from, next) => {
  if(to.matched.some((record) => record.meta.requiredAuth)) {
    if(await getCurrentUser()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
