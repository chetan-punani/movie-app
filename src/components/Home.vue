<template>
  <div id="home-main">
    <div class="grid-container-field">
      <input
        type="text"
        id="searchbar"
        v-on:keyup.enter="seatchMovie"
        v-model="searchMovieName"
        placeholder="Search movies..."
      />

      <select name="cars_id" @change="onChange($event)" class="category">
        <option value="null">Filtered By Category</option>
        <option value="action">Action</option>
        <option value="animation">animation</option>
        <option value="comedy">comedy</option>
        <option value="crime">crime</option>
        <option value="drama">drama</option>
        <option value="family">family</option>
        <option value="game_show">Game Show</option>
        <option value="history">history</option>
        <option value="horror">horror</option>
        <option value="music">music</option>
        <option value="mystery">mystery</option>
        <option value="romance">romance</option>
        <option value="sci_fi">sci_fi</option>
        <option value="thriller">thriller</option>
        <option value="war">war</option>
      </select>
    </div>

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

    <div>
      <div class="row mt-5 mb-5">
        <div class="ml-10 d-flex justify-content-between">
          <div>
            <RouterLink to="/moremovies/latest"
              ><h3>Latest & Trending</h3></RouterLink
            >
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <RouterLink
              v-for="movie in showSomeMovies"
              :key="movie.id"
              :to="'/moviedetails/' + movie.id"
            >
              <img :src="movie.image" alt="Avatar" id="image" />
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="ml-10 d-flex justify-content-between">
          <div>
            <RouterLink to="/moremovies/recommend"
              ><h3>Movies Recommended For You</h3></RouterLink
            >
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <RouterLink
              v-for="movie in showSomeMovies"
              :key="movie.id"
              :to="'/moviedetails/' + movie.id"
            >
              <img :src="movie.image" alt="Avatar" id="image" />
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="ml-10 d-flex justify-content-between">
          <div>
            <RouterLink to="/moremovies/genres"
              ><h3>Popular Genres</h3></RouterLink
            >
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <RouterLink
              v-for="movie in showSomeMovies"
              :key="movie.id"
              :to="'/moviedetails/' + movie.id"
            >
              <img :src="movie.image" alt="Avatar" id="image" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import data from "../api/data.json";
// import TheCarosule from "./TheCarousel.vue";

export default {
  name: "home",
  components: {
    // TheCarosule,
  },
  data: () => {
    return {
      searchMovieName: null,
      filteredMovie: [],
      movieList: [],
      searchMovieList: [],
      recomendMovieList: [],
      genresMovieList: [],
      settings: {
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        touchThreshold: 16,
      },
      onChange(e) {
        const category = e.target.value;
        console.log(category);
        this.movieList = data;
        this.movieList = this.movieList.filter(
          (item) => item.genres === category
        );
        // this.$http
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

      // this.$http
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
  },
  mounted() {
    // console.log(data) 
    Vue.axios
      .get(
        "https://movie-app-26981-default-rtdb.firebaseio.com/data.json"
      )
      .then((response) => {
        if (response) {
          console.log(response)
          if (response.data) {
            this.movieList = response.data;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
#home-main {
  padding: 0 3%;
}

.grid-container-field {
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
}

#searchbar {
  display: block;
  width: auto;
  max-width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("@/assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.category {
  display: block;
  width: auto;
  max-width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: #1553c6;
}

#image {
  width: 150px;
  height: 200px;
  margin: 0 3px;
  transition: transform 0.2s;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

#image:hover {
  -ms-transform: scale(1.2);
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

@media (max-width: 1024px) {
  .grid-container-field {
    display: grid;
    grid-template-columns: auto;
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .grid-container-field {
    display: grid;
    grid-template-columns: auto;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .grid-container-field {
    display: grid;
    grid-template-columns: auto;
    padding: 10px;
  }
}
</style>
