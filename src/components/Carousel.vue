<template>
  <div class="row mt-5 mb-5">
    <div class="ml-10 d-flex justify-content-between">
      <div  @click="typeMovie(value)">
        <!-- <RouterLink :to="'/moremovies/' + value"
          ><h3>{{ name }}</h3></RouterLink
        > -->
        {{ name }}
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
</template>

<script>
import Vue from "vue";
export default {
  name: "carousle",
  props: ["name", "value"],
  data: () => {
    return {
      movieList: [],
    };
  },
  computed: {
    showSomeMovies() {
      return this.movieList.slice(0, 9);
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
    typeMovie(value) {
      this.$router.push({ path: "/moremovies" , query: { type: value } });
    }
  },
  mounted() {
    this.movieData();
  },
};
</script>

<style scoped>
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
</style>
