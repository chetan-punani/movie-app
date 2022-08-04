<template>
  <section>
    <div id="movie-detail">
      <div class="row">
        <div class="col-6" id="movie-detail-text">
          <div class="row">
            <div class="col">
              <div class="card-container">
                <h1>{{ getMovie.fullTitle }}</h1>
                <p>Genres: {{ getMovie.genres }}</p>
                <p>Imdb Ratings: {{ getMovie.imDbRating }}</p>
                <p>Imdb Votes: {{ getMovie.imDbRatingCount }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6" id="movie-detail-img">
          <img
            :src="getMovie.image"
            alt="Avatar"
            class="enrounded float-end"
            id="detailed-movie-img"
          />
        </div>
      </div>
    </div>

    <div id="carousel-padding">
      <Carousel name="More Like This" value="likethis"></Carousel>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import Carousel from "./Carousel.vue";

export default {
  name: "moviedetails",
  props: ["movieId"],
  components: {
    Carousel,
  },
  data: () => {
    return {
      movie: null,
      movieList: [],
      getMovie: [],
    };
  },
  computed: {
    showSomeMovies() {
      return this.movieList.slice(0, 9);
    },
  },
  methods: {
    async getById() {
      const response = await Vue.axios.get(
        "https://movie-app-26981-default-rtdb.firebaseio.com/data.json"
      );
      let temp = [];
      if (response) {
        if (response.data) {
          temp = response.data;
        }
      }

      this.movieList = temp;
      temp = temp.filter((item) => item.id === this.movieId);
      this.getMovie = temp[0];
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.getById();
    window.scrollTo({ top: 0, behavior: "smooth" });
    next();
  },
  mounted() {
    this.getById();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>

<style scoped>
#movie-detail {
  margin: 20px 10%;
  box-shadow: 0 4px 8px 0 rgba(5, 5, 5, 1);
}

#movie-detail-text {
  background-color: #030b17;
}

#movie-detail-img {
  background: -webkit-linear-gradient(
    to right,
    rgba(3, 11, 23, 1),
    rgba(142, 145, 151, 1)
  );
  background: linear-gradient(
    to right,
    rgba(3, 11, 23, 1),
    rgba(142, 145, 151, 1)
  );
}

.card-container {
  padding: 20px 25px;
  color: #f1f1f1;
}

#detailed-movie-img {
  height: 450px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: #1553c6;
}

#more-movies {
  padding: 0 3%;
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

#carousel-padding{
  padding: 0 3%;
}
</style>
