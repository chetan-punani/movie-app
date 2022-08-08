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
import axios from "axios";
import data from "../api/data.json";
import Carousel from "../components/Carousel.vue";

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
      onChange(e) {
        const category = e.target.value;
        this.movieList = data;
        this.movieList = this.movieList.filter(
          (item) => item.genres === category
        );
        // axios
        //   .get(
        //     "https://imdb-api.com/API/AdvancedSearch/k_au2t6aps/?genres=" +
        //       category
        //   )
        //   .then((response) => {
        //     if (response.data.results) {
        //       this.movieList = response.data.results;
        //     }
        //     console.log(response.data.results);
        //   });
      },
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
    seatchMovie() {
      if (this.searchMovieName === " ") {
        this.searchMovieList = data;
      } else {
        this.searchMovieList = this.movieList.filter((item) =>
          item.title.toLowerCase().includes(this.searchMovieName.toLowerCase())
        );
      }

      // axios
      //   .get(
      //     "https://imdb-api.com/en/API/Search/k_au2t6aps/" +
      //       this.searchMovieName
      //   )
      //   .then((response) => {
      //     if (response.data.results) {
      //       this.movieList = response.data.results;
      //     }
      //     console.log(response.data.results);
      //   });
    },
    async movieData() {
      await axios
        .get("https://movie-app-26981-default-rtdb.firebaseio.com/data.json")
        .then((response) => {
          if (response) {
            if (response.data) {
              this.movieList = response.data;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
