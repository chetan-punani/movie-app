<template>
  <div>
    <div id="resultshow">
      <div v-if="this.gernesList">
        <div class="row mt-5 mb-5">
          <div class="ml-10 d-flex justify-content-between">
            <div>
              <h3>{{ category }}</h3>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <RouterLink
                v-for="movie in searchGerneList"
                :key="movie.id"
                :to="'/moviedetails/' + movie.id"
              >
                <img :src="movie.image" alt="Avatar" id="image" />
              </RouterLink>
            </div>
            <div class="col" v-if="searchGerneList.length === 0">
              <h5 id="no-data">No data found !!!</h5>
            </div>
          </div>
        </div>
      </div>

      <div v-if="this.searchList">
        <div class="row mt-5 mb-5">
          <div class="ml-10 d-flex justify-content-between">
            <div>
              <h3>{{ category }}</h3>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <RouterLink
                v-for="movie in searchMovieList"
                :key="movie.id"
                :to="'/moviedetails/' + movie.id"
              >
                <img :src="movie.image" alt="Avatar" id="image" />
              </RouterLink>
            </div>
            <div class="col" v-if="searchMovieList.length === 0">
              <h5 id="no-data">No data found !!!</h5>
            </div>
          </div>
        </div>
      </div>

      <div v-if="this.list">
        <div class="row mt-5 mb-5">
          <div class="ml-10 d-flex justify-content-between">
            <div>
              <h3>{{ category }}</h3>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <RouterLink
                v-for="movie in listMovies"
                :key="movie.id"
                :to="'/moviedetails/' + movie.id"
              >
                <img :src="movie.image" alt="Avatar" id="image" />
              </RouterLink>
            </div>
            <div class="col" v-if="listMovies.length === 0">
              <h5 id="no-data">No data found !!!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "moremovies",
  props: ["category"],
  data: () => {
    return {
      movieList: [],
      gernesList: [],
      searchList: [],
      list: [],
    };
  },
  computed: {
    searchGerneList() {
      return this.movieList.filter((item) => item.genres === this.gernesList);
    },
    searchMovieList() {
      return this.movieList.filter((item) =>
        item.title.toLowerCase().includes(this.searchList.toLowerCase())
      );
    },
    listMovies() {
      return this.movieList.slice(8, 16);
    },
  },
  methods: {
    async movieData() {
      const response = await Vue.axios.get(
        "https://movie-app-26981-default-rtdb.firebaseio.com/data.json"
      );

      if (response) {
        if (response.data) {
          this.movieList = response.data;
        }
      }
    },
    onUpdate() {
      this.searchGerneList();
      this.searchMovieList();
      this.listMovies();
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.$router.go(0);
  },
  mounted() {
    this.movieData();
    this.gernesList = this.$route.query.gerne;
    this.searchList = this.$route.query.search;
    this.list = this.$route.query.type;
  },
};
</script>

<style scoped>
#resultshow {
  margin: 20px 30px;
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

#no-data {
  color: brown;
}
</style>
