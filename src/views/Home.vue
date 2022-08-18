<template>
  <div id="home-main">
    <div v-if="searchMovieName">
      <div v-if="showSearachMovies">
        <RouterLink
          v-for="movie in showSearachMovies"
          :key="movie.id"
          :to="'/moviedetails/' + movie.id"
        >
          <img :src="movie.image" alt="Avatar" id="image" />
        </RouterLink>
      </div>
      <div v-else>
        <h2>No Result Found!!!</h2>
      </div>
    </div>

    <Carousel name="Latest & Trending" value="latest-trending"></Carousel>
    <Carousel name="Movies Recommended For You" value="recommend"></Carousel>
    <Carousel name="Popular Genres" value="genres"></Carousel>
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import { getAllMovies } from '../api/movie'

export default {
  name: "home",
  components: {
    Carousel,
  },
  data: () => {
    return {
      searchMovieName: null,
      movieList: [],
      searchMovieList: [],
    };
  },
  computed: {
    showSearachMovies() {
      return this.searchMovieList.slice(0, 9);
    },
    showSomeMovies() {
      return this.movieList.slice(0, 9);
    },
  },
  methods: {
    async movieData() {
      await getAllMovies()
      .then( (response) => {
         if (response) {
            if (response.data) {
               this.movieList = Object.keys(response.data).map((key) => {
                return response.data[key];
              });
            }
          }
      })
      .catch( (e) => {
        console.log(e);
      } ) 
     
    },
  },
  mounted() {
    this.movieData();
  },
};
</script>

<style scoped>
#home-main {
  padding: 0 3%;
}
</style>
