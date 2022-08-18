<template>
  <div class="row mt-5 mb-5">
    <div class="ml-10 d-flex justify-content-between">
      <div>
        
      </div>
    </div>
    <div class="row mt-3">

      <div v-if="showGerneResult">
        <div class="col">
          <RouterLink
            v-for="movie in searchGerneList"
            :key="movie.id"
            :to="'/moviedetails/' + movie.id"
          >
            <img :src="movie.image" alt="Avatar" id="image" />
          </RouterLink>
        </div>
        <div class="col" v-if="movieList.length === 0">
          <h5 id="no-data">No data found !!!</h5>
        </div>
      </div>

      <div v-if="showSearchResult">
        <div class="col">
          <RouterLink
            v-for="movie in searchMovieList"
            :key="movie.id"
            :to="'/moviedetails/' + movie.id"
          >
            <img :src="movie.image" alt="Avatar" id="image" />
          </RouterLink>
        </div>
        <div class="col" v-if="movieList.length === 0">
          <h5 id="no-data">No data found !!!</h5>
        </div>
      </div>

      <div v-if="showListResult">
        <div class="col">
          <RouterLink
            v-for="movie in listMovies"
            :key="movie.id"
            :to="'/moviedetails/' + movie.id"
          >
            <img :src="movie.image" alt="Avatar" id="image" />
          </RouterLink>
        </div>
        <div class="col" v-if="movieList.length === 0">
          <h5 id="no-data">No data found !!!</h5>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getAllMovies } from '../api/movie'

export default {
  props: ["callFun"],
  data: () => {
    return {
      callFunctionName: null,
      movieList: [],
      gernesList: [],
      searchList: [],
      list: [],
    };
  },
  computed: {
    showGerneResult() {
      return this.callFun === "searchGerneList";
    },
    showSearchResult() {
      return this.callFun === "searchMovieList";
    },
    showListResult() {
      return this.callFun === "listMovies";
    },
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
    onUpdate() {
      this.searchGerneList();
      this.searchMovieList();
      this.listMovies();
    },
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
