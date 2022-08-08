<template>
  <div class="row mt-5 mb-5">
    <div class="ml-10 d-flex justify-content-between">
      <div @click="typeMovie(value)">
        <!-- <RouterLink :to="'/moremovies/' + value"
          ><h3>{{ name }}</h3></RouterLink
        > -->
        <h3>{{ name }}</h3>
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
import axios from "axios";

export default {
  name: "carousle",
  props: ["name", "value"],
  data: () => {
    return {
      movieList: [],
      noOfImg: 9,
      tempImg: 0,
    };
  },
  computed: {
    showSomeMovies() {
      return this.movieList.slice(0, this.noOfImg);
    },
  },
  methods: {
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
    typeMovie(value) {
      this.$router.push({ path: "/moremovies", query: { type: value } });
    },
    onResize() {
      if (window.innerWidth > 1400) {
        this.noOfImg = 9;
      } else if (window.innerWidth <= 1400 && window.innerWidth > 1200) {
        this.noOfImg = 8;
      } else if (window.innerWidth <= 1200 && window.innerWidth > 992) {
        this.noOfImg = 7;
      } else if (window.innerWidth <= 992 && window.innerWidth > 768) {
        this.noOfImg = 6;
      } else if (window.innerWidth <= 768 && window.innerWidth > 576) {
        this.noOfImg = 4;
      } else if (window.innerWidth <= 576 && window.innerWidth > 460) {
        this.noOfImg = 2;
      }
    },
  },
  mounted() {
    this.movieData();
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
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
  margin: 3px 3px;
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
